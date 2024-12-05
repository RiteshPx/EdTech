import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/images/logo.png'

export const Navigation = ({ isLogin, setIsLog }) => {
    return (
        <div className='bg-gray-800 text-white p-4 font-semibold flex justify-between  space-x-4'>
            <div className=' '>
                <img src="" alt="Logo" />
            </div>
            <div className=' flex gap-7'>
                <Link to='/'>Home</Link>
                <Link to='/Contact'>Contact</Link>
                <Link to='/Course'>Courses</Link>
            </div>
            <div>
                {
                   !isLogin &&
                    <div className=' flex gap-7'>
                        <NavLink className='border p-1 px-2' to='/login'>Login</NavLink>
                        <NavLink className='border p-1  px-2' to='/signup'>Signup</NavLink>
                    </div>
                }
                {
                    isLogin &&
                    <div className=' flex gap-7 '>
                        <NavLink className='border p-1 px-2 'to='/Logout'>Logout</NavLink>
                        <NavLink className='border p-1 px-2' to='/Profile'>Profile</NavLink>
                    </div>
                }
            </div>
        </div>
    )
}
