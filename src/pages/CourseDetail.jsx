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
    }, [])

    return (
        <div>
            <div className="bg-gray-900 text-white flex justify-evenly w-full h-[50vh] ">
                <section className="p-8 w-1/2 ">
                    <nav className="text-sm text-gray-400">
                        <a href="/" className="hover:text-white">Home</a> &gt;
                        <a href="/" className="hover:text-white"> Courses</a> &gt;
                        <span className="text-white"> {course.courseName}</span>
                    </nav>

                    <div className="mt-6">
                        <h1 className="text-3xl font-bold">{course.courseName}</h1>
                        {/* <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm">#Bestseller</span> */}
                    </div>

                    <p className="mt-6 text-xl text-gray-300">
                        {course.courseDescription}
                    </p>

                    <p className="mt-6 text-2xl">Classes starting soon - Enroll Now!</p>

                    <div className="mt-8 flex gap-4">
                        <button className="bg-orange-500 py-2 px-6 text-white text-lg rounded-md hover:bg-orange-400 transition-all">Buy Now</button>
                        <button className="bg-green-500 py-2 px-6 text-white text-lg rounded-md hover:bg-green-400 transition-all">Share</button>
                    </div>
                    <div className="mt-4 text-xl flex ">
                        <p>₹{course.price +2000}/-</p>
                        <p className="text-2xl ml-3">₹{course.price}/-</p>
                    </div>

                </section>

                <section className="text-center flex justify-center mt-16">
                    <img
                        src={course.thumbnails}
                        alt="Course Advertisement"
                        className="h-4/5 w-auto"
                    />

                </section>
            </div>
            <div>
                 //details
            </div>
        </div>
    );


}

export default CourseDetails;
