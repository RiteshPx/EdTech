import React, { useState } from 'react';
import { AdditionDetails } from '../../components/createCourseComponent/AdditionDetails';
import { ShowCourses } from '../../components/modifyCourse/ShowCourses';


export const DraftCourses = ({ user }) => {
  const [editModal, setEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const Courses = user.enrollCourses;

 

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 bg-gray-200 p-7">
        {Courses.map((course, index) => (
          <>
            {
              !editModal ? (
                course.status === "Draft" && (
                  <ShowCourses course={course} setSelectedCourse={setSelectedCourse} setEditModal={setEditModal}></ShowCourses>
                )

              ) : (<></>)
            }

          </>

        ))}
      </div>
    
     {editModal && 
       <div className="flex justify-center   items-center h-full bg-white">
     <AdditionDetails course={selectedCourse} />      
     </div>}
      
    </>
  )
}
