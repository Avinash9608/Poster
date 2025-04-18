import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const EnhancedFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Handle intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  return (
    <footer ref={footerRef} className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
      
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center transition-all duration-300 transform group-hover:rotate-3 group-hover:scale-110">
                <span className="text-xl font-bold text-primary-600">PP</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                PublicityPoster
              </span>
            </Link>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Create and share amazing publicity posters for your events, products, and services. Our platform makes it easy to design eye-catching posters that get noticed.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink icon="facebook" href="#" />
              <SocialLink icon="twitter" href="#" />
              <SocialLink icon="instagram" href="#" />
              <SocialLink icon="linkedin" href="#" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/posters" label="Posters" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/pricing" label="Pricing" />
              <FooterLink to="/faq" label="FAQ" />
            </ul>
          </div>
          
          {/* Account */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Account
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-secondary-500"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/login" label="Login" />
              <FooterLink to="/register" label="Register" />
              <FooterLink to="/dashboard" label="Dashboard" />
              <FooterLink to="/profile" label="My Profile" />
              <FooterLink to="/settings" label="Settings" />
              <FooterLink to="/help" label="Help Center" />
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300 hover:text-white transition-colors duration-300">
                    <a href="mailto:info@publicityposter.com">info@publicityposter.com</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300 hover:text-white transition-colors duration-300">
                    <a href="tel:+11234567890">+1 (123) 456-7890</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300">
                    123 Poster Street<br />
                    Design City, DC 12345<br />
                    United States
                  </p>
                </div>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} PublicityPoster. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer Link Component
const FooterLink = ({ to, label }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-2 text-gray-500 group-hover:text-primary-500 transition-colors duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {label}
      </Link>
    </li>
  );
};

// Social Link Component
const SocialLink = ({ icon, href }) => {
  const icons = {
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    )
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="bg-gray-700 hover:bg-primary-600 text-white p-2 rounded-full transition-colors duration-300"
      aria-label={`Follow us on ${icon}`}
    >
      {icons[icon]}
    </a>
  );
};

export default EnhancedFooter;
