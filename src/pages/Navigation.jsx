import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import AuthContext from '../Context/AuthContext';

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    if (isAuthenticated) {
        return null;
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='bg-primary'>
            <div className='w-11/12 max-w-[1160px] mx-auto text-white py-4 font-semibold flex flex-col md:flex-row justify-between items-center'>
                <div className="flex items-center h-10 px-4">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-full object-contain"
                    />
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-white m-2 text-2xl'>
                        ☰
                    </button>
                </div>
                <div className={`flex-col md:flex-row gap-4 md:gap-7 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <Link className='hover:text-black ' to='/'>Home</Link>
                    <Link className='hover:text-black ' to='/ContactForm'>Contact</Link>
                    <Link className='hover:text-black ' to='/showAllCourses'>Courses</Link>
                </div>
                <div className={`text-secondary flex-col md:flex-row gap-4 md:gap-7 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <NavLink className='border p-1 px-2 hover:bg-gray-200 hover:text-black ' to='/login'>Login</NavLink>
                    <NavLink className='border p-1 px-2 hover:bg-gray-200 hover:text-black ' to='/signup'>Signup</NavLink>
                </div>
            </div>
        </div>
    );
}
