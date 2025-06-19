import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { cn } from "../../utils/ClassName";

const sizeStyles = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

const FormField = ({
  label="",
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  size = "md",
  fullWidth = false,
  centerAlign = false,
  className = "",
  multiline= false,
  rows = 4,
  maxLength,
  inputMode,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const renderInput = () => {
    const baseClass = "w-full bg-transparent outline-none text-text font-sans tracking-wide";
    const commonProps = {
      id: name,
      name,
      value,
      onChange,
      placeholder,
      disabled,
      readOnly,
      maxLength,
      inputMode,
      className: baseClass,
      ...props,
    };

    if (multiline) {
      return (
        <textarea 
          rows={rows}
          {...commonProps}
          className={cn(baseClass, "resize-none")}
        />
      )
    }

    return <input type={inputType} {...commonProps} className={cn(baseClass, centerAlign ? "text-center" : "")} />

  };
  
  return (
    <div className={cn("flex-col", fullWidth && "w-full", className)}>
      <div
        className={cn("flex flex-row gap-2 items-center")}
      >

        { label && (
          <label htmlFor={name} className="font-sans tracking-wide text-base text-yellow">
            {label}
            {required && <span className="text-red ml-1">*</span>}
          </label>
        )}

        <div
          className={cn(
            "relative flex items-center border rounded-xl transition-all",
            error
              ? "border-red focus-within:border-red"
              : "border-gray focus-within:border-blue",
            disabled && "bg-gray cursor-not-allowed opacity-50",
            sizeStyles[size],
            fullWidth && "w-full"
          )}
        >
          {renderInput()}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}

        </div>
      </div>

      <div className="flex justify-between mt-1">
          {helperText && !error && (
            <p className="text-xs font-italic font-sans text-gray">{helperText}</p>
          )}

          {error && <p className="text-xs font-sans font-italic text-red">{error}</p>}

          {/* Character counter */}
          {maxLength && typeof value === "string" && (
            <p className="text-xs font-sans font-italic text-gray ml-auto">{value.length}/{maxLength}</p>
          )}

        </div>
    </div>
    
  )
};

export default FormField;