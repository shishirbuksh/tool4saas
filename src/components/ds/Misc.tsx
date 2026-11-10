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
    fullWidth?: boolean;
  }
>(function ToggleButtonGroup(
  { value, onChange, size = "medium", fullWidth, className = "", style, children, ...props },
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
    <div ref={ref} className={`join ${fullWidth ? "w-full" : ""} ${className}`} style={style} {...props}>
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
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement> & {
    expanded?: boolean;
    onChange?: any;
    elevation?: number;
    variant?: "elevation" | "outlined";
  }
>(function Accordion(
  { expanded, open, onChange, elevation: _elevation, variant: _variant, className = "", style, children, ...props },
  ref
) {
  return (
    <details
      ref={ref}
      open={open ?? expanded}
      className={`collapse collapse-arrow bg-base-100 rounded-xl mb-3 border border-base-300 transition-colors hover:border-base-content/20 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </details>
  );
});

export const AccordionSummary = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { expandIcon?: ReactNode }
>(function AccordionSummary({ expandIcon: _expandIcon, className = "", style, children, ...props }, ref) {
  return (
    <summary
      ref={ref}
      className={`collapse-title font-semibold text-[0.9375rem] md:text-[1rem] py-4 px-5 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden ${className}`}
      style={style}
      {...props}
    >
      {children}
    </summary>
  );
});

export const AccordionDetails = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AccordionDetails({ className = "", style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`collapse-content text-sm text-base-content/75 px-5 pb-5 pt-0 leading-relaxed ${className}`}
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
