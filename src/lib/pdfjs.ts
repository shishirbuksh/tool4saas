"use client";

type PdfPageLike = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
  getTextContent?: () => Promise<{ items: unknown[] }>;
};

type PdfDocLike = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageLike>;
  destroy?: () => Promise<void> | void;
};

export type PdfJsLib = {
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDocLike> };
  GlobalWorkerOptions?: { workerSrc: string };
};

let cached: PdfJsLib | null = null;

/**
 * Single shared pdfjs-dist loader with CSP-safe bundled worker.
 * Satisfies worker-src 'self' blob: (no remote CDN) and pins the worker
 * to the installed pdfjs-dist version instead of a skewed CDN copy.
 */
export async function loadPdfjs(): Promise<PdfJsLib> {
  if (cached) return cached;
  const mod = (await import("pdfjs-dist")) as unknown as Partial<PdfJsLib>;
  if (!mod || typeof mod.getDocument !== "function") {
    throw new Error('Could not load PDF engine ("pdfjs-dist"). Check your connection and retry.');
  }
  try {
    if (mod.GlobalWorkerOptions && !mod.GlobalWorkerOptions.workerSrc) {
      mod.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
    }
  } catch {
    // Worker setup is best-effort; rendering can still work when bundled.
  }
  cached = mod as PdfJsLib;
  return cached;
}
