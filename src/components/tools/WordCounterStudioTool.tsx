"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import WordCounterTool from "@/components/tools/WordCounterTool";
import KeywordDensityTool from "@/components/tools/KeywordDensityTool";
import ReadabilityCheckerTool from "@/components/tools/ReadabilityCheckerTool";

const MODE_LABELS = ["Word Count", "Keyword Density", "Readability"];

export default function WordCounterStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Word counter and text analysis modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <WordCounterTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <KeywordDensityTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <ReadabilityCheckerTool />
      </Box>
    </>
  );
}
