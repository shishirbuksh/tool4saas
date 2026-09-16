"use client";

import { useMemo, useState } from "react";
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

type Sex = "male" | "female";

function getCategory(sex: Sex, bf: number): { label: string; color: string } {
  if (sex === "male") {
    if (bf < 6) return { label: "Essential fat", color: "info.main" };
    if (bf <= 13) return { label: "Athletes", color: "success.main" };
    if (bf <= 17) return { label: "Fitness", color: "success.main" };
    if (bf <= 24) return { label: "Average", color: "warning.main" };
    return { label: "Obese", color: "error.main" };
  }
  if (bf < 14) return { label: "Essential fat", color: "info.main" };
  if (bf <= 20) return { label: "Athletes", color: "success.main" };
  if (bf <= 24) return { label: "Fitness", color: "success.main" };
  if (bf <= 31) return { label: "Average", color: "warning.main" };
  return { label: "Obese", color: "error.main" };
}

export default function BodyFatCalculatorTool() {
  const [sex, setSex] = useState<Sex>("male");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [height, setHeight] = useState("");
  const [hip, setHip] = useState("");

  const bodyFat = useMemo(() => {
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const h = parseFloat(height);
    const hp = parseFloat(hip);
    if (!isFinite(w) || !isFinite(n) || !isFinite(h) || w <= 0 || n <= 0 || h <= 0) {
      return null as number | null;
    }
    // US Navy formula expects inches; convert cm inputs to inches.
    const toIn = (cm: number) => cm / 2.54;
    const wIn = toIn(w);
    const nIn = toIn(n);
    const hIn = toIn(h);
    if (sex === "male") {
      const diff = wIn - nIn;
      if (diff <= 0) return null;
      const bf =
        86.01 * Math.log10(diff) - 70.041 * Math.log10(hIn) + 36.76;
      return isFinite(bf) ? bf : null;
    }
    if (!isFinite(hp) || hp <= 0) return null;
    const hpIn = toIn(hp);
    const sum = wIn + hpIn - nIn;
    if (sum <= 0) return null;
    const bf =
      163.205 * Math.log10(sum) - 97.684 * Math.log10(hIn) - 78.387;
    return isFinite(bf) ? bf : null;
  }, [sex, waist, neck, height, hip]);

  const category = bodyFat !== null ? getCategory(sex, bodyFat) : null;

  return (
    <ToolPaper>
      <YMYLDisclaimer type="health" />
      <Box sx={{ display: "flex", alignItems: "center" }}>
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

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Waist (cm)"
          type="number"
          fullWidth
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Neck (cm)"
          type="number"
          fullWidth
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Height (cm)"
          type="number"
          fullWidth
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
        />
        {sex === "female" && (
          <TextField
            label="Hip (cm)"
            type="number"
            fullWidth
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }}
          />
        )}
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
          Body Fat Percentage (US Navy)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: category ? category.color : "primary.main" }}>
          {bodyFat !== null ? `${fmt1(bodyFat)}%` : "—"}
        </Typography>
        {category !== null && (
          <Typography variant="subtitle1" sx={{ color: category.color, fontWeight: 700 }}>
            {category.label}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          {sex === "male"
            ? "Men: 86.01×log10(waist−neck) − 70.041×log10(height) + 36.76"
            : "Women: 163.205×log10(waist+hip−neck) − 97.684×log10(height) − 78.387"}
        </Typography>
      </Box>

      <Alert severity="warning">For informational purposes only — not medical advice.</Alert>
    </ToolPaper>
  );
}
