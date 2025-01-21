import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/images/logo.png'
import AuthContext from '../Context/AuthContext'

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) {
        return;
    }
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
                    <Link to='/ContactForm'>Contact</Link>
                    <Link to='/showAllCourses'>Courses</Link>
                </div>
                <div className=' text-secondary'>
                    {

                        <div className=' flex gap-7'>
                            <NavLink className='border p-1 px-2 ' to='/login'>Login</NavLink>
                            <NavLink className='border p-1  px-2' to='/signup'>Signup</NavLink>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
