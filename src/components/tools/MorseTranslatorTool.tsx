"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/lib/clipboard";

type Mode = "encode" | "decode";

const MORSE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
};

const REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k])
);

function encodeTextToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => {
      if (ch === " ") return "/";
      return MORSE[ch] ?? "";
    })
    .filter((code) => {
      // keep "/" and valid codes, drop empty strings from unsupported chars
      if (code === "/") return true;
      if (code === "") return false;
      return true;
    })
    .join(" ");
}

function decodeMorseToText(morse: string): string {
  const trimmed = morse.trim();
  if (!trimmed) return "";
  return trimmed
    .split(/\s+/)
    .map((token) => {
      if (token === "/") return " ";
      return REVERSE[token] ?? "";
    })
    .join("")
    .replace(/\s+/g, " ");
}

export default function MorseTranslatorTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input) return "";
    if (mode === "encode") return encodeTextToMorse(input);
    return decodeMorseToText(input);
  }, [input, mode]);

  const copy = () => {
    if (output) void copyToClipboard(output);
  };

  return (
    <ToolPaper>
      <ToggleButtonGroup
        size="small"
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        aria-label="Morse mode"
      >
        <ToggleButton value="encode">Encode</ToggleButton>
        <ToggleButton value="decode">Decode</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        label={mode === "encode" ? "Text to encode" : "Morse to decode"}
        multiline
        minRows={6}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "encode" ? "HELLO WORLD" : ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
        }
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace" }}
      />

      <Box>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {mode === "encode" ? "Morse output" : "Decoded text"}
          </Typography>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={copy}
            disabled={!output}
          >
            Copy
          </Button>
        </Stack>
        <TextField
          value={output}
          multiline
          minRows={6}
          fullWidth
          placeholder={mode === "encode" ? "Morse code will appear here…" : "Decoded text will appear here…"}
          slotProps={{ input: { readOnly: true, "aria-label": "Output", spellCheck: false } }}
          sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
        />
      </Box>

      <Typography variant="caption" color="text.secondary">
        {mode === "encode"
          ? "Letters are separated by a space, words by / . Only A–Z and 0–9 are encoded; other characters are ignored."
          : "Separate letters with a space and words with / . Unknown sequences are ignored."}
      </Typography>
    </ToolPaper>
  );
}
