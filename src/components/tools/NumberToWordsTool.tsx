"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALE = ["", "thousand", "million", "billion", "trillion"];

function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  let s = "";
  if (h) s += ONES[h] + " hundred";
  if (r) {
    if (s) s += " ";
    if (r < 20) s += ONES[r];
    else {
      s += TENS[Math.floor(r / 10)];
      if (r % 10) s += "-" + ONES[r % 10];
    }
  }
  return s;
}

function toWords(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "minus " + toWords(-n);
  const groups: string[] = [];
  let i = 0;
  while (n > 0) {
    const g = n % 1000;
    if (g) groups.unshift(threeDigits(g) + (SCALE[i] ? " " + SCALE[i] : ""));
    n = Math.floor(n / 1000);
    i++;
  }
  return groups.join(" ");
}

export default function NumberToWordsTool() {
  const [value, setValue] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const { words, error } = useMemo(() => {
    if (!value.trim()) return { words: "", error: "" };
    const n = Number(value);
    if (!Number.isFinite(n) || !Number.isInteger(n))
      return { words: "", error: "Enter a whole number (no decimals)." };
    if (Math.abs(n) >= 1e15) return { words: "", error: "Number is too large for this tool." };
    return { words: toWords(Math.trunc(n)), error: "" };
  }, [value]);

  return (
    <ToolPaper>
        <TextField
          label="Number"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. 1234567"
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          error={!!error}
          helperText={error}
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              In words
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(words)} disabled={!words}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={words}
            multiline
            minRows={2}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Number in words", spellCheck: false } }}
            sx={{ "& textarea": { fontSize: 15, textTransform: "capitalize" } }}
          />
        </Box>
        {words && !error && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Converted successfully.
          </Alert>
        )}
      </ToolPaper>
  );
}
