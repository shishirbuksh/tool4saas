import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: any;
  onChange?: (e: any, newValue: any) => void;
  variant?: "standard" | "scrollable" | "fullWidth";
  ref?: any;
  [key: string]: any;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, onChange, variant, className = "", style, children, ...props },
  ref
) {
    
  // Clone children to inject value and onChange
  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const tabValue = (child.props as any).value !== undefined ? (child.props as any).value : index;
    const isActive = value === tabValue;
    return React.cloneElement(child as React.ReactElement<any>, {
      isActive,
      onClick: (e: any) => {
        (child.props as any).onClick?.(e);
        onChange?.(e, tabValue);
      },
    });
  });

  return (
    <div ref={ref} role="tablist" className={`tabs tabs-box bg-base-200/60 p-1 rounded-xl ${className}`} style={style} {...props}>
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
  [key: string]: any;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { label, value, icon, iconPosition = "start", isActive = false, disabled = false, className = "", style, children, ...props },
  ref
) {
  const activeClass = isActive ? "tab-active font-semibold shadow-sm !bg-base-100 !text-base-content" : "text-base-content/70 hover:text-base-content";
    
  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={`tab rounded-lg transition-all text-sm font-medium ${activeClass} ${className}`}
      style={style}
      {...props}
    >
      {icon && iconPosition === "start" && <span className="mr-1.5 inline-flex">{icon}</span>}
      {label || children}
      {icon && iconPosition === "end" && <span className="ml-1.5 inline-flex">{icon}</span>}
    </button>
  );
});

export default Tabs;
