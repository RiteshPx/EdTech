import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../api/courseApi';

function CourseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState('');

    const payload = {
        courseId,
    }

    useEffect(() => {
        console.log(courseId);
        async function fetchData() {
            try {
                const response = await getCourseDetails(payload);
                console.log(response);
                setCourse(response.data.courseDetail);
            } catch (e) {
                console.log("Error fetching course details:", e.response?.data || e.message);
            }
        }
        fetchData();
    }, [courseId])

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-gray-900 text-white flex flex-col md:flex-row justify-evenly w-full h-auto md:h-[50vh] p-8">
                <section className="md:w-1/2 ">
                    <nav className="text-sm text-gray-400 mb-4">
                        <a href="/" className="hover:text-white">Home</a> &gt;
                        <a href="/" className="hover:text-white"> Courses</a> &gt;
                        <span className="text-white"> {course.courseName}</span>
                    </nav>

                    <div className="mt-6">
                        <h1 className="text-3xl font-bold">{course.courseName}</h1>
                    </div>

                    <p className="mt-6 text-xl text-gray-300">
                        {course.courseDescription}
                    </p>
                    <p className="  text-gray-400 text-sm">{course.whatYouWillLearn}</p>

                    <p className="mt-6 text-2xl">Classes starting soon - Enroll Now!</p>

                    <div className="mt-8 flex gap-4">
                        <button className="bg-orange-500 py-2 px-6 text-white text-lg rounded-md hover:bg-orange-400 transition-all">Buy Now</button>
                        <button className="bg-green-500 py-2 px-6 text-white text-lg rounded-md hover:bg-green-400 transition-all">Share</button>
                    </div>
                    <div className="mt-4  text-xl flex items-center">
                        <p className="line-through text-gray-400">₹{course.price + 2000}/-</p>
                        <p className="text-2xl ml-3 font-medium text-green-500">₹{course.price}/-</p>
                    </div>
                </section>

                <section className="text-center flex justify-center mt-8 md:mt-0">
                    <img
                        src={course.thumbnails}
                        alt="Course Advertisement"
                        className="h-64 w-auto md:h-4/5 rounded-lg shadow-lg"
                    />
                </section>
            </div>
            <div className="p-8 bg-blue-100">
                {/* <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                <p className="text-xl mb-8">{course.instructor?.firstName} {course.instructor?.lastName}</p> */}
                <h2 className="text-2xl font-bold mb-4">Feedback</h2>
                <div className="space-y-4">
                    {course.ratingAndReviews?.length > 0 ? (
                        course.ratingAndReviews.map((feedback, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <p className="mb-2 text-lg">{feedback.review}</p>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-7 text-2xl h-7 ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </div>
                                    ))}
                                </div>
                                <hr className="border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <p className="text-xl">No feedback available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;
