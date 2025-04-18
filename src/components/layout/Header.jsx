// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // Mock authentication state (will be replaced with context)
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     // Mock logout (will be replaced with context)
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//     navigate('/');
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             Publicity Poster
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
//             <Link to="/posters" className="text-gray-700 hover:text-blue-600">Posters</Link>
//             <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
//           </nav>

//           {/* Authentication Buttons - Desktop */}
//           <div className="hidden md:flex space-x-4">
//             {isAuthenticated ? (
//               <>
//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="px-4 py-2 text-gray-700 hover:text-blue-600"
//                   >
//                     Admin
//                   </Link>
//                 )}
//                 <Link
//                   to="/dashboard"
//                   className="px-4 py-2 text-gray-700 hover:text-blue-600"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 text-gray-700 hover:text-blue-600"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-gray-700"
//             onClick={toggleMenu}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4">
//             <nav className="flex flex-col space-y-2">
//               <Link
//                 to="/"
//                 className="text-gray-700 hover:text-blue-600 py-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/posters"
//                 className="text-gray-700 hover:text-blue-600 py-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Posters
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-700 hover:text-blue-600 py-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-gray-700 hover:text-blue-600 py-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Authentication Links - Mobile */}
//               {isAuthenticated ? (
//                 <>
//                   {isAdmin && (
//                     <Link
//                       to="/admin"
//                       className="text-gray-700 hover:text-blue-600 py-2"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Admin
//                     </Link>
//                   )}
//                   <Link
//                     to="/dashboard"
//                     className="text-gray-700 hover:text-blue-600 py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="text-red-500 hover:text-red-600 py-2 text-left"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="text-gray-700 hover:text-blue-600 py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="text-gray-700 hover:text-blue-600 py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock authentication state (will be replaced with context)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-white text-2xl md:text-3xl font-bold tracking-tight hover:text-blue-100 transition duration-300">
              PublicityPoster
            </span>
            <span className="hidden sm:inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              PRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500 hover:bg-opacity-50 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/posters"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500 hover:bg-opacity-50 transition duration-300"
            >
              Posters
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500 hover:bg-opacity-50 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500 hover:bg-opacity-50 transition duration-300"
            >
              Contact
            </Link>
          </nav>

          {/* Authentication Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 ml-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-800 rounded-lg hover:bg-indigo-900 transition duration-300 flex items-center"
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
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
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
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
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
                  className="px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 hover:bg-opacity-30 rounded-lg transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-500 hover:bg-opacity-30 focus:outline-none transition duration-300"
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
          <div className="md:hidden bg-blue-700 rounded-lg shadow-xl mt-2 mb-4 animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/posters"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Posters
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Authentication Links - Mobile */}
              <div className="pt-4 pb-2 border-t border-blue-600">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
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
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
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
                      className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-500 transition duration-300"
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
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition duration-300 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
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

export default Header;
