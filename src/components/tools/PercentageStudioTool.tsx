"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";
import PercentageChangeTool from "@/components/tools/PercentageChangeTool";
import PercentageDifferenceTool from "@/components/tools/PercentageDifferenceTool";

const MODE_LABELS = ["Percent", "Change", "Difference"];

export default function PercentageStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Percentage calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <PercentageCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <PercentageChangeTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <PercentageDifferenceTool />
      </Box>
    </>
  );
}
