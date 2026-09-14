"use client";

import { useState, useRef, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";

const FONTS = [
  { value: "Brush Script MT", label: "Brush Script" },
  { value: "'Segoe Script', cursive", label: "Segoe Script" },
  { value: "'Lucida Handwriting', cursive", label: "Lucida Handwriting" },
  { value: "'Dancing Script', cursive", label: "Dancing Script" },
  { value: "'Great Vibes', cursive", label: "Great Vibes" },
  { value: "'Alex Brush', cursive", label: "Alex Brush" },
  { value: "'Pacifico', cursive", label: "Pacifico" },
];

function toHexColor(v: string) {
  let h = v.trim();
  if (!h.startsWith("#")) h = `#${h}`;
  if (/^#[0-9a-fA-F]{3}$/.test(h)) h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  return /^#[0-9a-fA-F]{6}$/.test(h) ? h : "#0f172a";
}

export default function SignatureMakerTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [penColor, setPenColor] = useState("#0f172a");
  const [penWidth, setPenWidth] = useState(2);
  const [typedText, setTypedText] = useState("");
  const [font, setFont] = useState(FONTS[0].value);

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Handle high DPI for crisp lines
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    let w = Math.round(rect.width * dpr) || 700;
    let h = Math.round(rect.height * dpr) || 300;
    // OOM guard before canvas allocation: clamp to 8192px per side (fixed 700x300 UI, DPR-safe)
    const MAX_DIMENSION = 8192;
    w = Math.min(Math.max(1, w), MAX_DIMENSION);
    h = Math.min(Math.max(1, h), MAX_DIMENSION);
    if (w * h > 16 * 1024 * 1024) {
      // Scale down proportionally to stay within 16MP
      const ratio = Math.sqrt((16 * 1024 * 1024) / (w * h));
      w = Math.max(1, Math.floor(w * ratio));
      h = Math.max(1, Math.floor(h * ratio));
    }
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      ctx.scale(dpr, dpr);
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  useEffect(() => {
    initCanvas();
    const onResize = () => {
      // Re-init keeps white background; preserve drawing is complex so we just keep size stable on resize
      // Do not clear if already has content - snapshot and restore
      const canvas = canvasRef.current;
      if (!canvas) return;
      const prev = document.createElement("canvas");
      prev.width = canvas.width;
      prev.height = canvas.height;
      const pctx = prev.getContext("2d");
      if (pctx) pctx.drawImage(canvas, 0, 0);
      initCanvas();
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(prev, 0, 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
     
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    const me = e as React.MouseEvent<HTMLCanvasElement>;
    return { x: me.clientX - rect.left, y: me.clientY - rect.top };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = getCtx();
    if (!ctx) return;
    isDrawingRef.current = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = toHexColor(penColor);
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = toHexColor(penColor);
    ctx.lineWidth = penWidth;
    ctx.stroke();
  };

  const handleMouseUp = () => {
    const ctx = getCtx();
    if (ctx) ctx.closePath();
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    isDrawingRef.current = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = toHexColor(penColor);
    ctx.lineWidth = penWidth;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = toHexColor(penColor);
    ctx.lineWidth = penWidth;
    ctx.stroke();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ctx = getCtx();
    if (ctx) ctx.closePath();
    isDrawingRef.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // reset path state
    ctx.beginPath();
  };

  const addTypedSignature = () => {
    const text = typedText.trim();
    if (!text) return;
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    // draw centered - use CSS pixel coordinates (we scaled ctx earlier, so use rect size)
    ctx.fillStyle = toHexColor(penColor);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // responsive font size based on length
    const base = Math.min(56, Math.max(24, 420 / text.length));
    ctx.font = `${base}px ${font}`;
    // clear previous typed? We overlay on current drawing; user can clear first if want clean
    // For better legibility, we just draw; if want clean typed only, clear first via button
    ctx.fillText(text, rect.width / 2, rect.height / 2);
  };

  const addTypedClean = () => {
    clear();
    // need to wait a tick for clear to apply then draw
    requestAnimationFrame(() => addTypedSignature());
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Ensure white background: canvas already has white fill, so just export
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = typedText ? `${typedText.replace(/\s+/g, "_")}_signature.png` : "signature.png";
    a.click();
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Signature Maker
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Draw your signature with mouse or touch, or type it with a handwriting font. Download as PNG with transparent
        white background.
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <Box
          component="canvas"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            width: "100%",
            height: 300,
            display: "block",
            cursor: "crosshair",
            touchAction: "none",
          }}
          // Set explicit width/height via style; actual pixel size handled in initCanvas
          width={700}
          height={300}
          aria-label="Signature canvas"
        />
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            component="input"
            type="color"
            value={toHexColor(penColor)}
            onChange={(e) => setPenColor(e.target.value)}
            sx={{
              width: 48,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 0.5,
              cursor: "pointer",
              bgcolor: "transparent",
            }}
            aria-label="Pen color picker"
          />
          <TextField
            label="Pen color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            size="small"
            placeholder="#0f172a"
            sx={{ width: 140 }}
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
        </Stack>

        <Box sx={{ flex: 1, maxWidth: 320 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Pen width: {penWidth}px
          </Typography>
          <Slider
            value={penWidth}
            min={1}
            max={10}
            step={1}
            onChange={(_, v) => setPenWidth(Array.isArray(v) ? v[0] : v)}
            valueLabelDisplay="auto"
            aria-label="Pen width"
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={clear}>
            Clear
          </Button>
          <Button variant="contained" onClick={download}>
            Download PNG
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Typed signature
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Type your signature"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="John Doe"
            fullWidth
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />
          <TextField
            select
            label="Font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
            sx={{ minWidth: 180 }}
            fullWidth
          >
            {FONTS.map((f) => (
              <MenuItem key={f.value} value={f.value} sx={{ fontFamily: f.value }}>
                {f.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        {typedText && (
          <Box
            sx={{
              p: 2,
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              textAlign: "center",
              fontFamily: font,
              fontSize: 32,
              color: toHexColor(penColor),
              wordBreak: "break-word",
            }}
          >
            {typedText}
          </Box>
        )}
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={addTypedSignature} disabled={!typedText.trim()}>
            Add to canvas
          </Button>
          <Button variant="outlined" onClick={addTypedClean} disabled={!typedText.trim()}>
            Clear & add typed
          </Button>
        </Stack>
      </Stack>
    </ToolPaper>
  );
}
