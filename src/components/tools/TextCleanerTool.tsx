"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/lib/clipboard";

export default function TextCleanerTool() {
  const [input, setInput] = useState("");
  const [trimLines, setTrimLines] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [removeDuplicateLines, setRemoveDuplicateLines] = useState(false);
  const [convertTabsToSpaces, setConvertTabsToSpaces] = useState(true);

  const output = useMemo(() => {
    if (!input) return "";
    let result = input;

    // convert tabs to spaces (4 spaces per tab)
    if (convertTabsToSpaces) {
      result = result.replace(/\t/g, "    ");
    }

    // split into lines for line-based operations
    let lines = result.split("\n");

    if (trimLines) {
      lines = lines.map((line) => line.trim());
    }

    if (removeExtraSpaces) {
      // replace /\s+/g with single space per line to preserve line breaks
      // spec: replace /\s+/g with single space
      lines = lines.map((line) => line.replace(/\s+/g, " "));
      // if trimLines is off, also trim the extra space at line edges caused by collapsing
      if (!trimLines) {
        // keep original leading/trailing as collapsed single space trimmed? no-op
      }
    }

    if (removeEmptyLines) {
      lines = lines.filter((line) => line.trim() !== "");
    }

    if (removeDuplicateLines) {
      const seen = new Set<string>();
      lines = lines.filter((line) => {
        if (seen.has(line)) return false;
        seen.add(line);
        return true;
      });
    }

    return lines.join("\n");
  }, [input, trimLines, removeExtraSpaces, removeEmptyLines, removeDuplicateLines, convertTabsToSpaces]);

  const stats = useMemo(() => {
    const inputLines = input ? input.split("\n").length : 0;
    const outputLines = output ? output.split("\n").length : 0;
    const inputWords = input.trim() ? input.trim().split(/\s+/).filter(Boolean).length : 0;
    const outputWords = output.trim() ? output.trim().split(/\s+/).filter(Boolean).length : 0;
    const inputChars = input.length;
    const outputChars = output.length;
    const emptyLines = input ? input.split("\n").filter((l) => l.trim() === "").length : 0;
    return {
      inputLines,
      outputLines,
      inputWords,
      outputWords,
      inputChars,
      outputChars,
      emptyLines,
      saved: inputChars - outputChars,
    };
  }, [input, output]);

  const handleCopy = () => {
    if (output) void copyToClipboard(output);
  };

  const handleClear = () => setInput("");

  return (
    <ToolPaper>
      <TextField
        label="Input text"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste or type text to clean…"
        slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
      />

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0, columnGap: 3 }}>
        <FormControlLabel
          control={<Checkbox checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />}
          label="Trim lines"
        />
        <FormControlLabel
          control={<Checkbox checked={removeExtraSpaces} onChange={(e) => setRemoveExtraSpaces(e.target.checked)} />}
          label="Remove extra spaces"
        />
        <FormControlLabel
          control={<Checkbox checked={removeEmptyLines} onChange={(e) => setRemoveEmptyLines(e.target.checked)} />}
          label="Remove empty lines"
        />
        <FormControlLabel
          control={<Checkbox checked={removeDuplicateLines} onChange={(e) => setRemoveDuplicateLines(e.target.checked)} />}
          label="Remove duplicate lines"
        />
        <FormControlLabel
          control={<Checkbox checked={convertTabsToSpaces} onChange={(e) => setConvertTabsToSpaces(e.target.checked)} />}
          label="Convert tabs to spaces"
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={handleCopy} disabled={!output}>
          Copy output
        </Button>
        <Button variant="outlined" onClick={handleClear} disabled={!input && !output}>
          Clear
        </Button>
        <Button variant="outlined" onClick={() => setInput(output)} disabled={!output}>
          Use output as input
        </Button>
      </Stack>

      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Cleaned text
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {stats.outputChars} chars · {stats.outputLines} lines · {stats.outputWords} words
          </Typography>
        </Stack>
        <TextField
          value={output}
          multiline
          minRows={8}
          fullWidth
          placeholder="Cleaned output will appear here…"
          slotProps={{ input: { readOnly: true, "aria-label": "Cleaned text", spellCheck: false } }}
        />
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "action.hover",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            Input
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {stats.inputChars} chars · {stats.inputLines} lines · {stats.inputWords} words
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Output
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {stats.outputChars} chars · {stats.outputLines} lines · {stats.outputWords} words
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Saved
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: stats.saved > 0 ? "success.main" : "text.primary" }}>
            {stats.saved > 0 ? `-${stats.saved} chars` : "0 chars"} {stats.emptyLines > 0 ? `· ${stats.emptyLines} empty lines in input` : ""}
          </Typography>
        </Box>
      </Stack>
    </ToolPaper>
  );
}
