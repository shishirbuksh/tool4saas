
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

const FREQUENCIES = [
  { label: "Yearly", value: 1 },
  { label: "Half-yearly", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
] as const;

export default function CompoundInterestTool() {
  const [principal, setPrincipal] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [freq, setFreq] = useState<number>(1);

  const { amount, interest } = useMemo(() => {
    const p = parseFloat(principal);
    const rRaw = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(rRaw) || !isFinite(y) || p <= 0 || y <= 0) {
      return { amount: null as number | null, interest: null as number | null };
    }
    const r = rRaw / 100;
    const n = freq * y;
    const amt = p * Math.pow(1 + r / freq, n);
    if (!isFinite(amt)) return { amount: null, interest: null };
    return { amount: amt, interest: amt - p };
  }, [principal, rate, years, freq]);

  const field = (label: string, value: string, set: (v: string) => void, suffix?: string) => (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={(e) => set(e.target.value)}
      slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off", endAdornment: suffix } }}
    />
  );

  return (
    <ToolPaper>
        <FormControl fullWidth size="small">
          <InputLabel>Currency</InputLabel>
          <Select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value as typeof currency)}>
            {CURRENCIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Principal", principal, setPrincipal)}
        {field("Annual rate (%)", rate, setRate, "%")}
        {field("Time (years)", years, setYears)}
      </Stack>
      <FormControl fullWidth>
        <InputLabel>Compounding frequency</InputLabel>
        <Select
          label="Compounding frequency"
          value={freq}
          onChange={(e) => setFreq(Number(e.target.value))}
        >
          {FREQUENCIES.map((f) => (
            <MenuItem key={f.value} value={f.value}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Maturity amount
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {amount !== null ? money(amount, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Principal</Typography>
          <Typography className="font-bold">
            {(() => {
              const p = parseFloat(principal);
              return isFinite(p) && p > 0 ? money(p, currency) : "—";
            })()}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Interest earned</Typography>
          <Typography className="font-bold">{interest !== null ? money(interest, currency) : "—"}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only. Actual maturity may vary due to
        rounding, taxes, fees, or changes in interest rate. Consult a financial advisor for accurate
        advice.
      </Alert>
    </ToolPaper>
  );
}
