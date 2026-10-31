import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { resolveSx } from "./sx-helper";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  size?: "small" | "medium";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "default";
  variant?: "filled" | "outlined";
  onDelete?: (e: any) => void;
  icon?: ReactNode;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { label, size = "medium", color = "default", variant = "filled", onDelete, onClick, icon, className = "", style, sx, children, ...props },
  ref
) {
  let colorClass = "badge-neutral";
  if (color === "primary") colorClass = "badge-primary";
  else if (color === "secondary") colorClass = "badge-secondary";
  else if (color === "success") colorClass = "badge-success";
  else if (color === "error") colorClass = "badge-error";
  else if (color === "warning") colorClass = "badge-warning";
  else if (color === "info") colorClass = "badge-info";

  const variantClass = variant === "outlined" ? "badge-outline" : "";
  const sizeClass = size === "small" ? "badge-sm py-2 px-2.5 text-xs" : "badge-md py-3 px-3.5 text-sm";
  const clickClass = onClick ? "cursor-pointer hover:opacity-80" : "";

  const classes = ["badge gap-1.5 font-medium rounded-full", colorClass, variantClass, sizeClass, clickClass, className]
    .filter(Boolean)
    .join(" ");

  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} onClick={onClick} className={classes} style={mergedStyle} {...props}>
      {icon && <span className="inline-flex mr-0.5">{icon}</span>}
      {label || children}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          className="ml-1 hover:opacity-75 focus:outline-none"
          aria-label="Delete"
        >
          ✕
        </button>
      )}
    </div>
  );
});

export const Badge = Chip;

export default Chip;
