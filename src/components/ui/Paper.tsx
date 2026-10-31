import React, { forwardRef, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: number;
  variant?: "elevation" | "outlined";
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  { elevation = 1, variant = "elevation", className = "", style, sx, children, ...props },
  ref
) {
  const shadowClass = variant === "outlined" || elevation === 0 ? "shadow-none" : elevation >= 3 ? "shadow-lg" : "shadow-sm";
  const borderClass = variant === "outlined" || elevation === 0 ? "border border-base-200" : "border border-base-200/80";

  const classes = ["bg-base-100 rounded-2xl", shadowClass, borderClass, className].filter(Boolean).join(" ");
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} className={classes} style={mergedStyle} {...props}>
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
