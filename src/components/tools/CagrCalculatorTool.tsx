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

export default function CagrCalculatorTool() {
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [years, setYears] = useState("");

  const { cagr, multiple, gain } = useMemo(() => {
    const start = parseFloat(startValue);
    const end = parseFloat(endValue);
    const y = parseFloat(years);
    if (!isFinite(start) || !isFinite(end) || !isFinite(y) || start <= 0 || end < 0 || y <= 0) {
      return { cagr: null as number | null, multiple: null as number | null, gain: null as number | null };
    }
    const c = Math.pow(end / start, 1 / y) - 1;
    if (!isFinite(c)) {
      return { cagr: null as number | null, multiple: null as number | null, gain: null as number | null };
    }
    return { cagr: c, multiple: end / start, gain: end - start };
  }, [startValue, endValue, years]);

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
      <YMYLDisclaimer type="finance" />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Start value", startValue, setStartValue)}
        {field("End value", endValue, setEndValue)}
        {field("Years", years, setYears)}
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
          Compound annual growth rate (CAGR)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {cagr !== null ? `${(cagr * 100).toFixed(2)}%` : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Growth multiple</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {multiple !== null ? `${multiple.toFixed(2)}x` : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total gain</Typography>
          <Typography sx={{ fontWeight: 700 }}>{gain !== null ? money(gain) : "—"}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only and is not financial advice.
        Actual returns may vary due to fees, taxes, compounding timing, or incomplete periods. Consult
        a financial advisor for accurate advice.
      </Alert>
    </ToolPaper>
  );
}
