import React from 'react'
import { CourseCard } from '../../components/core/homePage/CourseCard'
import AllCourses from '../AllCourses'
export const Courses = () => {
    return (
        <div>

            <div className="min-h-screen bg-gray-100">
                
                {/* Main Content */}
                <main className="container mx-auto py-8 px-5">
                    {/* Courses Section */}
                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">My Enrolled Courses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Course Card */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h4 className="font-bold text-blue-700">Course Name 1</h4>
                                <p className="text-sm text-gray-600">
                                    A brief description of the course goes here.
                                </p>
                                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    View Course
                                </button>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h4 className="font-bold text-blue-700">Course Name 2</h4>
                                <p className="text-sm text-gray-600">
                                    A brief description of the course goes here.
                                </p>
                                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    View Course
                                </button>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h4 className="font-bold text-blue-700">Course Name 3</h4>
                                <p className="text-sm text-gray-600">
                                    A brief description of the course goes here.
                                </p>
                                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    View Course
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Recommended Section */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Recommended for You</h3>
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                        {/* Recommended Course Card */}
                        {/* <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-bold text-blue-700">Recommended Course 1</h4>
              <p className="text-sm text-gray-600">
                A brief description of this recommended course goes here.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Enroll Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-bold text-blue-700">Recommended Course 2</h4>
              <p className="text-sm text-gray-600">
                A brief description of this recommended course goes here.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Enroll Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-bold text-blue-700">Recommended Course 3</h4>
              <p className="text-sm text-gray-600">
                A brief description of this recommended course goes here.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Enroll Now
              </button>
          </div>
            </div> */}
                        <AllCourses />
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-blue-600 text-white py-4 px-6">
                    <p className="text-center">
                        &copy; {new Date().getFullYear()} EdTech Platform. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    )
}
