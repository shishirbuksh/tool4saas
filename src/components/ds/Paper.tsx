import React, { forwardRef, type HTMLAttributes } from "react";

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: number;
  variant?: "elevation" | "outlined";
  ref?: any;
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  { elevation = 1, variant = "elevation", className = "", style, children, ...props },
  ref
) {
  const shadowClass = variant === "outlined" || elevation === 0 ? "shadow-none" : elevation >= 3 ? "shadow-md" : "shadow-xs";
  const borderClass = "border border-base-300";

  const classes = ["bg-base-100 rounded-xl", shadowClass, borderClass, className].filter(Boolean).join(" ");
    
  return (
    <div ref={ref} className={classes} style={style} {...props}>
      {children}
    </div>
  );
});

export const Card = Paper;

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent(
  { className = "", children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`card-body p-5 ${className}`} {...props}>
      {children}
    </div>
  );
});

export const CardActionArea = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardActionArea(
  { className = "", children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`cursor-pointer transition-all hover:opacity-90 ${className}`} {...props}>
      {children}
    </div>
  );
});

export default Paper;
