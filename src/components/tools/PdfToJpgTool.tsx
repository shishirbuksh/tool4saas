"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import { MAX_IMAGE_SIZE, MAX_DIMENSION, MAX_PIXELS } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

const MAX_FILE_SIZE = MAX_IMAGE_SIZE; // 10MB guard
const MAX_FILES = 1;

type PdfViewport = {
  width: number;
  height: number;
};

type PdfRenderTask = {
  promise: Promise<void>;
};

type PdfPage = {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => PdfRenderTask;
};

type PdfDoc = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
  destroy?: () => Promise<void> | void;
};

type PdfJsLib = {
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDoc> };
  GlobalWorkerOptions?: { workerSrc: string };
};

function canvasToJpgBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to encode JPG."));
      },
      "image/jpeg",
      quality,
    );
  });
}

export default function PdfToJpgTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [quality, setQuality] = useState(0.85);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const [progress, setProgress] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setError("");
    setDone("");
    setProgress("");
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
    setProgress("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const convert = async () => {
    if (!file) {
      setError("Select a PDF to convert.");
      return;
    }
    setBusy(true);
    setError("");
    setDone("");
    setProgress("");
    try {
      let pdfjsLib: unknown;
      try {
        // dynamic import("pdfjs-dist") lazy-loaded on convert
        pdfjsLib = await import("pdfjs-dist");
      } catch {
        setError('PDF to JPG requires "pdfjs-dist". Run "npm install pdfjs-dist" to enable client-side rendering.');
        return;
      }

      const pdfjs = pdfjsLib as Partial<PdfJsLib>;
      if (!pdfjs || typeof pdfjs.getDocument !== "function") {
        setError('PDF to JPG requires "pdfjs-dist". Run "npm install pdfjs-dist" to enable client-side rendering.');
        return;
      }

      try {
        if (pdfjs.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
      } catch {
        // Worker setup is best-effort; rendering can still work when bundled.
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      const loadingTask = pdfjs.getDocument({ data: bytes });
      const doc = await loadingTask.promise;
      const pageCount = doc.numPages;
      if (!pageCount || pageCount < 1) {
        throw new Error("PDF has no pages.");
      }

      const base = file.name.replace(/\.pdf$/i, "") || "document";
      for (let i = 1; i <= pageCount; i++) {
        setProgress(`Rendering page ${i} of ${pageCount}…`);
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const vw = Math.max(1, Math.floor(viewport.width));
        const vh = Math.max(1, Math.floor(viewport.height));
        // OOM guard before canvas allocation: 8192px per side + 16MP cap
        if (vw > MAX_DIMENSION || vh > MAX_DIMENSION) {
          throw new Error(`Page ${i} too large — max ${MAX_DIMENSION}px per side (got ${vw}×${vh}). Reduce scale.`);
        }
        if (vw * vh > MAX_PIXELS) {
          throw new Error(`Page ${i} too large — max ${MAX_PIXELS / (1024 * 1024)}MP. Reduce scale.`);
        }
        const canvas = document.createElement("canvas");
        canvas.width = vw;
        canvas.height = vh;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Canvas 2D context is not available.");
        }
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Flatten transparency onto white so JPGs don't get black backgrounds.
        const out = document.createElement("canvas");
        out.width = canvas.width;
        out.height = canvas.height;
        const outCtx = out.getContext("2d");
        if (!outCtx) {
          throw new Error("Canvas 2D context is not available.");
        }
        outCtx.fillStyle = "#ffffff";
        outCtx.fillRect(0, 0, out.width, out.height);
        outCtx.drawImage(canvas, 0, 0);

        const blob = await canvasToJpgBlob(out, quality);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${base}-p${i}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        if (pageCount > 1) {
          await new Promise((r) => window.setTimeout(r, 100));
        }
      }

      try {
        const maybeDestroy = (doc as PdfDoc).destroy;
        if (typeof maybeDestroy === "function") {
          await maybeDestroy.call(doc);
        }
      } catch {
        // Cleanup is best-effort.
      }

      setProgress("");
      setDone(`Converted ${pageCount} page(s) to JPG. Downloads started.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Cannot find module") || msg.includes("pdfjs-dist")) {
        setError('PDF to JPG requires "pdfjs-dist". Run "npm install pdfjs-dist" to enable client-side rendering.');
      } else {
        setError(msg);
      }
      setProgress("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PDF to JPG
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Convert each PDF page to a JPG image. Files are processed locally in your browser and never uploaded.
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
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Scale: {scale.toFixed(2)}x (higher = sharper, larger files)
        </Typography>
        <Slider
          value={scale}
          min={1}
          max={3}
          step={0.25}
          onChange={(_, v) => setScale(Array.isArray(v) ? v[0] : v)}
          disabled={!file || busy}
        />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          JPG quality: {Math.round(quality * 100)}%
        </Typography>
        <Slider
          value={quality}
          min={0.1}
          max={1}
          step={0.05}
          onChange={(_, v) => setQuality(Array.isArray(v) ? v[0] : v)}
          disabled={!file || busy}
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={convert} disabled={!file || busy}>
          {busy ? "Converting…" : "Convert & Download JPGs"}
        </Button>
      </Box>
      {busy && progress && <Alert severity="info">{progress}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {done && <Alert severity="success">{done}</Alert>}
      <Alert severity="info">
        Renders pages with <code>pdfjs-dist</code> via <code>dynamic import(&quot;pdfjs-dist&quot;)</code> (
        <code>getDocument</code> + <code>getPage</code> + <code>viewport</code> + <code>canvas</code>{" "}
        <code>render</code>). Install with <code>npm install pdfjs-dist</code>. Tip: to bundle all JPGs into one
        download, pack them into a ZIP (e.g. with <code>jszip</code> via <code>npm install jszip</code> or the
        already-installed <code>fflate</code>).
      </Alert>
    </ToolPaper>
  );
}
