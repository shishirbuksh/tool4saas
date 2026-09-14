"use client";

import { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import dynamic from "next/dynamic";

// Heavy dep split: qrcode.react loads in its own client-only chunk (ssr:false),
// never in the homepage chunk. No static import (not even type-only) remains.
type QRCanvasProps = {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  bgColor?: string;
  fgColor?: string;
};
const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeCanvas),
  { ssr: false, loading: () => null }
) as React.ComponentType<QRCanvasProps>;

const TYPES = [
  { value: "url", label: "Website / URL" },
  { value: "text", label: "Plain text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone number" },
  { value: "wifi", label: "WiFi" },
];

function escapeWifi(s: string) {
  return s.replace(/([\\;:,\"'])/g, "\\$1");
}
function buildValue(type: string, raw: string, ssid?: string, password?: string) {
  switch (type) {
    case "email":
      return `mailto:${encodeURIComponent(raw.trim())}`;
    case "phone":
      return `tel:${raw.replace(/[^+0-9]/g, "")}`;
    case "wifi":
      return `WIFI:T:WPA;S:${escapeWifi(ssid ?? "")};P:${escapeWifi(password ?? "")};;`;
    default:
      return raw;
  }
}

export default function QrCodeTool() {
  const [type, setType] = useState("url");
  const [value, setValue] = useState("https://example.com");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState("M");
  const canvasRef = useRef<HTMLDivElement>(null);

  const safeValue = buildValue(type, value, ssid, password);
  const canGenerate = safeValue.trim().length > 0;

  const download = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolPaper>
      <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2}>
            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
              sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
              slotProps={{
                select: {
                  MenuProps: { slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } },
                },
              }}
            >
              {TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
              ))}
            </TextField>

            {type !== "wifi" ? (
              <TextField
                label={type === "email" ? "Email address" : type === "phone" ? "Phone number" : type === "url" ? "URL" : "Text"}
                type={type === "email" ? "email" : type === "phone" ? "tel" : type === "url" ? "url" : "text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                multiline={type === "text"}
                minRows={type === "text" ? 2 : 1}
                placeholder={
                  type === "url"
                    ? "https://example.com…"
                    : type === "email"
                      ? "name@example.com…"
                      : type === "phone"
                        ? "+1 555 000 0000…"
                        : "Enter text…"
                }
                slotProps={{ input: { inputMode: type === "email" ? "email" : type === "phone" ? "tel" : type === "url" ? "url" : "text", spellCheck: false, autoComplete: "off" } }}
                sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
              />
            ) : (
              <>
                <TextField label="Network name (SSID)" value={ssid} onChange={(e) => setSsid(e.target.value)} fullWidth placeholder="My WiFi network…" slotProps={{ input: { inputMode: "text", spellCheck: false, autoComplete: "off" } }} sx={{ "& .MuiInputBase-root": { minHeight: 44 } }} />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth placeholder="WiFi password…" slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} sx={{ "& .MuiInputBase-root": { minHeight: 44 } }} />
              </>
            )}

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Size: {size}px
              </Typography>
              <Slider value={size} min={128} max={512} step={32} onChange={(_, v) => setSize(Array.isArray(v) ? v[0] : v)} aria-label="QR code size" />
            </Box>

            <TextField
              select
              label="Error correction"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              fullWidth
              helperText="Higher = more scannable when damaged, but denser"
              sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
              slotProps={{
                select: {
                  MenuProps: { slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } },
                },
              }}
            >
              {[["L", "Low"], ["M", "Medium"], ["Q", "Quartile"], ["H", "High"]].map(([v, l]) => (
                <MenuItem key={v} value={v}>{l}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: canGenerate ? "#ffffff" : "background.paper" }}>
            <Box ref={canvasRef} sx={{ lineHeight: 0 }}>
              {canGenerate ? (
                <QRCodeCanvas value={safeValue} size={size} level={level as "L" | "M" | "Q" | "H"} bgColor="#ffffff" fgColor="#0f172a" />
              ) : (
                <Box sx={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", color: "text.disabled", border: "1px dashed", borderColor: "divider" }}>
                  Enter a value
                </Box>
              )}
            </Box>
          </Paper>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={download} disabled={!canGenerate}>
            Download PNG
          </Button>
        </Box>
      </Stack>
    </ToolPaper>
  );
}
