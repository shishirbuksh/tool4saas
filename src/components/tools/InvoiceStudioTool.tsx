"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import InvoiceTool from "@/components/tools/InvoiceTool";
import GstInvoiceTool from "@/components/tools/GstInvoiceTool";

const MODE_LABELS = ["Invoice", "GST"];

export default function InvoiceStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
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
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <InvoiceTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <GstInvoiceTool />
      </Box>
    </>
  );
}
