
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert } from "@/components/ds";

import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function AutoLoanCalculatorTool() {
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [trade, setTrade] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const { emi, total, interest } = useMemo(() => {
    const p = parseFloat(price);
    const d = parseFloat(down) || 0;
    const t = parseFloat(trade) || 0;
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y) || p <= 0 || y <= 0)
      return { emi: null, total: null, interest: null };
    const principal = p - d - t;
    if (!isFinite(principal) || principal <= 0)
      return { emi: null, total: null, interest: null };
    const n = y * 12;
    if (!isFinite(n) || n <= 0) return { emi: null, total: null, interest: null };
    const mr = r / 100 / 12;
    if (!isFinite(mr)) return { emi: null, total: null, interest: null };
    const emiVal =
      mr === 0 || Math.abs(mr) < EPSILON_RATE
        ? principal / n
        : (principal * mr) / (1 - Math.pow(1 + mr, -n));
    if (!isFinite(emiVal)) return { emi: null, total: null, interest: null };
    const tot = emiVal * n;
    if (!isFinite(tot)) return { emi: null, total: null, interest: null };
    const intr = tot - principal;
    if (!isFinite(intr)) return { emi: null, total: null, interest: null };
    return { emi: emiVal, total: tot, interest: intr };
  }, [price, down, trade, rate, years]);

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
        {field("Vehicle price", price, setPrice)}
        {field("Down payment", down, setDown)}
        {field("Trade-in value", trade, setTrade)}
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
          {emi !== null && isFinite(emi) ? money(emi) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total paid</Typography>
          <Typography className="font-bold">
            {total !== null && isFinite(total) ? money(total) : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total interest</Typography>
          <Typography className="font-bold">
            {interest !== null && isFinite(interest) ? money(interest) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">For informational purposes only — not financial advice. See /terms</Alert>
    </ToolPaper>
  );
}
