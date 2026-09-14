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
import Slider from "@mui/material/Slider";
import { MAX_IMAGE_SIZE } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

const MAX_FILE_SIZE = MAX_IMAGE_SIZE; // 10MB guard
const MAX_FILES = 1;

type WatermarkPosition = "center" | "diagonal" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

type WatermarkFont = {
  widthOfTextAtSize: (text: string, size: number) => number;
};

type WatermarkPdfPage = {
  getSize: () => { width: number; height: number };
  drawText: (text: string, options: Record<string, unknown>) => void;
};

type WatermarkPdfDoc = {
  getPages: () => WatermarkPdfPage[];
  embedFont: (font: unknown) => Promise<WatermarkFont>;
  save: () => Promise<Uint8Array>;
};

type PDFDocumentStatic = {
  load: (data: Uint8Array) => Promise<WatermarkPdfDoc>;
};

export default function PdfWatermarkTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [position, setPosition] = useState<WatermarkPosition>("diagonal");
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

  const applyWatermark = async () => {
    if (!file) {
      setError("Select a PDF to watermark.");
      return;
    }
    const text = watermarkText.trim();
    if (!text) {
      setError("Enter watermark text.");
      return;
    }
    if (!(opacity > 0 && opacity <= 1)) {
      setError("Opacity must be between 0 and 1.");
      return;
    }
    setBusy(true);
    setError("");
    setDone("");
    try {
      let pdfLib: unknown;
      try {
        // dynamic import("pdf-lib") lazy-loaded on watermark
        // @ts-expect-error - pdf-lib is optional, lazy loaded via dynamic import("pdf-lib")
        pdfLib = await import("pdf-lib" as unknown as number);
      } catch {
        setError('PDF watermark requires "pdf-lib". Run "npm install pdf-lib" to enable client-side watermarking.');
        return;
      }

      const PDFDocument = (pdfLib as { PDFDocument?: PDFDocumentStatic })?.PDFDocument;
      const StandardFonts = (pdfLib as { StandardFonts?: { HelveticaBold: unknown } })?.StandardFonts;
      const rgb = (pdfLib as { rgb?: (r: number, g: number, b: number) => unknown })?.rgb;
      const degrees = (pdfLib as { degrees?: (deg: number) => unknown })?.degrees;
      if (!PDFDocument || typeof PDFDocument.load !== "function" || !StandardFonts || typeof rgb !== "function" || typeof degrees !== "function") {
        setError('PDF watermark requires "pdf-lib". Run "npm install pdf-lib" to enable client-side watermarking.');
        return;
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      const size = 48;
      const rotation = position === "diagonal" ? -45 : 0;
      const margin = 50;
      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, size);
        let x = (width - textWidth) / 2;
        let y = height / 2;
        if (position === "center" || position === "diagonal") {
          x = (width - textWidth) / 2;
          y = height / 2;
        } else if (position === "top-left") {
          x = margin;
          y = height - margin - size;
        } else if (position === "top-right") {
          x = Math.max(margin, width - textWidth - margin);
          y = height - margin - size;
        } else if (position === "bottom-left") {
          x = margin;
          y = margin;
        } else if (position === "bottom-right") {
          x = Math.max(margin, width - textWidth - margin);
          y = margin;
        }
        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(rotation),
        });
      }
      const outBytes = await doc.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const base = file.name.replace(/\.pdf$/i, "") || "document";
      a.href = url;
      a.download = `${base}-watermarked.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDone(`Watermarked ${pages.length} page(s). Download started.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Cannot find module") || msg.includes("pdf-lib")) {
        setError('PDF watermark requires "pdf-lib". Run "npm install pdf-lib" to enable client-side watermarking.');
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
        PDF Watermark
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Add a text watermark to every page of a PDF. Files are processed locally in your browser and never uploaded.
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
        label="Watermark text"
        helperText="Drawn on each page via drawText."
        value={watermarkText}
        onChange={(e) => setWatermarkText(e.target.value)}
        fullWidth
        size="small"
        slotProps={{ htmlInput: { maxLength: 100 } }}
      />
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Opacity: {opacity.toFixed(2)}
        </Typography>
        <Slider
          min={0.05}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(_, value) => {
            if (typeof value === "number") setOpacity(value);
          }}
          aria-label="Watermark opacity"
        />
      </Box>
      <TextField
        select
        label="Position"
        helperText="Where the watermark is placed on each page."
        value={position}
        onChange={(e) => setPosition(e.target.value as WatermarkPosition)}
        fullWidth
        size="small"
      >
        <MenuItem value="diagonal">Diagonal (center, rotated)</MenuItem>
        <MenuItem value="center">Center</MenuItem>
        <MenuItem value="top-left">Top left</MenuItem>
        <MenuItem value="top-right">Top right</MenuItem>
        <MenuItem value="bottom-left">Bottom left</MenuItem>
        <MenuItem value="bottom-right">Bottom right</MenuItem>
      </TextField>
      <Box>
        <Button variant="contained" onClick={applyWatermark} disabled={!file || busy}>
          {busy ? "Watermarking…" : "Watermark & Download"}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {done && <Alert severity="success">{done}</Alert>}
      <Alert severity="info">
        Client-side watermarking requires <code>pdf-lib</code>. Install with <code>npm install pdf-lib</code> and this tool will stamp all pages via{" "}
        <code>dynamic import(&quot;pdf-lib&quot;)</code> without uploading.
      </Alert>
    </ToolPaper>
  );
}
