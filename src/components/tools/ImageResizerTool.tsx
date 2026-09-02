"use client";

import { useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import { validateImageFile } from "@/lib/validate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageResizerTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [name, setName] = useState("");
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [lock, setLock] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [dataUrl, setDataUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

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
    setName(file.name);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      imgRef.current = img;
      setReady(true);
      setRatio(img.width / img.height);
      setW(String(img.width));
      setH(String(img.height));
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      setError("Could not load the image.");
    };
    img.src = URL.createObjectURL(file);
  };

  const setWidth = (v: string) => {
    setW(v);
    if (lock && v && ratio) setH(String(Math.round(parseInt(v, 10) / ratio)));
  };
  const setHeight = (v: string) => {
    setH(v);
    if (lock && v && ratio) setW(String(Math.round(parseInt(v, 10) * ratio)));
  };

  const resize = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const nw = Math.max(1, parseInt(w, 10) || img.width);
    const nh = Math.max(1, parseInt(h, 10) || img.height);
    canvas.width = nw;
    canvas.height = nh;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, nw, nh);
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
            value={w}
            onChange={(e) => setWidth(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            label="Height (px)"
            type="number"
            value={h}
            onChange={(e) => setHeight(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>
        <FormControlLabel
          control={<Checkbox checked={lock} onChange={(e) => setLock(e.target.checked)} />}
          label="Lock aspect ratio"
        />
        <Button variant="contained" onClick={resize} disabled={!ready}>
          Resize
        </Button>
        {dataUrl && (
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              component="img"
              src={dataUrl}
              alt="Resized preview"
              sx={{ maxWidth: 160, maxHeight: 160, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
            />
            <Button component="a" href={dataUrl} download={name || "resized.png"} variant="outlined" size="small">
              Download
            </Button>
          </Stack>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </ToolPaper>
  );
}