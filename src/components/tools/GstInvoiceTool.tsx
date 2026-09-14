"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { money } from "@/lib/format";
import { gstSplit } from "@/lib/finance-calc";

const GST_RATES = [5, 12, 18, 28] as const;

const PLACES_OF_SUPPLY = [
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
  "Gujarat",
  "Other",
] as const;

type Item = { desc: string; qty: string; rate: string };

const emptyItem = (): Item => ({ desc: "", qty: "1", rate: "0" });

const num = (v: string) => {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
};

export default function GstInvoiceTool() {
  const [supplier, setSupplier] = useState("Your Name\nYour Address\nyou@example.com");
  const [gstin, setGstin] = useState("");
  const [invNo, setInvNo] = useState("INV-001");
  const [invDate, setInvDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [client, setClient] = useState("Client Name\nClient Address");
  const [placeOfSupply, setPlaceOfSupply] = useState<string>(PLACES_OF_SUPPLY[0]);
  const [interState, setInterState] = useState(false);
  const [items, setItems] = useState<Item[]>([{ desc: "Consulting services", qty: "1", rate: "5000" }]);
  const [gstRate, setGstRate] = useState<number>(18);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, l) => s + num(l.qty) * num(l.rate), 0);
    const split = gstSplit(subtotal, gstRate, interState) ?? { cgst: 0, sgst: 0, igst: 0, total: subtotal };
    return { subtotal, ...split };
  }, [items, gstRate, interState]);

  const updateItem = (i: number, patch: Partial<Item>) =>
    setItems((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  const addItem = () => setItems((ls) => [...ls, emptyItem()]);
  const removeItem = (i: number) => setItems((ls) => (ls.length > 1 ? ls.filter((_, idx) => idx !== i) : ls));

  const invoiceText = useMemo(() => {
    const rows = items
      .map((l, i) => `${i + 1}. ${l.desc || "Item"} — ${num(l.qty)} x ${money(num(l.rate), "INR")} = ${money(num(l.qty) * num(l.rate), "INR")}`)
      .join("\n");
    const taxLines = interState
      ? `IGST (${gstRate}%): ${money(totals.igst, "INR")}`
      : `CGST (${gstRate / 2}%): ${money(totals.cgst, "INR")}\nSGST (${gstRate / 2}%): ${money(totals.sgst, "INR")}`;
    return [
      `TAX INVOICE — ${invNo || "INV"}`,
      `Date: ${invDate || "—"}`,
      ``,
      `Supplier:`,
      supplier || "—",
      gstin ? `GSTIN: ${gstin}` : `GSTIN: —`,
      ``,
      `Bill to:`,
      client || "—",
      `Place of supply: ${placeOfSupply}${interState ? " (inter-state)" : " (same-state)"}`,
      ``,
      `Items:`,
      rows || "—",
      ``,
      `Subtotal: ${money(totals.subtotal, "INR")}`,
      taxLines,
      `Total: ${money(totals.total, "INR")}`,
    ].join("\n");
  }, [items, totals, gstRate, interState, invNo, invDate, supplier, gstin, client, placeOfSupply]);

  const handlePdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const lines = doc.splitTextToSize(invoiceText, 170) as string[];
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
      doc.text("Made with Tool4SaaS — Free, private, no signup — tool4saas.com/freelance-gst-invoice-generator", 15, 290);
      doc.save(`gst-invoice-${invNo.trim() || "draft"}.pdf`);
    } catch (e) {
      alert(e instanceof Error ? e.message : "PDF export failed. Try Print instead.");
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h3" sx={{ fontSize: 20 }}>
          GST invoice details
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handlePdf} sx={{ minHeight: 44 }}>
            Download PDF
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()} sx={{ minHeight: 44 }}>
            Print
          </Button>
        </Stack>
      </Stack>

      <ToolPaper sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Supplier"
              multiline
              minRows={3}
              fullWidth
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Bill to (client)"
              multiline
              minRows={3}
              fullWidth
              value={client}
              onChange={(e) => setClient(e.target.value)}
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="GSTIN" fullWidth value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="e.g. 29ABCDE1234F1Z5" autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField label="Invoice #" fullWidth value={invNo} onChange={(e) => setInvNo(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Invoice date"
              type="date"
              fullWidth
              value={invDate}
              onChange={(e) => setInvDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="medium">
              <InputLabel>Place of supply</InputLabel>
              <Select label="Place of supply" value={placeOfSupply} onChange={(e) => setPlaceOfSupply(e.target.value)}>
                {PLACES_OF_SUPPLY.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth size="medium">
              <InputLabel>GST rate</InputLabel>
              <Select label="GST rate" value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))}>
                {GST_RATES.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}%
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }} sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={<Checkbox checked={interState} onChange={(e) => setInterState(e.target.checked)} />}
              label="Inter-state (IGST)"
            />
          </Grid>
        </Grid>
        <Alert severity="warning">Template only, not tax advice. Confirm GSTIN, SAC and rates with your CA.</Alert>
      </ToolPaper>

      <ToolPaper>
        <Stack spacing={1}>
          {items.map((l, i) => (
            <Grid container spacing={1} key={i} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Description" fullWidth value={l.desc} onChange={(e) => updateItem(i, { desc: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 5, sm: 2 }}>
                <NumericField label="Qty" value={l.qty} onChange={(v) => updateItem(i, { qty: v })} />
              </Grid>
              <Grid size={{ xs: 5, sm: 3 }}>
                <NumericField label="Rate (INR)" value={l.rate} onChange={(v) => updateItem(i, { rate: v })} />
              </Grid>
              <Grid size={{ xs: 2, sm: 1 }}>
                <IconButton onClick={() => removeItem(i)} aria-label="remove item" disabled={items.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 1 }}>
          Add line
        </Button>
      </ToolPaper>

      {/* Printable invoice */}
      <Paper id="gst-invoice-print" sx={{ p: { xs: 3, sm: 5 }, mt: 4, maxWidth: 800, mx: "auto", bgcolor: "#fff", color: "#000" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
              TAX INVOICE
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line", color: "#334155" }}>{supplier || "—"}</Typography>
            <Typography sx={{ color: "#334155", fontSize: 13 }}>GSTIN: {gstin || "—"}</Typography>
          </Box>
          <Box sx={{ textAlign: "right", color: "#334155" }}>
            <Box>
              <strong>#{invNo || "—"}</strong>
            </Box>
            <Box>Date: {invDate || "—"}</Box>
            <Box>Place of supply: {placeOfSupply}</Box>
          </Box>
        </Box>
        <Box sx={{ mb: 3, color: "#334155" }}>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Bill to</Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>{client || "—"}</Typography>
        </Box>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontSize: { xs: 12, sm: 14 } }}>
          <Box component="thead">
            <Box component="tr" sx={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" sx={th}>
                Description
              </Box>
              <Box component="th" sx={{ ...th, textAlign: "right" }}>
                Qty
              </Box>
              <Box component="th" sx={{ ...th, textAlign: "right" }}>
                Rate
              </Box>
              <Box component="th" sx={{ ...th, textAlign: "right" }}>
                Amount
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            {items.map((l, i) => (
              <Box component="tr" key={i} sx={{ borderBottom: "1px solid #e2e8f0", breakInside: "avoid", pageBreakInside: "avoid" }}>
                <Box component="td" sx={td}>
                  {l.desc || "—"}
                </Box>
                <Box component="td" sx={{ ...td, textAlign: "right" }}>
                  {num(l.qty)}
                </Box>
                <Box component="td" sx={{ ...td, textAlign: "right" }}>
                  {money(num(l.rate), "INR")}
                </Box>
                <Box component="td" sx={{ ...td, textAlign: "right" }}>
                  {money(num(l.qty) * num(l.rate), "INR")}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: 280, ml: "auto", mt: 3, color: "#334155" }}>
          <Row label="Subtotal" value={money(totals.subtotal, "INR")} />
          {interState ? (
            <Row label={`IGST (${gstRate}%)`} value={money(totals.igst, "INR")} />
          ) : (
            <>
              <Row label={`CGST (${gstRate / 2}%)`} value={money(totals.cgst, "INR")} />
              <Row label={`SGST (${gstRate / 2}%)`} value={money(totals.sgst, "INR")} />
            </>
          )}
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
            <span>Total</span>
            <span>{money(totals.total, "INR")}</span>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

const th: React.CSSProperties = { textAlign: "left", padding: "8px 4px", fontSize: 12, textTransform: "uppercase", color: "#64748b" };
const td: React.CSSProperties = { padding: "8px 4px" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.25 }}>
      <span>{label}</span>
      <span>{value}</span>
    </Box>
  );
}
