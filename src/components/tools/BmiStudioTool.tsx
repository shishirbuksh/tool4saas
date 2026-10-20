"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import BmiCalculatorTool from "@/components/tools/BmiCalculatorTool";
import IdealWeightCalculatorTool from "@/components/tools/IdealWeightCalculatorTool";
import BodyFatCalculatorTool from "@/components/tools/BodyFatCalculatorTool";

const MODE_LABELS = ["BMI", "Ideal Weight", "Body Fat"];

export default function BmiStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Body metrics calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <BmiCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <IdealWeightCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <BodyFatCalculatorTool />
      </Box>
    </>
  );
}
