"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function PercentageDifferenceTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const diff = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (!isFinite(x) || !isFinite(y)) return null;
    const avg = (Math.abs(x) + Math.abs(y)) / 2;
    if (avg === 0) return 0;
    return Math.abs(x - y) / avg * 100;
  }, [a, b]);

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Value A"
            type="number"
            fullWidth
            value={a}
            onChange={(e) => setA(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Value B"
            type="number"
            fullWidth
            value={b}
            onChange={(e) => setB(e.target.value)}
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
            Difference
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            {diff !== null ? `${diff.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
        {diff !== null && (
          <Typography variant="body2" color="text.secondary">
            {diff >= 0 ? "Increase" : "Decrease"}
          </Typography>
        )}
      </ToolPaper>
  );
}