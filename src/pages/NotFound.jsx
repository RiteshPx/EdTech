import React from 'react';
import { useNavigate } from 'react-router-dom';
export const NotFound = () => {
  const navigate =useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-9xl font-bold text-red-500">404</h1>
            <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>
            <button
                onClick={()=>navigate('/')}
                className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
            >
                Back to Home
            </button>
        </div>
    );
};

