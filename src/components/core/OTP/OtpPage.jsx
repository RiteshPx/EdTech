import React, { useState } from 'react';
import { signup } from '../../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const OtpPage = ({ formData, setFormData, handleChange }) => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit the OTP (Here you can add logic to validate or send OTP)
        try {
            // const response = await signup(formData);
            const response = await signup(formData);          // axios.post("http://localhost:4000/api/v1/auth/signup", formData);
            console.log(response.data);
            console.log(formData);
            toast.success(`OTP Submitted: ${formData.otp}`);
            navigate('/login');
        }
        catch (error) {
            setFormData((prevFormData) => ({
                ...prevFormData, // Spread the previous state
                otp: '', // Update only the otp field
            }));            
            toast.warn("OTP doesn't match");
            console.error('Error sending OTP:', error.response?.data || error.message); // Handle error
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-primay">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Enter OTP</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        maxLength="6"
                        minLength="6"
                        className="w-full text-center text-3xl p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                        placeholder="Enter OTP"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
};

