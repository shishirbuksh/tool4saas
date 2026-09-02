"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Mode = "chars" | "words" | "lines";

export default function TextReverserTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("chars");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const result = useMemo(() => {
    if (!text) return "";
    if (mode === "chars") return [...text].reverse().join("");
    if (mode === "words") return text.split(/(\s+)/).reverse().join("");
    return text.split("\n").reverse().join("\n");
  }, [text, mode]);

  return (
    <ToolPaper>
        <TextField
          label="Your text"
          multiline
          minRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to reverse…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
        <ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="chars">Reverse characters</ToggleButton>
          <ToggleButton value="words">Reverse words</ToggleButton>
          <ToggleButton value="lines">Reverse lines</ToggleButton>
        </ToggleButtonGroup>
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Reversed text
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(result)} disabled={!result}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={result}
            multiline
            minRows={6}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Reversed text", spellCheck: false } }}
          />
        </Box>
      </ToolPaper>
  );
}
