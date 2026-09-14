"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { money } from "@/lib/format";

const num = (v: string) => {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
};

const MODES = ["UPI", "NEFT", "Cash"] as const;
type Mode = (typeof MODES)[number];

/** "Jan, Feb, Mar" -> ["Jan","Feb","Mar"]; "12" -> ["Month 1", ..., "Month 12"]. */
function parseMonths(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];
  if (/^\d+$/.test(trimmed)) {
    const n = Math.min(Math.max(parseInt(trimmed, 10), 0), 60);
    return Array.from({ length: n }, (_, i) => `Month ${i + 1}`);
  }
  return trimmed
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
}

export default function RentReceiptTool() {
  const [tenant, setTenant] = useState("Rahul Sharma");
  const [landlord, setLandlord] = useState("Suresh Patel");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("Flat 4B, Green Apartments, Mumbai");
  const [rent, setRent] = useState("15000");
  const [months, setMonths] = useState("Jan, Feb, Mar");
  const [mode, setMode] = useState<Mode>("UPI");

  const totals = useMemo(() => {
    const monthList = parseMonths(months);
    const monthly = num(rent);
    return { monthList, monthly, total: monthly * monthList.length };
  }, [months, rent]);

  const receiptText = useMemo(
    () =>
      [
        `Rent Receipt`,
        ``,
        `Tenant: ${tenant || "—"}`,
        `Landlord: ${landlord || "—"}`,
        `Landlord PAN: ${pan || "—"}`,
        `Property: ${address || "—"}`,
        `Payment mode: ${mode}`,
        ``,
        `Payments:`,
        ...totals.monthList.map((m) => `${m}: ${money(totals.monthly, "INR")} (${mode})`),
        ``,
        `Total: ${money(totals.total, "INR")}`,
      ].join("\n"),
    [tenant, landlord, pan, address, mode, totals]
  );

  const handlePdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const lines = doc.splitTextToSize(receiptText, 170) as string[];
      let y = 20;
      doc.setFontSize(12);
      for (const line of lines) {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 15, y);
        y += 6;
      }
      doc.setFontSize(8);
      doc.text("Made with Tool4SaaS — tool4saas.com/rent-receipt-generator", 15, 290);
      doc.save("rent-receipt.pdf");
    } catch (e) {
      alert(e instanceof Error ? e.message : "PDF export failed. Try Print instead.");
    }
  };

  return (
    <Box>
      <ToolPaper>
        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
          Rent receipt details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Tenant name" fullWidth value={tenant} onChange={(e) => setTenant(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Landlord name" fullWidth value={landlord} onChange={(e) => setLandlord(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Landlord PAN" fullWidth value={pan} onChange={(e) => setPan(e.target.value)} autoComplete="off" placeholder="ABCDE1234F" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Payment mode</InputLabel>
              <Select
                label="Payment mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                MenuProps={{ slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } }}
                sx={{ minHeight: 44 }}
              >
                {MODES.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField label="Property address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <NumericField label="Monthly rent (INR)" value={rent} onChange={setRent} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Months (comma list or count)"
              fullWidth
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="Jan, Feb, Mar or 12"
              autoComplete="off"
              helperText="e.g. Jan, Feb, Mar — or a count like 12"
            />
          </Grid>
        </Grid>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handlePdf} sx={{ minHeight: 44 }}>
            Download PDF
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()} sx={{ minHeight: 44 }}>
            Print
          </Button>
        </Stack>
        <Alert severity="info">
          HRA note: keep one receipt per month with the landlord&apos;s PAN for HRA claims; confirm requirements with
          your employer or CA.
        </Alert>
      </ToolPaper>

      <Paper id="rent-receipt-print" sx={{ p: { xs: 3, sm: 5 }, mt: 3, maxWidth: 800, mx: "auto", bgcolor: "#fff", color: "#000" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
          Rent Receipt
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#475569", mb: 2 }}>
          {tenant || "Tenant"} · rented from {landlord || "Landlord"}
          {pan ? ` (PAN: ${pan})` : ""}
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#475569", mb: 2 }}>{address || "Property address"}</Typography>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <Box component="thead">
            <Box component="tr" sx={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" sx={{ textAlign: "left", p: 1, color: "#64748b" }}>Month</Box>
              <Box component="th" sx={{ textAlign: "left", p: 1, color: "#64748b" }}>Mode</Box>
              <Box component="th" sx={{ textAlign: "right", p: 1, color: "#64748b" }}>Amount</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {totals.monthList.length === 0 && (
              <Box component="tr" sx={{ borderBottom: "1px solid #e2e8f0" }}>
                <Box component="td" sx={{ p: 1 }} colSpan={3}>
                  No months entered.
                </Box>
              </Box>
            )}
            {totals.monthList.map((m) => (
              <Box component="tr" key={m} sx={{ borderBottom: "1px solid #e2e8f0" }}>
                <Box component="td" sx={{ p: 1 }}>{m}</Box>
                <Box component="td" sx={{ p: 1 }}>{mode}</Box>
                <Box component="td" sx={{ p: 1, textAlign: "right" }}>{money(totals.monthly, "INR")}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, fontWeight: 800, fontSize: 16 }}>
          <span>Total ({totals.monthList.length} month{totals.monthList.length === 1 ? "" : "s"})</span>
          <span>{money(totals.total, "INR")}</span>
        </Box>
      </Paper>
    </Box>
  );
}
