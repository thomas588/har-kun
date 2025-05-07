import React, { createContext, useState, useEffect, useContext } from 'react';
import { message } from 'antd';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is logged in on initial render
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Check local storage for user data
        const userData = localStorage.getItem('harKunUser');
        if (userData) {
          const user = JSON.parse(userData);
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Sign in function
  const signIn = async (username, password) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For now, just simulate success with any credentials
      const mockUser = {
        id: '123456',
        username,
        name: 'Test User',
        email: 'user@example.com',
        photoURL: null,
        role: 'user',
      };
      
      // Save user to local storage
      localStorage.setItem('harKunUser', JSON.stringify(mockUser));
      
      // Update state
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      message.error('Authentication failed. Please try again.');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up function
  const signUp = async (userData) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For now, just simulate success
      const mockUser = {
        id: '123456',
        username: userData.username,
        name: userData.name || 'New User',
        email: userData.email,
        photoURL: null,
        role: 'user',
      };
      
      // In real app, we'd save user after API call
      // localStorage.setItem('harKunUser', JSON.stringify(mockUser));
      // setCurrentUser(mockUser);
      // setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      message.error('Registration failed. Please try again.');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  // Sign out function
  const signOut = () => {
    try {
      // Remove user from local storage
      localStorage.removeItem('harKunUser');
      
      // Update state
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      message.error('Sign out failed. Please try again.');
      return { success: false, error };
    }
  };
  
  // Update user profile function
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For now, just update local storage
      const updatedUser = { ...currentUser, ...profileData };
      
      // Save updated user to local storage
      localStorage.setItem('harKunUser', JSON.stringify(updatedUser));
      
      // Update state
      setCurrentUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      message.error('Profile update failed. Please try again.');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For now, just simulate success
      
      return { success: true };
    } catch (error) {
      console.error('Change password error:', error);
      message.error('Password change failed. Please try again.');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    currentUser,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
    changePassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
