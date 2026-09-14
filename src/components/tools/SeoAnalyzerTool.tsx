"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import { copyToClipboard } from "@/lib/clipboard";

type Status = "pass" | "warn" | "fail";

type Check = {
  label: string;
  detail: string;
  status: Status;
  points: number;
  max: number;
};

function wordsOf(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const h = ` ${haystack.toLowerCase()} `;
  const n = needle.toLowerCase().trim();
  if (!n) return 0;
  let count = 0;
  let idx = 0;
  while ((idx = h.indexOf(n, idx)) !== -1) {
    count++;
    idx += n.length;
  }
  return count;
}

function analyze(
  keyword: string,
  title: string,
  slug: string,
  description: string,
  content: string
): { score: number; checks: Check[] } {
  const checks: Check[] = [];
  const kw = keyword.trim().toLowerCase();
  const hasKw = kw.length > 0;

  // 1. Keyword in title (12)
  if (!hasKw) {
    checks.push({ label: "Focus keyword in title", detail: "Enter a focus keyword to check.", status: "warn", points: 0, max: 12 });
  } else if (title.toLowerCase().includes(kw)) {
    checks.push({ label: "Focus keyword in title", detail: "Keyword found in the SEO title.", status: "pass", points: 12, max: 12 });
  } else {
    checks.push({ label: "Focus keyword in title", detail: "Add the exact keyword to the SEO title.", status: "fail", points: 0, max: 12 });
  }

  // 2. Keyword at start of title (3)
  if (!hasKw) {
    checks.push({ label: "Keyword at title start", detail: "Enter a focus keyword to check.", status: "warn", points: 0, max: 3 });
  } else if (title.trim().toLowerCase().startsWith(kw)) {
    checks.push({ label: "Keyword at title start", detail: "Keyword leads the title — best for CTR.", status: "pass", points: 3, max: 3 });
  } else {
    checks.push({ label: "Keyword at title start", detail: "Move the keyword to the start of the title.", status: "warn", points: 0, max: 3 });
  }

  // 3. Title length 50–60 (10)
  const tLen = Array.from(title.trim()).length;
  if (tLen === 0) {
    checks.push({ label: "Title length (50–60)", detail: "Write a title first.", status: "warn", points: 0, max: 10 });
  } else if (tLen >= 50 && tLen <= 60) {
    checks.push({ label: "Title length (50–60)", detail: `${tLen} characters — fits Google SERP.`, status: "pass", points: 10, max: 10 });
  } else if (tLen >= 40 && tLen <= 70) {
    checks.push({ label: "Title length (50–60)", detail: `${tLen} characters — close, aim for 50–60.`, status: "warn", points: 5, max: 10 });
  } else {
    checks.push({ label: "Title length (50–60)", detail: `${tLen} characters — will truncate or look thin.`, status: "fail", points: 0, max: 10 });
  }

  // 4. Description length 120–160 (10)
  const dLen = Array.from(description.trim()).length;
  if (dLen === 0) {
    checks.push({ label: "Meta description (120–160)", detail: "Write a meta description first.", status: "warn", points: 0, max: 10 });
  } else if (dLen >= 120 && dLen <= 160) {
    checks.push({ label: "Meta description (120–160)", detail: `${dLen} characters — full snippet.`, status: "pass", points: 10, max: 10 });
  } else if (dLen >= 100 && dLen <= 180) {
    checks.push({ label: "Meta description (120–160)", detail: `${dLen} characters — acceptable, tighten to 120–160.`, status: "warn", points: 5, max: 10 });
  } else {
    checks.push({ label: "Meta description (120–160)", detail: `${dLen} characters — too short or truncated.`, status: "fail", points: 0, max: 10 });
  }

  // 5. Keyword in description (10)
  if (!hasKw) {
    checks.push({ label: "Keyword in description", detail: "Enter a focus keyword to check.", status: "warn", points: 0, max: 10 });
  } else if (description.toLowerCase().includes(kw)) {
    checks.push({ label: "Keyword in description", detail: "Keyword found — helps bolding in SERP.", status: "pass", points: 10, max: 10 });
  } else {
    checks.push({ label: "Keyword in description", detail: "Add the keyword naturally to the description.", status: "fail", points: 0, max: 10 });
  }

  // 6. Keyword in URL slug (10)
  const slugNorm = slug.trim().toLowerCase().replace(/\s+/g, "-");
  if (!hasKw) {
    checks.push({ label: "Keyword in URL slug", detail: "Enter a focus keyword to check.", status: "warn", points: 0, max: 10 });
  } else if (slugNorm.length === 0) {
    checks.push({ label: "Keyword in URL slug", detail: "Add a short lowercase-hyphenated slug.", status: "warn", points: 0, max: 10 });
  } else if (slugNorm.includes(kw.replace(/\s+/g, "-"))) {
    checks.push({ label: "Keyword in URL slug", detail: "Slug contains the keyword.", status: "pass", points: 10, max: 10 });
  } else {
    checks.push({ label: "Keyword in URL slug", detail: "Include the keyword in the slug.", status: "fail", points: 0, max: 10 });
  }

  // Content stats
  const words = wordsOf(content);
  const wordCount = words.length;
  const kwCount = hasKw ? countOccurrences(content, kw) : 0;
  const density = wordCount > 0 && hasKw ? (kwCount / wordCount) * 100 : 0;

  // 7. Content length ≥300 words (10)
  if (wordCount === 0) {
    checks.push({ label: "Content length (300+ words)", detail: "Paste content to analyze.", status: "warn", points: 0, max: 10 });
  } else if (wordCount >= 300) {
    checks.push({ label: "Content length (300+ words)", detail: `${wordCount} words — enough depth.`, status: "pass", points: 10, max: 10 });
  } else if (wordCount >= 150) {
    checks.push({ label: "Content length (300+ words)", detail: `${wordCount} words — thin, aim for 300+.`, status: "warn", points: 5, max: 10 });
  } else {
    checks.push({ label: "Content length (300+ words)", detail: `${wordCount} words — too thin to rank.`, status: "fail", points: 0, max: 10 });
  }

  // 8. Keyword density 1–2.5% (10)
  if (!hasKw || wordCount === 0) {
    checks.push({ label: "Keyword density (1–2.5%)", detail: "Needs keyword + content.", status: "warn", points: 0, max: 10 });
  } else if (density >= 1 && density <= 2.5) {
    checks.push({ label: "Keyword density (1–2.5%)", detail: `${density.toFixed(2)}% (${kwCount} uses) — natural.`, status: "pass", points: 10, max: 10 });
  } else if (density > 2.5) {
    checks.push({ label: "Keyword density (1–2.5%)", detail: `${density.toFixed(2)}% — stuffing risk, trim uses.`, status: "fail", points: 0, max: 10 });
  } else {
    checks.push({ label: "Keyword density (1–2.5%)", detail: `${density.toFixed(2)}% — under-optimized, add uses.`, status: "warn", points: 3, max: 10 });
  }

  // 9. Keyword in first paragraph (10)
  const firstPara = content.split(/\n\s*\n/)[0] ?? content.slice(0, 300);
  if (!hasKw || wordCount === 0) {
    checks.push({ label: "Keyword in intro", detail: "Needs keyword + content.", status: "warn", points: 0, max: 10 });
  } else if (firstPara.toLowerCase().includes(kw)) {
    checks.push({ label: "Keyword in intro", detail: "Keyword appears in the first paragraph.", status: "pass", points: 10, max: 10 });
  } else {
    checks.push({ label: "Keyword in intro", detail: "Add the keyword to the first 100 words.", status: "fail", points: 0, max: 10 });
  }

  // 10. Subheadings with keyword (10)
  const headings = content.split("\n").filter((l) => /^#{1,6}\s+/.test(l.trim()));
  const headingWithKw = hasKw && headings.some((h) => h.toLowerCase().includes(kw));
  if (headings.length === 0) {
    checks.push({ label: "Subheadings + keyword", detail: "Add ## subheadings (one with the keyword).", status: "fail", points: 0, max: 10 });
  } else if (headingWithKw) {
    checks.push({ label: "Subheadings + keyword", detail: `${headings.length} headings, keyword in one.`, status: "pass", points: 10, max: 10 });
  } else {
    checks.push({ label: "Subheadings + keyword", detail: `${headings.length} headings — add keyword to one.`, status: "warn", points: 5, max: 10 });
  }

  // 11. Image alt text (5)
  const altMatches = [...content.matchAll(/!\[([^\]]*)\]/g)].map((m) => m[1]);
  if (altMatches.length === 0) {
    checks.push({ label: "Image alt text", detail: "Add an image ![alt] — alt helps image search.", status: "warn", points: 0, max: 5 });
  } else if (!hasKw || altMatches.some((a) => a.toLowerCase().includes(kw))) {
    checks.push({ label: "Image alt text", detail: `${altMatches.length} image(s) with descriptive alt.`, status: "pass", points: 5, max: 5 });
  } else {
    checks.push({ label: "Image alt text", detail: "Add the keyword to one image alt.", status: "warn", points: 2, max: 5 });
  }

  const score = checks.reduce((s, c) => s + c.points, 0);
  return { score, checks };
}

function gradeOf(score: number): { label: string; color: "success.main" | "warning.main" | "error.main" } {
  if (score >= 80) return { label: "Good — publish ready", color: "success.main" };
  if (score >= 50) return { label: "Needs work", color: "warning.main" };
  return { label: "Poor — fix reds first", color: "error.main" };
}

export default function SeoAnalyzerTool() {
  const [keyword, setKeyword] = useState("mortgage calculator");
  const [title, setTitle] = useState("Mortgage Calculator — Free EMI & Amortization Online");
  const [slug, setSlug] = useState("mortgage-calculator");
  const [description, setDescription] = useState(
    "Calculate monthly EMI, total interest and amortization schedule for home loans free. Adjust principal, rate and tenure — private, no signup needed."
  );
  const [content, setContent] = useState(
    "## Mortgage Calculator\n\nUse our free mortgage calculator to estimate your monthly EMI. Enter the loan principal, annual rate and tenure to see total interest.\n\n## How EMI is calculated\n\nEMI uses the reducing-balance formula. A higher down payment lowers your mortgage calculator result and total interest.\n\n![EMI chart](chart.png)"
  );
  const [copied, setCopied] = useState(false);

  const { score, checks } = useMemo(
    () => analyze(keyword, title, slug, description, content),
    [keyword, title, slug, description, content]
  );
  const grade = gradeOf(score);
  const wordCount = useMemo(() => wordsOf(content).length, [content]);

  const copyReport = async () => {
    const lines = [
      `SEO Score: ${score}/100 — ${grade.label}`,
      `Focus keyword: ${keyword || "(none)"}`,
      "",
      ...checks.map(
        (c) => `${c.status === "pass" ? "[PASS]" : c.status === "warn" ? "[WARN]" : "[FAIL]"} ${c.label} (${c.points}/${c.max}) — ${c.detail}`
      ),
    ];
    const ok = await copyToClipboard(lines.join("\n"));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolPaper>
      <TextField
        label="Focus keyword"
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="mortgage calculator"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        helperText="One primary keyword per page — like RankMath focus keyword."
      />
      <TextField
        label="SEO title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Mortgage Calculator — Free EMI Online"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        helperText={`${Array.from(title.trim()).length}/60 chars — keep keyword near the start.`}
      />
      <TextField
        label="URL slug"
        fullWidth
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="mortgage-calculator"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        helperText="Lowercase-hyphenated, include the keyword."
      />
      <TextField
        label="Meta description"
        multiline
        minRows={2}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Calculate monthly EMI…"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        helperText={`${Array.from(description.trim()).length}/160 chars — include the keyword.`}
      />
      <TextField
        label="Page content (markdown)"
        multiline
        minRows={8}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="## Heading&#10;&#10;Write 300+ words…"
        slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        helperText={`${wordCount} words — use ## subheadings and ![alt] images.`}
        sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
      />

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          SEO Score
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: grade.color }}>
          {score} / 100
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {grade.label}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={score}
          aria-label={`SEO score ${score} out of 100`}
          sx={{ height: 8, borderRadius: 999 }}
        />
      </Box>

      <Stack spacing={1}>
        {checks.map((c) => (
          <Box
            key={c.label}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {c.status === "pass" ? (
              <CheckCircleIcon color="success" fontSize="small" sx={{ mt: 0.25 }} />
            ) : c.status === "warn" ? (
              <WarningIcon color="warning" fontSize="small" sx={{ mt: 0.25 }} />
            ) : (
              <CancelIcon color="error" fontSize="small" sx={{ mt: 0.25 }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {c.label}{" "}
                <Typography component="span" variant="caption" color="text.secondary">
                  {c.points}/{c.max}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.detail}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copyReport}>
          {copied ? "Copied!" : "Copy report"}
        </Button>
      </Stack>
      <Alert severity="info">
        Heuristic checks only — mirrors RankMath-style on-page rules. Real rankings also depend on backlinks, intent match and site authority.
      </Alert>
    </ToolPaper>
  );
}
