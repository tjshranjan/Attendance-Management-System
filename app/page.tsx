'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAppContext, useUser } from './context/context';
import styles from './first.module.css'
const Login: React.FC = () => {
  let [username, setUsername] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  const router = useRouter()
  const { state, dispatch } = useAppContext()
  const { user, setUser } = useUser()

  useEffect(() => {
    dispatch({ type: 'OUT' })
  }, [])

  const handleLogin = async (userType: string) => {
    if(username === '' || password === '') return;
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BURL}/login`, { username: username, password: password, userType: userType })
      // console.log(res.data)
      setUser({ name: res.data.name, email: res.data.email })
      if (res.status === 200) {
        if (userType === 'Principal') {
          dispatch({ type: 'PRINCIPAL_IN' })
          router.push(`principal`)
        }
        else if (userType === 'Teacher') {
          dispatch({ type: 'TEACHER_IN' })
          router.push(`teacher/${username}`)
        }
        else {
          dispatch({ type: 'STUDENT_IN' })
          router.push(`student/${username}`)
        }
      }
    } catch (error) {
      alert('Invalid credentials! Please try again.')
      setUsername('')
      setPassword('')
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form}>
        <div>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => handleLogin('Principal')}
            className={`${styles.button} ${styles.principal}`}
          >
            Login as Principal
          </button>
          <button
            type="button"
            onClick={() => handleLogin('Teacher')}
            className={`${styles.button} ${styles.teacher}`}
          >
            Login as Teacher
          </button>
          <button
            type="button"
            onClick={() => handleLogin('Student')}
            className={`${styles.button} ${styles.student}`}
          >
            Login as Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
