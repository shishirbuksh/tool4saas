
import { useRef, useState } from "react";import { Paper, Box, TextField, MenuItem, Slider, Button, Typography, Stack } from "@/components/ds";

import ToolPaper from "@/components/ToolPaper";
import { Download as DownloadIcon } from "@/components/ds/icons";
import dynamic from "@/lib/astro/dynamic";

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

type Security = "WPA" | "WEP" | "nopass";

function escapeWifi(s: string) {
  return s.replace(/([\\;:,\"'])/g, "\\$1");
}

function buildWifiValue(ssid: string, password: string, security: Security) {
  if (security === "nopass") {
    return `WIFI:T:nopass;S:${escapeWifi(ssid)};;`;
  }
  return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(password)};;`;
}

export default function WifiQrGeneratorTool() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState<Security>("WPA");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLDivElement>(null);

  const wifiValue = buildWifiValue(ssid, password, security);
  const canGenerate = ssid.trim().length > 0;

  const download = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "wifi-qrcode.png";
    a.click();
  };

  return (
    <ToolPaper>
      <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        <Box className="flex-1">
          <Stack spacing={2}>
            <TextField
              label="Network name (SSID)"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              fullWidth
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            />
            <TextField
              select
              label="Security"
              value={security}
              onChange={(e) => setSecurity(e.target.value as Security)}
              fullWidth
            >
              <MenuItem value="WPA">WPA / WPA2</MenuItem>
              <MenuItem value="WEP">WEP</MenuItem>
              <MenuItem value="nopass">No password</MenuItem>
            </TextField>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              disabled={security === "nopass"}
              helperText={security === "nopass" ? "No password needed for open networks" : ""}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Size: {size}px
              </Typography>
              <Slider
                value={size}
                min={128}
                max={512}
                step={32}
                onChange={(_, v) => setSize(Array.isArray(v) ? v[0] : v)}
                aria-label="QR code size in pixels"
              />
            </Box>
          </Stack>
        </Box>

        <Box
          className="flex flex-col items-center justify-center gap-4"
        >
          <Paper
            variant="outlined"
            className="p-4" style={{ backgroundColor: canGenerate ? "#ffffff" : "background.paper" }}
          >
            <Box ref={canvasRef} className="leading-[0]">
              {canGenerate ? (
                <QRCodeCanvas
                  value={wifiValue}
                  size={size}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                />
              ) : (
                <Box
                  className="flex items-center justify-center text-base-content/40 border-base-300" style={{ width: size, height: size, border: "1px dashed" }}
                >
                  Enter an SSID
                </Box>
              )}
            </Box>
          </Paper>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={download}
            disabled={!canGenerate}
          >
            Download PNG
          </Button>
        </Box>
      </Stack>
    </ToolPaper>
  );
}
