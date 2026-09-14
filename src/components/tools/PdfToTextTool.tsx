"use client";

import { useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { validatePdfFile, validatePdfMagicBytes, MAX_PDF_SIZE, MAX_PDF_PAGES } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

type PdfTextItem = {
  str?: string;
  hasEOL?: boolean;
};

type PdfTextContent = {
  items: PdfTextItem[];
};

type PdfTextPage = {
  getTextContent: () => Promise<PdfTextContent>;
};

type PdfTextDoc = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfTextPage>;
  destroy?: () => Promise<void> | void;
};

type PdfJsLib = {
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfTextDoc> };
  GlobalWorkerOptions?: { workerSrc: string };
};

function parseSelectedPages(input: string, pageCount: number): number[] {
  const raw = input.trim();
  if (!raw) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const parts = raw
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    throw new Error("Enter page ranges, e.g. 1-3,5.");
  }
  const pages: number[] = [];
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
        throw new Error(`Range "${part}" is out of bounds (1–${pageCount}).`);
      }
      if (start > end) {
        throw new Error(`Invalid range "${part}": start is greater than end.`);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      continue;
    }
    if (/^\d+$/.test(part)) {
      const n = parseInt(part, 10);
      if (n < 1 || n > pageCount) {
        throw new Error(`Page "${part}" is out of bounds (1–${pageCount}).`);
      }
      pages.push(n);
      continue;
    }
    throw new Error(`Invalid range "${part}". Use e.g. 1-3,5.`);
  }
  return [...new Set(pages)].sort((a, b) => a - b);
}

export default function PdfToTextTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const [copied, setCopied] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setError("");
    setDone("");
    const f = Array.from(list)[0];
    if (!f) return;
    const v = validatePdfFile(f, MAX_PDF_SIZE);
    if (!v.valid) {
      setError(v.error ?? "Invalid PDF.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFile(f);
    if (inputRef.current) inputRef.current.value = "";
  };

  const clear = () => {
    setFile(null);
    setText("");
    setError("");
    setDone("");
    setCopied(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const extract = async () => {
    if (!file) {
      setError("Select a PDF to extract.");
      return;
    }
    setBusy(true);
    setError("");
    setDone("");
    setText("");
    setCopied(false);
    try {
      const v = validatePdfFile(file, MAX_PDF_SIZE);
      if (!v.valid) {
        setError(v.error ?? "Invalid PDF.");
        return;
      }
      const magic = await validatePdfMagicBytes(file);
      if (!magic.valid) {
        setError(magic.error ?? "Not a valid PDF.");
        return;
      }

      let pdfjsLib: unknown;
      try {
        pdfjsLib = await import("pdfjs-dist");
      } catch {
        setError('Could not load PDF engine. Check your connection and retry.');
        return;
      }

      const pdfjs = pdfjsLib as Partial<PdfJsLib>;
      if (!pdfjs || typeof pdfjs.getDocument !== "function") {
        setError('Could not load PDF engine. Check your connection and retry.');
        return;
      }

      try {
        if (pdfjs.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
      } catch {
        // Worker setup is best-effort; extraction can still work when bundled.
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: bytes }).promise;
      const pageCount = doc.numPages;
      if (!pageCount || pageCount < 1) {
        throw new Error("PDF has no pages.");
      }
      if (pageCount > MAX_PDF_PAGES) {
        throw new Error(`PDF has ${pageCount} pages (max ${MAX_PDF_PAGES}).`);
      }

      const selected = parseSelectedPages(pageRange, pageCount);
      if (selected.length === 0) {
        throw new Error("Enter page ranges, e.g. 1-3,5.");
      }
      if (selected.length > MAX_PDF_PAGES) {
        throw new Error(`Too many pages selected (max ${MAX_PDF_PAGES}).`);
      }

      const sections: string[] = [];
      let emptyPages = 0;
      for (const p of selected) {
        const page = await doc.getPage(p);
        const tc = await page.getTextContent();
        const items = Array.isArray(tc.items) ? tc.items : [];
        let pageText = "";
        for (const it of items) {
          const s = typeof it.str === "string" ? it.str : "";
          pageText += s + (it.hasEOL ? "\n" : " ");
        }
        pageText = pageText.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
        const empty = pageText.length === 0;
        if (empty) emptyPages++;
        sections.push(`--- Page ${p} ---${empty ? " (no extractable text)" : ""}\n${pageText || "[No extractable text on this page — scanned image?]"}`);
      }

      try {
        const maybeDestroy = doc.destroy;
        if (typeof maybeDestroy === "function") {
          await maybeDestroy.call(doc);
        }
      } catch {
        // Cleanup is best-effort.
      }

      setText(sections.join("\n\n"));
      setDone(
        `Extracted ${selected.length} page(s)${emptyPages > 0 ? ` (${emptyPages} empty — scanned image?)` : ""}.`,
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Cannot find module") || msg.includes("pdfjs-dist")) {
        setError('Could not load PDF engine. Check your connection and retry.');
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    const ok = await import("@/lib/clipboard").then((m) => m.copyToClipboard(text));
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const base = (file?.name.replace(/\.pdf$/i, "") || "document").trim() || "document";
    a.href = url;
    a.download = `${base}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const chars = text.length;
  const words = (text.match(/\S+/g) || []).length;

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PDF to Text
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Extract text from a PDF into plain text. Files are processed locally in your browser and never uploaded.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="outlined" component="label">
          Choose PDF
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" hidden onChange={onFile} />
        </Button>
        {file && (
          <Button variant="text" color="error" onClick={clear}>
            Clear
          </Button>
        )}
        <Typography variant="caption" color="text.secondary">
          {file ? `${file.name} (${fmtBytes(file.size)})` : "No file selected (max 10 MB, 200 pages)"}
        </Typography>
      </Stack>
      {file && (
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>
            {file.name} ({fmtBytes(file.size)})
          </Typography>
          <Button size="small" color="error" onClick={clear}>
            Remove
          </Button>
        </Box>
      )}
      <TextField
        label="Page range (optional)"
        placeholder="e.g. 1-3,5"
        helperText="Comma-separated pages and ranges, e.g. 1-3,5. Leave blank for all pages. Numbering starts at 1."
        value={pageRange}
        onChange={(e) => setPageRange(e.target.value)}
        fullWidth
        size="small"
      />
      <Box>
        <Button variant="contained" onClick={extract} disabled={!file || busy}>
          {busy ? "Extracting…" : "Extract text"}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {done && <Alert severity="success">{done}</Alert>}
      {text && (
        <>
          <TextField
            label={`Extracted text (${words} words, ${chars} chars)`}
            multiline
            minRows={10}
            maxRows={24}
            fullWidth
            value={text}
            slotProps={{ input: { readOnly: true, spellCheck: false } }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy} sx={{ minHeight: 44 }}>
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ minHeight: 44 }}>
              Download .txt
            </Button>
          </Stack>
        </>
      )}
      <Alert severity="info">
        Private: text is extracted locally in your browser via <code>pdfjs-dist</code> — your PDF never leaves your
        device. Image-only (scanned) pages have no text layer and are flagged per page.
      </Alert>
    </ToolPaper>
  );
}
