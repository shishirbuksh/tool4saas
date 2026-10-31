import React, { forwardRef, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { maxWidth = "lg", className = "", style, sx, children, ...props },
  ref
) {
  let maxWClass = "max-w-7xl";
  if (maxWidth === "xs") maxWClass = "max-w-xs";
  else if (maxWidth === "sm") maxWClass = "max-w-screen-sm";
  else if (maxWidth === "md") maxWClass = "max-w-screen-md";
  else if (maxWidth === "lg") maxWClass = "max-w-screen-lg";
  else if (maxWidth === "xl") maxWClass = "max-w-7xl";
  else if (maxWidth === false) maxWClass = "max-w-none";

  const classes = ["w-full mx-auto px-4 sm:px-6 lg:px-8", maxWClass, className].filter(Boolean).join(" ");
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} className={classes} style={mergedStyle} {...props}>
      {children}
    </div>
  );
});

export default Container;
