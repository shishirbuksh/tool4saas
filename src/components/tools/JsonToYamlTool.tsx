"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";

const isObj = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object";

const scalar = (v: unknown): string => {
  if (v === null) return "null";
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
};

function serialize(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((item) => {
        if (isObj(item)) {
          const inner = serialize(item, indent + 1);
          const lines = inner.split("\n");
          lines[0] = pad + "- " + lines[0].slice(pad.length + 2);
          for (let i = 1; i < lines.length; i++) {
            lines[i] = pad + "  " + lines[i].slice(pad.length + 2);
          }
          return lines.join("\n");
        }
        return pad + "- " + scalar(item);
      })
      .join("\n");
  }
  if (isObj(value)) {
    const keys = Object.keys(value);
    if (keys.length === 0) return "{}";
    return keys
      .map((k) => {
        const v = value[k];
        if (isObj(v)) return `${pad}${k}:\n${serialize(v, indent + 1)}`;
        return `${pad}${k}: ${scalar(v)}`;
      })
      .join("\n");
  }
  return scalar(value);
}

export default function JsonToYamlTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const convert = () => {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(serialize(obj));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <ToolPaper>
        <TextField
          label="JSON"
          multiline
          minRows={8}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name":"Ada","roles":["admin"]}'
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Box>
          <Button variant="contained" onClick={convert}>
            Convert to YAML
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {output && (
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                YAML
              </Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(output)}>
                Copy
              </Button>
            </Stack>
            <TextField
              value={output}
              multiline
              minRows={8}
              fullWidth
              slotProps={{ input: { readOnly: true, spellCheck: false, autoComplete: "off" } }}
            />
          </Stack>
        )}
      </ToolPaper>
  );
}
