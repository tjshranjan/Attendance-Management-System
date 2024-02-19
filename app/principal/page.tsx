'use client'

import React, { useState } from 'react';
import styles from './Principal.module.css';
import axios from 'axios';

const PrincipalHomePage = () => {
  const [attendanceType, setAttendanceType] = useState('');
  const [targetType, setTargetType] = useState('');
  const [specificTeacher, setSpecificTeacher] = useState('');
  const [specificStudent, setSpecificStudent] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [attendanceArray, setAttendanceArray] = useState([]); // State to store fetched data

  const handleGenerateReport = async () => {
    if (!attendanceType || !targetType || !timeFrame) {
      console.error('Incomplete selection. Please fill in all required fields.');
      return;
    }

    let apiUrl = `${process.env.NEXT_PUBLIC_BURL}`; // Replace with the actual URL of your API

    if (targetType === 'specific') {
      apiUrl += `/${attendanceType}/specific`;

      if (attendanceType === 'teacher') {
        apiUrl += `/${specificTeacher}`;
      } else if (attendanceType === 'student') {
        apiUrl += `/${specificStudent}`;
      }

      if (timeFrame === 'monthly') {
        apiUrl += `/monthly/${selectedYear}/${selectedMonth}`;
      } else if (timeFrame === 'yearly') {
        apiUrl += `/yearly/${selectedYear}`;
      }
    } else if (targetType === 'combined') {
      apiUrl += `/${attendanceType}/combined`;

      if (timeFrame === 'today') {
        apiUrl += '/today';
      } else if (timeFrame === 'monthly') {
        apiUrl += `/monthly/${selectedYear}/${selectedMonth}`;
      } else if (timeFrame === 'yearly') {
        apiUrl += `/yearly/${selectedYear}`;
      }
    }

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      setAttendanceArray(data); // Update state with fetched data
    } catch (error) {
      setAttendanceArray([]);
      console.error('Error fetching data:',error);
      // Add your error handling logic here
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome, Principal!</h1>
      </header>

      <main className={styles.main}>
        <section className={styles['principal-section']}>
          <h2>Attendance Reports</h2>

          <div className={styles.options}>
            <div className={styles['label-container']}>
              <label htmlFor="attendanceType">Select Attendance Type:</label>
            </div>
            <select
              id="attendanceType"
              value={attendanceType}
              onChange={(e) => setAttendanceType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>

            {attendanceType && (
              <>
                <div className={styles['label-container']}>
                  <label htmlFor="targetType">Select Target Type:</label>
                </div>
                <select
                  id="targetType"
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="specific">Specific</option>
                  <option value="combined">Combined</option>
                </select>
              </>
            )}

            {targetType === 'specific' && (
              <>
                {attendanceType === 'teacher' && (
                  <>
                    <div className={styles['label-container']}>
                      <label htmlFor="specificTeacher">Select Teacher:</label>
                    </div>
                    <input
                      type="text"
                      id="specificTeacher"
                      value={specificTeacher}
                      onChange={(e) => setSpecificTeacher(e.target.value)}
                    />
                  </>
                )}

                {attendanceType === 'student' && (
                  <>
                    <div className={styles['label-container']}>
                      <label htmlFor="specificStudent">Select Student:</label>
                    </div>
                    <input
                      type="text"
                      id="specificStudent"
                      value={specificStudent}
                      onChange={(e) => setSpecificStudent(e.target.value)}
                    />
                  </>
                )}

                <div className={styles['label-container']}>
                  <label htmlFor="timeFrame">Select Time Frame:</label>
                </div>
                <select
                  id="timeFrame"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>

                {timeFrame === 'monthly' && (
                  <>
                    <div className={styles['label-container']}>
                      <label htmlFor="selectedMonth">Select Month:</label>
                    </div>
                    <input
                      type="text"
                      id="selectedMonth"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    />

                    <div className={styles['label-container']}>
                      <label htmlFor="selectedYear">Select Year:</label>
                    </div>
                    <input
                      type="text"
                      id="selectedYear"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    />
                  </>
                )}

                {timeFrame === 'yearly' && (
                  <>
                    <div className={styles['label-container']}>
                      <label htmlFor="selectedYear">Select Year:</label>
                    </div>
                    <input
                      type="text"
                      id="selectedYear"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    />
                  </>
                )}
              </>
            )}

            {targetType === 'combined' && (
              <>
                <div className={styles['label-container']}>
                  <label htmlFor="timeFrame">Select Time Frame:</label>
                </div>
                <select
                  id="timeFrame"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="today">Today</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>

                {timeFrame === 'monthly' && (
                  <>
                    <div className={styles['label-container']}>
                      <label htmlFor="selectedMonth">Select Month:</label>
                    </div>
                    <input
                      type="text"
                      id="selectedMonth"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    />

                    <div className={styles['label-container']}>
                      <label htmlFor="selectedYear">Select Year:</label>
                    </div>
                    <input
                      type="text"
                      id="selectedYear"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    />
                  </>
                )}

                {timeFrame === 'yearly' && (
                  <>
                    <div className={styles['label-container']}>
                      <label htmlFor="selectedYear">Select Year:</label>
                    </div>
                    <input
                      type="text"
                      id="selectedYear"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    />
                  </>
                )}
              </>
            )}

            <div className={styles['button-container']}>
              <button onClick={handleGenerateReport}>Generate Report</button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Principal: Your Name</p>
      </footer>
    </div>
  );
};

export default PrincipalHomePage;
