import React from 'react'
import { publishCourseApi } from '../../api/courseApi'
import { toast } from 'react-toastify'

export const PublishCourse = ({ courseId }) => {
    const clickHandler = async () => {
        const payload = {
            courseId
        }
        try {
            const { data } = await publishCourseApi(payload);
            console.log(data);
            toast.success('The Course is Publishing...')
        }
        catch (error) {
            console.log(error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again.";
            toast.error(errorMessage);
        }
    }
    return (
        <button onClick={clickHandler} className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white font-semibold py-2 px-11 rounded-lg shadow-md transition-transform transform hover:scale-110">
            Publish Course
        </button>
    )
}
