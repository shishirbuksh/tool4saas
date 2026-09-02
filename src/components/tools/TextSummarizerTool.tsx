"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/lib/clipboard";

export default function TextSummarizerTool() {
  const [text, setText] = useState("");
  const [ratio, setRatio] = useState(30);
  const [copied, setCopied] = useState(false);

  const { summary, sentencesCount, summaryCount } = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { summary: "", sentencesCount: 0, summaryCount: 0 };
    }

    // Extract sentences preserving punctuation
    const raw = trimmed.match(/[^.!?]+[.!?]+/g);
    const sentences = raw
      ? raw.map((s) => s.trim()).filter(Boolean)
      : [trimmed];

    const total = sentences.length;
    if (total === 0) {
      return { summary: "", sentencesCount: 0, summaryCount: 0 };
    }

    // Word frequency: split words, count
    const words = trimmed.toLowerCase().split(/\W+/).filter(Boolean);
    const freq = new Map<string, number>();
    for (const w of words) {
      freq.set(w, (freq.get(w) ?? 0) + 1);
    }

    // Score sentences by sum of word frequencies
    const scored = sentences.map((sentence, index) => {
      const sWords = sentence.toLowerCase().split(/\W+/).filter(Boolean);
      let score = 0;
      for (const w of sWords) {
        score += freq.get(w) ?? 0;
      }
      return { sentence, score, index };
    });

    // Pick top N sentences by score, then restore original order
    const n = Math.max(1, Math.ceil((total * ratio) / 100));
    const topN = Math.min(n, total);

    const topByScore = [...scored]
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .sort((a, b) => a.index - b.index);

    const result = topByScore.map((s) => s.sentence).join(" ");

    return {
      summary: result,
      sentencesCount: total,
      summaryCount: topByScore.length,
    };
  }, [text, ratio]);

  const handleCopy = async () => {
    if (!summary) return;
    const ok = await copyToClipboard(summary);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  return (
    <ToolPaper>
      <TextField
        label="Text to summarize"
        multiline
        minRows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article, essay, or paragraph here to summarize…"
        slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
      />

      <Box sx={{ maxWidth: 400 }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Summary length
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {ratio}%
          </Typography>
        </Stack>
        <Slider
          value={ratio}
          min={10}
          max={50}
          step={5}
          marks={[
            { value: 10, label: "10%" },
            { value: 30, label: "30%" },
            { value: 50, label: "50%" },
          ]}
          valueLabelDisplay="auto"
          onChange={(_, v) => setRatio(v as number)}
          aria-label="Summary ratio"
        />
        <Typography variant="caption" color="text.secondary">
          Ratio of sentences to keep (extractive). {sentencesCount > 0 ? `${summaryCount} of ${sentencesCount} sentences selected.` : ""}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          disabled={!summary}
        >
          Copy summary
        </Button>
        <Button variant="outlined" onClick={handleClear} disabled={!text}>
          Clear
        </Button>
      </Stack>

      {copied && (
        <Alert severity="success" onClose={() => setCopied(false)}>
          Summary copied to clipboard!
        </Alert>
      )}

      {!text.trim() ? (
        <Alert severity="info">Enter text above to generate a summary. The summarizer uses word-frequency scoring to pick the most representative sentences.</Alert>
      ) : (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Summary
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {summaryCount} of {sentencesCount} sentences · {ratio}%
            </Typography>
          </Stack>
          <TextField
            value={summary}
            multiline
            minRows={5}
            fullWidth
            placeholder="Summary will appear here…"
            slotProps={{
              input: { readOnly: true, "aria-label": "Summary output", spellCheck: false },
            }}
            sx={{ "& textarea": { lineHeight: 1.6 } }}
          />
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        Extractive summarization: word frequencies are counted, each sentence is scored by the sum of its word frequencies, and the top N sentences (N = ratio% of total) are returned in original order.
      </Typography>
    </ToolPaper>
  );
}
