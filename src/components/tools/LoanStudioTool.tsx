"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import EmiCalculatorTool from "@/components/tools/EmiCalculatorTool";
import AutoLoanCalculatorTool from "@/components/tools/AutoLoanCalculatorTool";
import SimpleInterestCalculatorTool from "@/components/tools/SimpleInterestCalculatorTool";

const MODE_LABELS = ["Loan / EMI", "Auto loan", "Simple interest"];

export default function LoanStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Loan calculator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <EmiCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <AutoLoanCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <SimpleInterestCalculatorTool />
      </Box>
    </>
  );
}
