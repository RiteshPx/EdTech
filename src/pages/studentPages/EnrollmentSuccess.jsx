import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToMyCourse } from '../../redux/Slices/CartSlice';
import { getCourseDetails } from '../../api/courseApi';
import AuthContext from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const EnrollmentSuccess = () => {
    const { user } = useContext(AuthContext);
    const id = user.enrollCourses?.at[-1];
    const dispatch = useDispatch();
    const { MyCourse } = useSelector((state) => state); // Access state using useSelector

    useEffect(() => {
        try {
            if (MyCourse.length > 0 && MyCourse.at(-1)?._id === id) {
                return;
            }
            const payload = {
                courseId: id,
            }
            const fetchData = async () => {
                const { data } = await getCourseDetails(payload);
                dispatch(addToMyCourse(data.courseDetail))
            }
            fetchData();
        } catch (error) {
            console.log(error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again.";
            toast.error(errorMessage);
        }
    }, [])
    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Enrollment Successful! 🎉</h1>
                <p className="text-gray-700 text-lg mb-6">
                    You have successfully enrolled in the course. Get ready to start your learning journey!
                </p>
                <Link to='/Student'>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"                    >
                        Go to Home Page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EnrollmentSuccess;
