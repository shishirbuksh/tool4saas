"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { siteConfig } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toolUrl, setToolUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4, display: "grid", gap: 2 }}>
      <Typography variant="h2" sx={{ fontSize: "1.25rem", color: "text.primary" }}>
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
      <Box>
        <Button type="submit" variant="contained">
          Open email draft
        </Button>
      </Box>
      <Typography variant="body2" color="text.secondary">
        No backend — submitting opens your email app with the message addressed to {siteConfig.email}.
      </Typography>
    </Box>
  );
}
