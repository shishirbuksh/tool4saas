"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "of",
  "to",
  "in",
  "on",
  "at",
  "for",
  "with",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "it",
  "this",
  "that",
  "these",
  "those",
  "as",
  "by",
  "from",
  "your",
  "you",
  "we",
  "they",
  "he",
  "she",
  "i",
  "me",
  "my",
  "our",
  "their",
  "his",
  "her",
  "them",
  "what",
  "which",
  "who",
  "how",
  "why",
  "when",
  "where",
  "can",
  "will",
  "would",
  "should",
  "could",
  "do",
  "does",
  "did",
  "not",
  "no",
  "yes",
  "if",
  "then",
  "than",
  "so",
  "just",
  "about",
  "into",
  "out",
  "up",
  "down",
  "over",
  "under",
  "again",
  "more",
  "most",
  "other",
  "some",
  "such",
  "only",
  "own",
  "same",
  "too",
  "very",
  "have",
  "has",
  "had",
  "am",
  "are",
  "was",
  "were",
  "will",
  "shall",
  "may",
  "might",
  "must",
  "need",
  "including",
  "include",
  "includes",
  "etc",
]);

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function AtsResumeCheckerTool() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");

  const { keywords, matched, missing, score } = useMemo(() => {
    const trimmedJob = job.trim();
    if (!trimmedJob) {
      return { keywords: [] as string[], matched: [] as string[], missing: [] as string[], score: 0 };
    }
    const words = job
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w && !STOPWORDS.has(w) && w.length > 1);

    // unique keywords preserving order
    const unique = [...new Set(words)];

    const resumeLower = resume.toLowerCase();
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    for (const kw of unique) {
      const pattern = new RegExp(`\\b${escapeRegExp(kw)}\\b`, "i");
      if (pattern.test(resumeLower)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    }

    const s = unique.length ? Math.round((matchedKeywords.length / unique.length) * 100) : 0;
    return { keywords: unique, matched: matchedKeywords, missing: missingKeywords, score: s };
  }, [resume, job]);

  const hasJob = job.trim().length > 0;
  const hasResume = resume.trim().length > 0;

  const scoreColor =
    !hasJob || keywords.length === 0
      ? "text.secondary"
      : score >= 80
        ? "success.main"
        : score >= 50
          ? "warning.main"
          : "error.main";

  const scoreSeverity =
    score >= 80 ? "success" : score >= 50 ? "warning" : "error";

  // Highlight resume preview: wrap matched keywords
  const highlightedResume = useMemo(() => {
    if (!resume || matched.length === 0) return null;
    const pattern = new RegExp(`\\b(${matched.map(escapeRegExp).join("|")})\\b`, "gi");
    const parts = resume.split(pattern);
    // split with capturing group retains delimiters; need case-insensitive match set
    const lowerMatched = new Set(matched.map((m) => m.toLowerCase()));
    return parts.map((part, idx) => {
      const isMatch = lowerMatched.has(part.toLowerCase());
      if (isMatch) {
        return (
          <Box
            component="span"
            key={idx}
            sx={{
              bgcolor: "success.light",
              color: "success.dark",
              px: 0.4,
              py: 0.1,
              borderRadius: 0.8,
              fontWeight: 700,
            }}
          >
            {part}
          </Box>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  }, [resume, matched]);

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Resume"
          multiline
          minRows={10}
          fullWidth
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume text here…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
        <TextField
          label="Job description"
          multiline
          minRows={10}
          fullWidth
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Paste the job description here to extract keywords…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
      </Stack>

      {!hasJob ? (
        <Alert severity="info">
          Paste a job description to extract keywords. Keywords are extracted by splitting on whitespace, lowercasing, and filtering stopwords.
        </Alert>
      ) : (
        <Box
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  ATS Match Score
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {matched.length} of {keywords.length} keywords covered
                  {keywords.length > 0 ? ` · ${keywords.length - matched.length} missing` : ""}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: scoreColor, minWidth: 80, textAlign: "right" }}>
                {score}%
              </Typography>
            </Box>

            <Box
              sx={{
                height: 10,
                borderRadius: 999,
                bgcolor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${score}%`,
                  bgcolor: scoreColor,
                  transition: "width 0.3s ease",
                  borderRadius: 999,
                }}
              />
            </Box>

            <Alert severity={hasJob && keywords.length > 0 ? (scoreSeverity as "success" | "warning" | "error") : "info"}>
              {score >= 80
                ? "Excellent coverage — your resume covers most job keywords."
                : score >= 50
                  ? "Moderate coverage — consider adding some of the missing keywords naturally into your resume."
                  : "Low coverage — many job keywords are missing. Add relevant skills and terms where truthful."}
            </Alert>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Extracted keywords ({keywords.length})
              </Typography>
              {keywords.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No keywords extracted after stopword filtering. Try a longer job description.
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {keywords.map((kw) => {
                    const isMatched = matched.includes(kw);
                    return (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        variant={isMatched ? "filled" : "outlined"}
                        color={isMatched ? "success" : "error"}
                        sx={{
                          fontWeight: isMatched ? 700 : 500,
                          bgcolor: isMatched ? "success.light" : undefined,
                          color: isMatched ? "success.dark" : undefined,
                          borderColor: isMatched ? "success.main" : undefined,
                        }}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "success.main" }}>
                  Matched ({matched.length})
                </Typography>
                {matched.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No keywords matched yet.
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                    {matched.map((kw) => (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        sx={{ bgcolor: "success.light", color: "success.dark", fontWeight: 600 }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "error.main" }}>
                  Missing ({missing.length})
                </Typography>
                {missing.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {hasJob ? "All keywords covered!" : "—"}
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                    {missing.map((kw) => (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ fontWeight: 600 }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Resume highlight preview
        </Typography>
        {!hasResume ? (
          <Alert severity="info">Paste your resume above to see matched keywords highlighted in context.</Alert>
        ) : matched.length === 0 && hasJob ? (
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              whiteSpace: "pre-wrap",
              fontSize: 13,
              lineHeight: 1.7,
              color: "text.secondary",
              bgcolor: "background.paper",
            }}
          >
            No keywords matched — nothing to highlight. Try adding terms from the missing list.
          </Box>
        ) : (
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              whiteSpace: "pre-wrap",
              fontSize: 13,
              lineHeight: 1.7,
              fontFamily: "inherit",
              bgcolor: "background.paper",
            }}
          >
            {highlightedResume ?? resume}
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          Tip: ATS checks are keyword-based. Add missing terms only where you have truthful experience. Highlighting uses word-boundary matching, case-insensitive, after lowercasing.
        </Typography>
      </Box>
    </ToolPaper>
  );
}
