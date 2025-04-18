import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./SimpleNavbar.css";

const SimpleNavbar = () => {
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

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => navigate("/")}>
          Publicity Poster
        </Link>

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
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => navigate("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className={location.pathname === "/pricing" ? "active" : ""}
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
              onClick={() => navigate("/about")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
              onClick={() => navigate("/contact")}
            >
              Contact
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className={location.pathname === "/admin" ? "active" : ""}
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/dashboard"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Link>
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
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="register-btn"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
