// pages/index.tsx
'use client'

import { useState } from 'react';
import styles from './Home.module.css';

const HomePage = () => {
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);

  const handlePunchIn = () => {
    setIsAttendanceMarked(true);
  };

  const handlePunchOut = () => {
    setIsAttendanceMarked(false);
  };

  const handleMonthlyAttendance = () => {
    console.log('Fetching monthly attendance data...');
  };

  const handleYearlyAttendance = () => {
    console.log('Fetching yearly attendance data...');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p>
            Today's Attendance:
            {isAttendanceMarked ? (
              <span className={`${styles.icon} ${styles['icon-marked']}`}>&#10004;</span>
            ) : (
              <span className={`${styles.icon} ${styles['icon-not-marked']}`}>&#10006;</span>
            )}
          </p>
        </div>
        <div className={styles['button-container']}>
          <button onClick={handlePunchIn}>Punch In</button>
          <button onClick={handlePunchOut}>Punch Out</button>
        </div>
      </header>

      <main className={styles.main}>
        <h1>Welcome to Your Student Homepage</h1>
      </main>

      <footer className={styles.footer}>
        <button onClick={handleMonthlyAttendance}>Monthly Attendance</button>
        <button onClick={handleYearlyAttendance}>Yearly Attendance</button>
      </footer>
    </div>
  );
};

export default HomePage;


