import React, { useState, useEffect } from 'react';  // Added useEffect
import axios from 'axios';
import styles from './TaskManager.module.css';
import Spinner from './Spinner';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

const TaskManager = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks automatically on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError("Task name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, {
        name: taskName,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setTaskName('');
    } catch (err) {
      console.error("Error adding task:", err);
      setError(
        err.response?.data?.message
          ? `Failed to add task: ${err.response.data.message}`
          : "Failed to add task."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(
        err.response?.data?.message
          ? `Failed to delete task: ${err.response.data.message}`
          : "Failed to delete task."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id, currentCompletedStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        completed: !currentCompletedStatus,
      });
      setTasks(tasks.map(task =>
        task._id === id ? response.data : task
      ));
    } catch (err) {
      console.error("Error updating task:", err);
      setError(
        err.response?.data?.message
          ? `Failed to update task: ${err.response.data.message}`
          : "Failed to update task."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedFields) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedFields);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
      setError(
        err.response?.data?.message
          ? `Failed to update task: ${err.response.data.message}`
          : "Failed to update task."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Task Manager</h2>

      <p style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '600' }}>
        Total Tasks: {totalTasks} | Completed: {completedTasks}
      </p>

      <TaskForm task={taskName} setTask={setTaskName} handleAdd={handleAdd} />

      {error && <p className={styles.errorMessage}>{error}</p>}

      {loading && <Spinner />}

      {!loading && (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default TaskManager;
