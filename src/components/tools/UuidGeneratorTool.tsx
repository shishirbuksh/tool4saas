"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [upper, setUpper] = useState(false);
  const [result, setResult] = useState("");

  const generate = () => {
    const n = Math.max(1, Math.min(500, count || 1));
    const ids = Array.from({ length: n }, () => {
      const id = crypto.randomUUID();
      return upper ? id.toUpperCase() : id;
    });
    setResult(ids.join("\n"));
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
          <TextField
            label="How many"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            sx={{ maxWidth: 160 }}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <FormControlLabel control={<Switch checked={upper} onChange={(e) => setUpper(e.target.checked)} />} label="Uppercase" />
          <Button variant="contained" onClick={generate}>Generate</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(result))} disabled={!result}>Copy</Button>
        </Stack>
        {result && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>{result.split("\n").length} UUIDs (v4)</Typography>
            <TextField
              value={result}
              multiline
              minRows={6}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Generated UUIDs", spellCheck: false } }}
              sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
            />
          </Box>
        )}
        <Typography variant="caption" color="text.secondary">
          Generated with crypto.randomUUID() — RFC 4122 version 4.
        </Typography>
      </ToolPaper>
  );
}
