import React, { useState } from 'react';
import { ShowCourses } from '../../components/modifyCourse/ShowCourses';
import { AdditionDetails } from '../../components/createCourseComponent/AdditionDetails';

export const Dashboard = ({ user }) => {
  const Courses = user.enrollCourses;
  const [seeMoreModal, setSeeMoreModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className='bg-gray-100 min-h-11/12 p-6'>
      {!seeMoreModal &&
        <>
          <div className="text-2xl font-bold mb-6 text-gray-800">My Created Courses:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Courses.map((course, index) => (
              course.status === "Published" &&
              <ShowCourses 
                key={index} 
                course={course} 
                setSelectedCourse={setSelectedCourse} 
                setEditModal={setSeeMoreModal} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              />
            ))}
          </div>
        </>
      }
      {seeMoreModal && 
        <div className="flex justify-center items-center h-full bg-white p-6 rounded-lg shadow-lg">
          <AdditionDetails course={selectedCourse} />      
        </div>
      }
    </div>
  );
}
