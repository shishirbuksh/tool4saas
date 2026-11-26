import Alpine from "alpinejs";

window.Alpine = Alpine;

// Dynamic code-split loaders for tool-specific libraries
window.loadQRCode = () => import("qrcode").then((m) => { window.QRCode = m.default || m; return window.QRCode; });
window.loadJsBarcode = () => import("jsbarcode").then((m) => { window.JsBarcode = m.default || m; return window.JsBarcode; });
window.loadPdfLib = () => import("pdf-lib").then((m) => { window.PDFLib = m.default || m; return window.PDFLib; });
window.loadPdfJs = async () => {
  if (window.pdfjsLib) return window.pdfjsLib;
  const [pdfjsLib, workerMod] = await Promise.all([
    import("pdfjs-dist/build/pdf.mjs"),
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default;
  window.pdfjsLib = pdfjsLib;
  return pdfjsLib;
};
window.loadJsQR = () => import("jsqr").then((m) => { window.jsQR = m.default || m; return window.jsQR; });
window.loadFflate = () => import("fflate").then((m) => { window.fflate = m.default || m; return window.fflate; });
window.downloadCsvBlob = (csvContent, filename) => {
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Theme manager
Alpine.data("themeManager", () => ({
  theme: localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "wise-dark" : "wise-light"),
  init() {
    this.applyTheme(this.theme);
  },
  toggle() {
    this.theme = this.theme === "wise-dark" ? "wise-light" : "wise-dark";
    localStorage.setItem("theme", this.theme);
    this.applyTheme(this.theme);
  },
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  },
}));

// Global tool copy-to-clipboard handler
Alpine.data("clipboard", () => ({
  copied: false,
  copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  },
}));

Alpine.start();
