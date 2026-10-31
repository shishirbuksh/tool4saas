
import { useState, useMemo } from "react";import { Box, Stack, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import ToolPaper from "@/components/ToolPaper";
import { fmt0, fmtNumber } from "@/lib/format";

type PresetKey = "balanced" | "highProtein" | "lowFat" | "highCarb" | "keto" | "custom";

type Preset = {
  label: string;
  value: PresetKey;
  p: number;
  c: number;
  f: number;
};

const PRESETS: Preset[] = [
  { label: "Balanced — 30% Protein / 40% Carbs / 30% Fat", value: "balanced", p: 30, c: 40, f: 30 },
  { label: "High Protein — 40% / 30% / 30%", value: "highProtein", p: 40, c: 30, f: 30 },
  { label: "Low Fat — 25% / 55% / 20%", value: "lowFat", p: 25, c: 55, f: 20 },
  { label: "High Carb — 20% / 60% / 20%", value: "highCarb", p: 20, c: 60, f: 20 },
  { label: "Keto — 20% / 10% / 70%", value: "keto", p: 20, c: 10, f: 70 },
  { label: "Custom", value: "custom", p: 30, c: 40, f: 30 },
];

export default function MacroCalculatorTool() {
  const [calories, setCalories] = useState("");
  const [preset, setPreset] = useState<PresetKey>("balanced");
  const [proteinPct, setProteinPct] = useState(30);
  const [carbPct, setCarbPct] = useState(40);
  const [fatPct, setFatPct] = useState(30);

  const handlePresetChange = (value: PresetKey) => {
    setPreset(value);
    const found = PRESETS.find((p) => p.value === value);
    if (found && value !== "custom") {
      setProteinPct(found.p);
      setCarbPct(found.c);
      setFatPct(found.f);
    }
  };

  const handleProteinChange = (v: string) => {
    setProteinPct(Number(v) || 0);
    setPreset("custom");
  };
  const handleCarbChange = (v: string) => {
    setCarbPct(Number(v) || 0);
    setPreset("custom");
  };
  const handleFatChange = (v: string) => {
    setFatPct(Number(v) || 0);
    setPreset("custom");
  };

  const { proteinGrams, carbGrams, fatGrams, proteinKcal, carbKcal, fatKcal, totalPct, validCalories } = useMemo(() => {
    const cal = parseFloat(calories);
    const validCal = isFinite(cal) && cal > 0 ? cal : null;
    const total = proteinPct + carbPct + fatPct;

    if (validCal === null) {
      return {
        proteinGrams: null as number | null,
        carbGrams: null as number | null,
        fatGrams: null as number | null,
        proteinKcal: null as number | null,
        carbKcal: null as number | null,
        fatKcal: null as number | null,
        totalPct: total,
        validCalories: null as number | null,
      };
    }

    const pKcal = validCal * (proteinPct / 100);
    const cKcal = validCal * (carbPct / 100);
    const fKcal = validCal * (fatPct / 100);

    return {
      proteinGrams: pKcal / 4,
      carbGrams: cKcal / 4,
      fatGrams: fKcal / 9,
      proteinKcal: pKcal,
      carbKcal: cKcal,
      fatKcal: fKcal,
      totalPct: total,
      validCalories: validCal,
    };
  }, [calories, proteinPct, carbPct, fatPct]);

  const fmtGrams = (n: number) =>
    fmtNumber(n, { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  const fmtKcal = fmt0;

  const isValidRatio = totalPct === 100;

  return (
    <ToolPaper>
      <TextField
        label="Daily calories (kcal)"
        type="number"
        fullWidth
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="e.g. 2000 — from calorie calculator or direct"
        helperText="Enter your TDEE from the Calorie Calculator or your target calories"
        slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
      />

      <FormControl fullWidth>
        <InputLabel>Macro ratio preset</InputLabel>
        <Select label="Macro ratio preset" value={preset} onChange={(e) => handlePresetChange(e.target.value as PresetKey)}>
          {PRESETS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Protein %</InputLabel>
          <Select label="Protein %" value={proteinPct} onChange={(e) => handleProteinChange(String(e.target.value))}>
            {Array.from({ length: 21 }, (_, i) => i * 5).map((v) => (
              <MenuItem key={v} value={v}>
                {v}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Carbs %</InputLabel>
          <Select label="Carbs %" value={carbPct} onChange={(e) => handleCarbChange(String(e.target.value))}>
            {Array.from({ length: 21 }, (_, i) => i * 5).map((v) => (
              <MenuItem key={v} value={v}>
                {v}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Fat %</InputLabel>
          <Select label="Fat %" value={fatPct} onChange={(e) => handleFatChange(String(e.target.value))}>
            {Array.from({ length: 21 }, (_, i) => i * 5).map((v) => (
              <MenuItem key={v} value={v}>
                {v}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Protein % (fine-tune)"
          type="number"
          fullWidth
          value={proteinPct}
          onChange={(e) => handleProteinChange(e.target.value)}
          slotProps={{
            input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 0, max: 100, step: 1 },
          }}
        />
        <TextField
          label="Carbs % (fine-tune)"
          type="number"
          fullWidth
          value={carbPct}
          onChange={(e) => handleCarbChange(e.target.value)}
          slotProps={{
            input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 0, max: 100, step: 1 },
          }}
        />
        <TextField
          label="Fat % (fine-tune)"
          type="number"
          fullWidth
          value={fatPct}
          onChange={(e) => handleFatChange(e.target.value)}
          slotProps={{
            input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 0, max: 100, step: 1 },
          }}
        />
      </Stack>

      {!isValidRatio && (
        <Alert severity="warning">
          Ratios sum to {totalPct}% — they should sum to 100% for accurate results. Adjust protein/carb/fat percentages.
        </Alert>
      )}

      <Box
        className="p-4 rounded-[16px] border text-center" style={{ borderColor: isValidRatio ? "primary.main" : "warning.main" }}
      >
        <Typography variant="overline" color="text.secondary">
          Daily macros {validCalories !== null ? `for ${fmtKcal(validCalories)} kcal` : ""}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="mt-2 justify-around">
          <Box className="flex-1">
            <Typography variant="caption" color="text.secondary" className="uppercase tracking-[1px]">
              Protein {proteinPct}%
            </Typography>
            <Typography variant="h4" className="font-extrabold text-primary">
              {proteinGrams !== null ? `${fmtGrams(proteinGrams)} g` : "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {proteinKcal !== null ? `${fmtKcal(proteinKcal)} kcal • ${fmtGrams(proteinGrams ?? 0)} g = cal × ${proteinPct}% ÷ 4` : "4 kcal/g"}
            </Typography>
          </Box>
          <Box className="flex-1">
            <Typography variant="caption" color="text.secondary" className="uppercase tracking-[1px]">
              Carbs {carbPct}%
            </Typography>
            <Typography variant="h4" className="font-extrabold text-primary">
              {carbGrams !== null ? `${fmtGrams(carbGrams)} g` : "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {carbKcal !== null ? `${fmtKcal(carbKcal)} kcal • ${fmtGrams(carbGrams ?? 0)} g = cal × ${carbPct}% ÷ 4` : "4 kcal/g"}
            </Typography>
          </Box>
          <Box className="flex-1">
            <Typography variant="caption" color="text.secondary" className="uppercase tracking-[1px]">
              Fat {fatPct}%
            </Typography>
            <Typography variant="h4" className="font-extrabold text-primary">
              {fatGrams !== null ? `${fmtGrams(fatGrams)} g` : "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {fatKcal !== null ? `${fmtKcal(fatKcal)} kcal • ${fmtGrams(fatGrams ?? 0)} g = cal × ${fatPct}% ÷ 9` : "9 kcal/g"}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        className="p-3 rounded-[16px] border border-base-300"
      >
        <Stack spacing={0.5}>
          <Box className="flex justify-between">
            <Typography color="text.secondary">Protein</Typography>
            <Typography className="font-bold">
              {proteinGrams !== null ? `${fmtGrams(proteinGrams)} g` : "—"} {proteinKcal !== null ? `(${fmtKcal(proteinKcal)} kcal)` : ""}
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography color="text.secondary">Carbohydrates</Typography>
            <Typography className="font-bold">
              {carbGrams !== null ? `${fmtGrams(carbGrams)} g` : "—"} {carbKcal !== null ? `(${fmtKcal(carbKcal)} kcal)` : ""}
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography color="text.secondary">Fat</Typography>
            <Typography className="font-bold">
              {fatGrams !== null ? `${fmtGrams(fatGrams)} g` : "—"} {fatKcal !== null ? `(${fmtKcal(fatKcal)} kcal)` : ""}
            </Typography>
          </Box>
          <Box className="flex justify-between border-t border-base-300 pt-2 mt-2">
            <Typography className="font-bold">Total</Typography>
            <Typography className="font-extrabold">
              {validCalories !== null ? `${fmtKcal(validCalories)} kcal` : "—"} • {totalPct}%
            </Typography>
          </Box>
        </Stack>
        <Typography variant="caption" color="text.secondary" className="block mt-2">
          Formulas: protein = cal × protein% ÷ 4 • carbs = cal × carb% ÷ 4 • fat = cal × fat% ÷ 9
        </Typography>
      </Box>

      <Alert severity="info">
        For informational purposes only — not medical advice. Individual macro needs vary; consult a healthcare professional or registered dietitian for personalized guidance.
      </Alert>
    </ToolPaper>
  );
}
