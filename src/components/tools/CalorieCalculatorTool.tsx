
import { useState, useMemo } from "react";import { Box, Stack, TextField, Typography, ToggleButton, ToggleButtonGroup, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import ToolPaper from "@/components/ToolPaper";
import { fmt0 } from "@/lib/format";

type Sex = "male" | "female";

const ACTIVITY_OPTIONS = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Lightly active (light exercise 1-3 days/week)", value: 1.375 },
  { label: "Moderately active (moderate exercise 3-5 days/week)", value: 1.55 },
  { label: "Very active (hard exercise 6-7 days/week)", value: 1.725 },
  { label: "Extra active (very hard exercise & physical job)", value: 1.9 },
] as const;

export default function CalorieCalculatorTool() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState<number>(1.2);

  const { bmr, tdee } = useMemo(() => {
    const a = parseInt(age, 10);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!isFinite(a) || !isFinite(w) || !isFinite(h) || a <= 0 || w <= 0 || h <= 0) {
      return { bmr: null as number | null, tdee: null as number | null };
    }
    // Mifflin-St Jeor
    const base = 10 * w + 6.25 * h - 5 * a;
    const bmrVal = sex === "male" ? base + 5 : base - 161;
    if (!isFinite(bmrVal) || bmrVal <= 0) return { bmr: null, tdee: null };
    const tdeeVal = bmrVal * activity;
    return { bmr: bmrVal, tdee: tdeeVal };
  }, [age, sex, weight, height, activity]);

  const fmt = fmt0;

  const deficit = tdee !== null ? tdee - 500 : null;
  const surplus = tdee !== null ? tdee + 500 : null;
  const aggressiveDeficit = tdee !== null ? tdee - 1000 : null;

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Age (years)"
          type="number"
          fullWidth
          value={age}
          onChange={(e) => setAge(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <Box className="flex items-center">
          <ToggleButtonGroup
            size="small"
            value={sex}
            exclusive
            onChange={(_, v) => v && setSex(v)}
            aria-label="sex"
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Weight (kg)"
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Height (cm)"
          type="number"
          fullWidth
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <FormControl fullWidth>
        <InputLabel>Activity level</InputLabel>
        <Select label="Activity level" value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
          {ACTIVITY_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label} — {opt.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Basal Metabolic Rate (BMR)
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {bmr !== null ? `${fmt(bmr)} kcal/day` : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Mifflin-St Jeor: {sex === "male" ? "10×kg + 6.25×cm − 5×age + 5" : "10×kg + 6.25×cm − 5×age − 161"}
        </Typography>
      </Box>

      <Box
        className="p-4 rounded-[16px] border border-base-300 text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Total Daily Energy Expenditure (TDEE)
        </Typography>
        <Typography variant="h4" className="font-extrabold">
          {tdee !== null ? `${fmt(tdee)} kcal/day` : "—"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          TDEE = BMR × {activity}
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Maintain weight</Typography>
          <Typography className="font-bold">{tdee !== null ? `${fmt(tdee)} kcal` : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Mild weight loss (−500 kcal)</Typography>
          <Typography className="font-bold">{deficit !== null ? `${fmt(deficit)} kcal` : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Weight loss (−1000 kcal)</Typography>
          <Typography className="font-bold">{aggressiveDeficit !== null ? `${fmt(aggressiveDeficit)} kcal` : "—"}</Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Mild weight gain (+500 kcal)</Typography>
          <Typography className="font-bold">{surplus !== null ? `${fmt(surplus)} kcal` : "—"}</Typography>
        </Box>
      </Stack>

      <Alert severity="warning">For informational purposes only — not medical advice.</Alert>
    </ToolPaper>
  );
}
