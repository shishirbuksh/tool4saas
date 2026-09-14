export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  // isSecureContext check before navigator.clipboard
  try {
    const isSecureContext =
      typeof window !== "undefined"
        ? (window as unknown as { isSecureContext?: boolean }).isSecureContext
        : typeof globalThis !== "undefined"
          ? (globalThis as unknown as { isSecureContext?: boolean }).isSecureContext
          : undefined;
    // treat undefined (jsdom / old browsers) as secure, only false blocks clipboard
    const secure = isSecureContext !== false;
    if (secure && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    const name = (err as DOMException)?.name;
    if (name === "NotAllowedError") {
      // permission denied – fall through to execCommand fallback
    }
    // fallback for any clipboard error including NotAllowedError
  }

  // fallback for non-secure context or NotAllowedError: create temporary textarea
  let ta: HTMLTextAreaElement | null = null;
  try {
    ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.setAttribute("readonly", "");
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      ta.setSelectionRange(0, text.length);
    } catch {
      // ignore selection range errors for very large text
    }
    const ok = document.execCommand("copy");
    return !!ok;
  } catch {
    return false;
  } finally {
    if (ta) {
      try {
        if (ta.parentNode) {
          ta.parentNode.removeChild(ta);
        } else if (typeof document !== "undefined" && document.body?.contains?.(ta)) {
          document.body.removeChild(ta);
        }
      } catch {
        // ignore cleanup errors
      }
    }
  }
}
