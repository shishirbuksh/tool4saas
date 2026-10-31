import React, { forwardRef, type ElementType, type HTMLAttributes } from "react";

export interface BoxProps extends Omit<HTMLAttributes<HTMLElement>, "onChange" | "onSubmit"> {
  component?: ElementType;
  onChange?: (e: any) => void;
  onSubmit?: (e: any) => void;
  ref?: any;
  src?: string;
  alt?: string;
  type?: string;
  value?: string | number | readonly string[];
  width?: string | number;
  height?: string | number;
  href?: string;
  open?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  muted?: boolean;
  colSpan?: number;
  scope?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "sync" | "auto";
  noValidate?: boolean;
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
