"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function utf8ToB64(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p) => String.fromCharCode(parseInt(p, 16)))
  );
}
function b64ToUtf8(b64: string) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(b64), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      setOutput(utf8ToB64(input));
    } catch {
      setOutput("Invalid input for Base64 encoding.");
    }
  };
  const decode = () => {
    try {
      setOutput(b64ToUtf8(input.trim()));
    } catch {
      setOutput("Not valid Base64 — check your input.");
    }
  };

  return (
    <ToolPaper>
        <TextField
          label="Input text"
          multiline
          minRows={6}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text…"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ fontFamily: "monospace" }}
        />
        <Stack direction="row" spacing={1}  useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="contained" onClick={encode} disabled={!input}>Encode →</Button>
          <Button variant="contained" color="secondary" onClick={decode} disabled={!input}>← Decode</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => output && void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>Copy</Button>
        </Stack>
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>Output</Typography>
            <TextField
              value={output}
              multiline
              minRows={6}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Output", spellCheck: false } }}
              sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
            />
          </Box>
        )}
      </ToolPaper>
  );
}
