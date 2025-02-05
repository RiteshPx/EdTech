import axios from "axios";
const Backend_Url = process.env.REACT_APP_API_BASE_URL

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: `${Backend_Url}/api/v1/`,
});

// Add request interceptor to attach JWT token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Get JWT from localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Attach token to headers
  }
  return config;
});

export default axiosInstance;
