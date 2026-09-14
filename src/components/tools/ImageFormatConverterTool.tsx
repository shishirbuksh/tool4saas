"use client";

import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import { validateImageFile, validateImageDimensions, MAX_IMAGE_SIZE, MAX_DIMENSION, MAX_PIXELS } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

type TargetFormat = "image/jpeg" | "image/png" | "image/webp";

const extMap: Record<TargetFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export default function ImageFormatConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultUrlRef = useRef<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (!f.type.startsWith("image/")) {
        setError("Please choose an image file.");
        e.target.value = "";
        return;
      }
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
      setResult(null);
    }
    e.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
        resultUrlRef.current = null;
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      if (result?.url) {
        try { URL.revokeObjectURL(result.url); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convert = () => {
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
        // OOM guard before canvas allocation
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
        const dimCheck = validateImageDimensions(img.width, img.height);
        if (!dimCheck.valid) {
          setError(dimCheck.error || "Image too large.");
          setBusy(false);
          return;
        }
        const canvas = document.createElement("canvas");
        // guard already done, now safe to allocate
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setError("Canvas not supported in this browser.");
          setBusy(false);
          return;
        }
        ctx.drawImage(img, 0, 0);

        const mime = targetFormat;
        const needsQuality = mime === "image/jpeg" || mime === "image/webp";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError("Conversion failed (toBlob returned null). Your browser may not support the selected format.");
              setBusy(false);
              return;
            }
            if (resultUrlRef.current) {
              URL.revokeObjectURL(resultUrlRef.current);
            }
            if (result?.url) {
              try { URL.revokeObjectURL(result.url); } catch {}
            }
            const url = URL.createObjectURL(blob);
            resultUrlRef.current = url;
            const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
            const ext = extMap[mime];
            const name = `${baseName}.${ext}`;
            setResult({ url, size: blob.size, name });
            setBusy(false);
          },
          mime,
          needsQuality ? quality : undefined
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

  const showQuality = targetFormat === "image/jpeg" || targetFormat === "image/webp";

  return (
    <ToolPaper spacing={3}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
        <Button variant="outlined" component="label">
          Choose image
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onFile} />
        </Button>
        <FormControl size="small" sx={{ minWidth: 180 }} disabled={busy}>
          <InputLabel id="format-label">Target format</InputLabel>
          <Select
            labelId="format-label"
            label="Target format"
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value as TargetFormat)}
          >
            <MenuItem value="image/jpeg">JPEG</MenuItem>
            <MenuItem value="image/png">PNG</MenuItem>
            <MenuItem value="image/webp">WebP</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {file && <Alert severity="info">Selected: {file.name} ({fmtBytes(file.size)})</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Quality: {Math.round(quality * 100)}% {!showQuality ? "(PNG is lossless — quality not applicable)" : ""}
        </Typography>
        <Slider
          value={quality}
          min={0.1}
          max={1}
          step={0.05}
          onChange={(_, v) => setQuality(Array.isArray(v) ? v[0] : v)}
          disabled={!file || !showQuality || busy}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
        />
      </Box>

      <Box>
        <Button variant="contained" onClick={convert} disabled={!file || busy}>
          {busy ? "Converting…" : "Convert image"}
        </Button>
      </Box>

      {result && (
        <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Result
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {file ? fmtBytes(file.size) : ""} → {fmtBytes(result.size)} · {result.name}
          </Typography>
          <Box
            component="img"
            src={result.url}
            alt="converted preview"
            sx={{ maxWidth: "100%", borderRadius: 1, my: 1, display: "block" }}
          />
          <Button variant="contained" href={result.url} download={result.name}>
            Download
          </Button>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        Images are processed entirely in your browser via canvas and are never uploaded.
      </Typography>
    </ToolPaper>
  );
}
