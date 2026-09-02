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

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length : 0;
    const paragraphs = trimmed ? text.replace(/\n+$/, "").split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingTime = Math.max(1, Math.round(words / WPM_READING));
    const speakingTime = Math.max(1, Math.round(words / WPM_SPEAKING));
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const keyword = useMemo(() => {
    const map = new Map<string, number>();
    const tokens = text.toLowerCase().match(/[a-z']+/g) || [];
    for (const t of tokens) map.set(t, (map.get(t) || 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [text]);

  return (
    <ToolPaper>
      <TextField
        label="Paste or type your text"
        multiline
        minRows={10}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing here…"
      />
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
