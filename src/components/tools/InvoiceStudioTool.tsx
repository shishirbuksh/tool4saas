
import { useState } from "react";import { Box, Tab, Tabs } from "@/components/ds";

import InvoiceTool from "@/components/tools/InvoiceTool";
import GstInvoiceTool from "@/components/tools/GstInvoiceTool";

const MODE_LABELS = ["Invoice", "GST"];

export default function InvoiceStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box className="border-b border-base-300 mb-6">
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Invoice generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box style={{ display: mode === 0 ? "block" : "none" }}>
        <InvoiceTool />
      </Box>
      <Box style={{ display: mode === 1 ? "block" : "none" }}>
        <GstInvoiceTool />
      </Box>
    </>
  );
}
