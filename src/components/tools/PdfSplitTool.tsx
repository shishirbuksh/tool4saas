"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { MAX_IMAGE_SIZE } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

const MAX_FILE_SIZE = MAX_IMAGE_SIZE; // 10MB guard
const MAX_FILES = 1;

type LoadedPdfDoc = {
  getPageCount: () => number;
};

type CreatedPdfDoc = {
  copyPages: (src: LoadedPdfDoc, indices: number[]) => Promise<unknown[]>;
  addPage: (page: unknown) => void;
  save: () => Promise<Uint8Array>;
};

type PDFDocumentStatic = {
  load: (data: Uint8Array) => Promise<LoadedPdfDoc>;
  create: () => CreatedPdfDoc;
};

function parsePageRanges(input: string, pageCount: number): number[] {
  const parts = input
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
        pages.push(i - 1);
      }
      continue;
    }
    if (/^\d+$/.test(part)) {
      const n = parseInt(part, 10);
      if (n < 1 || n > pageCount) {
        throw new Error(`Page "${part}" is out of bounds (1–${pageCount}).`);
      }
      pages.push(n - 1);
      continue;
    }
    throw new Error(`Invalid range "${part}". Use e.g. 1-3,5.`);
  }
  return pages;
}

export default function PdfSplitTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setError("");
    setDone("");
    const arr = Array.from(list);
    if (arr.length > MAX_FILES) {
      setError(`Too many files (max ${MAX_FILES}).`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    const f = arr[0];
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError(`"${f.name}" is not a PDF.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError(`"${f.name}" exceeds 10 MB.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFile(f);
    if (inputRef.current) inputRef.current.value = "";
  };

  const clear = () => {
    setFile(null);
    setError("");
    setDone("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const split = async () => {
    if (!file) {
      setError("Select a PDF to split.");
      return;
    }
    if (!ranges.trim()) {
      setError("Enter page ranges, e.g. 1-3,5.");
      return;
    }
    setBusy(true);
    setError("");
    setDone("");
    try {
      let pdfLib: unknown;
      try {
        // dynamic import("pdf-lib") lazy-loaded on split
        // @ts-expect-error - pdf-lib is optional, lazy loaded via dynamic import("pdf-lib")
        pdfLib = await import("pdf-lib" as unknown as number);
      } catch {
        setError('PDF split requires "pdf-lib". Run "npm install pdf-lib" to enable client-side splitting.');
        return;
      }

      const PDFDocument = (pdfLib as { PDFDocument?: PDFDocumentStatic })?.PDFDocument;
      if (!PDFDocument || typeof PDFDocument.load !== "function" || typeof PDFDocument.create !== "function") {
        setError('PDF split requires "pdf-lib". Run "npm install pdf-lib" to enable client-side splitting.');
        return;
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const src = await PDFDocument.load(bytes);
      const pageCount = src.getPageCount();
      const indices = parsePageRanges(ranges, pageCount);
      if (indices.length === 0) {
        setError("Enter page ranges, e.g. 1-3,5.");
        return;
      }

      const out = PDFDocument.create();
      const copied = await out.copyPages(src, indices);
      for (const page of copied) {
        out.addPage(page);
      }
      const outBytes = await out.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const base = file.name.replace(/\.pdf$/i, "") || "document";
      a.href = url;
      a.download = `${base}-split.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDone(`Extracted ${indices.length} page(s) (${ranges.trim()}). Download started.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Cannot find module") || msg.includes("pdf-lib")) {
        setError('PDF split requires "pdf-lib". Run "npm install pdf-lib" to enable client-side splitting.');
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PDF Split
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Extract pages from a PDF into a new document. Files are processed locally in your browser and never uploaded.
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
          {file ? `${file.name} (${fmtBytes(file.size)})` : "No file selected (max 1)"}
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
        label="Page ranges"
        placeholder="e.g. 1-3,5"
        helperText="Comma-separated pages and ranges, e.g. 1-3,5. Numbering starts at 1."
        value={ranges}
        onChange={(e) => setRanges(e.target.value)}
        fullWidth
        size="small"
      />
      <Box>
        <Button variant="contained" onClick={split} disabled={!file || busy}>
          {busy ? "Splitting…" : "Split & Download"}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {done && <Alert severity="success">{done}</Alert>}
      <Alert severity="info">
        Client-side split requires <code>pdf-lib</code>. Install with <code>npm install pdf-lib</code> and this tool will extract the selected pages in order
        via <code>dynamic import(&quot;pdf-lib&quot;)</code> without uploading.
      </Alert>
    </ToolPaper>
  );
}
