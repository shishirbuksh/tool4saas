"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { MAX_PDF_SIZE, MAX_PDF_FILES, MAX_PDF_PAGES, validatePdfBatch, validatePdfMagicBytes } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

const MAX_FILE_SIZE = MAX_PDF_SIZE;
const MAX_FILES = MAX_PDF_FILES;

type LoadedPdfDoc = {
  getPageCount: () => number;
  getPages: () => unknown[];
};

type CreatedPdfDoc = {
  copyPages: (src: LoadedPdfDoc, indices: number[]) => Promise<unknown[]>;
  addPage: (page: unknown) => void;
  save: () => Promise<Uint8Array>;
};

type PDFDocumentStatic = {
  load: (data: Uint8Array, opts?: { ignoreEncryption?: boolean }) => Promise<LoadedPdfDoc>;
  create: () => CreatedPdfDoc;
};

export default function PdfMergeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setError("");
    setDone("");
    const arr = Array.from(list);
    const combined = [...files, ...arr];
    const batch = validatePdfBatch(combined, { maxFiles: MAX_FILES, maxSize: MAX_FILE_SIZE });
    if (!batch.valid) {
      setError(batch.error || "Invalid files.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFiles((prev) => [...prev, ...arr]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (idx: number) => setFiles((p) => p.filter((_, i) => i !== idx));
  const clear = () => {
    setFiles([]);
    setError("");
    setDone("");
  };

  const merge = async () => {
    if (files.length < 2) {
      setError("Select at least 2 PDFs to merge.");
      return;
    }
    setBusy(true);
    setError("");
    setDone("");
    try {
      for (const f of files) {
        const magic = await validatePdfMagicBytes(f);
        if (!magic.valid) {
          setError(magic.error || "Invalid PDF.");
          return;
        }
      }
      let pdfLib: unknown;
      try {
        pdfLib = await import("pdf-lib");
      } catch {
        setError('Could not load PDF engine. Check your connection and retry.');
        return;
      }
      const PDFDocument = (pdfLib as { PDFDocument?: PDFDocumentStatic })?.PDFDocument;
      if (!PDFDocument || typeof PDFDocument.load !== "function" || typeof PDFDocument.create !== "function") {
        setError('Could not load PDF engine. Check your connection and retry.');
        return;
      }
      const out = PDFDocument.create();
      let totalPages = 0;
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        let src: LoadedPdfDoc;
        try {
          src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        } catch {
          setError(`"${f.name}" could not be parsed (encrypted or corrupt?).`);
          return;
        }
        const count = src.getPageCount();
        if (totalPages + count > MAX_PDF_PAGES) {
          setError(`Too many pages (max ${MAX_PDF_PAGES} total).`);
          return;
        }
        const indices = Array.from({ length: count }, (_, i) => i);
        const copied = await out.copyPages(src, indices);
        for (const page of copied) out.addPage(page);
        totalPages += count;
      }
      const outBytes = await out.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
      setDone(`Merged ${files.length} file(s), ${totalPages} page(s). Download started.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PDF Merge
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Combine multiple PDFs into one document. Files are processed locally in your browser and never uploaded.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="outlined" component="label">
          Add PDFs
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple hidden onChange={onFiles} />
        </Button>
        {files.length > 0 && (
          <Button variant="text" color="error" onClick={clear}>
            Clear all ({files.length})
          </Button>
        )}
        <Typography variant="caption" color="text.secondary">
          {files.length === 0 ? "No files selected" : `${files.length} file(s) ready`}
        </Typography>
      </Stack>
      {files.length > 0 && (
        <Stack spacing={1}>
          {files.map((f, i) => (
            <Box key={`${f.name}-${i}`} sx={{ display: "flex", justifyContent: "space-between", p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>
                {i + 1}. {f.name} ({fmtBytes(f.size)})
              </Typography>
              <Button size="small" color="error" onClick={() => remove(i)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      )}
      <Box>
        <Button variant="contained" onClick={merge} disabled={files.length < 2 || busy}>
          {busy ? "Merging…" : `Merge ${files.length} PDFs`}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {done && <Alert severity="success">{done}</Alert>}
      <Alert severity="info">
        Files are merged locally in your browser via <code>pdf-lib</code> without uploading. Max {MAX_FILES} files, {MAX_PDF_PAGES} pages total.
      </Alert>
    </ToolPaper>
  );
}
