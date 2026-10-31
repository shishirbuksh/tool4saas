
import { useMemo, useState } from "react";import { Paper, Box, TextField, Button, Typography, Grid, IconButton, Stack, Divider, Select, MenuItem, FormControl, InputLabel } from "@/components/ds";

import ToolPaper from "@/components/ToolPaper";
import { Delete as DeleteIcon, Add as AddIcon, Print as PrintIcon } from "@/components/ds/icons";
import { money } from "@/lib/format";

const PAYMENT_METHODS = ["Cash", "Card", "Bank Transfer", "UPI", "PayPal", "Other"] as const;

type Line = { desc: string; qty: number; rate: number };

const emptyLine = (): Line => ({ desc: "", qty: 1, rate: 0 });

export default function ReceiptGeneratorTool() {
  const [from, setFrom] = useState("Your Company\n123 Main St\nyou@example.com");
  const [to, setTo] = useState("Client Name\nClient Address\nclient@example.com");
  const [number, setNumber] = useState("RCP-001");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState<(typeof PAYMENT_METHODS)[number]>("Cash");
  const [lines, setLines] = useState<Line[]>([{ desc: "Service", qty: 1, rate: 100 }]);
  const [tax, setTax] = useState(0);

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
        <Typography variant="h3" className="text-[20px]">Receipt details</Typography>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()}>
          Download / Print PDF
        </Button>
      </Stack>

      <ToolPaper className="mb-6">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="From" multiline minRows={3} fullWidth value={from} onChange={(e) => setFrom(e.target.value)} slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Received from" multiline minRows={3} fullWidth value={to} onChange={(e) => setTo(e.target.value)} slotProps={{ input: { spellCheck: false, autoComplete: "off" } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Receipt #" fullWidth value={number} onChange={(e) => setNumber(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Date" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Payment method</InputLabel>
              <Select label="Payment method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}>
                {PAYMENT_METHODS.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ToolPaper>

      <ToolPaper>
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
            <Typography variant="body2" color="text.secondary">
              Amount paid: {money(totals.total)} via {paymentMethod}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Tax %" type="number" fullWidth value={tax} onChange={(e) => setTax(Number(e.target.value))} slotProps={{ input: { inputMode: "decimal", spellCheck: false, autoComplete: "off" } }} />
          </Grid>
        </Grid>
      </ToolPaper>

      {/* Printable receipt */}
      <Paper id="receipt-print" style={{ backgroundColor: "#ffffff", color: "#0f172a" }} className="p-6 sm:p-10 mt-8 max-w-[800px] mx-auto !bg-white !text-slate-900 border border-slate-200">
        <Box className="flex justify-between mb-8">
          <Box>
            <Typography variant="h4" className="font-extrabold text-[#0f172a]">RECEIPT</Typography>
            <Typography className="whitespace-pre-line text-[#334155]">{from}</Typography>
          </Box>
          <Box className="text-right text-[#334155]">
            <Box><strong>#{number}</strong></Box>
            <Box>Date: {date}</Box>
            <Box>Payment: {paymentMethod}</Box>
          </Box>
        </Box>
        <Box className="mb-8 text-[#334155]">
          <Typography className="font-bold mb-1">Received from</Typography>
          <Typography className="whitespace-pre-line">{to}</Typography>
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
              <Box component="tr" key={i} className="border-b border-b-[#e2e8f0] break-inside-avoid">
                <Box component="td" style={{ ...td }}>{l.desc || "—"}</Box>
                <Box component="td" className="text-right" style={{ ...td }}>{l.qty}</Box>
                <Box component="td" className="text-right" style={{ ...td }}>{money(l.rate)}</Box>
                <Box component="td" className="text-right" style={{ ...td }}>{money((l.qty || 0) * (l.rate || 0))}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="w-[260px] ml-auto mt-6 text-[#334155]">
          <Row label="Subtotal" value={money(totals.subtotal)} />
          <Row label={`Tax (${tax}%)`} value={money(totals.taxAmt)} />
          <Divider className="my-2" />
          <Box className="flex justify-between font-extrabold text-[16px]">
            <span>Total paid</span><span>{money(totals.total)}</span>
          </Box>
        </Box>
        <Typography className="mt-8 text-[#64748b] text-[13px]">Paid via {paymentMethod} on {date}.</Typography>
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
