
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Start value", startValue, setStartValue)}
        {field("End value", endValue, setEndValue)}
        {field("Years", years, setYears)}
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Compound annual growth rate (CAGR)
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {cagr !== null ? `${(cagr * 100).toFixed(2)}%` : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Growth multiple</Typography>
          <Typography className="font-bold">
            {multiple !== null ? `${multiple.toFixed(2)}x` : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total gain</Typography>
          <Typography className="font-bold">{gain !== null ? money(gain) : "—"}</Typography>
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
