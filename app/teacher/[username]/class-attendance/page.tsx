'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppContext } from '@/app/context/context';
import NoAccess from '@/app/NoAccess';
import ClassAttendanceCard from './ClassAttendanceCard';

interface AttendanceData {
  name?: string,
  username?: string,
  time?: string,
  noOfPresentDays?: number,
  date?: number,
  month?: number,
  year?: number,
  status?: boolean,
}

const AttendanceCheckPage: React.FC = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>(''); // To store the selected option
  const [selectedClass, setSelectedClass] = useState<string>(''); // To store the selected class
  const [selectedStudentUsername, setSelectedStudentUsername] = useState<string>(''); // To store the selected student's username
  const [selectedStudentOption, setSelectedStudentOption] = useState<string>(''); // To store the selected student option
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // To store the selected month
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // To store the selected year
  const [selectedDate, setSelectedDate] = useState<string>(''); // To store the selected date
  // state for getting attendance data
  const [attendanceArray, setAttendanceArray] = useState<AttendanceData[]>([]);
  const { state } = useAppContext()
  useEffect(() => {
    if (state.teacherLogin) setLoggedIn(true)
  }, [])

  const [flag, setFlag] = useState(false)
  useEffect(() => {
    if (attendanceArray && attendanceArray.length) setFlag(true)
    else setFlag(false)
  }, [attendanceArray])

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAttendanceArray([])
    setSelectedOption(event.target.value);
    setSelectedClass('');
    setSelectedStudentUsername('');
    setSelectedStudentOption('');
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedDate('');
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleStudentUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStudentUsername(event.target.value);
  };

  const handleStudentOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudentOption(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const month = parseInt(event.target.value, 10);
    setSelectedMonth(isNaN(month) ? null : month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(isNaN(year) ? null : year);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };





  const handleCheckAttendance = async () => {
    console.log('inside caller')
    if (selectedOption === 'class') {
      if (selectedClass && selectedClass.trim() !== '') {
        if (selectedStudentOption === 'today') {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BURL}/teacher/get-today-class-attendance/${selectedClass}`)
            setAttendanceArray(res.data)
            console.log('got hit')
          } catch (error) {
            setAttendanceArray([])
            console.log('Error in getting today\'s class attendance', error);
          }
        } else if (selectedStudentOption === 'monthly' && selectedMonth !== null && selectedYear !== null) {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BURL}/teacher/get-monthly-class-attendance/${selectedClass}/${selectedMonth}/${selectedYear}`)
            setAttendanceArray(res.data)
          } catch (error) {
            setAttendanceArray([])
            console.log('Error in getting monthly class attendance', error);
          }
        } else if (selectedStudentOption === 'specific' && selectedDate) {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BURL}/teacher/get-class-attendance/${selectedClass}/${selectedDate}`)
            setAttendanceArray(res.data)
          } catch (error) {
            setAttendanceArray([])
            console.log('Error in getting yearly class attendance', error);
          }
        }
      }
    } else if (selectedOption === 'student') {
      if (selectedStudentUsername && selectedStudentUsername.trim() !== '') {
        if (selectedStudentOption === 'monthly' && selectedMonth !== null && selectedYear !== null) {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BURL}/teacher/get-monthly-student-attendance/${selectedStudentUsername}/${selectedMonth}/${selectedYear}`)
            setAttendanceArray([res.data])
          } catch (error) {
            setAttendanceArray([])
            console.log('Error in getting monthly student attendance', error);
          }
        } else if (selectedStudentOption === 'yearly' && selectedYear !== null) {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BURL}/teacher/get-yearly-student-attendance/${selectedStudentUsername}/${selectedYear}`)
            console.log(res.data)
            setAttendanceArray([res.data])
          } catch (error) {
            setAttendanceArray([])
            console.log('Error in getting yearly student attendance', error);
          }
        }
      }
    }
  };
  console.log(attendanceArray)
  if (!loggedIn) {
    return <NoAccess />
  }
  return (
    <div>
      <h1>Check Attendance</h1>
      <label htmlFor="attendanceOption">Select an option:</label>
      <select id="attendanceOption" onChange={handleOptionChange} value={selectedOption}>
        <option value="">Select an option</option>
        <option value="class">Class</option>
        <option value="student">Student</option>
      </select>

      {selectedOption === 'class' && (
        <div>
          <label htmlFor="class">Enter class:</label>
          <input
            type="text"
            id="class"
            onChange={handleClassChange}
            value={selectedClass}
          />
          <label htmlFor="classOption">Select a class option:</label>
          <select id="classOption" onChange={handleStudentOptionChange} value={selectedStudentOption}>
            <option value="">Select a class option</option>
            <option value="today">Today's Attendance</option>
            <option value="monthly">Monthly Attendance</option>
            <option value="specific">Specific Date Attendance</option>
          </select>
          {selectedStudentOption === 'specific' && (
            <div>
              <label htmlFor="date">Enter date (YYYY-MM-DD):</label>
              <input
                type="text"
                id="date"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
          )}
          {selectedStudentOption === 'monthly' && (
            <div>
              <label htmlFor="month">Enter month:</label>
              <input
                type="number"
                id="month"
                min={1}
                max={12}
                onChange={handleMonthChange}
                value={selectedMonth ?? ''}
              />
              <label htmlFor="year">Enter year:</label>
              <input
                type="number"
                id="year"
                min={2000}
                max={new Date().getFullYear()} // You may adjust the max year as needed
                onChange={handleYearChange}
                value={selectedYear ?? ''}
              />
            </div>
          )}
        </div>
      )}

      {selectedOption === 'student' && (
        <div>
          <label htmlFor="studentUsername">Enter student's username:</label>
          <input
            type="text"
            id="studentUsername"
            onChange={handleStudentUsernameChange}
            value={selectedStudentUsername}
          />
          <label htmlFor="studentOption">Select a student option:</label>
          <select id="studentOption" onChange={handleStudentOptionChange} value={selectedStudentOption}>
            <option value="">Select a student option</option>
            <option value="monthly">Monthly Attendance</option>
            <option value="yearly">Yearly Attendance</option>
          </select>
          {selectedStudentOption === 'monthly' && (
            <div>
              <label htmlFor="month">Enter month:</label>
              <input
                type="number"
                id="month"
                min={1}
                max={12}
                onChange={handleMonthChange}
                value={selectedMonth ?? ''}
              />
              <label htmlFor="year">Enter year:</label>
              <input
                type="number"
                id="year"
                min={2000}
                max={new Date().getFullYear()} // You may adjust the max year as needed
                onChange={handleYearChange}
                value={selectedYear ?? ''}
              />
            </div>
          )}

          {selectedStudentOption === 'yearly' && (
            <div>
              <label htmlFor="year">Enter year:</label>
              <input
                type="number"
                id="year"
                min={2000}
                max={new Date().getFullYear()} // You may adjust the max year as needed
                onChange={handleYearChange}
                value={selectedYear ?? ''}
              />
            </div>
          )}
        </div>
      )}

      <button onClick={handleCheckAttendance}>Check Attendance</button>
      <div>
        {attendanceArray && attendanceArray.map((item, id) => {
          return <div key={id}><ClassAttendanceCard {...item} /></div>;
        })}
        {!flag && <h4>No Data Found...</h4>}
      </div>
    </div>
  );
};

export default AttendanceCheckPage;