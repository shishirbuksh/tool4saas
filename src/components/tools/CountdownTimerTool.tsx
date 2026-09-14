"use client";

import { useState, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE, MS_PER_SECOND } from "@/lib/format";
import { copyToClipboard } from "@/lib/clipboard";

type Remaining = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(targetMs: number, nowMs: number): Remaining {
  const total = targetMs - nowMs;
  const abs = Math.max(0, total);
  const days = Math.floor(abs / MS_PER_DAY);
  const hours = Math.floor((abs % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((abs % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((abs % MS_PER_MINUTE) / MS_PER_SECOND);
  return { total, days, hours, minutes, seconds };
}

function toDatetimeLocalValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

export default function CountdownTimerTool() {
  const [inputValue, setInputValue] = useState("");
  const [targetMs, setTargetMs] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // hydrate from query param ?target=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("target") || params.get("datetime") || params.get("date");
    if (q) {
      // datetime-local values are without timezone; URL param is encoded
      // try decoding and normalizing
      const decoded = decodeURIComponent(q);
      setInputValue(decoded);
      const ms = new Date(decoded).getTime();
      if (!isNaN(ms)) {
        setTargetMs(ms);
        // auto-start if future date
        if (ms > Date.now()) {
          setRunning(true);
        }
      }
    } else {
      // default example: 24h from now
      const d = new Date(Date.now() + MS_PER_DAY);
      setInputValue(toDatetimeLocalValue(d));
    }
  }, []);

  // update shareable link when input changes
  useEffect(() => {
    if (!inputValue) {
      setShareUrl("");
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}?target=${encodeURIComponent(inputValue)}`;
    setShareUrl(url);
  }, [inputValue]);

  // ticking interval 1s when running
  useEffect(() => {
    if (!running || targetMs === null) return;
    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (targetMs - current <= 0) {
        setRunning(false);
      }
    }, MS_PER_SECOND);
    return () => clearInterval(id);
  }, [running, targetMs]);

  // also keep now updated immediately when starting / resuming
  useEffect(() => {
    if (running) setNow(Date.now());
  }, [running]);

  const remaining = targetMs !== null ? getRemaining(targetMs, now) : null;
  const isPast = remaining !== null && remaining.total <= 0;
  const isInvalid = inputValue !== "" && isNaN(new Date(inputValue).getTime());
  const isFuture = targetMs !== null && targetMs > now;

  const handleStart = () => {
    if (!inputValue || isInvalid) return;
    const ms = new Date(inputValue).getTime();
    if (isNaN(ms)) return;
    setTargetMs(ms);
    setNow(Date.now());
    setRunning(true);
    // update url query param for shareability
    const url = `${window.location.pathname}?target=${encodeURIComponent(inputValue)}`;
    window.history.replaceState(null, "", url);
    setShareUrl(`${window.location.origin}${url}`);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setTargetMs(null);
    setNow(Date.now());
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    const ok = await copyToClipboard(shareUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <ToolPaper spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "flex-end" }}>
        <TextField
          label="Target date & time"
          type="datetime-local"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          helperText={isInvalid ? "Invalid date" : isPast && !running ? "This date is in the past" : "Pick a future date and time"}
          error={isInvalid}
        />
        {!running ? (
          <Button variant="contained" onClick={handleStart} disabled={!inputValue || isInvalid} sx={{ whiteSpace: "nowrap", minWidth: 100 }}>
            Start
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={handleStop} sx={{ whiteSpace: "nowrap", minWidth: 100 }}>
            Stop
          </Button>
        )}
        <Button variant="outlined" onClick={handleReset} disabled={targetMs === null && !running}>
          Reset
        </Button>
      </Stack>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: isPast ? "error.main" : "divider",
          bgcolor: isPast ? "error.light" : "background.paper",
          textAlign: "center",
        }}
      >
        {targetMs === null || remaining === null ? (
          <Typography variant="body1" color="text.secondary">
            Enter a target date and press Start to begin the countdown.
          </Typography>
        ) : isPast ? (
          <>
            <Typography variant="h5" sx={{ fontWeight: 800 }} color="error">
              Countdown finished!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Target was {new Date(targetMs).toLocaleString()} — this date is in the past.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
              <Unit value="00" label="Days" />
              <Unit value="00" label="Hours" />
              <Unit value="00" label="Minutes" />
              <Unit value="00" label="Seconds" />
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="overline" color="text.secondary">
              {running ? "Time remaining" : isFuture ? "Paused — time remaining" : "Ready"}
            </Typography>
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ justifyContent: "center", mt: 1, flexWrap: "wrap" }} aria-live="polite">
              <Unit value={String(remaining.days)} label="Days" />
              <Unit value={pad2(remaining.hours)} label="Hours" />
              <Unit value={pad2(remaining.minutes)} label="Minutes" />
              <Unit value={pad2(remaining.seconds)} label="Seconds" />
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
              Target: {new Date(targetMs).toLocaleString()}
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Shareable link
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: "center" }}>
          <TextField
            value={shareUrl}
            placeholder="Pick a date to generate link"
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Shareable link", spellCheck: false } }}
            sx={{ "& input": { fontFamily: "monospace", fontSize: 13 } }}
          />
          <Button variant="outlined" onClick={handleCopy} disabled={!shareUrl}>
            {copied ? "Copied!" : "Copy link"}
          </Button>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          Anyone with this link will see the same countdown (via ?target= query param).
        </Typography>
      </Box>
    </ToolPaper>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <Box
      sx={{
        minWidth: { xs: 64, sm: 86 },
        p: 1.5,
        borderRadius: 2,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "monospace", lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.9, textTransform: "uppercase", letterSpacing: 0.8 }}>
        {label}
      </Typography>
    </Box>
  );
}
