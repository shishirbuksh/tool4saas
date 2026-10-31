
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function CommissionCalculatorTool() {
  const [sales, setSales] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [percent, setPercent] = useState("");

  const { commission, total } = useMemo(() => {
    const s = parseFloat(sales);
    const p = parseFloat(percent);
    if (!isFinite(s) || !isFinite(p) || s < 0) return { commission: null, total: null };
    const comm = s * (p / 100);
    return { commission: comm, total: s + comm };
  }, [sales, percent]);

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
          {field("Sales amount", sales, setSales)}
          {field("Commission (%)", percent, setPercent, "%")}
        </Stack>
        <Box
          className="p-4 rounded-[16px] border border-primary text-center"
        >
          <Typography variant="overline" color="text.secondary">
            Commission
          </Typography>
          <Typography variant="h3" className="font-extrabold text-primary">
            {commission !== null ? money(commission, currency) : "—"}
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          <Box className="flex justify-between">
            <Typography color="text.secondary">Total</Typography>
            <Typography className="font-bold">{total !== null ? money(total, currency) : "—"}</Typography>
          </Box>
        </Stack>
    </ToolPaper>
  );
}