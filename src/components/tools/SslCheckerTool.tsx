
import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { TextField, Typography, Stack, Button, Alert } from "@/components/ds";

import { MS_PER_DAY } from "@/lib/format";

type SslResult = {
  host: string;
  grade: string | null;
  gradeTrustIgnored: string | null;
  status: string;
  statusMessage: string | null;
  ipAddress: string | null;
  serverName: string | null;
  issuer: string | null;
  subject: string | null;
  commonNames: string[];
  altNames: string[];
  notBefore: number | null;
  notAfter: number | null;
  sigAlg: string | null;
  hasWarnings: boolean | null;
  isExceptional: boolean | null;
  rawStatus: string;
};

function extractHost(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return u.hostname;
  } catch {
    return null;
  }
}

function formatDate(ts: number | null): string {
  if (!ts) return "—";
  try {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return String(ts);
  }
}

function daysUntil(ts: number | null): number | null {
  if (!ts) return null;
  const diff = ts - Date.now();
  return Math.ceil(diff / MS_PER_DAY);
}

function getGradeColor(grade: string | null) {
  if (!grade) return "text.secondary";
  if (grade.startsWith("A")) return "success.main";
  if (grade.startsWith("B")) return "info.main";
  if (grade.startsWith("C")) return "warning.main";
  return "error.main";
}

export default function SslCheckerTool() {
  const [url, setUrl] = useState("https://example.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SslResult | null>(null);
  const [fallback, setFallback] = useState<null | {
    reachable: boolean;
    status?: number;
    message: string;
  }>(null);
  const [rawJson, setRawJson] = useState<string | null>(null);

  const host = extractHost(url);

  const handleCheck = async () => {
    setError(null);
    setResult(null);
    setFallback(null);
    setRawJson(null);

    const h = extractHost(url);
    if (!h) {
      setError("Enter a valid URL or hostname, e.g. https://example.com");
      return;
    }

    setLoading(true);
    const ssllabsUrl = `https://api.ssllabs.com/api/v3/analyze?host=${encodeURIComponent(
      h
    )}&fromCaches=on&all=done&maxAge=24`;
    const proxied = `https://api.allorigins.win/get?url=${encodeURIComponent(ssllabsUrl)}`;

    try {
      const res = await fetch(proxied);
      if (!res.ok) throw new Error(`Proxy error: ${res.status} ${res.statusText}`);
      const wrapper = await res.json();
      // allorigins returns { contents: "<json string>", status: {...} }
      const contents = wrapper.contents as string;
      if (!contents) throw new Error("Empty response from proxy");

      let data: unknown;
      try {
        data = JSON.parse(contents);
      } catch {
        throw new Error("Failed to parse SSL Labs response");
      }

      // Keep raw for debug if needed
      setRawJson(JSON.stringify(data, null, 2));

      const d = data as Record<string, unknown>;
      const status = (d.status as string) || "UNKNOWN";
      const endpoints = d.endpoints as Array<Record<string, unknown>> | undefined;
      const certs = d.certs as Array<Record<string, unknown>> | undefined;

      // If SSL Labs reports error
      if (status === "ERROR") {
        const statusMsg = (d.statusMessage as string) || "SSL Labs returned an error for this host";
        throw new Error(statusMsg);
      }

      // If no endpoints yet (e.g. IN_PROGRESS / DNS)
      if (!endpoints || endpoints.length === 0) {
        if (status === "IN_PROGRESS" || status === "DNS") {
          throw new Error(
            `SSL Labs is still assessing ${h} (status: ${status}). Try again in 10-20 seconds, or use the browser check below.`
          );
        }
        throw new Error(`No endpoints returned for ${h} (status: ${status})`);
      }

      const ep = endpoints[0] as Record<string, unknown>;
      const details = ep.details as Record<string, unknown> | undefined;
      const cert = details?.cert as Record<string, unknown> | undefined;
      const chain = details?.chain as Record<string, unknown> | undefined;
      const chainCerts = chain?.certs as Array<Record<string, unknown>> | undefined;

      // Try to find best cert object: details.cert -> certs[0] -> chainCerts[0]
      const certObj =
        cert ||
        (certs && certs[0]) ||
        (chainCerts && chainCerts[0]) ||
        null;

      const grade = (ep.grade as string) || null;
      const gradeTrustIgnored = (ep.gradeTrustIgnored as string) || null;

      const issuer =
        (certObj?.issuerLabel as string) ||
        (certObj?.issuerSubject as string) ||
        (certs?.[0]?.issuerLabel as string) ||
        null;

      const subject =
        (certObj?.subject as string) ||
        (certObj?.commonNames as string[])?.[0] ||
        null;

      const commonNames = (certObj?.commonNames as string[]) || [];
      const altNames = (certObj?.altNames as string[]) || [];

      const notBefore = (certObj?.notBefore as number) || null;
      const notAfter = (certObj?.notAfter as number) || null;
      const sigAlg = (certObj?.sigAlg as string) || null;

      // SSL Labs timestamps are in ms already
      const parsed: SslResult = {
        host: (d.host as string) || h,
        grade,
        gradeTrustIgnored,
        status,
        statusMessage: (ep.statusMessage as string) || null,
        ipAddress: (ep.ipAddress as string) || null,
        serverName: (ep.serverName as string) || null,
        issuer,
        subject,
        commonNames,
        altNames,
        notBefore,
        notAfter,
        sigAlg,
        hasWarnings: (ep.hasWarnings as boolean) ?? null,
        isExceptional: (ep.isExceptional as boolean) ?? null,
        rawStatus: status,
      };

      // If grade is still empty but status is READY, it might be a non-HTTPS host
      if (!grade && status === "READY") {
        // still show what we have, plus fallback note
        setResult(parsed);
        // also trigger fallback reachability check
        await doFallbackCheck(h);
        return;
      }

      setResult(parsed);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      // Do not immediately give up — try fallback direct fetch via allorigins
      // to tell user if host is reachable over HTTPS at all.
      try {
        await doFallbackCheck(h);
        setError(
          `${msg}. Showing browser-based fallback check below. SSL Labs may be rate-limited or the host is not publicly reachable.`
        );
      } catch {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const doFallbackCheck = async (h: string) => {
    // Fallback 1: try to fetch the target itself via allorigins to verify HTTPS
    // This proves the site is reachable over HTTPS from the proxy's POV.
    // Fallback 2: if that fails, try no-cors fetch in browser context.
    const targetUrl = `https://${h}`;
    const proxiedTarget = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    try {
      const r = await fetch(proxiedTarget);
      if (r.ok) {
        const j = await r.json();
        const httpStatus = j.status?.http_code as number | undefined;
        setFallback({
          reachable: true,
          status: httpStatus,
          message: `HTTPS reachable via proxy (HTTP ${httpStatus ?? "OK"}). Browser fetch succeeded — certificate is trusted by the proxy.`,
        });
        return;
      }
      throw new Error(`Proxy fetch status ${r.status}`);
    } catch {
      // Try browser no-cors as last resort — will succeed opaque if site is reachable,
      // but gives no certificate details (browser security restriction).
      try {
        await fetch(targetUrl, { method: "HEAD", mode: "no-cors", cache: "no-store" });
        setFallback({
          reachable: true,
          message:
            "Check via browser: fetch and inspect — site is reachable (no-cors HEAD succeeded). JavaScript cannot read certificate details directly due to browser security; open the URL and click the padlock icon in your address bar to inspect issuer and expiry.",
        });
      } catch {
        setFallback({
          reachable: false,
          message:
            "Check via browser: fetch and inspect — could not reach the site over HTTPS. Verify the hostname, try https:// manually in a new tab, and inspect the padlock → Connection is secure → Certificate is valid. If you see a warning, the certificate is expired, self-signed, or mismatched.",
        });
      }
    }
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setError(null);
    setFallback(null);
    setRawJson(null);
  };

  const days = daysUntil(result?.notAfter ?? null);
  const isExpired = days !== null && days < 0;
  const isExpiringSoon = days !== null && days >= 0 && days <= 14;

  return (
    <ToolPaper spacing={2.5}>
      <div>
        <Typography variant="h6" className="font-bold">
          SSL Checker
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Check HTTPS certificate grade, issuer and expiry via SSL Labs (proxied through{" "}
          <span style={{ fontFamily: "monospace" }}>
            api.allorigins.win
          </span>
          ) with a browser fallback. Ideal for quickly verifying if a site serves valid HTTPS.
        </Typography>
      </div>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} className="items-start">
        <TextField
          label="Website URL or hostname"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCheck();
          }}
          placeholder="https://example.com"
          helperText={host ? `Host: ${host}` : "Include https:// for full URL, or just the domain"}
          error={!!url.trim() && !host}
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        />
        <Stack direction="row" spacing={1} className="shrink-0 pt-0 sm:pt-2">
          <Button variant="contained" onClick={handleCheck} disabled={loading || !url.trim()}>
            {loading ? "Checking…" : "Check SSL"}
          </Button>
          <Button variant="outlined" onClick={handleClear} disabled={loading}>
            Clear
          </Button>
        </Stack>
      </Stack>

      {loading && (
        <Alert severity="info">
          Checking <span className="font-bold" style={{ fontFamily: "monospace" }}>{host}</span> via SSL Labs
          through allorigins… This can take 2–5 seconds. If the host was not assessed recently, SSL Labs may
          queue it — retry after a few seconds.
        </Alert>
      )}

      {error && (
        <Alert severity="warning" className="whitespace-pre-wrap break-words">
          {error}
        </Alert>
      )}

      {result && (
        <div
          className="border border-base-300 rounded-[16px] overflow-hidden"
        >
          <div className="p-4 border-b border-base-300" style={{ backgroundColor: "var(--color-base-200)" }}>
            <Stack direction="row" spacing={2} className="items-center flex-wrap gap-2">
              <Typography variant="subtitle2" className="font-bold">
                {result.host}
              </Typography>
              {result.ipAddress && (
                <Typography variant="caption" className="bg-base-100 px-2 py-1 rounded-[8px] border border-base-300" style={{ fontFamily: "monospace" }}>
                  {result.ipAddress}
                </Typography>
              )}
              {result.serverName && (
                <Typography variant="caption" color="text.secondary">
                  {result.serverName}
                </Typography>
              )}
              <div className="ml-auto flex items-center gap-2">
                <Typography variant="caption" color="text.secondary" className="font-semibold">
                  GRADE
                </Typography>
                <Typography
                  variant="h5"
                  className="font-black leading-[1] min-w-[32px] text-center" style={{ color: getGradeColor(result.grade) }}
                >
                  {result.grade ?? "—"}
                </Typography>
              </div>
            </Stack>
            {result.statusMessage && (
              <Typography variant="caption" color="text.secondary">
                {result.statusMessage} • Status: {result.status} {result.hasWarnings ? "• Has warnings" : ""}{" "}
                {result.isExceptional ? "• Exceptional" : ""}
                {result.gradeTrustIgnored && result.gradeTrustIgnored !== result.grade
                  ? ` • Trust-ignored grade: ${result.gradeTrustIgnored}`
                  : ""}
              </Typography>
            )}
          </div>

          <Stack spacing={0} divider={<div className="border-b border-base-300" />}>
            <div className="flex gap-4 p-3 flex-wrap">
              <Typography className="w-[140px] font-bold text-base-content/70 shrink-0">Issuer</Typography>
              <Typography className="text-[14px] break-all flex-1" style={{ fontFamily: "monospace" }}>
                {result.issuer || "— (not returned by API)"}
              </Typography>
            </div>

            <div className="flex gap-4 p-3 flex-wrap">
              <Typography className="w-[140px] font-bold text-base-content/70 shrink-0">Subject / CN</Typography>
              <Typography className="text-[14px] break-all flex-1" style={{ fontFamily: "monospace" }}>
                {result.subject || result.commonNames[0] || "—"}
              </Typography>
            </div>

            {result.altNames.length > 0 && (
              <div className="flex gap-4 p-3 flex-wrap">
                <Typography className="w-[140px] font-bold text-base-content/70 shrink-0">
                  SANs ({result.altNames.length})
                </Typography>
                <Typography className="text-[13px] break-all flex-1" style={{ fontFamily: "monospace" }}>
                  {result.altNames.join(", ")}
                </Typography>
              </div>
            )}

            <div className="flex gap-4 p-3 flex-wrap">
              <Typography className="w-[140px] font-bold text-base-content/70 shrink-0">Valid from</Typography>
              <Typography className="text-[14px] flex-1">{formatDate(result.notBefore)}</Typography>
            </div>

            <div className="flex gap-4 p-3 flex-wrap">
              <Typography className="w-[140px] font-bold text-base-content/70 shrink-0">Expiry</Typography>
              <div className="flex-1">
                <Typography className="text-[14px]" style={{ fontWeight: isExpired ? 700 : 400, color: isExpired ? "error.main" : isExpiringSoon ? "warning.main" : "text.primary" }}>
                  {formatDate(result.notAfter)}
                </Typography>
                {days !== null && (
                  <Typography
                    variant="caption"
                    className="font-bold" style={{ color: isExpired ? "error.main" : isExpiringSoon ? "warning.main" : "success.main" }}
                  >
                    {isExpired ? `Expired ${Math.abs(days)} day(s) ago` : `${days} day(s) until expiry`}
                    {isExpiringSoon && !isExpired ? " — renew soon" : ""}
                    {isExpired ? " — renewal required" : ""}
                  </Typography>
                )}
              </div>
            </div>

            {result.sigAlg && (
              <div className="flex gap-4 p-3 flex-wrap">
                <Typography className="w-[140px] font-bold text-base-content/70 shrink-0">Signature</Typography>
                <Typography className="text-[13px] flex-1" style={{ fontFamily: "monospace" }}>{result.sigAlg}</Typography>
              </div>
            )}
          </Stack>

          {isExpired && (
            <Alert severity="error" className="m-4 mb-0">
              Certificate is expired — browsers will show a security warning.
            </Alert>
          )}
          {isExpiringSoon && !isExpired && (
            <Alert severity="warning" className="m-4 mb-0">
              Certificate expires in {days} day(s). Consider renewing soon.
            </Alert>
          )}
          {!isExpired && !isExpiringSoon && result.notAfter && (
            <Alert severity="success" className="m-4 mb-0">
              Certificate is currently valid and trusted.
            </Alert>
          )}
          {!result.notAfter && (
            <Alert severity="info" className="m-4 mb-0">
              Expiry not returned by SSL Labs for this host. Use the browser padlock inspection below to verify dates.
            </Alert>
          )}
        </div>
      )}

      {fallback && (
        <Alert severity={fallback.reachable ? "info" : "warning"} className="whitespace-pre-wrap">
          <Typography variant="subtitle2" className="font-bold mb-1">
            Check via browser: fetch and inspect — fallback
          </Typography>
          <Typography variant="body2" className="mb-2">
            {fallback.message}
          </Typography>
          {fallback.status && (
            <Typography variant="caption" style={{ fontFamily: "monospace" }}>
              Proxied HTTP status: {fallback.status}
            </Typography>
          )}
          <ul className="m-0 mt-2 pl-5">
            <Typography component="li" variant="body2">
              Chrome / Edge: click the padlock (or tune icon) in the address bar →{" "}
              <span className="font-bold">Connection is secure</span> →{" "}
              <span className="font-bold">Certificate is valid</span> to see issuer, valid-from, valid-to, and SANs.
            </Typography>
            <Typography component="li" variant="body2">
              Firefox: padlock → <span className="font-bold">Connection secure</span> →{" "}
              <span className="font-bold">More information</span> → View Certificate.
            </Typography>
            <Typography component="li" variant="body2">
              Safari: padlock → <span className="font-bold">Show Certificate</span>.
            </Typography>
            <Typography component="li" variant="body2">
              Or run in your terminal:{" "}
              <span className="text-[12px]" style={{ fontFamily: "monospace" }}>
                openssl s_client -connect {host}:443 -servername {host} | openssl x509 -noout -issuer -dates -subject
              </span>
            </Typography>
          </ul>
          <Typography variant="caption" color="text.secondary" className="block mt-2">
            Note: Browser JavaScript cannot directly access TLS certificate fields (issuer/expiry) due to security
            isolation. The SSL Labs proxy above is the closest automated check; the padlock inspection is the
            authoritative fallback.
          </Typography>
        </Alert>
      )}

      {!result && !error && !loading && !fallback && (
        <Alert severity="info">
          Enter a URL above and click <span className="font-bold">Check SSL</span> to query SSL Labs
          (via <span style={{ fontFamily: "monospace" }}>api.allorigins.win</span> proxy) for grade, issuer
          and expiry. If the API is rate-limited or the host is internal, the browser fallback will explain how to
          inspect the certificate via the padlock icon.
        </Alert>
      )}

      {rawJson && result && (
        <div>
          <Typography variant="caption" color="text.secondary" className="font-bold block mb-1">
            Raw SSL Labs response (truncated)
          </Typography>
          <TextField
            value={rawJson.slice(0, 8000) + (rawJson.length > 8000 ? "\n… truncated" : "")}
            multiline
            minRows={4}
            maxRows={12}
            fullWidth
            slotProps={{ input: { readOnly: true, spellCheck: false, "aria-label": "Raw SSL Labs JSON" } }}
            className="[&_textarea]:[font-family:monospace] [&_textarea]:text-[11px] [&_textarea]:leading-[1.5]"
          />
        </div>
      )}

      <Alert severity="info" className="mt-2">
        <Typography variant="caption" className="font-bold">
          Privacy & accuracy
        </Typography>
        <Typography variant="caption" className="block">
          This tool proxies requests through <span style={{ fontFamily: "monospace" }}>allorigins.win</span> to
          avoid CORS; no certificate data is stored. SSL Labs grades reflect Mozilla / Qualys best practices and may lag
          by up to 24h when using <span style={{ fontFamily: "monospace" }}>fromCaches=on</span>. For
          production monitoring, schedule regular checks or use your CA dashboard.
        </Typography>
      </Alert>
    </ToolPaper>
  );
}
