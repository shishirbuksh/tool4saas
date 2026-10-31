
import { useState, useMemo } from "react";import { Box, Stack, TextField, Typography, ToggleButton, ToggleButtonGroup, Select, MenuItem, FormControl, InputLabel, Alert } from "@/components/ds";

import ToolPaper from "@/components/ToolPaper";
import { fmtNumber, BMI_UNDERWEIGHT, METERS_PER_INCH, KG_PER_LB } from "@/lib/format";

type Sex = "male" | "female";
type HeightUnit = "cm" | "in";
type Formula = "devine" | "robinson" | "miller";

const LB_PER_KG = 1 / KG_PER_LB;
const BMI_HEALTHY_LOWER = BMI_UNDERWEIGHT; // 18.5
const BMI_HEALTHY_UPPER = 24.9; // WHO healthy upper (BMI_NORMAL is 25)

function devineKg(inches: number, sex: Sex) {
  const delta = inches - 60;
  if (sex === "male") return 50 + 2.3 * delta;
  return 45.5 + 2.3 * delta;
}

function robinsonKg(inches: number, sex: Sex) {
  const delta = inches - 60;
  if (sex === "male") return 52 + 1.9 * delta;
  return 49 + 1.7 * delta;
}

function millerKg(inches: number, sex: Sex) {
  const delta = inches - 60;
  if (sex === "male") return 56.2 + 1.41 * delta;
  return 53.1 + 1.36 * delta;
}

const FORMULA_LABELS: Record<Formula, string> = {
  devine: "Devine",
  robinson: "Robinson",
  miller: "Miller",
};

const FORMULA_EXPR: Record<Formula, { male: string; female: string }> = {
  devine: { male: "50 + 2.3 × (in − 60)", female: "45.5 + 2.3 × (in − 60)" },
  robinson: { male: "52 + 1.9 × (in − 60)", female: "49 + 1.7 × (in − 60)" },
  miller: { male: "56.2 + 1.41 × (in − 60)", female: "53.1 + 1.36 × (in − 60)" },
};

export default function IdealWeightCalculatorTool() {
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [formula, setFormula] = useState<Formula>("devine");
  const [resultUnit, setResultUnit] = useState<"kg" | "lb">("kg");

  const data = useMemo(() => {
    const h = parseFloat(height);
    if (!isFinite(h) || h <= 0) {
      return null;
    }
    const inches = heightUnit === "cm" ? h / (METERS_PER_INCH * 100) : h;
    const meters = inches * METERS_PER_INCH;
    if (!isFinite(inches) || inches <= 0) return null;

    const devine = devineKg(inches, sex);
    const robinson = robinsonKg(inches, sex);
    const miller = millerKg(inches, sex);

    const selected = formula === "devine" ? devine : formula === "robinson" ? robinson : miller;

    // Healthy range: ±10% of ideal (commonly used) and BMI 18.5–24.9
    const range10 = {
      lower: selected * 0.9,
      upper: selected * 1.1,
    };
    const bmiLower = BMI_HEALTHY_LOWER * meters * meters;
    const bmiUpper = BMI_HEALTHY_UPPER * meters * meters;

    return {
      inches,
      meters,
      devine,
      robinson,
      miller,
      selected,
      range10,
      bmiRange: { lower: bmiLower, upper: bmiUpper },
    };
  }, [height, heightUnit, sex, formula]);

  const fmt = (n: number, digits = 1) =>
    fmtNumber(n, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

  const formatWeight = (kg: number, unit: "kg" | "lb", digits = 1) => {
    if (unit === "kg") return `${fmt(kg, digits)} kg`;
    return `${fmt(kg * LB_PER_KG, digits)} lb`;
  };

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-center">
        <ToggleButtonGroup
          size="small"
          value={heightUnit}
          exclusive
          onChange={(_, v) => v && setHeightUnit(v)}
          aria-label="height unit"
        >
          <ToggleButton value="cm">cm</ToggleButton>
          <ToggleButton value="in">in</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup size="small" value={sex} exclusive onChange={(_, v) => v && setSex(v)} aria-label="sex">
          <ToggleButton value="male">Male</ToggleButton>
          <ToggleButton value="female">Female</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <TextField
        label={heightUnit === "cm" ? "Height (cm)" : "Height (in)"}
        type="number"
        fullWidth
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder={heightUnit === "cm" ? "e.g. 175" : "e.g. 69"}
        slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Formula</InputLabel>
          <Select label="Formula" value={formula} onChange={(e) => setFormula(e.target.value as Formula)}>
            <MenuItem value="devine">Devine — 50/45.5 + 2.3×(in−60)</MenuItem>
            <MenuItem value="robinson">Robinson — 52/49 + 1.9/1.7×(in−60)</MenuItem>
            <MenuItem value="miller">Miller — 56.2/53.1 + 1.41/1.36×(in−60)</MenuItem>
          </Select>
        </FormControl>

        <Box className="flex items-center">
          <ToggleButtonGroup
            size="small"
            value={resultUnit}
            exclusive
            onChange={(_, v) => v && setResultUnit(v)}
            aria-label="result unit"
          >
            <ToggleButton value="kg">kg</ToggleButton>
            <ToggleButton value="lb">lb</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      <Typography variant="caption" color="text.secondary">
        {FORMULA_LABELS[formula]}: {sex === "male" ? FORMULA_EXPR[formula].male : FORMULA_EXPR[formula].female} — result in kg
        (1 kg = 2.205 lb, 1 in = 2.54 cm)
      </Typography>

      <Box
        className="p-5 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Ideal weight — {FORMULA_LABELS[formula]} ({sex})
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {data ? formatWeight(data.selected, resultUnit, 1) : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data
            ? resultUnit === "kg"
              ? `${fmt(data.selected * LB_PER_KG, 1)} lb`
              : `${fmt(data.selected, 1)} kg`
            : "Enter height to calculate"}
        </Typography>
        {data && (
          <Typography variant="caption" color="text.secondary" className="block mt-2">
            Range (±10%): {formatWeight(data.range10.lower, resultUnit, 1)} –{" "}
            {formatWeight(data.range10.upper, resultUnit, 1)}
            <Box component="span" className="mx-1">
              •
            </Box>
            {resultUnit === "kg"
              ? `${fmt(data.range10.lower * LB_PER_KG, 1)} – ${fmt(data.range10.upper * LB_PER_KG, 1)} lb`
              : `${fmt(data.range10.lower, 1)} – ${fmt(data.range10.upper, 1)} kg`}
          </Typography>
        )}
      </Box>

      <Box
        className="p-4 rounded-[16px] border border-base-300"
      >
        <Typography variant="subtitle2" className="font-bold mb-2">
          All formulas (kg / lb)
        </Typography>
        <Stack spacing={1}>
          {(
            [
              ["Devine", data?.devine],
              ["Robinson", data?.robinson],
              ["Miller", data?.miller],
            ] as const
          ).map(([label, val]) => (
            <Box key={label} className="flex justify-between gap-4">
              <Typography variant="body2" color={label.toLowerCase() === formula ? "primary.main" : "text.secondary"} style={{ fontWeight: label.toLowerCase() === formula ? 700 : 400 }}>
                {label}
              </Typography>
              <Typography variant="body2" className="font-bold tabular-nums">
                {val !== undefined && val !== null && data ? `${fmt(val, 1)} kg / ${fmt(val * LB_PER_KG, 1)} lb` : "—"}
              </Typography>
            </Box>
          ))}
        </Stack>
        {data && (
          <Box className="mt-3 pt-3 border-t border-base-300">
            <Box className="flex justify-between">
              <Typography variant="body2" color="text.secondary">
                Healthy BMI range (18.5–24.9)
              </Typography>
              <Typography variant="body2" className="font-bold tabular-nums">
                {fmt(data.bmiRange.lower, 1)} – {fmt(data.bmiRange.upper, 1)} kg
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {fmt(data.bmiRange.lower * LB_PER_KG, 1)} – {fmt(data.bmiRange.upper * LB_PER_KG, 1)} lb • based on height {fmt(data.inches, 1)} in ({fmt(data.meters * 100, 1)} cm)
            </Typography>
          </Box>
        )}
      </Box>

      <Alert severity="warning">
        Disclaimer: This calculator uses the Devine, Robinson, and Miller formulas to estimate ideal body weight from
        height and sex. These are population-level approximations and do not account for age, frame size, muscle mass, or
        medical conditions. For informational purposes only — not medical advice. Consult a healthcare professional for
        personalized guidance.
      </Alert>
    </ToolPaper>
  );
}
