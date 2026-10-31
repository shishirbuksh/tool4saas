
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Stack, TextField, Typography, Alert, Chip, Link } from "@/components/ds";


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
            className="px-0.8 py-0.2 rounded-[6.4px] font-bold" style={{ backgroundColor: "color-mix(in oklab, var(--color-success) 15%, var(--color-base-100))", color: "var(--color-success)" }}
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
          className="p-4 border border-base-300 rounded-[16px] bg-base-100"
        >
          <Stack spacing={2}>
            <Box className="flex items-center justify-between gap-4 flex-wrap">
              <Box>
                <Typography variant="subtitle2" className="font-bold">
                  ATS Match Score
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {matched.length} of {keywords.length} keywords covered
                  {keywords.length > 0 ? ` · ${keywords.length - matched.length} missing` : ""}
                </Typography>
              </Box>
              <Typography variant="h4" className="font-black min-w-[80px] text-right" style={{ color: scoreColor }}>
                {score}%
              </Typography>
            </Box>

            <Box
              className="h-[10px] rounded-[7992px] bg-base-300 overflow-hidden"
            >
              <Box
                className="h-full rounded-[7992px]" style={{ width: `${score}%`, backgroundColor: scoreColor, transition: "width 0.3s ease" }}
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
              <Typography variant="subtitle2" className="font-bold mb-2">
                Extracted keywords ({keywords.length})
              </Typography>
              {keywords.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No keywords extracted after stopword filtering. Try a longer job description.
                </Typography>
              ) : (
                <Box className="flex flex-wrap gap-1.6">
                  {keywords.map((kw) => {
                    const isMatched = matched.includes(kw);
                    return (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        variant={isMatched ? "filled" : "outlined"}
                        color={isMatched ? "success" : "error"}
                        style={{ fontWeight: isMatched ? 700 : 500, backgroundColor: isMatched ? "success.light" : undefined, color: isMatched ? "success.dark" : undefined, borderColor: isMatched ? "success.main" : undefined }}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box className="flex-1">
                <Typography variant="subtitle2" className="font-bold mb-2 text-success">
                  Matched ({matched.length})
                </Typography>
                {matched.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No keywords matched yet.
                  </Typography>
                ) : (
                  <Box className="flex flex-wrap gap-1.4">
                    {matched.map((kw) => (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        className="font-semibold" style={{ backgroundColor: "color-mix(in oklab, var(--color-success) 15%, var(--color-base-100))", color: "var(--color-success)" }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Box className="flex-1">
                <Typography variant="subtitle2" className="font-bold mb-2 text-error">
                  Missing ({missing.length})
                </Typography>
                {missing.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {hasJob ? "All keywords covered!" : "—"}
                  </Typography>
                ) : (
                  <Box className="flex flex-wrap gap-1.4">
                    {missing.map((kw) => (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        variant="outlined"
                        color="error"
                        className="font-semibold"
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
        <Typography variant="subtitle2" className="font-bold mb-2">
          Resume highlight preview
        </Typography>
        {!hasResume ? (
          <Alert severity="info">Paste your resume above to see matched keywords highlighted in context.</Alert>
        ) : matched.length === 0 && hasJob ? (
          <Box
            className="p-4 border border-base-300 rounded-[16px] whitespace-pre-wrap text-[13px] leading-[1.7] text-base-content/70 bg-base-100"
          >
            No keywords matched — nothing to highlight. Try adding terms from the missing list.
          </Box>
        ) : (
          <Box
            className="p-4 border border-base-300 rounded-[16px] whitespace-pre-wrap text-[13px] leading-[1.7] bg-base-100" style={{ fontFamily: "inherit" }}
          >
            {highlightedResume ?? resume}
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" className="block mt-2">
          Tip: ATS checks are keyword-based. Add missing terms only where you have truthful experience. For layout compliance, follow our{" "}
          <Link href="/blog/resume-builder-guide/ats-resume-guide" underline="hover" color="primary">
            ATS-friendly resume formatting guide
          </Link>.
        </Typography>
      </Box>
    </ToolPaper>
  );
}
