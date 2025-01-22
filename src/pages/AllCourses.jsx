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
        <div className='bg-slate-500'>
            {!isAuthenticated && 
                <nav className="text-base text-gray-400">
                <a href="/" className="hover:text-white">Home</a> &gt;
                <span className="text-white">All Courses</span>
            </nav>
            }
            <div className='grid grid-cols-1 md:grid-cols-2 bg-white lg:grid-cols-3 gap-4'>
                {
                    courses.map((course) => (
                        <ShowCourse key={course.id} course={course} /> // Provide a unique key
                    ))
                }
            </div>
        </div>
    );
}

export default AllCourses