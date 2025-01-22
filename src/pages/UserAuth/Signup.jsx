import React, { useState } from 'react';
import axios from 'axios';
import { OtpPage } from '../../components/core/OTP/OtpPage';
import { toast } from 'react-toastify';
const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        accountType: 'Student', // Default value
        contactNumber: '',
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
        // const response = await sendOtp(formData.email);
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/sendOtp', payload);
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
        <div className='bg-primay h-full '>
            {loading ? (<div className="h-screen flex items-center justify-center">
                <span className="loader"></span>
            </div>
            ) : (<>
                {otpPageVisible ?
                    (<OtpPage formData={formData} setFormData={setFormData} handleChange={handleChange} />)
                    : (
                        <div className="min-h-screen flex items-center justify-center  ">
                            <div className=" bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
                                <form onSubmit={handleSubmitDetails} className="space-y-4">

                                    {/* First Name */}
                                    <div className='flex gap-2'>
                                        <div>
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

                                        {/* Last Name */}
                                        <div>
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
                                    {/* Email */}
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

                                    {/* Password */}
                                    <div className='flex gap-2'>
                                        <div>
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

                                        {/* Confirm Password */}
                                        <div>
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

                                    {/* Account Type */}
                                    <div className='flex justify-between align-middle'>
                                        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                                            Account Type
                                        </label>
                                        <select
                                            name="accountType"
                                            id="accountType"
                                            value={formData.accountType}
                                            onChange={handleChange}
                                            className="mt-1 block w-half p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        >
                                            <option value="Student">Student</option>
                                            <option value="Instructor">Instructor</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>

                                    {/* Contact Number */}
                                    <div>
                                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            id="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter your contact number"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div >
                        </div >
                    )
                }

            </>
            )}
        </div >

    );
};

export default SignupForm;
