import React, { createContext, useState, useEffect } from 'react';
import { isLogin, logoutUser } from '../api/userApi'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Send a request to the backend to check if the user is authenticated
    async function fetchUser() {
      const response = await isLogin()
        .then(response => {
          // If the response is successful, user is authenticated
          setUser(response.data.user);
          setIsAuthenticated(true);
          console.log(response.data.user);
        })
        .catch(error => {
          // If there's an error (e.g., the cookie is missing or invalid), user is not authenticated
          setIsAuthenticated(false);
        });
    }
    fetchUser();
  }, []);  

  // Logout function
  const logout = async () => {
    try {
      await logoutUser()
        .then(res => {
          toast.success("logout successfully");
          setUser(null); // Clear user state after logout
          setIsAuthenticated(false);
          navigate('/');
        })
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

  // AuthContext value
  const value = { setUser, setIsAuthenticated, setLoading, logout, isAuthenticated, user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the AuthContext
export default AuthContext;
