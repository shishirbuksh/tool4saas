"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import GradientGeneratorTool from "@/components/tools/GradientGeneratorTool";
import CssBoxShadowTool from "@/components/tools/CssBoxShadowTool";
import CssBorderRadiusTool from "@/components/tools/CssBorderRadiusTool";
import CssClipPathTool from "@/components/tools/CssClipPathTool";

const MODE_LABELS = ["Gradient", "Shadow", "Radius", "Clip path"];

export default function CssStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="CSS effects studio modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <GradientGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <CssBoxShadowTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <CssBorderRadiusTool />
      </Box>
      <Box sx={{ display: mode === 3 ? "block" : "none" }}>
        <CssClipPathTool />
      </Box>
    </>
  );
}
