import React, { forwardRef, type SelectHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "onChange"> {
  value?: any;
  onChange?: (e: any) => void;
  size?: "small" | "medium";
  fullWidth?: boolean;
  ref?: any;
  label?: ReactNode;
  labelId?: string;
  MenuProps?: Record<string, any>;
  inputProps?: Record<string, any>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { value, onChange, size = "medium", fullWidth = true, className = "", style, children, ...props },
  ref
) {
  const sizeClass = size === "small" ? "select-sm" : "";
  const widthClass = fullWidth ? "w-full" : "";
  const classes = ["select select-bordered", sizeClass, widthClass, className].filter(Boolean).join(" ");

    
  return (
    <select ref={ref} value={value ?? ""} onChange={onChange} className={classes} style={style} {...props}>
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
  [key: string]: any;
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(function FormControl(
  { fullWidth = true, size = "medium", error, className = "", style, children, ...props },
  ref
) {
  const widthClass = fullWidth ? "w-full" : "";
    
  return (
    <div ref={ref} className={`form-control ${widthClass} ${className}`} style={style} {...props}>
      {children}
    </div>
  );
});

export interface InputLabelProps extends HTMLAttributes<HTMLLabelElement> {
  id?: string;
  [key: string]: any;
}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(function InputLabel(
  { className = "", style, children, ...props },
  ref
) {
      return (
    <label ref={ref} className={`label pb-1 ${className}`} style={style} {...props}>
      <span className="label-text font-medium text-sm text-base-content/80">{children}</span>
    </label>
  );
});

export interface FormControlLabelProps extends HTMLAttributes<HTMLLabelElement> {
  control: React.ReactElement;
  label: ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

export const FormControlLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(function FormControlLabel(
  { control, label, disabled, className = "", style, ...props },
  ref
) {
    
  return (
    <label
      ref={ref}
      className={`label cursor-pointer justify-start gap-3 py-1.5 ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      style={style}
      {...props}
    >
      {control}
      <span className="label-text text-sm font-medium">{label}</span>
    </label>
  );
});

export default Select;
