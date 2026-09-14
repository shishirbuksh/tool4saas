"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { copyToClipboard } from "@/lib/clipboard";

type ThumbnailQuality = {
  key: string;
  label: string;
  resolution: string;
};

const THUMBNAIL_QUALITIES: ThumbnailQuality[] = [
  { key: "maxresdefault", label: "Max Resolution", resolution: "1280×720" },
  { key: "hqdefault", label: "High Quality", resolution: "480×360" },
  { key: "mqdefault", label: "Medium Quality", resolution: "320×180" },
  { key: "sddefault", label: "Standard", resolution: "640×480" },
  { key: "default", label: "Default", resolution: "120×90" },
];

function parseVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // If input is already a plain videoId (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex for youtu.be, youtube.com/watch?v=, embed, v/, shorts/
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regex);
  if (match && match[1]) return match[1];

  // Fallback: try to extract v param from URL
  try {
    const url = new URL(trimmed);
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    // youtu.be hostname fallback
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    // youtube.com embed path fallback
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx !== -1 && parts[embedIdx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[embedIdx + 1])) {
      return parts[embedIdx + 1];
    }
  } catch {
    // not a valid URL
  }

  return null;
}

export default function YoutubeThumbnailTool() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const videoId = useMemo(() => parseVideoId(url), [url]);

  const thumbnails = useMemo(() => {
    if (!videoId) return [];
    return THUMBNAIL_QUALITIES.map((q) => ({
      ...q,
      url: `https://img.youtube.com/vi/${videoId}/${q.key}.jpg`,
      filename: `${videoId}-${q.key}.jpg`,
    }));
  }, [videoId]);

  const handleCopy = async (thumbUrl: string, key: string) => {
    const ok = await copyToClipboard(thumbUrl);
    if (ok) {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleDownload = async (thumbUrl: string, filename: string) => {
    setDownloadError(null);
    try {
      const res = await fetch(thumbUrl);
      if (!res.ok) throw new Error(`Failed to fetch image (${res.status})`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch {
      // Fallback: open in new tab if fetch fails (CORS/network)
      setDownloadError("Direct download failed — opening image in new tab. You can right-click and save.");
      window.open(thumbUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isInvalid = url.trim().length > 0 && !videoId;

  return (
    <ToolPaper spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          YouTube Thumbnail Downloader
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Paste any YouTube URL to get all thumbnail qualities. Preview, copy URL or download. Previews and downloads contact img.youtube.com (your IP + video ID are shared with Google).
        </Typography>
      </Box>

      <TextField
        label="YouTube URL"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ or https://www.youtube.com/embed/dQw4w9WgXcQ"
        helperText={videoId ? `Video ID: ${videoId}` : "Supports youtu.be, youtube.com/watch?v=, embed"}
        error={isInvalid}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
      />

      {isInvalid && (
        <Alert severity="warning">
          Could not extract a video ID. Check the URL format. Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </Alert>
      )}

      {videoId && thumbnails.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Thumbnails for {videoId}
          </Typography>

          <Stack spacing={2.5}>
            {thumbnails.map((thumb) => (
              <Box
                key={thumb.key}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={0} sx={{ alignItems: "stretch" }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: { xs: "100%", sm: 320 },
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      borderRight: { sm: "1px solid" },
                      borderBottom: { xs: "1px solid", sm: "none" },
                      borderColor: "divider",
                      minHeight: 180,
                    }}
                  >
                    <Box
                      component="img"
                      src={thumb.url}
                      alt={`${thumb.label} thumbnail`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        maxHeight: 180,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1, p: 2, minWidth: 0 }}>
                    <Stack spacing={1.25} sx={{ height: "100%" }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {thumb.label} — {thumb.key}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {thumb.resolution} • https://img.youtube.com/vi/{videoId}/{thumb.key}.jpg
                        </Typography>
                      </Box>

                      <TextField
                        value={thumb.url}
                        fullWidth
                        size="small"
                        slotProps={{ input: { readOnly: true, spellCheck: false, autoComplete: "off", "aria-label": `${thumb.key} URL` } }}
                        sx={{ "& input": { fontFamily: "monospace", fontSize: 12 } }}
                      />

                      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", mt: "auto", pt: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleDownload(thumb.url, thumb.filename)}
                        >
                          Download JPG
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCopy(thumb.url, thumb.key)}
                        >
                          {copied === thumb.key ? "Copied!" : "Copy URL"}
                        </Button>
                        <Button
                          component="a"
                          href={thumb.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="text"
                          size="small"
                        >
                          Open
                        </Button>
                      </Stack>

                      {copied === thumb.key && (
                        <Alert severity="success" sx={{ py: 0 }}>
                          Copied to clipboard!
                        </Alert>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>

          {downloadError && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {downloadError}
            </Alert>
          )}
        </Box>
      )}

      {!videoId && !isInvalid && (
        <Alert severity="info">
          Enter a YouTube link above to generate thumbnails. Try an example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </Alert>
      )}

      {videoId && (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setUrl("");
              setCopied(null);
              setDownloadError(null);
            }}
          >
            Clear
          </Button>
          <Button variant="text" onClick={() => setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
            Load example
          </Button>
        </Stack>
      )}
    </ToolPaper>
  );
}