"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Alert from "@mui/material/Alert";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import { fmt1 } from "@/lib/format";

type Unit = "kg" | "lb";

const ZONES = [90, 85, 80, 75] as const;

export default function OneRepMaxCalculatorTool() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState<Unit>("kg");

  const { epley, brzycki, average } = useMemo(() => {
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (!isFinite(w) || !isFinite(r) || w <= 0 || r < 1 || r >= 37) {
      return { epley: null as number | null, brzycki: null as number | null, average: null as number | null };
    }
    // Epley: w * (1 + r / 30)
    const epleyVal = w * (1 + r / 30);
    // Brzycki: w * 36 / (37 - r)
    const brzyckiVal = (w * 36) / (37 - r);
    if (!isFinite(epleyVal) || !isFinite(brzyckiVal) || epleyVal <= 0 || brzyckiVal <= 0) {
      return { epley: null, brzycki: null, average: null };
    }
    return { epley: epleyVal, brzycki: brzyckiVal, average: (epleyVal + brzyckiVal) / 2 };
  }, [weight, reps]);

  return (
    <ToolPaper>
      <YMYLDisclaimer type="health" />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label={`Weight lifted (${unit})`}
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Reps performed"
          type="number"
          fullWidth
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ToggleButtonGroup
            size="small"
            value={unit}
            exclusive
            onChange={(_, v) => v && setUnit(v)}
            aria-label="unit"
          >
            <ToggleButton value="kg">kg</ToggleButton>
            <ToggleButton value="lb">lb</ToggleButton>
          </ToggleButtonGroup>
        </Box>
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
          Epley estimated 1RM
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {epley !== null ? `${fmt1(epley)} ${unit}` : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Epley: w × (1 + r / 30)
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Brzycki estimated 1RM
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {brzycki !== null ? `${fmt1(brzycki)} ${unit}` : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Brzycki: w × 36 / (37 − r)
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {ZONES.map((pct) => {
          const value = average !== null ? (average * pct) / 100 : null;
          return (
            <Box key={pct} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">{pct}% of 1RM (avg)</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {value !== null ? `${fmt1(value)} ${unit}` : "—"}
              </Typography>
            </Box>
          );
        })}
        <Typography variant="caption" color="text.secondary">
          Training zones are based on the average of Epley and Brzycki estimates. Enter 1–36 reps; estimates are most
          accurate for low rep ranges.
        </Typography>
      </Stack>

      <Alert severity="warning">For informational purposes only — not medical advice.</Alert>
    </ToolPaper>
  );
}
