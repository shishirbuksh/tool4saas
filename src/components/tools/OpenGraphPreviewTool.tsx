
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { TextField, Typography, Box, Stack, Button, MenuItem, Alert, Divider } from "@/components/ds";

import { ContentCopy as ContentCopyIcon } from "@/components/ds/icons";
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
        <Typography variant="h6" className="font-bold">
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
        Previews
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} className="items-start">
        {/* Facebook Card — 1200x630 */}
        <Box className="flex-1 min-w-[0px]">
          <Typography variant="caption" className="font-bold tracking-[0.5px] text-base-content/70 mb-2 block">
            FACEBOOK — 1200×630
          </Typography>
          <Box
            className="border border-base-300 rounded-[16px] overflow-hidden bg-base-100 max-w-[520px]"
          >
            {/* Mock Facebook header */}
            <Stack direction="row" spacing={1} className="p-3 items-center">
              <Box className="w-[40px] h-[40px] rounded-full bg-primary shrink-0" />
              <Box className="min-w-[0px]">
                <Typography variant="body2" className="font-bold leading-[1.1]">
                  Your Page
                </Typography>
                <Typography variant="caption" color="text.secondary" className="leading-[1]">
                  Sponsored · 🌐
                </Typography>
              </Box>
              <Box className="ml-auto text-base-content/70 text-[20px] leading-[1]">⋯</Box>
            </Stack>

            {/* Image area 1.91:1 */}
            <Box
              className="aspect-[1.91_/_1] border-t border-b border-base-300 relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: "var(--color-base-200)" }}
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
                  <Typography variant="caption">No image — add an og:image URL</Typography>
                </Stack>
              )}
            </Box>

            {/* Facebook bottom info */}
            <Box className="p-3 border-t border-base-300" style={{ backgroundColor: "var(--color-base-200)" }}>
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
            Facebook truncates title ~80 chars and description ~110 chars.
          </Typography>
        </Box>

        {/* Twitter Card — summary_large_image */}
        <Box className="flex-1 min-w-[0px]">
          <Typography variant="caption" className="font-bold tracking-[0.5px] text-base-content/70 mb-2 block">
            TWITTER / X — SUMMARY_LARGE_IMAGE
          </Typography>
          <Box
            className="border border-base-300 rounded-[24px] overflow-hidden bg-base-100 max-w-[520px]"
          >
            {/* Mock tweet header */}
            <Stack direction="row" spacing={1.25} className="p-3 pb-2 items-start">
              <Box className="w-[40px] h-[40px] rounded-full shrink-0" style={{ backgroundColor: "color-mix(in oklab, var(--color-base-content) 80%, transparent)" }} />
              <Box className="min-w-[0px] flex-1">
                <Stack direction="row" spacing={0.75} className="items-center flex-wrap">
                  <Typography variant="body2" className="font-bold">
                    Your Brand
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @yourbrand · now
                  </Typography>
                </Stack>
                <Typography variant="body2" className="mt-0.5 leading-[1.4]">
                  Check out our latest update 👇
                </Typography>
                <Typography variant="body2" color="primary.main" className="break-all">
                  {displayUrl}
                </Typography>
              </Box>
              <Box className="text-base-content/70 text-[18px]">⋯</Box>
            </Stack>

            {/* Twitter card */}
            <Box className="px-3 pb-3">
              <Box
                className="border border-base-300 rounded-[24px] overflow-hidden bg-base-100"
              >
                <Box
                  className="aspect-[1.91_/_1] overflow-hidden flex items-center justify-center" style={{ backgroundColor: "var(--color-base-200)" }}
                >
                  {displayImage ? (
                    <Box
                      component="img"
                      src={displayImage}
                      alt="Twitter OG preview"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover block"
                    />
                  ) : (
                    <Stack className="items-center p-4 text-base-content/70">
                      <Typography variant="body2" className="font-semibold">
                        1200 × 628
                      </Typography>
                      <Typography variant="caption">No image</Typography>
                    </Stack>
                  )}
                </Box>
                <Box className="p-3">
                  <Typography
                    variant="body2"
                    className="font-bold leading-[1.3] line-clamp-2 overflow-hidden break-words" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
                  >
                    {displayTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-[13px] leading-[1.4] mt-0.5 line-clamp-2 overflow-hidden break-words" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
                  >
                    {displayDesc}
                  </Typography>
                  <Stack direction="row" spacing={0.5} className="items-center mt-1.5">
                    <Box
                      component="span"
                      className="w-[16px] h-[16px] rounded-full inline-block shrink-0" style={{ backgroundColor: "var(--color-base-300)" }}
                    />
                    <Typography variant="caption" color="text.secondary" className="break-all">
                      {domain.toLowerCase()}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" className="mt-1 block">
            X uses summary_large_image — same 1.91:1 image, rounded corners.
          </Typography>
        </Box>
      </Stack>

      <Box>
        <Stack direction="row" className="items-center justify-between mb-2 flex-wrap gap-2">
          <Typography variant="subtitle2" className="font-bold">
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
