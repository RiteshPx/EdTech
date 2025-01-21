import React, { useContext, useState } from 'react';
import Logo from "../../assets/images/logo.png"
import Header from '../../components/core/studentHomePage/Header';
import Dashboard from './Dashboard';
import AuthContext from '../../Context/AuthContext';
import { Courses } from './Courses';
import { StudentProfile } from './StudentProfile';
import { StudentSetting } from './StudentSetting';

export default function StudentHomePage() {
  const { user,setUser } = useContext(AuthContext);
  console.log(user);

  const [selectedItem, setSelectedItem] = useState('Dashboard'); // Default selected item
  const menuItems = [
    'Dashboard',
    'Course',
    'Resources',
    'Chat',
    'Schedule',
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-primary h-1/4 w-1/6 p-4 sticky top-0  ">
        <img
          src={Logo}
          alt="Logo"
          className="h-2/4 w-2/5 object-contain"
        />
        <ul className="mt-6 text-white space-y-4">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleSelection(item)} // Handle item selection
              className={`cursor-pointer p-2 rounded ${
                selectedItem === item
                  ? 'bg-white text-green-500 font-bold'
                  : ''
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        <Header user={user} />
        {selectedItem === 'Dashboard' && <Dashboard user={user}/>}
        {selectedItem === 'Course' && <Courses user={user}/>}
        {selectedItem === 'Profile' && <StudentProfile user={user}/>}
        {selectedItem === 'Setting' && <StudentSetting user={user} handleSelection={handleSelection}/>}
      </div>
    </div>
  );
}  