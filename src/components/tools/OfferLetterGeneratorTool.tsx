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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { money } from "@/lib/format";

export default function OfferLetterGeneratorTool() {
  const [candidateName, setCandidateName] = useState("Jane Doe");
  const [role, setRole] = useState("Software Engineer");
  const [company, setCompany] = useState("Acme Inc.");
  const [ctc, setCtc] = useState("800000");
  const [joiningDate, setJoiningDate] = useState("");
  const [location, setLocation] = useState("Bengaluru, India");
  const [probation, setProbation] = useState("3 months");
  const [notice, setNotice] = useState("30 days");
  const [workMode, setWorkMode] = useState("Hybrid");
  const [copied, setCopied] = useState(false);

  const ctcNum = parseFloat(ctc);
  const ctcValid = isFinite(ctcNum) && ctcNum > 0;
  const ctcSafe = ctcValid ? ctcNum : 0;
  const breakdown = useMemo(() => {
    const basic = Math.round(ctcSafe * 0.5);
    const hra = Math.round(ctcSafe * 0.2);
    const special = Math.round(ctcSafe - basic - hra);
    return [
      { label: "Basic Pay (50%)", annual: basic },
      { label: "House Rent Allowance (20%)", annual: hra },
      { label: "Special Allowance (30%)", annual: special },
    ];
  }, [ctcSafe]);

  const monthly = (n: number) => Math.round(n / 12);

  const letterText = useMemo(() => {
    const rows = breakdown.map((b) => `${b.label}: ${money(b.annual, "INR")} / yr (${money(monthly(b.annual), "INR")} / mo)`).join("\n");
    return [
      `${company}`,
      `Offer of Employment`,
      ``,
      `Date: ${joiningDate || new Date().toISOString().slice(0, 10)}`,
      `Candidate: ${candidateName || "Candidate"}`,
      ``,
      `Dear ${candidateName || "Candidate"},`,
      ``,
      `We are pleased to offer you the position of ${role || "Role"} at ${company || "Company"} (${workMode || "On-site"}, ${location || "Location"}).`,
      `Your annual Cost to Company (CTC) will be ${money(ctcSafe, "INR")}, payable as per company payroll cycle.`,
      ``,
      `CTC breakdown:`,
      rows,
      `Total CTC: ${money(ctcSafe, "INR")} / yr (${money(monthly(ctcSafe), "INR")} / mo)`,
      ``,
      `Expected joining date: ${joiningDate || "To be confirmed"}.`,
      `Probation period: ${probation || "As applicable"}. Notice period: ${notice || "As applicable"}.`,
      ``,
      `This offer is subject to verification of documents and acceptance of company policies.`,
      ``,
      `We look forward to you joining ${company || "our team"}.`,
      ``,
      `Sincerely,`,
      `HR, ${company || "Company"}`,
    ].join("\n");
  }, [company, candidateName, role, workMode, location, ctcSafe, breakdown, joiningDate, probation, notice]);

  const handleCopy = async () => {
    const ok = await import("@/lib/clipboard").then((m) => m.copyToClipboard(letterText));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const lines = doc.splitTextToSize(letterText, 170) as string[];
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
      doc.text("Made with Tool4SaaS — Free, private, no signup — tool4saas.com/offer-letter-generator", 15, 290);
      doc.save("offer-letter.pdf");
    } catch (e) {
      alert(e instanceof Error ? e.message : "PDF export failed. Try Print instead.");
    }
  };

  return (
    <Box>
      <ToolPaper>
        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
          Offer details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Candidate name" fullWidth value={candidateName} onChange={(e) => setCandidateName(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Role" fullWidth value={role} onChange={(e) => setRole(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Company" fullWidth value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <NumericField label="Annual CTC (INR)" value={ctc} onChange={setCtc} error={ctc.trim() !== "" && !ctcValid} helperText={ctc.trim() !== "" && !ctcValid ? "Enter an amount greater than 0" : undefined} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Joining date" type="date" fullWidth value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Location" fullWidth value={location} onChange={(e) => setLocation(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Probation" fullWidth value={probation} onChange={(e) => setProbation(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Notice period" fullWidth value={notice} onChange={(e) => setNotice(e.target.value)} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Work mode" fullWidth value={workMode} onChange={(e) => setWorkMode(e.target.value)} placeholder="On-site / Hybrid / Remote" autoComplete="off" />
          </Grid>
        </Grid>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy} sx={{ minHeight: 44 }}>
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handlePdf} sx={{ minHeight: 44 }}>
            Download PDF
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()} sx={{ minHeight: 44 }}>
            Print
          </Button>
        </Stack>
        <Alert severity="warning">Template only, not legal advice. Have HR or counsel review before use.</Alert>
      </ToolPaper>

      <Paper id="offer-letter-print" sx={{ p: { xs: 3, sm: 5 }, mt: 3, maxWidth: 800, mx: "auto", bgcolor: "#fff", color: "#000" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
          {company || "Company"}
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: 13, mb: 2 }}>Offer of Employment</Typography>
        <Typography sx={{ fontSize: 13, color: "#334155", mb: 2 }}>Date: {joiningDate || new Date().toISOString().slice(0, 10)}</Typography>
        <Typography sx={{ fontSize: 14, color: "#1e293b", whiteSpace: "pre-line", lineHeight: 1.8 }}>
          {`Dear ${candidateName || "Candidate"},\n\nWe are pleased to offer you the position of ${role || "Role"} at ${company || "Company"} (${workMode || "On-site"}, ${location || "Location"}). Your annual CTC will be ${ctcNum}, payable per company payroll cycle.\n\nExpected joining: ${joiningDate || "To be confirmed"}. Probation: ${probation || "—"}. Notice: ${notice || "—"}.`}
        </Typography>
        <Box component="table" sx={{ width: "100%", mt: 3, borderCollapse: "collapse", fontSize: 13 }}>
          <Box component="thead">
            <Box component="tr" sx={{ borderBottom: "2px solid #0f172a" }}>
              <Box component="th" sx={{ textAlign: "left", p: 1, color: "#64748b" }}>Component</Box>
              <Box component="th" sx={{ textAlign: "right", p: 1, color: "#64748b" }}>Annual</Box>
              <Box component="th" sx={{ textAlign: "right", p: 1, color: "#64748b" }}>Monthly</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {breakdown.map((b) => (
              <Box component="tr" key={b.label} sx={{ borderBottom: "1px solid #e2e8f0" }}>
                <Box component="td" sx={{ p: 1 }}>{b.label}</Box>
                <Box component="td" sx={{ p: 1, textAlign: "right" }}>{b.annual}</Box>
                <Box component="td" sx={{ p: 1, textAlign: "right" }}>{monthly(b.annual)}</Box>
              </Box>
            ))}
            <Box component="tr" sx={{ fontWeight: 800 }}>
              <Box component="td" sx={{ p: 1 }}>Total CTC</Box>
              <Box component="td" sx={{ p: 1, textAlign: "right" }}>{ctcNum}</Box>
              <Box component="td" sx={{ p: 1, textAlign: "right" }}>{monthly(ctcNum)}</Box>
            </Box>
          </Box>
        </Box>
        <Typography sx={{ mt: 3, fontSize: 13, color: "#334155" }}>
          Sincerely,
          <br />
          HR, {company || "Company"}
        </Typography>
      </Paper>
    </Box>
  );
}
