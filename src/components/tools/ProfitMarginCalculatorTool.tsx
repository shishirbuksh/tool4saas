"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function ProfitMarginCalculatorTool() {
  const [cost, setCost] = useState("");
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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {field("Cost", cost, setCost)}
        {field("Revenue (price)", revenue, setRevenue)}
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
          Profit
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {profit !== null ? money(profit) : "—"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Margin (profit / revenue × 100)</Typography>
          <Typography sx={{ fontWeight: 700 }}>{fmtPct(margin)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Markup (profit / cost × 100)</Typography>
          <Typography sx={{ fontWeight: 700 }}>{fmtPct(markup)}</Typography>
        </Box>
      </Stack>
      <Alert severity="info">
        Margin = profit ÷ revenue × 100 &middot; Markup = profit ÷ cost × 100. Profit = revenue − cost.
        Values are for reference only.
      </Alert>
    </ToolPaper>
  );
}
