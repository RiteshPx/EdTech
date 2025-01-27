import React, { useState } from 'react'
import { ShowCourses } from '../../components/modifyCourse/ShowCourses';
import { AdditionDetails } from '../../components/createCourseComponent/AdditionDetails';


export const Dashboard = ({ user }) => {
  const Courses = user.enrollCourses;
  const [seeMoreModal, setSeeMoreModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className='bg-gray-100'>
      {
      !seeMoreModal &&
        <>
          <div>My Created Courses :</div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 bg-gray-200 p-7">
            {
              Courses.map((course, index) => (
                course.status === "Published" &&
                <ShowCourses course={course} setSelectedCourse={setSelectedCourse} setEditModal={setSeeMoreModal}></ShowCourses>

              ))
            }
          </div>
        </>
      }
      {seeMoreModal && 
             <div className="flex justify-center   items-center h-full bg-white">
           <AdditionDetails course={selectedCourse} />      
           </div>}

    </div >
  )
}
