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
      sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
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
          MenuProps={{ slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } }}
          sx={{ minHeight: 44 }}
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
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Monthly payment (EMI)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {emi !== null && isFinite(emi) ? money(emi, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total paid</Typography>
          <Typography sx={{ fontWeight: 700 }}>{total !== null && isFinite(total) ? money(total, currency) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>{interest !== null && isFinite(interest) ? money(interest, currency) : "—"}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}
