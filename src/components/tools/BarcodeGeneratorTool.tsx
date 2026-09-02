"use client";

import { useState, useRef, useEffect } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Format = "CODE128" | "EAN13" | "UPC";

export default function BarcodeGeneratorTool() {
  const [text, setText] = useState("123456789012");
  const [format, setFormat] = useState<Format>("CODE128");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // next/dynamic ssr:false pattern via useEffect lazy - preload jsbarcode on client only
  const [JsBarcodeFn, setJsBarcodeFn] = useState<null | ((...args: unknown[]) => void)>(null);
  useEffect(() => {
    let mounted = true;
    // @ts-expect-error - jsbarcode types optional, lazy loaded on client (next/dynamic ssr:false pattern via useEffect)
    import("jsbarcode" as unknown as number).then((mod) => {
      if (mounted) {
        setJsBarcodeFn(() => (mod as { default: (...args: unknown[]) => void }).default);
        setReady(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const generate = async () => {
    setError("");
    if (!svgRef.current || !canvasRef.current) return;
    if (!text.trim()) {
      setError("Please enter text to encode.");
      return;
    }
    try {
      // lazy import jsbarcode - dynamic import("jsbarcode") on generate
      // @ts-expect-error - jsbarcode types optional
      const mod = JsBarcodeFn ? { default: JsBarcodeFn } : await import("jsbarcode" as unknown as number);
      const JsBarcode = (mod as { default: CallableFunction }).default as unknown as (
        el: SVGElement | HTMLCanvasElement,
        value: string,
        opts: Record<string, unknown>,
      ) => void;

      const opts = {
        format,
        width,
        height,
        displayValue: true,
        margin: 8,
        background: "#ffffff",
        lineColor: "#000000",
      };

      // render to SVG ref
      JsBarcode(svgRef.current, text, opts);
      // render to canvas for PNG export
      JsBarcode(canvasRef.current, text, opts);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    }
  };

  useEffect(() => {
    if (ready) {
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, format]);

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    if (!source.match(/^<svg[^>]+xmlns=/)) {
      source = source.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${format}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${format}.png`;
    a.click();
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Barcode Generator
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Generate CODE128, EAN13 and UPC barcodes. Rendered to SVG and canvas via lazy-loaded JsBarcode.
      </Typography>

      <Stack spacing={2} direction={{ xs: "column", md: "row" }} sx={{ alignItems: "flex-start" }}>
        <Stack spacing={2} sx={{ flex: 1, width: "100%" }}>
          <TextField
            label="Text to encode"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            placeholder={format === "EAN13" ? "12 or 13 digits" : format === "UPC" ? "11 or 12 digits" : "Any text for CODE128"}
            helperText={
              format === "EAN13"
                ? "EAN13 requires 12 or 13 numeric digits"
                : format === "UPC"
                  ? "UPC requires 11 or 12 numeric digits"
                  : "CODE128 supports alphanumeric"
            }
            slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          />

          <FormControl fullWidth>
            <InputLabel id="barcode-format-label">Format</InputLabel>
            <Select
              labelId="barcode-format-label"
              label="Format"
              value={format}
              onChange={(e) => setFormat(e.target.value as Format)}
            >
              <MenuItem value="CODE128">CODE128</MenuItem>
              <MenuItem value="EAN13">EAN13</MenuItem>
              <MenuItem value="UPC">UPC</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Math.max(1, Number(e.target.value) || 1))}
              slotProps={{ htmlInput: { min: 1, max: 4, step: 0.5 } }}
              fullWidth
              helperText="Bar width (1-4)"
            />
            <TextField
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Math.max(20, Number(e.target.value) || 20))}
              slotProps={{ htmlInput: { min: 20, max: 200, step: 10 } }}
              fullWidth
              helperText="Bar height px"
            />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            <Button variant="contained" onClick={generate} disabled={!ready && !text.trim()}>
              Generate
            </Button>
            <Button variant="outlined" onClick={downloadSVG}>
              Download SVG
            </Button>
            <Button variant="outlined" onClick={downloadPNG}>
              Download PNG
            </Button>
          </Stack>

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          {!ready && (
            <Typography variant="caption" color="text.secondary">
              Loading barcode engine...
            </Typography>
          )}
        </Stack>

        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "#fff",
            minHeight: 180,
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Preview (SVG)
          </Typography>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", overflowX: "auto" }}>
            {/* SVG ref for JsBarcode */}
            <svg ref={svgRef} style={{ maxWidth: "100%" }} />
          </Box>
          {/* Hidden canvas for PNG export - also rendered via JsBarcode */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
            SVG and canvas are both rendered via dynamic import(&quot;jsbarcode&quot;). Use Download buttons to export.
          </Typography>
        </Box>
      </Stack>
    </ToolPaper>
  );
}
