"use client";

import { useState, useMemo } from "react";
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
type DecodeFormat = "dec" | "hex" | "bin" | "oct";

export default function AsciiConverterTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [decodeFormat, setDecodeFormat] = useState<DecodeFormat>("dec");
  const [input, setInput] = useState("Hello");

  const encoded = useMemo(() => {
    if (mode !== "encode") return null;
    if (!input) return { ascii: "", hex: "", binary: "", octal: "" };
    const codes = [...input].map((ch) => ch.charCodeAt(0));
    return {
      ascii: codes.map((c) => String(c)).join(" "),
      hex: codes.map((c) => c.toString(16).padStart(2, "0")).join(" "),
      binary: codes.map((c) => c.toString(2).padStart(8, "0")).join(" "),
      octal: codes.map((c) => c.toString(8).padStart(3, "0")).join(" "),
    };
  }, [input, mode]);

  const decoded = useMemo(() => {
    if (mode !== "decode") return { text: "", error: "" };
    if (!input.trim()) return { text: "", error: "" };
    const tokens = input
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean);
    const baseMap: Record<DecodeFormat, number> = {
      dec: 10,
      hex: 16,
      bin: 2,
      oct: 8,
    };
    const base = baseMap[decodeFormat];
    try {
      const chars: string[] = [];
      for (const tok of tokens) {
        const clean = tok.toLowerCase().replace(/^0x/, "");
        if (!clean) continue;
        const valid =
          decodeFormat === "hex"
            ? /^[0-9a-f]+$/.test(clean)
            : decodeFormat === "bin"
              ? /^[01]+$/.test(clean)
              : decodeFormat === "oct"
                ? /^[0-7]+$/.test(clean)
                : /^-?\d+$/.test(clean);
        if (!valid) throw new Error(`Invalid ${decodeFormat} token "${tok}"`);
        const code = parseInt(clean, base);
        if (isNaN(code) || code < 0 || code > 65535) throw new Error(`Invalid code "${tok}"`);
        chars.push(String.fromCharCode(code));
      }
      return { text: chars.join(""), error: "" };
    } catch (e) {
      return { text: "", error: (e as Error).message };
    }
  }, [input, mode, decodeFormat]);

  const copy = (v: string) => v && void copyToClipboard(v);

  return (
    <ToolPaper>
      <ToggleButtonGroup
        size="small"
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        fullWidth
      >
        <ToggleButton value="encode">Text → Codes</ToggleButton>
        <ToggleButton value="decode">Codes → Text</ToggleButton>
      </ToggleButtonGroup>

      {mode === "decode" && (
        <ToggleButtonGroup
          size="small"
          value={decodeFormat}
          exclusive
          onChange={(_, v) => v && setDecodeFormat(v)}
        >
          <ToggleButton value="dec">Decimal (ASCII)</ToggleButton>
          <ToggleButton value="hex">Hex</ToggleButton>
          <ToggleButton value="bin">Binary</ToggleButton>
          <ToggleButton value="oct">Octal</ToggleButton>
        </ToggleButtonGroup>
      )}

      <TextField
        label={mode === "encode" ? "Input text" : `Input ${decodeFormat} codes`}
        multiline
        minRows={4}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "encode"
            ? "Type text to convert — e.g. Hello World"
            : decodeFormat === "hex"
              ? "e.g. 48 65 6c 6c 6f"
              : decodeFormat === "bin"
                ? "e.g. 01001000 01100101 01101100 01101100 01101111"
                : decodeFormat === "oct"
                  ? "e.g. 110 145 154 154 157"
                  : "e.g. 72 101 108 108 111"
        }
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
      />

      {mode === "encode" && encoded && (
        <Stack spacing={2}>
          {(
            [
              { key: "ascii", label: "ASCII / Decimal (charCodeAt)", value: encoded.ascii },
              { key: "hex", label: "Hex (toString 16)", value: encoded.hex },
              { key: "binary", label: "Binary (toString 2, padded 8)", value: encoded.binary },
              { key: "octal", label: "Octal (toString 8)", value: encoded.octal },
            ] as const
          ).map((field) => (
            <Box key={field.key}>
              <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {field.label}
                </Typography>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copy(field.value)}
                  disabled={!field.value}
                >
                  Copy
                </Button>
              </Stack>
              <TextField
                value={field.value}
                multiline
                minRows={2}
                fullWidth
                placeholder="—"
                slotProps={{
                  input: { readOnly: true, "aria-label": field.label, spellCheck: false },
                }}
                sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
              />
            </Box>
          ))}
        </Stack>
      )}

      {mode === "decode" && (
        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Decoded text
            </Typography>
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={() => copy(decoded.text)}
              disabled={!decoded.text}
            >
              Copy
            </Button>
          </Stack>
          <TextField
            value={decoded.error ? `Error: ${decoded.error}` : decoded.text}
            multiline
            minRows={4}
            fullWidth
            error={!!decoded.error}
            slotProps={{
              input: { readOnly: true, "aria-label": "Decoded text", spellCheck: false },
            }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            {decodeFormat === "hex"
              ? "Hex bytes separated by space or comma, 0x prefix optional."
              : decodeFormat === "bin"
                ? "8-bit binary values separated by space or comma."
                : decodeFormat === "oct"
                  ? "Octal values separated by space or comma."
                  : "Decimal ASCII codes separated by space or comma."}
          </Typography>
        </Box>
      )}
    </ToolPaper>
  );
}
