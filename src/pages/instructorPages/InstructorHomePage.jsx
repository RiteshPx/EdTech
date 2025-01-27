import React, { useContext, useState } from 'react';
import Logo from "../../assets/images/logo.png"
import Header from '../../components/core/studentHomePage/Header';
import {Dashboard } from './Dashboard';
import AuthContext from '../../Context/AuthContext';
import { UserProfile } from '../samePagesOfRoles/UserProfile';
import { UserSetting } from '../samePagesOfRoles/UserSetting';
import CreateCoursePage from './CreateCoursePage';
import { DraftCourses } from './DraftCourses';

export default function InstructorHomePage() {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [selectedItem, setSelectedItem] = useState('Dashboard'); // Default selected item
  const menuItems = [
    'Dashboard',
    'Create Course',
    'Draft Courses',
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
    <div className="flex h-full">
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
        {selectedItem === 'Profile' && <UserProfile user={user}/>}
        {selectedItem === 'Setting' && <UserSetting user={user} handleSelection={handleSelection}/>}
        {selectedItem === 'Create Course' && <CreateCoursePage/>}
        {selectedItem === 'Draft Courses' && <DraftCourses user={user}/>}
       

      </div>
    </div>
  );
}  