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
import Alert from "@mui/material/Alert";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function SipCalculatorTool() {
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState<string>("monthly");

  const { future, invested, gain } = useMemo(() => {
    const m = parseFloat(monthly);
    const rRaw = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(m) || !isFinite(rRaw) || !isFinite(y) || m <= 0 || y <= 0) {
      return {
        future: null as number | null,
        invested: null as number | null,
        gain: null as number | null,
      };
    }
    const n = y * 12;
    const mr = rRaw / 100 / 12;
    const inv = m * n;
    let fut: number;
    if (mr > 0) {
      fut = m * ((Math.pow(1 + mr, n) - 1) / mr) * (1 + mr);
    } else {
      fut = m * n;
    }
    if (!isFinite(fut) || !isFinite(inv)) {
      return { future: null, invested: null, gain: null };
    }
    return { future: fut, invested: inv, gain: fut - inv };
  }, [monthly, rate, years]);

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
        {field("Monthly investment", monthly, setMonthly)}
        {field("Annual rate (%)", rate, setRate, "%")}
        {field("Time (years)", years, setYears)}
      </Stack>
      <FormControl fullWidth>
        <InputLabel>Compounding frequency</InputLabel>
        <Select
          label="Compounding frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
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
          Future value
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {future !== null ? money(future) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Invested amount</Typography>
          <Typography sx={{ fontWeight: 700 }}>{invested !== null ? money(invested) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Estimated gain</Typography>
          <Typography sx={{ fontWeight: 700 }}>{gain !== null ? money(gain) : "—"}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only. Actual returns may vary due to
        market conditions, rounding, taxes, fees, or changes in interest rate. Consult a financial advisor
        for accurate advice.
      </Alert>
    </ToolPaper>
  );
}
