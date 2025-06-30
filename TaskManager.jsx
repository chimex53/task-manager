import React, { useState, Suspense } from 'react';
import styles from './TaskManager.module.css';

const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <span>Loading...</span>
  </div>
);

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setLoading(true);
      setTimeout(() => {
        setTasks([...tasks, task]);
        setTask('');
        setLoading(false);
      }, 1000); // Simulate loading
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Task Manager</h2>
      <form className={styles.form} onSubmit={handleAdd}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button className={styles.addBtn} type="submit">Add</button>
      </form>
      <Suspense fallback={<Spinner />}>
        {loading ? <Spinner /> : (
          <div className={styles.taskList}>
            {tasks.length === 0 ? (
              <p className={styles.noTask}>No task added. Please add a task.</p>
            ) : (
              <ul>
                {tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default TaskManager;
