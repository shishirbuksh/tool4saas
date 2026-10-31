
import { useMemo, useState } from "react";import { Box, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

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
        <NumericField label="Loan amount" value={principal} onChange={setPrincipal} />
        <NumericField label="Annual rate (%)" value={rate} onChange={setRate} />
        <NumericField label="Term (years)" value={years} onChange={setYears} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Extra per month" value={extraMonthly} onChange={setExtraMonthly} />
        <NumericField label="One-time lump sum" value={lumpSum} onChange={setLumpSum} />
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Interest saved
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.saved) ? money(result.saved, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Base monthly payment</Typography>
          <Typography className="font-bold">
            {base !== null && isFinite(base.emi) ? money(base.emi, currency) : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Months saved</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.monthsSaved) ? result.monthsSaved : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">New payoff term</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.newTermMonths)
              ? `${Math.floor(result.newTermMonths / 12)}y ${result.newTermMonths % 12}m (${result.newTermMonths} months)`
              : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">New total interest</Typography>
          <Typography className="font-bold">
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
