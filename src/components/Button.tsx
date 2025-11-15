import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ 
  children, 
  icon, 
  size = "md",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "", 
  onClick, 
  type = "button" 
}: ButtonProps) {
  const sizeClasses = {
    sm: "text-sm px-4 py-1",
    md: "text-base px-6 py-2", 
    lg: "text-lg px-8 py-3"
  };
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`font-medium ${textColor} ${bgColor} ${sizeClasses[size]} rounded-full flex items-center gap-2 transition-all ${className}`}
    >
      {icon && icon}
      {children}
    </button>
  );
}