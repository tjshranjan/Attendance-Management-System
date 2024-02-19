'use client'
import { useAppContext, useUser } from '@/app/context/context'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Link from 'next/link'
import NoAccess from '@/app/NoAccess'

interface userData {
    name: string,
    email: string,
}
const TeacherHome = () => {
    const { username } = useParams()
    const router = useRouter()
    const [userDetails, setUserDetails] = useState<userData>({ name: "", email: "" })
    const [loggedIn, setLoggedIn] = useState(false)
    const [inside, setInside] = useState(false)
    const { state, dispatch } = useAppContext()
    const { user } = useUser()
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const [notFound, setNotFound] = useState(false)
    interface AttendanceType {
        day: number,
        month: number, 
        time: string,
        year: number,
        status: boolean
    }
    const [attendanceData, setAttendanceData] = useState<AttendanceType[]|null>(null)
    const handleMonthChange = (e: any) => {
        setMonth(e.target.value)
    }
    const handleYearChange = (e: any) => {
        setYear(e.target.value)
    }

    useEffect(() => {
        if (state.teacherLogin) {
            setUserDetails(prev => {
                return { ...prev, name: user.name, email: user.email }
            })
            setLoggedIn(true)
        }
    }, [])
    const punchInHandler = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BURL}/teacher/punchin`, { username: username })
            setInside(true)
        } catch (error) {
            alert('Punch In Failed')
        }
    }
    const punchOutHandler = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BURL}/teacher/punchout`, { username: username })
            setInside(false)
        } catch (error) {
            alert('Punch Out Failed')
        }
    }
    const getAttendanceHandler = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BURL}/teacher/get-attendance/${username}/${month}/${year}`,)
            if(res.data){
                setAttendanceData(res.data)
                setNotFound(false)
            }
            else setNotFound(true)
            // console.log(res.data)
            setMonth(0)
            setYear(0)
        } catch (error) {
            alert('Enter Correct year and month')
            console.log("Error in getting attendance")
        }
    }
    // console.log(attendanceData)
    if (loggedIn) {
        return (
            <div>
                {inside ? <h1 style={{ border: 'solid', backgroundColor: 'black', color: 'white' }}>Entered Inside</h1> : <h1 style={{ border: 'solid', backgroundColor: 'black', color: 'white' }}>Outside</h1>}
                <Link href={`/teacher/${username}/class-attendance`} style={linkStyle}>Check Class Attendance</Link>
                <div>
                    <h2>Name: {userDetails.name}</h2>
                    <h2>Username: {username}</h2>
                    <h2>Email: {userDetails.email}</h2>
                </div>
                <br />
                <button className="btn-btn" onClick={punchInHandler}>Punch-In</button>
                <button className="btn-btn" onClick={punchOutHandler}>Punch-Out</button>
                <div>
                    <label htmlFor="" className="month">Month: </label>
                    <input type='number' value={month} name='month' className="month" placeholder='month' onChange={handleMonthChange} />
                        <br/>
                    <label htmlFor="" className="year">Year: </label>
                    <input type='number' value={year} name='year' className="year" placeholder='year' onChange={handleYearChange} />
                        <br/>
                    <button className="btn-btn" onClick={getAttendanceHandler}>Get-Attendance</button>
                </div>
                <div>
                    {attendanceData && attendanceData.map((item, id) => {
                        return <div key={id}>
                            <Card {...item} />
                        </div>
                    })}
                    {notFound && <h5>Data Not Found</h5>}
                </div>
            </div>
        )
    }
    else {
        return <NoAccess />
    }
}

export default TeacherHome



const linkStyle: React.CSSProperties = {
    padding: '10px 15px',
    backgroundColor: '#3498db',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
};