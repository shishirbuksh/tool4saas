"use client";

import { useEffect, useRef, useState } from "react";
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
import { validateImageFile, validateImageDimensions, MAX_IMAGE_SIZE, MAX_DIMENSION, MAX_PIXELS } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

export default function ImageCompressorTool() {
  const objectUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);
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
      const v = validateImageFile(f, { maxSize: MAX_IMAGE_SIZE });
      if (!v.valid) {
        setError(v.error || "Invalid image.");
        e.target.value = "";
        return;
      }
      setError("");
      // revoke previous result URL on rapid file change (use ref pattern)
      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
        resultUrlRef.current = null;
      }
      if (result?.url) {
        try { URL.revokeObjectURL(result.url); } catch {}
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setFile(f);
      setOrigSize(f.size);
      setResult(null);
    }
    e.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
        resultUrlRef.current = null;
      }
      if (result?.url) {
        try { URL.revokeObjectURL(result.url); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compress = () => {
    if (!file) return;
    setBusy(true);
    setError("");
    const img = new Image();
    img.onload = () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      } else {
        try { URL.revokeObjectURL(img.src); } catch {}
      }
      // OOM guard: check original image dimensions
      if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
        setError(`Image too large — max ${MAX_DIMENSION}px per side (got ${img.width}×${img.height}).`);
        setBusy(false);
        return;
      }
      if (img.width * img.height > MAX_PIXELS) {
        setError(`Image too large — max ${MAX_PIXELS / (1024 * 1024)}MP (got ${Math.round((img.width * img.height) / (1024 * 1024))}MP).`);
        setBusy(false);
        return;
      }
      const dimCheckOrig = validateImageDimensions(img.width, img.height);
      if (!dimCheckOrig.valid) {
        setError(dimCheckOrig.error || "Image too large.");
        setBusy(false);
        return;
      }
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      // OOM guard before canvas allocation: check target size
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        setError(`Target size too large — max ${MAX_DIMENSION}px per side.`);
        setBusy(false);
        return;
      }
      if (width * height > MAX_PIXELS) {
        setError(`Target size too large — max ${MAX_PIXELS / (1024 * 1024)}MP.`);
        setBusy(false);
        return;
      }
      const dimCheck = validateImageDimensions(width, height);
      if (!dimCheck.valid) {
        setError(dimCheck.error || "Target size too large.");
        setBusy(false);
        return;
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
          if (!blob) {
            setError("Compression failed (toBlob returned null).");
            setBusy(false);
            return;
          }
          const name = file.name.replace(/\.[^.]+$/, "") + "-compressed." + (mime === "image/png" ? "png" : "jpg");
          if (resultUrlRef.current) {
            URL.revokeObjectURL(resultUrlRef.current);
          }
          if (result?.url) {
            try { URL.revokeObjectURL(result.url); } catch {}
          }
          const url = URL.createObjectURL(blob);
          resultUrlRef.current = url;
          setResult({ url, size: blob.size, name });
          setBusy(false);
        },
        mime,
        quality
      );
    };
    img.onerror = () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      } else {
        try { URL.revokeObjectURL(img.src); } catch {}
      }
      setError("Could not load the image.");
      setBusy(false);
    };
    // revoke previous input url before creating new (rapid file change)
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    img.src = url;
  };

  return (
    <ToolPaper spacing={3}>
        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
          Choose image
          <input type="file" accept="image/*" hidden onChange={onFile} aria-label="Choose image file" />
        </Button>
        {file && <Alert severity="info">Selected: {file.name} ({fmtBytes(origSize)})</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Quality: {Math.round(quality * 100)}% {file?.type === "image/png" ? "(PNG ignores quality; convert to JPG for smaller size)" : ""}
          </Typography>
          <Slider value={quality} min={0.1} max={1} step={0.05} onChange={(_, v) => setQuality(Array.isArray(v) ? v[0] : v)} disabled={!file} aria-label="Compression quality" />
        </Box>

        <TextField
          label="Max width (px)"
          type="number"
          value={maxWidth}
          onChange={(e) => setMaxWidth(Math.max(1, Number(e.target.value) || 1))}
          fullWidth
          disabled={!file}
          placeholder="e.g. 1920…"
          slotProps={{
            input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" },
            htmlInput: { min: 1, step: 1 },
          }}
          sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
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
              {fmtBytes(origSize)} → {fmtBytes(result.size)} (saved {Math.max(0, Math.round((1 - result.size / origSize) * 100))}%)
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
