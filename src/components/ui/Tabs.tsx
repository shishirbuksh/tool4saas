import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { resolveSx } from "./sx-helper";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: any;
  onChange?: (e: any, newValue: any) => void;
  variant?: "standard" | "scrollable" | "fullWidth";
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, onChange, variant, className = "", style, sx, children, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  // Clone children to inject value and onChange
  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const tabValue = child.props.value !== undefined ? child.props.value : index;
    const isActive = value === tabValue;
    return React.cloneElement(child as React.ReactElement<any>, {
      isActive,
      onClick: (e: any) => {
        child.props.onClick?.(e);
        onChange?.(e, tabValue);
      },
    });
  });

  return (
    <div ref={ref} role="tablist" className={`tabs tabs-box bg-base-200/60 p-1 rounded-xl ${className}`} style={mergedStyle} {...props}>
      {renderedChildren}
    </div>
  );
});

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  label?: ReactNode;
  value?: any;
  icon?: ReactNode;
  iconPosition?: "top" | "bottom" | "start" | "end";
  isActive?: boolean;
  disabled?: boolean;
  sx?: any;
  [key: string]: any;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { label, value, icon, iconPosition = "start", isActive = false, disabled = false, className = "", style, sx, children, ...props },
  ref
) {
  const activeClass = isActive ? "tab-active font-semibold shadow-sm !bg-base-100 !text-base-content" : "text-base-content/70 hover:text-base-content";
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={`tab rounded-lg transition-all text-sm font-medium ${activeClass} ${className}`}
      style={mergedStyle}
      {...props}
    >
      {icon && iconPosition === "start" && <span className="mr-1.5 inline-flex">{icon}</span>}
      {label || children}
      {icon && iconPosition === "end" && <span className="ml-1.5 inline-flex">{icon}</span>}
    </button>
  );
});

export default Tabs;
