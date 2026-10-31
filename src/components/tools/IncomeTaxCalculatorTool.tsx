
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

type FilingStatus = "single" | "married";

const BRACKETS = [
  { limit: 11_000, rate: 0.1, label: "10% up to $11,000" },
  { limit: 44_000, rate: 0.12, label: "12% up to $44,000" },
  { limit: 95_000, rate: 0.22, label: "22% up to $95,000" },
  { limit: Infinity, rate: 0.24, label: "24% above $95,000" },
] as const;

function calculateTax(taxable: number, multiplier: number): number {
  let tax = 0;
  let prev = 0;
  for (const b of BRACKETS) {
    if (taxable <= prev) break;
    const limit = b.limit * multiplier;
    const inBracket = Math.min(taxable, limit) - prev;
    if (inBracket > 0) tax += inBracket * b.rate;
    prev = limit;
  }
  return tax;
}

export default function IncomeTaxCalculatorTool() {
  const [gross, setGross] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [deduction, setDeduction] = useState("");

  const { taxable, tax, net, effectiveRate } = useMemo(() => {
    const g = parseFloat(gross);
    const d = parseFloat(deduction);

    if (!isFinite(g) || g < 0) {
      return {
        taxable: null as number | null,
        tax: null as number | null,
        net: null as number | null,
        effectiveRate: null as number | null,
      };
    }

    const ded = isFinite(d) && d >= 0 ? d : 0;
    const taxableVal = Math.max(0, g - ded);
    const multiplier = filingStatus === "married" ? 2 : 1;
    const taxVal = calculateTax(taxableVal, multiplier);
    const netVal = g - taxVal;
    const eff = g > 0 ? (taxVal / g) * 100 : 0;

    if (!isFinite(taxVal) || !isFinite(netVal)) {
      return { taxable: null, tax: null, net: null, effectiveRate: null };
    }

    return { taxable: taxableVal, tax: taxVal, net: netVal, effectiveRate: eff };
  }, [gross, deduction, filingStatus]);

  const field = (label: string, value: string, set: (v: string) => void) => (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={(e) => set(e.target.value)}
      slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
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
        {field("Gross annual income", gross, setGross)}
        <FormControl fullWidth>
          <InputLabel>Filing status</InputLabel>
          <Select
            label="Filing status"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married (joint)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Standard deduction", deduction, setDeduction)}
        <Box className="flex-1 flex items-center">
          <Typography variant="caption" color="text.secondary">
            Demo brackets: 10% to $11k · 12% to $44k · 22% to $95k · 24% above. Married doubles the demo
            thresholds.
          </Typography>
        </Box>
      </Stack>

      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Estimated net annual (after tax)
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {net !== null ? money(net, currency) : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Net = Gross − Estimated tax (progressive on taxable income)
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
        <Box className="flex justify-between">
          <Typography color="text.secondary">Effective tax rate</Typography>
          <Typography className="font-bold">
            {effectiveRate !== null ? `${effectiveRate.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
        <Box
          className="flex justify-between p-3 rounded-[16px] border border-base-300"
        >
          <Typography color="text.secondary">Gross annual</Typography>
          <Typography className="font-extrabold">
            {gross !== "" && isFinite(parseFloat(gross)) ? money(parseFloat(gross), currency) : "—"}
          </Typography>
        </Box>
      </Stack>

      <Alert severity="warning">
        Disclaimer: This is a simplified demo estimate for informational purposes only and does not
        constitute tax or financial advice. It uses illustrative progressive brackets (10% up to $11k,
        12% up to $44k, 22% up to $95k, 24% thereafter), doubles the demo thresholds for married filing,
        and subtracts your standard deduction from gross to get taxable income. Actual taxes depend on current law, credits,
        state/local taxes, and other factors. Consult a qualified professional.
      </Alert>
    </ToolPaper>
  );
}
