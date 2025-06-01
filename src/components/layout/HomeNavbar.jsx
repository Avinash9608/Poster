import React, { useState, useEffect } from "react";
import "./SimpleNavbar.css";

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Direct navigation using window.location
  const handleNavigation = (path) => {
    window.location.href = path;
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
              className="nav-item active"
              onClick={() => handleNavigation("/")}
            >
              Home
            </div>
          </li>
          <li>
            <div
              className="nav-item"
              onClick={() => handleNavigation("/pricing")}
            >
              Pricing
            </div>
          </li>
          <li>
            <div
              className="nav-item"
              onClick={() => handleNavigation("/about")}
            >
              About
            </div>
          </li>
          <li>
            <div
              className="nav-item"
              onClick={() => handleNavigation("/contact")}
            >
              Contact
            </div>
          </li>

          <li>
            <div
              className="nav-item"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </div>
          </li>
          <li>
            <div
              className="nav-item login-btn"
              onClick={() => handleNavigation("/register")}
            >
              Sign Up For Free
            </div>
          </li>
          {/* <li>
            <div
              className="register-btn"
              onClick={() => handleNavigation("/register")}
            >
              Register
            </div>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default HomeNavbar;
