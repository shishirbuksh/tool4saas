"use client";

import { useCallback, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import { UINT32_MAX_PLUS_ONE } from "@/lib/format";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.?/",
};

function secureRandom(max: number) {
  if (max <= 0 || max > 0xffffffff) throw new Error("Invalid max");
  const range = UINT32_MAX_PLUS_ONE;
  const limit = Math.floor(range / max) * max;
  const arr = new Uint32Array(1);
  let r: number;
  do {
    window.crypto.getRandomValues(arr);
    r = arr[0];
  } while (r >= limit);
  return r % max;
}

function generate(length: number, opts: Record<string, boolean>, excludeSimilar: boolean) {
  let pool = "";
  if (opts.lower) pool += SETS.lower;
  if (opts.upper) pool += SETS.upper;
  if (opts.number) pool += SETS.number;
  if (opts.symbol) pool += SETS.symbol;
  if (!pool) return "";
  let chars = pool;
  if (excludeSimilar) chars = chars.replace(/[il1Lo0O]/g, "");
  if (!chars) return "";
  let out = "";
  const requiredSets = [opts.lower && SETS.lower, opts.upper && SETS.upper, opts.number && SETS.number, opts.symbol && SETS.symbol].filter(Boolean) as string[];
  const effectiveLength = Math.max(length, requiredSets.length);
  const ensure = (set: string) => {
    if (!set) return;
    const filtered = excludeSimilar ? set.replace(/[il1Lo0O]/g, "") : set;
    if (filtered) out += filtered[secureRandom(filtered.length)];
  };
  if (opts.lower) ensure(SETS.lower);
  if (opts.upper) ensure(SETS.upper);
  if (opts.number) ensure(SETS.number);
  if (opts.symbol) ensure(SETS.symbol);
  while (out.length < effectiveLength) out += chars[secureRandom(chars.length)];
  // Fisher-Yates shuffle
  const arr = out.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("").slice(0, length);
}

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, number: true, symbol: true });
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [pw, setPw] = useState("");

  const regen = useCallback(() => setPw(generate(length, opts, excludeSimilar)), [length, opts, excludeSimilar]);

  return (
    <ToolPaper spacing={3}>
        <TextField
          label="Generated password"
          value={pw}
          slotProps={{ input: { 
            readOnly: true,
            spellCheck: false,
            autoComplete: "off",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => pw && void import("@/lib/clipboard").then(m=>m.copyToClipboard(pw))} aria-label="Copy generated password" disabled={!pw}><ContentCopyIcon /></IconButton>
                <IconButton onClick={regen} aria-label="regenerate"><RefreshIcon /></IconButton>
              </InputAdornment>
            ),
           } }}
          fullWidth
          sx={{ "& input": { fontFamily: "monospace", fontSize: 18 }, "& .MuiInputBase-root": { minHeight: 44 } }}
        />

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>Length: {length}</Typography>
          <Slider value={length} min={4} max={64} step={1} onChange={(_, v) => setLength(Array.isArray(v) ? v[0] : v)} aria-label="Password length" />
        </Box>

        <Grid container spacing={1}>
          {([
            ["lower", "Lowercase (a-z)"],
            ["upper", "Uppercase (A-Z)"],
            ["number", "Numbers (0-9)"],
            ["symbol", "Symbols (!@#$)"],
          ] as const).map(([k, label]) => (
            <Grid size={{ xs: 6, sm: 3 }}  key={k}>
              <FormControlLabel
                control={
                  <Switch
                    checked={opts[k]}
                    onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))}
                  />
                }
                label={label}
              />
            </Grid>
          ))}
        </Grid>

        <FormControlLabel
          control={<Switch checked={excludeSimilar} onChange={(e) => setExcludeSimilar(e.target.checked)} />}
          label="Exclude similar characters (i, l, 1, L, o, 0, O)"
        />

        <Box>
          <Button variant="contained" size="large" startIcon={<RefreshIcon />} onClick={regen} disabled={!Object.values(opts).some(Boolean)}>
            Generate password
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Generated locally with your browser&apos;s cryptographic random generator. Nothing leaves this device.
        </Typography>
      </ToolPaper>
  );
}
