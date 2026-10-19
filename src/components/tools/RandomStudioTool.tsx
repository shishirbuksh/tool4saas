"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import RandomNumberTool from "@/components/tools/RandomNumberTool";
import RandomStringTool from "@/components/tools/RandomStringTool";
import UuidGeneratorTool from "@/components/tools/UuidGeneratorTool";

const MODE_LABELS = ["Numbers", "Strings", "UUIDs"];

export default function RandomStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Random generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <RandomNumberTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <RandomStringTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <UuidGeneratorTool />
      </Box>
    </>
  );
}
