
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, TextField, Typography, Stack, Chip } from "@/components/ds";


const STOP = new Set([
  "the","a","an","and","or","but","of","to","in","on","at","for","with","is","are","was","were","be","been","being","it","this","that","these","those","as","by","from","your","you","we","they","he","she","i","me","my","our","their","his","her","them","what","which","who","how","why","when","where","can","will","would","should","could","do","does","did","not","no","yes","if","then","than","so","just","about","into","out","up","down","over","under","again","more","most","other","some","such","only","own","same","too","very",
]);

export default function KeywordDensityTool() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("15");

  const data = useMemo(() => {
    if (!text.trim()) return [];
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w && !STOP.has(w) && w.length > 1);
    const total = words.length;
    const counts = new Map<string, number>();
    for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const n = Math.max(1, parseInt(limit, 10) || 15);
    return sorted.slice(0, n).map(([word, count]) => ({
      word,
      count,
      pct: total ? (count / total) * 100 : 0,
    }));
  }, [text, limit]);

  return (
    <ToolPaper>
        <TextField
          label="Your text"
          multiline
          minRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste an article or paragraph to analyze word frequency…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
        <TextField
          label="Show top N words"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="max-w-[200px]"
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <Box>
          <Typography variant="subtitle2" className="font-bold mb-2">
            Top words by frequency
          </Typography>
          {data.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Enter text to see keyword density.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {data.map((d) => (
                <Box
                  key={d.word}
                  className="flex items-center justify-between gap-4"
                >
                  <Box className="min-w-[140px]">
                    <Typography variant="body2" className="font-semibold">
                      {d.word}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {d.count} {d.count === 1 ? "time" : "times"}
                    </Typography>
                  </Box>
                  <Box className="flex-1">
                    <Box
                      className="h-[8px] rounded-[7992px] opacity-[0.7]" style={{ background: "var(--color-primary)", width: `${Math.min(100, d.pct * 4)}%` }}
                    />
                  </Box>
                  <Chip label={`${d.pct.toFixed(1)}%`} size="small" variant="outlined" />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </ToolPaper>
  );
}
