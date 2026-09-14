"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { copyToClipboard } from "@/lib/clipboard";

export default function UtmBuilderTool() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const { result, error } = useMemo(() => {
    const trimmed = url.trim();
    if (!trimmed) {
      return { result: "", error: "" };
    }
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      return { result: "", error: "Enter a valid absolute URL including https://." };
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { result: "", error: "URL must start with http:// or https://." };
    }

    const params = new URLSearchParams();
    const s = source.trim();
    const m = medium.trim();
    const c = campaign.trim();
    const t = term.trim();
    const co = content.trim();
    if (s) params.set("utm_source", s);
    if (m) params.set("utm_medium", m);
    if (c) params.set("utm_campaign", c);
    if (t) params.set("utm_term", t);
    if (co) params.set("utm_content", co);

    for (const [key, value] of params) {
      parsed.searchParams.set(key, value);
    }

    return { result: parsed.toString(), error: "" };
  }, [url, source, medium, campaign, term, content]);

  const handleCopy = () => {
    if (result) void copyToClipboard(result);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = "utm-url.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <ToolPaper>
      <TextField
        label="Base URL"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/page"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& input": { fontFamily: "monospace", fontSize: 13 } }}
        helperText="Must be an absolute URL including https://"
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Source (utm_source)"
          fullWidth
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="google"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Medium (utm_medium)"
          fullWidth
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          placeholder="cpc"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Campaign (utm_campaign)"
          fullWidth
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          placeholder="spring_sale"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Term (utm_term)"
          fullWidth
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="running+shoes"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Content (utm_content)"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="banner_a"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      {result ? (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Preview — tagged URL
          </Typography>
          <TextField
            value={result}
            multiline
            minRows={3}
            fullWidth
            slotProps={{
              input: { readOnly: true, "aria-label": "Generated UTM URL", spellCheck: false, autoComplete: "off" },
            }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 12, wordBreak: "break-all" } }}
          />
        </Box>
      ) : (
        !error && <Alert severity="info">Enter a base URL above to build your tagged UTM link.</Alert>
      )}

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={handleCopy} disabled={!result}>
          Copy URL
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload} disabled={!result}>
          Download utm-url.txt
        </Button>
      </Stack>
    </ToolPaper>
  );
}
