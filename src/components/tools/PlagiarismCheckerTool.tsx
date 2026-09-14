"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const N = 5;

function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getWords(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function getNormalizedWords(text: string): string[] {
  return getWords(text)
    .map(normalizeWord)
    .filter(Boolean);
}

function getNGrams(words: string[], n: number): string[] {
  if (words.length < n) return [];
  const grams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    grams.push(words.slice(i, i + n).join(" "));
  }
  return grams;
}

function getDisplayNGrams(text: string, n: number): { normalized: string; display: string }[] {
  const rawWords = getWords(text);
  if (rawWords.length < n) return [];
  const normalizedWords = rawWords.map(normalizeWord);
  const result: { normalized: string; display: string }[] = [];
  for (let i = 0; i <= rawWords.length - n; i++) {
    const sliceRaw = rawWords.slice(i, i + n);
    const sliceNorm = normalizedWords.slice(i, i + n);
    // skip n-grams that are mostly empty after normalization (e.g., pure punctuation)
    if (sliceNorm.some((w) => !w)) continue;
    result.push({
      normalized: sliceNorm.join(" "),
      display: sliceRaw.join(" "),
    });
  }
  return result;
}

export default function PlagiarismCheckerTool() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");

  const result = useMemo(() => {
    const words = getWords(text);
    const wordCount = words.length;
    const normalizedWords = getNormalizedWords(text);
    const totalNGrams = Math.max(0, normalizedWords.length - N + 1);

    if (totalNGrams === 0) {
      return {
        wordCount,
        totalNGrams: 0,
        uniqueCount: 0,
        duplicatePhrases: [] as { phrase: string; count: number }[],
        duplicateInstances: 0,
        internalUniqueness: wordCount === 0 ? 0 : 100,
        sourceWordCount: getWords(source).length,
        sourceTotalNGrams: 0,
        matchedPhrases: [] as { phrase: string; count: number }[],
        matchedInstances: 0,
        uniqueness: wordCount === 0 ? 0 : 100,
        hasEnoughWords: false,
      };
    }

    const displayGrams = getDisplayNGrams(text, N);
    // Map normalized -> { count, display }
    const countMap = new Map<string, { count: number; display: string }>();
    for (const g of displayGrams) {
      const existing = countMap.get(g.normalized);
      if (existing) existing.count += 1;
      else countMap.set(g.normalized, { count: 1, display: g.display });
    }

    const duplicatePhrases: { phrase: string; count: number }[] = [];
    let duplicateInstances = 0;
    for (const { count, display } of countMap.values()) {
      if (count > 1) {
        duplicatePhrases.push({ phrase: display, count });
        duplicateInstances += count - 1;
      }
    }
    duplicatePhrases.sort((a, b) => b.count - a.count);

    const uniqueCount = countMap.size;
    const internalUniqueness = totalNGrams > 0 ? ((totalNGrams - duplicateInstances) / totalNGrams) * 100 : 100;

    // Source comparison
    const sourceWords = getNormalizedWords(source);
    const sourceTotalNGrams = Math.max(0, sourceWords.length - N + 1);
    const sourceGrams = getNGrams(sourceWords, N);
    const sourceSet = new Set(sourceGrams);

    let matchedPhrases: { phrase: string; count: number }[] = [];
    let matchedInstances = 0;

    if (source.trim() && sourceSet.size > 0) {
      const matchedMap = new Map<string, { count: number; display: string }>();
      for (const g of displayGrams) {
        if (sourceSet.has(g.normalized)) {
          const ex = matchedMap.get(g.normalized);
          if (ex) ex.count += 1;
          else matchedMap.set(g.normalized, { count: 1, display: g.display });
        }
      }
      matchedPhrases = [...matchedMap.values()]
        .map((v) => ({ phrase: v.display, count: v.count }))
        .sort((a, b) => b.count - a.count);
      matchedInstances = displayGrams.filter((g) => sourceSet.has(g.normalized)).length;
    }

    // Combined uniqueness: penalize both internal duplicates and source matches
    // Avoid double-counting n-grams that are both duplicate and source-matched by taking max overlap
    // Simple approach: uniqueness = 100 - ((duplicateInstances + matchedInstances) / total * 100)
    // Clamped to 0-100. If source empty, falls back to internalUniqueness.
    let uniqueness: number;
    if (source.trim() && sourceSet.size > 0) {
      // Use union logic: count distinct n-gram positions that are either duplicate (beyond first) or matched
      // To avoid over-penalizing, we count every n-gram instance that is either a duplicate occurrence or a source match,
      // but if an n-gram is both duplicate and matched, it still counts as 1 plagiarized instance per occurrence.
      const duplicateNormalized = new Set(
        [...countMap.entries()].filter(([, v]) => v.count > 1).map(([k]) => k)
      );
      let plagiarizedInstances = 0;
      const seenForDuplicate = new Map<string, number>();
      for (const g of displayGrams) {
        const occ = (seenForDuplicate.get(g.normalized) ?? 0) + 1;
        seenForDuplicate.set(g.normalized, occ);
        const isDuplicateOccurrence = duplicateNormalized.has(g.normalized) && occ > 1;
        const isSourceMatch = sourceSet.has(g.normalized);
        if (isDuplicateOccurrence || isSourceMatch) plagiarizedInstances += 1;
      }
      uniqueness = Math.max(0, Math.min(100, ((totalNGrams - plagiarizedInstances) / totalNGrams) * 100));
    } else {
      uniqueness = internalUniqueness;
    }

    return {
      wordCount,
      totalNGrams,
      uniqueCount,
      duplicatePhrases,
      duplicateInstances,
      internalUniqueness,
      sourceWordCount: getWords(source).length,
      sourceTotalNGrams,
      matchedPhrases,
      matchedInstances,
      uniqueness,
      hasEnoughWords: true,
    };
  }, [text, source]);

  const hasText = text.trim().length > 0;
  const uniquenessColor =
    !hasText || !result.hasEnoughWords
      ? "text.secondary"
      : result.uniqueness >= 90
        ? "success.main"
        : result.uniqueness >= 70
          ? "warning.main"
          : "error.main";

  const uniquenessLabel =
    !hasText || !result.hasEnoughWords
      ? "—"
      : result.uniqueness >= 90
        ? "Looks unique"
        : result.uniqueness >= 70
          ? "Some repetition"
          : "High repetition";

  return (
    <ToolPaper>
      <TextField
        label="Your text to check"
        multiline
        minRows={8}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Paste your article, essay or paragraph here (at least ${N} words)… Example: The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog is a famous pangram.`}
        slotProps={{ input: { spellCheck: true } }}
        helperText={`${result.wordCount} words · ${result.totalNGrams} ${N}-grams · ${result.duplicateInstances} duplicate instance${result.duplicateInstances !== 1 ? "s" : ""}`}
      />

      <TextField
        label="Source / reference text (optional)"
        multiline
        minRows={6}
        fullWidth
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Paste the source text to compare against (optional). If provided, matching 5-word phrases will be flagged as overlap."
        slotProps={{ input: { spellCheck: true } }}
        helperText={
          source.trim()
            ? `${result.sourceWordCount} words · ${result.sourceTotalNGrams} ${N}-grams in source · ${result.matchedInstances} matching instance${result.matchedInstances !== 1 ? "s" : ""} found`
            : `Compare against a second text to detect cross-document overlap using ${N}-word n-grams`
        }
      />

      {/* Summary stats */}
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
          Plagiarism Heuristic Results
        </Typography>

        <Stack spacing={2}>
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
              borderLeftColor: uniquenessColor,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                % Uniqueness
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {uniquenessLabel} · {N}-gram heuristic
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: uniquenessColor }}>
              {hasText && result.hasEnoughWords ? `${result.uniqueness.toFixed(1)}%` : "—"}
            </Typography>
          </Box>

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
                {result.totalNGrams}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total {N}-grams
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
                borderTopColor: result.duplicatePhrases.length ? "warning.main" : "success.main",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: result.duplicatePhrases.length ? "warning.main" : "success.main" }}
              >
                {result.duplicatePhrases.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Duplicate phrases
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
                borderTopColor: result.matchedPhrases.length ? "error.main" : "info.main",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: result.matchedPhrases.length ? "error.main" : "text.primary" }}
              >
                {source.trim() ? result.matchedPhrases.length : "—"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Source matches
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", px: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Unique {N}-grams: <strong>{result.uniqueCount}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Words: <strong>{result.wordCount}</strong>
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {!hasText ? (
        <Alert severity="info">Enter at least {N} words to run the n-gram heuristic. Duplicate {N}-word phrases within your text will be flagged.</Alert>
      ) : !result.hasEnoughWords ? (
        <Alert severity="warning">
          Not enough words — need at least {N} words to form a {N}-gram. Currently {result.wordCount} word
          {result.wordCount !== 1 ? "s" : ""}.
        </Alert>
      ) : result.duplicatePhrases.length === 0 && result.matchedPhrases.length === 0 ? (
        <Alert severity="success">No duplicate {N}-word phrases detected. Your text looks unique under this heuristic!</Alert>
      ) : (
        <Alert severity={result.matchedPhrases.length > 0 ? "error" : "warning"}>
          Found {result.duplicatePhrases.length} duplicate phrase{result.duplicatePhrases.length !== 1 ? "s" : ""} internally
          {source.trim() ? ` and ${result.matchedPhrases.length} phrase${result.matchedPhrases.length !== 1 ? "s" : ""} matching the source` : ""}.
          Uniqueness: {result.uniqueness.toFixed(1)}%.
        </Alert>
      )}

      {/* Duplicate phrases list */}
      {hasText && result.hasEnoughWords && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Duplicate phrases within text ({result.duplicatePhrases.length})
          </Typography>
          {result.duplicatePhrases.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No repeated {N}-word sequences found internally.
            </Typography>
          ) : (
            <Stack spacing={1.2}>
              {result.duplicatePhrases.slice(0, 50).map((d, idx) => (
                <Box
                  key={`${d.phrase}-${idx}`}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "warning.light",
                    bgcolor: "warning.light",
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
                      ×{d.count}
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
                      {N}-gram
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "monospace",
                      bgcolor: "background.paper",
                      px: 1,
                      py: 0.6,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      wordBreak: "break-word",
                    }}
                  >
                    &ldquo;{d.phrase}&rdquo;
                  </Typography>
                </Box>
              ))}
              {result.duplicatePhrases.length > 50 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  ...and {result.duplicatePhrases.length - 50} more
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      )}

      {/* Source matches list */}
      {source.trim() && result.hasEnoughWords && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Matching phrases vs source ({result.matchedPhrases.length})
          </Typography>
          {result.sourceTotalNGrams === 0 ? (
            <Alert severity="warning">Source text needs at least {N} words to compare.</Alert>
          ) : result.matchedPhrases.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No {N}-word overlap with the source text.
            </Typography>
          ) : (
            <Stack spacing={1.2}>
              {result.matchedPhrases.slice(0, 50).map((m, idx) => (
                <Box
                  key={`${m.phrase}-${idx}`}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "error.light",
                    bgcolor: "error.light",
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
                        bgcolor: "error.main",
                        color: "error.contrastText",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {m.count} match{m.count !== 1 ? "es" : ""}
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
                      {N}-gram overlap
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "monospace",
                      bgcolor: "background.paper",
                      px: 1,
                      py: 0.6,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      wordBreak: "break-word",
                    }}
                  >
                    &ldquo;{m.phrase}&rdquo;
                  </Typography>
                </Box>
              ))}
              {result.matchedPhrases.length > 50 && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  ...and {result.matchedPhrases.length - 50} more
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      )}

      <Alert severity="info" sx={{ fontSize: 12 }}>
        <Typography variant="caption" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
          Disclaimer: Heuristic only — not a real plagiarism detector
        </Typography>
        <Typography variant="caption" component="div" color="text.secondary">
          This tool uses a simple {N}-word n-gram overlap heuristic on your local device. It only detects verbatim
          {` ${N}-word `} repetitions within your text and exact overlap with the optional source you paste. It does
          not search the web, databases, or paraphrased content and should not be used as proof of originality or
          plagiarism for academic or legal purposes.
        </Typography>
      </Alert>

      <Typography variant="caption" color="text.secondary">
        Method: tokenize on whitespace, normalize to lowercase alphanumeric, split into {N}-grams (sliding window), count
        duplicates within text and intersection with source n-grams. Uniqueness = 100 × (1 − plagiarized instances /
        total {N}-grams), where plagiarized = duplicate occurrences beyond the first + source-matched instances.
      </Typography>
    </ToolPaper>
  );
}
