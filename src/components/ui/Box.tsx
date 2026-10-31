import React, { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { component: Component = "div", sx, className = "", style, children, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };
  return (
    <Component ref={ref} className={className} style={mergedStyle} {...props}>
      {children}
    </Component>
  );
});

export default Box;
