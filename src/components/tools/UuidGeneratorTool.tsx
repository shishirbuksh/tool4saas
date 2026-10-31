
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Button, Typography, Stack, FormControlLabel, Switch } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";

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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="items-center">
          <TextField
            label="How many"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="max-w-[160px]"
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <FormControlLabel control={<Switch checked={upper} onChange={(e) => setUpper(e.target.checked)} />} label="Uppercase" />
          <Button variant="contained" onClick={generate}>Generate</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => void import("@/lib/clipboard").then(m=>m.copyToClipboard(result))} disabled={!result}>Copy</Button>
        </Stack>
        {result && (
          <Box>
            <Typography  variant="subtitle2"  gutterBottom className="font-bold">{result.split("\n").length} UUIDs (v4)</Typography>
            <TextField
              value={result}
              multiline
              minRows={6}
              fullWidth
              slotProps={{ input: { readOnly: true, "aria-label": "Generated UUIDs", spellCheck: false } }}
              className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[13px]"
            />
          </Box>
        )}
        <Typography variant="caption" color="text.secondary">
          Generated with crypto.randomUUID() — RFC 4122 version 4.
        </Typography>
      </ToolPaper>
  );
}
