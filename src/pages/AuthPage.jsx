import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AuthPage.css";
import logImage from "../assets/log.svg";
import registerImage from "../assets/register.svg";

const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    acceptTerms: true,
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const { login, register, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Handle theme
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Handle form mode
  const toggleMode = (mode) => {
    setIsSignUpMode(mode === "signup");
  };

  // Handle login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle register form
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.username, loginData.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.acceptTerms) {
      alert("Please accept the terms and services");
      return;
    }

    try {
      await register({
        name: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <>
      <div className="auth-home-link">
        <Link to="/" className="back-to-home">
          <i className="fas fa-home"></i> Back to Home
        </Link>
      </div>
      <div
        className={`container-auth ${isSignUpMode ? "sign-up-mode" : ""}`}
        ref={containerRef}
      >
        <div className="forms-container">
          <div className="signin-signup">
            {/* Login Form */}
            <form className="sign-in-form" onSubmit={handleLoginSubmit}>
              <h2 className="title">Login</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="Username"
                  required
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  id="id_password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <i
                  className={`far ${
                    showLoginPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                ></i>
              </div>

              <button type="submit" className="btn solid" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <div className="social-media">
                <a className="icon-mode" onClick={() => toggleTheme("dark")}>
                  <i className="fas fa-moon"></i>
                </a>
                <a className="icon-mode" onClick={() => toggleTheme("light")}>
                  <i className="fas fa-sun"></i>
                </a>
              </div>
              <p className="text-mode">Change theme</p>

              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}
            </form>

            {/* Register Form */}
            <form className="sign-up-form" onSubmit={handleRegisterSubmit}>
              <h2 className="title">Register</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="Username"
                  required
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  id="id_reg"
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                <i
                  className={`far ${
                    showRegisterPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  id="toggleReg"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                ></i>
              </div>

              <label className="check">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={registerData.acceptTerms}
                  onChange={handleRegisterChange}
                />
                <span className="checkmark">
                  I accept the <a href="/terms">terms and services</a>
                </span>
              </label>

              <button type="submit" className="btn solid" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create account"}
              </button>

              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Panels */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>You don't have an account?</h3>
              <p>
                Create your account right now to follow people and like
                publications
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => toggleMode("signup")}
              >
                Register
              </button>
            </div>
            <img src={logImage} className="image" alt="login illustration" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>Already have an account?</h3>
              <p>
                Login to see your notifications and post your favorite photos
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => toggleMode("signin")}
              >
                Sign in
              </button>
            </div>
            <img
              src={registerImage}
              className="image"
              alt="register illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
