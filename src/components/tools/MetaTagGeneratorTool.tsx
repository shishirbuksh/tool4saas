
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { TextField, Typography, Box, Stack, Button, MenuItem, Alert, Divider, LinearProgress } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";
import { useThemeMode } from "@/components/ThemeProviderClient";
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
  const { mode } = useThemeMode();
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
        <Typography variant="h6" className="font-bold">
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
          <Stack direction="row" spacing={1} className="items-center mt-2">
            <Box className="flex-1">
              <LinearProgress
                variant="determinate"
                value={titleProgress}
                color={titleOver ? "error" : titleProgress > 90 ? "warning" : "primary"}
                className="h-[6px] rounded-[40px]"
              />
            </Box>
            <Typography
              variant="caption"
              color={titleOver ? "error.main" : "text.secondary"}
              className="min-w-[70px] text-right" style={{ fontFamily: "monospace" }}
            >
              {titleLen}/{TITLE_MAX}
            </Typography>
          </Stack>
          {titleOver && (
            <Alert severity="warning" className="mt-2">
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
          <Stack direction="row" spacing={1} className="items-center mt-2">
            <Box className="flex-1">
              <LinearProgress
                variant="determinate"
                value={descProgress}
                color={descOver ? "error" : descProgress > 90 ? "warning" : "primary"}
                className="h-[6px] rounded-[40px]"
              />
            </Box>
            <Typography
              variant="caption"
              color={descOver ? "error.main" : "text.secondary"}
              className="min-w-[70px] text-right" style={{ fontFamily: "monospace" }}
            >
              {descLen}/{DESC_MAX}
            </Typography>
          </Stack>
          {descOver && (
            <Alert severity="warning" className="mt-2">
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
            className="min-w-[160px]"
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

      <Typography variant="subtitle1" className="font-bold">
        Live previews
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} className="items-start">
        {/* SERP preview */}
        <Box className="flex-1 min-w-[0px]">
          <Typography
            variant="caption"
            className="font-bold tracking-[0.5px] text-base-content/70 mb-2 block"
          >
            GOOGLE SERP
          </Typography>
          <Box
            className="p-4 rounded-[12px] border border-base-300 bg-base-100 max-w-[520px]"
          >
            <Typography
              variant="caption"
              className="flex items-center gap-1.5 text-base-content/70 text-[12px] leading-[1.4] break-all"
            >
              <Box
                component="span"
                className="w-[18px] h-[18px] rounded-full inline-flex items-center justify-center text-[10px] shrink-0" style={{ backgroundColor: "var(--color-base-300)" }}
              >
                🌐
              </Box>
              <Box component="span" className="min-w-[0px]">
                <Box component="span" className="text-base-content font-medium">
                  {displayUrl.split(" › ")[0]}
                </Box>
                <Box component="span" className="block text-[12px] text-base-content/70">
                  {displayUrl}
                </Box>
              </Box>
              <Box component="span" className="ml-auto shrink-0 text-base-content/40">
                ⋮
              </Box>
            </Typography>
            <Typography
              className="text-[18px] leading-[1.3] mt-1.5 break-words line-clamp-1 overflow-hidden" style={{ color: mode === "dark" ? "#8ab4f8" : "#1a0dab", display: "-webkit-box", WebkitBoxOrient: "vertical", ...(titleOver ? { textDecoration: "underline wavy #d32f2f" } : {}) }}
            >
              {displayTitle}
            </Typography>
            <Typography
              className="text-[13.5px] leading-[1.58] mt-1 break-words line-clamp-2 overflow-hidden" style={{ color: mode === "dark" ? "#bdc1c6" : "#474747", display: "-webkit-box", WebkitBoxOrient: "vertical", ...(descOver ? { textDecoration: "underline wavy #ed6c02" } : {}) }}
            >
              {displayDesc}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" className="mt-1 block">
            Title truncates ~60 chars / 580px, description ~160 chars.
          </Typography>
        </Box>

        {/* OG preview mock */}
        <Box className="flex-1 min-w-[0px]">
          <Typography
            variant="caption"
            className="font-bold tracking-[0.5px] text-base-content/70 mb-2 block"
          >
            SOCIAL / OG — 1200×630
          </Typography>
          <Box
            className="border border-base-300 rounded-[16px] overflow-hidden bg-base-100 max-w-[520px]"
          >
            <Box
              className="aspect-[1.91_/_1] border-b border-base-300 overflow-hidden flex items-center justify-center" style={{ backgroundColor: "var(--color-base-200)" }}
            >
              {displayImage ? (
                <Box
                  component="img"
                  src={displayImage}
                  alt="OG preview"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover block"
                />
              ) : (
                <Stack className="items-center p-4 text-base-content/70">
                  <Typography variant="body2" className="font-semibold">
                    1200 × 630
                  </Typography>
                  <Typography variant="caption">No image — add an image URL</Typography>
                </Stack>
              )}
            </Box>
            <Box className="p-3" style={{ backgroundColor: "var(--color-base-200)" }}>
              <Typography
                variant="caption"
                className="text-base-content/70 uppercase tracking-[0.4px] leading-[1.2] block"
              >
                {domain}
              </Typography>
              <Typography
                variant="subtitle2"
                className="font-bold leading-[1.25] line-clamp-2 overflow-hidden break-words" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
              >
                {displayTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-[13px] leading-[1.4] line-clamp-2 overflow-hidden break-words" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
              >
                {displayDesc}
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" className="mt-1 block">
            Used by Facebook, LinkedIn and X (summary_large_image).
          </Typography>
        </Box>
      </Stack>

      <Box>
        <Stack
          direction="row"
          className="items-center justify-between mb-2 flex-wrap gap-2"
        >
          <Typography variant="subtitle2" className="font-bold">
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
          className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[12px] [&_textarea]:leading-[1.6]"
        />
        {copied && (
          <Alert severity="success" className="mt-2">
            Copied to clipboard!
          </Alert>
        )}
      </Box>

      <Stack direction="row" spacing={1} useFlexGap className="flex-wrap">
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
