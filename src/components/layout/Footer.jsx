// import React from "react";
// import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer className="footer-container">
//       <div className="footer-content">
//         {/* Column 1: Get in Touch */}
//         <div className="footer-column">
//           <h3 className="footer-title">Get in Touch</h3>
//           <p className="footer-text">
//             Don't miss any updates of our new templates and extensions!
//           </p>
//           <form className="footer-form">
//             <input
//               type="email"
//               placeholder="Email"
//               className="footer-input"
//               required
//             />
//             <button type="submit" className="footer-button">
//               Subscribe
//             </button>
//           </form>
//         </div>

//         {/* Column 2: Download */}
//         <div className="footer-column">
//           <h3 className="footer-title">Download</h3>
//           <ul className="footer-links">
//             <li>
//               <a href="#">Company</a>
//             </li>
//             <li>
//               <a href="#">Android App</a>
//             </li>
//             <li>
//               <a href="#">iOS App</a>
//             </li>
//             <li>
//               <a href="#">Desktop</a>
//             </li>
//             <li>
//               <a href="#">Projects</a>
//             </li>
//             <li>
//               <a href="#">My tasks</a>
//             </li>
//           </ul>
//         </div>

//         {/* Column 3: Help */}
//         <div className="footer-column">
//           <h3 className="footer-title">Help</h3>
//           <ul className="footer-links">
//             <li>
//               <a href="#">FAQ</a>
//             </li>
//             <li>
//               <a href="#">Terms & Conditions</a>
//             </li>
//             <li>
//               <a href="#">Reporting</a>
//             </li>
//             <li>
//               <a href="#">Documentation</a>
//             </li>
//             <li>
//               <a href="#">Support Policy</a>
//             </li>
//             <li>
//               <a href="#">Privacy</a>
//             </li>
//           </ul>
//         </div>

//         {/* Column 4: Team Solutions */}
//         <div className="footer-column">
//           <h3 className="footer-title">Team Solutions</h3>
//           <div className="social-icons">
//             <a href="#" aria-label="Facebook">
//               <FaFacebook />
//             </a>
//             <a href="#" aria-label="Twitter">
//               <FaTwitter />
//             </a>
//             <a href="#" aria-label="LinkedIn">
//               <FaLinkedin />
//             </a>
//             <a href="#" aria-label="Pinterest">
//               <FaPinterest />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Background elements */}
      <div className="footer_bg">
        <div className="footer_bg_one"></div>
        <div className="footer_bg_two"></div>
      </div>

      <div className="footer-content">
        {/* Column 1: Get in Touch */}
        <div className="footer-column">
          <h3 className="footer-title">Get in Touch</h3>
          <p className="footer-text">
            Don't miss any updates of our new templates and extensions!
          </p>
          <form className="footer-form">
            <input
              type="email"
              placeholder="Email"
              className="footer-input"
              required
            />
            <button type="submit" className="footer-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Column 2: Download */}
        <div className="footer-column">
          <h3 className="footer-title">Download</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Android App</a>
            </li>
            <li>
              <a href="#">iOS App</a>
            </li>
            <li>
              <a href="#">Desktop</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">My tasks</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Help */}
        <div className="footer-column">
          <h3 className="footer-title">Help</h3>
          <ul className="footer-links">
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Reporting</a>
            </li>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Support Policy</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Team Solutions */}
        <div className="footer-column">
          <h3 className="footer-title">Team Solutions</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Pinterest">
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
