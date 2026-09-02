"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

type FilingStatus = "single" | "married";

const BRACKETS = [
  { limit: 11_000, rate: 0.1, label: "10% up to $11,000" },
  { limit: 44_000, rate: 0.12, label: "12% up to $44,000" },
  { limit: 95_000, rate: 0.22, label: "22% up to $95,000" },
  { limit: Infinity, rate: 0.24, label: "24% above $95,000" },
] as const;

function calculateTax(taxable: number): number {
  let tax = 0;
  let prev = 0;
  for (const b of BRACKETS) {
    if (taxable <= prev) break;
    const inBracket = Math.min(taxable, b.limit) - prev;
    if (inBracket > 0) tax += inBracket * b.rate;
    prev = b.limit;
  }
  return tax;
}

export default function IncomeTaxCalculatorTool() {
  const [gross, setGross] = useState("");
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
    const taxVal = calculateTax(taxableVal);
    const netVal = g - taxVal;
    const eff = g > 0 ? (taxVal / g) * 100 : 0;

    if (!isFinite(taxVal) || !isFinite(netVal)) {
      return { taxable: null, tax: null, net: null, effectiveRate: null };
    }

    return { taxable: taxableVal, tax: taxVal, net: netVal, effectiveRate: eff };
  }, [gross, deduction]);

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
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Demo brackets: 10% to $11k · 12% to $44k · 22% to $95k · 24% above. Filing status does not
            change demo brackets.
          </Typography>
        </Box>
      </Stack>

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
          Estimated net annual (after tax)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {net !== null ? money(net) : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Net = Gross − Estimated tax (progressive on taxable income)
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Taxable income</Typography>
          <Typography sx={{ fontWeight: 700 }}>{taxable !== null ? money(taxable) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Estimated tax</Typography>
          <Typography sx={{ fontWeight: 700 }}>{tax !== null ? money(tax) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Effective tax rate</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {effectiveRate !== null ? `${effectiveRate.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary">Gross annual</Typography>
          <Typography sx={{ fontWeight: 800 }}>
            {gross !== "" && isFinite(parseFloat(gross)) ? money(parseFloat(gross)) : "—"}
          </Typography>
        </Box>
      </Stack>

      <Alert severity="warning">
        Disclaimer: This is a simplified demo estimate for informational purposes only and does not
        constitute tax or financial advice. It uses illustrative progressive brackets (10% up to $11k,
        12% up to $44k, 22% up to $95k, 24% thereafter) and subtracts your standard deduction from gross
        to get taxable income. Actual taxes depend on current law, filing status rules, credits,
        state/local taxes, and other factors. Consult a qualified professional.
      </Alert>
    </ToolPaper>
  );
}
