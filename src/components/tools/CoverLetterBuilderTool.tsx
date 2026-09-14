"use client";

import { useState, useMemo, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";

type Tone = "professional" | "friendly" | "enthusiastic" | "formal" | "confident" | "conversational";

const TONE_OPTIONS: { value: Tone; label: string; closing: string }[] = [
  { value: "professional", label: "Professional", closing: "Sincerely," },
  { value: "friendly", label: "Friendly", closing: "Best regards," },
  { value: "enthusiastic", label: "Enthusiastic", closing: "Warmly," },
  { value: "formal", label: "Formal", closing: "Respectfully," },
  { value: "confident", label: "Confident", closing: "Kind regards," },
  { value: "conversational", label: "Conversational", closing: "Thank you," },
];

const DEFAULT_BODY = `Dear {{hiringManager}},

I am writing to express my interest in the {{position}} position at {{company}}. With my background and passion for this field, I am excited about the opportunity to contribute to your team.

In my previous roles, I have developed strong skills that align well with the requirements for this position. I am particularly drawn to {{company}} because of its commitment to excellence and innovation.

I would welcome the chance to discuss how my experience and enthusiasm can benefit {{company}} as a {{position}}. Thank you for considering my application. I look forward to the possibility of speaking with you soon.

{{closing}}
{{applicantName}}`;

function resolvePlaceholders(
  template: string,
  values: Record<string, string>
): string {
  let result = template;
  for (const [key, val] of Object.entries(values)) {
    const placeholder = `{{${key}}}`;
    const placeholderSpaced = `{{ ${key} }}`;
    const bracket = `[${key}]`;
    // case-insensitive variants for common keys
    const variants = [
      placeholder,
      placeholderSpaced,
      bracket,
      `{{${key.toLowerCase()}}}`,
      `{{ ${key.toLowerCase()} }}`,
      `[${key.toLowerCase()}]`,
      `[${capitalize(key)}]`,
    ];
    for (const v of variants) {
      result = result.split(v).join(val || `{{${key}}}`);
    }
    // also replace {{applicantName}} etc in a case-insensitive way via regex for braced form
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "gi");
    result = result.replace(regex, val || `{{${key}}}`);
    const bracketRegex = new RegExp(`\\[${key}\\]`, "gi");
    result = result.replace(bracketRegex, val || `{{${key}}}`);
  }
  return result;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CoverLetterBuilderTool() {
  const [applicantName, setApplicantName] = useState("Alex Johnson");
  const [contact, setContact] = useState("alex.johnson@email.com · (555) 123-4567 · 123 Main St, City, ST 12345");
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);
  const [hiringManager, setHiringManager] = useState("Hiring Manager");
  const [company, setCompany] = useState("Acme Corporation");
  const [position, setPosition] = useState("Product Designer");
  const [tone, setTone] = useState<Tone>("professional");
  const [body, setBody] = useState(DEFAULT_BODY);
  const [copied, setCopied] = useState(false);

  const toneClosing = useMemo(
    () => TONE_OPTIONS.find((t) => t.value === tone)?.closing ?? "Sincerely,",
    [tone]
  );

  const resolvedBody = useMemo(() => {
    return resolvePlaceholders(body, {
      applicantName: applicantName || "Your Name",
      hiringManager: hiringManager || "Hiring Manager",
      company: company || "Company",
      position: position || "Position",
      date: date || new Date().toISOString().slice(0, 10),
      closing: toneClosing,
    });
  }, [body, applicantName, hiringManager, company, position, date, toneClosing]);

  const fullLetterText = useMemo(() => {
    const parts: string[] = [];
    if (applicantName) parts.push(applicantName);
    if (contact) parts.push(contact);
    if (date) parts.push(date);
    parts.push("");
    if (hiringManager) parts.push(`Dear ${hiringManager},`);
    else parts.push("Dear Hiring Manager,");
    if (company) parts.push(company);
    if (position) parts.push(`Re: ${position} Position`);
    parts.push("");
    parts.push(resolvedBody);
    return parts.join("\n");
  }, [applicantName, contact, date, hiringManager, company, position, resolvedBody]);

  const handleCopy = async () => {
    const ok = await import("@/lib/clipboard").then((m) => m.copyToClipboard(fullLetterText));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetBody = () => setBody(DEFAULT_BODY);

  return (
    <Box>
      <ToolPaper>
        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
          Applicant details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Applicant name"
              fullWidth
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="Jane Doe"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Contact (email · phone · address)"
              fullWidth
              multiline
              minRows={2}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email@domain.com · (555) 123-4567 · City, Country"
            />
          </Grid>
        </Grid>
      </ToolPaper>

      <ToolPaper sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
          Recipient details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Hiring manager"
              fullWidth
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              placeholder="Ms. Smith"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Company"
              fullWidth
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Position"
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Senior Frontend Engineer"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Tone</InputLabel>
              <Select
                label="Tone"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
              >
                {TONE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ToolPaper>

      <ToolPaper sx={{ mt: 3 }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
            Letter body
          </Typography>
          <Button size="small" onClick={handleResetBody}>
            Reset template
          </Button>
        </Stack>

        <TextField
          label="Letter body (use placeholders)"
          multiline
          minRows={10}
          fullWidth
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={DEFAULT_BODY}
          helperText="Available placeholders: {{applicantName}}, {{company}}, {{position}}, {{hiringManager}}, {{date}}, {{closing}} — also supports [Company] style. Tone controls the closing phrase."
          slotProps={{ input: { spellCheck: true } }}
          sx={{ "& textarea": { lineHeight: 1.6, fontSize: 14 } }}
        />

        <Typography variant="caption" color="text.secondary">
          Tip: Write naturally and use placeholders where you want auto-replacement. Example: &quot;Dear {"{{hiringManager}}"}, I am excited to apply for the {"{{position}}"} at {"{{company}}"}&quot;
        </Typography>
      </ToolPaper>

      {/* Preview */}
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mt: 4, mb: 2 }}>
        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
          Preview
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
            Print
          </Button>
        </Stack>
      </Stack>

      <Paper
        id="cover-letter-print"
        variant="outlined"
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 800,
          mx: "auto",
          bgcolor: "#fff",
          color: "#000",
          minHeight: 520,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
            {applicantName || "Your Name"}
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#475569", whiteSpace: "pre-line", mt: 0.5 }}>
            {contact || "email@domain.com · (555) 000-0000"}
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#334155", mt: 2 }}>{date || new Date().toISOString().slice(0, 10)}</Typography>
        </Box>

        {/* Recipient block */}
        <Box sx={{ mb: 3, color: "#334155", fontSize: 13, lineHeight: 1.6 }}>
          <Typography sx={{ fontSize: 13, color: "#0f172a", whiteSpace: "pre-line" }}>
            {hiringManager ? `${hiringManager}` : "Hiring Manager"}
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#334155" }}>{company || "Company Name"}</Typography>
          {position && (
            <Typography sx={{ fontSize: 13, color: "#334155" }}>Re: {position} Position</Typography>
          )}
        </Box>

        {/* Body */}
        <Box
          sx={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "#1e293b",
            whiteSpace: "pre-line",
            wordBreak: "break-word",
          }}
        >
          <Typography
            component="div"
            sx={{
              whiteSpace: "pre-line",
              fontSize: 14,
              lineHeight: 1.8,
              color: "#1e293b",
            }}
          >
            {/* Greeting is part of body if user included Dear, otherwise show resolved body directly */}
            {resolvedBody}
          </Typography>
        </Box>

        {/* Tone badge */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Typography
            sx={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              color: "#64748b",
              border: "1px solid #e2e8f0",
              px: 1.2,
              py: 0.4,
              borderRadius: 1,
              bgcolor: "#f8fafc",
            }}
          >
            Tone: {TONE_OPTIONS.find((t) => t.value === tone)?.label}
          </Typography>
        </Box>
      </Paper>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2, textAlign: "center" }}>
        Use Copy to copy the full letter text or Print to print / save as PDF.
      </Typography>
    </Box>
  );
}
