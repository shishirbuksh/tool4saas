import React, { forwardRef, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number | "auto" | boolean;
  sm?: number | "auto" | boolean;
  md?: number | "auto" | boolean;
  lg?: number | "auto" | boolean;
  xl?: number | "auto" | boolean;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    container = false,
    item = false,
    spacing = 0,
    xs,
    sm,
    md,
    lg,
    xl,
    className = "",
    style,
    sx,
    children,
    ...props
  },
  ref
) {
  const classes: string[] = [];

  if (container) {
    classes.push("grid grid-cols-12");
    if (spacing) {
      classes.push(`gap-${spacing * 2}`);
    }
  }

  // Column spans
  const mapSpan = (val: any, prefix = "") => {
    if (typeof val === "number") return `${prefix}col-span-${val}`;
    if (val === 12) return `${prefix}col-span-12`;
    return "";
  };

  if (xs !== undefined) classes.push(mapSpan(xs));
  if (sm !== undefined) classes.push(mapSpan(sm, "sm:"));
  if (md !== undefined) classes.push(mapSpan(md, "md:"));
  if (lg !== undefined) classes.push(mapSpan(lg, "lg:"));
  if (xl !== undefined) classes.push(mapSpan(xl, "xl:"));

  if (className) classes.push(className);

  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} className={classes.filter(Boolean).join(" ")} style={mergedStyle} {...props}>
      {children}
    </div>
  );
});

export default Grid;
