
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { TextField, Typography, Box, Stack, Alert } from "@/components/ds";


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
          className="px-0.8 py-0.2 rounded-[4px] border border-warning font-semibold" style={{ backgroundColor: "color-mix(in oklab, var(--color-warning) 15%, var(--color-base-100))", color: "var(--color-warning-content)" }}
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

      <Stack direction="row" spacing={2} className="items-center">
        <Typography variant="body2" color="text.secondary">
          {text.length} characters · {text.trim() ? text.trim().split(/\s+/).length : 0} words · {issues.length} issue{issues.length !== 1 ? "s" : ""} found
        </Typography>
      </Stack>

      {text && (
        <Box
          className="p-4 rounded-[16px] border border-base-300 bg-base-100 min-h-[96px] whitespace-pre-wrap break-words text-[14px] leading-[1.7]" style={{ fontFamily: "inherit" }}
        >
          <Typography variant="subtitle2" className="font-bold mb-2">
            Highlighted preview
          </Typography>
          <Box component="div" className="whitespace-pre-wrap">
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
          <Typography variant="subtitle2" className="font-bold mb-3">
            Issues ({issues.length})
          </Typography>
          <Stack spacing={1.2}>
            {issues.map((iss, idx) => (
              <Box
                key={`${iss.type}-${iss.index}-${idx}`}
                className="p-3 rounded-[16px] border border-base-300 flex flex-col gap-1" style={{ backgroundColor: "color-mix(in oklab, var(--color-base-content) 6%, transparent)" }}
              >
                <Stack direction="row" spacing={1} className="items-center flex-wrap gap-2">
                  <Box
                    className="px-2 py-0.4 rounded-[8px] bg-warning text-[11px] font-bold uppercase tracking-[0.5px]" style={{ color: "var(--color-warning-content)" }}
                  >
                    {iss.type}
                  </Box>
                  <Typography variant="caption" color="text.secondary" style={{ fontFamily: "monospace" }}>
                    @ position {iss.position}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="bg-base-100 px-1.6 py-0.4 rounded-[8px] border border-base-300" style={{ fontFamily: "monospace" }}
                  >
                    {iss.snippet}
                  </Typography>
                </Stack>
                <Typography variant="body2" className="font-semibold">
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
