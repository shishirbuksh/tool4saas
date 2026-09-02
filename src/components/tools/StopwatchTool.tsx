"use client";

import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const fmt = (ms: number) => {
  const total = Math.floor(ms / 10);
  const cs = total % 100;
  const s = Math.floor(total / 100) % 60;
  const m = Math.floor(total / 6000) % 60;
  const h = Math.floor(total / 360000);
  const pad = (n: number, l = 2) => String(n).padStart(l, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
};

export default function StopwatchTool() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef(0);
  const accRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    startRef.current = performance.now() - accRef.current;
    const tick = () => {
      setElapsed(performance.now() - startRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      accRef.current = performance.now() - startRef.current;
    };
  }, [running]);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    accRef.current = 0;
    setLaps([]);
  };

  return (
    <ToolPaper>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography
          variant="h2"
          sx={{ fontFamily: "monospace", fontWeight: 800, letterSpacing: 1 }}
          aria-live="polite"
        >
          {fmt(elapsed)}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : "Start"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setLaps((l) => [...l, elapsed])}
            disabled={!running && elapsed === 0}
          >
            Lap
          </Button>
          <Button variant="text" onClick={reset}>
            Reset
          </Button>
        </Stack>
        {laps.length > 0 && (
          <Box sx={{ width: "100%", maxHeight: 160, overflow: "auto" }}>
            {laps.map((l, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 1,
                  py: 0.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Lap {i + 1}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  {fmt(l)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </ToolPaper>
  );
}
