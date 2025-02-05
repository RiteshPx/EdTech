import React, { useContext, useState } from 'react';
import Logo from "../../assets/images/logo.png";
import Header from '../../components/core/studentHomePage/Header';
import Dashboard from './Dashboard';
import AuthContext from '../../Context/AuthContext';
import { Courses } from './Courses';
import { UserProfile } from '../samePagesOfRoles/UserProfile';
import { UserSetting } from '../samePagesOfRoles/UserSetting';

export default function StudentHomePage() {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [selectedItem, setSelectedItem] = useState('Dashboard'); // Default selected item
  const menuItems = [
    'Dashboard',
    'Course',
        'Chat',
    'Profile',
    'Setting',
  ];

  const handleSelection = (item) => {
    setSelectedItem(item); // Update the selected item
  };

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="flex h-screen bg-secondary">
      {/* Sidebar */}
      <div className="bg-primay rounded-3xl h-full w-1/6 p-4 sticky top-0 flex flex-col  items-center border-8  border-secondary">
        <img
          src={Logo}
          alt="Logo"
          className="h-16 w-16 object-contain mb-8"
        />
        <ul className="text-white space-y-4 w-full">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleSelection(item)} // Handle item selection
              className={`cursor-pointer p-3 rounded text-center ${
                selectedItem === item
                  ? 'bg-white text-green-500 font-bold'
                  : 'hover:bg-gray-200'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Main Content */}
      <div className="flex-grow overflow-y-auto p-2 w-11/12">
        <Header user={user} />
        {selectedItem === 'Dashboard' && <Dashboard user={user} />}
        {selectedItem === 'Course' && <Courses user={user} />}
        {selectedItem === 'Profile' && <UserProfile user={user} />}
        {selectedItem === 'Setting' && <UserSetting user={user} handleSelection={handleSelection} />}
           {/* Footer */}
           <footer className="bg-primay text-white py-3 rounded-b-md px-4 sticky bottom-0">
                    <p className="text-center">
                        &copy; {new Date().getFullYear()} EdTech Platform. All rights reserved.
                    </p>
                </footer>
      </div>

    </div>
  );
}