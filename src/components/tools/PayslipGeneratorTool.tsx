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
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { money } from "@/lib/format";

const num = (v: string) => {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
};

export default function PayslipGeneratorTool() {
  const [employer, setEmployer] = useState("Acme Inc.");
  const [employee, setEmployee] = useState("Jane Doe");
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [basic, setBasic] = useState("40000");
  const [hra, setHra] = useState("16000");
  const [allowances, setAllowances] = useState("10000");
  const [pf, setPf] = useState("4800");
  const [tax, setTax] = useState("5000");
  const [otherDeductions, setOtherDeductions] = useState("0");

  const totals = useMemo(() => {
    const gross = num(basic) + num(hra) + num(allowances);
    const deductions = num(pf) + num(tax) + num(otherDeductions);
    return { gross, deductions, net: gross - deductions };
  }, [basic, hra, allowances, pf, tax, otherDeductions]);

  const slipText = useMemo(
    () =>
      [
        `Payslip — ${month || "Month"}`,
        `Employer: ${employer}`,
        `Employee: ${employee}`,
        ``,
        `Earnings:`,
        `Basic: ${money(num(basic), "INR")}`,
        `HRA: ${money(num(hra), "INR")}`,
        `Allowances: ${money(num(allowances), "INR")}`,
        `Gross: ${money(totals.gross, "INR")}`,
        ``,
        `Deductions:`,
        `PF: ${money(num(pf), "INR")}`,
        `Tax: ${money(num(tax), "INR")}`,
        `Other: ${money(num(otherDeductions), "INR")}`,
        `Total deductions: ${money(totals.deductions, "INR")}`,
        ``,
        `Net pay: ${money(totals.net, "INR")}`,
      ].join("\n"),
    [month, employer, employee, basic, hra, allowances, pf, tax, otherDeductions, totals]
  );

  const handlePdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const lines = doc.splitTextToSize(slipText, 170) as string[];
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
      doc.text("Made with Tool4SaaS — Free, private, no signup — tool4saas.com/payslip-generator", 15, 290);
      doc.save(`payslip-${month || "month"}.pdf`);
    } catch (e) {
      alert(e instanceof Error ? e.message : "PDF export failed. Try Print instead.");
    }
  };

  return (
    <Box>
      <ToolPaper>
        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
          Payslip details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Employer" fullWidth value={employer} onChange={(e) => setEmployer(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Employee" fullWidth value={employee} onChange={(e) => setEmployee(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Pay month" type="month" fullWidth value={month} onChange={(e) => setMonth(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <NumericField label="Basic (INR)" value={basic} onChange={setBasic} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <NumericField label="HRA (INR)" value={hra} onChange={setHra} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <NumericField label="Allowances (INR)" value={allowances} onChange={setAllowances} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <NumericField label="PF (INR)" value={pf} onChange={setPf} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <NumericField label="Tax (INR)" value={tax} onChange={setTax} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <NumericField label="Other deductions (INR)" value={otherDeductions} onChange={setOtherDeductions} />
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
        <Alert severity="warning">Illustration only, not proof of employment. Verify with payroll records.</Alert>
      </ToolPaper>

      <Paper id="payslip-print" sx={{ p: { xs: 3, sm: 5 }, mt: 3, maxWidth: 800, mx: "auto", bgcolor: "#fff", color: "#000" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
          Payslip — {month || "Month"}
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#475569", mb: 2 }}>
          {employer || "Employer"} · {employee || "Employee"}
        </Typography>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <Box component="thead">
            <Box component="tr" sx={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" sx={{ textAlign: "left", p: 1, color: "#64748b" }}>Item</Box>
              <Box component="th" sx={{ textAlign: "right", p: 1, color: "#64748b" }}>Amount</Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Row label="Basic" value={num(basic)} />
            <Row label="HRA" value={num(hra)} />
            <Row label="Allowances" value={num(allowances)} />
            <Row label="Gross pay" value={totals.gross} bold />
            <Row label="PF deduction" value={num(pf)} />
            <Row label="Tax deduction" value={num(tax)} />
            <Row label="Other deductions" value={num(otherDeductions)} />
            <Row label="Total deductions" value={totals.deductions} bold />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, fontWeight: 800, fontSize: 16 }}>
          <span>Net pay</span>
          <span>{money(totals.net, "INR")}</span>
        </Box>
      </Paper>
    </Box>
  );
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <Box component="tr" sx={{ borderBottom: "1px solid #e2e8f0", fontWeight: bold ? 700 : 400 }}>
      <Box component="td" sx={{ p: 1 }}>{label}</Box>
      <Box component="td" sx={{ p: 1, textAlign: "right" }}>{money(value, "INR")}</Box>
    </Box>
  );
}
