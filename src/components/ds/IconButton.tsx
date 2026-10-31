import React, { forwardRef, type ButtonHTMLAttributes } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error" | "inherit";
  edge?: "start" | "end" | false;
  ref?: any;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { size = "medium", color = "inherit", className = "", style, children, disabled, ...props },
  ref
) {
  const sizeClass = size === "small" ? "btn-sm w-8 h-8 min-h-0" : size === "large" ? "btn-lg w-12 h-12" : "w-10 h-10";
  const colorClass = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : color === "error" ? "text-error" : "";

  const classes = ["btn btn-ghost btn-circle", sizeClass, colorClass, className].filter(Boolean).join(" ");
    
  return (
    <button ref={ref} disabled={disabled} className={classes} style={style} {...props}>
      {children}
    </button>
  );
});

export default IconButton;
