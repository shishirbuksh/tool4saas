"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { validateImageFile, MAX_IMAGE_SIZE } from "@/lib/validate";

const MAX_DATA_URL_SIZE = 15_000_000; // ~15M chars cap for pasted data URLs (≈11MB binary, base64 overhead)

export default function ImageToBase64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [dataUrl, setDataUrl] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    const v = validateImageFile(file, { maxSize: MAX_IMAGE_SIZE });
    if (!v.valid) {
      setError(v.error || "Invalid image.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setError("Could not read the file.");
    reader.onload = () => setDataUrl(String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const previewSrc = mode === "encode" ? dataUrl : input.trim();
  // Strict allowlist: only data:image/<allowed>;base64, — blocks javascript:, data:text/html, vbscript:, etc.
  const isValidImg =
    /^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml|bmp|avif|ico);base64,/i.test(previewSrc) &&
    !/javascript:|data:text\/html|vbscript:/i.test(previewSrc.slice(0, 256));
  const decodeTooLarge = mode === "decode" && input.trim().length > MAX_DATA_URL_SIZE;

  return (
    <ToolPaper>
        <ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="encode">Image → Base64</ToggleButton>
          <ToggleButton value="decode">Base64 → Image</ToggleButton>
        </ToggleButtonGroup>

        {mode === "encode" ? (
          <Box>
            <Button variant="outlined" component="label">
              Choose image
              <input type="file" accept="image/*" hidden onChange={onFile} />
            </Button>
            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
            {dataUrl && (
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Base64 data URL
                  </Typography>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(dataUrl)}>
                    Copy
                  </Button>
                </Stack>
                <TextField
                  value={dataUrl}
                  multiline
                  minRows={4}
                  fullWidth
                  slotProps={{ input: { readOnly: true, "aria-label": "Base64 data URL", spellCheck: false } }}
                  sx={{ "& textarea": { fontSize: 12, fontFamily: "monospace" } }}
                />
              </Box>
            )}
          </Box>
        ) : (
          <TextField
            label="Paste a Base64 image data URL"
            multiline
            minRows={4}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_DATA_URL_SIZE + 1))}
            placeholder="data:image/png;base64,iVBORw0KGgo…"
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            helperText={`${input.length.toLocaleString()} / ${MAX_DATA_URL_SIZE.toLocaleString()} chars`}
            error={decodeTooLarge}
          />
        )}
        {decodeTooLarge && <Alert severity="error">Input too large — max {MAX_DATA_URL_SIZE.toLocaleString()} chars.</Alert>}

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Preview
          </Typography>
          {decodeTooLarge ? (
            <Alert severity="error">That data URL exceeds the {MAX_DATA_URL_SIZE.toLocaleString()} char cap.</Alert>
          ) : previewSrc ? (
            isValidImg ? (
              <Box
                component="img"
                src={previewSrc}
                alt="Preview"
                sx={{ maxWidth: "100%", maxHeight: 280, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
              />
            ) : (
              <Alert severity="warning">That is not a valid image data URL.</Alert>
            )
          ) : (
            <Typography variant="body2" color="text.secondary">
              {mode === "encode" ? "Choose an image to see its Base64." : "Paste a data URL to preview."}
            </Typography>
          )}
        </Box>
      </ToolPaper>
  );
}