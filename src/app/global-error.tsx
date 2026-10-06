"use client";
// global-error has no router context — plain <a> is required here.
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 48, textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Something went wrong</h1>
        <p style={{ color: "#555" }}>
          Tool4SaaS hit a critical error. Your files never leave your browser — try again or go back home.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <button
            onClick={() => reset()}
            style={{ minHeight: 44, padding: "12px 24px", borderRadius: 8, background: "#1976d2", color: "#fff", border: 0, fontWeight: 700, cursor: "pointer" }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{ minHeight: 44, display: "inline-flex", alignItems: "center", padding: "12px 24px", borderRadius: 8, border: "1px solid #ccc", textDecoration: "none", fontWeight: 700 }}
          >
            Back to home
          </a>
        </div>
        {error.digest && (
          <p style={{ marginTop: 16, fontSize: 12, color: "#777" }}>Error ID: {error.digest}</p>
        )}
      </body>
    </html>
  );
}
