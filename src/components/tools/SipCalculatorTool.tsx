
import { useMemo, useState } from "react";import { Box, TextField, Typography, Link, Stack, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function SipCalculatorTool() {
  const [monthly, setMonthly] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
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
    if (Math.abs(mr) >= EPSILON_RATE) {
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
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Future value
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {future !== null ? money(future, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Invested amount</Typography>
          <Typography className="font-bold">{invested !== null ? money(invested, currency) : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Estimated gain</Typography>
          <Typography className="font-bold">{gain !== null ? money(gain, currency) : "—"}</Typography>
        </Box>
        {future !== null && (
          <Typography variant="caption" color="text.secondary">
            Goal planning: See our breakdown of a{" "}
            <Link href="/blog/sip-calculator-guide/sip-5000-10-years" underline="hover" color="primary">
              ₹5,000 monthly SIP growth chart
            </Link>{" "}
            or discover the required monthly investment to build a{" "}
            <Link href="/blog/sip-calculator-guide/sip-1-crore-goal" underline="hover" color="primary">
              ₹1 Crore corpus by retirement
            </Link>.
          </Typography>
        )}
      </Stack>
      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only. Actual returns may vary due to
        market conditions, rounding, taxes, fees, or changes in interest rate. Consult a financial advisor
        for accurate advice.
      </Alert>
    </ToolPaper>
  );
}
