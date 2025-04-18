import React, { useState } from "react";

const EnhancedButton = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden";

  // Variant classes
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-primary-500/50",
    secondary:
      "bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-500 hover:to-secondary-600 focus:ring-secondary-500 shadow-lg hover:shadow-secondary-500/50",
    success:
      "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600 focus:ring-green-500 shadow-lg hover:shadow-green-500/50",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 focus:ring-red-500 shadow-lg hover:shadow-red-500/50",
    warning:
      "bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-400 hover:to-amber-400 focus:ring-yellow-500 shadow-lg hover:shadow-yellow-500/50",
    info: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 focus:ring-blue-400 shadow-lg hover:shadow-blue-500/50",
    light:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 shadow-md hover:shadow-lg",
    dark: "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-700 shadow-lg hover:shadow-gray-700/50",
    link: "bg-transparent text-primary-600 hover:text-primary-800 hover:underline focus:ring-primary-500 p-0",
    // Special hero button variants
    "hero-primary":
      "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-500 hover:to-blue-400 focus:ring-blue-500 shadow-lg hover:shadow-blue-500/50 border border-indigo-700/30",
    "hero-secondary":
      "bg-transparent backdrop-blur-sm text-white border border-white/30 hover:bg-white/10 focus:ring-white shadow-lg hover:shadow-white/20",
  };

  // Size classes
  const sizeClasses = {
    xs: "text-xs px-2.5 py-1.5 rounded",
    sm: "text-sm px-3 py-2 rounded-md",
    md: "text-base px-4 py-2 rounded-lg",
    lg: "text-lg px-6 py-3 rounded-lg",
    xl: "text-xl px-8 py-4 rounded-xl",
  };

  // Disabled classes
  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed transform-none hover:scale-100"
    : "cursor-pointer transform hover:scale-[1.03] active:scale-[0.98] hover:-translate-y-0.5 active:translate-y-0";

  // Animation classes
  const animationClasses = !disabled
    ? "after:absolute after:inset-0 after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:rounded-lg"
    : "";

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${animationClasses} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {!disabled && variant !== "link" && (
          <span
            className={`absolute inset-0 bg-white/10 rounded-lg transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></span>
        )}
      </span>
    </button>
  );
};

export default EnhancedButton;
