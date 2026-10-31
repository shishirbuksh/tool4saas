import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { resolveSx } from "./sx-helper";

export const Divider = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement> & { orientation?: "horizontal" | "vertical"; sx?: any }>(
  function Divider({ orientation = "horizontal", className = "", style, sx, children, ...props }, ref) {
    const isVert = orientation === "vertical";
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <div
        ref={ref as any}
        role="separator"
        className={`divider ${isVert ? "divider-horizontal" : ""} my-2 ${className}`}
        style={mergedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const Breadcrumbs = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & { separator?: ReactNode; sx?: any }>(
  function Breadcrumbs({ separator = "/", className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <nav ref={ref} className={`breadcrumbs text-sm ${className}`} style={mergedStyle} {...props}>
        <ul>
          {React.Children.map(children, (child) => (
            child ? <li>{child}</li> : null
          ))}
        </ul>
      </nav>
    );
  }
);

export const LinearProgress = forwardRef<HTMLProgressElement, HTMLAttributes<HTMLProgressElement> & { value?: number; variant?: string; sx?: any }>(
  function LinearProgress({ value, variant = "indeterminate", className = "", style, sx, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <progress
        ref={ref}
        value={value}
        max="100"
        className={`progress progress-primary w-full ${className}`}
        style={mergedStyle}
        {...props}
      />
    );
  }
);

export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { variant?: "text" | "rectangular" | "rounded" | "circular"; width?: any; height?: any; sx?: any }>(
  function Skeleton({ variant = "text", width, height, className = "", style, sx, ...props }, ref) {
    const roundClass = variant === "circular" ? "rounded-full" : variant === "rounded" ? "rounded-xl" : "rounded";
    const sxStyle = resolveSx(sx);
    const mergedStyle = { width, height, ...sxStyle, ...style };
    return <div ref={ref} className={`skeleton ${roundClass} ${className}`} style={mergedStyle} {...props} />;
  }
);

export const InputAdornment = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { position?: "start" | "end"; sx?: any }>(
  function InputAdornment({ position = "start", className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <div ref={ref} className={`flex items-center text-base-content/60 ${className}`} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

export const ToggleButtonGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { value?: any; exclusive?: boolean; onChange?: (e: any, val: any) => void; size?: string; sx?: any }>(
  function ToggleButtonGroup({ value, onChange, size = "medium", className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    const rendered = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      const isSelected = Array.isArray(value) ? value.includes(child.props.value) : value === child.props.value;
      return React.cloneElement(child as React.ReactElement<any>, {
        selected: isSelected,
        size,
        onClick: (e: any) => {
          child.props.onClick?.(e);
          onChange?.(e, child.props.value);
        },
      });
    });
    return (
      <div ref={ref} className={`join ${className}`} style={mergedStyle} {...props}>
        {rendered}
      </div>
    );
  }
);

export const ToggleButton = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & { value?: any; selected?: boolean; size?: string; sx?: any }>(
  function ToggleButton({ value, selected = false, size = "medium", className = "", style, sx, children, ...props }, ref) {
    const activeClass = selected ? "btn-primary" : "btn-outline";
    const sizeClass = size === "small" ? "btn-sm" : size === "large" ? "btn-lg" : "";
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <button ref={ref} type="button" className={`btn join-item ${activeClass} ${sizeClass} ${className}`} style={mergedStyle} {...props}>
        {children}
      </button>
    );
  }
);

export const Accordion = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { expanded?: boolean; onChange?: any; sx?: any }>(
  function Accordion({ className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <div ref={ref} className={`collapse collapse-arrow bg-base-200/50 rounded-xl mb-2 border border-base-200 ${className}`} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

export const AccordionSummary = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { expandIcon?: ReactNode; sx?: any }>(
  function AccordionSummary({ expandIcon, className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <div ref={ref} className={`collapse-title font-medium text-base ${className}`} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

export const AccordionDetails = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { sx?: any }>(
  function AccordionDetails({ className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <div ref={ref} className={`collapse-content text-sm text-base-content/80 ${className}`} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

export const Link = forwardRef<HTMLAnchorElement, HTMLAttributes<HTMLAnchorElement> & { href?: string; underline?: string; sx?: any }>(
  function Link({ href, className = "", style, sx, children, ...props }, ref) {
    const sxStyle = resolveSx(sx);
    const mergedStyle = { ...sxStyle, ...style };
    return (
      <a ref={ref} href={href} className={`link link-hover text-primary font-medium ${className}`} style={mergedStyle} {...props}>
        {children}
      </a>
    );
  }
);

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
