import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AuthPage.css";
import logImage from "../assets/log.svg";
import registerImage from "../assets/register.svg";

const AuthPage = () => {
  // First get the full context to check availability
  const authContext = useContext(AuthContext);

  // Check if context is available
  if (!authContext) {
    return <div className="auth-loading">Loading authentication system...</div>;
  }

  // Destructure context methods after verification
  const { login, register, isLoading, error } = authContext;

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [kycDocs, setKycDocs] = useState([]);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
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
    setStatusMessage({ text: "", type: "" });
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

  // Handle KYC document upload
  const handleKycUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setStatusMessage({
        text: "Maximum 3 documents allowed",
        type: "error",
      });
      return;
    }
    setKycDocs(files);
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!loginData.email || !loginData.password) {
      setStatusMessage({
        text: "⚠️ Please enter both email and password",
        type: "error",
      });
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      setStatusMessage({
        text: "✅ Login successful! Welcome back.",
        type: "success",
      });
      navigate("/");
    } catch (err) {
      let errorMessage = "❌ Login failed. Please try again.";

      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "❌ Invalid email or password";
        } else if (err.response.status === 403) {
          errorMessage = "⏳ Account pending admin approval";
        }
      } else if (err.message) {
        errorMessage = `⚠️ ${err.message}`;
      }

      setStatusMessage({
        text: errorMessage,
        type: "error",
      });
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!registerData.acceptTerms) {
      setStatusMessage({
        text: "⚠️ Please accept the terms and conditions",
        type: "error",
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setStatusMessage({
        text: "⚠️ Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", registerData.username.trim());
      formData.append("email", registerData.email.trim());
      formData.append("password", registerData.password);

      // Append KYC docs if any
      kycDocs.forEach((file) => {
        formData.append("kycDocs", file);
      });

      await register(formData);

      setStatusMessage({
        text: "🎉 Registration successful! Your account is under review. Please wait for admin approval (KYC pending).",
        type: "success",
      });

      // Switch to login mode after successful registration
      setTimeout(() => {
        setIsSignUpMode(false);
      }, 3000);
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";

      if (err.message.includes("already exists")) {
        errorMessage =
          "🚫 This email is already registered. Try logging in instead.";
      } else if (err.message.includes("Server error")) {
        errorMessage = "⚠️ Server error. Please try again later.";
      }

      setStatusMessage({
        text: errorMessage,
        type: "error",
      });
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
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={loginData.email}
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

              {statusMessage.text && !isSignUpMode && (
                <div className={`status-message ${statusMessage.type}`}>
                  <p>{statusMessage.text}</p>
                </div>
              )}
            </form>

            {/* Register Form */}
            <form className="sign-up-form" onSubmit={handleRegisterSubmit}>
              <h2 className="title">Register</h2>
              {/* New Username Field */}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="Username"
                  required
                  minLength="3"
                  maxLength="30"
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
                  id="id_password"
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                <i
                  className={`far ${
                    showRegisterPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                ></i>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  id="id_confirm_password"
                  required
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
                <i
                  className={`far ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  id="toggleConfirmPassword"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
              </div>

              <div className="kyc-upload">
                <label htmlFor="kycDocs">
                  KYC Documents (Optional, max 3 files):
                </label>
                <input
                  type="file"
                  id="kycDocs"
                  name="kycDocs"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleKycUpload}
                />
                {kycDocs.length > 0 && (
                  <div className="file-list">
                    <p>
                      Selected files:{" "}
                      {kycDocs.map((file) => file.name).join(", ")}
                    </p>
                  </div>
                )}
              </div>

              <label className="check">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={registerData.acceptTerms}
                  onChange={handleRegisterChange}
                  required
                />
                <span className="checkmark">
                  I accept the <a href="/terms">terms and conditions</a>
                </span>
              </label>

              <button type="submit" className="btn solid" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create account"}
              </button>

              {statusMessage.text && isSignUpMode && (
                <div className={`status-message ${statusMessage.type}`}>
                  <p>{statusMessage.text}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Panels */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New to our platform?</h3>
              <p>
                Register now to access all features after admin approval (KYC
                verification required)
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
              <p>Login to access your dashboard and manage your account</p>
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
