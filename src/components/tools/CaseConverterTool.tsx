
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

const toTitle = (s: string) =>
  s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const toSentence = (s: string) =>
  s.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
const toCamel = (s: string) =>
  s
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (c) => c.toLowerCase());
const toSnake = (s: string) =>
  s
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
const toAlternating = (s: string) =>
  s.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join("");

const MODES: { key: string; label: string; fn: (s: string) => string }[] = [
  { key: "upper", label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { key: "lower", label: "lowercase", fn: (s) => s.toLowerCase() },
  { key: "title", label: "Title Case", fn: toTitle },
  { key: "sentence", label: "Sentence case", fn: toSentence },
  { key: "camel", label: "camelCase", fn: toCamel },
  { key: "snake", label: "snake_case", fn: toSnake },
  { key: "alternating", label: "aLtErNaTiNg", fn: toAlternating },
];

export default function CaseConverterTool() {
  const [input, setInput] = useState("");
  const outputs = useMemo(
    () => Object.fromEntries(MODES.map((m) => [m.key, m.fn(input)])),
    [input]
  );

  const copy = (text: string) => text && void import("@/lib/clipboard").then(m=>m.copyToClipboard(text));

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
        <Stack spacing={2}>
          {MODES.map((m) => (
            <Box key={m.key}>
              <Stack direction="row"   className="items-center justify-between mb-1">
                <Typography  variant="subtitle2"  className="font-bold">{m.label}</Typography>
                <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(outputs[m.key])} disabled={!outputs[m.key]}>Copy</Button>
              </Stack>
              <TextField
                value={outputs[m.key]}
                multiline
                minRows={2}
                fullWidth
                slotProps={{ input: { readOnly: true, "aria-label": m.label, spellCheck: false } }}
                className="[&_textarea]:text-[13px]"
              />
            </Box>
          ))}
        </Stack>
      </ToolPaper>
  );
}
