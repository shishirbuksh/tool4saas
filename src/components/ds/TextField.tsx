import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: ReactNode;
  value?: any;
  onChange?: (e: any) => void;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  fullWidth?: boolean;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: ReactNode;
  InputProps?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    readOnly?: boolean;
    className?: string;
    [key: string]: any;
  };
  inputProps?: any;
  select?: boolean;
  ref?: any;
  [key: string]: any;
}

export const TextField = forwardRef<any, TextFieldProps>(function TextField(
  {
    label,
    value,
    onChange,
    placeholder,
    multiline = false,
    rows = 4,
    minRows,
    maxRows,
    fullWidth = true,
    size = "medium",
    type = "text",
    error = false,
    helperText,
    disabled = false,
    InputProps,
    inputProps,
    select = false,
    className = "",
    style,
    
    children,
    id,
    name,
    required,
    ...props
  },
  ref
) {
  const sizeClass = size === "small" ? "input-sm" : "";
  const textareaSizeClass = size === "small" ? "textarea-sm" : "";
  const borderClass = error ? "input-error border-error" : "";
  const textareaBorderClass = error ? "textarea-error border-error" : "";
  const widthClass = fullWidth ? "w-full" : "";

    
  // If select mode, render a DaisyUI select
  if (select) {
    return (
      <div className={`form-control ${widthClass} ${className}`} style={style}>
        {label && (
          <label className="label">
            <span className="label-text font-medium text-sm text-base-content/80">{label}</span>
          </label>
        )}
        <select
          ref={ref}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          className={`select select-bordered ${widthClass} ${size === "small" ? "select-sm" : ""} ${error ? "select-error" : ""}`}
          id={id}
          name={name}
          {...inputProps}
        >
          {children}
        </select>
        {helperText && (
          <label className="label">
            <span className={`label-text-alt ${error ? "text-error" : "text-base-content/60"}`}>{helperText}</span>
          </label>
        )}
      </div>
    );
  }

  // If multiline mode, render a DaisyUI textarea
  if (multiline) {
    const effectiveRows = rows || minRows || 4;
    return (
      <div className={`form-control ${widthClass} ${className}`} style={style}>
        {label && (
          <label className="label">
            <span className="label-text font-medium text-sm text-base-content/80">{label}</span>
          </label>
        )}
        <textarea
          ref={ref}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          rows={effectiveRows}
          disabled={disabled}
          readOnly={InputProps?.readOnly}
          className={`textarea textarea-bordered ${textareaSizeClass} ${textareaBorderClass} ${widthClass}`}
          id={id}
          name={name}
          required={required}
          {...inputProps}
          {...(props as any)}
        />
        {helperText && (
          <label className="label">
            <span className={`label-text-alt ${error ? "text-error" : "text-base-content/60"}`}>{helperText}</span>
          </label>
        )}
      </div>
    );
  }

  // Standard input mode
  return (
    <div className={`form-control ${widthClass} ${className}`} style={style}>
      {label && (
        <label className="label">
          <span className="label-text font-medium text-sm text-base-content/80">{label}</span>
        </label>
      )}
      <div className={`relative flex items-center ${widthClass}`}>
        {InputProps?.startAdornment && (
          <div className="absolute left-3 z-10 flex items-center pointer-events-none text-base-content/50">
            {InputProps.startAdornment}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={InputProps?.readOnly}
          required={required}
          id={id}
          name={name}
          className={`input input-bordered ${sizeClass} ${borderClass} ${widthClass} ${
            InputProps?.startAdornment ? "pl-9" : ""
          } ${InputProps?.endAdornment ? "pr-9" : ""}`}
          {...inputProps}
          {...props}
        />
        {InputProps?.endAdornment && (
          <div className="absolute right-3 z-10 flex items-center text-base-content/50">
            {InputProps.endAdornment}
          </div>
        )}
      </div>
      {helperText && (
        <label className="label">
          <span className={`label-text-alt ${error ? "text-error" : "text-base-content/60"}`}>{helperText}</span>
        </label>
      )}
    </div>
  );
});

export default TextField;
