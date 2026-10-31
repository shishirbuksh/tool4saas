import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export const Divider = forwardRef<
  HTMLHRElement,
  HTMLAttributes<HTMLHRElement> & { orientation?: "horizontal" | "vertical" }
>(function Divider({ orientation = "horizontal", className = "", style, children, ...props }, ref) {
  const isVert = orientation === "vertical";
  return (
    <div
      ref={ref as any}
      role="separator"
      className={`divider ${isVert ? "divider-horizontal" : ""} my-2 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

export const Breadcrumbs = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & { separator?: ReactNode }
>(function Breadcrumbs({ separator = "/", className = "", style, children, ...props }, ref) {
  return (
    <nav ref={ref} className={`breadcrumbs text-sm ${className}`} style={style} {...props}>
      <ul>
        {React.Children.map(children, (child) => (child ? <li>{child}</li> : null))}
      </ul>
    </nav>
  );
});

export const LinearProgress = forwardRef<
  HTMLProgressElement,
  HTMLAttributes<HTMLProgressElement> & { value?: number; variant?: string }
>(function LinearProgress({ value, variant = "indeterminate", className = "", style, ...props }, ref) {
  return (
    <progress
      ref={ref}
      value={value}
      max="100"
      className={`progress progress-primary w-full ${className}`}
      style={style}
      {...props}
    />
  );
});

export const Skeleton = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    variant?: "text" | "rectangular" | "rounded" | "circular";
    width?: any;
    height?: any;
  }
>(function Skeleton({ variant = "text", width, height, className = "", style, ...props }, ref) {
  const roundClass =
    variant === "circular" ? "rounded-full" : variant === "rounded" ? "rounded-xl" : "rounded";
  return (
    <div
      ref={ref}
      className={`skeleton ${roundClass} ${className}`}
      style={{ width, height, ...style }}
      {...props}
    />
  );
});

export const InputAdornment = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { position?: "start" | "end" }
>(function InputAdornment({ position = "start", className = "", style, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex items-center text-base-content/60 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

export const ToggleButtonGroup = forwardRef<
  HTMLDivElement,
  Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
    value?: any;
    exclusive?: boolean;
    onChange?: (e: any, val: any) => void;
    size?: string;
  }
>(function ToggleButtonGroup(
  { value, onChange, size = "medium", className = "", style, children, ...props },
  ref
) {
  const rendered = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childProps = child.props as any;
    const isSelected = Array.isArray(value)
      ? value.includes(childProps.value)
      : value === childProps.value;
    return React.cloneElement(child as React.ReactElement<any>, {
      selected: isSelected,
      size,
      onClick: (e: any) => {
        childProps.onClick?.(e);
        onChange?.(e, childProps.value);
      },
    });
  });
  return (
    <div ref={ref} className={`join ${className}`} style={style} {...props}>
      {rendered}
    </div>
  );
});

export const ToggleButton = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement> & { value?: any; selected?: boolean; size?: string }
>(function ToggleButton(
  { value, selected = false, size = "medium", className = "", style, children, ...props },
  ref
) {
  const activeClass = selected ? "btn-primary" : "btn-outline";
  const sizeClass = size === "small" ? "btn-sm" : size === "large" ? "btn-lg" : "";
  return (
    <button
      ref={ref}
      type="button"
      className={`btn join-item ${activeClass} ${sizeClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
});

export const Accordion = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { expanded?: boolean; onChange?: any }
>(function Accordion({ expanded, onChange, className = "", style, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`collapse collapse-arrow bg-base-200/50 rounded-xl mb-2 border border-base-300 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

export const AccordionSummary = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { expandIcon?: ReactNode }
>(function AccordionSummary({ expandIcon, className = "", style, children, ...props }, ref) {
  return (
    <div ref={ref} className={`collapse-title font-medium text-base ${className}`} style={style} {...props}>
      {children}
      {expandIcon ? <span className="ml-2 inline-flex">{expandIcon}</span> : null}
    </div>
  );
});

export const AccordionDetails = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AccordionDetails({ className = "", style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`collapse-content text-sm text-base-content/80 ${className}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { href?: string; underline?: string }
>(function Link({ href, className = "", style, children, ...props }, ref) {
  return (
    <a
      ref={ref}
      href={href}
      className={`link link-hover text-accent font-medium ${className}`}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
});

export default {
  Divider,
  Breadcrumbs,
  LinearProgress,
  Skeleton,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
};
