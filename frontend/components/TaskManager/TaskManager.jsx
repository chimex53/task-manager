import React, { useState, useEffect } from 'react'; // Added useEffect
import styles from './TaskManager.module.css';
import Spinner from './Spinner';
import TaskForm from './TaskForm';
import TaskList from './TaskList'; // We'll enhance TaskList for delete/update later

// Define your API base URL (adjust if your backend runs on a different port/domain)
const API_BASE_URL = 'http://localhost:5000/api/tasks';

const TaskManager = () => {
  const [taskName, setTaskName] = useState(''); // Renamed 'task' to 'taskName' for clarity
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To handle API errors

  // --- Fetch Tasks on Component Mount ---
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  const fetchTasks = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Add Task ---
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError("Task name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, completed: false }), // Send name and completed status
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]); // Add the new task received from the backend
      setTaskName(''); // Clear input
    } catch (err) {
      console.error("Error adding task:", err);
      setError(`Failed to add task: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Placeholder for Delete Task (to be implemented later) ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Filter out the deleted task from the state
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(`Failed to delete task: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Placeholder for Toggle Complete (to be implemented later) ---
  const handleToggleComplete = async (id, currentCompletedStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentCompletedStatus }), // Toggle completed status
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task // Replace the old task with the updated one
      ));
    } catch (err) {
      console.error("Error updating task:", err);
      setError(`Failed to update task: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Task Manager</h2>

      <TaskForm task={taskName} setTask={setTaskName} handleAdd={handleAdd} />

      {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}

      {loading ? (
        <Spinner />
      ) : (
        <TaskList 
          tasks={tasks} 
          onDelete={handleDelete} // Pass delete handler
          onToggleComplete={handleToggleComplete} // Pass toggle handler
        />
      )}
    </div>
  );
};

export default TaskManager;
