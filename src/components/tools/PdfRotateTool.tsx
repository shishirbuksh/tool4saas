"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { MAX_IMAGE_SIZE } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

const MAX_FILE_SIZE = MAX_IMAGE_SIZE; // 10MB guard
const MAX_FILES = 1;

type RotateAngle = 90 | 180 | 270;

type RotatablePdfPage = {
  setRotation: (angle: unknown) => void;
};

type RotatablePdfDoc = {
  getPages: () => RotatablePdfPage[];
  save: () => Promise<Uint8Array>;
};

type PDFDocumentStatic = {
  load: (data: Uint8Array) => Promise<RotatablePdfDoc>;
};

export default function PdfRotateTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<RotateAngle>(90);
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

  const rotate = async () => {
    if (!file) {
      setError("Select a PDF to rotate.");
      return;
    }
    setBusy(true);
    setError("");
    setDone("");
    try {
      let pdfLib: unknown;
      try {
        // dynamic import("pdf-lib") lazy-loaded on rotate
        // @ts-expect-error - pdf-lib is optional, lazy loaded via dynamic import("pdf-lib")
        pdfLib = await import("pdf-lib" as unknown as number);
      } catch {
        setError('PDF rotate requires "pdf-lib". Run "npm install pdf-lib" to enable client-side rotation.');
        return;
      }

      const PDFDocument = (pdfLib as { PDFDocument?: PDFDocumentStatic })?.PDFDocument;
      const degrees = (pdfLib as { degrees?: (deg: number) => unknown })?.degrees;
      if (!PDFDocument || typeof PDFDocument.load !== "function" || typeof degrees !== "function") {
        setError('PDF rotate requires "pdf-lib". Run "npm install pdf-lib" to enable client-side rotation.');
        return;
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      for (const page of pages) {
        page.setRotation(degrees(angle));
      }
      const outBytes = await doc.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const base = file.name.replace(/\.pdf$/i, "") || "document";
      a.href = url;
      a.download = `${base}-rotated-${angle}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDone(`Rotated ${pages.length} page(s) by ${angle}°. Download started.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Cannot find module") || msg.includes("pdf-lib")) {
        setError('PDF rotate requires "pdf-lib". Run "npm install pdf-lib" to enable client-side rotation.');
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
        PDF Rotate
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Rotate all pages in a PDF by 90, 180, or 270 degrees. Files are processed locally in your browser and never uploaded.
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
        select
        label="Rotation angle"
        helperText="All pages will be rotated clockwise by this angle."
        value={angle}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (v === 90 || v === 180 || v === 270) setAngle(v);
        }}
        fullWidth
        size="small"
      >
        <MenuItem value={90}>90° clockwise</MenuItem>
        <MenuItem value={180}>180°</MenuItem>
        <MenuItem value={270}>270° clockwise</MenuItem>
      </TextField>
      <Box>
        <Button variant="contained" onClick={rotate} disabled={!file || busy}>
          {busy ? "Rotating…" : "Rotate & Download"}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {done && <Alert severity="success">{done}</Alert>}
      <Alert severity="info">
        Client-side rotation requires <code>pdf-lib</code>. Install with <code>npm install pdf-lib</code> and this tool will rotate all pages via{" "}
        <code>dynamic import(&quot;pdf-lib&quot;)</code> without uploading.
      </Alert>
    </ToolPaper>
  );
}
