import React, { useState } from 'react'
import AllCourses from '../AllCourses'
import CourseList from '../../components/core/samRoleComponents/CourseList';

export const Courses = ({ user }) => {
    const [enrollCourses] = useState(user.enrollCourses);
    const [seeCourseDetails, setSeeCourseDetails] = useState(false);
    const [seeCourseId, setSeeCourseId] = useState('')

    const ViewCourseHandle = (courseId) => {
        setSeeCourseDetails(true)
        setSeeCourseId(courseId);
    }
    return (
        <div>
            {
                !seeCourseDetails ? (
                    <div className="min-h-screen w-auto bg-gray-700">

                        {/* Main Content */}
                        <main className="container mx-auto py-8 px-5">
                            {/* Courses Section */}
                            <section className="mb-8">
                                <h3 className="text-xl font-bold text-gray-700 text-white mb-4">My Enrolled Courses</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        enrollCourses?.map((course, index) => (
                                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                                <h4 className="font-bold text-blue-700">{course.courseName}</h4>
                                                <p className="text-sm text-gray-600">{course.courseDescription}</p>
                                                <img className="m-2  " src={course.thumbnails} />
                                                <button onClick={() => ViewCourseHandle(course._id)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                                    View Course
                                                </button>
                                            </div>
                                        ))
                                    }
                                    {enrollCourses.length === 0 &&
                                        <h4 className="font-bold text-gray-500 mb-5 rounded-lg shadow-lg p-3">No any Course</h4>
                                    }

                                </div>
                            </section>

                            {/* Recommended Section */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-100  pt-3 mb-4">Recommended for You</h3>
                                <AllCourses />
                            </section>
                        </main>


                    </div>
                ) : (
                    <CourseList courseId={seeCourseId} />
                )
            }


        </div >
    )
}
