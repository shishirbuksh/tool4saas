"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import HashGeneratorTool from "@/components/tools/HashGeneratorTool";
import HmacGeneratorTool from "@/components/tools/HmacGeneratorTool";

const MODE_LABELS = ["Hash", "HMAC"];

export default function HashStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Hash generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <HashGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <HmacGeneratorTool />
      </Box>
    </>
  );
}
