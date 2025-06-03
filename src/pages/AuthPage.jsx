// import { useState, useEffect, useContext, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./AuthPage.css";
// import logImage from "../assets/log.svg";
// import registerImage from "../assets/register.svg";

// const AuthPage = () => {
//   // First get the full context to check availability
//   const authContext = useContext(AuthContext);

//   // Check if context is available
//   if (!authContext) {
//     return <div className="auth-loading">Loading authentication system...</div>;
//   }

//   // Destructure context methods after verification
//   const { login, register, isLoading, error } = authContext;

//   const [isSignUpMode, setIsSignUpMode] = useState(false);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   const [registerData, setRegisterData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     acceptTerms: false,
//   });
//   const [kycDocs, setKycDocs] = useState([]);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();
//   const containerRef = useRef(null);

//   // Handle theme
//   useEffect(() => {
//     const currentTheme = localStorage.getItem("theme") || "light";
//     document.documentElement.setAttribute("data-theme", currentTheme);
//   }, []);

//   const toggleTheme = (theme) => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   };

//   // Handle form mode
//   const toggleMode = (mode) => {
//     setIsSignUpMode(mode === "signup");
//     setStatusMessage({ text: "", type: "" });
//   };

//   // Handle login form
//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle register form
//   const handleRegisterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setRegisterData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle KYC document upload
//   const handleKycUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 3) {
//       setStatusMessage({
//         text: "Maximum 3 documents allowed",
//         type: "error",
//       });
//       return;
//     }
//     setKycDocs(files);
//   };

//   // Handle login submit
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     // Basic client-side validation
//     if (!loginData.email || !loginData.password) {
//       setStatusMessage({
//         text: "⚠️ Please enter both email and password",
//         type: "error",
//       });
//       return;
//     }

//     try {
//       await login(loginData.email, loginData.password);
//       setStatusMessage({
//         text: "✅ Login successful! Welcome back.",
//         type: "success",
//       });
//       navigate("/");
//     } catch (err) {
//       let errorMessage = "❌ Login failed. Please try again.";

//       if (err.response) {
//         if (err.response.status === 400) {
//           errorMessage = "❌ Invalid email or password";
//         } else if (err.response.status === 403) {
//           errorMessage = "⏳ Account pending admin approval";
//         }
//       } else if (err.message) {
//         errorMessage = `⚠️ ${err.message}`;
//       }

//       setStatusMessage({
//         text: errorMessage,
//         type: "error",
//       });
//     }
//   };

//   // Handle register submit
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();

//     if (!registerData.acceptTerms) {
//       setStatusMessage({
//         text: "⚠️ Please accept the terms and conditions",
//         type: "error",
//       });
//       return;
//     }

//     if (registerData.password !== registerData.confirmPassword) {
//       setStatusMessage({
//         text: "⚠️ Passwords do not match",
//         type: "error",
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("username", registerData.username.trim());
//       formData.append("email", registerData.email.trim());
//       formData.append("password", registerData.password);

//       // Append KYC docs if any
//       kycDocs.forEach((file) => {
//         formData.append("kycDocs", file);
//       });

//       await register(formData);

//       setStatusMessage({
//         text: "🎉 Registration successful! Your account is under review. Please wait for admin approval (KYC pending).",
//         type: "success",
//       });

//       // Switch to login mode after successful registration
//       setTimeout(() => {
//         setIsSignUpMode(false);
//       }, 3000);
//     } catch (err) {
//       let errorMessage = "Registration failed. Please try again.";

//       if (err.message.includes("already exists")) {
//         errorMessage =
//           "🚫 This email is already registered. Try logging in instead.";
//       } else if (err.message.includes("Server error")) {
//         errorMessage = "⚠️ Server error. Please try again later.";
//       }

//       setStatusMessage({
//         text: errorMessage,
//         type: "error",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="auth-home-link">
//         <Link to="/" className="back-to-home">
//           <i className="fas fa-home"></i> Back to Home
//         </Link>
//       </div>
//       <div
//         className={`container-auth ${isSignUpMode ? "sign-up-mode" : ""}`}
//         ref={containerRef}
//       >
//         <div className="forms-container">
//           <div className="signin-signup">
//             {/* Login Form */}
//             <form className="sign-in-form" onSubmit={handleLoginSubmit}>
//               <h2 className="title">Login</h2>
//               <div className="input-field">
//                 <i className="fas fa-envelope"></i>
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   placeholder="Email"
//                   required
//                   value={loginData.email}
//                   onChange={handleLoginChange}
//                 />
//               </div>
//               <div className="input-field">
//                 <i className="fas fa-lock"></i>
//                 <input
//                   type={showLoginPassword ? "text" : "password"}
//                   name="password"
//                   autoComplete="current-password"
//                   placeholder="Password"
//                   id="id_password"
//                   required
//                   value={loginData.password}
//                   onChange={handleLoginChange}
//                 />
//                 <i
//                   className={`far ${
//                     showLoginPassword ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                   id="togglePassword"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowLoginPassword(!showLoginPassword)}
//                 ></i>
//               </div>
//               <button type="submit" className="btn solid" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </button>

//               <div className="social-media">
//                 <a className="icon-mode" onClick={() => toggleTheme("dark")}>
//                   <i className="fas fa-moon"></i>
//                 </a>
//                 <a className="icon-mode" onClick={() => toggleTheme("light")}>
//                   <i className="fas fa-sun"></i>
//                 </a>
//               </div>
//               <p className="text-mode">Change theme</p>

//               {statusMessage.text && !isSignUpMode && (
//                 <div className={`status-message ${statusMessage.type}`}>
//                   <p>{statusMessage.text}</p>
//                 </div>
//               )}
//             </form>

//             {/* Register Form */}
//             <form className="sign-up-form" onSubmit={handleRegisterSubmit}>
//               <h2 className="title">Register</h2>
//               {/* New Username Field */}
//               <div className="input-field">
//                 <i className="fas fa-user"></i>
//                 <input
//                   type="text"
//                   name="username"
//                   autoComplete="username"
//                   placeholder="Username"
//                   required
//                   minLength="3"
//                   maxLength="30"
//                   value={registerData.username}
//                   onChange={handleRegisterChange}
//                 />
//               </div>
//               <div className="input-field">
//                 <i className="fas fa-envelope"></i>
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   placeholder="Email"
//                   required
//                   value={registerData.email}
//                   onChange={handleRegisterChange}
//                 />
//               </div>
//               <div className="input-field">
//                 <i className="fas fa-lock"></i>
//                 <input
//                   type={showRegisterPassword ? "text" : "password"}
//                   name="password"
//                   autoComplete="new-password"
//                   placeholder="Password"
//                   id="id_password"
//                   required
//                   value={registerData.password}
//                   onChange={handleRegisterChange}
//                 />
//                 <i
//                   className={`far ${
//                     showRegisterPassword ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                   id="togglePassword"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowRegisterPassword(!showRegisterPassword)}
//                 ></i>
//               </div>
//               <div className="input-field">
//                 <i className="fas fa-lock"></i>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   autoComplete="new-password"
//                   placeholder="Confirm Password"
//                   id="id_confirm_password"
//                   required
//                   value={registerData.confirmPassword}
//                   onChange={handleRegisterChange}
//                 />
//                 <i
//                   className={`far ${
//                     showConfirmPassword ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                   id="toggleConfirmPassword"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 ></i>
//               </div>

//               <div className="kyc-upload">
//                 <label htmlFor="kycDocs">
//                   KYC Documents (Optional, max 3 files):
//                 </label>
//                 <input
//                   type="file"
//                   id="kycDocs"
//                   name="kycDocs"
//                   multiple
//                   accept=".jpg,.jpeg,.png,.pdf"
//                   onChange={handleKycUpload}
//                 />
//                 {kycDocs.length > 0 && (
//                   <div className="file-list">
//                     <p>
//                       Selected files:{" "}
//                       {kycDocs.map((file) => file.name).join(", ")}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <label className="check">
//                 <input
//                   type="checkbox"
//                   name="acceptTerms"
//                   checked={registerData.acceptTerms}
//                   onChange={handleRegisterChange}
//                   required
//                 />
//                 <span className="checkmark">
//                   I accept the <a href="/terms">terms and conditions</a>
//                 </span>
//               </label>

//               <button type="submit" className="btn solid" disabled={isLoading}>
//                 {isLoading ? "Creating Account..." : "Create account"}
//               </button>

//               {statusMessage.text && isSignUpMode && (
//                 <div className={`status-message ${statusMessage.type}`}>
//                   <p>{statusMessage.text}</p>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>

//         {/* Panels */}
//         <div className="panels-container">
//           <div className="panel left-panel">
//             <div className="content">
//               <h3>New to our platform?</h3>
//               <p>
//                 Register now to access all features after admin approval (KYC
//                 verification required)
//               </p>
//               <button
//                 className="btn transparent"
//                 id="sign-up-btn"
//                 onClick={() => toggleMode("signup")}
//               >
//                 Register
//               </button>
//             </div>
//             <img src={logImage} className="image" alt="login illustration" />
//           </div>
//           <div className="panel right-panel">
//             <div className="content">
//               <h3>Already have an account?</h3>
//               <p>Login to access your dashboard and manage your account</p>
//               <button
//                 className="btn transparent"
//                 id="sign-in-btn"
//                 onClick={() => toggleMode("signin")}
//               >
//                 Sign in
//               </button>
//             </div>
//             <img
//               src={registerImage}
//               className="image"
//               alt="register illustration"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthPage;
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AuthPage.css";
import logImage from "../assets/log.svg";
import registerImage from "../assets/register.svg";

const AuthPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div className="auth-loading">Loading authentication system...</div>;
  }

  const { login, register, isLoading, error } = authContext;
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    documentType: "aadhaar",
    documentFront: null,
    documentBack: null,
    selfie: null,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [cameraStream, setCameraStream] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Theme handling
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Form mode handling
  const toggleMode = (mode) => {
    setIsSignUpMode(mode === "signup");
    setCurrentStep(1);
    setStatusMessage({ text: "", type: "" });
    stopCamera();
    setCapturedImage(null);
  };

  // Login form handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Register form handlers
  const handleRegisterChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (files) {
      setRegisterData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setRegisterData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Step validation
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!registerData.username.trim())
        newErrors.username = "Username is required";
      if (!registerData.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(registerData.email))
        newErrors.email = "Email is invalid";
      if (!registerData.password) newErrors.password = "Password is required";
      else if (registerData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (registerData.password !== registerData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (currentStep === 2) {
      if (!registerData.aadhaarNumber)
        newErrors.aadhaarNumber = "Aadhaar number is required";
      if (!registerData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!registerData.gender) newErrors.gender = "Gender is required";
      if (!registerData.mobileNumber)
        newErrors.mobileNumber = "Mobile number is required";
    }

    if (currentStep === 3) {
      if (!registerData.documentFront) {
        newErrors.documentFront = "Document front is required";
      }
      if (!capturedImage) {
        newErrors.selfie = "Selfie is required";
      }
    }

    if (currentStep === 4 && !registerData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation between steps
  const nextStep = () => {
    if (validateStep()) {
      if (currentStep === 2) {
        initCamera();
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    stopCamera();
    setCurrentStep((prev) => prev - 1);
  };

  // Camera handling for face verification
  const initCamera = async () => {
    try {
      // Stop any existing camera stream
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });

      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setErrors((prev) => ({
        ...prev,
        faceVerification: "Camera access denied. Please allow camera access.",
      }));
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        track.stop();
      });
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureSelfie = () => {
    if (videoRef.current && canvasRef.current && videoRef.current.srcObject) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      const imageData = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageData);
      setRegisterData((prev) => ({
        ...prev,
        selfie: imageData,
      }));
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setRegisterData((prev) => ({ ...prev, selfie: null }));
    initCamera();
  };

  // Helper function to convert data URL to blob
  const dataURLtoBlob = (dataURL) => {
    if (!dataURL) return null;

    try {
      const arr = dataURL.split(",");
      if (arr.length < 2) return null;

      const mimeMatch = arr[0].match(/:(.*?);/);
      if (!mimeMatch) return null;

      const mime = mimeMatch[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new Blob([u8arr], { type: mime });
    } catch (error) {
      console.error("Error converting data URL to blob:", error);
      return null;
    }
  };

  // Form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setStatusMessage({
        text: "⚠️ Please enter both email and password",
        type: "error",
      });
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      navigate("/");
    } catch (err) {
      let errorMessage = "❌ Login failed. Please try again.";
      if (err.response?.status === 400) errorMessage = "❌ Invalid credentials";
      else if (err.response?.status === 403)
        errorMessage = "⏳ Account pending approval";
      setStatusMessage({ text: errorMessage, type: "error" });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      stopCamera();

      const formData = new FormData();

      // Append all registration data
      Object.keys(registerData).forEach((key) => {
        if (
          key === "documentFront" ||
          key === "documentBack" ||
          key === "selfie"
        ) {
          if (registerData[key]) {
            if (typeof registerData[key] === "string") {
              const blob = dataURLtoBlob(registerData[key]);
              if (blob) {
                formData.append(key, blob, `${key}.png`);
              }
            } else if (registerData[key] instanceof Blob) {
              formData.append(key, registerData[key]);
            }
          }
        } else if (
          registerData[key] !== null &&
          registerData[key] !== undefined
        ) {
          formData.append(key, registerData[key]);
        }
      });

      await register(formData);
      setStatusMessage({
        text: "🎉 Registration successful! Your account is under review.",
        type: "success",
      });
      setTimeout(() => setIsSignUpMode(false), 3000);
    } catch (err) {
      setStatusMessage({
        text: err.message || "Registration failed. Please try again.",
        type: "error",
      });
    }
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Auto-stop camera when leaving step 3
  useEffect(() => {
    if (currentStep !== 3) {
      stopCamera();
    } else {
      initCamera();
    }
  }, [currentStep]);

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
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
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

            {/* Registration Form */}
            <form className="sign-up-form" onSubmit={handleRegisterSubmit}>
              <div className="registration-progress">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`progress-step ${
                      currentStep === step ? "active" : ""
                    } ${currentStep > step ? "completed" : ""}`}
                  >
                    <div className="step-number">{step}</div>
                  </div>
                ))}
              </div>

              {/* Step 1: Account Information */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h2>Account Information</h2>

                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      className={errors.username ? "error" : ""}
                    />
                    {errors.username && (
                      <span className="error-message">{errors.username}</span>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className={errors.password ? "error" : ""}
                    />
                    {errors.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className={errors.confirmPassword ? "error" : ""}
                    />
                    {errors.confirmPassword && (
                      <span className="error-message">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-next"
                    >
                      Next: KYC Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: KYC Details */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h2>Identity Verification</h2>

                  <div className="input-field">
                    <i className="fas fa-id-card"></i>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      placeholder="Aadhaar Number"
                      value={registerData.aadhaarNumber}
                      onChange={handleRegisterChange}
                      className={errors.aadhaarNumber ? "error" : ""}
                    />
                    {errors.aadhaarNumber && (
                      <span className="error-message">
                        {errors.aadhaarNumber}
                      </span>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-birthday-cake"></i>
                    <input
                      type="date"
                      name="dateOfBirth"
                      placeholder="Date of Birth"
                      value={registerData.dateOfBirth}
                      onChange={handleRegisterChange}
                      className={errors.dateOfBirth ? "error" : ""}
                    />
                    {errors.dateOfBirth && (
                      <span className="error-message">
                        {errors.dateOfBirth}
                      </span>
                    )}
                  </div>

                  <div className="input-field radio-group">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={registerData.gender === "male"}
                        onChange={handleRegisterChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={registerData.gender === "female"}
                        onChange={handleRegisterChange}
                      />
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={registerData.gender === "other"}
                        onChange={handleRegisterChange}
                      />
                      Other
                    </label>
                    {errors.gender && (
                      <span className="error-message">{errors.gender}</span>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-phone"></i>
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={registerData.mobileNumber}
                      onChange={handleRegisterChange}
                      className={errors.mobileNumber ? "error" : ""}
                    />
                    {errors.mobileNumber && (
                      <span className="error-message">
                        {errors.mobileNumber}
                      </span>
                    )}
                  </div>

                  <div className="input-field">
                    <i className="fas fa-file-alt"></i>
                    <select
                      name="documentType"
                      value={registerData.documentType}
                      onChange={handleRegisterChange}
                    >
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="passport">Passport</option>
                      <option value="voter">Voter ID</option>
                      <option value="driver">Driver's License</option>
                      <option value="pan">PAN Card</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-prev"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-next"
                    >
                      Next: Document Upload
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload & Face Verification */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h2>Document Verification</h2>

                  <div className="document-upload">
                    <div className="upload-section">
                      <label>Document Front *</label>
                      <input
                        type="file"
                        name="documentFront"
                        accept="image/*,.pdf"
                        onChange={handleRegisterChange}
                        required
                      />
                      {registerData.documentFront && (
                        <div className="file-preview">
                          {registerData.documentFront.type?.startsWith(
                            "image/"
                          ) ? (
                            <img
                              src={URL.createObjectURL(
                                registerData.documentFront
                              )}
                              alt="Document front"
                            />
                          ) : (
                            <span>{registerData.documentFront.name}</span>
                          )}
                        </div>
                      )}
                      {errors.documentFront && (
                        <span className="error-message">
                          {errors.documentFront}
                        </span>
                      )}
                    </div>

                    <div className="upload-section">
                      <label>Document Back (if applicable)</label>
                      <input
                        type="file"
                        name="documentBack"
                        accept="image/*,.pdf"
                        onChange={handleRegisterChange}
                      />
                      {registerData.documentBack && (
                        <div className="file-preview">
                          {registerData.documentBack.type?.startsWith(
                            "image/"
                          ) ? (
                            <img
                              src={URL.createObjectURL(
                                registerData.documentBack
                              )}
                              alt="Document back"
                            />
                          ) : (
                            <span>{registerData.documentBack.name}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="face-verification">
                    <h3>Face Verification *</h3>
                    {errors.faceVerification && (
                      <div className="error-message">
                        {errors.faceVerification}
                      </div>
                    )}
                    {errors.selfie && (
                      <div className="error-message">{errors.selfie}</div>
                    )}

                    {!capturedImage ? (
                      <>
                        <div className="camera-container">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="camera-feed"
                          ></video>
                        </div>
                        <button
                          type="button"
                          onClick={captureSelfie}
                          className="btn-capture"
                        >
                          Capture Selfie
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="captured-image">
                          <img src={capturedImage} alt="Captured selfie" />
                        </div>
                        <button
                          type="button"
                          onClick={handleRetake}
                          className="btn-retake"
                        >
                          Retake
                        </button>
                      </>
                    )}
                    <canvas
                      ref={canvasRef}
                      style={{ display: "none" }}
                    ></canvas>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-prev"
                    >
                      Back
                    </button>
                    {registerData.documentFront && capturedImage && (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-next"
                      >
                        Next: Review & Submit
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="form-step">
                  <h2>Review & Submit</h2>

                  <div className="review-section">
                    <h3>Account Information</h3>
                    <div className="review-row">
                      <span>Username:</span>
                      <span>{registerData.username}</span>
                    </div>
                    <div className="review-row">
                      <span>Email:</span>
                      <span>{registerData.email}</span>
                    </div>

                    <h3>KYC Details</h3>
                    <div className="review-row">
                      <span>Aadhaar Number:</span>
                      <span>{registerData.aadhaarNumber}</span>
                    </div>
                    <div className="review-row">
                      <span>Date of Birth:</span>
                      <span>{registerData.dateOfBirth}</span>
                    </div>
                    <div className="review-row">
                      <span>Gender:</span>
                      <span>{registerData.gender}</span>
                    </div>
                    <div className="review-row">
                      <span>Mobile Number:</span>
                      <span>{registerData.mobileNumber}</span>
                    </div>
                    <div className="review-row">
                      <span>Document Type:</span>
                      <span>
                        {registerData.documentType === "aadhaar" &&
                          "Aadhaar Card"}
                        {registerData.documentType === "passport" && "Passport"}
                        {registerData.documentType === "voter" && "Voter ID"}
                        {registerData.documentType === "driver" &&
                          "Driver's License"}
                        {registerData.documentType === "pan" && "PAN Card"}
                      </span>
                    </div>
                  </div>

                  <div className="terms-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={registerData.acceptTerms}
                        onChange={handleRegisterChange}
                      />
                      <span className="checkmark"></span>I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                    {errors.acceptTerms && (
                      <span className="error-message">
                        {errors.acceptTerms}
                      </span>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-prev"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Complete Registration"}
                    </button>
                  </div>

                  {statusMessage.text && isSignUpMode && (
                    <div className={`status-message ${statusMessage.type}`}>
                      <p>{statusMessage.text}</p>
                    </div>
                  )}
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
              <p>Register now to access all features after verification</p>
              <button
                className="btn transparent"
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
              <p>Login to access your dashboard</p>
              <button
                className="btn transparent"
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
