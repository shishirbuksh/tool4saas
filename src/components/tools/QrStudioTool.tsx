"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import QrCodeTool from "@/components/tools/QrCodeTool";
import WifiQrGeneratorTool from "@/components/tools/WifiQrGeneratorTool";

const MODE_LABELS = ["QR Code", "WiFi"];

export default function QrStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="QR code generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <QrCodeTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <WifiQrGeneratorTool />
      </Box>
    </>
  );
}
