import React from 'react';
import LearningTime from '../../components/core/studentHomePage/LearningTime';
import MyActivity from '../../components/core/studentHomePage/MyActivity';
import MyCourses from '../../components/core/studentHomePage/MyCourses';
// import UpcomingTasks from './UpcomingTasks';

const Dashboard = () => {
  return (
    <div className="p-4 w-full bg-white h-5/6">
      <div className="grid grid-cols-2 gap-4">
        <LearningTime />
        <MyActivity />
      </div>
      <MyCourses />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* <UpcomingTasks /> */}
      </div>
    </div>  
  );
};

export default Dashboard;
