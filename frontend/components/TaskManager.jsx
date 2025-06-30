import React, { useState } from 'react';
import styles from './TaskManager.module.css';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleComplete = (idx) => {
    setCompleted([...completed, idx]);
  };

  const handleDelete = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    setCompleted(completed.filter(i => i !== idx));
    if (editIdx === idx) {
      setEditIdx(null);
      setEditValue('');
    }
  };

  const handleEdit = (idx, value) => {
    setEditIdx(idx);
    setEditValue(value);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = (idx) => {
    if (editValue.trim()) {
      setTasks(tasks.map((t, i) => (i === idx ? editValue : t)));
      setEditIdx(null);
      setEditValue('');
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue('');
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
      <div className={styles.statsRow}>
        <span className={styles.stats}><b>Total Tasks:</b> {tasks.length}</span>
        <span className={styles.stats}><b>Completed Tasks:</b> {completed.length}</span>
      </div>
      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <p className={styles.noTask}>No task added. Please add a task.</p>
        ) : (
          <ul className={styles.ul}>
            {tasks.map((t, i) => (
              <li className={styles.taskItem} key={i}>
                {editIdx === i ? (
                  <>
                    <input
                      className={styles.input}
                      value={editValue}
                      onChange={handleEditChange}
                      autoFocus
                    />
                    <button className={styles.addBtn} onClick={() => handleEditSave(i)} type="button">Save</button>
                    <button className={styles.addBtn} onClick={handleEditCancel} type="button">Cancel</button>
                  </>
                ) : (
                  <>
                    <span className={completed.includes(i) ? styles.completed : ''}>
                      <b>{i + 1}.</b> {t}
                    </span>
                    <span className={styles.icons}>
                      <FaCheck
                        className={styles.iconBtn}
                        title="Mark as completed"
                        style={{ color: 'green' }}
                        onClick={() => handleComplete(i)}
                      />
                      <FaEdit
                        className={styles.iconBtn}
                        title="Edit"
                        style={{ color: '#a000a0' }}
                        onClick={() => handleEdit(i, t)}
                      />
                      <FaTrash
                        className={styles.iconBtn}
                        title="Delete"
                        style={{ color: 'crimson' }}
                        onClick={() => handleDelete(i)}
                      />
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
