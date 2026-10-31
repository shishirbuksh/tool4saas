import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { resolveSx } from "./sx-helper";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  severity?: "error" | "warning" | "info" | "success";
  action?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { severity = "info", action, icon, onClose, className = "", style, sx, children, ...props },
  ref
) {
  let severityClass = "alert-info";
  if (severity === "error") severityClass = "alert-error";
  else if (severity === "warning") severityClass = "alert-warning";
  else if (severity === "success") severityClass = "alert-success";

  const classes = ["alert shadow-sm", severityClass, className].filter(Boolean).join(" ");
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} role="alert" className={classes} style={mergedStyle} {...props}>
      {icon !== false && icon}
      <div className="flex-1">{children}</div>
      {action && <div className="flex-none">{action}</div>}
      {onClose && (
        <button type="button" onClick={onClose} className="btn btn-ghost btn-xs btn-circle" aria-label="Close">
          ✕
        </button>
      )}
    </div>
  );
});

export default Alert;
