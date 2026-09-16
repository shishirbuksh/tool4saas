"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";

export default function SimpleInterestCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const { interest, total, monthly } = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(p) || !isFinite(r) || !isFinite(y) || p <= 0 || y <= 0) {
      return {
        interest: null as number | null,
        total: null as number | null,
        monthly: null as number | null,
      };
    }
    const computedInterest = (p * r * y) / 100;
    if (!isFinite(computedInterest)) {
      return { interest: null, total: null, monthly: null };
    }
    const computedTotal = p + computedInterest;
    const months = y * 12;
    const computedMonthly = months > 0 ? computedTotal / months : null;
    return { interest: computedInterest, total: computedTotal, monthly: computedMonthly };
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
      <YMYLDisclaimer type="finance" />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Principal", principal, setPrincipal)}
        {field("Annual rate (%)", rate, setRate, "%")}
        {field("Time (years)", years, setYears)}
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
          Total amount
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {total !== null ? money(total) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Principal</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {(() => {
              const p = parseFloat(principal);
              return isFinite(p) && p > 0 ? money(p) : "—";
            })()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>{interest !== null ? money(interest) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Monthly payment</Typography>
          <Typography sx={{ fontWeight: 700 }}>{monthly !== null ? money(monthly) : "—"}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only. Actual maturity may vary due to
        rounding, taxes, fees, or changes in interest rate. Consult a financial advisor for accurate
        advice.
      </Alert>
    </ToolPaper>
  );
}
