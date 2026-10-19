import "./globals.css";
import type { Metadata } from "next";

// Global 404 for URLs that match no route. With multiple root layouts
// (app/(en), app/(es), app/(fr)) there is no single layout to compose a
// global 404 from, so this file bypasses layouts and returns a full document
// (see node_modules/next/dist/docs/.../not-found.md). Enabled via
// experimental.globalNotFound in next.config.js. Next automatically injects
// <meta name="robots" content="noindex"> for 404 responses.
// Plain <a> is required (no router context here).
/* eslint-disable @next/next/no-html-link-for-pages */

export const metadata: Metadata = {
  title: "404 – Page not found | Tool4SaaS",
  description: "The page you are looking for does not exist or has moved.",
};

const wrap: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "64px 24px",
  textAlign: "center",
  color: "#1a1a1a",
  background: "#FCFCF9",
  minHeight: "100vh",
  boxSizing: "border-box",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main style={wrap}>
          <p style={{ fontSize: "3.5rem", fontWeight: 800, margin: 0 }}>404</p>
          <h1 style={{ fontSize: "1.5rem", margin: "8px 0 12px" }}>Page not found</h1>
          <p style={{ color: "#555", margin: "0 auto 28px", maxWidth: 420 }}>
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              minHeight: 44,
              lineHeight: "44px",
              padding: "0 24px",
              borderRadius: 8,
              background: "#1976d2",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Back to home
          </a>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="/invoice-generator" style={{ color: "#1976d2" }}>Invoice Generator</a>
            <a href="/word-counter" style={{ color: "#1976d2" }}>Word Counter</a>
            <a href="/qr-code-generator" style={{ color: "#1976d2" }}>QR Code Generator</a>
            <a href="/category/calculators" style={{ color: "#1976d2" }}>Calculators</a>
          </div>
        </main>
      </body>
    </html>
  );
}
