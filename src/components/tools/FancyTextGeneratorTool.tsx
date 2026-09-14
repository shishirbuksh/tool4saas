"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function buildAlphaMap(upperStart: number, lowerStart: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    map[String.fromCharCode(65 + i)] = String.fromCodePoint(upperStart + i);
    map[String.fromCharCode(97 + i)] = String.fromCodePoint(lowerStart + i);
  }
  return map;
}

function buildDigitMap(start: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 10; i++) {
    map[String(i)] = String.fromCodePoint(start + i);
  }
  return map;
}

function translate(input: string, map: Record<string, string>): string {
  return Array.from(input)
    .map((ch) => map[ch] ?? ch)
    .join("");
}

// Bold serif (Mathematical Bold): A-Z U+1D400, a-z U+1D41A, 0-9 U+1D7CE
const BOLD_SERIF_MAP: Record<string, string> = {
  ...buildAlphaMap(0x1d400, 0x1d41a),
  ...buildDigitMap(0x1d7ce),
};

// Bold sans (Mathematical Bold Sans): A-Z U+1D5D4, a-z U+1D5EE, 0-9 U+1D7EC
const BOLD_SANS_MAP: Record<string, string> = {
  ...buildAlphaMap(0x1d5d4, 0x1d5ee),
  ...buildDigitMap(0x1d7ec),
};

// Italic serif (Mathematical Italic): A-Z U+1D434, a-z U+1D44E (h -> Planck constant U+210E)
const ITALIC_MAP: Record<string, string> = buildAlphaMap(0x1d434, 0x1d44e);
ITALIC_MAP["h"] = "ℎ";

// Bold italic (Mathematical Bold Italic): A-Z U+1D468, a-z U+1D482
const BOLD_ITALIC_MAP: Record<string, string> = buildAlphaMap(0x1d468, 0x1d482);

// Script (Mathematical Bold Script, contiguous): A-Z U+1D4D0, a-z U+1D4EA
const SCRIPT_MAP: Record<string, string> = buildAlphaMap(0x1d4d0, 0x1d4ea);

// Monospace (Mathematical Monospace): A-Z U+1D670, a-z U+1D68A, 0-9 U+1D7F6
const MONOSPACE_MAP: Record<string, string> = {
  ...buildAlphaMap(0x1d670, 0x1d68a),
  ...buildDigitMap(0x1d7f6),
};

// Fullwidth: A-Z U+FF21, a-z U+FF41, 0-9 U+FF10
const FULLWIDTH_MAP: Record<string, string> = {
  ...buildAlphaMap(0xff21, 0xff41),
  ...buildDigitMap(0xff10),
};

// Bubble (Enclosed Alphanumerics): A-Z U+24B6, a-z U+24D0, 0 -> U+24EA, 1-9 -> U+2460-2468
const BUBBLE_MAP: Record<string, string> = {
  ...buildAlphaMap(0x24b6, 0x24d0),
  "0": "⓪",
  "1": "①",
  "2": "②",
  "3": "③",
  "4": "④",
  "5": "⑤",
  "6": "⑥",
  "7": "⑦",
  "8": "⑧",
  "9": "⑨",
};

// Circled (combining enclosing circle U+20DD): A-Za-z0-9 -> char + U+20DD
const CIRCLED_MAP: Record<string, string> = {};
for (let i = 0; i < 26; i++) {
  const upper = String.fromCharCode(65 + i);
  const lower = String.fromCharCode(97 + i);
  CIRCLED_MAP[upper] = upper + "⃝";
  CIRCLED_MAP[lower] = lower + "⃝";
}
for (let i = 0; i < 10; i++) {
  const d = String(i);
  CIRCLED_MAP[d] = d + "⃝";
}

// Small caps (explicit lookup table, case-insensitive)
const SMALL_CAPS_BASE: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "Q",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};
const SMALL_CAPS_MAP: Record<string, string> = {};
for (const [lower, small] of Object.entries(SMALL_CAPS_BASE)) {
  SMALL_CAPS_MAP[lower] = small;
  SMALL_CAPS_MAP[lower.toUpperCase()] = small;
}

const MODES: { key: string; label: string; fn: (s: string) => string }[] = [
  { key: "boldSerif", label: "Bold Serif", fn: (s) => translate(s, BOLD_SERIF_MAP) },
  { key: "boldSans", label: "Bold Sans", fn: (s) => translate(s, BOLD_SANS_MAP) },
  { key: "italic", label: "Italic", fn: (s) => translate(s, ITALIC_MAP) },
  { key: "boldItalic", label: "Bold Italic", fn: (s) => translate(s, BOLD_ITALIC_MAP) },
  { key: "script", label: "Script", fn: (s) => translate(s, SCRIPT_MAP) },
  { key: "monospace", label: "Monospace", fn: (s) => translate(s, MONOSPACE_MAP) },
  { key: "fullwidth", label: "Fullwidth", fn: (s) => translate(s, FULLWIDTH_MAP) },
  { key: "bubble", label: "Bubble", fn: (s) => translate(s, BUBBLE_MAP) },
  { key: "circled", label: "Circled", fn: (s) => translate(s, CIRCLED_MAP) },
  { key: "smallCaps", label: "Small Caps", fn: (s) => translate(s, SMALL_CAPS_MAP) },
];

export default function FancyTextGeneratorTool() {
  const [input, setInput] = useState("");
  const outputs = useMemo(
    () => Object.fromEntries(MODES.map((m) => [m.key, m.fn(input)])),
    [input]
  );
  const charCount = useMemo(() => Array.from(input).length, [input]);

  const copy = (text: string) => text && void import("@/lib/clipboard").then((m) => m.copyToClipboard(text));

  return (
    <ToolPaper>
      <TextField
        label="Enter text"
        multiline
        minRows={5}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste your text here…"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
      />
      <Typography variant="caption" color="text.secondary">
        {charCount} character{charCount === 1 ? "" : "s"}
      </Typography>
      <Stack spacing={2}>
        {MODES.map((m) => (
          <Box key={m.key}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{m.label}</Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(outputs[m.key])} disabled={!outputs[m.key]}>Copy</Button>
            </Stack>
            <TextField
              value={outputs[m.key]}
              multiline
              minRows={2}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": m.label, spellCheck: false } }}
              sx={{ "& textarea": { fontSize: 13 } }}
            />
          </Box>
        ))}
      </Stack>
    </ToolPaper>
  );
}
