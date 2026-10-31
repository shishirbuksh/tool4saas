
import { useState, useEffect, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";import { Typography, Box, Stack, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";


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
        <Typography variant="h6" className="font-extrabold">
          Pomodoro Timer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Focus with timed work and break intervals. Displays mm:ss, progress and cycle count. Notifies and vibrates on finish.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-end">
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
        className="p-6 rounded-[16px] border text-center" style={{ borderColor: isFinished ? "success.main" : mode === "work" ? "primary.main" : "secondary.main", backgroundColor: isFinished ? "success.light" : "background.paper" }}
      >
        <Typography
          variant="overline"
          color={isFinished ? "success.main" : mode === "work" ? "primary.main" : "secondary.main"}
          className="font-bold tracking-[1.2px]"
        >
          {isFinished ? "All done" : mode === "work" ? "Work" : "Break"} {isFinished ? "" : `· Cycle ${currentCycle} / ${cycles}`}
        </Typography>

        {/* Timer display: h2 (page h1 is the tool title in ToolPageShell) */}
        <Typography
          variant="h2"
          className="font-extrabold tracking-[2px] text-[3rem] sm:text-[4.5rem] leading-[1] mt-2" style={{ fontFamily: "monospace" }}
          aria-live="polite"
        >
          {display}
        </Typography>
        <Typography variant="caption" color="text.secondary" className="block mt-1">
          mm:ss
        </Typography>

        <Box className="mt-4 h-[10px] rounded-[40px] bg-base-300 overflow-hidden">
          <Box
            className="h-full" style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: isFinished ? "success.main" : mode === "work" ? "primary.main" : "secondary.main", transition: "width 0.5s linear" }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" className="mt-2 block">
          Progress: {progress.toFixed(0)}% · {mode === "work" ? `${workMinutes} min work` : `${breakMinutes} min break`}
        </Typography>

        {isFinished && (
          <Typography variant="h6" color="success.main" className="mt-4 font-extrabold">
            Pomodoro finished! 🎉 {cycles} cycle{cycles > 1 ? "s" : ""} completed.
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={2} className="justify-center">
        {!isRunning ? (
          <Button variant="contained" onClick={handleStart} disabled={isFinished} className="min-w-[100px]">
            Start
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={handlePause} className="min-w-[100px]">
            Pause
          </Button>
        )}
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} className="justify-center flex-wrap">
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

      <Typography variant="caption" color="text.secondary" className="block text-center">
        Uses setInterval every 1s and useRef for remaining seconds. On finish it triggers Notification and vibrate.
      </Typography>
    </ToolPaper>
  );
}
