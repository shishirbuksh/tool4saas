"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";

// Alias to satisfy Progress requirement (MUI LinearProgress)
const Progress = LinearProgress;

// Common words for perplexity proxy (uncommon word ratio)
const COMMON_WORDS = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  "is",
  "are",
  "was",
  "were",
  "been",
  "has",
  "had",
  "are",
  "very",
  "more",
  "much",
]);

function getLikelihoodLabel(score: number): string {
  if (score >= 75) return "Likely AI-generated";
  if (score >= 55) return "Possibly AI";
  if (score >= 35) return "Uncertain / Mixed";
  return "Likely Human-written";
}

function getLikelihoodColor(score: number): "error" | "warning" | "success" | "info" {
  if (score >= 75) return "error";
  if (score >= 55) return "warning";
  if (score >= 35) return "info";
  return "success";
}

export default function AiDetectorTool() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    const wordsRaw = trimmed.split(/\s+/).filter(Boolean);
    const totalWords = wordsRaw.length;

    // Sentences split on .!? and filter
    const rawSentences = trimmed.match(/[^.!?]+[.!?]+/g);
    const sentences = rawSentences
      ? rawSentences.map((s) => s.trim()).filter(Boolean)
      : [trimmed].filter((s) => s.trim().length > 0);

    const sentenceCount = sentences.length || 1;
    const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);

    const avgSentenceLength = totalWords / sentenceCount;

    // avg sentence length variance
    const variance =
      sentenceLengths.length > 0
        ? sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avgSentenceLength, 2), 0) / sentenceLengths.length
        : 0;

    // burstiness (std dev of sentence lengths)
    const burstiness = Math.sqrt(variance);

    // repetition score: 1 - unique/total (lower lexical diversity = more repetition)
    const normalizedWords = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const totalNormalized = normalizedWords.length || 1;
    const uniqueCount = new Set(normalizedWords).size;
    const repetitionScore = 1 - uniqueCount / totalNormalized;

    // perplexity proxy via uncommon word ratio
    const uncommonCount = normalizedWords.filter((w) => !COMMON_WORDS.has(w)).length;
    const uncommonWordRatio = totalNormalized ? uncommonCount / totalNormalized : 0;
    // perplexity proxy: higher uncommon ratio = higher perplexity (more human-like)
    const perplexityProxy = uncommonWordRatio;

    // Heuristic signals (0..1 where 1 = more AI-like)
    // Burstiness: low burstiness -> AI
    const burstinessSignal = Math.max(0, Math.min(1, 1 - burstiness / 8));
    // Variance: low variance -> AI
    const varianceSignal = Math.max(0, Math.min(1, 1 - variance / 35));
    // Repetition: high repetition -> AI (threshold 0.35 = strong repetition)
    const repetitionSignal = Math.max(0, Math.min(1, repetitionScore / 0.35));
    // Perplexity proxy: low uncommon ratio -> AI
    const perplexitySignal = Math.max(0, Math.min(1, 1 - uncommonWordRatio * 2.2));

    // Weighted AI likelihood %
    const weighted =
      burstinessSignal * 0.3 + varianceSignal * 0.2 + repetitionSignal * 0.2 + perplexitySignal * 0.3;
    let likelihood = Math.round(weighted * 100);

    // Adjust for very short texts - reduce confidence toward 50 (uncertain)
    if (totalWords < 40) {
      // pull toward 50
      likelihood = Math.round(likelihood * 0.6 + 50 * 0.4);
    } else if (totalWords < 80) {
      likelihood = Math.round(likelihood * 0.85 + 50 * 0.15);
    }

    likelihood = Math.max(0, Math.min(100, likelihood));

    return {
      totalWords,
      sentenceCount,
      avgSentenceLength,
      variance,
      burstiness,
      repetitionScore,
      uncommonWordRatio,
      perplexityProxy,
      likelihood,
      burstinessSignal,
      varianceSignal,
      repetitionSignal,
      perplexitySignal,
    };
  }, [text]);

  const hasText = text.trim().length > 0;
  const likelihood = analysis?.likelihood ?? 0;
  const likelihoodColor = analysis ? getLikelihoodColor(likelihood) : "info";
  const likelihoodLabel = analysis ? getLikelihoodLabel(likelihood) : "—";

  return (
    <ToolPaper>
      <TextField
        label="Paste text to analyze"
        multiline
        minRows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article, essay, or paragraph here to estimate AI likelihood…"
        slotProps={{ input: { spellCheck: true } }}
      />

      <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="body2" color="text.secondary">
          {hasText ? `${analysis?.totalWords ?? 0} words · ${analysis?.sentenceCount ?? 0} sentences` : "Enter text above for heuristic analysis"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {hasText ? `Avg length: ${analysis?.avgSentenceLength.toFixed(1) ?? "—"} words/sentence` : ""}
        </Typography>
      </Stack>

      {!hasText ? (
        <Alert severity="info">
          Enter text to analyze. This detector uses heuristic signals — avg sentence length variance, burstiness, repetition score, and perplexity proxy via uncommon word ratio — to estimate AI likelihood.
        </Alert>
      ) : (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={2.5}>
            {/* AI Likelihood */}
            <Box>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  AI likelihood
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {likelihoodLabel}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: `${likelihoodColor}.main` }}>
                  {likelihood}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {likelihood >= 55 ? "Higher = more AI-like" : "Lower = more human-like"}
                </Typography>
              </Stack>
              <Progress
                variant="determinate"
                value={likelihood}
                color={likelihoodColor}
                sx={{ height: 10, borderRadius: 999 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                {likelihood >= 75
                  ? "Text shows uniform structure and low perplexity typical of AI output — but verify manually."
                  : likelihood >= 55
                    ? "Mixed signals — some uniformity, some human-like variation."
                    : likelihood >= 35
                      ? "Moderate variation — uncertain, lean human."
                      : "High burstiness and lexical diversity — suggests human writing."}
              </Typography>
            </Box>

            {/* Metrics grid */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Avg sentence length variance
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {analysis?.variance.toFixed(2) ?? "—"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Variance = Σ(len−mean)² / n. Low variance → uniform → more AI-like.
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Burstiness (std dev)
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {analysis?.burstiness.toFixed(2) ?? "—"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Std dev of sentence lengths. High burstiness → human-like.
                </Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Repetition score
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {analysis ? `${(analysis.repetitionScore * 100).toFixed(1)}%` : "—"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  1 − unique/total words. High repetition → more AI-like.
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Progress
                    variant="determinate"
                    value={Math.min(100, analysis ? analysis.repetitionScore * 100 : 0)}
                    color={analysis && analysis.repetitionScore > 0.25 ? "warning" : "success"}
                    sx={{ height: 6, borderRadius: 999 }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Perplexity proxy
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {analysis ? `${(analysis.perplexityProxy * 100).toFixed(1)}%` : "—"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Uncommon word ratio = uncommon/total. Low ratio → low perplexity → more AI-like.
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Progress
                    variant="determinate"
                    value={Math.min(100, analysis ? analysis.perplexityProxy * 100 : 0)}
                    color={analysis && analysis.perplexityProxy < 0.35 ? "warning" : "success"}
                    sx={{ height: 6, borderRadius: 999 }}
                  />
                </Box>
              </Box>
            </Stack>

            {/* Detailed breakdown */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                p: 1.5,
                borderRadius: 1.5,
                border: "1px dashed",
                borderColor: "divider",
                bgcolor: "background.default",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                uncommon word ratio: <strong>{analysis?.uncommonWordRatio.toFixed(3) ?? "—"}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • burstiness signal: <strong>{analysis ? `${(analysis.burstinessSignal * 100).toFixed(0)}%` : "—"}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • variance signal: <strong>{analysis ? `${(analysis.varianceSignal * 100).toFixed(0)}%` : "—"}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • repetition signal: <strong>{analysis ? `${(analysis.repetitionSignal * 100).toFixed(0)}%` : "—"}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • perplexity signal: <strong>{analysis ? `${(analysis.perplexitySignal * 100).toFixed(0)}%` : "—"}</strong>
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <Alert severity="warning" sx={{ mt: 1 }}>
        Heuristic only, not for academic decisions. This detector is an approximate heuristic based on burstiness, variance, repetition, and perplexity proxy — it is not a reliable AI classifier and must not be used for grading or disciplinary action.
      </Alert>

      <Typography variant="caption" color="text.secondary">
        Heuristic: burstiness = std dev of sentence lengths; variance = mean squared deviation of sentence lengths; repetition score = 1 − (unique words / total words); perplexity proxy via uncommon word ratio (words outside top-100 common list). Weighted likelihood ≈ 0.3×burstiness + 0.2×variance + 0.2×repetition + 0.3×perplexity; short texts pulled toward 50% (uncertain).
      </Typography>
    </ToolPaper>
  );
}
