import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { userlogin } from '../api/userApi'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false); 

  
  // Fetch current user on initial load
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const response = await axiosInstance.get('/auth/user');
  //         setUser(response.data); // Backend should return user data
  //       } catch (error) {
  //         console.error('Error fetching user:', error.response?.data || error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchUser();
  //   }, [axiosInstance]);


  // Login function
  
  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await  userlogin(formData);;
      setUser(response.data.user);
      console.log(response.data.user) // Backend should return user data on successful login
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  // Logout function
  const logout = async () => {
    try {
      //   await axiosInstance.post('/auth/logout');
      setUser(null); // Clear user state after logout
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

  // AuthContext value
  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the AuthContext
export default AuthContext;
