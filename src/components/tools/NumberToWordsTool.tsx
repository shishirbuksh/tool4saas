
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, Alert } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

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
          <Stack direction="row" className="items-center justify-between mb-1">
            <Typography variant="subtitle2" className="font-bold">
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
            className="[&_textarea]:text-[15px] [&_textarea]:capitalize"
          />
        </Box>
        {words && !error && (
          <Alert severity="success" className="mt-2">
            Converted successfully.
          </Alert>
        )}
      </ToolPaper>
  );
}
