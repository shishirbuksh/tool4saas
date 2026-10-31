import React, { forwardRef, type ElementType, type HTMLAttributes } from "react";

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
  ref?: any;
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
  h1: "text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]",
  h2: "text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1]",
  h3: "text-2xl sm:text-3xl font-semibold tracking-[-0.02em] leading-[1.15]",
  h4: "text-xl sm:text-2xl font-semibold tracking-[-0.015em] leading-[1.2]",
  h5: "text-lg sm:text-xl font-semibold",
  h6: "text-base font-semibold",
  subtitle1: "text-base font-medium text-base-content/80",
  subtitle2: "text-sm font-medium text-base-content/80",
  body1: "text-base leading-relaxed",
  body2: "text-sm leading-normal",
  caption: "text-xs text-base-content/60",
  overline: "text-[11px] uppercase tracking-[0.08em] font-semibold",
  button: "text-sm font-medium",
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
    
    children,
    ...props
  },
  ref
) {
  const Component = component || variantTagMap[variant as TypographyVariant] || "p";
  const defaultClass = variantClassMap[variant as TypographyVariant] || "";

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

    
  return (
    <Component ref={ref} className={classes} style={style} {...props}>
      {children}
    </Component>
  );
});

export default Typography;
