
import { useMemo, useState, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Grid } from "@/components/ds";

import { MS_PER_DAY } from "@/lib/format";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Box className="p-4 bg-base-100 border border-base-300 rounded-[16px] text-center">
      <Typography  variant="h4"  color="primary.main" className="font-extrabold">{value}</Typography>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState("1995-06-15");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const res = useMemo(() => {
    if (!dob || !now) return null;
    const birth = new Date(dob + "T00:00:00");
    if (isNaN(birth.getTime())) return null;
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
  }, [dob, now]);

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
            <Box className="p-4 bg-primary rounded-[16px]" style={{ color: "var(--color-primary-content)" }}>
              <Typography variant="caption">Next birthday</Typography>
              <Typography  variant="h5"  className="font-extrabold">
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
