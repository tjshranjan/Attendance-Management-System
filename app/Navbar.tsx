'use client'
import React from 'react'
import { useAppContext } from './context/context'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const {state,dispatch} = useAppContext()
    const router = useRouter()
    const handleClick = () => {
        dispatch({type:'OUT'})
        router.push('/')
    }
  return (
    <div>
        <button className="btn-btn" onClick={handleClick}>Log Out</button>
    </div>
  )
}

export default Navbar