"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { validateImageFiles } from "@/lib/validate";

type PageSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";

type PdfImage = {
  id: number;
  name: string;
  objectUrl: string;
  width: number;
  height: number;
  file: File;
};

let nextId = 1;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 20;
const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB total

function getImageFormat(dataUrl: string): string {
  if (dataUrl.startsWith("data:image/png")) return "PNG";
  if (dataUrl.startsWith("data:image/webp")) return "WEBP";
  if (dataUrl.startsWith("data:image/gif")) return "GIF";
  return "JPEG";
}

export default function ImageToPdfTool() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PdfImage[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    setError("");
    setSuccess("");

    const files = Array.from(list);
    const v = validateImageFiles(files, { maxTotalSize: MAX_TOTAL_SIZE, maxSize: MAX_FILE_SIZE });
    if (!v.valid) {
      setError(v.error || "Invalid image files.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (files.length > MAX_FILES || images.length + files.length > MAX_FILES) {
      setError(`Too many files (max ${MAX_FILES} images).`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const readFile = (file: File): Promise<PdfImage> =>
      new Promise((resolve, _reject) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          resolve({
            id: nextId++,
            name: file.name,
            objectUrl,
            width: img.width,
            height: img.height,
            file,
          });
        };
        img.onerror = () => {
          // still resolve without dimensions - fallback to 800x600
          resolve({
            id: nextId++,
            name: file.name,
            objectUrl,
            width: 800,
            height: 600,
            file,
          });
        };
        img.src = objectUrl;
      });

    Promise.all(files.map(readFile))
      .then((loaded) => {
        setImages((prev) => [...prev, ...loaded]);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      })
      .finally(() => {
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
    setError("");
    setSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const generatePdf = async () => {
    setError("");
    setSuccess("");

    if (images.length === 0) {
      setError("Add at least one image to generate a PDF.");
      return;
    }

    setLoading(true);
    try {
      let jspdfMod: unknown;
      try {
        // dynamic import("jspdf") with fallback message if not installed
        // @ts-expect-error - jspdf is optional, lazy loaded via dynamic import("jspdf")
        jspdfMod = await import("jspdf" as unknown as number);
      } catch {
        setError('jspdf is not installed. Run "npm install jspdf" to enable PDF generation.');
        setLoading(false);
        return;
      }

      const JsPDF =
        (jspdfMod as { jsPDF?: unknown })?.jsPDF ??
        (jspdfMod as { default?: unknown })?.default ??
        jspdfMod;

      // JsPDF is a constructor
      const DocCtor = JsPDF as unknown as new (opts: { orientation: Orientation; unit: string; format: string }) => {
        internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
        addImage: (data: string, format: string, x: number, y: number, w: number, h: number) => void;
        addPage: (format?: string, orientation?: string) => void;
        save: (filename: string) => void;
      };

      let doc: InstanceType<typeof DocCtor>;
      try {
        doc = new DocCtor({ orientation, unit: "mm", format: pageSize });
      } catch {
        // fallback for older jspdf signatures: new jsPDF(orientation, unit, format)
        const FallbackCtor = JsPDF as unknown as new (orientation: string, unit: string, format: string) => InstanceType<typeof DocCtor>;
        doc = new FallbackCtor(orientation, "mm", pageSize);
      }

      for (let idx = 0; idx < images.length; idx++) {
        const img = images[idx];
        if (idx > 0) {
          // addPage uses current format/orientation by default
          doc.addPage();
        }

        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error(`Failed to read ${img.name}`));
          reader.readAsDataURL(img.file);
        });

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();

        // Fit image inside page with 10mm margin on each side (20mm total)
        const margin = 10;
        const maxW = pageW - margin * 2;
        const maxH = pageH - margin * 2;

        const imgRatio = img.width / img.height;
        let renderW = maxW;
        let renderH = renderW / imgRatio;

        if (renderH > maxH) {
          renderH = maxH;
          renderW = renderH * imgRatio;
        }

        const x = (pageW - renderW) / 2;
        const y = (pageH - renderH) / 2;

        const format = getImageFormat(dataUrl);
        try {
          doc.addImage(dataUrl, format, x, y, renderW, renderH);
        } catch {
          // fallback to JPEG if format detection failed
          doc.addImage(dataUrl, "JPEG", x, y, renderW, renderH);
        }
      }

      doc.save("images.pdf");
      setSuccess(`Generated PDF with ${images.length} image${images.length === 1 ? "" : "s"}. Download started.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Cannot find module") || msg.includes("jspdf")) {
        setError('jspdf is not installed. Run "npm install jspdf" to enable PDF generation.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Image to PDF
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Add multiple images and combine them into a single PDF. Each image becomes one page, scaled to fit the selected
        page size and orientation. All processing runs locally in your browser.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="outlined" component="label">
          Add images
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={onFiles}
          />
        </Button>
        {images.length > 0 && (
          <Button variant="text" color="error" onClick={clearAll}>
            Clear all ({images.length})
          </Button>
        )}
        <Typography variant="caption" color="text.secondary">
          {images.length === 0 ? "No images added yet." : `${images.length} image${images.length === 1 ? "" : "s"} ready`}
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="page-size-label">Page size</InputLabel>
          <Select
            labelId="page-size-label"
            label="Page size"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as PageSize)}
          >
            <MenuItem value="a4">A4</MenuItem>
            <MenuItem value="letter">Letter</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="orientation-label">Orientation</InputLabel>
          <Select
            labelId="orientation-label"
            label="Orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as Orientation)}
          >
            <MenuItem value="portrait">Portrait</MenuItem>
            <MenuItem value="landscape">Landscape</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {images.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 2,
          }}
        >
          {images.map((img, index) => (
            <Box
              key={img.id}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="img"
                src={img.objectUrl}
                alt={img.name}
                sx={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  display: "block",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
              <Box sx={{ p: 1, flex: 1, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={img.name}
                >
                  {index + 1}. {img.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {img.width} × {img.height}
                </Typography>
              </Box>
              <Box sx={{ p: 1, pt: 0 }}>
                <Button size="small" color="error" variant="outlined" fullWidth onClick={() => removeImage(img.id)}>
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            p: 3,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "background.default",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Choose one or more images to preview thumbnails here. Each image will be placed on its own PDF page via{" "}
            <code>addImage</code>.
          </Typography>
        </Box>
      )}

      <Box>
        <Button variant="contained" onClick={generatePdf} disabled={images.length === 0 || loading}>
          {loading ? "Generating..." : `Generate & Download PDF (${images.length})`}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
          Uses <code>dynamic import(&quot;jspdf&quot;)</code> and <code>addImage</code>. Download via <code>save()</code>.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Alert severity="info">
        Requires <code>jspdf</code> — if not installed you will see: <code>npm install jspdf</code>. PDF is built with{" "}
        <code>dynamic import(&quot;jspdf&quot;)</code>, images are added with <code>addImage</code> and downloaded via{" "}
        <code>save()</code>. Page size options: <code>A4</code> and <code>Letter</code>.
      </Alert>
    </ToolPaper>
  );
}