"use client";

import { useRef, useState, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { validateImageFile, validateImageDimensions, MAX_IMAGE_SIZE, MAX_DIMENSION, MAX_PIXELS } from "@/lib/validate";

const ASPECTS: Record<string, number> = {
  free: 0,
  "1:1": 1,
  "4:3": 4 / 3,
  "3:2": 3 / 2,
  "16:9": 16 / 9,
};

export default function ImageCropperTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);
  const [name, setName] = useState("");
  const [imgW, setImgW] = useState(0);
  const [imgH, setImgH] = useState(0);
  const [cx, setCx] = useState("0");
  const [cy, setCy] = useState("0");
  const [cw, setCw] = useState("");
  const [ch, setCh] = useState("");
  const [aspect, setAspect] = useState("free");
  const [dataUrl, setDataUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

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
    };
  }, []);

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
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
      setDataUrl("");
    }
    setReady(false);
    setName(file.name);
    const img = new Image();
    img.onload = () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
        setError(`Image too large — max ${MAX_DIMENSION}px per side (got ${w}×${h}).`);
        return;
      }
      if (w * h > MAX_PIXELS) {
        setError(`Image too large — max ${MAX_PIXELS / (1024 * 1024)}MP (got ${Math.round((w * h) / (1024 * 1024))}MP).`);
        return;
      }
      const dimCheck = validateImageDimensions(w, h);
      if (!dimCheck.valid) {
        setError(dimCheck.error || "Image too large.");
        return;
      }
      imgRef.current = img;
      setImgW(w);
      setImgH(h);
      setReady(true);
      setCx("0");
      setCy("0");
      const ratio = ASPECTS[aspect] ?? 0;
      if (ratio > 0) {
        let fitW = w;
        let fitH = Math.round(fitW / ratio);
        if (fitH > h) {
          fitH = h;
          fitW = Math.round(fitH * ratio);
        }
        setCw(String(fitW));
        setCh(String(fitH));
      } else {
        setCw(String(w));
        setCh(String(h));
      }
    };
    img.onerror = () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setError("Could not load the image.");
    };
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    img.src = url;
  };

  const onAspectChange = (value: string) => {
    setAspect(value);
    const ratio = ASPECTS[value] ?? 0;
    if (ratio > 0 && cw) {
      const wVal = parseInt(cw, 10);
      if (Number.isFinite(wVal) && wVal > 0) {
        const maxH = imgH > 0 ? imgH - (parseInt(cy, 10) || 0) : wVal;
        const nextH = Math.max(1, Math.min(Math.round(wVal / ratio), Math.max(1, maxH)));
        setCh(String(nextH));
      }
    }
  };

  const onCropWChange = (value: string) => {
    setCw(value);
    const ratio = ASPECTS[aspect] ?? 0;
    if (ratio > 0 && value) {
      const wVal = parseInt(value, 10);
      if (Number.isFinite(wVal) && wVal > 0) {
        setCh(String(Math.max(1, Math.round(wVal / ratio))));
      }
    }
  };

  const onCropHChange = (value: string) => {
    setCh(value);
    const ratio = ASPECTS[aspect] ?? 0;
    if (ratio > 0 && value) {
      const hVal = parseInt(value, 10);
      if (Number.isFinite(hVal) && hVal > 0) {
        setCw(String(Math.max(1, Math.round(hVal * ratio))));
      }
    }
  };

  const crop = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const rawX = parseInt(cx, 10) || 0;
    const rawY = parseInt(cy, 10) || 0;
    const rawW = parseInt(cw, 10) || iw;
    const rawH = parseInt(ch, 10) || ih;
    const sx = Math.min(Math.max(0, rawX), Math.max(0, iw - 1));
    const sy = Math.min(Math.max(0, rawY), Math.max(0, ih - 1));
    const sw = Math.min(Math.max(1, rawW), Math.max(1, iw - sx));
    const sh = Math.min(Math.max(1, rawH), Math.max(1, ih - sy));
    if (sw <= 0 || sh <= 0) {
      setError("Crop region is empty — check x/y/width/height.");
      return;
    }
    if (sw > MAX_DIMENSION || sh > MAX_DIMENSION) {
      setError(`Crop region too large — max ${MAX_DIMENSION}px per side.`);
      return;
    }
    if (sw * sh > MAX_PIXELS) {
      setError(`Crop region too large — max ${MAX_PIXELS / (1024 * 1024)}MP.`);
      return;
    }
    const targetCheck = validateImageDimensions(sw, sh);
    if (!targetCheck.valid) {
      setError(targetCheck.error || "Crop region too large.");
      return;
    }
    setError("");
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas not supported in this browser.");
      return;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Failed to generate image (toBlob returned null).");
        return;
      }
      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
      }
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setDataUrl(url);
    }, "image/png");
  };

  const downloadName = name ? name.replace(/\.[^.]+$/, "") + "-cropped.png" : "cropped.png";

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
          {imgW > 0 && imgH > 0 ? ` — ${imgW}×${imgH}px` : ""}
        </Typography>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="X (px)"
          type="number"
          value={cx}
          onChange={(e) => setCx(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Y (px)"
          type="number"
          value={cy}
          onChange={(e) => setCy(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Width (px)"
          type="number"
          value={cw}
          onChange={(e) => onCropWChange(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Height (px)"
          type="number"
          value={ch}
          onChange={(e) => onCropHChange(e.target.value)}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>
      <TextField select label="Aspect ratio" value={aspect} onChange={(e) => onAspectChange(e.target.value)}>
        <MenuItem value="free">Free</MenuItem>
        <MenuItem value="1:1">1:1</MenuItem>
        <MenuItem value="4:3">4:3</MenuItem>
        <MenuItem value="3:2">3:2</MenuItem>
        <MenuItem value="16:9">16:9</MenuItem>
      </TextField>
      <Button variant="contained" onClick={crop} disabled={!ready}>
        Crop
      </Button>
      {dataUrl && (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Box
            component="img"
            src={dataUrl}
            alt="Cropped preview"
            sx={{ maxWidth: 160, maxHeight: 160, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
          />
          <Button component="a" href={dataUrl} download={downloadName} variant="outlined" size="small">
            Download PNG
          </Button>
        </Stack>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </ToolPaper>
  );
}
