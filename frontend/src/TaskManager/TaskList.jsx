/* import React from 'react';
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
 */

import React, { useState } from 'react';
import styles from './TaskManager.module.css';

const TaskList = ({ tasks, onDelete, onToggleComplete, onUpdate }) => {
  // Track which task is being edited and its new name
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditName(task.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const submitEdit = (task) => {
    if (editName.trim() === '') return; // Optional: prevent empty name
    onUpdate(task._id, { name: editName });
    setEditingId(null);
  };

  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <p className={styles.noTask}>No tasks found. Please add a task.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li
              key={task._id}
              className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task._id, task.completed)}
              />

              {editingId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className={styles.input} // reuse your input style
                  />
                  <button onClick={() => submitEdit(task)} className={styles.saveBtn}>
                    Save
                  </button>
                  <button onClick={cancelEditing} className={styles.deleteBtn}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={styles.taskName}
                    onDoubleClick={() => startEditing(task)} // optional: double click to edit
                  >
                    {task.name}
                  </span>
                  <button onClick={() => startEditing(task)} className={styles.editBtn}>
                    Edit
                  </button>
                  <button onClick={() => onDelete(task._id)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
