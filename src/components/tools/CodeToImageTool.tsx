"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { copyToClipboard } from "@/lib/clipboard";

const LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "java",
  "css",
  "html",
  "json",
  "bash",
  "sql",
  "plaintext",
] as const;

const THEMES = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
] as const;

type ThemeValue = (typeof THEMES)[number]["value"];

const DEFAULT_CODE = `function greet(name: string) {
  return "Hello, " + name + "!";
}

console.log(greet("world"));`;

const MAX_CODE_SIZE = 100_000; // 100K chars cap (parity with 500KB guards elsewhere, canvas OOM avoidance)
const MAX_DIMENSION = 8192;
const MAX_PIXELS = 16 * 1024 * 1024; // 16MP

function drawCodeToPng(code: string, language: string, theme: ThemeValue): string {
  if (code.length > MAX_CODE_SIZE) {
    throw new Error(`Code too large — max ${MAX_CODE_SIZE.toLocaleString()} chars.`);
  }
  const fontSize = 14;
  const lineHeight = 22;
  const paddingX = 28;
  const paddingY = 24;
  const headerHeight = 48;
  const font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

  const rawLines = code.replace(/\t/g, "  ").split("\n");
  const lines = rawLines.length > 0 ? rawLines : [""];

  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) throw new Error("Canvas not supported");
  measure.font = font;
  let maxLineWidth = 0;
  for (const line of lines) {
    const w = measure.measureText(line.length === 0 ? " " : line).width;
    if (w > maxLineWidth) maxLineWidth = w;
  }

  const minWidth = 480;
  const width = Math.ceil(Math.max(minWidth, maxLineWidth + paddingX * 2));
  const height = Math.ceil(headerHeight + paddingY * 2 + lines.length * lineHeight);

  const scale = 2;
  // OOM guard before canvas allocation: 8192px per side + 16MP cap (scale included)
  const scaledW = width * scale;
  const scaledH = height * scale;
  if (scaledW > MAX_DIMENSION || scaledH > MAX_DIMENSION) {
    throw new Error(`Code image too large — max ${MAX_DIMENSION}px per side. Reduce code length.`);
  }
  if (scaledW * scaledH > MAX_PIXELS) {
    throw new Error(`Code image too large — max ${MAX_PIXELS / (1024 * 1024)}MP. Reduce code length.`);
  }

  const canvas = document.createElement("canvas");
  canvas.width = scaledW;
  canvas.height = scaledH;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.scale(scale, scale);

  const isDark = theme === "dark";
  const bg = isDark ? "#0d1117" : "#ffffff";
  const headerBg = isDark ? "#161b22" : "#f6f8fa";
  const fg = isDark ? "#e6edf3" : "#1f2328";
  const muted = isDark ? "#8b949e" : "#656d76";
  const border = isDark ? "#30363d" : "#d0d7de";

  // Background with rounded corners
  const radius = 12;
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, radius);
  ctx.fill();
  // Clip content to rounded rect
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, radius);
  ctx.clip();

  // Header bar
  ctx.fillStyle = headerBg;
  ctx.fillRect(0, 0, width, headerHeight);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, headerHeight + 0.5);
  ctx.lineTo(width, headerHeight + 0.5);
  ctx.stroke();

  // Traffic-light dots
  const dotColors = ["#ff5f57", "#febc2e", "#28c840"];
  dotColors.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(paddingX - 8 + i * 20, headerHeight / 2, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Language label
  ctx.fillStyle = muted;
  ctx.font = `12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  ctx.textBaseline = "middle";
  ctx.fillText(language, paddingX + 56, headerHeight / 2 + 1);

  // Code lines
  ctx.font = font;
  ctx.textBaseline = "top";
  lines.forEach((line, i) => {
    const y = headerHeight + paddingY + i * lineHeight;
    // Line number
    ctx.fillStyle = muted;
    ctx.fillText(String(i + 1).padStart(3, " "), 8, y);
    // Code text
    ctx.fillStyle = fg;
    ctx.fillText(line, paddingX + 28, y);
  });

  ctx.restore();

  // Border
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(0.5, 0.5, width - 1, height - 1, radius);
  ctx.stroke();

  return canvas.toDataURL("image/png");
}

export default function CodeToImageTool() {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [language, setLanguage] = useState<string>("typescript");
  const [theme, setTheme] = useState<ThemeValue>("dark");
  const [status, setStatus] = useState<string>("");

  const isDark = theme === "dark";

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    setStatus(ok ? "Code copied to clipboard." : "Copy failed.");
  };

  const handleDownload = () => {
    try {
      if (!code.trim()) {
        setStatus("Enter some code first.");
        return;
      }
      if (code.length > MAX_CODE_SIZE) {
        setStatus(`Code too large — max ${MAX_CODE_SIZE.toLocaleString()} chars (got ${code.length.toLocaleString()}).`);
        return;
      }
      const url = drawCodeToPng(code, language, theme);
      const a = document.createElement("a");
      a.href = url;
      a.download = `code-${language}-${theme}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setStatus("PNG downloaded.");
    } catch {
      setStatus("Could not render PNG in this browser.");
    }
  };

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          select
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          {LANGUAGES.map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeValue)}
          sx={{ minWidth: 160 }}
        >
          {THEMES.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TextField
        label="Code"
        multiline
        minRows={8}
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value.slice(0, MAX_CODE_SIZE + 1))}
        placeholder="Paste your code here…"
        slotProps={{
          input: {
            spellCheck: false,
            autoComplete: "off",
          },
        }}
        sx={{ "& textarea": { fontFamily: "ui-monospace, monospace", fontSize: 13 } }}
        helperText={`${code.length.toLocaleString()} / ${MAX_CODE_SIZE.toLocaleString()} chars`}
        error={code.length > MAX_CODE_SIZE}
      />

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Preview
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: isDark ? "#30363d" : "divider",
            bgcolor: isDark ? "#0d1117" : "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1.25,
              bgcolor: isDark ? "#161b22" : "#f6f8fa",
              borderBottom: "1px solid",
              borderColor: isDark ? "#30363d" : "divider",
            }}
          >
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ff5f57" }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#febc2e" }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#28c840" }} />
            <Typography
              variant="caption"
              sx={{
                ml: 1,
                fontFamily: "ui-monospace, monospace",
                color: isDark ? "#8b949e" : "text.secondary",
              }}
            >
              {language}
            </Typography>
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: 3,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: 13,
                lineHeight: 1.7,
                color: isDark ? "#e6edf3" : "#1f2328",
                bgcolor: "transparent",
                whiteSpace: "pre",
                minHeight: 120,
              }}
            >
              {code || " "}
            </Box>
          </Box>
        </Box>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy} disabled={!code}>
          Copy code
        </Button>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} disabled={!code.trim()}>
          Download PNG
        </Button>
      </Stack>

      {status ? (
        <Typography variant="body2" color="text.secondary" role="status">
          {status}
        </Typography>
      ) : null}
    </ToolPaper>
  );
}
