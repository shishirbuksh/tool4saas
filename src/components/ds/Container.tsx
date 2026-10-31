import React, { forwardRef, type HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  ref?: any;
  [key: string]: any;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { maxWidth = "lg", className = "", style, children, ...props },
  ref
) {
  let maxWClass = "max-w-[1200px]";
  if (maxWidth === "xs") maxWClass = "max-w-xs";
  else if (maxWidth === "sm") maxWClass = "max-w-screen-sm";
  else if (maxWidth === "md") maxWClass = "max-w-screen-md";
  else if (maxWidth === "lg") maxWClass = "max-w-[1024px]";
  else if (maxWidth === "xl") maxWClass = "max-w-[1200px]";
  else if (maxWidth === false) maxWClass = "max-w-none";

  const classes = ["w-full mx-auto px-4 sm:px-6 lg:px-8", maxWClass, className].filter(Boolean).join(" ");
    
  return (
    <div ref={ref} className={classes} style={style} {...props}>
      {children}
    </div>
  );
});

export default Container;
