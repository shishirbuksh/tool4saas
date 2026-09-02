"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { copyToClipboard } from "@/lib/clipboard";

const CHANGEFREQ_OPTIONS = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"] as const;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function SitemapGeneratorTool() {
  const [raw, setRaw] = useState("");
  const [changefreq, setChangefreq] = useState<(typeof CHANGEFREQ_OPTIONS)[number]>("weekly");
  const [priority, setPriority] = useState("0.8");
  const [lastmod, setLastmod] = useState("");

  const { validUrls, invalidUrls } = useMemo(() => {
    const lines = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    const valid: string[] = [];
    const invalid: string[] = [];
    for (const line of lines) {
      try {
        const u = new URL(line);
        if (u.protocol === "http:" || u.protocol === "https:") {
          valid.push(u.toString());
        } else {
          invalid.push(line);
        }
      } catch {
        invalid.push(line);
      }
    }
    return { validUrls: valid, invalidUrls: invalid };
  }, [raw]);

  const priorityValid = useMemo(() => {
    if (priority === "") return true;
    const n = Number(priority);
    return !Number.isNaN(n) && n >= 0 && n <= 1;
  }, [priority]);

  const xml = useMemo(() => {
    if (validUrls.length === 0) return "";
    const lastmodTag = lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>\n` : "";
    const changefreqTag = changefreq ? `    <changefreq>${escapeXml(changefreq)}</changefreq>\n` : "";
    const priorityTag = priority !== "" && priorityValid ? `    <priority>${escapeXml(priority)}</priority>\n` : "";

    const urls = validUrls
      .map(
        (url) =>
          `  <url>\n    <loc>${escapeXml(url)}</loc>\n${lastmodTag}${changefreqTag}${priorityTag}  </url>`
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  }, [validUrls, changefreq, priority, priorityValid, lastmod]);

  const handleCopy = () => {
    if (xml) void copyToClipboard(xml);
  };

  const handleDownload = () => {
    if (!xml) return;
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPaper>
      <TextField
        label="URLs (one per line)"
        multiline
        minRows={8}
        fullWidth
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={"https://example.com/\nhttps://example.com/about\nhttps://example.com/contact"}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
        helperText={`${validUrls.length} valid • ${invalidUrls.length} invalid`}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl sx={{ minWidth: 180, flex: 1 }}>
          <InputLabel>Changefreq</InputLabel>
          <Select
            label="Changefreq"
            value={changefreq}
            onChange={(e) => setChangefreq(e.target.value as (typeof CHANGEFREQ_OPTIONS)[number])}
          >
            {CHANGEFREQ_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Priority (0.0 - 1.0)"
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          slotProps={{ htmlInput: { min: 0, max: 1, step: 0.1 } }}
          error={!priorityValid}
          helperText={!priorityValid ? "Priority must be between 0.0 and 1.0" : " "}
          sx={{ flex: 1 }}
        />

        <TextField
          label="Lastmod"
          type="date"
          value={lastmod}
          onChange={(e) => setLastmod(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ flex: 1 }}
          helperText="Optional"
        />
      </Stack>

      {invalidUrls.length > 0 && (
        <Alert severity="error">
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Invalid URLs ({invalidUrls.length}):
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2, wordBreak: "break-all", fontFamily: "monospace", fontSize: 13 }}>
            {invalidUrls.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </Box>
        </Alert>
      )}

      {validUrls.length > 0 && !priorityValid && (
        <Alert severity="warning">Fix priority value to generate a valid sitemap.</Alert>
      )}

      {xml ? (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Preview — sitemap.xml ({validUrls.length} URL{validUrls.length === 1 ? "" : "s"})
          </Typography>
          <TextField
            value={xml}
            multiline
            minRows={12}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Generated sitemap XML", spellCheck: false, autoComplete: "off" } }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 12 } }}
          />
        </Box>
      ) : (
        <Alert severity="info">Enter at least one valid absolute URL (including https://) to generate the sitemap.</Alert>
      )}

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={handleCopy} disabled={!xml}>
          Copy XML
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload} disabled={!xml}>
          Download sitemap.xml
        </Button>
      </Stack>
    </ToolPaper>
  );
}
