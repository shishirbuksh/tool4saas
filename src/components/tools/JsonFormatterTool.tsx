"use client";

import { useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const format = (indent: number | null) => {
    if (input.length > 500_000) {
      setError("Input too large (max 500 KB)");
      inputRef.current?.focus();
      return;
    }
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent ?? undefined));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
      // Focus first error for a11y
      requestAnimationFrame(() => inputRef.current?.focus());
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
          placeholder='{ "hello": "world" }…'
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ fontFamily: "monospace", "& .MuiInputBase-root": { minHeight: 44 } }}
          inputRef={inputRef}
          error={!!error}
          helperText={error ? `Invalid JSON: ${error}` : "Paste valid JSON to format or minify."}
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
              slotProps={{ input: { readOnly: true, "aria-label": "Result", spellCheck: false, autoComplete: "off" } }}
              sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 }, "& .MuiInputBase-root": { minHeight: 44 } }}
            />
          </Box>
        )}
      </ToolPaper>
  );
}
