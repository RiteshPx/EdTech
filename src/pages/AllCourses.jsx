import React, { useContext, useEffect, useState } from 'react'
import { showAllCourse } from '../api/courseApi'
import { ShowCourse } from '../components/core/showCourses/ShowCourse'
import AuthContext from '../Context/AuthContext'

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    try {
        async function fetchData() {
            const response = await showAllCourse();
            setCourses(response.data.data);
        }
        useEffect(() => {
            fetchData();
        }, [])
    }
    catch (e) {
        console.log(e);
    }

    return (
        <div className='bg-gray-300 min-h-screen'>
            {!isAuthenticated && 
              <nav className="text-base pt-4 ml-7 text-gray-400 flex  items-center space-x-2">
              <a href="/" className="hover:text-blue-400 transition-colors duration-200">Home</a>
              <span className="text-gray-500">›</span>
              <span className="text-gray-800 font-medium">All Courses</span>
          </nav>
            }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-3 gap-4'>
                {
                    courses?.map((course) => (
                        <ShowCourse key={course.id} course={course} /> // Provide a unique key
                    ))
                }
            </div>
        </div>
    );
}

export default AllCourses