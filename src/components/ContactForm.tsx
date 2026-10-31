
import { useState } from "react";
import type { FormEvent } from "react";import { Box, TextField, Button, Typography } from "@/components/ds";

import { siteConfig } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const email = siteConfig.email;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers / non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Last-resort fallback: prompt user to copy manually.
      window.prompt("Copy email address:", email);
    }
  }

  return (
    <Button variant="outlined" onClick={handleCopy} className="min-h-[44px]">
      {copied ? "Copied!" : "Copy email"}
    </Button>
  );
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toolUrl, setToolUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = siteConfig.email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1500);
    } catch {
      window.prompt("Copy email address:", siteConfig.email);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const subject = `Contact from ${name.trim()} — ${toolUrl.trim() || "general"}`;
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\nTool URL: ${toolUrl.trim() || "n/a"}\n\n${message.trim()}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4">
      <Typography variant="h2" className="text-[1.25rem] text-base-content">
        Send us a message
      </Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth slotProps={{ htmlInput: { minLength: 2 } }} autoComplete="name" />
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth autoComplete="email" />
      <TextField label="Tool URL" type="url" value={toolUrl} onChange={(e) => setToolUrl(e.target.value)} fullWidth placeholder="https://…/tool-slug" />
      <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} required fullWidth multiline rows={5} slotProps={{ htmlInput: { minLength: 10 } }} />
      {error ? (
        <Typography variant="body2" color="error" role="alert">
          {error}
        </Typography>
      ) : null}
      <Box className="flex flex-wrap gap-3 items-center">
        <Button type="submit" variant="contained">
          Open email draft
        </Button>
        <Button variant="outlined" onClick={handleCopyEmail}>
          {emailCopied ? "Copied!" : "Copy email"}
        </Button>
      </Box>
      <Typography variant="body2" color="text.secondary">
        No backend — submitting opens your email app with the message addressed to {siteConfig.email}.
        If your email app does not open, use Copy email. We reply within 2 business days (Mon-Fri, UTC).
      </Typography>
    </Box>
  );
}
