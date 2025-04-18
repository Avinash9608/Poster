import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/EnhancedButton';

const EnhancedNotFound = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Set loaded state after component mounts for animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Generate random particles for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animationDuration: Math.random() * 20 + 10,
    animationDelay: Math.random() * 5,
  }));
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary-200 opacity-30 animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        ></div>
      ))}
      
      {/* Content */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
        {/* Top Decoration */}
        <div className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
        
        <div className="p-8">
          {/* 404 Text */}
          <div 
            className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mt-8">Page Not Found</h2>
            </div>
          </div>
          
          {/* Illustration */}
          <div 
            className={`mt-16 mb-8 text-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <div className="inline-block relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-32 w-32 text-gray-400"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              
              {/* Animated Elements */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-8 h-8 rounded-full bg-red-100 animate-ping"></div>
              <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-12 h-12 rounded-full bg-primary-100 animate-pulse"></div>
            </div>
          </div>
          
          {/* Message */}
          <div 
            className={`text-center mb-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => navigate('/')}
                className="flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Go Home
              </Button>
              <Button
                variant="light"
                onClick={() => navigate(-1)}
                className="flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Go Back
              </Button>
            </div>
          </div>
          
          {/* Help Links */}
          <div 
            className={`text-center text-sm text-gray-500 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <p>Need help? Try these:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link to="/contact" className="text-primary-600 hover:text-primary-800 transition-colors">
                Contact Support
              </Link>
              <Link to="/faq" className="text-primary-600 hover:text-primary-800 transition-colors">
                FAQ
              </Link>
              <Link to="/sitemap" className="text-primary-600 hover:text-primary-800 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNotFound;
