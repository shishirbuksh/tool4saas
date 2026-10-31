
import { useState } from "react";import { Box, Button, Typography, TextField, Collapse } from "@/components/ds";

import { Code as CodeIcon, ContentCopy as ContentCopyIcon, Check as CheckIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@/components/ds/icons";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n-core";

interface EmbedToolSnippetProps {
  slug: string;
  title: string;
  locale?: Locale;
}

const LABELS: Record<Locale, {
  btnToggle: string;
  desc: string;
  btnCopy: string;
  copied: string;
  freeAttribution: string;
}> = {
  en: {
    btnToggle: "Embed this tool on your website",
    desc: "Add this free, interactive tool to your blog, client website, or student portal. Copy and paste the code below:",
    btnCopy: "Copy Embed Code",
    copied: "Copied to clipboard!",
    freeAttribution: "Free tool provided by",
  },
  es: {
    btnToggle: "Insertar esta herramienta en tu web",
    desc: "Añade esta herramienta gratuita a tu blog, portal o web. Copia y pega el siguiente código HTML:",
    btnCopy: "Copiar código de inserción",
    copied: "¡Copiado al portapapeles!",
    freeAttribution: "Herramienta gratuita por",
  },
  fr: {
    btnToggle: "Intégrer cet outil sur votre site",
    desc: "Ajoutez cet outil interactif gratuit à votre blog ou portail. Copiez et collez le code HTML ci-dessous :",
    btnCopy: "Copier le code d'intégration",
    copied: "Copié dans le presse-papiers !",
    freeAttribution: "Outil gratuit fourni par",
  },
};

export default function EmbedToolSnippet({ slug, title, locale = "en" }: EmbedToolSnippetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = LABELS[locale] || LABELS.en;
  const base = siteConfig.url.replace(/\/$/, "");
  const toolUrl = locale === "en" ? `${base}/${slug}` : `${base}/${locale}/${slug}`;

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
