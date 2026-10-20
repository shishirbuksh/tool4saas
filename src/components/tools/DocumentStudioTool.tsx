"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import QuotationGeneratorTool from "@/components/tools/QuotationGeneratorTool";
import PurchaseOrderGeneratorTool from "@/components/tools/PurchaseOrderGeneratorTool";
import ReceiptGeneratorTool from "@/components/tools/ReceiptGeneratorTool";
import RentReceiptTool from "@/components/tools/RentReceiptTool";
import PayslipGeneratorTool from "@/components/tools/PayslipGeneratorTool";
import OfferLetterGeneratorTool from "@/components/tools/OfferLetterGeneratorTool";

const MODE_LABELS = [
  "Quotation",
  "Purchase Order",
  "Receipt",
  "Rent Receipt",
  "Payslip",
  "Offer Letter",
];

export default function DocumentStudioTool() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={mode}
          onChange={(_event, next: number) => setMode(next)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Document generator modes"
        >
          {MODE_LABELS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: mode === 0 ? "block" : "none" }}>
        <QuotationGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 1 ? "block" : "none" }}>
        <PurchaseOrderGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 2 ? "block" : "none" }}>
        <ReceiptGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 3 ? "block" : "none" }}>
        <RentReceiptTool />
      </Box>
      <Box sx={{ display: mode === 4 ? "block" : "none" }}>
        <PayslipGeneratorTool />
      </Box>
      <Box sx={{ display: mode === 5 ? "block" : "none" }}>
        <OfferLetterGeneratorTool />
      </Box>
    </>
  );
}
