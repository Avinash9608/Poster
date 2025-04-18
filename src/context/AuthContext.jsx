import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Set auth token header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user data
          const res = await axios.get('/api/users/profile');
          
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Clear token if invalid
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        
        setError(err.response?.data?.message || 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await axios.post('/api/users', userData);
      
      // Save token to local storage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await axios.post('/api/users/login', { email, password });
      
      // Save token to local storage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
