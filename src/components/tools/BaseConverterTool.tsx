"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const BASES = [
  { v: 2, label: "Binary (2)" },
  { v: 8, label: "Octal (8)" },
  { v: 10, label: "Decimal (10)" },
  { v: 16, label: "Hexadecimal (16)" },
  { v: 36, label: "Base 36" },
];

function parseBigInt(str: string, base: number) {
  const s = str.trim().toLowerCase();
  if (!s) throw new Error("Empty");
  let result = 0n;
  for (const ch of s) {
    const d = parseInt(ch, base);
    if (isNaN(d)) throw new Error(`Invalid digit "${ch}" for base ${base}`);
    result = result * BigInt(base) + BigInt(d);
  }
  return result;
}

function toBase(n: bigint, base: number) {
  if (n === 0n) return "0";
  let s = "";
  const b = BigInt(base);
  let v = n;
  while (v > 0n) {
    s = (v % b).toString(base) + s;
    v = v / b;
  }
  return s;
}

export default function BaseConverterTool() {
  const [value, setValue] = useState("255");
  const [from, setFrom] = useState(10);
  const [to, setTo] = useState(16);
  const [result, setResult] = useState("ff");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      const n = parseBigInt(value, from);
      setResult(toBase(n, to));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <ToolPaper>
        <TextField
          label="Number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ "& input": { fontFamily: "monospace" } }}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>From base</InputLabel>
            <Select label="From base" value={from} onChange={(e) => setFrom(Number(e.target.value))}>
              {BASES.map((b) => (
                <MenuItem key={b.v} value={b.v}>{b.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>To base</InputLabel>
            <Select label="To base" value={to} onChange={(e) => setTo(Number(e.target.value))}>
              {BASES.map((b) => (
                <MenuItem key={b.v} value={b.v}>{b.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {error && <Alert severity="error">Invalid input: {error}</Alert>}
        <Button variant="contained" onClick={convert}>Convert</Button>
        {!error && result && (
          <Box>
            <Stack direction="row"   sx={{ alignItems: "center", justifyContent: "space-between",  mb: 0.5 }}>
              <Typography  variant="subtitle2"  sx={{ fontWeight: 700 }}>Result (base {to})</Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(result))}>Copy</Button>
            </Stack>
            <TextField
              value={result}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Result", spellCheck: false } }}
              sx={{ "& input": { fontFamily: "monospace", fontSize: 16 } }}
            />
          </Box>
        )}
      </ToolPaper>
  );
}
