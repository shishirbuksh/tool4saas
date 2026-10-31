import React, { forwardRef, type ElementType, type HTMLAttributes } from "react";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType;
  ref?: any;
  [key: string]: any;
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { component: Component = "div", className = "", style, children, ...props },
  ref
) {
      return (
    <Component ref={ref} className={className} style={style} {...props}>
      {children}
    </Component>
  );
});

export default Box;
