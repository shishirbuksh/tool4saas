"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { money } from "@/lib/format";
import ToolPaper from "@/components/ToolPaper";

export default function CommissionCalculatorTool() {
  const [sales, setSales] = useState("");
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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {field("Sales amount", sales, setSales)}
          {field("Commission (%)", percent, setPercent, "%")}
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
            Commission
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            {commission !== null ? money(commission) : "—"}
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Total</Typography>
            <Typography sx={{ fontWeight: 700 }}>{total !== null ? money(total) : "—"}</Typography>
          </Box>
        </Stack>
    </ToolPaper>
  );
}