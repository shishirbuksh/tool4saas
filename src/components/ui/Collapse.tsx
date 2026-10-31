import React, { forwardRef, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  timeout?: number | "auto";
  unmountOnExit?: boolean;
  sx?: any;
  [key: string]: any;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { in: inProp = true, className = "", style, sx, children, ...props },
  ref
) {
  if (!inProp) return null;
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} className={`transition-all duration-300 ease-in-out ${className}`} style={mergedStyle} {...props}>
      {children}
    </div>
  );
});

export default Collapse;
