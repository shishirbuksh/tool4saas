"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";

const PRESET_AGENTS = [
  { value: "*", label: "All bots (*)" },
  { value: "Googlebot", label: "Googlebot" },
  { value: "Bingbot", label: "Bingbot" },
  { value: "Googlebot-Image", label: "Googlebot-Image" },
  { value: "Baiduspider", label: "Baiduspider" },
  { value: "Yandex", label: "Yandex" },
  { value: "DuckDuckBot", label: "DuckDuckBot" },
  { value: "facebookexternalhit", label: "Facebook" },
  { value: "Twitterbot", label: "Twitterbot" },
  { value: "custom", label: "Custom…" },
];

const CRAWL_DELAY_OPTIONS = ["", "1", "5", "10", "20", "30", "60"];

function buildRobotsTxt(opts: {
  userAgent: string;
  allow: string;
  disallow: string;
  sitemap: string;
  includeSitemap: boolean;
  crawlDelay: string;
  includeDelay: boolean;
  comment: boolean;
}) {
  const lines: string[] = [];

  if (opts.comment) {
    lines.push("# robots.txt generated — https://example.com/robots.txt");
    lines.push(`# Generated on ${new Date().toISOString().slice(0, 10)}`);
    lines.push("");
  }

  const ua = opts.userAgent.trim() || "*";
  lines.push(`User-agent: ${ua}`);

  const allowList = opts.allow
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const disallowList = opts.disallow
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  // If both empty, explicitly allow root (common default). Keep it comment-friendly.
  if (allowList.length === 0 && disallowList.length === 0) {
    lines.push("Disallow:");
  } else {
    allowList.forEach((p) => lines.push(`Allow: ${p}`));
    disallowList.forEach((p) => lines.push(`Disallow: ${p}`));
  }

  if (opts.includeDelay && opts.crawlDelay.trim() !== "") {
    const v = opts.crawlDelay.trim();
    // only allow numeric
    if (/^\d+(\.\d+)?$/.test(v)) {
      lines.push(`Crawl-delay: ${v}`);
    }
  }

  if (opts.includeSitemap && opts.sitemap.trim() !== "") {
    lines.push("");
    lines.push(`Sitemap: ${opts.sitemap.trim()}`);
  }

  return lines.join("\n");
}

export default function RobotsTxtGeneratorTool() {
  const [agentPreset, setAgentPreset] = useState("*");
  const [customAgent, setCustomAgent] = useState("");
  const [allow, setAllow] = useState("/");
  const [disallow, setDisallow] = useState("/admin/\n/private/");
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [includeSitemap, setIncludeSitemap] = useState(true);
  const [crawlDelay, setCrawlDelay] = useState("10");
  const [includeDelay, setIncludeDelay] = useState(false);
  const [addComment, setAddComment] = useState(true);

  const userAgent = agentPreset === "custom" ? customAgent : agentPreset;

  const output = useMemo(
    () =>
      buildRobotsTxt({
        userAgent,
        allow,
        disallow,
        sitemap,
        includeSitemap,
        crawlDelay,
        includeDelay,
        comment: addComment,
      }),
    [userAgent, allow, disallow, sitemap, includeSitemap, crawlDelay, includeDelay, addComment]
  );

  const copy = () => {
    if (!output) return;
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(output));
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setAgentPreset("*");
    setCustomAgent("");
    setAllow("/");
    setDisallow("/admin/\n/private/");
    setSitemap("https://example.com/sitemap.xml");
    setIncludeSitemap(true);
    setCrawlDelay("10");
    setIncludeDelay(false);
    setAddComment(true);
  };

  return (
    <ToolPaper spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Robots.txt Generator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Configure crawling rules for search bots. One path per line. Preview updates live.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl sx={{ minWidth: 220, flex: 1 }}>
          <InputLabel id="ua-label">User-agent</InputLabel>
          <Select
            labelId="ua-label"
            label="User-agent"
            value={agentPreset}
            onChange={(e) => setAgentPreset(e.target.value)}
          >
            {PRESET_AGENTS.map((a) => (
              <MenuItem key={a.value} value={a.value}>
                {a.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="delay-label">Crawl-delay</InputLabel>
          <Select
            labelId="delay-label"
            label="Crawl-delay"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            disabled={!includeDelay}
          >
            {CRAWL_DELAY_OPTIONS.map((v) => (
              <MenuItem key={v} value={v}>
                {v === "" ? "None" : `${v} sec`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {agentPreset === "custom" && (
        <TextField
          label="Custom User-agent"
          fullWidth
          value={customAgent}
          onChange={(e) => setCustomAgent(e.target.value)}
          placeholder="MyBot/1.0"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Allow paths (one per line)"
          multiline
          minRows={5}
          fullWidth
          value={allow}
          onChange={(e) => setAllow(e.target.value)}
          placeholder={"/\n/public/"}
          helperText="e.g. / or /public/"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
        />
        <TextField
          label="Disallow paths (one per line)"
          multiline
          minRows={5}
          fullWidth
          value={disallow}
          onChange={(e) => setDisallow(e.target.value)}
          placeholder={"/admin/\n/private/\n/tmp/"}
          helperText="e.g. /admin/ — leave blank to allow all"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
        />
      </Stack>

      <TextField
        label="Sitemap URL"
        fullWidth
        value={sitemap}
        onChange={(e) => setSitemap(e.target.value)}
        placeholder="https://example.com/sitemap.xml"
        disabled={!includeSitemap}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
      />

      {/* Free-form crawl-delay input when preset is not enough */}
      <TextField
        label="Custom crawl-delay (seconds)"
        fullWidth
        value={crawlDelay}
        onChange={(e) => setCrawlDelay(e.target.value)}
        placeholder="10"
        disabled={!includeDelay}
        helperText="Numeric value, e.g. 10 or 2.5"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
        <FormControlLabel
          control={
            <Checkbox checked={includeSitemap} onChange={(e) => setIncludeSitemap(e.target.checked)} />
          }
          label="Include Sitemap"
        />
        <FormControlLabel
          control={
            <Checkbox checked={includeDelay} onChange={(e) => setIncludeDelay(e.target.checked)} />
          }
          label="Include Crawl-delay"
        />
        <FormControlLabel
          control={<Checkbox checked={addComment} onChange={(e) => setAddComment(e.target.checked)} />}
          label="Add header comment"
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={copy}>
          Copy
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={download}>
          Download robots.txt
        </Button>
        <Button variant="text" startIcon={<RefreshIcon />} onClick={reset}>
          Reset
        </Button>
      </Stack>

      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Preview — robots.txt
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {output.split("\n").length} lines
          </Typography>
        </Stack>
        <TextField
          value={output}
          multiline
          minRows={10}
          fullWidth
          slotProps={{
            input: { readOnly: true, "aria-label": "Generated robots.txt", spellCheck: false },
          }}
          sx={{
            "& textarea": { fontFamily: "monospace", fontSize: 13, lineHeight: 1.6 },
            bgcolor: "background.default",
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          Place this file at the root of your site (e.g. https://example.com/robots.txt).
        </Typography>
      </Box>
    </ToolPaper>
  );
}
