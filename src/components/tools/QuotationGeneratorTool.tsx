"use client";

import { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import ToolPaper from "@/components/ToolPaper";
import { money } from "@/lib/format";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

type Line = { desc: string; qty: number; rate: number };

const emptyLine = (): Line => ({ desc: "", qty: 1, rate: 0 });

export default function QuotationGeneratorTool() {
  const [from, setFrom] = useState("Your Company\n123 Main St\nyou@example.com");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [to, setTo] = useState("Client Name\nClient Address\nclient@example.com");
  const [number, setNumber] = useState("QUO-001");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [validUntil, setValidUntil] = useState("");
  const [lines, setLines] = useState<Line[]>([{ desc: "Service", qty: 1, rate: 100 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState("Thank you for your consideration!");

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + (Number(l.qty) || 0) * (Number(l.rate) || 0), 0);
    const taxAmt = subtotal * ((Number(tax) || 0) / 100);
    return { subtotal, taxAmt, total: subtotal + taxAmt };
  }, [lines, tax]);

  const updateLine = (i: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  const addLine = () => setLines((ls) => [...ls, emptyLine()]);
  const removeLine = (i: number) => setLines((ls) => (ls.length > 1 ? ls.filter((_, idx) => idx !== i) : ls));

  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h3" sx={{ fontSize: 20 }}>Quotation details</Typography>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()}>
          Download / Print PDF
        </Button>
      </Stack>

      <ToolPaper>
        <FormControl fullWidth size="small">
          <InputLabel>Currency</InputLabel>
          <Select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value as typeof currency)}>
            {CURRENCIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="From" multiline minRows={3} fullWidth value={from} onChange={(e) => setFrom(e.target.value)} slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Bill to" multiline minRows={3} fullWidth value={to} onChange={(e) => setTo(e.target.value)} slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField label="Quotation #" fullWidth value={number} onChange={(e) => setNumber(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField label="Date" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField label="Valid until" type="date" fullWidth value={validUntil} onChange={(e) => setValidUntil(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
        </Grid>
      </ToolPaper>

      <ToolPaper sx={{ mt: 3 }}>
        <Stack spacing={1}>
          {lines.map((l, i) => (
            <Grid container spacing={1} key={i} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Description" fullWidth value={l.desc} onChange={(e) => updateLine(i, { desc: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField label="Qty" type="number" fullWidth value={l.qty} onChange={(e) => updateLine(i, { qty: Number(e.target.value) })} slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }} />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <TextField label="Rate" type="number" fullWidth value={l.rate} onChange={(e) => updateLine(i, { rate: Number(e.target.value) })} slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }} />
              </Grid>
              <Grid size={{ xs: 2, sm: 1 }}>
                <IconButton onClick={() => removeLine(i)} aria-label="remove line" disabled={lines.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addLine} sx={{ mt: 1 }}>Add line</Button>

        <Grid container spacing={2} sx={{ mt: 2, alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField label="Notes" multiline minRows={2} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Tax %" type="number" fullWidth value={tax} onChange={(e) => setTax(Number(e.target.value))} slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }} />
          </Grid>
        </Grid>
      </ToolPaper>

      {/* Printable quotation */}
      {/* Note: Colors are intentionally hardcoded (light theme) for print fidelity. 
          This serves as a WYSIWYG preview for the paper output even when the app is in dark mode. */}
      <Paper id="quotation-print" sx={{ p: { xs: 3, sm: 5 }, mt: 4, maxWidth: 800, mx: "auto", bgcolor: "#fff", color: "#000" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>QUOTATION</Typography>
            <Typography sx={{ whiteSpace: "pre-line", color: "#334155" }}>{from}</Typography>
          </Box>
          <Box sx={{ textAlign: "right", color: "#334155" }}>
            <Box><strong>#{number}</strong></Box>
            <Box>Date: {date}</Box>
            {validUntil && <Box>Valid until: {validUntil}</Box>}
          </Box>
        </Box>
        <Box sx={{ mb: 4, color: "#334155" }}>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Bill to</Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>{to}</Typography>
        </Box>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontSize: { xs: 12, sm: 14 } }}>
          <Box component="thead">
            <Box component="tr" sx={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" sx={th}>Description</Box>
              <Box component="th" sx={{ ...th, textAlign: "right" }}>Qty</Box>
              <Box component="th" sx={{ ...th, textAlign: "right" }}>Rate</Box>
              <Box component="th" sx={{ ...th, textAlign: "right" }}>Amount</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {lines.map((l, i) => (
              <Box component="tr" key={i} sx={{ borderBottom: "1px solid #e2e8f0", breakInside: "avoid", pageBreakInside: "avoid" }}>
                <Box component="td" sx={td}>{l.desc || "—"}</Box>
                <Box component="td" sx={{ ...td, textAlign: "right" }}>{l.qty}</Box>
                <Box component="td" sx={{ ...td, textAlign: "right" }}>{money(l.rate, currency)}</Box>
                <Box component="td" sx={{ ...td, textAlign: "right" }}>{money((l.qty || 0) * (l.rate || 0), currency)}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: 260, ml: "auto", mt: 3, color: "#334155" }}>
          <Row label="Subtotal" value={money(totals.subtotal, currency)} />
          <Row label={`Tax (${tax}%)`} value={money(totals.taxAmt, currency)} />
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
            <span>Total</span><span>{money(totals.total, currency)}</span>
          </Box>
        </Box>
        {notes && (
          <Typography sx={{ mt: 4, whiteSpace: "pre-line", color: "#64748b", fontSize: 13 }}>{notes}</Typography>
        )}
      </Paper>
    </Box>
  );
}

const th: React.CSSProperties = { textAlign: "left", padding: "8px 4px", fontSize: 12, textTransform: "uppercase", color: "#64748b" };
const td: React.CSSProperties = { padding: "8px 4px" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.25 }}>
      <span>{label}</span><span>{value}</span>
    </Box>
  );
}
