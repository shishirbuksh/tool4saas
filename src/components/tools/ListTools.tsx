"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function splitLines(s: string) {
  return s.split(/\r?\n/);
}

export default function ListTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const set = (lines: string[]) => setOutput(lines.join("\n"));

  const sortAsc = () => set([...splitLines(input)].sort((a, b) => a.localeCompare(b)));
  const sortDesc = () => set([...splitLines(input)].sort((a, b) => b.localeCompare(a)));
  const reverse = () => set([...splitLines(input)].reverse());
  const dedupe = () => set([...new Set(splitLines(input))]);
  const removeBlank = () => set(splitLines(input).filter((l) => l.trim() !== ""));
  const shuffle = () => {
    const a = [...splitLines(input)];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    set(a);
  };

  const inCount = input ? splitLines(input).filter((l) => l.trim() !== "").length : 0;
  const outCount = output ? splitLines(output).length : 0;

  return (
    <ToolPaper>
        <TextField
          label="Your list (one item per line)"
          multiline
          minRows={6}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"apple\nbanana\ncherry"}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Button variant="contained" onClick={sortAsc} disabled={!input}>Sort A→Z</Button>
          <Button variant="contained" onClick={sortDesc} disabled={!input}>Sort Z→A</Button>
          <Button variant="outlined" onClick={reverse} disabled={!input}>Reverse</Button>
          <Button variant="outlined" onClick={shuffle} disabled={!input}>Shuffle</Button>
          <Button variant="outlined" onClick={dedupe} disabled={!input}>Remove duplicates</Button>
          <Button variant="outlined" onClick={removeBlank} disabled={!input}>Remove blank lines</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(output))} disabled={!output}>Copy</Button>
        </Box>
        {output && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>{outCount} lines</Typography>
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
        <Typography variant="caption" color="text.secondary">Input items (non-blank): {inCount}</Typography>
      </ToolPaper>
  );
}
