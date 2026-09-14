"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import ToolPaper from "@/components/ToolPaper";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import { copyToClipboard } from "@/lib/clipboard";

type QRCanvasProps = {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  bgColor?: string;
  fgColor?: string;
};
const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeCanvas),
  { ssr: false, loading: () => null }
) as ComponentType<QRCanvasProps>;

const TIME_STEP = 30;
const DIGITS = 6;
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Uint8Array<ArrayBuffer> {
  const cleaned = input.toUpperCase().replace(/[\s-]+/g, "").replace(/=+$/, "");
  if (cleaned.length === 0) throw new Error("Empty secret");
  if (!/^[A-Z2-7]*$/.test(cleaned)) throw new Error("Invalid Base32 characters");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const char of cleaned) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) throw new Error(`Invalid Base32 character: ${char}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >>> bits) & 0xff);
    }
  }
  return new Uint8Array(bytes);
}

async function computeTotp(secretBase32: string, timeMs: number): Promise<string> {
  const keyBytes = base32Decode(secretBase32);
  const counter = Math.floor(timeMs / 1000 / TIME_STEP);
  const counterBuffer = new ArrayBuffer(8);
  const view = new DataView(counterBuffer);
  view.setUint32(0, Math.floor(counter / 0x100000000));
  view.setUint32(4, counter % 0x100000000);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, counterBuffer);
  const h = new Uint8Array(sig);
  const offset = h[h.length - 1] & 0x0f;
  const binary =
    ((h[offset] & 0x7f) << 24) |
    (h[offset + 1] << 16) |
    (h[offset + 2] << 8) |
    h[offset + 3];
  return String(binary % 10 ** DIGITS).padStart(DIGITS, "0");
}

function generateRandomSecret(length = 16): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => BASE32_ALPHABET[b % 32]).join("");
}

export default function OtpGeneratorTool() {
  const [secret, setSecret] = useState("JBSWY3DPEHPK3PXP");
  const [account, setAccount] = useState("test@example.com");
  const [issuer, setIssuer] = useState("Demo");
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(TIME_STEP);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUri, setCopiedUri] = useState(false);

  const normalizedSecret = secret.toUpperCase().replace(/[\s-]+/g, "").replace(/=+$/, "");
  const label = `${issuer ? `${encodeURIComponent(issuer)}:` : ""}${encodeURIComponent(account || "account")}`;
  const provisioningUri = normalizedSecret
    ? `otpauth://totp/${label}?secret=${normalizedSecret}&issuer=${encodeURIComponent(issuer || "Demo")}&algorithm=SHA1&digits=${DIGITS}&period=${TIME_STEP}`
    : "";

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const now = Date.now();
      if (!cancelled) {
        setSecondsLeft(TIME_STEP - (Math.floor(now / 1000) % TIME_STEP));
      }
      if (!normalizedSecret) {
        if (!cancelled) {
          setCode("");
          setError("");
        }
        return;
      }
      if (!window.isSecureContext) {
        if (!cancelled) {
          setCode("");
          setError("TOTP requires HTTPS (secure context) — crypto.subtle is unavailable.");
        }
        return;
      }
      try {
        const otp = await computeTotp(normalizedSecret, now);
        if (!cancelled) {
          setCode(otp);
          setError("");
        }
      } catch {
        if (!cancelled) {
          setCode("");
          setError("Invalid Base32 secret — use characters A–Z and 2–7 only.");
        }
      }
    };
    void tick();
    const id = setInterval(() => {
      void tick();
    }, 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [normalizedSecret]);

  const handleRandomize = () => {
    setSecret(generateRandomSecret(16));
    setCopiedCode(false);
    setCopiedUri(false);
  };

  const handleCopyCode = async () => {
    if (!code) return;
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyUri = async () => {
    if (!provisioningUri) return;
    const ok = await copyToClipboard(provisioningUri);
    if (ok) {
      setCopiedUri(true);
      setTimeout(() => setCopiedUri(false), 2000);
    }
  };

  return (
    <ToolPaper>
      <Alert severity="warning">
        Security: for test secrets only — never enter production secrets here. Codes are
        computed locally in your browser.
      </Alert>

      <TextField
        label="Base32 secret"
        fullWidth
        value={secret}
        onChange={(e) => setSecret(e.target.value.toUpperCase())}
        placeholder="JBSWY3DPEHPK3PXP"
        helperText="Base32 (A–Z, 2–7). 30s step, 6 digits, HMAC-SHA1."
        error={Boolean(error)}
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& input": { fontFamily: "monospace", fontSize: 14 } }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Account"
          fullWidth
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="test@example.com"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <TextField
          label="Issuer"
          fullWidth
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          placeholder="Demo"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRandomize}>
          Random secret
        </Button>
        <Button
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyCode}
          disabled={!code}
        >
          {copiedCode ? "Copied!" : "Copy code"}
        </Button>
      </Stack>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Current code — {secondsLeft}s left
        </Typography>
        <Typography
          variant="h3"
          aria-live="polite"
          sx={{ fontWeight: 800, fontFamily: "monospace", letterSpacing: 4, my: 1 }}
        >
          {code || "------"}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(secondsLeft / TIME_STEP) * 100}
          aria-label={`${secondsLeft} seconds remaining`}
          sx={{ borderRadius: 1 }}
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
          Provisioning URI
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: "center" }}>
          <TextField
            value={provisioningUri}
            placeholder="Enter a secret to generate URI"
            fullWidth
            slotProps={{
              input: { readOnly: true, "aria-label": "Provisioning URI", spellCheck: false },
            }}
            sx={{ "& input": { fontFamily: "monospace", fontSize: 12 } }}
          />
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyUri}
            disabled={!provisioningUri}
            sx={{ whiteSpace: "nowrap" }}
          >
            {copiedUri ? "Copied!" : "Copy URI"}
          </Button>
        </Stack>
        {provisioningUri && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: "#ffffff", lineHeight: 0 }}>
              <QRCodeCanvas
                value={provisioningUri}
                size={192}
                level="M"
                bgColor="#ffffff"
                fgColor="#0f172a"
              />
            </Paper>
          </Box>
        )}
      </Box>
    </ToolPaper>
  );
}
