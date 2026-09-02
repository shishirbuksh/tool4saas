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
import { validateImageFile } from "@/lib/validate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
    const v = validateImageFile(file);
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
  const isValidImg = previewSrc.startsWith("data:image/");

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
            onChange={(e) => setInput(e.target.value)}
            placeholder="data:image/png;base64,iVBORw0KGgo…"
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
        )}

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Preview
          </Typography>
          {previewSrc ? (
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