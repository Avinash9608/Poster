import { forwardRef, useState } from 'react';

const EnhancedInput = forwardRef(({ 
  label,
  id,
  name,
  type = 'text',
  placeholder,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className = '',
  required = false,
  disabled = false,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Base classes
  const baseInputClasses = `
    w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    transition-all duration-200
    ${error ? 'border-red-500' : isFocused ? 'border-primary-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${className}
  `;
  
  // Password type specific handling
  const [showPassword, setShowPassword] = useState(false);
  const actualType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
            error ? 'text-red-500' : isFocused ? 'text-primary-600' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={`text-gray-500 ${isFocused ? 'text-primary-500' : ''}`}>
              {icon}
            </span>
          </div>
        )}
        
        {/* Input Element */}
        <input
          ref={ref}
          id={id}
          name={name}
          type={actualType}
          placeholder={placeholder}
          className={baseInputClasses}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          {...props}
        />
        
        {/* Right Icon or Password Toggle */}
        {(icon && iconPosition === 'right') || type === 'password' ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {type === 'password' ? (
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            ) : (
              <span className={`text-gray-500 ${isFocused ? 'text-primary-500' : ''}`}>
                {icon}
              </span>
            )}
          </div>
        ) : null}
      </div>
      
      {/* Error Message or Helper Text */}
      {error ? (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

EnhancedInput.displayName = 'EnhancedInput';

export default EnhancedInput;
