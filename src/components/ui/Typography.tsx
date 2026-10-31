import React, { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "button"
  | "inherit";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: ElementType;
  color?: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  gutterBottom?: boolean;
  noWrap?: boolean;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

const variantTagMap: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  button: "span",
  inherit: "span",
};

const variantClassMap: Record<TypographyVariant, string> = {
  h1: "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight",
  h2: "text-2xl sm:text-3xl font-bold tracking-tight",
  h3: "text-xl sm:text-2xl font-bold",
  h4: "text-lg sm:text-xl font-semibold",
  h5: "text-base sm:text-lg font-semibold",
  h6: "text-base font-semibold",
  subtitle1: "text-base font-medium text-base-content/80",
  subtitle2: "text-sm font-medium text-base-content/80",
  body1: "text-base leading-relaxed",
  body2: "text-sm leading-normal",
  caption: "text-xs text-base-content/60",
  overline: "text-xs uppercase tracking-wider font-semibold",
  button: "text-sm font-semibold uppercase",
  inherit: "",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    variant = "body1",
    component,
    color,
    align,
    gutterBottom = false,
    noWrap = false,
    className = "",
    style,
    sx,
    children,
    ...props
  },
  ref
) {
  const Component = component || variantTagMap[variant] || "p";
  const defaultClass = variantClassMap[variant] || "";

  const classes = [
    defaultClass,
    gutterBottom ? "mb-2" : "",
    noWrap ? "truncate" : "",
    align === "center" ? "text-center" : align === "right" ? "text-right" : align === "justify" ? "text-justify" : "",
    color === "text.secondary" ? "text-base-content/70" : "",
    color === "text.primary" ? "text-base-content" : "",
    color === "error" || color === "error.main" ? "text-error" : "",
    color === "primary.main" ? "text-primary" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <Component ref={ref} className={classes} style={mergedStyle} {...props}>
      {children}
    </Component>
  );
});

export default Typography;
