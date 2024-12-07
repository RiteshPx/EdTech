import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/images/logo.png'

export const Navigation = (props) => {
    return (
        <div className='bg-primay'>
            <div className=' w-11/12 max-w-[1160px] mx-auto text-white py-4 font-semibold flex justify-evenly  items-center space-x-4'>
                <div className="flex items-center h-10 px-4">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-full object-contain"
                    />
                </div>


                <div className=' flex gap-7'>
                    <Link to='/'>Home</Link>
                    <Link to='/Contact'>Contact</Link>
                    <Link to='/Course'>Courses</Link>
                </div>
                <div className=' text-secondary'>
                    {
                        !props.isLogin &&
                        <div className=' flex gap-7'>
                            <NavLink className='border p-1 px-2 ' to='/login'>Login</NavLink>
                            <NavLink className='border p-1  px-2' to='/signup'>Signup</NavLink>
                        </div>
                    }
                    {
                        props.isLogin &&
                        <div className=' flex gap-7'>
                            <NavLink className='border p-1 px-2  ' to='/Logout'>Logout</NavLink>
                            <NavLink className='border p-1 px-2' to='/Profile'>Profile</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
