import React, { useContext, useNavigate ,useState} from 'react'
import AuthContext from '../../Context/AuthContext';


 const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login, user, loading } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await login(formData);
            alert('Login Successful!');
           // Handle successful login (e.g., navigate, save token, etc.)

            // if (user.accountType === "Instructor") {
            //     navigate('/InstructorLogin');
            // }
            // else if (user.accountType === "Student") {
            //     navigate('/StudentLogin');
            // } else {
            //     navigate('/Admin');
            // }

        } catch (error) {
            console.error('Login Failed:', error.response?.data || error.message);
            alert('Login Failed. Please check your credentials.');
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-primay">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
                        <a href="/forgot-password" className="text-indigo-600 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                </form>
            </div>
          </div>
    )
}


export default Login;