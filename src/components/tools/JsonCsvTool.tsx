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

const escapeCsv = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const parseCsv = (csv: string): Record<string, string>[] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (inQuotes) {
      if (c === '"') {
        if (csv[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && csv[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
};

export default function JsonCsvTool() {
  const [mode, setMode] = useState<"json" | "csv">("json");
  const [input, setInput] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

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
      const rows = parseCsv(input);
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
        {output && !error && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Converted successfully. Everything runs in your browser.
          </Alert>
        )}
      </ToolPaper>
  );
}
