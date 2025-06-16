import React from "react";

import { cn } from "../../utils/ClassName";

const baseStyles = "inline-flex items-center justify-center font-sans font-medium tracking-wider rounded-xl transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

const Button = ({
  title,
  icon,
  iconPosition = "left",
  handlePress,
  containerStyles,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) => {

  const variantStyles = `bg-btn-${variant}-bg text-btn-${variant}-text border-btn-${variant}-border hover:bg-btn-${variant}-hover`;
  
  return (
    <button
      className ={cn(
        baseStyles,
        variantStyles,
        sizeStyles[size],
        fullWidth && "w-full",
      )}
      disabled={disabled||isLoading}
      onClick={handlePress}
      {...props}
    >
      { icon && iconPosition == "left" && (
        <div>{icon}</div>
      )}
      <p className="text-btn-primary-text">Crash the app</p>
      
    </button>
  )
};

export default Button;