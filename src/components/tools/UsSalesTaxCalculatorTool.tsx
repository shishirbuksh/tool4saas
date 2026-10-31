
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";
import { salesTaxTotal } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";

const STATE_PRESETS = [
  { value: "CA", label: "California (CA) – 7.25%", rate: 7.25 },
  { value: "NY", label: "New York City (NYC) – 8.875%", rate: 8.875 },
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
        
      />
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          label="State"
          value={preset}
          onChange={(e) => setPreset(e.target.value as PresetValue)}
         
          className="min-h-[44px]"
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
          
        />
      )}
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Total with tax
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.total) ? money(result.total) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography className="font-bold">
            {(() => {
              const a = parseFloat(amount);
              return isFinite(a) && a >= 0 ? money(a) : "—";
            })()}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">
            Sales tax{isFinite(effectiveRate) ? ` (${effectiveRate}%)` : ""}
          </Typography>
          <Typography className="font-bold">
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
