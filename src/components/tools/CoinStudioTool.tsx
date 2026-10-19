"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CoinFlipTool from "@/components/tools/CoinFlipTool";
import DiceRollerTool from "@/components/tools/DiceRollerTool";

const MODE_LABELS = ["Coin", "Dice"];

export default function CoinStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Coin flip and dice modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <CoinFlipTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <DiceRollerTool />
      </Box>
    </>
  );
}
