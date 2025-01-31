import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BuyCourse } from '../buyCourseButton/BuyCourse';
import AuthContext from '../../../Context/AuthContext';

export const ShowCourse = ({ course }) => {
    const { user } = useContext(AuthContext);
    return (
        <> 
            {user?.enrollCourses?.some(enrollCourse =>enrollCourse._id === course._id) ? (<></>) : (
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    {/* Course Thumbnail */}
                    <img
                        src={course.thumbnails}
                        alt={course.courseName}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />

                    {/* Course Details */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.courseName}</h2>
                    <p className="text-gray-600 text-sm italic mb-2">{course.courseDescription}</p>
                    <p className="text-lg font-semibold text-blue-500 mb-2">Price: ₹{course.price}</p>
                    <p className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1 inline-block mb-4">
                        {course.tag}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                        <BuyCourse courseID={course._id}></BuyCourse>
                        <Link to={`/showCourse/${course._id}`}>
                            <button
                                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                                Explore More
                            </button>
                        </Link>
                    </div>
                </div>
            )
            }
        </>


    );
};
