import React from 'react'

interface Iprops {
    name?: string,
    username?: string,
    time?: string,
    noOfPresentDays?: number,
    date?: number,
    month?: number,
    year?: number,
    status?: boolean,
}

const ClassAttendanceCard: React.FC<Iprops> = (props) => {
    console.log('pahunch gya')
    return (
        <div>
            <h3>{props.name}</h3>
            <p><b>Username:</b> {props.username}</p>
            {props.time && <p><b>Time:</b> {props.time}</p>}
            {props.noOfPresentDays!=undefined && <p><b>Present Days:</b> {props.noOfPresentDays}</p>}
            {props.date && <p><b>Date:</b> {props.date}</p>}
            {props.month && <p><b>Month:</b> {props.month}</p>}
            {props.year && <p><b>Year:</b> {props.year}</p>}
            <hr />
        </div>
    )
}

export default ClassAttendanceCard