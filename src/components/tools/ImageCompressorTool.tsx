"use client";

import { useEffect, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CompressIcon from "@mui/icons-material/Compress";
import DownloadIcon from "@mui/icons-material/Download";
import { validateImageFile } from "@/lib/validate";

const fmt = (b: number) => (b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`);

export default function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const v = validateImageFile(f);
      if (!v.valid) {
        setError(v.error || "Invalid image.");
        return;
      }
      setError("");
      if (result?.url) URL.revokeObjectURL(result.url);
      setFile(f);
      setOrigSize(f.size);
      setResult(null);
    }
    e.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result?.url]);

  const compress = () => {
    if (!file) return;
    setBusy(true);
    setError("");
    const reader = new FileReader();
    reader.onerror = () => {
      setError("Could not read the file.");
      setBusy(false);
    };
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setError("Canvas not supported in this browser.");
          setBusy(false);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const name = file.name.replace(/\.[^.]+$/, "") + "-compressed." + (mime === "image/png" ? "png" : "jpg");
              const url = URL.createObjectURL(blob);
              setResult({ url, size: blob.size, name });
            } else {
              setError("Compression failed.");
            }
            setBusy(false);
          },
          mime,
          quality
        );
      };
      img.onerror = () => {
        setError("Could not load the image.");
        setBusy(false);
      };
      const res = reader.result;
      if (typeof res !== "string") {
        setError("Could not read the file.");
        setBusy(false);
        return;
      }
      img.src = res;
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolPaper spacing={3}>
        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
          Choose image
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </Button>
        {file && <Alert severity="info">Selected: {file.name} ({fmt(origSize)})</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Quality: {Math.round(quality * 100)}% {file?.type === "image/png" ? "(PNG ignores quality; convert to JPG for smaller size)" : ""}
          </Typography>
          <Slider value={quality} min={0.1} max={1} step={0.05} onChange={(_, v) => setQuality(v as number)} disabled={!file} />
        </Box>

        <TextField
          label="Max width (px)"
          type="number"
          value={maxWidth}
          onChange={(e) => setMaxWidth(Math.max(1, Number(e.target.value) || 1))}
          fullWidth
          disabled={!file}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          helperText="Images wider than this are scaled down."
        />

        <Box>
          <Button variant="contained" startIcon={<CompressIcon />} onClick={compress} disabled={!file || busy}>
            {busy ? "Compressing…" : "Compress image"}
          </Button>
        </Box>

        {result && (
          <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Typography  variant="subtitle2"  gutterBottom sx={{ fontWeight: 700 }}>Result</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {fmt(origSize)} → {fmt(result.size)} (saved {Math.max(0, Math.round((1 - result.size / origSize) * 100))}%)
            </Typography>
            <Box component="img" src={result.url} alt="compressed preview" sx={{ maxWidth: "100%", borderRadius: 1, my: 1, display: "block" }} />
            <Button variant="contained" startIcon={<DownloadIcon />} href={result.url} download={result.name}>
              Download
            </Button>
          </Box>
        )}
        <Typography variant="caption" color="text.secondary">
          Images are processed entirely in your browser and are never uploaded.
        </Typography>
      </ToolPaper>
  );
}
