"use client";

import { useState, useEffect, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Mode = "work" | "break";

function formatMmSs(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(m)}:${pad(s)}`;
}

function notify(title: string, body: string) {
  try {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, { body });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") new Notification(title, { body });
        });
      }
    }
  } catch {
    // ignore
  }
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([300, 100, 300]);
    }
  } catch {
    // ignore
  }
}

export default function PomodoroTimerTool() {
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [cycles, setCycles] = useState<number>(4);

  const [mode, setMode] = useState<Mode>("work");
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const [remaining, setRemaining] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const remainingRef = useRef<number>(remaining);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // keep ref in sync
  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  // reset remaining when work/break minutes change and not running
  useEffect(() => {
    if (!isRunning && !isFinished) {
      const next = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
      setRemaining(next);
      remainingRef.current = next;
    }
  }, [workMinutes, breakMinutes, mode, isRunning, isFinished]);

  // request notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // main timer setInterval 1s
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const next = remainingRef.current - 1;
      remainingRef.current = next;
      setRemaining(next);

      if (next <= 0) {
        // handle finish for current mode
        if (mode === "work") {
          notify("Pomodoro — Work finished!", `Cycle ${currentCycle} work session complete. Time for a break!`);
          // vibrate is handled inside notify
          if (navigator && "vibrate" in navigator) {
            try {
              navigator.vibrate([400, 100, 400]);
            } catch {}
          }

          if (currentCycle >= cycles) {
            // all cycles done - finished
            setIsFinished(true);
            setIsRunning(false);
            setRemaining(0);
            remainingRef.current = 0;
            notify("Pomodoro — All cycles complete!", `Great job! Completed ${cycles} cycle(s).`);
          } else {
            // switch to break
            const breakSec = breakMinutes * 60;
            setMode("break");
            setRemaining(breakSec);
            remainingRef.current = breakSec;
          }
        } else {
          // break finished
          notify("Pomodoro — Break finished!", `Break over. Starting cycle ${currentCycle + 1} work session.`);
          if (navigator && "vibrate" in navigator) {
            try {
              navigator.vibrate([200, 100, 200, 100, 400]);
            } catch {}
          }
          const nextCycle = currentCycle + 1;
          setCurrentCycle(nextCycle);
          setMode("work");
          const workSec = workMinutes * 60;
          setRemaining(workSec);
          remainingRef.current = workSec;
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, mode, currentCycle, cycles, workMinutes, breakMinutes]);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;
  const display = formatMmSs(Math.max(0, remaining));

  const handleStart = () => {
    if (isFinished) return;
    // if remaining is 0 or not initialized, re-init
    if (remaining <= 0) {
      const init = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
      setRemaining(init);
      remainingRef.current = init;
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setMode("work");
    setCurrentCycle(1);
    const init = workMinutes * 60;
    setRemaining(init);
    remainingRef.current = init;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (isNaN(v)) {
      setWorkMinutes(0);
      return;
    }
    const clamped = Math.max(1, Math.min(60, v));
    setWorkMinutes(clamped);
  };

  const handleBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (isNaN(v)) {
      setBreakMinutes(0);
      return;
    }
    const clamped = Math.max(1, Math.min(30, v));
    setBreakMinutes(clamped);
  };

  return (
    <ToolPaper spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Pomodoro Timer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Focus with timed work and break intervals. Displays mm:ss, progress and cycle count. Notifies and vibrates on finish.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "flex-end" }}>
        <TextField
          label="Work minutes"
          type="number"
          value={workMinutes}
          onChange={handleWorkChange}
          slotProps={{ htmlInput: { min: 1, max: 60 } }}
          fullWidth
          disabled={isRunning}
          helperText="1–60 min"
        />
        <TextField
          label="Break minutes"
          type="number"
          value={breakMinutes}
          onChange={handleBreakChange}
          slotProps={{ htmlInput: { min: 1, max: 30 } }}
          fullWidth
          disabled={isRunning}
          helperText="1–30 min"
        />
        <FormControl fullWidth disabled={isRunning}>
          <InputLabel id="pomodoro-cycles-label">Cycles</InputLabel>
          <Select
            labelId="pomodoro-cycles-label"
            label="Cycles"
            value={String(cycles)}
            onChange={(e) => setCycles(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <MenuItem key={n} value={String(n)}>
                {n} {n === 1 ? "cycle" : "cycles"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: isFinished ? "success.main" : mode === "work" ? "primary.main" : "secondary.main",
          bgcolor: isFinished ? "success.light" : "background.paper",
          textAlign: "center",
        }}
      >
        <Typography
          variant="overline"
          color={isFinished ? "success.main" : mode === "work" ? "primary.main" : "secondary.main"}
          sx={{ fontWeight: 700, letterSpacing: 1.2 }}
        >
          {isFinished ? "All done" : mode === "work" ? "Work" : "Break"} {isFinished ? "" : `· Cycle ${currentCycle} / ${cycles}`}
        </Typography>

        {/* Timer display: h2 (page h1 is the tool title in ToolPageShell) */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: "monospace",
            fontWeight: 800,
            letterSpacing: 2,
            fontSize: { xs: "3rem", sm: "4.5rem" },
            lineHeight: 1,
            mt: 1,
          }}
          aria-live="polite"
        >
          {display}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
          mm:ss
        </Typography>

        <Box sx={{ mt: 2, height: 10, borderRadius: 5, bgcolor: "divider", overflow: "hidden" }}>
          <Box
            sx={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              height: "100%",
              bgcolor: isFinished ? "success.main" : mode === "work" ? "primary.main" : "secondary.main",
              transition: "width 0.5s linear",
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          Progress: {progress.toFixed(0)}% · {mode === "work" ? `${workMinutes} min work` : `${breakMinutes} min break`}
        </Typography>

        {isFinished && (
          <Typography variant="h6" color="success.main" sx={{ mt: 2, fontWeight: 800 }}>
            Pomodoro finished! 🎉 {cycles} cycle{cycles > 1 ? "s" : ""} completed.
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {!isRunning ? (
          <Button variant="contained" onClick={handleStart} disabled={isFinished} sx={{ minWidth: 100 }}>
            Start
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={handlePause} sx={{ minWidth: 100 }}>
            Pause
          </Button>
        )}
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", flexWrap: "wrap" }}>
        <Typography variant="body2" color="text.secondary">
          Cycle count: <strong>{isFinished ? cycles : currentCycle}</strong> / {cycles}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: <strong>{isFinished ? "Finished" : isRunning ? "Running" : "Paused"}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mode: <strong>{mode}</strong>
        </Typography>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
        Uses setInterval every 1s and useRef for remaining seconds. On finish it triggers Notification and vibrate.
      </Typography>
    </ToolPaper>
  );
}
