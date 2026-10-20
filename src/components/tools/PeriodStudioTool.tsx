"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PeriodCalculatorTool from "@/components/tools/PeriodCalculatorTool";
import OvulationCalculatorTool from "@/components/tools/OvulationCalculatorTool";

const MODE_LABELS = ["Period", "Ovulation"];

export default function PeriodStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Period and ovulation calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <PeriodCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <OvulationCalculatorTool />
      </Box>
    </>
  );
}
