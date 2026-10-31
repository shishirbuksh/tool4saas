
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Stack, TextField, Typography, Alert } from "@/components/ds";

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

export default function PregnancyCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const result = useMemo(() => {
    if (!lmp) return null;
    const lmpDate = new Date(lmp + "T00:00:00");
    if (isNaN(lmpDate.getTime())) return null;

    const cycle = parseInt(cycleLength, 10);
    const validCycle = isFinite(cycle) && cycle >= 20 && cycle <= 45 ? cycle : 28;
    const cycleAdjustment = validCycle - 28;

    // Due date = LMP + 280 days (40 weeks) + cycle adjustment
    const dueDate = addDays(lmpDate, 280 + cycleAdjustment);
    // Conception approx = LMP + 14 days + cycle adjustment (ovulation = cycle - 14)
    const conceptionDate = addDays(lmpDate, 14 + cycleAdjustment);

    // Trimesters based on LMP (Naegele's rule, gestational age)
    const trimester1End = addDays(lmpDate, 13 * 7 + 6);
    const trimester2Start = addDays(lmpDate, 14 * 7);
    const trimester2End = addDays(lmpDate, 27 * 7 + 6);
    const trimester3Start = addDays(lmpDate, 28 * 7);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lmpMidnight = new Date(lmpDate.getFullYear(), lmpDate.getMonth(), lmpDate.getDate());
    const diffDays = Math.floor((today.getTime() - lmpMidnight.getTime()) / MS_PER_DAY);
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    const totalDays = diffDays;
    const isFuture = diffDays < 0;

    // Weeks pregnant is capped at 42 for display purposes, but show actual
    const gestationalWeeks = isFuture ? 0 : weeks;
    const gestationalDays = isFuture ? 0 : days;

    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / MS_PER_DAY);
    const weeksUntilDue = Math.floor(daysUntilDue / 7);

    return {
      lmpDate,
      dueDate,
      conceptionDate,
      trimester1End,
      trimester2Start,
      trimester2End,
      trimester3Start,
      weeks,
      days,
      totalDays,
      gestationalWeeks,
      gestationalDays,
      isFuture,
      daysUntilDue,
      weeksUntilDue,
      validCycle,
      cycleAdjustment,
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
          {result.isFuture ? (
            <Alert severity="warning">LMP date is in the future. Please select a past date.</Alert>
          ) : null}

          <Box
            className="p-5 rounded-[16px] border border-primary bg-primary text-center" style={{ color: "var(--color-primary-content)" }}
          >
            <Typography variant="overline" className="opacity-[0.9]" style={{ color: "var(--color-primary-content)" }}>
              Estimated due date — LMP + 280 days{result.cycleAdjustment !== 0 ? ` ${result.cycleAdjustment > 0 ? "+" : ""}${result.cycleAdjustment} days (cycle adjusted)` : ""}
            </Typography>
            <Typography variant="h4" className="font-extrabold">
              {formatDate(result.dueDate)}
            </Typography>
            <Typography variant="body2" className="opacity-[0.9] mt-1">
              {result.daysUntilDue >= 0
                ? `${result.daysUntilDue} days to go${result.weeksUntilDue > 0 ? ` (~${result.weeksUntilDue} weeks)` : ""}`
                : `${Math.abs(result.daysUntilDue)} days past due date`}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box
              className="flex-1 p-4 rounded-[16px] border border-base-300 bg-base-100 text-center"
            >
              <Typography variant="overline" color="text.secondary">
                Weeks pregnant
              </Typography>
              <Typography variant="h4" className="font-extrabold" color="primary.main">
                {result.isFuture ? "—" : `${result.gestationalWeeks}w ${result.gestationalDays}d`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {result.isFuture ? "LMP is in the future" : `${result.totalDays} days since LMP`}
              </Typography>
            </Box>
            <Box
              className="flex-1 p-4 rounded-[16px] border border-base-300 bg-base-100 text-center"
            >
              <Typography variant="overline" color="text.secondary">
                Estimated conception date
              </Typography>
              <Typography variant="h6" className="font-extrabold">
                {formatShort(result.conceptionDate)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                LMP + 14 days{result.cycleAdjustment !== 0 ? ` ${result.cycleAdjustment > 0 ? "+" : ""}${result.cycleAdjustment}d adjusted` : ""} (approx. ovulation)
              </Typography>
            </Box>
          </Stack>

          <Box
            className="p-4 rounded-[16px] border border-base-300 bg-base-100"
          >
            <Typography variant="subtitle2" className="font-bold mb-3">
              Trimesters
            </Typography>
            <Stack spacing={1.2}>
              <Box className="flex justify-between gap-4 flex-wrap">
                <Typography variant="body2" color="text.secondary">
                  First trimester
                </Typography>
                <Typography variant="body2" className="font-semibold">
                  {formatShort(result.lmpDate)} – {formatShort(result.trimester1End)}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Week 1 to 13w6d
              </Typography>
              <Box className="flex justify-between gap-4 flex-wrap">
                <Typography variant="body2" color="text.secondary">
                  Second trimester
                </Typography>
                <Typography variant="body2" className="font-semibold">
                  {formatShort(result.trimester2Start)} – {formatShort(result.trimester2End)}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Week 14w0d to 27w6d
              </Typography>
              <Box className="flex justify-between gap-4 flex-wrap">
                <Typography variant="body2" color="text.secondary">
                  Third trimester
                </Typography>
                <Typography variant="body2" className="font-semibold">
                  {formatShort(result.trimester3Start)} – {formatShort(result.dueDate)}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Week 28w0d to 40w0d (due date)
              </Typography>
            </Stack>
          </Box>

          <Box
            className="p-4 rounded-[16px] border border-base-300 bg-base-100"
          >
            <Typography variant="subtitle2" className="font-bold mb-2">
              How it is calculated
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due date = LMP + 280 days (40 weeks, Naegele&apos;s rule)
              {result.cycleAdjustment !== 0
                ? ` adjusted by ${result.cycleAdjustment > 0 ? "+" : ""}${result.cycleAdjustment} days for a ${result.validCycle}-day cycle.`
                : ` on a ${result.validCycle}-day cycle.`}{" "}
              Conception is estimated as LMP + 14 days (ovulation) with the same cycle adjustment. Trimesters are split at 13w6d / 27w6d.
            </Typography>
          </Box>
        </>
      ) : (
        <Typography color="text.secondary">Enter your last menstrual period date to calculate the due date.</Typography>
      )}

      <Alert severity="warning">
        This calculator provides an estimate only and is not medical advice. Pregnancy dating should be confirmed by a
        healthcare professional with clinical examination and ultrasound. Cycle length adjustment is approximate.
      </Alert>
    </ToolPaper>
  );
}
