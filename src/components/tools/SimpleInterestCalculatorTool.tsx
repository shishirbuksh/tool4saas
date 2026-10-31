
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Principal", principal, setPrincipal)}
        {field("Annual rate (%)", rate, setRate, "%")}
        {field("Time (years)", years, setYears)}
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Total amount
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {total !== null ? money(total) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Principal</Typography>
          <Typography className="font-bold">
            {(() => {
              const p = parseFloat(principal);
              return isFinite(p) && p > 0 ? money(p) : "—";
            })()}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Interest</Typography>
          <Typography className="font-bold">{interest !== null ? money(interest) : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Monthly payment</Typography>
          <Typography className="font-bold">{monthly !== null ? money(monthly) : "—"}</Typography>
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
