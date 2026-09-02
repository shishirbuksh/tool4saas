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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/lib/clipboard";

const OG_TYPES = ["website", "article", "product", "profile", "video", "music"] as const;

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

export default function OpenGraphPreviewTool() {
  const [title, setTitle] = useState("Your Website Title — Build Better Products");
  const [description, setDescription] = useState(
    "A compelling description that appears when your link is shared on social media. Keep it under 160 characters for best results."
  );
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/1200x630.png?text=1200x630+OG+Image");
  const [url, setUrl] = useState("https://example.com/page");
  const [type, setType] = useState<(typeof OG_TYPES)[number]>("website");
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const domain = getDomain(url);

  const metaTags = useMemo(() => {
    const lines = [
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="${escapeAttr(type)}" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
      imageUrl ? `<meta property="og:image" content="${escapeAttr(imageUrl)}" />` : null,
      imageUrl ? `<meta property="og:image:width" content="1200" />` : null,
      imageUrl ? `<meta property="og:image:height" content="630" />` : null,
      ``,
      `<!-- Twitter -->`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:url" content="${escapeAttr(url)}" />`,
      `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
      imageUrl ? `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />` : null,
    ].filter(Boolean) as string[];
    return lines.join("\n");
  }, [title, description, imageUrl, url, type]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(metaTags);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayTitle = title.trim() || "Your Website Title";
  const displayDesc = description.trim() || "Description will appear here when you share the link on social platforms.";
  const displayUrl = url.trim() || "https://example.com/page";
  const displayImage = !imgError && imageUrl.trim() ? imageUrl.trim() : "";

  return (
    <ToolPaper spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Open Graph Preview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Edit the tags below to see how your link will look when shared on Facebook, Twitter / X, LinkedIn and other platforms.
        </Typography>
      </Box>

      <Stack spacing={2}>
        <TextField
          label="Title (og:title)"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your page title"
          helperText={`${title.length} characters — recommended 50-60`}
          slotProps={{ htmlInput: { maxLength: 120 }, input: { spellCheck: true, autoComplete: "off" } }}
        />
        <TextField
          label="Description (og:description)"
          fullWidth
          multiline
          minRows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description for social previews"
          helperText={`${description.length} characters — recommended 110-160`}
          slotProps={{ htmlInput: { maxLength: 300 }, input: { spellCheck: true, autoComplete: "off" } }}
        />
        <TextField
          label="Image URL (og:image) — 1200×630 recommended"
          fullWidth
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImgError(false);
          }}
          placeholder="https://example.com/og-image.jpg"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          helperText="Use an absolute URL, aspect ratio 1.91:1 (1200×630)"
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Canonical URL (og:url)"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Type (og:type)"
            select
            value={type}
            onChange={(e) => setType(e.target.value as (typeof OG_TYPES)[number])}
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
        Previews
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
        {/* Facebook Card — 1200x630 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5, color: "text.secondary", mb: 1, display: "block" }}>
            FACEBOOK — 1200×630
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
            {/* Mock Facebook header */}
            <Stack direction="row" spacing={1} sx={{ p: 1.5, alignItems: "center" }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                  Your Page
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                  Sponsored · 🌐
                </Typography>
              </Box>
              <Box sx={{ ml: "auto", color: "text.secondary", fontSize: 20, lineHeight: 1 }}>⋯</Box>
            </Stack>

            {/* Image area 1.91:1 */}
            <Box
              sx={{
                aspectRatio: "1.91 / 1",
                bgcolor: "grey.100",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "divider",
                position: "relative",
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
                  <Typography variant="caption">No image — add an og:image URL</Typography>
                </Stack>
              )}
            </Box>

            {/* Facebook bottom info */}
            <Box sx={{ bgcolor: "grey.50", p: 1.5, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.4, lineHeight: 1.2, display: "block" }}
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
            Facebook truncates title ~80 chars and description ~110 chars.
          </Typography>
        </Box>

        {/* Twitter Card — summary_large_image */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5, color: "text.secondary", mb: 1, display: "block" }}>
            TWITTER / X — SUMMARY_LARGE_IMAGE
          </Typography>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "background.paper",
              maxWidth: 520,
            }}
          >
            {/* Mock tweet header */}
            <Stack direction="row" spacing={1.25} sx={{ p: 1.5, pb: 1, alignItems: "flex-start" }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "grey.800", flexShrink: 0 }} />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Your Brand
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @yourbrand · now
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ mt: 0.25, lineHeight: 1.4 }}>
                  Check out our latest update 👇
                </Typography>
                <Typography variant="body2" color="primary.main" sx={{ wordBreak: "break-all" }}>
                  {displayUrl}
                </Typography>
              </Box>
              <Box sx={{ color: "text.secondary", fontSize: 18 }}>⋯</Box>
            </Stack>

            {/* Twitter card */}
            <Box sx={{ px: 1.5, pb: 1.5 }}>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "1.91 / 1",
                    bgcolor: "grey.100",
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
                      alt="Twitter OG preview"
                      onError={() => setImgError(true)}
                      sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <Stack sx={{ alignItems: "center", p: 2, color: "text.secondary" }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        1200 × 628
                      </Typography>
                      <Typography variant="caption">No image</Typography>
                    </Stack>
                  )}
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
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
                      mt: 0.25,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {displayDesc}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mt: 0.75 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: "grey.300",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ wordBreak: "break-all" }}>
                      {domain.toLowerCase()}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            X uses summary_large_image — same 1.91:1 image, rounded corners.
          </Typography>
        </Box>
      </Stack>

      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1, flexWrap: "wrap", gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Meta tags
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Paste inside &lt;head&gt;
          </Typography>
        </Stack>
        <TextField
          value={metaTags}
          multiline
          minRows={11}
          fullWidth
          slotProps={{ input: { readOnly: true, "aria-label": "Generated meta tags", spellCheck: false, autoComplete: "off" } }}
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
        <Button
          variant="outlined"
          onClick={() => {
            setTitle("Your Website Title — Build Better Products");
            setDescription(
              "A compelling description that appears when your link is shared on social media. Keep it under 160 characters for best results."
            );
            setImageUrl("https://via.placeholder.com/1200x630.png?text=1200x630+OG+Image");
            setUrl("https://example.com/page");
            setType("website");
            setImgError(false);
          }}
        >
          Reset example
        </Button>
      </Stack>
    </ToolPaper>
  );
}
