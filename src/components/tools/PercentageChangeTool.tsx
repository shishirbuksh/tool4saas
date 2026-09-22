"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function PercentageChangeTool() {
  const [old, setOld] = useState("");
  const [newVal, setNewVal] = useState("");

  const change = useMemo(() => {
    const o = parseFloat(old);
    const n = parseFloat(newVal);
    if (!isFinite(o) || !isFinite(n)) return null;
    if (o === 0) return n === 0 ? 0 : null;
    return ((n - o) / o) * 100;
  }, [old, newVal]);

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Old value"
            type="number"
            fullWidth
            value={old}
            onChange={(e) => setOld(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="New value"
            type="number"
            fullWidth
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <YMYLDisclaimer type="finance" />
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
            Change
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            {change !== null ? `${change.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
        {change !== null && (
          <Typography variant="body2" color="text.secondary">
            {change >= 0 ? "Increase" : "Decrease"}
          </Typography>
        )}
      </ToolPaper>
  );
}