"use client";

import { useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const toRgb = (hex: string) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return h.length === 6 ? `#${h}` : "#000000";
};

export default function FaviconGeneratorTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [symbol, setSymbol] = useState("★");
  const [bg, setBg] = useState("#6366f1");
  const [fg, setFg] = useState("#ffffff");
  const [size, setSize] = useState("64");
  const [dataUrl, setDataUrl] = useState("");

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = Math.max(16, Math.min(512, parseInt(size, 10) || 64));
    canvas.width = s;
    canvas.height = s;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = toRgb(bg);
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = toRgb(fg);
    ctx.font = `${Math.floor(s * 0.7)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol.slice(0, 2), s / 2, s / 2 + s * 0.04);
    setDataUrl(canvas.toDataURL("image/png"));
  };

  const colorField = (label: string, value: string, set: (v: string) => void) => (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box
        component="input"
        type="color"
        value={toRgb(value)}
        onChange={(e) => set(e.target.value)}
        sx={{ width: 48, height: 40, border: "1px solid", borderColor: "divider", borderRadius: 2, p: 0.5, cursor: "pointer", bgcolor: "transparent" }}
      />
      <TextField
        value={value}
        onChange={(e) => set(e.target.value)}
        size="small"
        label={label}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ width: 160 }}
      />
    </Stack>
  );

  return (
    <ToolPaper>
        <TextField
          label="Symbol or short text (1–2 chars / emoji)"
          fullWidth
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="★  A  🚀"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        {colorField("Background", bg, setBg)}
        {colorField("Foreground", fg, setFg)}
        <TextField
          label="Size (px)"
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          sx={{ maxWidth: 200 }}
          slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
        />
        <Button variant="contained" onClick={draw}>
          Generate favicon
        </Button>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Preview
          </Typography>
          {dataUrl ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={dataUrl}
                alt="Favicon preview"
                sx={{ width: 64, height: 64, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
              />
              <Button
                component="a"
                href={dataUrl}
                download="favicon.png"
                variant="outlined"
                size="small"
              >
                Download PNG
              </Button>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Click generate to create your favicon.
            </Typography>
          )}
        </Box>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </ToolPaper>
  );
}
