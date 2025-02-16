import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails, averageRatingAndReviewApi } from '../api/courseApi';

function CourseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState('');
    const [averageRating, setAverageRating] = useState(0);

    const payload = {
        courseId,
    }

    useEffect(() => {
        console.log(courseId);
        async function fetchData() {
            try {
                const response = await getCourseDetails(payload);
                const response1 = await averageRatingAndReviewApi(payload);
                setAverageRating(response1.data.AverageRating);
                setCourse(response.data.courseDetail);
            } catch (e) {
                console.log("Error fetching course details:", e.response?.data || e.message);
            }
        }
        fetchData();
    }, [courseId])

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-gray-900 text-white flex flex-col md:flex-row justify-evenly w-full h-auto md:h-[55vh] p-4 md:p-8">
                <section className="md:w-1/2">
                    <nav className="text-sm text-gray-400 mb-4">
                        <a href="/" className="hover:text-white">Home</a> &gt;
                        <a href="/#/showAllCourses" className="hover:text-white"> Courses</a> &gt;
                        <span className="text-white"> {course.courseName}</span>
                    </nav>

                    <div className="mt-6">
                        <h1 className="text-2xl md:text-3xl font-bold">{course.courseName}</h1>
                    </div>

                    <p className="mt-6 text-lg md:text-xl text-gray-300">
                        {course.courseDescription}
                    </p>
                    <p className="text-gray-400 text-sm">{course.whatYouWillLearn}</p>
                    <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-5 md:w-7 text-xl md:text-2xl h-5 md:h-7 ${i < averageRating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                                ★
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-xl md:text-2xl">Classes starting soon - Enroll Now!</p>

                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <button className="bg-orange-500 py-2 px-4 md:px-6 text-white text-lg rounded-md hover:bg-orange-400 transition-all">Buy Now</button>
                        <button className="bg-green-500 py-2 px-4 md:px-6 text-white text-lg rounded-md hover:bg-green-400 transition-all">Share</button>
                    </div>
                    <div className="mt-4 text-lg md:text-xl flex items-center">
                        <p className="line-through text-gray-400">₹{course.price + 2000}/-</p>
                        <p className="text-xl md:text-2xl ml-3 font-medium text-green-500">₹{course.price}/-</p>
                    </div>
                </section>

                <section className="text-center flex justify-center mt-8 md:mt-0 content-center">
                    <img
                        src={course.thumbnails}
                        alt="Course Advertisement"
                        className="h-48 md:h-72 w-auto  rounded-lg shadow-lg"
                    />
                </section>
            </div>
            <div className="p-4 md:p-8 bg-blue-100">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Feedback</h2>
                <div className="space-y-4">
                    {course.ratingAndReviews?.length > 0 ? (
                        course.ratingAndReviews.map((feedback, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <img className='rounded-full h-8 w-8 object-cover inline' src={feedback.user.image} alt={`${feedback.user.firstName} ${feedback.user.lastName}`} />
                                <p className="text-lg font-bold inline ml-3">{feedback.user.firstName} {feedback.user.lastName}</p>
                                <p className="mb-2 text-lg">{feedback.review}</p>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-5 md:w-7 text-xl md:text-2xl h-5 md:h-7 ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </div>
                                    ))}
                                </div>
                                <hr className="border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <p className="text-lg md:text-xl">No feedback available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;
