"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CalorieCalculatorTool from "@/components/tools/CalorieCalculatorTool";
import MacroCalculatorTool from "@/components/tools/MacroCalculatorTool";

const MODE_LABELS = ["Calories", "Macros"];

export default function CalorieStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Calorie and macro calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <CalorieCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <MacroCalculatorTool />
      </Box>
    </>
  );
}
