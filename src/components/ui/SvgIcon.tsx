import React, { forwardRef, type SVGProps } from "react";
import { resolveSx } from "./sx-helper";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  fontSize?: "inherit" | "small" | "medium" | "large";
  color?: string;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(function SvgIcon(
  { fontSize = "medium", className = "", style, sx, children, viewBox = "0 0 24 24", ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const sizeClass = fontSize === "small" ? "w-4 h-4" : fontSize === "large" ? "w-8 h-8" : "w-6 h-6";
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="currentColor"
      className={`inline-block shrink-0 ${sizeClass} ${className}`}
      style={mergedStyle}
      {...props}
    >
      {children}
    </svg>
  );
});

export default SvgIcon;
