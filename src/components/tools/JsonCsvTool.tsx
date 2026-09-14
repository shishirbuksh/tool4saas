"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { parseCsv as parseCsvSafe, MAX_CSV_SIZE } from "./CsvViewerTool";

const escapeCsv = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export default function JsonCsvTool() {
  const [mode, setMode] = useState<"json" | "csv">("json");
  const [input, setInput] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const isOverCap = input.length > MAX_CSV_SIZE;

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    try {
      if (mode === "json") {
        const data = JSON.parse(input);
        if (!Array.isArray(data)) return { output: "", error: "JSON must be an array of objects." };
        const keys = Array.from(new Set(data.flatMap((o) => Object.keys(o))));
        const lines = [keys.join(",")];
        for (const o of data) lines.push(keys.map((k) => escapeCsv((o as Record<string, unknown>)[k])).join(","));
        return { output: lines.join("\n"), error: "" };
      }
      const { rows } = parseCsvSafe(input);
      return { output: JSON.stringify(rows, null, 2), error: "" };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, mode]);

  return (
    <ToolPaper>
        <ToggleButtonGroup
          size="small"
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
        >
          <ToggleButton value="json">JSON → CSV</ToggleButton>
          <ToggleButton value="csv">CSV → JSON</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={mode === "json" ? "Paste JSON (array of objects)" : "Paste CSV"}
          multiline
          minRows={6}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "json" ? '[{"name":"Ada","age":36}]' : "name,age\nAda,36"}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          error={!!error}
          helperText={error}
        />
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {mode === "json" ? "CSV output" : "JSON output"}
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(output)} disabled={!output}>
              Copy
            </Button>
          </Stack>
          <TextField
            value={output}
            multiline
            minRows={6}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
                "aria-label": mode === "json" ? "Converted CSV" : "Converted JSON",
                spellCheck: false,
              },
            }}
            sx={{ "& textarea": { fontSize: 13, fontFamily: "monospace" } }}
          />
        </Box>
        {isOverCap && mode === "csv" && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            Input truncated to {Math.round(MAX_CSV_SIZE / 1024)}KB for performance. Only the first {Math.round(MAX_CSV_SIZE / 1024)}KB were converted.
          </Alert>
        )}
        {output && !error && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Converted successfully. Everything runs in your browser.
          </Alert>
        )}
      </ToolPaper>
  );
}
