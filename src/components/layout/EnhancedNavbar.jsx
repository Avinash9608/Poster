import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/EnhancedButton";
import "./Navbar.css";

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navTriggerRef = useRef(null);
  const mainListDivRef = useRef(null);

  // Mock authentication state (will be replaced with context)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    if (navTriggerRef.current) {
      navTriggerRef.current.classList.remove("active");
    }
    if (mainListDivRef.current && window.innerWidth <= 768) {
      mainListDivRef.current.classList.remove("show_list");
      mainListDivRef.current.style.display = "none";
    }
  }, [location]);

  // Initialize mobile menu display
  useEffect(() => {
    if (mainListDivRef.current && window.innerWidth <= 768) {
      mainListDivRef.current.style.display = "none";
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (navTriggerRef.current) {
      navTriggerRef.current.classList.toggle("active");
    }
    if (mainListDivRef.current) {
      if (!isMenuOpen) {
        mainListDivRef.current.classList.add("show_list");
        setTimeout(() => {
          if (mainListDivRef.current) {
            mainListDivRef.current.style.display = "block";
          }
        }, 10);
      } else {
        mainListDivRef.current.classList.remove("show_list");
        mainListDivRef.current.style.display = "none";
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would implement the actual dark mode toggle logic
    // document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    // Mock logout (will be replaced with context)
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform group-hover:rotate-3 group-hover:scale-110 ${
                isScrolled
                  ? "bg-gradient-to-br from-primary-500 to-secondary-600"
                  : "bg-white"
              }`}
            >
              <span
                className={`text-xl font-bold ${
                  isScrolled ? "text-white" : "text-primary-600"
                }`}
              >
                PP
              </span>
            </div>
            <span
              className={`text-2xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-1 ${
                isScrolled ? "text-primary-600" : "text-white"
              }`}
            >
              PublicityPoster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink to="/" label="Home" isScrolled={isScrolled} />
              <NavLink to="/pricing" label="Pricing" isScrolled={isScrolled} />
              <NavLink to="/about" label="About" isScrolled={isScrolled} />
              <NavLink to="/contact" label="Contact" isScrolled={isScrolled} />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {isAdmin && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center"
                      onClick={() => navigate("/admin")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Admin
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center"
                    onClick={() => navigate("/dashboard")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Dashboard
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex items-center"
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="light"
                      size="sm"
                      className={
                        isScrolled
                          ? ""
                          : "bg-white/10 text-white border-transparent hover:bg-white/20"
                      }
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                      </svg>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Hamburger Menu Trigger */}
            <span
              className="navTrigger"
              ref={navTriggerRef}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform origin-top ${
              isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            } ${
              isScrolled ? "bg-white" : "bg-primary-800/95 backdrop-blur-sm"
            }`}
          >
            <div className="flex flex-col p-4 space-y-2">
              <MobileNavLink to="/" label="Home" isScrolled={isScrolled} />
              <MobileNavLink
                to="/posters"
                label="Posters"
                isScrolled={isScrolled}
              />
              <MobileNavLink
                to="/about"
                label="About"
                isScrolled={isScrolled}
              />
              <MobileNavLink
                to="/contact"
                label="Contact"
                isScrolled={isScrolled}
              />

              <div
                className={`h-px my-2 ${
                  isScrolled ? "bg-gray-200" : "bg-primary-700"
                }`}
              ></div>

              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <MobileNavLink
                      to="/admin"
                      label="Admin Panel"
                      isScrolled={isScrolled}
                    />
                  )}
                  <MobileNavLink
                    to="/dashboard"
                    label="Dashboard"
                    isScrolled={isScrolled}
                  />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                      isScrolled
                        ? "text-red-600 hover:bg-red-50"
                        : "text-red-300 hover:bg-primary-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isScrolled
                        ? "text-primary-600 hover:bg-primary-50"
                        : "text-white hover:bg-primary-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isScrolled
                        ? "bg-primary-600 text-white"
                        : "bg-white text-primary-600"
                    } hover:opacity-90`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    </svg>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Nav Link
const NavLink = ({ to, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative font-medium transition-all duration-300 px-3 py-2 rounded-md group ${
        isScrolled
          ? isActive
            ? "text-primary-600"
            : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          : isActive
          ? "text-white"
          : "text-white/90 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
          isScrolled ? "bg-primary-600" : "bg-white"
        } ${isActive ? "scale-x-100" : ""}`}
      ></span>
    </Link>
  );
};

// Mobile Nav Link
const MobileNavLink = ({ to, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        isScrolled
          ? isActive
            ? "bg-primary-50 text-primary-600 font-medium"
            : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
          : isActive
          ? "bg-primary-700 text-white font-medium"
          : "text-white hover:bg-primary-700"
      }`}
    >
      {label}
    </Link>
  );
};

export default EnhancedNavbar;
