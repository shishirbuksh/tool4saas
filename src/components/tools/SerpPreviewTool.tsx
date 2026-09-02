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

// Approximate pixel width estimation for Google SERP.
// Google uses Arial (~14px for title, ~14px/13px for description).
// We approximate per-character width at 14px Arial.
// Values derived from common character width tables.
const CHAR_WIDTH_MAP: Record<string, number> = {
  i: 4.5,
  l: 4.5,
  j: 5,
  t: 5.5,
  f: 5.5,
  r: 6.5,
  I: 6.5,
  " ": 4,
  m: 13,
  w: 13,
  M: 13.5,
  W: 14,
};

function estimatePixelWidth(text: string, base = 8.5): number {
  let width = 0;
  for (const ch of text) {
    width += CHAR_WIDTH_MAP[ch] ?? (/[A-Z]/.test(ch) ? 9.5 : /[a-z]/.test(ch) ? 8 : /[0-9]/.test(ch) ? 8.5 : base);
  }
  return Math.round(width);
}

const TITLE_MAX_CHARS = 60;
const DESC_MAX_CHARS = 160;
const TITLE_MAX_PX = 580;
const DESC_MAX_PX = 920;

// Fallback simple fallback width estimate via char count (approx 9.67px per char for title)
function titlePixelApproxViaChars(chars: number) {
  return Math.round(chars * 9.67);
}
function descPixelApproxViaChars(chars: number) {
  return Math.round(chars * 5.75);
}

export default function SerpPreviewTool() {
  const [title, setTitle] = useState("Example Domain — Free Tools for Everyone");
  const [description, setDescription] = useState(
    "Discover free online tools for developers, SEO experts and creators. Fast, private and easy to use — no sign-up required."
  );
  const [url, setUrl] = useState("https://example.com/tools/serp-preview");
  const [copied, setCopied] = useState<string | null>(null);

  const titleLen = title.length;
  const descLen = description.length;

  const titlePx = useMemo(() => estimatePixelWidth(title), [title]);
  const descPx = useMemo(() => estimatePixelWidth(description), [description]);
  // Also show char-based approx as requested
  const titlePxViaChars = titlePixelApproxViaChars(titleLen);
  const descPxViaChars = descPixelApproxViaChars(descLen);

  const titleOverChars = titleLen > TITLE_MAX_CHARS;
  const descOverChars = descLen > DESC_MAX_CHARS;
  const titleOverPx = titlePx > TITLE_MAX_PX;
  const descOverPx = descPx > DESC_MAX_PX;

  const titleProgress = Math.min(100, (titleLen / TITLE_MAX_CHARS) * 100);
  const descProgress = Math.min(100, (descLen / DESC_MAX_CHARS) * 100);

  const displayUrl = useMemo(() => {
    if (!url.trim()) return "https://example.com › tools › serp-preview";
    try {
      const u = new URL(url.trim());
      const path = u.pathname.replace(/\/$/, "").replace(/\//g, " › ");
      return `${u.hostname}${path}${u.search}${u.hash}`;
    } catch {
      return url.trim();
    }
  }, [url]);

  const handleCopy = async (text: string, key: string) => {
    const { copyToClipboard } = await import("@/lib/clipboard");
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const truncatedTitle = titleOverPx || titleOverChars ? `${title.slice(0, TITLE_MAX_CHARS).trim()} …` : title;

  return (
    <ToolPaper spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          SERP Preview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preview how your page will look in Google search results. Keep title ≤ 60 chars (~580px) and description ≤ 160 chars (~920px).
        </Typography>
      </Box>

      <Stack spacing={2}>
        <Box>
          <TextField
            label="Title tag"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your page title — include primary keyword"
            slotProps={{ htmlInput: { maxLength: 120 }, input: { spellCheck: true } }}
            helperText={`${titleLen} / ${TITLE_MAX_CHARS} characters`}
            error={titleOverChars}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={titleProgress}
                color={titleOverChars || titleOverPx ? "error" : titleProgress > 90 ? "warning" : "primary"}
                sx={{ height: 6, borderRadius: 5 }}
              />
            </Box>
            <Typography
              variant="caption"
              color={titleOverChars || titleOverPx ? "error.main" : "text.secondary"}
              sx={{ minWidth: 110, textAlign: "right", fontFamily: "monospace" }}
            >
              {titleLen}/{TITLE_MAX_CHARS} · {titlePx}px / {TITLE_MAX_PX}px
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
            Approx via char count: {titlePxViaChars}px — estimated width: {titlePx}px (limit {TITLE_MAX_PX}px)
          </Typography>
          {titleOverChars && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Title is {titleLen - TITLE_MAX_CHARS} characters too long. Google typically truncates after ~60 characters.
            </Alert>
          )}
          {titleOverPx && !titleOverChars && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Title width {titlePx}px exceeds {TITLE_MAX_PX}px — wide characters (W, M) may cause earlier truncation even under 60 chars.
            </Alert>
          )}
          {!titleOverChars && !titleOverPx && titleLen > 0 && titleLen < 30 && (
            <Alert severity="info" sx={{ mt: 1 }}>
              Title is quite short. Consider 50–60 characters for optimal visibility.
            </Alert>
          )}
          {titleLen === 0 && (
            <Alert severity="error" sx={{ mt: 1 }}>
              Title is empty — search engines will generate one automatically.
            </Alert>
          )}
        </Box>

        <TextField
          label="URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/your-page"
          helperText="Full URL including https://"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />

        <Box>
          <TextField
            label="Meta description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize the page in 150–160 characters with a clear value proposition."
            helperText={`${descLen} / ${DESC_MAX_CHARS} characters`}
            error={descOverChars}
            slotProps={{ input: { spellCheck: true } }}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={descProgress}
                color={descOverChars || descOverPx ? "error" : descProgress > 90 ? "warning" : "primary"}
                sx={{ height: 6, borderRadius: 5 }}
              />
            </Box>
            <Typography
              variant="caption"
              color={descOverChars || descOverPx ? "error.main" : "text.secondary"}
              sx={{ minWidth: 110, textAlign: "right", fontFamily: "monospace" }}
            >
              {descLen}/{DESC_MAX_CHARS} · {descPx}px / {DESC_MAX_PX}px
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
            Approx via char count: {descPxViaChars}px — estimated width: {descPx}px (limit {DESC_MAX_PX}px for ~2 lines)
          </Typography>
          {descOverChars && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Description is {descLen - DESC_MAX_CHARS} characters too long. Google typically truncates after ~155–160 characters.
            </Alert>
          )}
          {descOverPx && !descOverChars && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Description width {descPx}px exceeds {DESC_MAX_PX}px — it may wrap/truncate earlier on small screens.
            </Alert>
          )}
          {descLen === 0 && (
            <Alert severity="error" sx={{ mt: 1 }}>
              Description is empty — Google will auto-generate a snippet from page content.
            </Alert>
          )}
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={() => handleCopy(title, "title")}
          disabled={!title}
        >
          {copied === "title" ? "Copied!" : "Copy title"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={() => handleCopy(description, "desc")}
          disabled={!description}
        >
          {copied === "desc" ? "Copied!" : "Copy description"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={() => handleCopy(`${title}\n${url}\n${description}`, "all")}
          disabled={!title && !description}
        >
          {copied === "all" ? "Copied!" : "Copy all"}
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setTitle("");
            setDescription("");
            setUrl("");
          }}
        >
          Clear
        </Button>
      </Stack>

      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
          Google snippet preview
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
          Desktop preview · Title truncates at ~580px, description at ~920px (2 lines). Pixel widths are approximated via character widths.
        </Typography>

        <Box
          sx={{
            p: 2,
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            maxWidth: 600,
          }}
        >
          {/* Google-style snippet */}
          <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: "text.secondary",
              fontSize: 12,
              lineHeight: 1.4,
              wordBreak: "break-all",
            }}
          >
            <Box
              component="span"
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: "grey.200",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                flexShrink: 0,
              }}
            >
              🌐
            </Box>
            <Box component="span" sx={{ minWidth: 0 }}>
              <Box component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
                {displayUrl.split(" › ")[0]}
              </Box>
              <Box component="span" sx={{ display: "block", fontSize: 12, color: "text.secondary" }}>
                {displayUrl}
              </Box>
            </Box>
            <Box component="span" sx={{ ml: "auto", flexShrink: 0, color: "text.disabled" }}>
              ⋮
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#1a0dab",
              fontSize: 18,
              lineHeight: 1.3,
              fontWeight: 400,
              mt: 0.75,
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              ...(titleOverPx || titleOverChars ? { textDecoration: "underline wavy #d32f2f" } : {}),
            }}
          >
            {title || "Untitled page — add a title to preview"}
          </Typography>

          <Typography
            sx={{
              color: "#474747",
              fontSize: 13.5,
              lineHeight: 1.58,
              mt: 0.5,
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              ...(descOverPx || descOverChars ? { textDecoration: "underline wavy #ed6c02" } : {}),
            }}
          >
            {description || "Add a meta description to preview how your snippet will appear in search results."}
          </Typography>
        </Box>

        {/* Pixel width detail */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
          <Alert
            severity={titleOverPx || titleOverChars ? "warning" : "success"}
            sx={{ flex: 1, py: 0.5 }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>
              Title: {titlePx}px / {TITLE_MAX_PX}px {titleOverPx ? "— will truncate" : "— OK"}
            </Typography>
            <Typography variant="caption">Actual: {titleLen} chars · Truncated preview: {truncatedTitle.length} chars</Typography>
          </Alert>
          <Alert
            severity={descOverPx || descOverChars ? "warning" : "success"}
            sx={{ flex: 1, py: 0.5 }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>
              Description: {descPx}px / {DESC_MAX_PX}px {descOverPx ? "— may truncate" : "— OK"}
            </Typography>
            <Typography variant="caption">Actual: {descLen} chars · ~{Math.ceil(descPx / 460)} line(s) estimated</Typography>
          </Alert>
        </Stack>
      </Box>

      <Alert severity="info">
        Tip: Front-load important keywords. Google measures in pixels, not characters — “W” and “M” are wider than “i” or “l”, so pixel width is more accurate than char count.
      </Alert>
    </ToolPaper>
  );
}
