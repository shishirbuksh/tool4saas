import React, { forwardRef, type HTMLAttributes } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Responsive<"row" | "column" | "row-reverse" | "column-reverse">;
  spacing?: Responsive<number | string>;
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  useFlexGap?: boolean;
  ref?: any;
  [key: string]: any;
}

const DIRECTION: Record<string, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

const PREFIX: Record<Exclude<Breakpoint, "xs">, string> = {
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
};

function directionValue(value: StackProps["direction"], key: Breakpoint) {
  if (typeof value === "string") return key === "xs" ? value : undefined;
  return value?.[key];
}

function spacingValue(value: StackProps["spacing"], key: Breakpoint) {
  if (typeof value === "number" || typeof value === "string") return key === "xs" ? value : undefined;
  return value?.[key];
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    direction = "column",
    spacing = 0,
    alignItems,
    justifyContent,
    flexWrap,
    className = "",
    style,
    children,
    ...props
  },
  ref
) {
  const classes: string[] = ["flex"];

  const baseDirection = directionValue(direction, "xs") ?? "column";
  classes.push(DIRECTION[baseDirection] ?? "flex-col");

  for (const key of ["sm", "md", "lg", "xl"] as const) {
    const value = directionValue(direction, key);
    if (value) classes.push(`${PREFIX[key]}${DIRECTION[value]}`);
  }

  if (flexWrap) {
    classes.push(
      flexWrap === "wrap" ? "flex-wrap" : flexWrap === "wrap-reverse" ? "flex-wrap-reverse" : "flex-nowrap"
    );
  }

  if (className) classes.push(className);

  const baseSpacing = spacingValue(spacing, "xs");
  const gap =
    typeof baseSpacing === "number"
      ? `${baseSpacing * 8}px`
      : typeof baseSpacing === "string"
        ? baseSpacing
        : undefined;

  return (
    <div
      ref={ref}
      className={classes.join(" ")}
      style={{ gap, alignItems, justifyContent, ...style }}
      {...props}
    >
      {children}
    </div>
  );
});

export default Stack;
