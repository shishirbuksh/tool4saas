"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = (indent: number | null) => {
    if (input.length > 500_000) { setError("Input too large (max 500 KB)"); return; }
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent ?? undefined));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = () => output && void import("@/lib/clipboard").then(m=>m.copyToClipboard(output));

  return (
    <ToolPaper>
        <TextField
          label="Paste JSON here"
          multiline
          minRows={8}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{ "hello": "world" }'
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ fontFamily: "monospace" }}
        />
        <Stack direction="row" spacing={1}  useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="contained" startIcon={<AutoFixHighIcon />} onClick={() => format(2)} disabled={!input}>Format (2 spaces)</Button>
          <Button variant="outlined" onClick={() => format(null)} disabled={!input}>Minify</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output}>Copy</Button>
        </Stack>
        {error && <Alert severity="error">Invalid JSON: {error}</Alert>}
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>Result</Typography>
            <TextField
              value={output}
              multiline
              minRows={8}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Result", spellCheck: false } }}
              sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
            />
          </Box>
        )}
      </ToolPaper>
  );
}
