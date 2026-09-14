"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/material/styles";
import { copyToClipboard } from "@/lib/clipboard";

const OG_TYPES = ["website", "article", "product", "profile", "video", "music"] as const;
type OgType = (typeof OG_TYPES)[number];

const TITLE_MAX = 60;
const DESC_MAX = 160;

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.toUpperCase();
  } catch {
    return "EXAMPLE.COM";
  }
}

export default function MetaTagGeneratorTool() {
  const theme = useTheme();
  const [title, setTitle] = useState("Example Domain — Free Tools for Everyone");
  const [description, setDescription] = useState(
    "Discover free online tools for developers, SEO experts and creators. Fast, private and easy to use — no sign-up required."
  );
  const [url, setUrl] = useState("https://example.com/your-page");
  const [image, setImage] = useState("https://via.placeholder.com/1200x630.png?text=1200x630+OG+Image");
  const [type, setType] = useState<OgType>("website");
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const titleLen = title.length;
  const descLen = description.length;
  const titleOver = titleLen > TITLE_MAX;
  const descOver = descLen > DESC_MAX;
  const titleProgress = Math.min(100, (titleLen / TITLE_MAX) * 100);
  const descProgress = Math.min(100, (descLen / DESC_MAX) * 100);

  const domain = getDomain(url);

  const displayUrl = useMemo(() => {
    if (!url.trim()) return "https://example.com › your-page";
    try {
      const u = new URL(url.trim());
      const path = u.pathname.replace(/\/$/, "").replace(/\//g, " › ");
      return `${u.hostname}${path}${u.search}${u.hash}`;
    } catch {
      return url.trim();
    }
  }, [url]);

  const metaTags = useMemo(() => {
    const t = title.trim();
    const d = description.trim();
    const u = url.trim();
    const img = image.trim();
    const lines: string[] = [
      `<!-- Primary Meta Tags -->`,
      `<title>${escapeAttr(t)}</title>`,
      `<meta name="title" content="${escapeAttr(t)}" />`,
      `<meta name="description" content="${escapeAttr(d)}" />`,
      u ? `<link rel="canonical" href="${escapeAttr(u)}" />` : "",
      ``,
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="${escapeAttr(type)}" />`,
      u ? `<meta property="og:url" content="${escapeAttr(u)}" />` : "",
      `<meta property="og:title" content="${escapeAttr(t)}" />`,
      `<meta property="og:description" content="${escapeAttr(d)}" />`,
      img ? `<meta property="og:image" content="${escapeAttr(img)}" />` : "",
      img ? `<meta property="og:image:width" content="1200" />` : "",
      img ? `<meta property="og:image:height" content="630" />` : "",
      ``,
      `<!-- Twitter -->`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      u ? `<meta name="twitter:url" content="${escapeAttr(u)}" />` : "",
      `<meta name="twitter:title" content="${escapeAttr(t)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(d)}" />`,
      img ? `<meta name="twitter:image" content="${escapeAttr(img)}" />` : "",
    ];
    return lines.filter((line, idx) => line !== "" || lines[idx + 1] !== "").join("\n");
  }, [title, description, url, image, type]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(metaTags);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setTitle("Example Domain — Free Tools for Everyone");
    setDescription(
      "Discover free online tools for developers, SEO experts and creators. Fast, private and easy to use — no sign-up required."
    );
    setUrl("https://example.com/your-page");
    setImage("https://via.placeholder.com/1200x630.png?text=1200x630+OG+Image");
    setType("website");
    setImgError(false);
    setCopied(false);
  };

  const displayTitle = title.trim() || "Untitled page — add a title to preview";
  const displayDesc =
    description.trim() || "Add a meta description to preview how your snippet will appear in search results.";
  const displayImage = !imgError && image.trim() ? image.trim() : "";

  return (
    <ToolPaper spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Meta Tag Generator
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generate SEO + Open Graph + Twitter meta tags. Keep title ≤ 60 chars and description ≤ 160 chars, then copy the
          tags into your &lt;head&gt;.
        </Typography>
      </Box>

      <Stack spacing={2}>
        <Box>
          <TextField
            label="Title (0–60)"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your page title — include primary keyword"
            helperText={`${titleLen} / ${TITLE_MAX} characters`}
            error={titleOver}
            slotProps={{ htmlInput: { maxLength: 120 }, input: { spellCheck: true, autoComplete: "off" } }}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={titleProgress}
                color={titleOver ? "error" : titleProgress > 90 ? "warning" : "primary"}
                sx={{ height: 6, borderRadius: 5 }}
              />
            </Box>
            <Typography
              variant="caption"
              color={titleOver ? "error.main" : "text.secondary"}
              sx={{ minWidth: 70, textAlign: "right", fontFamily: "monospace" }}
            >
              {titleLen}/{TITLE_MAX}
            </Typography>
          </Stack>
          {titleOver && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Title is {titleLen - TITLE_MAX} characters too long. Google typically truncates after ~60 characters.
            </Alert>
          )}
        </Box>

        <Box>
          <TextField
            label="Description (0–160)"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize the page in 150–160 characters with a clear value proposition."
            helperText={`${descLen} / ${DESC_MAX} characters`}
            error={descOver}
            slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={descProgress}
                color={descOver ? "error" : descProgress > 90 ? "warning" : "primary"}
                sx={{ height: 6, borderRadius: 5 }}
              />
            </Box>
            <Typography
              variant="caption"
              color={descOver ? "error.main" : "text.secondary"}
              sx={{ minWidth: 70, textAlign: "right", fontFamily: "monospace" }}
            >
              {descLen}/{DESC_MAX}
            </Typography>
          </Stack>
          {descOver && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Description is {descLen - DESC_MAX} characters too long. Google typically truncates after ~155–160
              characters.
            </Alert>
          )}
        </Box>

        <TextField
          label="Canonical URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/your-page"
          helperText="Full URL including https://"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Image URL (og:image / twitter:image) — 1200×630"
            fullWidth
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setImgError(false);
            }}
            placeholder="https://example.com/og-image.jpg"
            helperText="Absolute URL, aspect ratio 1.91:1 (1200×630)"
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Type (og:type)"
            select
            value={type}
            onChange={(e) => setType(e.target.value as OgType)}
            sx={{ minWidth: 160 }}
          >
            {OG_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      <Divider />

      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Live previews
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
        {/* SERP preview */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, letterSpacing: 0.5, color: "text.secondary", mb: 1, display: "block" }}
          >
            GOOGLE SERP
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              maxWidth: 520,
            }}
          >
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
                color: theme.palette.mode === "dark" ? "#8ab4f8" : "#1a0dab",
                fontSize: 18,
                lineHeight: 1.3,
                mt: 0.75,
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                ...(titleOver ? { textDecoration: "underline wavy #d32f2f" } : {}),
              }}
            >
              {displayTitle}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.mode === "dark" ? "#bdc1c6" : "#474747",
                fontSize: 13.5,
                lineHeight: 1.58,
                mt: 0.5,
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                ...(descOver ? { textDecoration: "underline wavy #ed6c02" } : {}),
              }}
            >
              {displayDesc}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            Title truncates ~60 chars / 580px, description ~160 chars.
          </Typography>
        </Box>

        {/* OG preview mock */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, letterSpacing: 0.5, color: "text.secondary", mb: 1, display: "block" }}
          >
            SOCIAL / OG — 1200×630
          </Typography>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
              maxWidth: 520,
            }}
          >
            <Box
              sx={{
                aspectRatio: "1.91 / 1",
                bgcolor: "grey.100",
                borderBottom: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {displayImage ? (
                <Box
                  component="img"
                  src={displayImage}
                  alt="OG preview"
                  onError={() => setImgError(true)}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <Stack sx={{ alignItems: "center", p: 2, color: "text.secondary" }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    1200 × 630
                  </Typography>
                  <Typography variant="caption">No image — add an image URL</Typography>
                </Stack>
              )}
            </Box>
            <Box sx={{ bgcolor: "grey.50", p: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                  lineHeight: 1.2,
                  display: "block",
                }}
              >
                {domain}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.25,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}
              >
                {displayTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: 13,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}
              >
                {displayDesc}
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            Used by Facebook, LinkedIn and X (summary_large_image).
          </Typography>
        </Box>
      </Stack>

      <Box>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 1, flexWrap: "wrap", gap: 1 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Generated meta tags
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Paste inside &lt;head&gt;
          </Typography>
        </Stack>
        <TextField
          value={metaTags}
          multiline
          minRows={14}
          fullWidth
          slotProps={{
            input: { readOnly: true, "aria-label": "Generated meta tags", spellCheck: false, autoComplete: "off" },
          }}
          sx={{ "& textarea": { fontFamily: "monospace", fontSize: 12, lineHeight: 1.6 } }}
        />
        {copied && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Copied to clipboard!
          </Alert>
        )}
      </Box>

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
          {copied ? "Copied!" : "Copy meta tags"}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset example
        </Button>
      </Stack>
    </ToolPaper>
  );
}
