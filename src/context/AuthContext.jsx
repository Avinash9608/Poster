import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
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
        const token = localStorage.getItem("token");

        if (token) {
          // Set auth token header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Get user data
          const res = await axios.get(
            "https://publicityposterbackend.onrender.com/api/users/profile"
          );

          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Clear token if invalid
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];

        setError(err.response?.data?.message || "Authentication failed");
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const register = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        "https://publicityposterbackend.onrender.com/api/auth/register",
        formData,
        config
      );

      // Save token to local storage
      localStorage.setItem("token", res.data.token);

      // Set auth token header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setUser(res.data.user);
      setIsAuthenticated(true);

      return res.data;
    } catch (err) {
      let errorMsg = "Registration failed";

      if (err.response) {
        if (err.response.status === 400) {
          errorMsg = err.response.data.message || "Email already registered";
        } else if (err.response.status === 500) {
          errorMsg = "Server error during registration";
        }
      }

      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.post(
        "https://publicityposterbackend.onrender.com/api/auth/login",
        {
          email: email.trim(),
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setUser(res.data.user);
      setIsAuthenticated(true);

      return res.data;
    } catch (err) {
      let errorMsg = "Login failed";

      if (err.response) {
        console.error("Login error response:", err.response.data); // Debug log
        if (err.response.data.message) {
          errorMsg = err.response.data.message;
        }
      }

      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Remove auth header
    delete axios.defaults.headers.common["Authorization"];

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
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
// export { AuthProvider, useAuth };
