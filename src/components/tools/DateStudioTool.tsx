"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import DateCalculatorTool from "@/components/tools/DateCalculatorTool";
import CountdownTimerTool from "@/components/tools/CountdownTimerTool";
import WorkDaysCalculatorTool from "@/components/tools/WorkDaysCalculatorTool";
import TimeDurationCalculatorTool from "@/components/tools/TimeDurationCalculatorTool";

const MODE_LABELS = ["Date Difference", "Countdown", "Work Days", "Duration"];

export default function DateStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Date, countdown and duration modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <DateCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <CountdownTimerTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <WorkDaysCalculatorTool />
      </Box>
      <Box sx={{ display: mode === 3 ? "block" : "none" }}>
        <TimeDurationCalculatorTool />
      </Box>
    </>
  );
}
