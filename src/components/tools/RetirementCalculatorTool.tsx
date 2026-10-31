
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import { money, EPSILON_RATE } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function RetirementCalculatorTool() {
  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [goal, setGoal] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const { years, future, invested, shortfall } = useMemo(() => {
    const empty = {
      years: null as number | null,
      future: null as number | null,
      invested: null as number | null,
      shortfall: null as number | null,
    };
    const ca = parseFloat(currentAge);
    const ra = parseFloat(retireAge);
    const current = parseFloat(currentSavings);
    const m = parseFloat(monthly);
    const rRaw = parseFloat(rate);
    const g = goal.trim() === "" ? NaN : parseFloat(goal);
    if (
      !isFinite(ca) ||
      !isFinite(ra) ||
      !isFinite(current) ||
      !isFinite(m) ||
      !isFinite(rRaw) ||
      ca < 0 ||
      ra <= ca ||
      current < 0 ||
      m < 0
    ) {
      return empty;
    }
    const n = ra - ca;
    const months = n * 12;
    const r = rRaw / 100;
    const mr = rRaw / 100 / 12;
    const lump = current * Math.pow(1 + r, n);
    let sip: number;
    if (Math.abs(mr) >= EPSILON_RATE) {
      sip = m * ((Math.pow(1 + mr, months) - 1) / mr) * (1 + mr);
    } else {
      sip = m * months;
    }
    const fut = lump + sip;
    const inv = current + m * months;
    if (!isFinite(fut) || !isFinite(inv) || !isFinite(lump) || !isFinite(sip)) {
      return empty;
    }
    return {
      years: n,
      future: fut,
      invested: inv,
      shortfall: isFinite(g) && g >= 0 ? g - fut : null,
    };
  }, [currentAge, retireAge, currentSavings, monthly, rate, goal]);

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
        {field("Current age", currentAge, setCurrentAge)}
        {field("Retirement age", retireAge, setRetireAge)}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Current savings", currentSavings, setCurrentSavings)}
        {field("Monthly contribution", monthly, setMonthly)}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Annual rate (%)", rate, setRate, "%")}
        {field("Retirement goal (optional)", goal, setGoal)}
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Projected corpus at retirement
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {future !== null ? money(future, currency) : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {years !== null ? `in ${years} year${years === 1 ? "" : "s"}` : "Enter valid ages to project"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Total contributions</Typography>
          <Typography className="font-bold">{invested !== null ? money(invested, currency) : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Retirement goal</Typography>
          <Typography className="font-bold">
            {shortfall !== null && future !== null
              ? money(shortfall + future, currency)
              : goal.trim() !== "" && future !== null
                ? money(parseFloat(goal), currency)
                : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">{shortfall !== null && shortfall > 0 ? "Shortfall" : "Surplus"}</Typography>
          <Typography className="font-bold">
            {shortfall !== null ? money(Math.abs(shortfall), currency) : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only. Actual returns may vary due to
        market conditions, rounding, taxes, fees, inflation, or changes in interest rate. Consult a financial
        advisor for accurate advice.
      </Alert>
    </ToolPaper>
  );
}
