"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SalaryCalculatorTool from "@/components/tools/SalaryCalculatorTool";
import UsPaycheckTool from "@/components/tools/UsPaycheckTool";

const MODE_LABELS = ["Salary", "US Paycheck"];

export default function SalaryStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Salary and US paycheck calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <SalaryCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <UsPaycheckTool />
      </Box>
    </>
  );
}
