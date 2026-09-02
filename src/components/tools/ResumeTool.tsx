"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";

type Exp = { role: string; company: string; period: string; desc: string };
type Edu = { school: string; degree: string; period: string };

const exp = (): Exp => ({ role: "", company: "", period: "", desc: "" });
const edu = (): Edu => ({ school: "", degree: "", period: "" });

export default function ResumeTool() {
  const [name, setName] = useState("Jane Doe");
  const [title, setTitle] = useState("Senior Product Designer");
  const [contact, setContact] = useState("email@domain.com · (555) 123-4567 · city, country");
  const [summary, setSummary] = useState("Results-driven professional with 8+ years building user-centered products.");
  const [exps, setExps] = useState<Exp[]>([{ role: "Product Designer", company: "Acme Inc.", period: "2020 — Present", desc: "Led design for flagship app; improved retention 30%." }]);
  const [edus, setEdus] = useState<Edu[]>([{ school: "State University", degree: "B.Sc. Computer Science", period: "2012 — 2016" }]);
  const [skills, setSkills] = useState("Figma, React, User Research, Design Systems");

  const setExp = (i: number, p: Partial<Exp>) => setExps((a) => a.map((x, idx) => (idx === i ? { ...x, ...p } : x)));
  const setEdu = (i: number, p: Partial<Edu>) => setEdus((a) => a.map((x, idx) => (idx === i ? { ...x, ...p } : x)));

  return (
    <Box>
      <Stack direction="row"   sx={{ alignItems: "center", justifyContent: "space-between",  mb: 2 }}>
        <Typography variant="h3" sx={{ fontSize: 20 }}>Resume content</Typography>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()}>Download / Print PDF</Button>
      </Stack>

      <ToolPaper sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }} ><TextField label="Full name" fullWidth value={name} onChange={(e) => setName(e.target.value)} /></Grid>
          <Grid size={{ xs: 12, sm: 4 }} ><TextField label="Headline / title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} /></Grid>
          <Grid size={{ xs: 12, sm: 4 }} ><TextField label="Contact" fullWidth value={contact} onChange={(e) => setContact(e.target.value)} /></Grid>
          <Grid size={{ xs: 12 }}><TextField label="Summary" multiline minRows={2} fullWidth value={summary} onChange={(e) => setSummary(e.target.value)} /></Grid>
          <Grid size={{ xs: 12 }}><TextField label="Skills (comma separated)" fullWidth value={skills} onChange={(e) => setSkills(e.target.value)} /></Grid>
        </Grid>

        <Typography  variant="subtitle1"  sx={{ fontWeight: 700,  mt: 3, mb: 1 }}>Experience</Typography>
        {exps.map((x, i) => (
          <Stack spacing={1} key={i} sx={{ mb: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 6 }}><TextField label="Role" fullWidth value={x.role} onChange={(e) => setExp(i, { role: e.target.value })} /></Grid>
              <Grid size={{ xs: 6 }}><TextField label="Company" fullWidth value={x.company} onChange={(e) => setExp(i, { company: e.target.value })} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }} ><TextField label="Period" fullWidth value={x.period} onChange={(e) => setExp(i, { period: e.target.value })} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }} ><Box sx={{ display: "flex", justifyContent: "flex-end" }}><IconButton onClick={() => setExps((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a))} aria-label="remove experience"><DeleteIcon /></IconButton></Box></Grid>
              <Grid size={{ xs: 12 }}><TextField label="Description" multiline minRows={2} fullWidth value={x.desc} onChange={(e) => setExp(i, { desc: e.target.value })} /></Grid>
            </Grid>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => setExps((a) => [...a, exp()])}>Add experience</Button>

        <Typography  variant="subtitle1"  sx={{ fontWeight: 700,  mt: 3, mb: 1 }}>Education</Typography>
        {edus.map((x, i) => (
          <Stack spacing={1} key={i} sx={{ mb: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 6 }}><TextField label="School" fullWidth value={x.school} onChange={(e) => setEdu(i, { school: e.target.value })} /></Grid>
              <Grid size={{ xs: 6 }}><TextField label="Degree" fullWidth value={x.degree} onChange={(e) => setEdu(i, { degree: e.target.value })} /></Grid>
              <Grid size={{ xs: 10, sm: 5 }} ><TextField label="Period" fullWidth value={x.period} onChange={(e) => setEdu(i, { period: e.target.value })} /></Grid>
              <Grid size={{ xs: 2, sm: 1 }} ><IconButton onClick={() => setEdus((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a))} aria-label="remove education"><DeleteIcon /></IconButton></Grid>
            </Grid>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => setEdus((a) => [...a, edu()])}>Add education</Button>
      </ToolPaper>

      {/* Printable resume */}
      <Paper id="resume-print" sx={{ p: { xs: 3, sm: 6 }, maxWidth: 800, mx: "auto", bgcolor: "#fff", color: "#000" }}>
        <Box sx={{ borderBottom: "2px solid #0f172a", pb: 2, mb: 3 }}>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{name}</Typography>
          <Typography sx={{ fontSize: 15, color: "#2563eb", fontWeight: 600 }}>{title}</Typography>
          <Typography sx={{ fontSize: 12, color: "#475569", mt: 0.5 }}>{contact}</Typography>
        </Box>
        <Section title="Summary">
          <Typography sx={{ fontSize: 13, color: "#334155", whiteSpace: "pre-line" }}>{summary}</Typography>
        </Section>
        <Section title="Experience">
          {exps.map((x, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>{x.role}</Typography>
                <Typography sx={{ fontSize: 12, color: "#64748b" }}>{x.period}</Typography>
              </Box>
              <Typography sx={{ fontSize: 13, color: "#2563eb", mb: 0.25 }}>{x.company}</Typography>
              <Typography sx={{ fontSize: 13, color: "#334155", whiteSpace: "pre-line" }}>{x.desc}</Typography>
            </Box>
          ))}
        </Section>
        <Section title="Education">
          {edus.map((x, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, color: "#0f172a", fontSize: 14 }}>{x.school}</Typography>
                <Typography sx={{ fontSize: 12, color: "#64748b" }}>{x.period}</Typography>
              </Box>
              <Typography sx={{ fontSize: 13, color: "#334155" }}>{x.degree}</Typography>
            </Box>
          ))}
        </Section>
        <Section title="Skills">
          <Typography sx={{ fontSize: 13, color: "#334155" }}>{skills}</Typography>
        </Section>
      </Paper>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#64748b", mb: 1 }}>{title}</Typography>
      {children}
    </Box>
  );
}
