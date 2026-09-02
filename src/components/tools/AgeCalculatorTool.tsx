"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { MS_PER_DAY } from "@/lib/format";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: 2, textAlign: "center" }}>
      <Typography  variant="h4"  color="primary.main" sx={{ fontWeight: 800 }}>{value}</Typography>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState("1995-06-15");

  const res = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(dob + "T00:00:00");
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / MS_PER_DAY);
    const weekday = WEEKDAYS[birth.getDay()];

    // next birthday
    const next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (next.getTime() < now.getTime()) next.setFullYear(now.getFullYear() + 1);
    const daysUntil = Math.ceil((next.getTime() - now.getTime()) / MS_PER_DAY);

    return { years, months, days, totalDays, weekday, daysUntil, next };
  }, [dob]);

  return (
    <ToolPaper spacing={3}>
        <TextField label="Date of birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} fullWidth slotProps={{ inputLabel: {  shrink: true  } }} />
        {res ? (
          <>
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}><Stat label="Years" value={res.years} /></Grid>
              <Grid size={{ xs: 4 }}><Stat label="Months" value={res.months} /></Grid>
              <Grid size={{ xs: 4 }}><Stat label="Days" value={res.days} /></Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}><Stat label="Total days lived" value={res.totalDays.toLocaleString()} /></Grid>
              <Grid size={{ xs: 6 }}><Stat label="Born on" value={res.weekday} /></Grid>
            </Grid>
            <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
              <Typography variant="caption">Next birthday</Typography>
              <Typography  variant="h5"  sx={{ fontWeight: 800 }}>
                {res.next.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} ({res.daysUntil} days away)
              </Typography>
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">Enter a valid date of birth.</Typography>
        )}
      </ToolPaper>
  );
}
