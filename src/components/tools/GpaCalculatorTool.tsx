"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Course = {
  id: number;
  grade: number;
  credits: string;
};

const GRADE_OPTIONS: { label: string; value: number }[] = [
  { label: "A (4.0)", value: 4 },
  { label: "A- (3.7)", value: 3.7 },
  { label: "B+ (3.3)", value: 3.3 },
  { label: "B (3.0)", value: 3 },
  { label: "B- (2.7)", value: 2.7 },
  { label: "C+ (2.3)", value: 2.3 },
  { label: "C (2.0)", value: 2 },
  { label: "C- (1.7)", value: 1.7 },
  { label: "D+ (1.3)", value: 1.3 },
  { label: "D (1.0)", value: 1 },
  { label: "D- (0.7)", value: 0.7 },
  { label: "F (0.0)", value: 0 },
];

let nextId = 1;
const createCourse = (): Course => ({
  id: nextId++,
  grade: 4,
  credits: "3",
});

export default function GpaCalculatorTool() {
  const [courses, setCourses] = useState<Course[]>(() => [createCourse(), createCourse(), createCourse()]);

  const addCourse = () => setCourses((prev) => [...prev, createCourse()]);
  const removeCourse = (id: number) =>
    setCourses((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  const updateCourse = (id: number, patch: Partial<Course>) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const clearAll = () => setCourses([createCourse()]);

  const { gpa, percentage, totalCredits, totalPoints } = useMemo(() => {
    let points = 0;
    let credits = 0;
    for (const c of courses) {
      const cr = parseFloat(c.credits);
      if (!isFinite(cr) || cr <= 0) continue;
      points += c.grade * cr;
      credits += cr;
    }
    if (credits === 0) return { gpa: null as number | null, percentage: null as number | null, totalCredits: 0, totalPoints: 0 };
    const g = points / credits;
    return { gpa: g, percentage: (g / 4) * 100, totalCredits: credits, totalPoints: points };
  }, [courses]);

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        GPA Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Add your courses, select the grade and enter credit hours. GPA = Σ(grade × credits) / Σcredits.
      </Typography>

      <Stack spacing={1.5}>
        {courses.map((course, index) => (
          <Stack
            key={course.id}
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ alignItems: { xs: "stretch", sm: "center" } }}
          >
            <Typography
              variant="body2"
              sx={{ minWidth: 72, fontWeight: 600, color: "text.secondary", pt: { xs: 0, sm: 0 } }}
            >
              Course {index + 1}
            </Typography>

            <FormControl fullWidth size="small">
              <InputLabel id={`grade-label-${course.id}`}>Grade</InputLabel>
              <Select
                labelId={`grade-label-${course.id}`}
                label="Grade"
                value={course.grade}
                onChange={(e) => updateCourse(course.id, { grade: e.target.value as number })}
              >
                {GRADE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.label} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Credits"
              type="number"
              size="small"
              fullWidth
              value={course.credits}
              onChange={(e) => updateCourse(course.id, { credits: e.target.value })}
              slotProps={{
                input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" },
                htmlInput: { min: 0, step: 0.5 },
              }}
            />

            <Button
              variant="outlined"
              color="error"
              onClick={() => removeCourse(course.id)}
              disabled={courses.length === 1}
              sx={{ minWidth: 88, flexShrink: 0 }}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Stack direction="row" spacing={1.5}>
        <Button variant="contained" onClick={addCourse}>
          Add Course
        </Button>
        <Button variant="outlined" onClick={clearAll}>
          Reset
        </Button>
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
          Your GPA (4.0 Scale)
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
          {gpa !== null ? fmt(gpa) : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {percentage !== null ? `${fmt(percentage)}%` : "—"} {gpa !== null && "• 4.0 scale"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total credits</Typography>
          <Typography sx={{ fontWeight: 700 }}>{totalCredits ? fmt(totalCredits) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total grade points</Typography>
          <Typography sx={{ fontWeight: 700 }}>{totalCredits ? fmt(totalPoints) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Formula</Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}>
            Σ(grade × credits) / Σcredits
          </Typography>
        </Box>
      </Box>
    </ToolPaper>
  );
}
