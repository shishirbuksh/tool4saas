"use client";

import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Alert from "@mui/material/Alert";
import { validateImageDimensions, MAX_IMAGE_SIZE, MAX_DIMENSION, MAX_PIXELS } from "@/lib/validate";
import { fmtBytes } from "@/lib/format";

const SVG_MAX_BYTES = 500 * 1024; // 500KB guard

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">\n  <rect width="256" height="256" rx="48" fill="#6366f1"/>\n  <circle cx="128" cy="128" r="64" fill="#ffffff"/>\n</svg>`;

function svgByteLength(str: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str).length;
  }
  return new Blob([str]).size;
}

export default function SvgToPngConverterTool() {
  const [svgText, setSvgText] = useState<string>(DEFAULT_SVG);
  const [scale, setScale] = useState<number>(2);
  const [size, setSize] = useState<number>(512);
  const [result, setResult] = useState<{ url: string; size: number; name: string; width: number; height: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resultUrlRef = useRef<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const revokeResultUrl = () => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    if (result?.url) {
      try {
        URL.revokeObjectURL(result.url);
      } catch {
        /* noop */
      }
    }
  };

  const revokeSourceUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
        resultUrlRef.current = null;
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      if (result?.url) {
        try {
          URL.revokeObjectURL(result.url);
        } catch {
          /* noop */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setSvgText("");
    setError("");
    revokeResultUrl();
    revokeSourceUrl();
    setResult(null);
  };

  const convert = () => {
    const input = svgText.trim();
    if (!input) {
      setError("Please paste SVG markup to convert.");
      return;
    }
    // 500KB guard (byte length, not just char length)
    const bytes = svgByteLength(input);
    if (bytes > SVG_MAX_BYTES || input.length > 500_000) {
      setError(`SVG too large (max 500 KB, got ${fmtBytes(bytes)}).`);
      return;
    }
    // MAX_IMAGE_SIZE guard (follow ImageFormatConverterTool pattern)
    if (bytes > MAX_IMAGE_SIZE) {
      setError(`SVG too large (max ${Math.round(MAX_IMAGE_SIZE / 1024 / 1024)} MB).`);
      return;
    }
    // sanitize: block <script> via check (fail-closed)
    if (input.toLowerCase().includes("<script") || /<script[\s>]/i.test(input)) {
      setError("Blocked: <script> tags are not allowed in SVG input.");
      return;
    }
    if (!input.toLowerCase().includes("<svg")) {
      setError("Input does not look like SVG (missing <svg> tag).");
      return;
    }
    if (!Number.isFinite(size) || size < 16 || size > MAX_DIMENSION) {
      setError(`Base size must be between 16 and ${MAX_DIMENSION}px.`);
      return;
    }
    if (!Number.isFinite(scale) || scale < 0.5 || scale > 8) {
      setError("Scale must be between 0.5x and 8x.");
      return;
    }

    setBusy(true);
    setError("");

    // Revoke previous URLs before creating new ones (revokeObjectURL cleanup)
    revokeResultUrl();
    revokeSourceUrl();

    const svgBlob = new Blob([input], { type: "image/svg+xml;charset=utf-8" });
    if (svgBlob.size > MAX_IMAGE_SIZE) {
      setError(`SVG blob too large (max ${Math.round(MAX_IMAGE_SIZE / 1024 / 1024)} MB).`);
      setBusy(false);
      return;
    }

    const blobUrl = URL.createObjectURL(svgBlob);
    objectUrlRef.current = blobUrl;

    // render SVG via Image with blob URL + canvas drawImage
    const img = new Image();
    img.onload = () => {
      try {
        const intrinsicW = img.naturalWidth || img.width || size;
        const intrinsicH = img.naturalHeight || img.height || size;
        const baseW = intrinsicW > 0 ? intrinsicW : size;
        const baseH = intrinsicH > 0 ? intrinsicH : size;

        // If SVG has no intrinsic dimensions, fall back to size state so
        // output is deterministic (size * scale).
        const hasIntrinsic = Boolean(img.naturalWidth && img.naturalHeight);
        const outW = Math.round((hasIntrinsic ? baseW : size) * scale);
        const outH = Math.round((hasIntrinsic ? baseH : size) * scale);

        if (outW <= 0 || outH <= 0) {
          setError("Could not determine SVG dimensions.");
          setBusy(false);
          return;
        }
        // MAX_IMAGE_SIZE style guards before canvas allocation (OOM guard)
        if (outW > MAX_DIMENSION || outH > MAX_DIMENSION) {
          setError(
            `Output too large — max ${MAX_DIMENSION}px per side (got ${outW}×${outH}). Reduce size or scale.`
          );
          setBusy(false);
          return;
        }
        if (outW * outH > MAX_PIXELS) {
          setError(
            `Output too large — max ${MAX_PIXELS / (1024 * 1024)}MP (got ${Math.round((outW * outH) / (1024 * 1024))}MP). Reduce size or scale.`
          );
          setBusy(false);
          return;
        }
        const dimCheck = validateImageDimensions(outW, outH);
        if (!dimCheck.valid) {
          setError(dimCheck.error || "Output image too large.");
          setBusy(false);
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setError("Canvas not supported in this browser.");
          setBusy(false);
          return;
        }
        ctx.clearRect(0, 0, outW, outH);
        ctx.drawImage(img, 0, 0, outW, outH);

        // toBlob PNG download
        canvas.toBlob(
          (pngBlob) => {
            if (!pngBlob) {
              setError("Conversion failed (toBlob returned null).");
              setBusy(false);
              return;
            }
            if (resultUrlRef.current) {
              URL.revokeObjectURL(resultUrlRef.current);
            }
            const url = URL.createObjectURL(pngBlob);
            resultUrlRef.current = url;
            setResult({ url, size: pngBlob.size, name: "image.png", width: outW, height: outH });
            setBusy(false);
          },
          "image/png"
        );
      } finally {
        revokeSourceUrl();
      }
    };
    img.onerror = () => {
      revokeSourceUrl();
      setError("Could not load the SVG. Check that the markup is valid.");
      setBusy(false);
    };
    img.src = blobUrl;
  };

  const inputBytes = svgText ? svgByteLength(svgText) : 0;

  return (
    <ToolPaper spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        SVG to PNG Converter
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Paste SVG markup and export a PNG at any scale. Everything runs locally in your browser —
        scripts are blocked and nothing is uploaded.
      </Typography>

      <TextField
        label="SVG markup"
        multiline
        minRows={8}
        fullWidth
        value={svgText}
        onChange={(e) => setSvgText(e.target.value)}
        placeholder={`<svg xmlns="http://www.w3.org/2000/svg"><rect fill="#6366f1" /></svg>`}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace", "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
        Input: {fmtBytes(inputBytes)} / {fmtBytes(SVG_MAX_BYTES)} (500KB guard)
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scale: {scale}x
          </Typography>
          <Slider
            value={scale}
            min={0.5}
            max={8}
            step={0.5}
            onChange={(_, v) => setScale(Array.isArray(v) ? v[0] : v)}
            disabled={busy}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${v}x`}
            aria-label="PNG scale"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: 220 } }}>
          <TextField
            label="Base size (px)"
            type="number"
            fullWidth
            size="small"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            slotProps={{ htmlInput: { min: 16, max: MAX_DIMENSION, step: 1 } }}
            disabled={busy}
            helperText="Used when SVG has no width/height"
          />
        </Box>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={convert} disabled={busy || !svgText.trim()}>
          {busy ? "Converting…" : "Convert to PNG"}
        </Button>
        <Button variant="outlined" onClick={handleClear} disabled={busy}>
          Clear
        </Button>
      </Stack>

      {result && (
        <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            Result
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {result.width}×{result.height}px · {fmtBytes(result.size)} · {result.name}
          </Typography>
          <Box
            component="img"
            src={result.url}
            alt="PNG preview"
            sx={{ maxWidth: "100%", borderRadius: 1, my: 1, display: "block" }}
          />
          <Button variant="contained" href={result.url} download={result.name}>
            Download PNG
          </Button>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary">
        SVG is rendered via an Image blob URL and drawn to canvas, then exported with toBlob as
        PNG. &lt;script&gt; content is blocked for safety.
      </Typography>
    </ToolPaper>
  );
}
