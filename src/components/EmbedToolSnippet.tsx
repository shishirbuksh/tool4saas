import { useState } from "react";
import { Box, Button, Typography, TextField, Collapse } from "@/components/ds";
import { Code as CodeIcon, ContentCopy as ContentCopyIcon, Check as CheckIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@/components/ds/icons";
import { siteConfig } from "@/lib/site";

interface EmbedToolSnippetProps {
  slug: string;
  title: string;
}

const t = {
  btnToggle: "Embed this tool on your website",
  desc: "Add this free, interactive tool to your blog, client website, or student portal. Copy and paste the code below:",
  btnCopy: "Copy Embed Code",
  copied: "Copied to clipboard!",
  freeAttribution: "Free tool provided by",
};

export default function EmbedToolSnippet({ slug, title }: EmbedToolSnippetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const base = siteConfig.url.replace(/\/$/, "");
  const toolUrl = `${base}/${slug}`;

  const snippet = `<iframe src="${toolUrl}" width="100%" height="680" style="border: 1px solid #e2e8f0; border-radius: 12px; max-width: 100%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);" title="${title} - ${siteConfig.name}"></iframe>\n<p style="font-size: 12px; color: #64748b; font-family: sans-serif; margin-top: 6px; text-align: right;">${t.freeAttribution} <a href="${toolUrl}" target="_blank" rel="noopener" style="color: #0284c7; text-decoration: underline;">${siteConfig.name}</a></p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const el = document.getElementById(`embed-code-${slug}`) as HTMLTextAreaElement | null;
      if (el) {
        el.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  return (
    <Box className="mt-6 mb-2">
      <Box className="flex justify-center">
        <Button
          variant="text"
          size="small"
          onClick={() => setOpen(!open)}
          startIcon={<CodeIcon fontSize="small" />}
          endIcon={open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          className="text-base-content/70 text-[0.85rem] normal-case hover:text-primary hover:[bgcolor:action.hover]"
          aria-expanded={open}
          aria-controls={`embed-section-${slug}`}
        >
          {t.btnToggle}
        </Button>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          id={`embed-section-${slug}`}
          className="mt-4 p-6 border border-base-300 rounded-xl bg-base-100"
        >
          <Typography variant="body2" color="text.secondary" className="mb-4 leading-[1.6]">
            {t.desc}
          </Typography>

          <TextField
            id={`embed-code-${slug}`}
            multiline
            rows={4}
            fullWidth
            value={snippet}
            slotProps={{
              input: {
                readOnly: true,
                "aria-label": t.btnToggle,
                sx: {
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  bgcolor: "action.hover",
                },
              },
            }}
          />

          <Box className="flex justify-end mt-3">
            <Button
              variant="contained"
              size="small"
              onClick={handleCopy}
              startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
              color={copied ? "success" : "primary"}
              className="normal-case font-semibold"
            >
              {copied ? t.copied : t.btnCopy}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
