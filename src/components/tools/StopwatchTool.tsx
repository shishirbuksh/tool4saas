
import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Button, Typography, Stack, Link } from "@/components/ds";

import { ContentCopy as ContentCopyIcon, Download as DownloadIcon } from "@/components/ds/icons";
import { MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND } from "@/lib/format";

const fmt = (ms: number) => {
  const cs = Math.floor((ms % MS_PER_SECOND) / 10);
  const s = Math.floor(ms / MS_PER_SECOND) % 60;
  const m = Math.floor(ms / MS_PER_MINUTE) % 60;
  const h = Math.floor(ms / MS_PER_HOUR);
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
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

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

  const splitsText = laps.map((l, i) => `Lap ${i + 1}: ${fmt(l)}`).join("\n");

  const exportSplits = () => {
    if (laps.length === 0) return;
    const blob = new Blob([`Total: ${fmt(elapsed)}\n${splitsText}\n`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stopwatch-splits.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPaper>
      <Stack spacing={2} className="items-center">
        <Typography
          variant="h2"
          className="font-extrabold tracking-[1px]" style={{ fontFamily: "monospace" }}
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
          <Box className="w-full max-h-[160px] overflow-auto">
            {laps.map((l, i) => (
              <Box
                key={i}
                className="flex justify-between px-2 py-1 border-b border-base-300"
              >
                <Typography variant="body2" color="text.secondary">
                  Lap {i + 1}
                </Typography>
                <Typography variant="body2" style={{ fontFamily: "monospace" }}>
                  {fmt(l)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        {laps.length > 0 && (
          <Stack direction="row" spacing={1}>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(splitsText)}>
              Copy splits
            </Button>
            <Button size="small" startIcon={<DownloadIcon />} onClick={exportSplits}>
              Export splits
            </Button>
          </Stack>
        )}
        <Typography variant="body2" color="text.secondary" className="text-center">
          Need focus cycles or event countdowns? Try the{" "}
          <Link href="/pomodoro-timer">Pomodoro timer</Link> or{" "}
          <Link href="/date-calculator">Countdown timer</Link>.
        </Typography>
      </Stack>
    </ToolPaper>
  );
}
