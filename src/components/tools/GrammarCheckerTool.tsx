"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

type GrammarIssue = {
  type: string;
  message: string;
  position: number;
  suggestion: string;
  snippet: string;
  index: number;
  length: number;
};

const TYPO_MAP: Record<string, string> = {
  teh: "the",
  recieve: "receive",
};

export default function GrammarCheckerTool() {
  const [text, setText] = useState("");

  const issues = useMemo<GrammarIssue[]>(() => {
    if (!text) return [];
    const list: GrammarIssue[] = [];

    // double spaces: 2 or more consecutive spaces
    for (const m of text.matchAll(/ {2,}/g)) {
      const idx = m.index ?? 0;
      const matched = m[0];
      list.push({
        type: "Double spaces",
        message: "Multiple consecutive spaces found",
        position: idx,
        suggestion: "Replace with a single space",
        snippet: matched.length > 10 ? matched.slice(0, 10) + "…" : JSON.stringify(matched),
        index: idx,
        length: matched.length,
      });
    }

    // repeated words: \b(\w+)\s+\1\b case-insensitive
    for (const m of text.matchAll(/\b(\w+)\s+\1\b/gi)) {
      const idx = m.index ?? 0;
      const matched = m[0];
      const word = m[1] ?? "";
      list.push({
        type: "Repeated word",
        message: `Repeated word "${word}"`,
        position: idx,
        suggestion: `Remove duplicate "${word}"`,
        snippet: matched,
        index: idx,
        length: matched.length,
      });
    }

    // missing capital after period: .\s+[a-z]
    for (const m of text.matchAll(/\.\s+[a-z]/g)) {
      const idx = m.index ?? 0;
      const matched = m[0];
      const char = matched.slice(-1);
      list.push({
        type: "Capitalization",
        message: "Missing capital letter after period",
        position: idx,
        suggestion: `Capitalize "${char}" → "${char.toUpperCase()}"`,
        snippet: JSON.stringify(matched),
        index: idx + matched.length - 1,
        length: 1,
      });
    }

    // double punctuation: same punctuation repeated
    for (const m of text.matchAll(/([.!?,;:])\1+/g)) {
      const idx = m.index ?? 0;
      const matched = m[0];
      list.push({
        type: "Double punctuation",
        message: `Repeated punctuation "${matched}"`,
        position: idx,
        suggestion: `Use single "${m[1]}"`,
        snippet: matched,
        index: idx,
        length: matched.length,
      });
    }

    // common typos: teh -> the, recieve -> receive
    for (const m of text.matchAll(/\b(teh|recieve)\b/gi)) {
      const idx = m.index ?? 0;
      const matched = m[0];
      const lower = matched.toLowerCase();
      const correct = TYPO_MAP[lower] ?? lower;
      // preserve capitalization of first letter if original was capitalized
      const suggestion =
        matched[0] === matched[0].toUpperCase()
          ? correct.charAt(0).toUpperCase() + correct.slice(1)
          : correct;
      list.push({
        type: "Typo",
        message: `Possible typo "${matched}"`,
        position: idx,
        suggestion: `Replace with "${suggestion}"`,
        snippet: matched,
        index: idx,
        length: matched.length,
      });
    }

    // sort by position ascending
    list.sort((a, b) => a.position - b.position);
    return list;
  }, [text]);

  const highlighted = useMemo(() => {
    if (!text) return null;
    if (issues.length === 0) return text;

    // sort by index and filter overlapping
    const sorted = [...issues].sort((a, b) => a.index - b.index);
    const nonOverlapping: GrammarIssue[] = [];
    let lastEnd = -1;
    for (const iss of sorted) {
      if (iss.index >= lastEnd) {
        nonOverlapping.push(iss);
        lastEnd = iss.index + iss.length;
      }
    }

    const nodes: React.ReactNode[] = [];
    let cursor = 0;
    nonOverlapping.forEach((iss, i) => {
      if (iss.index > cursor) {
        nodes.push(<span key={`t-${i}-pre`}>{text.slice(cursor, iss.index)}</span>);
      }
      nodes.push(
        <Box
          key={`h-${i}`}
          component="span"
          sx={{
            bgcolor: "warning.light",
            color: "warning.contrastText",
            px: 0.4,
            py: 0.1,
            borderRadius: 0.5,
            border: "1px solid",
            borderColor: "warning.main",
            fontWeight: 600,
          }}
          title={`${iss.type}: ${iss.suggestion}`}
        >
          {text.slice(iss.index, iss.index + iss.length)}
        </Box>
      );
      cursor = iss.index + iss.length;
    });
    if (cursor < text.length) {
      nodes.push(<span key="tail">{text.slice(cursor)}</span>);
    }
    return <>{nodes}</>;
  }, [text, issues]);

  return (
    <ToolPaper>
      <TextField
        label="Enter text to check"
        multiline
        minRows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here… e.g. This is teh test.  it has double  spaces and has has repeated words!! Also recieve is misspelled.."
        slotProps={{ input: { spellCheck: true } }}
      />

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {text.length} characters · {text.trim() ? text.trim().split(/\s+/).length : 0} words · {issues.length} issue{issues.length !== 1 ? "s" : ""} found
        </Typography>
      </Stack>

      {text && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            minHeight: 96,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "inherit",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Highlighted preview
          </Typography>
          <Box component="div" sx={{ whiteSpace: "pre-wrap" }}>
            {highlighted}
          </Box>
        </Box>
      )}

      {!text ? (
        <Alert severity="info">Enter text above to detect grammar and style issues.</Alert>
      ) : issues.length === 0 ? (
        <Alert severity="success">No issues detected — your text looks good!</Alert>
      ) : (
        <Alert severity="warning">
          Found {issues.length} potential issue{issues.length !== 1 ? "s" : ""}. Review the list below.
        </Alert>
      )}

      {issues.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Issues ({issues.length})
          </Typography>
          <Stack spacing={1.2}>
            {issues.map((iss, idx) => (
              <Box
                key={`${iss.type}-${iss.index}-${idx}`}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      bgcolor: "warning.main",
                      color: "warning.contrastText",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {iss.type}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
                    @ position {iss.position}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "monospace",
                      bgcolor: "background.paper",
                      px: 0.8,
                      py: 0.2,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {iss.snippet}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {iss.message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suggestion: <strong>{iss.suggestion}</strong>
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        Checks: double spaces ( / {" {2,}"} / ), repeated words ({"\\b(\\w+)\\s+\\1\\b"}), missing capital after period ({"\\.\\s+[a-z]"}), double punctuation ({"([.!?,;:])\\1+"}), typos (teh→the, recieve→receive).
      </Typography>
    </ToolPaper>
  );
}
