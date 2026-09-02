"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function PdfCompressTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError("File too large (max 10 MB).");
      return;
    }
    setError("");
    setFile(f);
    e.target.value = "";
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      setError('PDF compression requires "pdf-lib" with image recompression. Run "npm install pdf-lib" to enable.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PDF Compressor
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Reduce PDF size in your browser. Your file never leaves your device.
      </Typography>
      <Button variant="outlined" component="label">
        Choose PDF
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" hidden onChange={onFile} />
      </Button>
      {file && <Alert severity="info">Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Compression: {Math.round((1 - quality) * 100)}% (lower quality = smaller file)
        </Typography>
        <Slider value={quality} min={0.1} max={1} step={0.05} onChange={(_, v) => setQuality(v as number)} disabled={!file || busy} />
      </Box>
      <Box>
        <Button variant="contained" onClick={compress} disabled={!file || busy}>
          {busy ? "Compressing…" : "Compress PDF"}
        </Button>
      </Box>
      <Typography variant="caption" color="text.secondary">
        True lossless recompression needs <code>pdf-lib</code>. This placeholder validates and guides installation without uploading.
      </Typography>
    </ToolPaper>
  );
}
