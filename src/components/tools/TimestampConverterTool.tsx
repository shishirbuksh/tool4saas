
import { useEffect, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Divider } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

export default function TimestampConverterTool() {
  const [now, setNow] = useState<number | null>(null);
  const [epochInput, setEpochInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [toDate, setToDate] = useState<{ local: string; utc: string } | null>(null);
  const [toEpoch, setToEpoch] = useState<{ sec: string; ms: string } | null>(null);

  useEffect(() => {
    setNow(Date.now());
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
        <Box className="p-4 bg-primary rounded-[16px]" style={{ color: "var(--color-primary-content)" }}>
          <Typography variant="caption">Current Unix time</Typography>
          <Typography  variant="h5"  className="font-extrabold" style={{ fontFamily: "monospace" }}>
            {now !== null ? Math.floor(now / 1000) : "..."} <Box component="span" className="text-[14px] opacity-[0.85]">sec</Box>
          </Typography>
          <Typography variant="body2" className="opacity-[0.9]" style={{ fontFamily: "monospace" }}>{now !== null ? now : "..."} ms</Typography>
        </Box>

        <Divider>Epoch → Date</Divider>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-center">
          <TextField
            label="Epoch (seconds or ms)"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            fullWidth
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
            className="[&_input]:[font-family:monospace]"
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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-center">
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
    <Box className="flex items-center gap-2 mb-1">
      <Typography  variant="subtitle2"  className="font-bold w-[110px]">{label}</Typography>
      <TextField value={value} fullWidth slotProps={{ input: { readOnly: true, "aria-label": label, spellCheck: false } }} className="[&_input]:[font-family:monospace] [&_input]:text-[13px]" />
      <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={onCopy}>Copy</Button>
    </Box>
  );
}
