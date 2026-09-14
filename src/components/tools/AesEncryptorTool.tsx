"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Mode = "encrypt" | "decrypt";

const MAX_INPUT_SIZE = 1_000_000;
const SALT_BYTES = 16;
const IV_BYTES = 12;
const PBKDF2_ITERATIONS = 100_000;

function bufferToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    const sub = bytes.subarray(i, i + chunk);
    binary += String.fromCharCode(...sub);
  }
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const cleaned = b64.trim().replace(/\s+/g, "");
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export default function AesEncryptorTool() {
  const [plaintext, setPlaintext] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<Mode>("encrypt");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setError("");
    setOutput("");
    if (!plaintext) return;
    if (!password) {
      setError("Enter a password — it derives the AES-256 key via PBKDF2.");
      return;
    }
    if (plaintext.length > MAX_INPUT_SIZE) {
      setError(
        `Input too large — max ${MAX_INPUT_SIZE.toLocaleString()} chars (got ${plaintext.length.toLocaleString()}).`
      );
      return;
    }
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setError("WebCrypto requires HTTPS (secure context).");
      return;
    }
    setBusy(true);
    try {
      if (mode === "encrypt") {
        const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
        const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
        const key = await deriveKey(password, salt);
        const data = new TextEncoder().encode(plaintext);
        const cipherBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv as BufferSource }, key, data);
        const cipherBytes = new Uint8Array(cipherBuf);
        const combined = new Uint8Array(SALT_BYTES + IV_BYTES + cipherBytes.length);
        combined.set(salt, 0);
        combined.set(iv, SALT_BYTES);
        combined.set(cipherBytes, SALT_BYTES + IV_BYTES);
        setOutput(bufferToBase64(combined));
      } else {
        let combined: Uint8Array;
        try {
          combined = base64ToBytes(plaintext);
        } catch {
          setError("Not valid Base64 — check your input.");
          return;
        }
        if (combined.length < SALT_BYTES + IV_BYTES + 1) {
          setError("Payload too short — expected salt (16) + iv (12) + ciphertext.");
          return;
        }
        const salt = combined.slice(0, SALT_BYTES);
        const iv = combined.slice(SALT_BYTES, SALT_BYTES + IV_BYTES);
        const cipherBytes = combined.slice(SALT_BYTES + IV_BYTES);
        const key = await deriveKey(password, salt);
        try {
          const plainBuf = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv as BufferSource },
            key,
            cipherBytes as BufferSource
          );
          setOutput(new TextDecoder().decode(plainBuf));
        } catch {
          setError("Decryption failed — wrong password or corrupted payload.");
        }
      }
    } catch {
      setError(mode === "encrypt" ? "Encryption failed." : "Decryption failed.");
    } finally {
      setBusy(false);
    }
  };

  const clear = () => {
    setPlaintext("");
    setOutput("");
    setError("");
  };

  return (
    <ToolPaper>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, next: Mode | null) => {
          if (next) {
            setMode(next);
            setOutput("");
            setError("");
          }
        }}
        aria-label="Mode"
        size="small"
      >
        <ToggleButton value="encrypt" aria-label="Encrypt mode">
          Encrypt
        </ToggleButton>
        <ToggleButton value="decrypt" aria-label="Decrypt mode">
          Decrypt
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label={mode === "encrypt" ? "Plaintext" : "Encrypted payload (Base64)"}
        multiline
        minRows={5}
        fullWidth
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value.slice(0, MAX_INPUT_SIZE + 1))}
        placeholder={mode === "encrypt" ? "Type or paste text to encrypt…" : "Paste Base64 payload (salt + iv + ciphertext)…"}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ fontFamily: "monospace" }}
        helperText={`${plaintext.length.toLocaleString()} / ${MAX_INPUT_SIZE.toLocaleString()} chars`}
        error={plaintext.length > MAX_INPUT_SIZE}
      />
      {plaintext.length > MAX_INPUT_SIZE && (
        <Alert severity="warning">Input exceeds 1M chars — will be truncated.</Alert>
      )}
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Key password (PBKDF2-SHA256, 100k iterations → AES-256-GCM)"
        slotProps={{ input: { autoComplete: "off" } }}
        helperText="Salt (16B) + IV (12B) are random per encryption and packed into the Base64 output."
      />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" onClick={run} disabled={!plaintext || !password || busy}>
          {busy ? "Working…" : mode === "encrypt" ? "Encrypt →" : "← Decrypt"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={() => output && void import("@/lib/clipboard").then((m) => m.copyToClipboard(output))}
          disabled={!output}
        >
          Copy
        </Button>
        <Button variant="text" onClick={clear} disabled={busy && !plaintext && !output}>
          Clear
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {output && (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
            {mode === "encrypt" ? "Encrypted output (Base64)" : "Decrypted output"}
          </Typography>
          <TextField
            value={output}
            multiline
            minRows={5}
            fullWidth
            slotProps={{ input: { readOnly: true, "aria-label": "Output", spellCheck: false } }}
            sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
          />
        </Box>
      )}
    </ToolPaper>
  );
}
