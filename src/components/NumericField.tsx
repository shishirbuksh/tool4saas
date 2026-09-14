"use client";

import TextField from "@mui/material/TextField";

type NumericFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: number;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
};

export default function NumericField({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  helperText,
  error,
  fullWidth = true,
}: NumericFieldProps) {
  return (
    <TextField
      label={label}
      type="number"
      fullWidth={fullWidth}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? `${label}…`}
      error={error}
      helperText={helperText}
      slotProps={{
        input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
        htmlInput: { min, step: "any" },
      }}
      sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
    />
  );
}
