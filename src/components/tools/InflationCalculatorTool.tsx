
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function InflationCalculatorTool() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const { futureAmount, purchasingPower } = useMemo(() => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (!isFinite(a) || !isFinite(r) || !isFinite(y) || a < 0 || y < 0) {
      return { futureAmount: null as number | null, purchasingPower: null as number | null };
    }
    const factor = Math.pow(1 + r / 100, y);
    if (!isFinite(factor) || factor === 0) {
      return { futureAmount: null, purchasingPower: null };
    }
    const future = a * factor;
    const power = a / factor;
    if (!isFinite(future) || !isFinite(power)) {
      return { futureAmount: null, purchasingPower: null };
    }
    return { futureAmount: future, purchasingPower: power };
  }, [amount, rate, years]);

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
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off", startAdornment: "$" } }}
        />
        <TextField
          label="Inflation rate (%)"
          type="number"
          fullWidth
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off", endAdornment: "%" } }}
        />
        <TextField
          label="Years"
          type="number"
          fullWidth
          value={years}
          onChange={(e) => setYears(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box
          className="flex-1 p-4 rounded-[16px] border border-primary text-center"
        >
          <Typography variant="overline" color="text.secondary">
            Future amount
          </Typography>
          <Typography variant="h5" className="font-extrabold text-primary">
            {futureAmount !== null ? money(futureAmount, currency) : "—"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            amount × (1 + rate/100) ^ years
          </Typography>
        </Box>
        <Box
          className="flex-1 p-4 rounded-[16px] border border-primary text-center"
        >
          <Typography variant="overline" color="text.secondary">
            Purchasing power
          </Typography>
          <Typography variant="h5" className="font-extrabold text-primary">
            {purchasingPower !== null ? money(purchasingPower, currency) : "—"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            amount ÷ (1 + rate/100) ^ years
          </Typography>
        </Box>
      </Stack>

      <Alert severity="info">
        Disclaimer: This calculation is for illustration purposes only and assumes a constant annual
        inflation rate. Actual inflation and purchasing power may vary due to economic changes, taxes,
        and fees. Consult a financial advisor for accurate advice.
      </Alert>
    </ToolPaper>
  );
}
