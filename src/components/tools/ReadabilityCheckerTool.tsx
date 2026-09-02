"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  // Count vowel groups as syllables (approx)
  const groups = w.match(/[aeiouy]+/g);
  let count = groups ? groups.length : 0;
  // Remove silent trailing 'e'
  if (w.endsWith("e")) count -= 1;
  // Handle -le ending (e.g., "table" -> extra syllable)
  if (w.endsWith("le") && w.length > 2 && !/[aeiouy]/.test(w[w.length - 3]!)) {
    count += 1;
  }
  return Math.max(1, count);
}

function getFleschEaseLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}

function getGradeLabel(grade: number): string {
  if (grade < 1) return "Below 1st grade";
  if (grade <= 6) return "Elementary";
  if (grade <= 8) return "Middle School";
  if (grade <= 12) return "High School";
  if (grade <= 16) return "College";
  return "College Graduate";
}

export default function ReadabilityCheckerTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        wordCount: 0,
        sentenceCount: 0,
        syllableCount: 0,
        avgSentenceLength: 0,
        avgSyllablesPerWord: 0,
        fleschEase: 0,
        fleschKincaid: 0,
      };
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Sentences: split on . ! ? and filter non-empty
    const sentenceParts = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentenceParts.length || 1;

    let syllableCount = 0;
    for (const w of words) {
      syllableCount += countSyllables(w);
    }

    const avgSentenceLength = sentenceCount ? wordCount / sentenceCount : 0;
    const avgSyllablesPerWord = wordCount ? syllableCount / wordCount : 0;

    // Flesch Reading Ease: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
    const fleschEase = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
    // Flesch-Kincaid Grade Level: 0.39*(words/sentences) + 11.8*(syllables/words) - 15.59
    const fleschKincaid = 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;

    return {
      wordCount,
      sentenceCount,
      syllableCount,
      avgSentenceLength,
      avgSyllablesPerWord,
      fleschEase,
      fleschKincaid,
    };
  }, [text]);

  const hasText = text.trim().length > 0;

  const easeColor =
    !hasText
      ? "text.secondary"
      : stats.fleschEase >= 60
        ? "success.main"
        : stats.fleschEase >= 30
          ? "warning.main"
          : "error.main";

  const gradeColor =
    !hasText
      ? "text.secondary"
      : stats.fleschKincaid <= 8
        ? "success.main"
        : stats.fleschKincaid <= 12
          ? "warning.main"
          : "error.main";

  const avgLengthColor =
    !hasText
      ? "text.secondary"
      : stats.avgSentenceLength <= 15
        ? "success.main"
        : stats.avgSentenceLength <= 20
          ? "warning.main"
          : "error.main";

  return (
    <ToolPaper>
      <TextField
        label="Enter your text"
        multiline
        minRows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your article, essay, or paragraph here to check readability…"
        slotProps={{ input: { spellCheck: true } }}
      />

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
          Readability Scores
        </Typography>

        <Stack spacing={2}>
          {/* Flesch Reading Ease */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              p: 1.5,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "divider",
              borderLeft: "4px solid",
              borderLeftColor: easeColor,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Flesch Reading Ease
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {hasText ? getFleschEaseLabel(stats.fleschEase) : "—"}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: easeColor }}>
              {hasText ? stats.fleschEase.toFixed(1) : "—"}
            </Typography>
          </Box>

          {/* Flesch-Kincaid Grade Level */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              p: 1.5,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "divider",
              borderLeft: "4px solid",
              borderLeftColor: gradeColor,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Flesch-Kincaid Grade Level
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {hasText ? getGradeLabel(stats.fleschKincaid) : "—"}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: gradeColor }}>
              {hasText ? stats.fleschKincaid.toFixed(1) : "—"}
            </Typography>
          </Box>

          {/* Supporting stats */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "primary.main",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {stats.wordCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Words
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: "info.main",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {stats.syllableCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Syllables
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                borderTop: "3px solid",
                borderTopColor: avgLengthColor,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: avgLengthColor }}>
                {hasText ? stats.avgSentenceLength.toFixed(1) : "—"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Avg Words / Sentence
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", px: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Sentences: <strong>{stats.sentenceCount}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Avg Syllables / Word: <strong>{hasText ? stats.avgSyllablesPerWord.toFixed(2) : "—"}</strong>
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Typography variant="caption" color="text.secondary">
        Flesch Reading Ease: 206.835 − 1.015×(words/sentences) − 84.6×(syllables/words) · Flesch-Kincaid Grade: 0.39×(words/sentences) + 11.8×(syllables/words) − 15.59 · Syllables approximated via vowel groups.
      </Typography>
    </ToolPaper>
  );
}
