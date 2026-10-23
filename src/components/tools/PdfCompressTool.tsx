"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { MAX_PDF_SIZE, validatePdfFile, validatePdfMagicBytes } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

type LoadedPdfDoc = {
  getPageCount: () => number;
};

type PDFDocumentStatic = {
  load: (data: Uint8Array, opts?: { ignoreEncryption?: boolean }) => Promise<LoadedPdfDoc>;
};

export default function PdfCompressTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const check = validatePdfFile(f, MAX_PDF_SIZE);
    if (!check.valid) {
      setError(check.error || "Invalid PDF.");
      setResult("");
      return;
    }
    setError("");
    setResult("");
    setFile(f);
    e.target.value = "";
  };

  const checkPdf = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    setResult("");
    try {
      const magic = await validatePdfMagicBytes(file);
      if (!magic.valid) {
        setError(magic.error || "Not a valid PDF.");
        return;
      }
      let pdfLib: unknown;
      try {
        pdfLib = await import("pdf-lib");
      } catch {
        setError("Could not load the PDF engine. Check your connection and retry.");
        return;
      }
      const PDFDocument = (pdfLib as { PDFDocument?: PDFDocumentStatic })?.PDFDocument;
      if (!PDFDocument || typeof PDFDocument.load !== "function") {
        setError("Could not load the PDF engine. Check your connection and retry.");
        return;
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = doc.getPageCount();
      if (!pages || pages < 1) {
        setError("The PDF has no readable pages.");
        return;
      }
      setResult(`${file.name} is a readable PDF with ${pages} page${pages === 1 ? "" : "s"} (${fmtBytes(file.size)}).`);
    } catch {
      setError("The PDF could not be parsed. It may be encrypted, damaged, or malformed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PDF File Checker
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Check a PDF header, file size, and page count locally. This beta page does not recompress or upload your file.
      </Typography>
      <Button variant="outlined" component="label">
        Choose PDF
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" hidden onChange={onFile} />
      </Button>
      {file && <Alert severity="info">Selected: {file.name} ({fmtBytes(file.size)})</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {result && <Alert severity="success">{result}</Alert>}
      <Box>
        <Button variant="contained" onClick={checkPdf} disabled={!file || busy}>
          {busy ? "Checking…" : "Check PDF"}
        </Button>
      </Box>
      <Alert severity="warning">
        This page validates a PDF but does not make it smaller. Re-export the source document at lower image
        resolution when you need compression.
      </Alert>
    </ToolPaper>
  );
}
