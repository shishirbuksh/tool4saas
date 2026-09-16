"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToolPaper from "@/components/ToolPaper";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import { BMI_UNDERWEIGHT, BMI_NORMAL, BMI_OVERWEIGHT, KG_PER_LB, METERS_PER_INCH, fmt1 } from "@/lib/format";

export default function BmiCalculatorTool() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const { bmi, category, color } = useMemo<{ bmi: number | null; category: string; color: string }>(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!isFinite(w) || !isFinite(h) || w <= 0 || h <= 0)
      return { bmi: null, category: "", color: "text.primary" };
    let kg = w;
    let m = h / 100;
    if (unit === "imperial") {
      kg = w * KG_PER_LB;
      m = h * METERS_PER_INCH;
    }
    const value = kg / (m * m);
    let cat = "Obese";
    let col: "error.main" | "warning.main" | "success.main" = "error.main";
    if (value < BMI_UNDERWEIGHT) {
      cat = "Underweight";
      col = "warning.main";
    } else if (value < BMI_NORMAL) {
      cat = "Normal";
      col = "success.main";
    } else if (value < BMI_OVERWEIGHT) {
      cat = "Overweight";
      col = "warning.main";
    }
    return { bmi: value, category: cat, color: col };
  }, [weight, height, unit]);

  const fmt = fmt1;

  return (
    <ToolPaper>
        <YMYLDisclaimer type="health" />
        <ToggleButtonGroup size="small" value={unit} exclusive onChange={(_, v) => v && setUnit(v)}>
          <ToggleButton value="metric">Metric (kg, cm)</ToggleButton>
          <ToggleButton value="imperial">Imperial (lb, in)</ToggleButton>
        </ToggleButtonGroup>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label={unit === "metric" ? "Weight (kg)" : "Weight (lb)"}
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 70…" : "e.g. 154…"}
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
            sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
          />
          <TextField
            label={unit === "metric" ? "Height (cm)" : "Height (in)"}
            type="number"
            fullWidth
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 175…" : "e.g. 69…"}
            slotProps={{
              input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
              htmlInput: { min: 0, step: "any" },
            }}
            sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
          />
        </Stack>
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
            Your BMI
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color }}>
            {bmi !== null ? fmt(bmi) : "—"}
          </Typography>
          {bmi !== null && (
            <Typography variant="subtitle1" sx={{ color, fontWeight: 700 }}>
              {category}
            </Typography>
          )}
        </Box>
    </ToolPaper>
  );
}
