import React from 'react';
import styles from './TaskManager.module.css'; // Assuming styles are in the same CSS module

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <p className={styles.noTask}>No tasks found. Please add a task.</p>
      ) : (
        <ul>
          {tasks.map((task) => ( // Changed 't' to 'task' for clarity
            <li key={task._id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
              <span 
                className={styles.taskName} 
                onClick={() => onToggleComplete(task._id, task.completed)}
              >
                {task.name}
              </span>
              <button 
                className={styles.deleteBtn} 
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
