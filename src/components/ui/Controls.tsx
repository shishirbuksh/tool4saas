import React, { forwardRef, type InputHTMLAttributes, type HTMLAttributes } from "react";
import { resolveSx } from "./sx-helper";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: number;
  onChange?: (e: any, value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  valueLabelDisplay?: "auto" | "on" | "off";
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { value = 0, onChange, min = 0, max = 100, step = 1, disabled, className = "", style, sx, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e, Number(e.target.value))}
      className={`range range-primary range-sm w-full ${className}`}
      style={mergedStyle}
      {...props}
    />
  );
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { checked, onChange, disabled, color = "primary", className = "", style, sx, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={Boolean(checked)}
      disabled={disabled}
      onChange={(e) => onChange?.(e, e.target.checked)}
      className={`toggle toggle-primary ${className}`}
      style={mergedStyle}
      {...props}
    />
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, onChange, disabled, color = "primary", className = "", style, sx, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={Boolean(checked)}
      disabled={disabled}
      onChange={(e) => onChange?.(e, e.target.checked)}
      className={`checkbox checkbox-primary rounded ${className}`}
      style={mergedStyle}
      {...props}
    />
  );
});

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  name?: string;
  sx?: any;
  ref?: any;
  [key: string]: any;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { checked, onChange, value, name, disabled, className = "", style, sx, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  return (
    <input
      ref={ref}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className={`radio radio-primary radio-sm ${className}`}
      style={mergedStyle}
      {...props}
    />
  );
});

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: any;
  onChange?: (e: any) => void;
  name?: string;
  row?: boolean;
  sx?: any;
  ref?: any;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { value, onChange, name, row, children, className = "", style, sx, ...props },
  ref
) {
  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  const renderedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childProps = child.props as any;
    const isChecked = value !== undefined ? childProps.value === value : undefined;

    if (childProps.control) {
      const control = React.cloneElement(childProps.control, {
        checked: isChecked ?? childProps.control.props.checked,
        name: name ?? childProps.control.props.name,
        onChange: (e: any) => {
          onChange?.({ target: { value: childProps.value } });
          childProps.control.props.onChange?.(e);
        },
      });
      return React.cloneElement(child, {
        control,
        onClick: (e: any) => {
          onChange?.({ target: { value: childProps.value } });
          childProps.onClick?.(e);
        },
      } as any);
    }

    return React.cloneElement(child, {
      checked: isChecked ?? childProps.checked,
      name: name ?? childProps.name,
      onChange: (e: any) => {
        onChange?.(e);
        childProps.onChange?.(e);
      },
    } as any);
  });

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={`flex ${row ? "flex-row flex-wrap items-center gap-4" : "flex-col gap-2"} ${className}`}
      style={mergedStyle}
      {...props}
    >
      {renderedChildren}
    </div>
  );
});

export default { Slider, Switch, Checkbox, Radio, RadioGroup };
