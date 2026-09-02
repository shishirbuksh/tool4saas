"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ToolPaper from "@/components/ToolPaper";
import { fmt0, fmt2, fmtNumber } from "@/lib/format";

const KG_PER_LB = 0.453592;

type ActivityLevel = "sedentary" | "moderate" | "active";
type Climate = "normal" | "hot";

export default function WaterIntakeCalculatorTool() {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("sedentary");
  const [climate, setClimate] = useState<Climate>("normal");

  const { totalMl, liters, glasses } = useMemo(() => {
    const w = parseFloat(weight);
    if (!isFinite(w) || w <= 0) {
      return { totalMl: null as number | null, liters: null as number | null, glasses: null as number | null };
    }
    const weightKg = unit === "kg" ? w : w * KG_PER_LB;
    const base = weightKg * 35;
    let adjustment = 0;
    if (activityLevel === "active") adjustment += 500;
    if (climate === "hot") adjustment += 500;
    const total = base + adjustment;
    return {
      totalMl: total,
      liters: total / 1000,
      glasses: total / 250,
    };
  }, [weight, unit, activityLevel, climate]);

  const fmtLiters = fmt2;
  const fmtGlasses = (n: number) => fmtNumber(n, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmtMl = fmt0;

  return (
    <ToolPaper>
      <ToggleButtonGroup size="small" value={unit} exclusive onChange={(_, v) => v && setUnit(v)} aria-label="weight unit">
        <ToggleButton value="kg">kg</ToggleButton>
        <ToggleButton value="lb">lb</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        label={unit === "kg" ? "Weight (kg)" : "Weight (lb)"}
        type="number"
        fullWidth
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Activity level</InputLabel>
          <Select
            label="Activity level"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
          >
            <MenuItem value="sedentary">Sedentary</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ToggleButtonGroup
            size="small"
            value={climate}
            exclusive
            onChange={(_, v) => v && setClimate(v)}
            aria-label="climate"
          >
            <ToggleButton value="normal">Normal</ToggleButton>
            <ToggleButton value="hot">Hot</ToggleButton>
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
          Daily water intake
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {liters !== null ? `${fmtLiters(liters)} L` : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalMl !== null ? `${fmtMl(totalMl)} ml` : "Enter weight to calculate"}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
          Base = weightKg × 35 ml{activityLevel === "active" ? " + 500 ml (active)" : ""}
          {climate === "hot" ? " + 500 ml (hot climate)" : ""}
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
          Glasses per day (250 ml)
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {glasses !== null ? `${fmtGlasses(glasses)} glasses` : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          1 glass = 250 ml
        </Typography>
      </Box>

      <Alert severity="info">
        This is an estimate only and not medical advice. Individual needs vary based on health, diet, and
        environment — consult a healthcare professional if needed.
      </Alert>
    </ToolPaper>
  );
}
