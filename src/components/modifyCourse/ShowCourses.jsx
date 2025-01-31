import React, { useState } from 'react'
import { getCourseDetails } from '../../api/courseApi';
import { PublishCourse } from '../createCourseComponent/PublishCourse';
import { toast } from 'react-toastify';

export const ShowCourses = ({ course, setEditModal, setSelectedCourse }) => {

    const editHandler = async (courseId) => {
        const payload = {
            courseId
        }
        try {
            const { data } = await getCourseDetails(payload);
            setSelectedCourse(data.courseDetail);
            setEditModal(true);
        } catch (error) {
             console.log(error);    
                        const errorMessage =
                            error.response?.data?.message ||
                            "An unexpected error occurred. Please try again.";
                        toast.error(errorMessage);
        }
    }
    return (<>
        <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl  transition-shadow duration-300">
            {/* Course Thumbnail */}
            <img
                src={course.thumbnails}
                alt={course.name}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
            />

            {/* Course Details */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {course.courseName}
            </h2>
            <p className="text-gray-600 text-sm italic mb-2">
                {course.courseDescription}
            </p>
            <p className="text-lg font-semibold text-blue-500 mb-2">
                Price: ₹{course.price}
            </p>
            <p className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1 inline-block mb-4">
                #{course.tag}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center ">               
               { course.status !== "Published" &&
                <PublishCourse courseId={course._id} />
               }
                <button onClick={() => editHandler(course._id)} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-9 rounded-lg shadow-md transition-transform transform hover:scale-110">
                    Add More Content
                </button>
            </div>
        </div>
      
    </>
    )
}
