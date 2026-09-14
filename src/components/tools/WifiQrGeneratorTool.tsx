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
        <Box sx={{ flex: 1 }}>
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
              />
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: canGenerate ? "#ffffff" : "background.paper" }}
          >
            <Box ref={canvasRef} sx={{ lineHeight: 0 }}>
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
                  sx={{
                    width: size,
                    height: size,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.disabled",
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
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
