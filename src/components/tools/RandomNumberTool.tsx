"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function randInt(min: number, max: number) {
  const range = max - min + 1;
  const arr = new Uint32Array(1);
  const limit = 4294967296 - (4294967296 % range);
  while (true) {
    window.crypto.getRandomValues(arr);
    if (arr[0] < limit) {
      return min + (arr[0] % range);
    }
  }
}

export default function RandomNumberTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(false);
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    setError("");
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const n = Math.max(1, Math.min(1000, count || 1));
    const out: number[] = [];
    if (unique) {
      const range = hi - lo + 1;
      if (range < n) {
        setError(`Only ${range} unique values exist between ${lo} and ${hi}.`);
        setResult([]);
        return;
      }
      const set = new Set<number>();
      while (set.size < n) set.add(randInt(lo, hi));
      out.push(...set);
    } else {
      for (let i = 0; i < n; i++) out.push(randInt(lo, hi));
    }
    setResult(out);
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField label="Minimum" type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} fullWidth slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }} />
          <TextField label="Maximum" type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} fullWidth slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }} />
          <TextField label="How many" type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} fullWidth slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }} />
        </Stack>
        <FormControlLabel control={<Switch checked={unique} onChange={(e) => setUnique(e.target.checked)} />} label="Unique values only" />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={generate}>Generate</Button>
        {result.length > 0 && (
          <Box>
            <Stack direction="row"   sx={{ alignItems: "center", justifyContent: "space-between",  mb: 0.5 }}>
              <Typography  variant="subtitle2"  sx={{ fontWeight: 700 }}>Results</Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(result.join(", ")))}>Copy</Button>
            </Stack>
            <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2, fontFamily: "monospace", fontSize: 14, lineHeight: 1.8 }}>
              {result.join(", ")}
            </Box>
          </Box>
        )}
        <Typography variant="caption" color="text.secondary">
          Generated with your browser&apos;s cryptographic random generator.
        </Typography>
      </ToolPaper>
  );
}
