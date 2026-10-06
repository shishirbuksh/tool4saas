"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { money } from "@/lib/format";
import { calcEmi, overpaymentSchedule } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function MortgageOverpaymentTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [extraMonthly, setExtraMonthly] = useState("");
  const [lumpSum, setLumpSum] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const base = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y)) return null;
    return calcEmi({ principal: p, annualRatePct: r, years: y });
  }, [principal, rate, years]);

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    const extra = extraMonthly.trim() === "" ? 0 : parseFloat(extraMonthly);
    const lump = lumpSum.trim() === "" ? 0 : parseFloat(lumpSum);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y) || !isFinite(extra) || !isFinite(lump)) return null;
    return overpaymentSchedule(p, r, y, extra, lump);
  }, [principal, rate, years, extraMonthly, lumpSum]);

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
        <NumericField label="Loan amount" value={principal} onChange={setPrincipal} />
        <NumericField label="Annual rate (%)" value={rate} onChange={setRate} />
        <NumericField label="Term (years)" value={years} onChange={setYears} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Extra per month" value={extraMonthly} onChange={setExtraMonthly} />
        <NumericField label="One-time lump sum" value={lumpSum} onChange={setLumpSum} />
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
          Interest saved
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {result !== null && isFinite(result.saved) ? money(result.saved, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Base monthly payment</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {base !== null && isFinite(base.emi) ? money(base.emi, currency) : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Months saved</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result !== null && isFinite(result.monthsSaved) ? result.monthsSaved : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">New payoff term</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result !== null && isFinite(result.newTermMonths)
              ? `${Math.floor(result.newTermMonths / 12)}y ${result.newTermMonths % 12}m (${result.newTermMonths} months)`
              : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">New total interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {result !== null && isFinite(result.newInterest) ? money(result.newInterest, currency) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        For informational purposes only — not financial advice. Check your lender for prepayment penalties, fees,
        or overpayment limits before paying extra. See /terms
      </Alert>
    </ToolPaper>
  );
}
