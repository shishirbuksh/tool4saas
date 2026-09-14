"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type Assessment = {
  id: number;
  name: string;
  grade: string;
  weight: string;
};

let nextId = 1;
const createAssessment = (name: string): Assessment => ({
  id: nextId++,
  name,
  grade: "85",
  weight: "20",
});

function getLetter(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export default function GradeCalculatorTool() {
  const [assessments, setAssessments] = useState<Assessment[]>(() => [
    createAssessment("Homework"),
    createAssessment("Midterm"),
    createAssessment("Project"),
  ]);
  const [currentGrade, setCurrentGrade] = useState("85");
  const [finalWeight, setFinalWeight] = useState("20");
  const [targetGrade, setTargetGrade] = useState("90");

  const addAssessment = () =>
    setAssessments((prev) => [...prev, createAssessment(`Item ${prev.length + 1}`)]);
  const removeAssessment = (id: number) =>
    setAssessments((prev) => (prev.length > 1 ? prev.filter((a) => a.id !== id) : prev));
  const updateAssessment = (id: number, patch: Partial<Assessment>) =>
    setAssessments((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const resetAssessments = () => setAssessments([createAssessment("Item 1")]);

  const { average, totalWeight } = useMemo(() => {
    let points = 0;
    let weight = 0;
    for (const a of assessments) {
      const g = parseFloat(a.grade);
      const w = parseFloat(a.weight);
      if (!isFinite(g) || !isFinite(w) || w <= 0) continue;
      points += g * w;
      weight += w;
    }
    if (weight === 0) return { average: null as number | null, totalWeight: 0 };
    return { average: points / weight, totalWeight: weight };
  }, [assessments]);

  const required = useMemo(() => {
    const current = parseFloat(currentGrade);
    const target = parseFloat(targetGrade);
    const w = parseFloat(finalWeight) / 100;
    if (!isFinite(current) || !isFinite(target) || !isFinite(w) || w <= 0 || w > 1) {
      return null as number | null;
    }
    return (target - current * (1 - w)) / w;
  }, [currentGrade, finalWeight, targetGrade]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const requiredLetter = required !== null && isFinite(required) ? getLetter(required) : null;

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Grade Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enter your assessments to get the weighted average, then see what you need on the final to
        reach your target. Required = (target − current × (1 − w)) / w.
      </Typography>

      <Stack spacing={1.5}>
        {assessments.map((item, index) => (
          <Stack
            key={item.id}
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ alignItems: { xs: "stretch", sm: "center" } }}
          >
            <Typography
              variant="body2"
              sx={{ minWidth: 72, fontWeight: 600, color: "text.secondary" }}
            >
              #{index + 1}
            </Typography>

            <TextField
              label="Name"
              size="small"
              fullWidth
              value={item.name}
              onChange={(e) => updateAssessment(item.id, { name: e.target.value })}
              slotProps={{
                input: { spellCheck: false, autoComplete: "off" },
              }}
            />

            <TextField
              label="Grade %"
              type="number"
              size="small"
              fullWidth
              value={item.grade}
              onChange={(e) => updateAssessment(item.id, { grade: e.target.value })}
              slotProps={{
                input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
                htmlInput: { min: 0, max: 100, step: 0.5 },
              }}
            />

            <TextField
              label="Weight %"
              type="number"
              size="small"
              fullWidth
              value={item.weight}
              onChange={(e) => updateAssessment(item.id, { weight: e.target.value })}
              slotProps={{
                input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
                htmlInput: { min: 0, max: 100, step: 1 },
              }}
            />

            <Button
              variant="outlined"
              color="error"
              onClick={() => removeAssessment(item.id)}
              disabled={assessments.length === 1}
              sx={{ minWidth: 88, flexShrink: 0 }}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Stack direction="row" spacing={1.5}>
        <Button variant="contained" onClick={addAssessment}>
          Add Assessment
        </Button>
        <Button variant="outlined" onClick={resetAssessments}>
          Reset
        </Button>
      </Stack>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography color="text.secondary">
          Weighted average {totalWeight ? `(${fmt(totalWeight)}% weight entered)` : ""}
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
            {average !== null ? `${fmt(average)}% (${getLetter(average)})` : "—"}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            disabled={average === null}
            onClick={() => {
              if (average !== null) setCurrentGrade(average.toFixed(2));
            }}
          >
            Use as current
          </Button>
        </Stack>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          label="Current grade %"
          type="number"
          size="small"
          fullWidth
          value={currentGrade}
          onChange={(e) => setCurrentGrade(e.target.value)}
          slotProps={{
            input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 0, max: 100, step: 0.5 },
          }}
        />
        <TextField
          label="Final weight %"
          type="number"
          size="small"
          fullWidth
          value={finalWeight}
          onChange={(e) => setFinalWeight(e.target.value)}
          slotProps={{
            input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 1, max: 100, step: 1 },
          }}
        />
        <TextField
          label="Target grade %"
          type="number"
          size="small"
          fullWidth
          value={targetGrade}
          onChange={(e) => setTargetGrade(e.target.value)}
          slotProps={{
            input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 0, max: 100, step: 0.5 },
          }}
        />
      </Stack>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Required on final
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {required !== null && isFinite(required)
            ? `${fmt(required)}%${requiredLetter ? ` (${requiredLetter})` : ""}`
            : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {required === null
            ? "Enter a valid current grade, final weight (1–100%), and target grade."
            : required > 100
              ? "Above 100% — target is out of reach with this weighting."
              : required < 0
                ? "Below 0% — you have already secured your target."
                : `You need ${fmt(required)}% (${requiredLetter}) on the remaining ${finalWeight}% to finish at ${targetGrade}%.`}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Weighted average</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {average !== null ? `${fmt(average)}% (${getLetter(average)})` : "—"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Formula</Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
            (target − current × (1 − w)) / w
          </Typography>
        </Box>
      </Box>
    </ToolPaper>
  );
}
