import React from "react";

import { LoaderCircle } from "lucide-react";

import { cn } from "../../utils/ClassName";

const baseStyles = "inline-flex items-center justify-center font-sans font-medium tracking-wider rounded-xl transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

const variantStyles = {
  primary: "bg-btn-primary-bg text-btn-primary-text border-btn-primary-border hover:bg-btn-primary-hover",
  secondary: "bg-btn-secondary-bg text-btn-secondary-text border-btn-secondary-border hover:bg-btn-secondary-hover",
  tertiary: "bg-btn-tertiary-bg text-btn-tertiary-text border-btn-tertiary-border hover:bg-btn-tertiary-hover",
  danger: "bg-btn-danger-bg text-btn-danger-text border-btn-danger-border hover:bg-btn-danger-hover",
}

const Button = ({
  title,
  icon,
  handlePress,
  containerStyles,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  
  return (
    <button
      className ={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
      )}

      disabled={disabled||isLoading}
      onClick={handlePress}
      {...props}
    >
      { icon && !isLoading && (
        <p>{icon}</p>
      )}
      { isLoading && (
        <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
      )}
      <p>{title}</p>
      
    </button>
  )
};

export default Button;