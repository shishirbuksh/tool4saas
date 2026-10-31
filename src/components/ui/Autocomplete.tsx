import React, { forwardRef, useState, useRef, useEffect, type ReactNode } from "react";
import { resolveSx } from "./sx-helper";

export interface AutocompleteProps<T = any> {
  options: readonly T[];
  value?: T | null;
  inputValue?: string;
  onChange?: (event: any, value: T | null) => void;
  onInputChange?: (event: any, value: string) => void;
  getOptionLabel?: (option: T) => string;
  renderInput: (params: any) => ReactNode;
  noOptionsText?: ReactNode;
  filterOptions?: (options: readonly T[], state: any) => readonly T[];
  size?: "small" | "medium";
  sx?: any;
  slotProps?: any;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function Autocomplete<T = any>({
  options = [],
  value,
  inputValue = "",
  onChange,
  onInputChange,
  getOptionLabel = (o: any) => (o ? String(o.label ?? o.title ?? o) : ""),
  renderInput,
  noOptionsText = "No options",
  sx,
  className = "",
  style,
  ...props
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sxStyle = resolveSx(sx);
  const mergedStyle = { ...sxStyle, ...style };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange?.(e, e.target.value);
    setOpen(true);
  };

  const handleSelect = (option: T) => {
    onChange?.(null, option);
    setOpen(false);
  };

  const inputParams = {
    value: inputValue,
    onChange: handleInputChange,
    onFocus: () => setOpen(true),
    InputProps: {},
    inputProps: {
      value: inputValue,
      onChange: handleInputChange,
      onFocus: () => setOpen(true),
    },
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={mergedStyle}
    >
      {renderInput(inputParams)}
      {open && inputValue.trim().length > 0 && (
        <ul
          className="menu bg-base-100 rounded-box shadow-2xl absolute left-0 right-0 top-full mt-1 z-50 p-2 max-h-72 overflow-y-auto border border-base-200"
        >
          {options.length === 0 ? (
            <li className="p-3 text-sm text-base-content/60 text-center">
              {noOptionsText}
            </li>
          ) : (
            options.map((opt, idx) => (
              <li key={idx} onClick={() => handleSelect(opt)}>
                <button
                  type="button"
                  className="flex items-center justify-between py-2 text-sm hover:bg-base-200 rounded-lg text-left"
                >
                  <span className="font-medium text-base-content">
                    {getOptionLabel(opt)}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
