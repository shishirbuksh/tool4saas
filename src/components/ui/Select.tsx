import React, { forwardRef, type SelectHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { resolveSx } from "./sx-helper";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "onChange"> {
  value?: any;
  onChange?: (e: any) => void;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: any;
  ref?: any;
  label?: ReactNode;
  [key: string]: any;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { value, onChange, size = "medium", fullWidth = true, className = "", style, sx, children, ...props },
  ref
) {
  const sizeClass = size === "small" ? "select-sm" : "";
  const widthClass = fullWidth ? "w-full" : "";
  const classes = ["select select-bordered", sizeClass, widthClass, className].filter(Boolean).join(" ");

  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <select ref={ref} value={value ?? ""} onChange={onChange} className={classes} style={mergedStyle} {...props}>
      {children}
    </select>
  );
});

export interface MenuItemProps extends HTMLAttributes<HTMLOptionElement> {
  value?: any;
  disabled?: boolean;
  [key: string]: any;
}

export const MenuItem = forwardRef<HTMLOptionElement, MenuItemProps>(function MenuItem(
  { value, disabled, children, className = "", ...props },
  ref
) {
  return (
    <option ref={ref} value={value} disabled={disabled} className={className} {...props}>
      {children}
    </option>
  );
});

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  size?: "small" | "medium";
  error?: boolean;
  sx?: any;
  [key: string]: any;
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(function FormControl(
  { fullWidth = true, size = "medium", error, className = "", style, sx, children, ...props },
  ref
) {
  const widthClass = fullWidth ? "w-full" : "";
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <div ref={ref} className={`form-control ${widthClass} ${className}`} style={mergedStyle} {...props}>
      {children}
    </div>
  );
});

export interface InputLabelProps extends HTMLAttributes<HTMLLabelElement> {
  id?: string;
  sx?: any;
  [key: string]: any;
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(function InputLabel(
  { className = "", style, sx, children, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };
  return (
    <label ref={ref} className={`label pb-1 ${className}`} style={mergedStyle} {...props}>
      <span className="label-text font-medium text-sm text-base-content/80">{children}</span>
    </label>
  );
});

export interface FormControlLabelProps extends HTMLAttributes<HTMLLabelElement> {
  control: React.ReactElement;
  label: ReactNode;
  disabled?: boolean;
  sx?: any;
  [key: string]: any;
}

export const FormControlLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(function FormControlLabel(
  { control, label, disabled, className = "", style, sx, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <label
      ref={ref}
      className={`label cursor-pointer justify-start gap-3 py-1.5 ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      style={mergedStyle}
      {...props}
    >
      {control}
      <span className="label-text text-sm font-medium">{label}</span>
    </label>
  );
});

export default Select;
