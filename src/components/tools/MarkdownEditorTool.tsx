"use client";

import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import { copyToClipboard } from "@/lib/clipboard";

const MAX_MARKDOWN_SIZE = 500 * 1024; // 500KB guard

const DEFAULT_MARKDOWN = `# Hello World

This is **bold** and *italic* with \`inline code\`.

> A blockquote with a [link](https://example.com)

- List item one
- List item two
- List item three

\`\`\`
// code block
function hello() {
  console.log("Hello, markdown!");
}
\`\`\`

## Subheading

Paragraph with **nested *italic* inside bold**?`;

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttribute(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  // Allowlist protocol ^https?:// and mailto:; block javascript:, data:, vbscript:, etc.
  // Escape quotes handled via escapeAttribute after sanitization.
  if (!/^https?:\/\//i.test(trimmed) && !/^mailto:/i.test(trimmed)) {
    return "#";
  }
  try {
    const parsed = new URL(trimmed);
    if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) {
      return "#";
    }
    return trimmed;
  } catch {
    return "#";
  }
}

function markdownToHtml(md: string): string {
  const codeBlocks: string[] = [];

  // Extract ``` code blocks and replace with placeholders
  let html = md.replace(/```([\s\S]*?)```/g, (_, code: string) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
    return `@@CODEBLOCK_${idx}@@`;
  });

  // Escape remaining HTML
  html = escapeHtml(html);

  // Headings: # h1-h6 (^#{1,6} )
  html = html.replace(/^(#{1,6})\s+(.+)$/gm, (_m, hashes: string, content: string) => {
    const level = hashes.length;
    return `<h${level}>${content.trim()}</h${level}>`;
  });

  // Blockquote: > ...
  html = html.replace(/^&gt;\s?(.*)$/gm, "<blockquote>$1</blockquote>");
  // Merge consecutive blockquotes into one
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "<br>");

  // Unordered lists: - or * list
  html = html.replace(/^[ \t]*[-*]\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/(?:<li>.*<\/li>\n?)+/g, (match: string) => `<ul>\n${match.trim()}\n</ul>`);

  // Inline code `code`
  html = html.replace(/`([^`]+?)`/g, "<code>$1</code>");

  // Links [text](url) - sanitize URL to allowlist http/https/mailto and escape attribute
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m: string, text: string, url: string) => {
    const safeUrl = escapeAttribute(sanitizeUrl(url));
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // Bold **bold**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic *italic* (after bold to avoid conflict)
  html = html.replace(/\*([^*]+?)\*/g, "<em>$1</em>");

  // Paragraphs: split by double newline
  const blocks = html
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  html = blocks
    .map((block) => {
      if (/^<(h[1-6]|ul|blockquote|pre)/.test(block)) {
        return block;
      }
      // Replace single newlines inside paragraph with <br>
      const inner = block.replace(/\n/g, "<br>");
      return `<p>${inner}</p>`;
    })
    .join("\n");

  // Restore code blocks
  codeBlocks.forEach((codeHtml, idx) => {
    html = html.replace(`@@CODEBLOCK_${idx}@@`, codeHtml);
  });

  // Unwrap code blocks that were wrapped in <p>
  html = html.replace(/<p>(<pre><code>[\s\S]*?<\/code><\/pre>)<\/p>/g, "$1");

  return html;
}

export default function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [sizeError, setSizeError] = useState("");

  const html = useMemo(() => markdownToHtml(markdown), [markdown]);

  const handleMarkdownChange = (value: string) => {
    if (value.length > MAX_MARKDOWN_SIZE) {
      setSizeError(`Input too large — max ${MAX_MARKDOWN_SIZE / 1024}KB (got ${Math.round(value.length / 1024)}KB).`);
      // Truncate to max
      setMarkdown(value.slice(0, MAX_MARKDOWN_SIZE));
      return;
    }
    setSizeError("");
    setMarkdown(value);
  };

  const handleCopyHtml = async () => {
    const ok = await copyToClipboard(html);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolPaper>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Markdown Editor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Write markdown and see a live preview. Supports headings, bold, italic, inline code, links, lists, blockquotes and code blocks.
          </Typography>
        </Box>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="markdown editor tabs">
          <Tab label="Write" id="markdown-tab-0" aria-controls="markdown-panel-0" />
          <Tab label="Preview" id="markdown-tab-1" aria-controls="markdown-panel-1" />
        </Tabs>

        {tab === 0 ? (
          <>
            <TextField
              label="Markdown"
              multiline
              minRows={16}
              fullWidth
              value={markdown}
              onChange={(e) => handleMarkdownChange(e.target.value)}
              placeholder="Type your markdown here..."
              slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
              sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13, lineHeight: 1.6 } }}
              helperText={`${markdown.length} / ${MAX_MARKDOWN_SIZE} chars`}
              error={!!sizeError}
            />
            {sizeError && <Alert severity="error">{sizeError}</Alert>}
          </>
        ) : (
          <Box
            role="tabpanel"
            id="markdown-panel-1"
            aria-labelledby="markdown-tab-1"
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              minHeight: 380,
              bgcolor: "background.paper",
              overflow: "auto",
              "& h1": { fontSize: "2rem", fontWeight: 800, mt: 1, mb: 1 },
              "& h2": { fontSize: "1.5rem", fontWeight: 700, mt: 2, mb: 1 },
              "& h3": { fontSize: "1.25rem", fontWeight: 700, mt: 2, mb: 1 },
              "& h4": { fontSize: "1.1rem", fontWeight: 700, mt: 1.5, mb: 1 },
              "& h5": { fontSize: "1rem", fontWeight: 700, mt: 1, mb: 1 },
              "& h6": { fontSize: "0.9rem", fontWeight: 700, mt: 1, mb: 1, color: "text.secondary" },
              "& p": { my: 1, lineHeight: 1.7 },
              "& a": { color: "primary.main", textDecoration: "underline" },
              "& blockquote": {
                borderLeft: "4px solid",
                borderColor: "divider",
                pl: 2,
                ml: 0,
                my: 1.5,
                color: "text.secondary",
                fontStyle: "italic",
              },
              "& ul": { pl: 3, my: 1 },
              "& li": { my: 0.5 },
              "& code": {
                fontFamily: "monospace",
                fontSize: 13,
                bgcolor: "action.hover",
                px: 0.6,
                py: 0.2,
                borderRadius: 1,
              },
              "& pre": {
                bgcolor: "#1e1e1e",
                color: "#dcdcdc",
                p: 2,
                borderRadius: 1.5,
                overflow: "auto",
                my: 1.5,
              },
              "& pre code": {
                bgcolor: "transparent",
                p: 0,
                color: "inherit",
              },
            }}
            dangerouslySetInnerHTML={{ __html: html || '<p style="color:#999">Nothing to preview</p>' }}
          />
        )}

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="contained" onClick={handleCopyHtml} disabled={!html}>
            {copied ? "Copied!" : "Copy HTML"}
          </Button>
          <Button variant="outlined" onClick={() => setMarkdown("")} disabled={!markdown}>
            Clear
          </Button>
          <Button variant="text" onClick={() => setMarkdown(DEFAULT_MARKDOWN)}>
            Reset example
          </Button>
        </Stack>

        <Box
          component="details"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 1.5,
            bgcolor: "action.hover",
          }}
        >
          <Typography component="summary" variant="subtitle2" sx={{ cursor: "pointer", fontWeight: 700 }}>
            Generated HTML (for debugging)
          </Typography>
          <Box
            component="pre"
            sx={{
              mt: 1.5,
              p: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "auto",
              fontSize: 12,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {html}
          </Box>
        </Box>
      </Stack>
    </ToolPaper>
  );
}
