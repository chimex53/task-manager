import React from 'react';
import styles from './TaskManager.module.css';

const TaskForm = ({ task, setTask, handleAdd }) => (
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
);

export default TaskForm;
