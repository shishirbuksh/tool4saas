"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { money } from "@/lib/format";
import { salesTaxTotal } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";

const STATE_PRESETS = [
  { value: "CA", label: "California (CA) – 7.25%", rate: 7.25 },
  { value: "NY", label: "New York (NY) – 8.875%", rate: 8.875 },
  { value: "TX", label: "Texas (TX) – 6.25%", rate: 6.25 },
  { value: "FL", label: "Florida (FL) – 6%", rate: 6 },
  { value: "WA", label: "Washington (WA) – 10.35%", rate: 10.35 },
  { value: "Custom", label: "Custom", rate: null as number | null },
] as const;

type PresetValue = (typeof STATE_PRESETS)[number]["value"];

export default function UsSalesTaxCalculatorTool() {
  const [amount, setAmount] = useState("");
  const [preset, setPreset] = useState<PresetValue>("CA");
  const [customRate, setCustomRate] = useState("");

  const effectiveRate = useMemo(() => {
    if (preset === "Custom") {
      const r = parseFloat(customRate);
      return isFinite(r) ? r : NaN;
    }
    const found = STATE_PRESETS.find((s) => s.value === preset);
    return found?.rate ?? NaN;
  }, [preset, customRate]);

  const result = useMemo(() => {
    const a = parseFloat(amount);
    if (!isFinite(a)) return null;
    if (!isFinite(effectiveRate)) return null;
    return salesTaxTotal(a, effectiveRate);
  }, [amount, effectiveRate]);

  return (
    <ToolPaper>
      <YMYLDisclaimer type="finance" />
      <TextField
        label="Subtotal amount"
        type="number"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Subtotal amount…"
        slotProps={{
          input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
          htmlInput: { min: 0, step: "any" },
        }}
        sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
      />
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          label="State"
          value={preset}
          onChange={(e) => setPreset(e.target.value as PresetValue)}
          MenuProps={{ slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } }}
          sx={{ minHeight: 44 }}
        >
          {STATE_PRESETS.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {preset === "Custom" && (
        <TextField
          label="Custom rate (%)"
          type="number"
          fullWidth
          value={customRate}
          onChange={(e) => setCustomRate(e.target.value)}
          placeholder="Custom rate (%)…"
          slotProps={{
            input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 0, step: "any" },
          }}
          sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
        />
      )}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Total with tax
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {result !== null && isFinite(result.total) ? money(result.total) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {(() => {
              const a = parseFloat(amount);
              return isFinite(a) && a >= 0 ? money(a) : "—";
            })()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">
            Sales tax{isFinite(effectiveRate) ? ` (${effectiveRate}%)` : ""}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result !== null && isFinite(result.tax) ? money(result.tax) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        For informational purposes only — rates vary by state, county, and city. Verify the combined rate before
        checkout.
      </Alert>
    </ToolPaper>
  );
}
