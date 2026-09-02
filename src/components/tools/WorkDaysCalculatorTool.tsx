"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import { MS_PER_DAY } from "@/lib/format";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function WorkDaysCalculatorTool() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [workDays, setWorkDays] = useState(0);

  const calculate = () => {
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return;

    if (s > e) {
      setWorkDays(0);
      return;
    }

    const totalDays = Math.round((e.getTime() - s.getTime()) / MS_PER_DAY) + 1;
    const fullWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    let days = fullWeeks * 5;
    // <input type="date"> strings are parsed as UTC midnight
    let currentDay = s.getUTCDay();

    for (let i = 0; i < remainingDays; i++) {
      if (currentDay !== 0 && currentDay !== 6) {
        days++;
      }
      currentDay = (currentDay + 1) % 7;
    }

    setWorkDays(days);
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Start date"
            type="date"
            fullWidth
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <TextField
            label="End date"
            type="date"
            fullWidth
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </Stack>
        <Button variant="contained" onClick={calculate}>
          Calculate business days
        </Button>
        {workDays >= 0 && (
          <Box sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "primary.main", textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>{workDays}</Typography>
            <Typography variant="body2" color="text.secondary">business days</Typography>
          </Box>
        )}
      </ToolPaper>
  );
}