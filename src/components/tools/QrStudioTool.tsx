
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import QrCodeTool from "@/components/tools/QrCodeTool";
import WifiQrGeneratorTool from "@/components/tools/WifiQrGeneratorTool";

const MODE_LABELS = ["QR Code", "WiFi"];

export default function QrStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
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
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <QrCodeTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <WifiQrGeneratorTool />
      </Box>
    </>
  );
}
