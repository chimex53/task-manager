import React from 'react';
import styles from './TaskManager.module.css';

const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <span>Loading...</span>
  </div>
);

export default Spinner;
