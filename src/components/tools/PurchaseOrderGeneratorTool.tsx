
import { useMemo, useState } from "react";import { Paper, Box, TextField, Button, Typography, Grid, IconButton, Stack, Divider, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import { Delete as DeleteIcon, Add as AddIcon, Print as PrintIcon } from "@/components/ds/icons";
import ToolPaper from "@/components/ToolPaper";
import { money } from "@/lib/format";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"] as const;

type Line = { desc: string; qty: number; rate: number };

const emptyLine = (): Line => ({ desc: "", qty: 1, rate: 0 });

export default function PurchaseOrderGeneratorTool() {
  const [supplier, setSupplier] = useState("Supplier Name\n123 Supplier St\nsupplier@example.com");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [shipTo, setShipTo] = useState("Your Company\n123 Main St\nyou@example.com");
  const [poNumber, setPoNumber] = useState("PO-001");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [lines, setLines] = useState<Line[]>([{ desc: "Item", qty: 1, rate: 100 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState("Thank you!");

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
      <Stack direction="row" className="items-center justify-between mb-4">
        <Typography variant="h3" className="text-[20px]">Purchase order details</Typography>
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
            <TextField label="Supplier" multiline minRows={3} fullWidth value={supplier} onChange={(e) => setSupplier(e.target.value)} slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Ship to" multiline minRows={3} fullWidth value={shipTo} onChange={(e) => setShipTo(e.target.value)} slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField label="PO number" fullWidth value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField label="Date" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
        </Grid>
      </ToolPaper>

      <ToolPaper className="mt-6">
        <Stack spacing={1}>
          {lines.map((l, i) => (
            <Grid container spacing={1} key={i} className="items-center">
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
        <Button startIcon={<AddIcon />} onClick={addLine} className="mt-2">Add line</Button>

        <Grid container spacing={2} className="mt-4 items-center">
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField label="Notes" multiline minRows={2} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Tax %" type="number" fullWidth value={tax} onChange={(e) => setTax(Number(e.target.value))} slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }} />
          </Grid>
        </Grid>
      </ToolPaper>

      {/* Printable purchase order */}
      <Paper id="po-print" className="p-6 sm:p-10 mt-8 max-w-[800px] mx-auto bg-[#fff] text-[#000]">
        <Box className="flex justify-between mb-8">
          <Box>
            <Typography variant="h4" className="font-extrabold text-[#0f172a]">PURCHASE ORDER</Typography>
            <Typography className="whitespace-pre-line text-[#334155]">{shipTo}</Typography>
          </Box>
          <Box className="text-right text-[#334155]">
            <Box><strong>#{poNumber}</strong></Box>
            <Box>Date: {date}</Box>
          </Box>
        </Box>
        <Box className="mb-8 text-[#334155]">
          <Typography className="font-bold mb-1">Supplier</Typography>
          <Typography className="whitespace-pre-line">{supplier}</Typography>
        </Box>
        <Box className="mb-8 text-[#334155]">
          <Typography className="font-bold mb-1">Ship to</Typography>
          <Typography className="whitespace-pre-line">{shipTo}</Typography>
        </Box>
        <Box component="table" className="w-full border-collapse text-[12px] sm:text-[14px]">
          <Box component="thead">
            <Box component="tr" style={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" style={{ ...th }}>Description</Box>
              <Box component="th" className="text-right" style={{ ...th }}>Qty</Box>
              <Box component="th" className="text-right" style={{ ...th }}>Rate</Box>
              <Box component="th" className="text-right" style={{ ...th }}>Amount</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {lines.map((l, i) => (
              <Box component="tr" key={i} className="border-b border-b-[#e2e8f0]">
                <Box component="td" style={{ ...td }}>{l.desc || "—"}</Box>
                <Box component="td" className="text-right" style={{ ...td }}>{l.qty}</Box>
                <Box component="td" className="text-right" style={{ ...td }}>{money(l.rate, currency)}</Box>
                <Box component="td" className="text-right" style={{ ...td }}>{money((l.qty || 0) * (l.rate || 0), currency)}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="w-[260px] ml-auto mt-6 text-[#334155]">
          <Row label="Subtotal" value={money(totals.subtotal, currency)} />
          <Row label={`Tax (${tax}%)`} value={money(totals.taxAmt, currency)} />
          <Divider className="my-2" />
          <Box className="flex justify-between font-extrabold text-[16px]">
            <span>Total</span><span>{money(totals.total, currency)}</span>
          </Box>
        </Box>
        {notes && (
          <Typography className="mt-8 whitespace-pre-line text-[#64748b] text-[13px]">{notes}</Typography>
        )}
      </Paper>
    </Box>
  );
}

const th: React.CSSProperties = { textAlign: "left", padding: "8px 4px", fontSize: 12, textTransform: "uppercase", color: "#64748b" };
const td: React.CSSProperties = { padding: "8px 4px" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box className="flex justify-between py-0.5">
      <span>{label}</span><span>{value}</span>
    </Box>
  );
}
