"use client";

import { useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { validateImageFile, validateImageDimensions, MAX_IMAGE_SIZE, MAX_DIMENSION, MAX_PIXELS } from "@/lib/validate";

export default function ImageBorderTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [borderWidth, setBorderWidth] = useState("10");
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [ratio, setRatio] = useState(1);
  const [error, setError] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const v = validateImageFile(file, { maxSize: MAX_IMAGE_SIZE });
    if (!v.valid) {
      setError(v.error || "Invalid image.");
      e.target.value = "";
      return;
    }
    setError("");
    setName(file.name);
    const reader = new FileReader();
    reader.onerror = () => setReady(false);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") return;
      const img = new Image();
      img.onerror = () => setReady(false);
      img.onload = () => {
        // 8192 / 16MP OOM guard on original dimensions before canvas work
        if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
          setError(`Image too large — max ${MAX_DIMENSION}px per side (got ${img.width}×${img.height}).`);
          return;
        }
        if (img.width * img.height > MAX_PIXELS) {
          setError(`Image too large — max ${MAX_PIXELS / (1024 * 1024)}MP.`);
          return;
        }
        const origCheck = validateImageDimensions(img.width, img.height);
        if (!origCheck.valid) {
          setError(origCheck.error || "Image too large.");
          return;
        }
        imgRef.current = img;
        setReady(true);
        setRatio(img.width / img.height);
        setWidth(String(img.width));
        setHeight(String(img.height));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const setW = (v: string) => {
    setWidth(v);
    if (ready && v && ratio) setHeight(String(Math.round(parseInt(v, 10) / ratio)));
  };
  const setH = (v: string) => {
    setHeight(v);
    if (ready && v && ratio) setWidth(String(Math.round(parseInt(v, 10) * ratio)));
  };

  const resize = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const nw = Math.max(1, parseInt(width, 10) || img.width);
    const nh = Math.max(1, parseInt(height, 10) || img.height);
    const bw = Math.max(0, parseInt(borderWidth, 10) || 0);
    // OOM guard before canvas allocation: 8192px per side + 16MP cap
    if (nw > MAX_DIMENSION || nh > MAX_DIMENSION) {
      setError(`Target size too large — max ${MAX_DIMENSION}px per side.`);
      return;
    }
    if (nw * nh > MAX_PIXELS) {
      setError(`Target size too large — max ${MAX_PIXELS / (1024 * 1024)}MP.`);
      return;
    }
    const dimCheck = validateImageDimensions(nw, nh);
    if (!dimCheck.valid) {
      setError(dimCheck.error || "Target size too large.");
      return;
    }
    if (bw * 2 >= nw || bw * 2 >= nh) {
      setError("Border too thick for image dimensions.");
      return;
    }
    setError("");
    canvas.width = nw;
    canvas.height = nh;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = borderColor || "#ffffff";
    ctx.fillRect(0, 0, nw, nh);
    ctx.drawImage(img, bw, bw, nw - 2 * bw, nh - 2 * bw);
    setDataUrl(canvas.toDataURL("image/png"));
  };

  return (
    <ToolPaper>
        <Button component="label" variant="outlined">
          Choose image
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {name && (
          <Typography variant="body2" color="text.secondary">
            {name}
          </Typography>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Width (px)"
            type="number"
            value={width}
            onChange={(e) => setW(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Height (px)"
            type="number"
            value={height}
            onChange={(e) => setH(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Border width (px)"
            type="number"
            value={borderWidth}
            onChange={(e) => setBorderWidth(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Border color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            placeholder="#ffffff"
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <Button variant="contained" onClick={resize} disabled={!ready}>
          Add border
        </Button>
        {dataUrl && (
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              component="img"
              src={dataUrl}
              alt="Bordered image"
              sx={{ maxWidth: 200, maxHeight: 200, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
            />
            <Button component="a" href={dataUrl} download={name || "bordered.png"} variant="outlined" size="small">
              Download
            </Button>
          </Stack>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </ToolPaper>
  );
}