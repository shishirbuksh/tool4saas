
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Chip } from "@/components/ds";


type Mode = "wake" | "bed";

const CYCLE_MINUTES = 90;
const CYCLES = [6, 5, 4, 3, 2, 1];
const MINUTES_PER_DAY = 24 * 60;

function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

function normalizeMinutes(minutes: number): number {
  return ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}

function formatTime(totalMinutes: number): string {
  const n = normalizeMinutes(Math.round(totalMinutes));
  const h24 = Math.floor(n / 60);
  const m = n % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${h12}:${pad(m)} ${suffix}`;
}

function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function SleepCycleCalculatorTool() {
  const [mode, setMode] = useState<Mode>("wake");
  const [timeInput, setTimeInput] = useState("07:00");
  const [fallAsleepMinutes, setFallAsleepMinutes] = useState("15");

  const baseMinutes = useMemo(() => parseTimeToMinutes(timeInput), [timeInput]);
  const bufferMinutes = useMemo(() => {
    const n = Number.parseInt(fallAsleepMinutes, 10);
    if (Number.isNaN(n) || n < 0) return 0;
    return Math.min(n, 120);
  }, [fallAsleepMinutes]);

  const isInvalidTime = timeInput !== "" && baseMinutes === null;
  const isInvalidBuffer = fallAsleepMinutes !== "" && Number.isNaN(Number.parseInt(fallAsleepMinutes, 10));

  const results = useMemo(() => {
    if (baseMinutes === null) return [];
    return CYCLES.map((cycles) => {
      const sleepMinutes = cycles * CYCLE_MINUTES;
      const timeMinutes =
        mode === "wake"
          ? normalizeMinutes(baseMinutes - sleepMinutes - bufferMinutes)
          : normalizeMinutes(baseMinutes + bufferMinutes + sleepMinutes);
      return {
        cycles,
        sleepMinutes,
        timeMinutes,
        label: formatTime(timeMinutes),
        recommended: cycles === 5 || cycles === 6,
      };
    });
  }, [baseMinutes, bufferMinutes, mode]);

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setTimeInput(next === "wake" ? "07:00" : "22:30");
  };

  return (
    <ToolPaper spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-end">
        <Box className="flex gap-2">
          <Button
            variant={mode === "wake" ? "contained" : "outlined"}
            onClick={() => handleModeChange("wake")}
            aria-pressed={mode === "wake"}
          >
            Wake up at
          </Button>
          <Button
            variant={mode === "bed" ? "contained" : "outlined"}
            onClick={() => handleModeChange("bed")}
            aria-pressed={mode === "bed"}
          >
            Sleep at
          </Button>
        </Box>
        <TextField
          label={mode === "wake" ? "I want to wake up at" : "I want to go to bed at"}
          type="time"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          helperText={isInvalidTime ? "Enter a valid time (HH:MM)" : mode === "wake" ? "We count 90-min cycles backwards" : "We count 90-min cycles forwards"}
          error={isInvalidTime}
          className="max-w-[220px]"
        />
        <TextField
          label="Fall-asleep time (min)"
          type="number"
          value={fallAsleepMinutes}
          onChange={(e) => setFallAsleepMinutes(e.target.value)}
          slotProps={{ input: { inputProps: { min: 0, max: 120, step: 5 } }, inputLabel: { shrink: true } }}
          helperText={isInvalidBuffer ? "Enter 0–120" : "Avg. time to fall asleep"}
          error={isInvalidBuffer}
          className="max-w-[220px]"
        />
      </Stack>

      <Box
        className="p-6 rounded-[16px] border border-base-300 bg-base-100"
      >
        {baseMinutes === null ? (
          <Typography variant="body1" color="text.secondary" className="text-center">
            Enter a valid time to see your sleep cycles.
          </Typography>
        ) : (
          <>
            <Typography variant="overline" color="text.secondary">
              {mode === "wake" ? `Go to bed at one of these times to wake at ${formatTime(baseMinutes)}` : `Wake up at one of these times if you sleep at ${formatTime(baseMinutes)}`}
            </Typography>
            <Stack spacing={1} className="mt-4" aria-live="polite">
              {results.map((r) => (
                <Box
                  key={r.cycles}
                  className="flex items-center justify-between gap-4 p-3 rounded-[16px] border" style={{ borderColor: r.recommended ? "primary.main" : "divider", backgroundColor: r.recommended ? "primary.light" : "background.paper" }}
                >
                  <Box>
                    <Typography variant="h6" className="font-extrabold leading-[1.2]" style={{ fontFamily: "monospace" }}>
                      {r.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {r.cycles} cycles &middot; {formatDuration(r.sleepMinutes)} sleep
                    </Typography>
                  </Box>
                  {r.recommended ? (
                    <Chip label="Recommended (5–6 cycles)" color="primary" size="small" />
                  ) : (
                    <Chip label={`${r.cycles} cycles`} variant="outlined" size="small" />
                  )}
                </Box>
              ))}
            </Stack>
            <Typography variant="caption" color="text.secondary" className="mt-4 block">
              Each cycle is {CYCLE_MINUTES} minutes. Includes {bufferMinutes} min to fall asleep. Adults usually feel best with 5–6
              full cycles (7.5–9h).
            </Typography>
          </>
        )}
      </Box>

      <Box className="p-4 rounded-[16px] border border-base-300 bg-base-100">
        <Typography variant="subtitle2" className="font-bold mb-2">
          How it works
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sleep runs in ~90-minute cycles. Waking at the end of a cycle feels more refreshing than waking mid-cycle. In
          &ldquo;Wake up at&rdquo; mode we subtract cycles backwards from your alarm; in &ldquo;Sleep at&rdquo; mode we add cycles
          forwards from your bedtime.
        </Typography>
      </Box>
    </ToolPaper>
  );
}
