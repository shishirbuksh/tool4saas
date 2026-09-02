"use client";

import { useState, useRef } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { validateImageFile } from "@/lib/validate";

export default function QrScannerTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanRafRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [decoded, setDecoded] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [scanning, setScanning] = useState(false);

  const copyDecoded = async () => {
    if (!decoded) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(decoded);
      } else {
        const mod = await import("@/lib/clipboard");
        await mod.copyToClipboard(decoded);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Copy failed. Please copy manually.");
    }
  };

  const decodeViaJsQR = async (imageData: ImageData): Promise<string | null> => {
    try {
      // lazy jsQR - dynamic import with fallback
      const mod = await import("jsqr");
      // jsqr exports a function as default; handle both CJS and ESM shapes
      const jsQR = (mod as unknown as { default: unknown }).default ?? mod;
      if (typeof jsQR !== "function") {
        throw new Error("jsQR export is not a function");
      }
      const code = (jsQR as (data: Uint8ClampedArray, w: number, h: number) => { data: string } | null)(
        imageData.data,
        imageData.width,
        imageData.height
      );
      return code?.data ?? null;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // detect missing module
      if (
        msg.includes("Cannot find module") ||
        msg.includes("Failed to fetch") ||
        msg.includes("Could not resolve") ||
        msg.includes("Cannot resolve")
      ) {
        throw new Error("jsQR not installed, install via npm install jsqr");
      }
      // if jsQR truly not installed, the dynamic import throws; show fallback
      if (msg.includes("jsQR not installed")) throw e;
      // generic import failure -> treat as not installed
      // Only show fallback when import failed due to missing package
      // We detect by checking if jsQR is not found - dynamic import error message varies by bundler
      // Fallback to user-friendly message
      if (
        msg.toLowerCase().includes("jsqr") ||
        msg.includes("not installed")
      ) {
        throw new Error("jsQR not installed, install via npm install jsqr");
      }
      // Re-throw as not installed fallback for any import error (bundler reports ChunkLoadError etc.)
      // If the error originated from import resolution, give fallback
      // Heuristic: if we never got a function, assume missing dep
      throw new Error("jsQR not installed, install via npm install jsqr");
    }
  };

  const decodeFromCanvas = async (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setError("Canvas not supported in this browser.");
      return;
    }
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const result = await decodeViaJsQR(imageData);
      if (result) {
        setDecoded(result);
        setError("");
        setInfo("");
      } else {
        setDecoded("");
        setError("No QR code found in this image. Try a clearer, closer crop.");
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : String(err);
      if (m.includes("jsQR not installed")) {
        setError("jsQR not installed, install via npm install jsqr");
      } else {
        setError(m);
      }
      setDecoded("");
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setInfo("");
    setDecoded("");
    setCopied(false);
    setCameraError("");

    const v = validateImageFile(file);
    if (!v.valid) {
      setError(v.error || "Please choose an image file.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onerror = () => {
      setError("Could not read the file.");
    };
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current ?? document.createElement("canvas");
        // attach to ref if not mounted yet (hidden canvas always mounted)
        const target = canvasRef.current ?? canvas;
        // limit large images to 1024 for performance while preserving decode quality
        const maxSide = 1024;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > maxSide || h > maxSide) {
          const ratio = Math.min(maxSide / w, maxSide / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        target.width = w;
        target.height = h;
        const ctx = target.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          setError("Canvas not supported in this browser.");
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        void decodeFromCanvas(target);
      };
      img.onerror = () => {
        setError("Could not load the image.");
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const stopCamera = () => {
    setScanning(false);
    setCameraActive(false);
    if (scanRafRef.current !== null) {
      cancelAnimationFrame(scanRafRef.current);
      scanRafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const scanVideoFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      scanRafRef.current = requestAnimationFrame(() => void scanVideoFrame());
      return;
    }
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setCameraError("Canvas not supported.");
      return;
    }
    ctx.drawImage(video, 0, 0, w, h);
    try {
      const imageData = ctx.getImageData(0, 0, w, h);
      const result = await decodeViaJsQR(imageData);
      if (result) {
        setDecoded(result);
        setInfo("QR code detected from camera.");
        setError("");
        setCameraError("");
        // keep scanning but we have a result; optionally stop
        // Do not auto-stop so user can scan multiple codes; but pause briefly
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : String(err);
      if (m.includes("jsQR not installed")) {
        setCameraError("jsQR not installed, install via npm install jsqr");
        stopCamera();
        setError("jsQR not installed, install via npm install jsqr");
        return;
      }
    }
    scanRafRef.current = requestAnimationFrame(() => void scanVideoFrame());
  };

  const startCamera = async () => {
    setCameraError("");
    setError("");
    setInfo("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera API not supported in this browser. Use file upload instead.");
      return;
    }
    try {
      // handle permission via getUserMedia - optional camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
      setScanning(true);
      // need to wait for video element to mount then set srcObject
      // use microtask
      setTimeout(() => {
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        void video.play().catch(() => {
          setCameraError("Could not start camera playback. Check permissions.");
        });
        scanRafRef.current = requestAnimationFrame(() => void scanVideoFrame());
      }, 100);
    } catch (err) {
      const e = err as DOMException & { name: string; message: string };
      if (e?.name === "NotAllowedError" || e?.name === "PermissionDeniedError") {
        setCameraError("Camera permission denied. Please allow camera access in your browser settings, or use file upload.");
      } else if (e?.name === "NotFoundError" || e?.name === "DevicesNotFoundError") {
        setCameraError("No camera found on this device. Use file upload instead.");
      } else if (e?.name === "NotReadableError") {
        setCameraError("Camera is already in use by another app. Close it and try again, or use file upload.");
      } else {
        setCameraError(e?.message || "Could not access camera. Use file upload instead.");
      }
      setCameraActive(false);
      setScanning(false);
    }
  };

  const captureFromCamera = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    if (video.readyState < 2) {
      setCameraError("Camera not ready yet. Wait a moment and try again.");
      return;
    }
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setError("Canvas not supported.");
      return;
    }
    ctx.drawImage(video, 0, 0, w, h);
    await decodeFromCanvas(canvas);
  };

  const clearAll = () => {
    setDecoded("");
    setError("");
    setInfo("");
    setFileName("");
    setPreviewUrl("");
    setCopied(false);
    setCameraError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    // keep camera running if active, just clear result; do not stop automatically
  };

  const clearWithCamera = () => {
    clearAll();
    stopCamera();
  };

  return (
    <ToolPaper>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        QR Scanner
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Upload an image containing a QR code or use your camera to scan. Decoding runs locally via a lazy-loaded <Box component="code" sx={{ fontFamily: "monospace", bgcolor: "action.hover", px: 0.5, borderRadius: 0.5 }}>jsQR</Box> library (dynamic import).
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" }, flexWrap: "wrap" }}>
        <Button variant="contained" component="label">
          Choose image
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onFile} />
        </Button>
        {!cameraActive ? (
          <Button variant="outlined" onClick={() => void startCamera()}>
            Start camera
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => void captureFromCamera()}>
              Capture & decode
            </Button>
            <Button variant="outlined" color="error" onClick={stopCamera}>
              Stop camera
            </Button>
          </Stack>
        )}
        {(decoded || previewUrl || fileName || cameraActive) && (
          <Button variant="text" onClick={cameraActive ? clearWithCamera : clearAll} sx={{ ml: { sm: "auto" } }}>
            Clear
          </Button>
        )}
      </Stack>

      {fileName && !cameraActive && (
        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
          Selected: {fileName}
        </Typography>
      )}

      {cameraError && <Alert severity="error">{cameraError}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {info && !error && <Alert severity="info">{info}</Alert>}
      {copied && <Alert severity="success">Copied to clipboard</Alert>}

      {/* hidden canvas for decoding - draw file or video frame to canvas then getImageData */}
      <Box component="canvas" ref={canvasRef} sx={{ display: "none" }} aria-hidden />

      {/* preview for uploaded image */}
      {previewUrl && !cameraActive && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Preview
          </Typography>
          <Box
            component="img"
            src={previewUrl}
            alt="Uploaded QR preview"
            sx={{ maxWidth: "100%", maxHeight: 360, borderRadius: 2, border: "1px solid", borderColor: "divider", display: "block" }}
          />
        </Box>
      )}

      {/* camera preview */}
      {cameraActive && (
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "common.black",
            position: "relative",
          }}
        >
          <Box
            component="video"
            ref={videoRef}
            autoPlay
            playsInline
            muted
            sx={{ width: "100%", maxHeight: 400, display: "block", objectFit: "contain", bgcolor: "common.black" }}
          />
          {scanning && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "common.white",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: 12,
              }}
            >
              Scanning…
            </Box>
          )}
        </Box>
      )}

      {!cameraActive && !previewUrl && (
        <Box sx={{ p: 2, border: "1px dashed", borderColor: "divider", borderRadius: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No image loaded. Choose an image or start the camera to scan a QR code.
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Decoded text
        </Typography>
        {decoded ? (
          <Stack spacing={1.5}>
            <Box
              sx={{
                p: 1.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1.5,
                bgcolor: "action.hover",
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: 14,
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              {decoded}
            </Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              <Button variant="contained" size="small" onClick={() => void copyDecoded()}>
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  if (decoded.startsWith("http://") || decoded.startsWith("https://")) window.open(decoded, "_blank", "noopener,noreferrer");
                }}
                disabled={!decoded.startsWith("http://") && !decoded.startsWith("https://")}
              >
                Open link
              </Button>
              <Button variant="text" size="small" onClick={clearAll}>
                Clear result
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No QR code decoded yet. Upload a QR image or capture from camera.
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: "block" }}>
          Decoding: draw to canvas → getImageData → dynamic import(&quot;jsqr&quot;) → jsQR(data, width, height). If jsQR is missing, an alert with &quot;jsQR not installed, install via npm install jsqr&quot; is shown. Camera uses getUserMedia with permission handling; auto-scan via requestAnimationFrame and manual Capture button.
        </Typography>
      </Box>
    </ToolPaper>
  );
}