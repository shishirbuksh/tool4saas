import React, { forwardRef, type HTMLAttributes } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
type SpanValue = number | "auto" | boolean;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  size?: Partial<Record<Breakpoint, SpanValue>>;
  xs?: SpanValue;
  sm?: SpanValue;
  md?: SpanValue;
  lg?: SpanValue;
  xl?: SpanValue;
  ref?: any;
  [key: string]: any;
}

// Literal class names so Tailwind's scanner emits every column span.
const BASE: Record<number, string> = {
  1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4",
  5: "col-span-5", 6: "col-span-6", 7: "col-span-7", 8: "col-span-8",
  9: "col-span-9", 10: "col-span-10", 11: "col-span-11", 12: "col-span-12",
};
const SM: Record<number, string> = {
  1: "sm:col-span-1", 2: "sm:col-span-2", 3: "sm:col-span-3", 4: "sm:col-span-4",
  5: "sm:col-span-5", 6: "sm:col-span-6", 7: "sm:col-span-7", 8: "sm:col-span-8",
  9: "sm:col-span-9", 10: "sm:col-span-10", 11: "sm:col-span-11", 12: "sm:col-span-12",
};
const MD: Record<number, string> = {
  1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4",
  5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 8: "md:col-span-8",
  9: "md:col-span-9", 10: "md:col-span-10", 11: "md:col-span-11", 12: "md:col-span-12",
};
const LG: Record<number, string> = {
  1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4",
  5: "lg:col-span-5", 6: "lg:col-span-6", 7: "lg:col-span-7", 8: "lg:col-span-8",
  9: "lg:col-span-9", 10: "lg:col-span-10", 11: "lg:col-span-11", 12: "lg:col-span-12",
};
const XL: Record<number, string> = {
  1: "xl:col-span-1", 2: "xl:col-span-2", 3: "xl:col-span-3", 4: "xl:col-span-4",
  5: "xl:col-span-5", 6: "xl:col-span-6", 7: "xl:col-span-7", 8: "xl:col-span-8",
  9: "xl:col-span-9", 10: "xl:col-span-10", 11: "xl:col-span-11", 12: "xl:col-span-12",
};

const MAPS: Record<Breakpoint, Record<number, string>> = {
  xs: BASE, sm: SM, md: MD, lg: LG, xl: XL,
};

function spanClass(value: SpanValue | undefined, map: Record<number, string>): string | undefined {
  if (typeof value === "number" && map[value]) return map[value];
  if (value === "auto" || value === true) return "col-auto";
  return undefined;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    container = false,
    item = false,
    spacing = 0,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
    className = "",
    style,
    children,
    ...props
  },
  ref
) {
  const classes: string[] = [];

  if (container) classes.push("grid", "grid-cols-12");

  const values: Record<Breakpoint, SpanValue | undefined> = { xs, sm, md, lg, xl };
  for (const key of ["xs", "sm", "md", "lg", "xl"] as const) {
    const value = size?.[key] ?? values[key];
    const cls = spanClass(value, MAPS[key]);
    if (cls) classes.push(cls);
  }

  if (item && classes.length === 0) classes.push("col-span-12");
  if (className) classes.push(className);

  return (
    <div
      ref={ref}
      className={classes.join(" ")}
      style={{ ...(container && spacing ? { gap: `${spacing * 8}px` } : {}), ...style }}
      {...props}
    >
      {children}
    </div>
  );
});

export default Grid;
