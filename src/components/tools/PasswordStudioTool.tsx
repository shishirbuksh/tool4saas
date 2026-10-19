"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import RandomPassphraseTool from "@/components/tools/RandomPassphraseTool";

const MODE_LABELS = ["Password", "Passphrase"];

export default function PasswordStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Password and passphrase modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <PasswordGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <RandomPassphraseTool />
      </Box>
    </>
  );
}
