import React from 'react'
interface Iprops{
    day: number,
        month: number, 
        time: string,
        year: number,
        status: boolean
}
const Card:React.FC<Iprops> = (props) => {
  return (
    <div>
        <h5>{props.day}/{props.month}/{props.year}---------------{props.time}</h5>
    </div>
  )
}

export default Card