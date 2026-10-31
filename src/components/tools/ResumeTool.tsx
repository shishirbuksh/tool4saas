
import { useState } from "react";import { Paper, Box, TextField, Button, Typography, Grid, IconButton, Stack, Link } from "@/components/ds";

import ToolPaper from "@/components/ToolPaper";
import { Delete as DeleteIcon, Add as AddIcon, Print as PrintIcon } from "@/components/ds/icons";

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
      <Stack direction="row"   className="items-center justify-between mb-4">
        <Typography variant="h3" className="text-[20px]">Resume content</Typography>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()}>Download / Print PDF</Button>
      </Stack>

      <ToolPaper className="mb-6">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }} ><TextField label="Full name" fullWidth value={name} onChange={(e) => setName(e.target.value)} /></Grid>
          <Grid size={{ xs: 12, sm: 4 }} ><TextField label="Headline / title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} /></Grid>
          <Grid size={{ xs: 12, sm: 4 }} ><TextField label="Contact" fullWidth value={contact} onChange={(e) => setContact(e.target.value)} /></Grid>
          <Grid size={{ xs: 12 }}><TextField label="Summary" multiline minRows={2} fullWidth value={summary} onChange={(e) => setSummary(e.target.value)} /></Grid>
          <Grid size={{ xs: 12 }}><TextField label="Skills (comma separated)" fullWidth value={skills} onChange={(e) => setSkills(e.target.value)} /></Grid>
        </Grid>

        <Typography  variant="subtitle1"  className="font-bold mt-6 mb-2">Experience</Typography>
        {exps.map((x, i) => (
          <Stack spacing={1} key={i} className="mb-4 p-4 border border-base-300 rounded-[16px]">
            <Grid container spacing={1}>
              <Grid size={{ xs: 6 }}><TextField label="Role" fullWidth value={x.role} onChange={(e) => setExp(i, { role: e.target.value })} /></Grid>
              <Grid size={{ xs: 6 }}><TextField label="Company" fullWidth value={x.company} onChange={(e) => setExp(i, { company: e.target.value })} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }} ><TextField label="Period" fullWidth value={x.period} onChange={(e) => setExp(i, { period: e.target.value })} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }} ><Box className="flex justify-end"><IconButton onClick={() => setExps((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a))} aria-label="remove experience"><DeleteIcon /></IconButton></Box></Grid>
              <Grid size={{ xs: 12 }}><TextField label="Description" multiline minRows={2} fullWidth value={x.desc} onChange={(e) => setExp(i, { desc: e.target.value })} /></Grid>
            </Grid>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => setExps((a) => [...a, exp()])}>Add experience</Button>

        <Typography  variant="subtitle1"  className="font-bold mt-6 mb-2">Education</Typography>
        {edus.map((x, i) => (
          <Stack spacing={1} key={i} className="mb-4 p-4 border border-base-300 rounded-[16px]">
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

      <Box className="my-4 flex gap-2 flex-wrap items-center">
        <Typography variant="caption" color="text.secondary">
          Writing tips: Ensure your resume clears automated screeners with our{" "}
          <Link href="/blog/resume-builder-guide/ats-resume-guide" underline="hover" color="primary">
            ATS formatting checklist
          </Link>{" "}
          and avoid common disqualifiers in{" "}
          <Link href="/blog/resume-builder-guide/resume-mistakes" underline="hover" color="primary">
            7 resume mistakes that cost interviews
          </Link>.
        </Typography>
      </Box>

      {/* Printable resume */}
      {/* Note: Colors are intentionally hardcoded (light theme) for print fidelity. 
          This serves as a WYSIWYG preview for the paper output even when the app is in dark mode. */}
      <Paper id="resume-print" className="p-6 sm:p-12 max-w-[800px] mx-auto bg-[#fff] text-[#000]">
        <Box className="pb-4 mb-6" style={{ borderBottom: "2px solid #0f172a" }}>
          <Typography className="text-[28px] font-extrabold text-[#0f172a]">{name}</Typography>
          <Typography className="text-[15px] text-[#2563eb] font-semibold">{title}</Typography>
          <Typography className="text-[12px] text-[#475569] mt-1">{contact}</Typography>
        </Box>
        <Section title="Summary">
          <Typography className="text-[13px] text-[#334155] whitespace-pre-line">{summary}</Typography>
        </Section>
        <Section title="Experience">
          {exps.map((x, i) => (
            <Box key={i} className="mb-4 break-inside-avoid">
              <Box className="flex justify-between">
                <Typography className="font-bold text-[#0f172a] text-[14px]">{x.role}</Typography>
                <Typography className="text-[12px] text-[#64748b]">{x.period}</Typography>
              </Box>
              <Typography className="text-[13px] text-[#2563eb] mb-0.5">{x.company}</Typography>
              <Typography className="text-[13px] text-[#334155] whitespace-pre-line">{x.desc}</Typography>
            </Box>
          ))}
        </Section>
        <Section title="Education">
          {edus.map((x, i) => (
            <Box key={i} className="mb-4 break-inside-avoid">
              <Box className="flex justify-between">
                <Typography className="font-semibold text-[#0f172a] text-[14px]">{x.school}</Typography>
                <Typography className="text-[12px] text-[#64748b]">{x.period}</Typography>
              </Box>
              <Typography className="text-[13px] text-[#334155]">{x.degree}</Typography>
            </Box>
          ))}
        </Section>
        <Section title="Skills">
          <Typography className="text-[13px] text-[#334155]">{skills}</Typography>
        </Section>
      </Paper>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box className="mb-6">
      <Typography className="text-[12px] font-extrabold uppercase tracking-[1px] text-[#64748b] mb-2">{title}</Typography>
      {children}
    </Box>
  );
}
