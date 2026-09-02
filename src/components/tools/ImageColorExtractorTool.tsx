"use client";

import { useState, useRef, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { validateImageFile } from "@/lib/validate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type Swatch = {
  hex: string;
  count: number;
};

function toHex(n: number): string {
  return n.toString(16).padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function ImageColorExtractorTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [colors, setColors] = useState<Swatch[]>([]);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  // revoke object URLs when they change or on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // also revoke on unmount for any blob url (safety)
  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = (hex: string) => {
    if (!hex) return;
    void import("@/lib/clipboard").then((m) => m.copyToClipboard(hex)).then(() => {
      setCopied(hex);
      setTimeout(() => setCopied(""), 1500);
    });
  };

  const extractFromImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current ?? document.createElement("canvas");
    // scale down for performance - max 200px on longest side
    const maxSize = 200;
    let w = img.naturalWidth || img.width;
    let h = img.naturalHeight || img.height;
    if (w > maxSize || h > maxSize) {
      const ratio = Math.min(maxSize / w, maxSize / h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);
    }
    // ensure at least 1
    w = Math.max(1, w);
    h = Math.max(1, h);

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas not supported in this browser.");
      return;
    }
    ctx.drawImage(img, 0, 0, w, h);
    let imageData: ImageData;
    try {
      imageData = ctx.getImageData(0, 0, w, h);
    } catch {
      setError("Could not read image data (CORS-tainted canvas).");
      return;
    }
    const data = imageData.data;

    // Simple quantization via bucketing: 16 levels per channel = 4096 buckets
    // key = (r4 << 8) | (g4 << 4) | b4
    const buckets = new Map<number, { count: number; rSum: number; gSum: number; bSum: number }>();

    // sample every pixel; for large images we already scaled down
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 16) continue; // skip transparent
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const r4 = r >> 4;
      const g4 = g >> 4;
      const b4 = b >> 4;
      const key = (r4 << 8) | (g4 << 4) | b4;
      const existing = buckets.get(key);
      if (existing) {
        existing.count += 1;
        existing.rSum += r;
        existing.gSum += g;
        existing.bSum += b;
      } else {
        buckets.set(key, { count: 1, rSum: r, gSum: g, bSum: b });
      }
    }

    // sort buckets by count descending and take top 5 prominent colors
    const sorted = Array.from(buckets.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5);

    const swatches: Swatch[] = sorted.map(([, v]) => {
      const r = Math.round(v.rSum / v.count);
      const g = Math.round(v.gSum / v.count);
      const b = Math.round(v.bSum / v.count);
      return { hex: rgbToHex(r, g, b), count: v.count };
    });

    setColors(swatches);
    if (swatches.length === 0) {
      setError("Could not extract colors from this image.");
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setCopied("");
    setColors([]);

    const v = validateImageFile(file);
    if (!v.valid) {
      setError(v.error || "Invalid image.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);

    // revoke previous blob url if any
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    // Use FileReader to read as DataURL, then load into Image and draw to canvas
    const reader = new FileReader();
    reader.onerror = () => {
      setError("Could not read the file.");
    };
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);

      const img = new Image();
      img.onload = () => {
        extractFromImage(img);
      };
      img.onerror = () => {
        setError("Could not load the image.");
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const clear = () => {
    if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setFileName("");
    setColors([]);
    setError("");
    setCopied("");
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Image Color Extractor
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Upload an image to extract its 5 most prominent colors. Colors are quantized via 4096 buckets (16 levels per channel) and averaged per bucket. All processing happens locally via canvas.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" } }}>
        <Button variant="contained" component="label">
          Choose image
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </Button>
        {fileName && (
          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
            {fileName}
          </Typography>
        )}
        {(previewUrl || colors.length > 0) && (
          <Button variant="outlined" onClick={clear} sx={{ ml: { sm: "auto" } }}>
            Clear
          </Button>
        )}
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}
      {copied && <Alert severity="success">Copied {copied} to clipboard</Alert>}

      {/* hidden canvas for getImageData */}
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ display: "none" }}
        aria-hidden
      />

      {previewUrl ? (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Preview
          </Typography>
          <Box
            component="img"
            src={previewUrl}
            alt="Uploaded preview"
            sx={{ maxWidth: "100%", maxHeight: 320, borderRadius: 2, border: "1px solid", borderColor: "divider", display: "block" }}
          />
        </Box>
      ) : (
        <Box sx={{ p: 2, border: "1px dashed", borderColor: "divider", borderRadius: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No image loaded. Choose an image to extract colors.
          </Typography>
        </Box>
      )}

      {colors.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Prominent colors ({colors.length})
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(5, 1fr)" },
              gap: 1.5,
            }}
          >
            {colors.map((c) => (
              <Box
                key={c.hex}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <Box sx={{ height: 80, bgcolor: c.hex, borderBottom: "1px solid", borderColor: "divider" }} />
                <Stack spacing={0.5} sx={{ p: 1, alignItems: "center" }}>
                  <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: 700 }}>
                    {c.hex}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {c.count.toLocaleString()} px
                  </Typography>
                  <Button size="small" variant="outlined" onClick={() => copy(c.hex)}>
                    {copied === c.hex ? "Copied!" : "Copy"}
                  </Button>
                </Stack>
              </Box>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            Quantization: 4096 buckets (4 bits per channel). Top 5 buckets by pixel count, averaged to hex.
          </Typography>
        </Box>
      )}
    </ToolPaper>
  );
}