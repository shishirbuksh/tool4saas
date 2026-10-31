
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel, Link } from "@/components/ds";

import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function MortgageCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const { emi, total, interest } = useMemo(() => {
    const loan = parseFloat(loanAmount);
    const down = parseFloat(downPayment) || 0;
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(loan) || !isFinite(r) || !isFinite(y) || loan <= 0 || y <= 0)
      return { emi: null, total: null, interest: null };
    const principal = loan - down;
    if (!isFinite(principal) || principal <= 0)
      return { emi: null, total: null, interest: null };
    const n = y * 12;
    if (!isFinite(n) || n === 0 || n <= 0) return { emi: null, total: null, interest: null };
    const mr = r / 100 / 12;
    if (!isFinite(mr)) return { emi: null, total: null, interest: null };
    const emiVal = mr === 0 || Math.abs(mr) < EPSILON_RATE ? principal / n : (principal * mr) / (1 - Math.pow(1 + mr, -n));
    if (!isFinite(emiVal)) return { emi: null, total: null, interest: null };
    const tot = emiVal * n;
    if (!isFinite(tot)) return { emi: null, total: null, interest: null };
    const intr = tot - principal;
    if (!isFinite(intr)) return { emi: null, total: null, interest: null };
    return { emi: emiVal, total: tot, interest: intr };
  }, [loanAmount, downPayment, rate, years]);

  const field = (label: string, value: string, set: (v: string) => void) => (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={`${label}…`}
      slotProps={{
        input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
        htmlInput: { min: 0, step: "any" },
      }}
      
    />
  );

  return (
    <ToolPaper>
      <FormControl fullWidth>
        <InputLabel>Currency</InputLabel>
        <Select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as typeof currency)}
         
          className="min-h-[44px]"
        >
          {CURRENCIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Loan amount", loanAmount, setLoanAmount)}
        {field("Down payment", downPayment, setDownPayment)}
        {field("Annual rate (%)", rate, setRate)}
        {field("Term (years)", years, setYears)}
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Monthly payment (EMI)
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {emi !== null && isFinite(emi) ? money(emi, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total paid</Typography>
          <Typography className="font-bold">{total !== null && isFinite(total) ? money(total, currency) : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total interest</Typography>
          <Typography className="font-bold">{interest !== null && isFinite(interest) ? money(interest, currency) : "—"}</Typography>
        </Box>
        {emi !== null && isFinite(emi) && (
          <Typography variant="caption" color="text.secondary">
            Planning a home purchase? Compare payoff timelines in our{" "}
            <Link href="/blog/mortgage-calculator-guide/15-vs-30-year-mortgage" underline="hover" color="primary">
              15 vs 30-year mortgage breakdown
            </Link>{" "}
            or calculate budget limits with the{" "}
            <Link href="/blog/mortgage-calculator-guide/how-much-house-can-i-afford" underline="hover" color="primary">
              28/36 rule affordability guide
            </Link>.
          </Typography>
        )}
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}
