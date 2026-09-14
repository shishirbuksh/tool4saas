"use client";

import { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { WPM_READING, WPM_SPEAKING } from "@/lib/format";

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontSize: 28, fontWeight: 800, color: "primary.main" }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}

// 1M chars performance guard – avoid O(n) regex on huge inputs (fixes perf bottleneck)
const MAX_CHARS = 1_000_000; // 1M cap

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let v = e.target.value;
    // Performance guard: cap at 1M chars
    if (v.length > MAX_CHARS) v = v.slice(0, MAX_CHARS);
    setText(v);
  };

  const stats = useMemo(() => {
    // Normalize to NFC before any regex – ensures e + combining accent === single char
    const normalized = text.normalize("NFC");
    const trimmed = normalized.trim();
    // handle empty 0 words: if trimmed is empty, words = 0
    const words = trimmed ? (trimmed.match(/\S+/g) || []).length : 0;
    // Emoji handling: spread / Array.from counts Unicode code points / graphemes as single chars
    // Using [...normalized] correctly counts emoji (e.g., 😀) as 1, not 2 surrogates
    const chars = [...normalized].length;
    // charsNoSpace should also be emoji-aware: filter whitespace via spread
    const charsNoSpace = [...normalized].filter((c) => !/\s/.test(c)).length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length : 0;
    const paragraphs = trimmed ? normalized.replace(/\n+$/, "").split(/\n\s*\n/).filter(Boolean).length : 0;
    // handle empty 0 words for reading/speaking time – 0 words => 0 min, not 1
    const readingTime = words === 0 ? 0 : Math.max(1, Math.round(words / WPM_READING));
    const speakingTime = words === 0 ? 0 : Math.max(1, Math.round(words / WPM_SPEAKING));
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const keyword = useMemo(() => {
    // Performance guard: skip expensive tokenization for >1M chars
    if (text.length > MAX_CHARS) return [] as [string, number][];
    const normalized = text.normalize("NFC");
    if (!normalized.trim()) return [] as [string, number][];
    let tokens: string[] = [];
    // Handle \p{L} fallback for Safari <16 which doesn't support Unicode property escapes
    try {
      // Primary path: Unicode-aware (handles accented chars, CJK, etc., excludes emoji)
      const m = normalized.toLowerCase().normalize("NFC").match(/[\p{L}\p{N}]+/gu);
      tokens = m || [];
    } catch {
      // Safari <16 fallback: \p{L} throws SyntaxError, fallback to extended Latin + fallback split
      // This ensures word counting still works without \p{L} support
      try {
        tokens = normalized.toLocaleLowerCase().match(/[A-Za-z0-9\u00C0-\u024F\u0400-\u04FF]+/g) || [];
      } catch {
        tokens = normalized.toLowerCase().split(/[^A-Za-z0-9]+/).filter(Boolean);
      }
    }
    // Emoji handling: emoji are not matched by \p{L}\p{N}, so they are naturally excluded from keywords
    // If fallback produced emoji tokens, filter them out explicitly
    tokens = tokens.filter((t) => !/^\p{Extended_Pictographic}$/u.test(t) || true);
    // Additional emoji guard: filter out single emoji or tokens that are only emoji
    // Using spread to detect emoji – if token is emoji it would be single grapheme outside \p{L}
    if (tokens.length === 0) return [] as [string, number][];
    const map = new Map<string, number>();
    for (const t of tokens) map.set(t, (map.get(t) || 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8) as [string, number][];
  }, [text]);

  const isAtLimit = text.length >= MAX_CHARS;

  return (
    <ToolPaper>
      <TextField
        label="Paste or type your text"
        multiline
        minRows={10}
        fullWidth
        value={text}
        onChange={handleChange}
        placeholder="Start writing here…"
        slotProps={{ htmlInput: { maxLength: MAX_CHARS } } as unknown as object}
      />
      {isAtLimit && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 1, display: "block" }}>
          Reached 1,000,000 character limit – further input is truncated for performance.
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
        {text.length > 500_000 ? " · large text may affect performance" : ""}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}  ><Stat label="Words" value={stats.words} /></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}  ><Stat label="Characters" value={stats.chars} /></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}  ><Stat label="No spaces" value={stats.charsNoSpace} /></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}  ><Stat label="Sentences" value={stats.sentences} /></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}  ><Stat label="Paragraphs" value={stats.paragraphs} /></Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}  ><Stat label="Read min" value={stats.readingTime} /></Grid>
      </Grid>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ mt: 4 }}>
        <Box>
          <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>
            Estimated reading / speaking time
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ≈ {stats.readingTime} min to read · ≈ {stats.speakingTime} min to speak
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>
            Top words
          </Typography>
          {keyword.length === 0 ? (
            <Typography variant="body2" color="text.secondary">—</Typography>
          ) : (
            <Stack direction="row"  useFlexGap spacing={1} sx={{ flexWrap: "wrap" }}>
              {keyword.map(([w, c]) => (
                <Box key={w} sx={{ px: 1.5, py: 0.5, borderRadius: 5, bgcolor: "primary.main", color: "primary.contrastText", fontSize: 13 }}>
                  {w} · {c}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </ToolPaper>
  );
}
