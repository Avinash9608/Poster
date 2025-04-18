import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./SimpleNavbar.css";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    logout();
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div
          className="navbar-logo"
          onClick={() => handleNavigation("/")}
          style={{ cursor: "pointer" }}
        >
          Publicity Poster
        </div>

        <button
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <div
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/")}
            >
              Home
            </div>
          </li>
          <li>
            <div
              className={`nav-item ${
                location.pathname === "/pricing" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/pricing")}
            >
              Pricing
            </div>
          </li>
          <li>
            <div
              className={`nav-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/about")}
            >
              About
            </div>
          </li>
          <li>
            <div
              className={`nav-item ${
                location.pathname === "/contact" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/contact")}
            >
              Contact
            </div>
          </li>
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <li>
                  <div
                    className={`nav-item ${
                      location.pathname === "/admin" ? "active" : ""
                    }`}
                    onClick={() => handleNavigation("/admin")}
                  >
                    Admin
                  </div>
                </li>
              )}
              <li>
                <div
                  className={`nav-item ${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                  onClick={() => handleNavigation("/dashboard")}
                >
                  Dashboard
                </div>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <div
                  className={`nav-item ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  onClick={() => handleNavigation("/login")}
                >
                  Login
                </div>
              </li>
              <li>
                <div
                  className="register-btn"
                  onClick={() => handleNavigation("/register")}
                >
                  Register
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
