import React, { forwardRef, type HTMLAttributes } from "react";

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  timeout?: number | "auto";
  unmountOnExit?: boolean;
  [key: string]: any;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { in: inProp = true, className = "", style, children, ...props },
  ref
) {
  if (!inProp) return null;
    
  return (
    <div ref={ref} className={`transition-all duration-300 ease-in-out ${className}`} style={style} {...props}>
      {children}
    </div>
  );
});

export default Collapse;
