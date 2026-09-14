"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { MS_PER_DAY } from "@/lib/format";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

function formatShort(d: Date) {
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OvulationCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const result = useMemo(() => {
    if (!lmp) return null;
    const lmpDate = new Date(lmp + "T00:00:00");
    if (isNaN(lmpDate.getTime())) return null;

    const cycle = parseInt(cycleLength, 10);
    const validCycle = isFinite(cycle) && cycle >= 20 && cycle <= 45 ? cycle : 28;

    // Ovulation day = LMP + (cycle - 14)
    const ovulationDay = addDays(lmpDate, validCycle - 14);
    // Fertile window = ovulation - 5 days to ovulation + 1 day
    const fertileStart = addDays(ovulationDay, -5);
    const fertileEnd = addDays(ovulationDay, 1);
    // Next period = LMP + cycle length
    const nextPeriod = addDays(lmpDate, validCycle);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysUntilOvulation = Math.ceil((ovulationDay.getTime() - today.getTime()) / MS_PER_DAY);
    const daysUntilFertile = Math.ceil((fertileStart.getTime() - today.getTime()) / MS_PER_DAY);
    const daysUntilPeriod = Math.ceil((nextPeriod.getTime() - today.getTime()) / MS_PER_DAY);

    return {
      lmpDate,
      ovulationDay,
      fertileStart,
      fertileEnd,
      nextPeriod,
      validCycle,
      daysUntilOvulation,
      daysUntilFertile,
      daysUntilPeriod,
    };
  }, [lmp, cycleLength]);

  return (
    <ToolPaper spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Last menstrual period (LMP)"
          type="date"
          fullWidth
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Cycle length (days)"
          type="number"
          fullWidth
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          helperText="Average cycle, typically 28 days (20–45)"
        />
      </Stack>

      {result ? (
        <>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "primary.main",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              textAlign: "center",
            }}
          >
            <Typography variant="overline" sx={{ color: "primary.contrastText", opacity: 0.9 }}>
              Estimated ovulation day — LMP + {result.validCycle - 14} days (cycle − 14)
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {formatDate(result.ovulationDay)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              {result.daysUntilOvulation > 0
                ? `${result.daysUntilOvulation} days to go`
                : result.daysUntilOvulation === 0
                  ? "Estimated to be today"
                  : `${Math.abs(result.daysUntilOvulation)} days ago`}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                textAlign: "center",
              }}
            >
              <Typography variant="overline" color="text.secondary">
                Fertile window
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {formatShort(result.fertileStart)} – {formatShort(result.fertileEnd)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ovulation − 5 days to ovulation + 1 day
                {result.daysUntilFertile > 0 ? ` (starts in ${result.daysUntilFertile} days)` : ""}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                textAlign: "center",
              }}
            >
              <Typography variant="overline" color="text.secondary">
                Next period
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {formatShort(result.nextPeriod)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                LMP + {result.validCycle} days
                {result.daysUntilPeriod >= 0
                  ? ` (${result.daysUntilPeriod} days to go)`
                  : ` (${Math.abs(result.daysUntilPeriod)} days ago)`}
              </Typography>
            </Box>
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
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              How it is calculated
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ovulation day = LMP + (cycle length − 14 days) on a {result.validCycle}-day cycle. Fertile window =
              ovulation − 5 days to ovulation + 1 day. Next period = LMP + {result.validCycle} days.
            </Typography>
          </Box>
        </>
      ) : (
        <Typography color="text.secondary">Enter your last menstrual period date to calculate ovulation.</Typography>
      )}

      <Alert severity="warning">
        This calculator provides an estimate only and is not medical advice. Ovulation timing varies by individual and
        cycle. Consult a healthcare professional for family planning or fertility concerns.
      </Alert>
    </ToolPaper>
  );
}
