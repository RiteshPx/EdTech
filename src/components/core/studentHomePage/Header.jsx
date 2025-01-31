import React, { useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';

const Header = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const handleSelection = (event) => {
    if (event.target.value === 'logout') {
      logout();
    }
  };
  return (
    <div className="flex justify-between items-center p-4 bg-secondary shadow-md rounded-t-lg">
      <h1 className="text-2xl font-bold text-black">
        <span className='text-primay'>Welcome back, </span>
        {user.firstName} {user.lastName} !
      </h1>
      <div className="flex items-center">
        <img
          src={user.image}
          alt="User"
          className="rounded-full w-12 h-12 border-2 border-white"
        />
        <select
          className="ml-3 p-2 bg-white text-gray-700 rounded-md shadow-sm"
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
