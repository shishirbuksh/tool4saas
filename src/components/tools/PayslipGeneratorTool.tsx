
import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";import { Paper, Box, TextField, Button, Typography, Stack, Alert, Grid } from "@/components/ds";

import { Download as DownloadIcon, Print as PrintIcon } from "@/components/ds/icons";
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
      doc.text("Made with Tool4SaaS — Free, private, no signup — tool4saas.com/document-generator", 15, 290);
      doc.save(`payslip-${month || "month"}.pdf`);
    } catch (e) {
      alert(e instanceof Error ? e.message : "PDF export failed. Try Print instead.");
    }
  };

  return (
    <Box>
      <ToolPaper>
        <Typography variant="h3" className="text-[20px] font-bold">
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
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handlePdf} className="min-h-[44px]">
            Download PDF
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()} className="min-h-[44px]">
            Print
          </Button>
        </Stack>
        <Alert severity="warning">Illustration only, not proof of employment. Verify with payroll records.</Alert>
      </ToolPaper>

      <Paper id="payslip-print" className="p-6 sm:p-10 mt-6 max-w-[800px] mx-auto bg-[#fff] text-[#000]">
        <Typography variant="h4" className="font-extrabold text-[#0f172a]">
          Payslip — {month || "Month"}
        </Typography>
        <Typography className="text-[13px] text-[#475569] mb-4">
          {employer || "Employer"} · {employee || "Employee"}
        </Typography>
        <Box component="table" className="w-full border-collapse text-[13px]">
          <Box component="thead">
            <Box component="tr" style={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" className="text-left p-2 text-[#64748b]">Item</Box>
              <Box component="th" className="text-right p-2 text-[#64748b]">Amount</Box>
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
        <Box className="flex justify-between mt-4 font-extrabold text-[16px]">
          <span>Net pay</span>
          <span>{money(totals.net, "INR")}</span>
        </Box>
      </Paper>
    </Box>
  );
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <Box component="tr" className="border-b border-b-[#e2e8f0]" style={{ fontWeight: bold ? 700 : 400 }}>
      <Box component="td" className="p-2">{label}</Box>
      <Box component="td" className="p-2 text-right">{money(value, "INR")}</Box>
    </Box>
  );
}
