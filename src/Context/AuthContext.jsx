import React, { createContext, useState, useEffect } from 'react';
import { isLogin, logoutUser } from '../api/userApi'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Send a request to the backend to check if the user is already logged in
    async function fetchUser() {
      const response = await isLogin()
        .then(response => {
          setUser(response.data.user);
          setIsAuthenticated(true);
          setLoading(false)
          console.log(response.data.user);
        })
        .catch(error => {
           console.error('Not authenticated:', error.response?.data || error.message);
          setLoading(false)
          setIsAuthenticated(false);
        });
    }
    fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      localStorage.removeItem("authToken"); // Remove token
      setLoading(true);
      navigate('/login');
        
    } catch (error) {
      setLoading(false);
    }
  };

  // AuthContext value
  const value = { setUser, setIsAuthenticated, setLoading, logout, isAuthenticated, user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthContext;
