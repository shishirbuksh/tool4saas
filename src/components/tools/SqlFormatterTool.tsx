"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const MULTI_WORD_KEYWORDS = [
  "GROUP BY",
  "ORDER BY",
  "UNION ALL",
  "INSERT INTO",
  "DELETE FROM",
  "LEFT OUTER JOIN",
  "RIGHT OUTER JOIN",
  "FULL OUTER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "INNER JOIN",
  "OUTER JOIN",
  "FULL JOIN",
  "CROSS JOIN",
];

const SINGLE_WORD_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "UNION",
  "JOIN",
  "ON",
  "AND",
  "OR",
  "VALUES",
  "SET",
  "UPDATE",
  "DELETE",
  "INSERT",
  "CREATE",
  "TABLE",
  "DROP",
  "ALTER",
  "INTO",
  "AS",
  "DISTINCT",
  "BY",
  "GROUP",
  "ORDER",
];

const MAJOR_CLAUSES = [
  "GROUP BY",
  "ORDER BY",
  "UNION ALL",
  "INSERT INTO",
  "DELETE FROM",
  "LEFT OUTER JOIN",
  "RIGHT OUTER JOIN",
  "FULL OUTER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "INNER JOIN",
  "OUTER JOIN",
  "FULL JOIN",
  "CROSS JOIN",
  "SELECT",
  "FROM",
  "WHERE",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "UNION",
  "JOIN",
  "VALUES",
  "SET",
  "UPDATE",
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toPattern(keyword: string): string {
  return keyword.split(" ").map(escapeRegExp).join("\\s+");
}

export function minifySql(sql: string): string {
  return sql.replace(/\s+/g, " ").trim();
}

export function formatSql(sql: string): string {
  const literals: string[] = [];
  let s = sql.replace(/\s+/g, " ").trim();

  s = s.replace(/('(?:''|[^'])*'|"(?:""|[^"])*")/g, (m) => {
    literals.push(m);
    return `__LIT_${literals.length - 1}__`;
  });

  const multiSorted = [...MULTI_WORD_KEYWORDS].sort((a, b) => b.length - a.length);
  for (const kw of multiSorted) {
    s = s.replace(new RegExp(`\\b${toPattern(kw)}\\b`, "gi"), kw);
  }
  for (const kw of SINGLE_WORD_KEYWORDS) {
    s = s.replace(new RegExp(`\\b${escapeRegExp(kw)}\\b`, "gi"), kw);
  }

  const majorsSorted = [...MAJOR_CLAUSES].sort((a, b) => b.length - a.length);
  for (const kw of majorsSorted) {
    s = s.replace(new RegExp(`\\s*\\b(${toPattern(kw)})\\b`, "g"), "\n$1");
  }
  s = s.replace(/\s*\b(AND|OR)\b/g, "\n  $1");
  s = s.replace(/\s*\b(ON)\b/g, "\n  $1");
  s = s.replace(/;\s*/g, ";\n");

  const lines = s
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let depth = 0;
  const out: string[] = [];
  for (const line of lines) {
    const opens = (line.match(/\(/g) ?? []).length;
    const closes = (line.match(/\)/g) ?? []).length;
    const indentLevel = line.startsWith(")") ? Math.max(0, depth - 1) : depth;
    out.push("  ".repeat(indentLevel) + line);
    depth = Math.max(0, depth + opens - closes);
  }

  let result = out.join("\n");
  result = result.replace(/__LIT_(\d+)__/g, (_, n: string) => literals[Number(n)] ?? "");
  return result;
}

export default function SqlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const copy = () => output && void import("@/lib/clipboard").then((m) => m.copyToClipboard(output));

  const handleFormat = (minify: boolean) => {
    if (input.length > 500_000) {
      setError("Input too large (max 500 KB)");
      return;
    }
    setError("");
    try {
      if (!input.trim()) {
        setError("Please enter SQL");
        setOutput("");
        return;
      }
      if (minify) {
        setOutput(minifySql(input));
      } else {
        setOutput(formatSql(input));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <ToolPaper>
      <TextField
        label="Paste SQL here"
        multiline
        minRows={8}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`select id, name from users where active = 1 order by name;`}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace" }}
      />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<AutoFixHighIcon />} onClick={() => handleFormat(false)} disabled={!input}>
          Format
        </Button>
        <Button variant="outlined" onClick={() => handleFormat(true)} disabled={!input}>
          Minify
        </Button>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output}>
          Copy
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {output && (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Result
          </Typography>
          <TextField
            value={output}
            multiline
            minRows={8}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Result", spellCheck: false, autoComplete: "off" } }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />
        </Box>
      )}
    </ToolPaper>
  );
}
