import React from "react";
import { resetPassword } from "../../api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
const navigate=useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const payload = {
        email: event.target.email.value,
      }
      const { data } = await resetPassword(payload);   //api call
      toast.info("Check Your Mail for Reset Password");
    navigate("/login");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Enter your email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="your-email@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

