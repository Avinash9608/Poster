import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Mock logout (will be replaced with context)
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header
      className={`${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-r from-primary-600 to-secondary-700"
      } sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div
              className={`w-10 h-10 rounded-lg ${
                isScrolled
                  ? "bg-gradient-to-br from-primary-500 to-secondary-600"
                  : "bg-white"
              } flex items-center justify-center transition-all duration-300 transform group-hover:rotate-3 group-hover:scale-110`}
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
              className={`text-2xl md:text-3xl font-bold tracking-tight ${
                isScrolled ? "text-primary-600" : "text-white"
              } transition duration-300 group-hover:translate-x-1`}
            >
              PublicityPoster
            </span>
            <span
              className={`hidden sm:inline-block ${
                isScrolled ? "bg-primary-500" : "bg-white"
              } ${
                isScrolled ? "text-white" : "text-primary-600"
              } text-xs px-2 py-1 rounded-full font-semibold transition-all duration-300`}
            >
              PRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" label="Home" isScrolled={isScrolled} />
            <NavLink to="/posters" label="Posters" isScrolled={isScrolled} />
            <NavLink to="/about" label="About" isScrolled={isScrolled} />
            <NavLink to="/contact" label="Contact" isScrolled={isScrolled} />
          </nav>

          {/* Authentication Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 ml-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 text-sm font-medium ${
                      isScrolled
                        ? "text-white bg-secondary-700"
                        : "text-secondary-700 bg-white"
                    } rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center shadow-md`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
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
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-white bg-primary-600"
                      : "text-primary-600 bg-white"
                  } rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center shadow-md`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-white bg-red-500"
                      : "text-red-500 bg-white"
                  } rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center shadow-md`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
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
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-primary-600 hover:bg-primary-50"
                      : "text-white hover:bg-white hover:bg-opacity-20"
                  } rounded-lg transition duration-300`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-white bg-green-500"
                      : "text-green-500 bg-white"
                  } rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center shadow-md`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled
                  ? "text-primary-500 hover:bg-primary-50"
                  : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-20"
              } focus:outline-none transition duration-300`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden ${
              isScrolled ? "bg-white" : "bg-primary-700"
            } rounded-lg shadow-xl mt-2 mb-4 animate-fadeIn`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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

              {/* Authentication Links - Mobile */}
              <div
                className={`pt-4 pb-2 border-t ${
                  isScrolled ? "border-gray-200" : "border-primary-600"
                }`}
              >
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                          isScrolled
                            ? "text-secondary-700 hover:bg-secondary-50"
                            : "text-white hover:bg-primary-600"
                        } transition duration-300`}
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
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                        isScrolled
                          ? "text-primary-600 hover:bg-primary-50"
                          : "text-white hover:bg-primary-600"
                      } transition duration-300`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      My Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                        isScrolled
                          ? "text-red-600 hover:bg-red-50"
                          : "text-white hover:bg-red-500"
                      } transition duration-300`}
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
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                        isScrolled
                          ? "text-primary-600 hover:bg-primary-50"
                          : "text-white hover:bg-primary-600"
                      } transition duration-300`}
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
                      className={`flex items-center mt-2 px-3 py-2 rounded-md text-base font-medium ${
                        isScrolled
                          ? "bg-green-500 text-white"
                          : "bg-white text-green-600"
                      } hover:bg-opacity-90 transition duration-300 text-center`}
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
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium relative group ${
        isScrolled
          ? isActive
            ? "text-primary-600"
            : "text-gray-700 hover:text-primary-600"
          : isActive
          ? "text-white"
          : "text-blue-100 hover:text-white"
      } transition duration-300`}
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
      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
        isScrolled
          ? isActive
            ? "bg-primary-50 text-primary-600"
            : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
          : isActive
          ? "bg-primary-600 text-white"
          : "text-white hover:bg-primary-600"
      } transition duration-300`}
    >
      {label}
    </Link>
  );
};

export default EnhancedHeader;
