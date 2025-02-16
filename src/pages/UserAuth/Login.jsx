import React, { useContext, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userlogin } from '../../api/userApi';
import img2 from '../../assets/images/a-woman-at-desk.jpg';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await userlogin(formData);
            const loginUser = response.data.user;

            // Store JWT token in Local Storage
            localStorage.setItem("authToken", response.data.token);

            setIsAuthenticated(true);
            setLoading(false);
            toast.success('Login Successful!');
            setUser(loginUser);
            // Handle successful login (e.g., navigate, save token, etc.)

            if (loginUser.accountType === "Student") {
                navigate('/Student');
            }
            else if (loginUser.accountType === "Instructor") {
                navigate('/Instructor');
            }

        } catch (error) {
            console.error('Login Failed:', error.response?.data || error.message);
            setLoading(false);
            toast.warning('Login Failed! Please check your credentials.', {
                style: {
                    backgroundColor: "#f44336", // Red background
                    color: "#fff",              // White text
                    fontWeight: "bold",         // Bold text
                    padding: "10px",
                }
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl flex flex-col md:flex-row">
                <div className='w-full md:w-1/2 h-64 md:h-auto'>
                    <img src={img2} alt="login" className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                </div>
                <div className='w-full md:w-1/2 p-4'>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
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

                        {/* Password Field */}
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

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full py-2 px-4 ${loading ? 'bg-gray-500' : 'bg-indigo-600'
                                    } text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500`}
                                disabled={loading}
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-center">
                            <a href="/resetPassword" className="text-indigo-600 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
