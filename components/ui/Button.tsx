import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.98]";
    const variants = {
      primary: "bg-amber-500 text-white hover:bg-amber-600 shadow-sm",
      secondary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
      outline: "border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 bg-transparent text-slate-900 dark:text-white",
      ghost: "hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };
    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
    );
  }
);
Button.displayName = "Button";
