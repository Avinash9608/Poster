// import { useState, useEffect, useContext, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { isAuthenticated, user, logout } = useContext(AuthContext);
//   const location = useLocation();
//   const navTriggerRef = useRef(null);
//   const mainListDivRef = useRef(null);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close menu when route changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//     if (navTriggerRef.current) {
//       navTriggerRef.current.classList.remove("active");
//     }
//     if (mainListDivRef.current) {
//       mainListDivRef.current.classList.remove("show_list");
//       mainListDivRef.current.style.display = "none";
//     }
//   }, [location]);

//   // Initialize mobile menu display
//   useEffect(() => {
//     if (mainListDivRef.current && window.innerWidth <= 768) {
//       mainListDivRef.current.style.display = "none";
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     if (navTriggerRef.current) {
//       navTriggerRef.current.classList.toggle("active");
//     }
//     if (mainListDivRef.current) {
//       if (!isMenuOpen) {
//         mainListDivRef.current.classList.add("show_list");
//         setTimeout(() => {
//           if (mainListDivRef.current) {
//             mainListDivRef.current.style.display = "block";
//           }
//         }, 10);
//       } else {
//         mainListDivRef.current.classList.remove("show_list");
//         mainListDivRef.current.style.display = "none";
//       }
//     }
//   };

//   return (
//     <nav className={`nav ${isScrolled ? "affix" : ""}`}>
//       <div className="container mx-auto px-4">
//         <div className="logo">
//           <Link
//             to="/"
//             className={`text-2xl font-bold transition-colors ${
//               isScrolled ? "text-primary-600" : "text-white"
//             }`}
//           >
//             Publicity Poster
//           </Link>
//         </div>

//         {/* Main Navigation List */}
//         <div id="mainListDiv" className="main_list" ref={mainListDivRef}>
//           <ul className="navlinks">
//             <li>
//               <NavLink to="/" label="Home" isScrolled={isScrolled} />
//             </li>
//             <li>
//               <NavLink to="/posters" label="Posters" isScrolled={isScrolled} />
//             </li>
//             <li>
//               <NavLink to="/about" label="About" isScrolled={isScrolled} />
//             </li>
//             <li>
//               <NavLink to="/contact" label="Contact" isScrolled={isScrolled} />
//             </li>

//             {/* Auth Links */}
//             {isAuthenticated ? (
//               <>
//                 {user?.role === "admin" && (
//                   <li>
//                     <NavLink
//                       to="/admin"
//                       label="Admin"
//                       isScrolled={isScrolled}
//                     />
//                   </li>
//                 )}
//                 <li>
//                   <NavLink
//                     to="/dashboard"
//                     label="Dashboard"
//                     isScrolled={isScrolled}
//                   />
//                 </li>
//                 <li>
//                   <button
//                     onClick={logout}
//                     className={`nav-button ${
//                       isScrolled ? "logout-scrolled" : "logout"
//                     }`}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <NavLink to="/login" label="Login" isScrolled={isScrolled} />
//                 </li>
//                 <li>
//                   <Link
//                     to="/register"
//                     className={`nav-button ${
//                       isScrolled ? "register-scrolled" : "register"
//                     }`}
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {/* Hamburger Menu Trigger */}
//         <span
//           className="navTrigger"
//           ref={navTriggerRef}
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           <i></i>
//           <i></i>
//           <i></i>
//         </span>
//       </div>
//     </nav>
//   );
// };

// // Desktop/Mobile Nav Link
// const NavLink = ({ to, label, isScrolled }) => {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link
//       to={to}
//       className={`nav-link ${isActive ? "active" : ""} ${
//         isScrolled ? "scrolled" : ""
//       }`}
//     >
//       {label}
//     </Link>
//   );
// };

// export default Navbar;

import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const navTriggerRef = useRef(null);
  const mainListDivRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  // Initialize mobile menu display
  useEffect(() => {
    if (mainListDivRef.current && window.innerWidth <= 768) {
      mainListDivRef.current.style.display = "none";
    }
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    if (navTriggerRef.current) {
      navTriggerRef.current.classList.remove("active");
    }
    if (mainListDivRef.current) {
      mainListDivRef.current.classList.remove("show_list");
      mainListDivRef.current.style.display = "none";
    }
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    if (navTriggerRef.current) {
      navTriggerRef.current.classList.toggle("active", newState);
    }

    if (mainListDivRef.current) {
      if (newState) {
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

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMobileMenu();
  };

  return (
    <nav className={`nav ${isScrolled ? "affix" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="logo">
          <Link
            to="/"
            className={`text-2xl font-bold transition-colors ${
              isScrolled ? "text-primary-600" : "text-white"
            }`}
            onClick={closeMobileMenu}
          >
            Publicity Poster
          </Link>
        </div>

        {/* Main Navigation List */}
        <div id="mainListDiv" className="main_list" ref={mainListDivRef}>
          <ul className="navlinks">
            <li>
              <NavLink
                to="/"
                label="Home"
                isScrolled={isScrolled}
                onClick={closeMobileMenu}
              />
            </li>
            <li>
              <NavLink
                to="/posters"
                label="Posters"
                isScrolled={isScrolled}
                onClick={closeMobileMenu}
              />
            </li>
            <li>
              <NavLink
                to="/about"
                label="About"
                isScrolled={isScrolled}
                onClick={closeMobileMenu}
              />
            </li>
            <li>
              <NavLink
                to="/contact"
                label="Contact"
                isScrolled={isScrolled}
                onClick={closeMobileMenu}
              />
            </li>

            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <li>
                    <NavLink
                      to="/admin"
                      label="Admin"
                      isScrolled={isScrolled}
                      onClick={closeMobileMenu}
                    />
                  </li>
                )}
                <li>
                  <NavLink
                    to="/dashboard"
                    label="Dashboard"
                    isScrolled={isScrolled}
                    onClick={closeMobileMenu}
                  />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`nav-button ${
                      isScrolled ? "logout-scrolled" : "logout"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    label="Login"
                    isScrolled={isScrolled}
                    onClick={closeMobileMenu}
                  />
                </li>
                <li>
                  <NavLink
                    to="/register"
                    label="Register"
                    isScrolled={isScrolled}
                    isButton
                    onClick={closeMobileMenu}
                  />
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Hamburger Menu Trigger */}
        <span
          className="navTrigger"
          ref={navTriggerRef}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, isScrolled, isButton = false, onClick }) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(to));

  const className = isButton
    ? `nav-button ${isScrolled ? "register-scrolled" : "register"}`
    : `nav-link ${isActive ? "active" : ""} ${isScrolled ? "scrolled" : ""}`;

  return (
    <Link to={to} className={className} onClick={onClick}>
      {label}
    </Link>
  );
};

export default Navbar;
