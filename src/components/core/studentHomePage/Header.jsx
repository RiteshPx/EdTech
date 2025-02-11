import React, { useContext, useState } from 'react';
import AuthContext from '../../../Context/AuthContext';
import { FaBars } from 'react-icons/fa'; // Importing an icon for the hamburger menu

const Header = ({ user, setMenuOpen, menuOpen }) => {
  const { logout } = useContext(AuthContext);

  const handleSelection = (event) => {
    if (event.target.value === 'logout') {
      logout();
    }
  };


  return (
    <div className="flex justify-between items-center p-4 bg-primay shadow-md rounded-t-lg">
      <div className="md:hidden bg-blue-500 mr-2 p-4">
        <FaBars className="text-white" onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      <h1 className="text-2xl font-bold text-white">
        <span className='text-secondary'>Welcome back, </span>
        {user.firstName} {user.lastName} !
      </h1>
      <div className="flex items-center">
        <img
          src={user.image}
          alt="User"
          className="rounded-full w-12 h-12 border-2 border-white"
        />
       
        <select
          className="ml-3 p-2 bg-white text-gray-700 rounded-md shadow-sm hidden md:block"
          onChange={handleSelection}
          defaultValue="default"
        >
          <option value="default" disabled>
            {user?.email}
          </option>
          <option value="logout">Log Out</option>
        </select>
      </div>
        
    </div>
  );
};

export default Header;
