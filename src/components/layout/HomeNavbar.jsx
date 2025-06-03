import React, { useState, useEffect } from "react";
import "./SimpleNavbar.css";

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify token with backend
          const response = await fetch(
            "https://publicityposterbackend.onrender.com/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            setUsername(data.user.username);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch(
        "https://publicityposterbackend.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear client-side storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUsername("");
      handleNavigation("/");
    }
  };

  if (isLoading) {
    return (
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo">Publicity Poster</div>
        </div>
      </nav>
    );
  }

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

          {isLoggedIn ? (
            <li className="user-dropdown">
              <div className="nav-item username">
                {username}
                <div className="dropdown-menu">
                  <div onClick={handleLogout}>Logout</div>
                </div>
              </div>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default HomeNavbar;
