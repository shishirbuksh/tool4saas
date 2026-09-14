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
import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function LoanCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const { monthly, total, interest } = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y) || p <= 0 || y <= 0)
      return { monthly: null, total: null, interest: null };
    const n = Math.round(y * 12);
    if (!isFinite(n) || n === 0 || n <= 0) return { monthly: null, total: null, interest: null };
    const mr = r / 100 / 12;
    if (!isFinite(mr)) return { monthly: null, total: null, interest: null };
    const payment = mr === 0 || Math.abs(mr) < EPSILON_RATE ? p / n : (p * mr) / (1 - Math.pow(1 + mr, -n));
    if (!isFinite(payment)) return { monthly: null, total: null, interest: null };
    const tot = payment * n;
    if (!isFinite(tot)) return { monthly: null, total: null, interest: null };
    const intr = tot - p;
    if (!isFinite(intr)) return { monthly: null, total: null, interest: null };
    return { monthly: payment, total: tot, interest: intr };
  }, [principal, rate, years]);

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
          {field("Loan amount", principal, setPrincipal)}
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
            Monthly payment
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            {monthly !== null && isFinite(monthly) ? money(monthly, currency) : "—"}
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
    </ToolPaper>
  );
}
