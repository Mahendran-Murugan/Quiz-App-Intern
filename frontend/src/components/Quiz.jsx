import React from 'react'
import { Outlet } from 'react-router-dom'

export const Quiz = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            < Outlet />
        </div >
    )
}
