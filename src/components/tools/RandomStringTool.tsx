"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { UINT32_MAX_PLUS_ONE } from "@/lib/format";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digit: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.?",
};

export default function RandomStringTool() {
  const [length, setLength] = useState("16");
  const [count, setCount] = useState("1");
  const [opts, setOpts] = useState({ lower: true, upper: true, digit: true, symbol: false });
  const [results, setResults] = useState<string[]>([]);
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const generate = () => {
    const pool = (Object.keys(opts) as (keyof typeof opts)[])
      .filter((k) => opts[k])
      .map((k) => SETS[k])
      .join("");
    const n = Math.min(10000, Math.max(1, parseInt(length, 10) || 16));
    const c = Math.min(10000, Math.max(1, parseInt(count, 10) || 1));
    if (!pool) {
      setResults([]);
      return;
    }
    const out: string[] = [];
    const limit = UINT32_MAX_PLUS_ONE - (UINT32_MAX_PLUS_ONE % pool.length);
    for (let i = 0; i < c; i++) {
      let s = "";
      while (s.length < n) {
        const buf = new Uint32Array(n - s.length);
        crypto.getRandomValues(buf);
        for (let j = 0; j < buf.length; j++) {
          if (buf[j] < limit) {
            s += pool[buf[j] % pool.length];
            if (s.length === n) break;
          }
        }
      }
      out.push(s);
    }
    setResults(out);
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="How many"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
          {(Object.keys(opts) as (keyof typeof opts)[]).map((k) => (
            <FormControlLabel
              key={k}
              control={
                <Checkbox
                  checked={opts[k]}
                  onChange={(e) => setOpts((p) => ({ ...p, [k]: e.target.checked }))}
                />
              }
              label={k.charAt(0).toUpperCase() + k.slice(1) + " (abc123!@#)"}
            />
          ))}
        </Stack>
        <Button variant="contained" onClick={generate}>
          Generate
        </Button>
        {results.length > 0 && (
          <Box>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Results
              </Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(results.join("\n"))}>
                Copy all
              </Button>
            </Stack>
            <Stack spacing={1}>
              {results.map((r, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    fontFamily: "monospace",
                    fontSize: 14,
                  }}
                >
                  <span>{r}</span>
                  <Button size="small" onClick={() => copy(r)}>
                    Copy
                  </Button>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </ToolPaper>
  );
}
