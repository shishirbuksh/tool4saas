
import { useMemo, useState } from "react";import { Box, TextField, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

export default function ProfitMarginCalculatorTool() {
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [revenue, setRevenue] = useState("");

  const { profit, margin, markup } = useMemo(() => {
    const c = parseFloat(cost);
    const r = parseFloat(revenue);
    if (!isFinite(c) || !isFinite(r) || c < 0 || r < 0) {
      return { profit: null as number | null, margin: null as number | null, markup: null as number | null };
    }
    const p = r - c;
    const mar = r !== 0 ? (p / r) * 100 : null;
    const mark = c !== 0 ? (p / c) * 100 : null;
    return { profit: p, margin: mar, markup: mark };
  }, [cost, revenue]);

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

  const fmtPct = (v: number | null) => (v === null || !isFinite(v) ? "—" : `${v.toFixed(2)}%`);

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
        {field("Cost", cost, setCost)}
        {field("Revenue (price)", revenue, setRevenue)}
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Profit
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {profit !== null ? money(profit, currency) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Margin (profit / revenue × 100)</Typography>
          <Typography className="font-bold">{fmtPct(margin)}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Markup (profit / cost × 100)</Typography>
          <Typography className="font-bold">{fmtPct(markup)}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Margin = profit ÷ revenue × 100 &middot; Markup = profit ÷ cost × 100. Profit = revenue − cost.
        Values are for reference only.
      </Alert>
    </ToolPaper>
  );
}
