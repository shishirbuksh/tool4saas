"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND } from "@/lib/format";

const pad = (n: number) => String(n).padStart(2, "0");

function parseTimeToMinutes(value: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (!Number.isInteger(h) || !Number.isInteger(min)) return null;
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

export default function TimeDurationCalculatorTool() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const result = (() => {
    if (!start || !end) return null;
    const startMins = parseTimeToMinutes(start);
    const endMins = parseTimeToMinutes(end);
    if (startMins === null || endMins === null) return null;

    // If both optional dates are provided, compute exact difference.
    if (startDate && endDate) {
      const s = new Date(`${startDate}T${start}:00`);
      const e = new Date(`${endDate}T${end}:00`);
      if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
      const diffMs = e.getTime() - s.getTime();
      if (diffMs < 0) return { diffMs, overnight: false, invalid: true as const };
      return { diffMs, overnight: e.toDateString() !== s.toDateString(), invalid: false as const };
    }

    let diffMins = endMins - startMins;
    let overnight = false;
    if (diffMins < 0) {
      diffMins += 24 * 60;
      overnight = true;
    }
    return { diffMs: diffMins * MS_PER_MINUTE, overnight, invalid: false as const };
  })();

  const formatted = (() => {
    if (!result || result.invalid) return null;
    const totalMs = result.diffMs;
    const hours = Math.floor(totalMs / MS_PER_HOUR);
    const minutes = Math.floor((totalMs % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((totalMs % MS_PER_MINUTE) / MS_PER_SECOND);
    const totalHours = totalMs / MS_PER_HOUR;
    const totalMinutes = totalMs / MS_PER_MINUTE;
    return {
      hms: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
      totalHours,
      totalMinutes,
    };
  })();

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Start time"
          type="time"
          fullWidth
          value={start}
          onChange={(e) => setStart(e.target.value)}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="End time"
          type="time"
          fullWidth
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Start date (optional)"
          type="date"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="End date (optional)"
          type="date"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Duration
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {!start || !end
            ? "Enter a start and end time"
            : !result || !formatted
              ? result?.invalid
                ? "End is before start"
                : "Enter valid times as HH:MM"
              : formatted.hms}
        </Typography>
        {result && !result.invalid && formatted ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {formatted.totalHours.toFixed(2)} hours · {Math.round(formatted.totalMinutes)} minutes
            {result.overnight ? " · includes overnight" : ""}
          </Typography>
        ) : null}
      </Box>
    </ToolPaper>
  );
}
