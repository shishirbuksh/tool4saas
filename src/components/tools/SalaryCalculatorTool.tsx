
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

type Frequency = 12 | 26;

const FREQUENCIES = [
  { label: "Monthly (12 pays/year)", value: 12 },
  { label: "Biweekly (26 pays/year)", value: 26 },
] as const;

export default function SalaryCalculatorTool() {
  const [gross, setGross] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [taxRate, setTaxRate] = useState("");
  const [deductions, setDeductions] = useState("");
  const [frequency, setFrequency] = useState<Frequency>(12);

  const { taxable, tax, net, perPay } = useMemo(() => {
    const g = parseFloat(gross);
    const r = parseFloat(taxRate);
    const d = parseFloat(deductions);

    if (!isFinite(g) || g < 0) {
      return {
        taxable: null as number | null,
        tax: null as number | null,
        net: null as number | null,
        perPay: null as number | null,
      };
    }

    const ded = isFinite(d) && d >= 0 ? d : 0;
    const rate = isFinite(r) && r >= 0 ? r : 0;
    const taxableVal = Math.max(0, g - ded);
    const taxVal = taxableVal * (rate / 100);
    const netVal = g - taxVal;
    const freqDivisor = frequency;
    const perPayVal = netVal / freqDivisor;

    if (!isFinite(taxVal) || !isFinite(netVal) || !isFinite(perPayVal)) {
      return { taxable: null, tax: null, net: null, perPay: null };
    }

    return { taxable: taxableVal, tax: taxVal, net: netVal, perPay: perPayVal };
  }, [gross, taxRate, deductions, frequency]);

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

  const freqLabel = frequency === 12 ? "Monthly" : "Biweekly";

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
        {field("Gross annual salary", gross, setGross)}
        {field("Tax rate (%)", taxRate, setTaxRate, "%")}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Deductions", deductions, setDeductions)}
        <FormControl fullWidth>
          <InputLabel>Pay frequency</InputLabel>
          <Select
            label="Pay frequency"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value) as Frequency)}
          >
            {FREQUENCIES.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Net annual (take-home)
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {net !== null ? money(net, currency) : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Gross − Tax (taxable = gross − deductions)
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Taxable income</Typography>
          <Typography className="font-bold">{taxable !== null ? money(taxable, currency) : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Estimated tax</Typography>
          <Typography className="font-bold">{tax !== null ? money(tax, currency) : "—"}</Typography>
        </Box>
        <Box
          className="flex justify-between p-3 rounded-[16px] border border-base-300"
        >
          <Typography color="text.secondary">Per pay ({freqLabel})</Typography>
          <Typography className="font-extrabold">{perPay !== null ? money(perPay, currency) : "—"}</Typography>
        </Box>
      </Stack>

      <Alert severity="warning">
        Disclaimer: This is a simplified estimate for informational purposes only and does not constitute
        financial or tax advice. Actual take-home pay may vary due to progressive tax brackets, withholding
        rules, benefits, retirement contributions, and local regulations. Consult a qualified professional for
        accurate calculations.
      </Alert>
    </ToolPaper>
  );
}
