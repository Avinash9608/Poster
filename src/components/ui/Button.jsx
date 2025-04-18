const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]";

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
    info: "bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-400",
    light:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 focus:ring-gray-500",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    link: "bg-transparent text-blue-600 hover:text-blue-800 hover:underline focus:ring-blue-500 p-0",
  };

  // Size classes
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
  };

  // Disabled classes
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
