"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CodeMinifierTool() {
  const [_language] = useState("javascript");
  const language = _language;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const minify = (code: string, _lang: string) => {
    // Very basic minifier: remove single-line comments, extra whitespace
    const result = code
      .replace(/\/\/.*/g, "") // remove // comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove /* */ comments
      .replace(/^\s+|\s+$/gm, "") // trim start/end of lines
      .replace(/[\r\n]+/g, " ") // collapse newlines to space
      .trim();
    return result;
  };

  const handle = () => {
    setOutput(minify(input, language));
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Typography sx={{ fontWeight: 700 }} component="span">
            Minify {language} code
          </Typography>
        </Stack>
        <TextField
          label="Code"
          multiline
          minRows={4}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="// Write your code here"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Box>
          <Button variant="contained" onClick={handle}>
            Minify
          </Button>
        </Box>
        {output && (
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Minified
              </Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(output)}>
                Copy
              </Button>
            </Stack>
            <TextField
              value={output}
              multiline
              minRows={4}
              fullWidth
              slotProps={{ input: { readOnly: true, spellCheck: false, autoComplete: "off" } }}
            />
          </Stack>
        )}
      </ToolPaper>
  );
}
