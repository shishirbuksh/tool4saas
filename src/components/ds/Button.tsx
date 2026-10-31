import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "inherit";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  href?: string;
  ref?: any;
  [key: string]: any;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "contained",
    color = "primary",
    size = "medium",
    fullWidth = false,
    startIcon,
    endIcon,
    disabled = false,
    className = "",
    style,
    
    children,
    href,
    ...props
  },
  ref
) {
  // Map variant & color to DaisyUI classes
  let colorClass = "";
  if (color === "primary") colorClass = variant === "contained" ? "btn-primary" : variant === "outlined" ? "btn-outline btn-primary" : "btn-ghost text-primary";
  else if (color === "secondary") colorClass = variant === "contained" ? "btn-secondary" : variant === "outlined" ? "btn-outline btn-secondary" : "btn-ghost text-secondary";
  else if (color === "error") colorClass = variant === "contained" ? "btn-error" : variant === "outlined" ? "btn-outline btn-error" : "btn-ghost text-error";
  else if (color === "success") colorClass = variant === "contained" ? "btn-success" : variant === "outlined" ? "btn-outline btn-success" : "btn-ghost text-success";
  else if (color === "warning") colorClass = variant === "contained" ? "btn-warning" : variant === "outlined" ? "btn-outline btn-warning" : "btn-ghost text-warning";
  else if (color === "info") colorClass = variant === "contained" ? "btn-info" : variant === "outlined" ? "btn-outline btn-info" : "btn-ghost text-info";
  else colorClass = variant === "outlined" ? "btn-outline" : variant === "text" ? "btn-ghost" : "btn-neutral";

  const sizeClass = size === "small" ? "btn-sm" : size === "large" ? "btn-lg" : "";
  const widthClass = fullWidth ? "w-full" : "";

  const classes = ["btn", colorClass, sizeClass, widthClass, className].filter(Boolean).join(" ");
    
  if (href) {
    return (
      <a href={href} className={classes} style={style} role="button">
        {startIcon && <span className="inline-flex mr-1.5">{startIcon}</span>}
        {children}
        {endIcon && <span className="inline-flex ml-1.5">{endIcon}</span>}
      </a>
    );
  }

  return (
    <button ref={ref} disabled={disabled} className={classes} style={style} {...props}>
      {startIcon && <span className="inline-flex mr-1.5">{startIcon}</span>}
      {children}
      {endIcon && <span className="inline-flex ml-1.5">{endIcon}</span>}
    </button>
  );
});

export default Button;
