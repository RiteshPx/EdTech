import React, { useState } from "react";
import { toast } from "react-toastify";
import { verifySignaturePassword } from "../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";

export const VerifyResetPassword = () => {
    const { token } = useParams();
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { newPassword, confirmPassword } = formData;
        if (newPassword !== confirmPassword) {
            toast.alert("Passwords do not match!");
            return;
        }
        const payload = {
            token,
            password: newPassword,
            confirmPassword
        }
        setLoading(true);
        try {
            const response = await verifySignaturePassword(payload);   //api call
            toast.success("Password successfully Reset");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Reset Your Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full text-white py-2 px-4 rounded-lg ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>
            </div>
                </div>
    );
};

