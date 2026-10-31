
import { useState, useMemo } from "react";
import ToolPaper from "@/components/ToolPaper";import { TextField, Box, Typography, Stack, Button, Tabs, Tab, Alert } from "@/components/ds";

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
          <Typography variant="h6" className="font-bold">
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
              className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[13px] [&_textarea]:leading-[1.6]"
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
            className="p-4 border border-base-300 rounded-[16px] min-h-[380px] bg-base-100 overflow-auto [&_h1]:text-[2rem] [&_h1]:font-extrabold [&_h1]:mt-2 [&_h1]:mb-2 [&_h2]:text-[1.5rem] [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-[1.25rem] [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-[1.1rem] [&_h4]:font-bold [&_h4]:mt-3 [&_h4]:mb-2 [&_h5]:text-[1rem] [&_h5]:font-bold [&_h5]:mt-2 [&_h5]:mb-2 [&_h6]:text-[0.9rem] [&_h6]:font-bold [&_h6]:mt-2 [&_h6]:mb-2 [&_h6]:text-base-content/70 [&_p]:my-2 [&_p]:leading-[1.7] [&_a]:text-primary [&_a]:underline [&_blockquote]:[border-left:4px_solid] [&_blockquote]:border-base-300 [&_blockquote]:pl-4 [&_blockquote]:ml-0 [&_blockquote]:my-3 [&_blockquote]:text-base-content/70 [&_blockquote]:italic [&_ul]:pl-6 [&_ul]:my-2 [&_li]:my-1 [&_code]:[font-family:monospace] [&_code]:text-[13px] [&_code]:[bgcolor:action.hover] [&_code]:px-1.2 [&_code]:py-0.4 [&_code]:rounded-[8px] [&_pre]:bg-[#1e1e1e] [&_pre]:text-[#dcdcdc] [&_pre]:p-4 [&_pre]:rounded-[12px] [&_pre]:overflow-auto [&_pre]:my-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit"
            dangerouslySetInnerHTML={{ __html: html || '<p style="color:#999">Nothing to preview</p>' }}
          />
        )}

        <Stack direction="row" spacing={1} useFlexGap className="flex-wrap">
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
          className="border border-base-300 rounded-[16px] p-3" style={{ backgroundColor: "color-mix(in oklab, var(--color-base-content) 6%, transparent)" }}
        >
          <Typography component="summary" variant="subtitle2" className="cursor-pointer font-bold">
            Generated HTML (for debugging)
          </Typography>
          <Box
            component="pre"
            className="mt-3 p-4 bg-base-100 border border-base-300 rounded-[8px] overflow-auto text-[12px] whitespace-pre-wrap break-words" style={{ fontFamily: "monospace" }}
          >
            {html}
          </Box>
        </Box>
      </Stack>
    </ToolPaper>
  );
}
