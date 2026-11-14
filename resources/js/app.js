import Alpine from "alpinejs";
import QRCode from "qrcode";

window.Alpine = Alpine;
window.QRCode = QRCode;

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
