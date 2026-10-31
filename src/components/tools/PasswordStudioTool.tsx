
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import RandomPassphraseTool from "@/components/tools/RandomPassphraseTool";

const MODE_LABELS = ["Password", "Passphrase"];

export default function PasswordStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
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
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <PasswordGeneratorTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <RandomPassphraseTool />
      </Box>
    </>
  );
}
