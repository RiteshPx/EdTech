import React, { useState } from 'react'
import { createSectionApi } from '../../api/courseApi';
import { ShowSection } from './ShowSection';
import { PublishCourse } from './PublishCourse';
import { toast } from 'react-toastify';

export const AdditionDetails = ({ course }) => {
    const [sectionModal, setSectionModal] = useState(false);
    const [sectionName, setSectionName] = useState('');
    const [courseContent, setCourseContent] = useState(course.courseContent);

    const handleSubmit = async (e) => {
        e.preventDefault();
       try{ const payload = {
            sectionName,
            courseId: course._id,
        }
        const { data } = await createSectionApi(payload);
        console.log("create section data", data);
        setCourseContent(data.updateCourse.courseContent)
        setSectionModal(false);
    }catch(error){
         console.log(error);
                    const errorMessage =
                        error.response?.data?.message ||
                        "An unexpected error occurred. Please try again.";
                    toast.error(errorMessage);
    }
    }
    return (
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col justify-center items-center h-full">
                <h3 className="text-xl text-gray-950 font-semibold">Course Name: {course.courseName}</h3>
                <p className="text-gray-600 mb-4">{course.courseDescription}</p>
            </div>

            {courseContent ? (
                courseContent.map((data, index) => (
                    <ShowSection data={data} index={index} />
                ))
            ) : (
                <></>
            )}

            {/* Add section btn */}
            {!sectionModal &&
                <div className='flex justify-between'>
                    <PublishCourse courseId={course._id}/>
                    <button onClick={() => setSectionModal(true)} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-9 rounded-lg shadow-md transition-transform transform hover:scale-110">Add Section</button>
                </div>
            }

            {/* create sectioon Modal */}
            {sectionModal &&
                <>
                    <h2 className="text-2xl font-bold mb-6 text-center">Create Sections for Course</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Section Name</label>
                            <input
                                type="text"
                                name="courseName"
                                value={sectionName}
                                onChange={(e) => setSectionName(e.target.value)}
                                placeholder="Enter course name"
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
                        >
                            Create Section
                        </button>
                    </form>
                </>
            }

        </div>
    )
}
