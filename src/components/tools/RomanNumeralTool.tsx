"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const MAP: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const toRoman = (n: number): string => {
  let s = "";
  for (const [v, sym] of MAP) {
    while (n >= v) {
      s += sym;
      n -= v;
    }
  }
  return s;
};

const ROMAN: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const fromRoman = (s: string): number => {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = ROMAN[s[i]] ?? NaN;
    const next = ROMAN[s[i + 1]] ?? 0;
    if (isNaN(cur)) return NaN;
    total += cur < next ? -cur : cur;
  }
  return total;
};

export default function RomanNumeralTool() {
  const [mode, setMode] = useState<"to" | "from">("to");
  const [input, setInput] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    if (mode === "to") {
      const n = Math.trunc(Number(input));
      if (!Number.isFinite(n) || n <= 0 || n >= 4000)
        return { output: "", error: "Enter an integer between 1 and 3999." };
      return { output: toRoman(n), error: "" };
    }
    const val = fromRoman(input.trim().toUpperCase());
    if (isNaN(val) || val <= 0) return { output: "", error: "That is not a valid Roman numeral." };
    return { output: String(val), error: "" };
  }, [input, mode]);

  return (
    <ToolPaper>
        <ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="to">Number → Roman</ToggleButton>
          <ToggleButton value="from">Roman → Number</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={mode === "to" ? "Arabic number" : "Roman numeral"}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "to" ? "e.g. 2024" : "e.g. MMXXIV"}
          slotProps={{ input: { inputMode: mode === "to" ? "numeric" : "text", spellCheck: false, autoComplete: "off" } }}
          error={!!error}
          helperText={error}
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {mode === "to" ? "Roman numeral" : "Arabic number"}
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(output)} disabled={!output}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={output}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Converted value", spellCheck: false } }}
            sx={{ "& input": { fontSize: 18, fontWeight: 700, letterSpacing: 1 } }}
          />
        </Box>
        {output && !error && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {mode === "to" ? "Converted to Roman numerals." : "Converted to a number."}
          </Alert>
        )}
      </ToolPaper>
  );
}
