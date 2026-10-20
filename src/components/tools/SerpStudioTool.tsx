"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SerpPreviewTool from "@/components/tools/SerpPreviewTool";
import OpenGraphPreviewTool from "@/components/tools/OpenGraphPreviewTool";

const MODE_LABELS = ["SERP", "Open Graph"];

export default function SerpStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="SERP and social preview modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <SerpPreviewTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <OpenGraphPreviewTool />
      </Box>
    </>
  );
}
