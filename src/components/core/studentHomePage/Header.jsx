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
    <div className="flex justify-between items-center p-4 bg-green-300 ">
      <h1 className="text-xl font-bold">
        <span className='text-white'>Welcome back, </span>
         {user.firstName} {user.lastName} !</h1>
      <div className="flex items-center">
        <img
          src={user.image}
          alt="User"
          className="rounded-full w-10 h-10"
        />
        <select
          className="ml-3 p-1"
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
