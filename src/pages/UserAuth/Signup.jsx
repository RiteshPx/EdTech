import React, { useState } from 'react';
import { OtpPage } from '../../components/core/OTP/OtpPage';
import { toast } from 'react-toastify';
import { sendOtpApi } from '../../api/userApi';
import img2 from '../../assets/images/signup.jpg';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        accountType: 'Student', // Default value
        contactNumber: '+91 ',
        otp: '',
    });

    const [otpPageVisible, setOtpPageVisible] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitDetails = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.warn("password and confirm password doesn't match ");
        }
        setLoading(true);
        const payload = {
            email: formData.email,
        }
        try {
            const response = await sendOtpApi(payload)
            console.log(response.data); // Handle successful response
            console.log(formData);
            setLoading(false);
            setOtpPageVisible(1);
        } catch (error) {
            console.log(error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again.";
            toast.error(errorMessage);
            setLoading(false)
        }
    }

    return (
        <div className='bg-primary min-h-screen flex items-center justify-center'>
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            ) : (
                <>
                    {otpPageVisible ? (
                        <OtpPage formData={formData} setFormData={setFormData} handleChange={handleChange} />
                    ) : (
                        <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
                            <div className='w-full md:w-1/2 h-64 md:h-auto hidden md:block'>
                                <img src={img2} alt="signup" className="w-full h-full object-cover rounded-l-lg" />
                            </div>
                            <div className='w-full md:w-1/2 p-4'>
                                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
                                <form onSubmit={handleSubmitDetails} className="space-y-4">
                                    <div className='flex flex-col md:flex-row gap-2'>
                                        <div className='w-full'>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter your first name"
                                                required
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter your last name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col md:flex-row gap-2'>
                                        <div className='w-full'>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row gap-2 items-center'>
                                        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                                            Account Type
                                        </label>
                                        <div className="flex gap-2 bg-gray-200 p-2 text-sm rounded-lg">
                                            <div
                                                className={`cursor-pointer px-2 p-1 border rounded-lg ${formData.accountType === 'Student' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}
                                                onClick={() => setFormData({ ...formData, accountType: 'Student' })}
                                            >
                                                Student
                                            </div>
                                            <div
                                                className={`cursor-pointer px-2 p-1 border rounded-lg ${formData.accountType === 'Instructor' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}
                                                onClick={() => setFormData({ ...formData, accountType: 'Instructor' })}
                                            >
                                                Instructor
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SignupForm;
