"use client";

import { useEffect, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function TimestampConverterTool() {
  const [now, setNow] = useState(() => Date.now());
  const [epochInput, setEpochInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [toDate, setToDate] = useState<{ local: string; utc: string } | null>(null);
  const [toEpoch, setToEpoch] = useState<{ sec: string; ms: string } | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const epochToDate = () => {
    const v = parseFloat(epochInput);
    if (isNaN(v)) return setToDate(null);
    const ms = v < 1e12 ? v * 1000 : v;
    const d = new Date(ms);
    setToDate({ local: d.toString(), utc: d.toUTCString() });
  };

  const dateToEpoch = () => {
    if (!dateInput) return setToEpoch(null);
    const ms = new Date(dateInput).getTime();
    if (isNaN(ms)) return setToEpoch(null);
    setToEpoch({ sec: String(Math.floor(ms / 1000)), ms: String(ms) });
  };

  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  return (
    <ToolPaper spacing={3}>
        <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 2 }}>
          <Typography variant="caption">Current Unix time</Typography>
          <Typography  variant="h5"  sx={{ fontWeight: 800,  fontFamily: "monospace" }}>
            {Math.floor(now / 1000)} <Box component="span" sx={{ fontSize: 14, opacity: 0.85 }}>sec</Box>
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace", opacity: 0.9 }}>{now} ms</Typography>
        </Box>

        <Divider>Epoch → Date</Divider>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
          <TextField
            label="Epoch (seconds or ms)"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
            sx={{ "& input": { fontFamily: "monospace" } }}
          />
          <Button variant="contained" onClick={epochToDate} disabled={!epochInput}>Convert</Button>
        </Stack>
        {toDate && (
          <Box>
            <Line label="Local" value={toDate.local} onCopy={() => copy(toDate.local)} />
            <Line label="UTC" value={toDate.utc} onCopy={() => copy(toDate.utc)} />
          </Box>
        )}

        <Divider>Date → Epoch</Divider>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
          <TextField
            label="Date & time"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            fullWidth
            slotProps={{ inputLabel: {  shrink: true  } }}
          />
          <Button variant="contained" onClick={dateToEpoch} disabled={!dateInput}>Convert</Button>
        </Stack>
        {toEpoch && (
          <Box>
            <Line label="Epoch (sec)" value={toEpoch.sec} onCopy={() => copy(toEpoch.sec)} />
            <Line label="Epoch (ms)" value={toEpoch.ms} onCopy={() => copy(toEpoch.ms)} />
          </Box>
        )}
      </ToolPaper>
  );
}

function Line({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
      <Typography  variant="subtitle2"  sx={{ fontWeight: 700,  width: 110 }}>{label}</Typography>
      <TextField value={value} fullWidth slotProps={{ input: { readOnly: true, "aria-label": label, spellCheck: false } }} sx={{ "& input": { fontFamily: "monospace", fontSize: 13 } }} />
      <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={onCopy}>Copy</Button>
    </Box>
  );
}
