"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function LoanCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const { monthly, total, interest } = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y) || p <= 0 || y <= 0)
      return { monthly: null, total: null, interest: null };
    const n = Math.round(y * 12);
    const mr = r / 100 / 12;
    const payment = mr < 1e-6 ? p / n : (p * mr) / (1 - Math.pow(1 + mr, -n));
    const tot = payment * n;
    return { monthly: payment, total: tot, interest: tot - p };
  }, [principal, rate, years]);

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
            {monthly !== null ? money(monthly) : "—"}
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Total paid</Typography>
            <Typography sx={{ fontWeight: 700 }}>{total !== null ? money(total) : "—"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Total interest</Typography>
            <Typography sx={{ fontWeight: 700 }}>{interest !== null ? money(interest) : "—"}</Typography>
          </Box>
        </Stack>
    </ToolPaper>
  );
}
