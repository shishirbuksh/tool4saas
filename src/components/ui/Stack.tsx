import React, { forwardRef, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  spacing?: number | string;
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  useFlexGap?: boolean;
  sx?: any;
  ref?: any;
  [key: string]: any;
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
    sx,
    children,
    ...props
  },
  ref
) {
  const isRow = direction === "row" || direction === "row-reverse";
  const gapPx = typeof spacing === "number" ? `${spacing * 8}px` : spacing;

  const flexClasses = [
    "flex",
    direction === "row" ? "flex-row" : direction === "row-reverse" ? "flex-row-reverse" : direction === "column-reverse" ? "flex-col-reverse" : "flex-col",
    alignItems ? `items-[${alignItems}]` : "",
    justifyContent ? `justify-[${justifyContent}]` : "",
    flexWrap ? `flex-${flexWrap}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sxStyle = resolveSx(sx);
  const mergedStyle: React.CSSProperties = {
    gap: gapPx,
    alignItems: alignItems as any,
    justifyContent: justifyContent as any,
    flexWrap: flexWrap as any,
    ...sxStyle,
    ...style,
  };

  return (
    <div ref={ref} className={flexClasses} style={mergedStyle} {...props}>
      {children}
    </div>
  );
});

export default Stack;
