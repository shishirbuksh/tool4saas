#!/usr/bin/env node
/**
 * AdSense readiness check — node, no dependencies.
 *
 * Usage:
 *   node scripts/check-adsense-readiness.mjs
 *   npm run adsense:check
 *
 * Reads .env + .env.example (warn — not fail — when a var is simply missing
 * from .env, since hosting env may provide it), plus source files for
 * consent/CSP/sitemap/noindex/footer/YMYL/metadata/llms compliance signals.
 *
 * Exit code: 1 on any critical FAIL, 0 when everything is PASS or WARN-only.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const results = [];
function add(name, status, detail, critical = true) {
  results.push({ name, status, detail: String(detail ?? ""), critical });
}

function readRel(rel) {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return null;
  }
}

function existsRel(rel) {
  try {
    return fs.existsSync(path.join(ROOT, rel));
  } catch {
    return false;
  }
}

function parseEnvText(text) {
  const map = new Map();
  if (!text) return map;
  for (const line of text.split("\n")) {
    const cleaned = line.replace(/\r$/, "").trim();
    if (!cleaned || cleaned.startsWith("#")) continue;
    const m = cleaned.match(/^([^=]+)=(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"') && val.length >= 2) ||
      (val.startsWith("'") && val.endsWith("'") && val.length >= 2)
    ) {
      val = val.slice(1, -1);
    }
    map.set(m[1].trim(), val.trim());
  }
  return map;
}

function walkSrc(dir, out) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next" || e.name === ".git") continue;
      walkSrc(full, out);
    } else if (e.isFile() && /\.(tsx?|jsx?|mjs|js)$/.test(e.name)) {
      out.push(full);
    }
  }
}

// ---------------------------------------------------------------------------
// 1. ads.txt — must not be the pub-0000 placeholder
// ---------------------------------------------------------------------------
{
  const content = readRel("public/ads.txt");
  if (content == null) {
    add("ads.txt exists", "FAIL", "public/ads.txt missing");
  } else {
    const first = content.split("\n").map((l) => l.trim()).filter(Boolean)[0] ?? "(empty)";
    const short = first.length > 80 ? first.slice(0, 80) + "…" : first;
    if (/pub-0{4,}/.test(content) || /pub-X+/i.test(content) || /X{4,}/.test(content)) {
      add("ads.txt placeholder", "FAIL", `placeholder ID still present: "${short}"`);
    } else if (/google\.com\s*,\s*pub-\d{16}\s*,\s*DIRECT/i.test(content)) {
      add("ads.txt placeholder", "PASS", `"${short}"`);
    } else {
      add("ads.txt placeholder", "FAIL", `unrecognized format: "${short}"`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. AdSense client + slots — regex checks across .env.example and .env
//    Missing in .env => WARN (hosting env may inject it). Invalid => FAIL.
// ---------------------------------------------------------------------------
const CLIENT_RE = /^ca-pub-\d{16}$/;
const SLOT_RE = /^\d{10}$/;
const SLOT_VARS = [
  "NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD",
  "NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE",
  "NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE",
];

const exampleText = readRel(".env.example");
const envText = readRel(".env");
const exampleEnv = parseEnvText(exampleText);
const dotEnv = parseEnvText(envText);

function checkClient(sourceName, map, missingStatus) {
  const val = (map.get("NEXT_PUBLIC_ADSENSE_CLIENT") ?? "").trim();
  if (!val) {
    add(
      `AdSense client (${sourceName})`,
      missingStatus,
      `NEXT_PUBLIC_ADSENSE_CLIENT missing in ${sourceName}`,
      missingStatus === "FAIL"
    );
    return;
  }
  if (!CLIENT_RE.test(val)) {
    add(
      `AdSense client (${sourceName})`,
      "FAIL",
      `must match ca-pub- + 16 digits, got "${val.slice(0, 40)}"`
    );
  } else if (/^ca-pub-0+$/.test(val)) {
    add(`AdSense client (${sourceName})`, "FAIL", `placeholder all-zeros: "${val}"`);
  } else {
    add(`AdSense client (${sourceName})`, "PASS", `"${val}"`);
  }
}

function checkSlots(sourceName, map, missingStatus) {
  const parts = [];
  let hasFail = false;
  let hasMissing = false;
  for (const key of SLOT_VARS) {
    const val = (map.get(key) ?? "").trim();
    const shortKey = key.replace("NEXT_PUBLIC_ADSENSE_SLOT_", "");
    if (!val) {
      hasMissing = true;
      parts.push(`${shortKey}=<missing>`);
    } else if (!SLOT_RE.test(val)) {
      hasFail = true;
      parts.push(`${shortKey}="${val.slice(0, 20)}" invalid (want 10 digits)`);
    } else if (/^0+$/.test(val)) {
      hasFail = true;
      parts.push(`${shortKey}="${val}" placeholder`);
    } else {
      parts.push(`${shortKey}="${val}" ok`);
    }
  }
  const detail = parts.join("; ");
  if (hasFail) {
    add(`Ad slots 10-digit (${sourceName})`, "FAIL", detail);
  } else if (hasMissing) {
    add(`Ad slots 10-digit (${sourceName})`, missingStatus, detail, missingStatus === "FAIL");
  } else {
    add(`Ad slots 10-digit (${sourceName})`, "PASS", detail);
  }
}

if (exampleText == null) {
  add("AdSense client (.env.example)", "FAIL", ".env.example missing");
  add("Ad slots 10-digit (.env.example)", "FAIL", ".env.example missing");
} else {
  checkClient(".env.example", exampleEnv, "FAIL");
  checkSlots(".env.example", exampleEnv, "FAIL");
}
if (envText == null) {
  add("AdSense client (.env)", "WARN", ".env missing (local only?)", false);
  add("Ad slots 10-digit (.env)", "WARN", ".env missing (local only?)", false);
} else {
  checkClient(".env", dotEnv, "WARN");
  checkSlots(".env", dotEnv, "WARN");
}

// ---------------------------------------------------------------------------
// 3. Contact / Author / Methodology pages exist
// ---------------------------------------------------------------------------
for (const p of ["contact", "author", "methodology"]) {
  const rel = `src/app/${p}/page.tsx`;
  if (existsRel(rel)) {
    add(`page /${p} exists`, "PASS", rel);
  } else {
    add(`page /${p} exists`, "FAIL", `${rel} missing`);
  }
}

// ---------------------------------------------------------------------------
// 4. Sitemap includes /contact + /author + /methodology
// ---------------------------------------------------------------------------
{
  const content = readRel("src/app/sitemap.ts");
  if (content == null) {
    add("sitemap /contact", "FAIL", "src/app/sitemap.ts missing");
    add("sitemap /author", "FAIL", "src/app/sitemap.ts missing");
    add("sitemap /methodology", "FAIL", "src/app/sitemap.ts missing");
  } else {
    add(
      "sitemap /contact",
      content.includes("/contact") ? "PASS" : "FAIL",
      content.includes("/contact") ? "sitemap.ts lists /contact" : "sitemap.ts missing /contact"
    );
    add(
      "sitemap /author",
      content.includes("/author") ? "PASS" : "FAIL",
      content.includes("/author") ? "sitemap.ts lists /author" : "sitemap.ts missing /author"
    );
    add(
      "sitemap /methodology",
      content.includes("/methodology") ? "PASS" : "FAIL",
      content.includes("/methodology") ? "sitemap.ts lists /methodology" : "sitemap.ts missing /methodology"
    );
  }
}

// ---------------------------------------------------------------------------
// 5. pdf-compress noindex + excluded from sitemap
// ---------------------------------------------------------------------------
{
  const page = readRel("src/app/pdf-compress/page.tsx");
  if (page == null) {
    add("pdf-compress noindex", "FAIL", "src/app/pdf-compress/page.tsx missing");
  } else if (/index\s*:\s*false/.test(page)) {
    add("pdf-compress noindex", "PASS", "robots.index=false in page metadata");
  } else {
    add("pdf-compress noindex", "FAIL", "robots.index=false not found in pdf-compress page");
  }
  const sitemap = readRel("src/app/sitemap.ts");
  if (sitemap == null) {
    add("pdf-compress sitemap exclusion", "FAIL", "src/app/sitemap.ts missing");
  } else if (
    sitemap.includes("pdf-compress") &&
    (/NOINDEX/i.test(sitemap) || /noindex/i.test(sitemap))
  ) {
    add("pdf-compress sitemap exclusion", "PASS", "pdf-compress filtered via NOINDEX set");
  } else {
    add(
      "pdf-compress sitemap exclusion",
      "FAIL",
      "sitemap.ts must filter pdf-compress (NOINDEX set)"
    );
  }
}

// ---------------------------------------------------------------------------
// 6. Layout consent-default denied + wait_for_update
// ---------------------------------------------------------------------------
{
  const layout = readRel("src/app/layout.tsx");
  if (layout == null) {
    add("layout consent-default", "FAIL", "src/app/layout.tsx missing");
  } else {
    const hasDefault =
      layout.includes("consent-default") || /consent['"]\s*,\s*['"]default['"]/.test(layout);
    const hasDenied =
      layout.includes("ad_storage") &&
      (layout.includes("'denied'") || layout.includes('"denied"'));
    const hasWait = layout.includes("wait_for_update");
    if (hasDefault && hasDenied && hasWait) {
      add(
        "layout consent-default",
        "PASS",
        "consent-default denied + wait_for_update present"
      );
    } else {
      const missing = [
        !hasDefault ? "consent-default" : null,
        !hasDenied ? "ad_storage denied" : null,
        !hasWait ? "wait_for_update" : null,
      ]
        .filter(Boolean)
        .join(", ");
      add("layout consent-default", "FAIL", `layout.tsx missing: ${missing}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 7. next.config CSP has pagead2 + fundingchoices
// ---------------------------------------------------------------------------
{
  const cfg = readRel("next.config.js") ?? readRel("next.config.mjs") ?? readRel("next.config.ts");
  if (cfg == null) {
    add("CSP ads domains", "FAIL", "next.config.* missing");
  } else {
    const hasPagead = cfg.includes("pagead2.googlesyndication.com");
    const hasFC =
      cfg.includes("fundingchoicesmessages.google.com") ||
      cfg.includes("fundingchoices");
    if (hasPagead && hasFC) {
      add("CSP ads domains", "PASS", "CSP allows pagead2 + fundingchoicesmessages");
    } else {
      const missing = [!hasPagead ? "pagead2" : null, !hasFC ? "fundingchoices" : null]
        .filter(Boolean)
        .join(", ");
      add("CSP ads domains", "FAIL", `next.config CSP missing: ${missing}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 8. CookieConsent: granular + expiry + DNT
// ---------------------------------------------------------------------------
{
  const cc = readRel("src/components/CookieConsent.tsx");
  if (cc == null) {
    add("CookieConsent granular", "FAIL", "CookieConsent.tsx missing");
    add("CookieConsent expiry", "FAIL", "CookieConsent.tsx missing");
    add("CookieConsent DNT", "FAIL", "CookieConsent.tsx missing");
  } else {
    const granular =
      cc.includes("ad_storage") &&
      cc.includes("analytics_storage") &&
      (cc.includes("Save choices") || cc.includes("saveChoices")) &&
      (cc.includes("adsOn") || cc.includes("Ads")) &&
      (cc.includes("analyticsOn") || cc.includes("Analytics"));
    add(
      "CookieConsent granular",
      granular ? "PASS" : "FAIL",
      granular
        ? "separate Ads/Analytics toggles + Save choices"
        : "need separate ad/analytics toggles + Save choices"
    );
    const expiry =
      (cc.includes("EXPIRY") || cc.toLowerCase().includes("expir")) &&
      cc.includes("365") &&
      (cc.includes("isExpired") || cc.includes("ts"));
    add(
      "CookieConsent expiry",
      expiry ? "PASS" : "FAIL",
      expiry ? "12-month expiry (365d) enforced" : "12-month expiry logic missing"
    );
    const dnt = cc.includes("doNotTrack") && cc.includes("globalPrivacyControl");
    add(
      "CookieConsent DNT",
      dnt ? "PASS" : "FAIL",
      dnt ? "respects DNT + GPC" : "DNT/GPC handling missing"
    );
  }
}

// ---------------------------------------------------------------------------
// 9. Footer has Contact / Author links
// ---------------------------------------------------------------------------
{
  const footer = readRel("src/components/Footer.tsx");
  if (footer == null) {
    add("Footer Contact link", "FAIL", "Footer.tsx missing");
    add("Footer Author link", "FAIL", "Footer.tsx missing");
  } else {
    add(
      "Footer Contact link",
      footer.includes("/contact") ? "PASS" : "FAIL",
      footer.includes("/contact") ? "Footer links /contact" : "Footer missing /contact link"
    );
    add(
      "Footer Author link",
      footer.includes("/author") ? "PASS" : "FAIL",
      footer.includes("/author") ? "Footer links /author" : "Footer missing /author link"
    );
  }
}

// ---------------------------------------------------------------------------
// 10. YMYLDisclaimer exists + used in >=30 tools
// ---------------------------------------------------------------------------
{
  if (!existsRel("src/components/YMYLDisclaimer.tsx")) {
    add("YMYLDisclaimer exists", "FAIL", "src/components/YMYLDisclaimer.tsx missing");
    add("YMYLDisclaimer coverage", "FAIL", "component missing");
  } else {
    add("YMYLDisclaimer exists", "PASS", "src/components/YMYLDisclaimer.tsx");
    const files = [];
    walkSrc(path.join(ROOT, "src"), files);
    const users = new Set();
    for (const f of files) {
      if (f.endsWith("YMYLDisclaimer.tsx")) continue;
      let text = null;
      try {
        text = fs.readFileSync(f, "utf8");
      } catch {
        continue;
      }
      if (text.includes("YMYLDisclaimer")) users.add(path.relative(ROOT, f));
    }
    const n = users.size;
    add(
      "YMYLDisclaimer coverage",
      n >= 30 ? "PASS" : "FAIL",
      `used in ${n} file(s), need >=30`
    );
  }
}

// ---------------------------------------------------------------------------
// 11. Metadata title logic present
// ---------------------------------------------------------------------------
{
  const layout = readRel("src/app/layout.tsx");
  const meta = readRel("src/lib/metadata.ts");
  const layoutOk =
    !!layout && layout.includes("template") && layout.includes("%s") && layout.includes("default");
  const metaOk =
    !!meta && (meta.includes("| Tool4SaaS") || meta.includes("fullTitle"));
  if (layoutOk && metaOk) {
    add("metadata title logic", "PASS", "layout template %s + lib/metadata fullTitle");
  } else {
    const missing = [!layoutOk ? "layout template %s" : null, !metaOk ? "lib/metadata title" : null]
      .filter(Boolean)
      .join(", ");
    add("metadata title logic", "FAIL", `missing: ${missing}`);
  }
}

// ---------------------------------------------------------------------------
// 12. llms.txt has Contact/Author + qualified local claim
// ---------------------------------------------------------------------------
{
  const llms = readRel("public/llms.txt");
  if (llms == null) {
    add("llms.txt Contact/Author", "FAIL", "public/llms.txt missing");
    add("llms.txt local claim", "FAIL", "public/llms.txt missing");
  } else {
    const hasContact = llms.includes("/contact") || llms.includes("Contact");
    const hasAuthor = llms.includes("/author") || llms.includes("Author");
    if (hasContact && hasAuthor) {
      add("llms.txt Contact/Author", "PASS", "lists Contact + Author");
    } else {
      const missing = [!hasContact ? "Contact" : null, !hasAuthor ? "Author" : null]
        .filter(Boolean)
        .join(", ");
      add("llms.txt Contact/Author", "FAIL", `llms.txt missing: ${missing}`);
    }
    const hasClaim = /Most run/i.test(llms) && /(browser|local)/i.test(llms);
    add(
      "llms.txt local claim",
      hasClaim ? "PASS" : "FAIL",
      hasClaim
        ? "qualified claim present (Most run … browser/local)"
        : "qualified 'Most run locally/in-browser' claim missing"
    );
  }
}

// ---------------------------------------------------------------------------
// Render table + exit code
// ---------------------------------------------------------------------------
function pad(s, w) {
  const str = String(s);
  return str.length >= w ? str : str + " ".repeat(w - str.length);
}

const nameW = Math.max("CHECK".length, ...results.map((r) => r.name.length));
const statusW = Math.max("STATUS".length, ...results.map((r) => r.status.length));
const detailW = Math.min(
  90,
  Math.max("DETAIL".length, ...results.map((r) => Math.min(r.detail.length, 90)))
);

const sep = `+-${"-".repeat(nameW)}-+-${"-".repeat(statusW)}-+-${"-".repeat(detailW)}-+`;
console.log(sep);
console.log(`| ${pad("CHECK", nameW)} | ${pad("STATUS", statusW)} | ${pad("DETAIL", detailW)} |`);
console.log(sep);
for (const r of results) {
  const d =
    r.detail.length > detailW ? r.detail.slice(0, detailW - 1) + "…" : r.detail;
  console.log(`| ${pad(r.name, nameW)} | ${pad(r.status, statusW)} | ${pad(d, detailW)} |`);
}
console.log(sep);

const pass = results.filter((r) => r.status === "PASS").length;
const fail = results.filter((r) => r.status === "FAIL");
const warn = results.filter((r) => r.status === "WARN").length;
console.log(`${pass} PASS, ${fail.length} FAIL, ${warn} WARN`);
if (fail.length > 0) {
  console.log("AdSense readiness: FAIL — fix FAIL rows before review (placeholders block approval).");
  process.exit(1);
} else if (warn > 0) {
  console.log("AdSense readiness: PASS with warnings (missing .env values may come from hosting env).");
  process.exit(0);
} else {
  console.log("AdSense readiness: PASS.");
  process.exit(0);
}
