import { useState, useRef, useEffect } from 'react';

const EnhancedCard = ({ 
  children, 
  title,
  subtitle,
  icon,
  headerActions,
  footer,
  variant = 'default',
  elevation = 'md',
  className = '',
  hoverEffect = true,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white',
    primary: 'bg-primary-50 border-primary-200',
    secondary: 'bg-secondary-50 border-secondary-200',
    success: 'bg-green-50 border-green-200',
    danger: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
    dark: 'bg-gray-800 text-white border-gray-700'
  };
  
  // Elevation classes
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  // Hover effect classes
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' 
    : '';
  
  return (
    <div 
      ref={cardRef}
      className={`
        rounded-xl overflow-hidden border border-gray-200
        ${variantClasses[variant]} 
        ${elevationClasses[elevation]}
        ${hoverClasses}
        ${className}
        ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Card Header */}
      {(title || headerActions) && (
        <div className={`px-6 py-4 border-b ${variant === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
          <div className="flex items-center">
            {icon && (
              <div className={`mr-3 ${variant === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className={`text-lg font-semibold ${variant === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-sm ${variant === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {headerActions && (
            <div>
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      {/* Card Body */}
      <div className="p-6">
        {children}
      </div>
      
      {/* Card Footer */}
      {footer && (
        <div className={`px-6 py-4 border-t ${variant === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default EnhancedCard;
