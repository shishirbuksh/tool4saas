// Fail-closed poison-domain blocklist: never let placeholder/example domains
// leak into canonicals/sitemap/JSON-LD. Any match falls back to localhost.
const POISON_HOST_TOKENS = ["your-domain", "placeholder", "example."];
function isPoisonHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h.includes("your-domain") || h.includes("placeholder")) return true;
  if (h === "example.com" || h.endsWith(".example.com")) return true;
  if (h === "example.org" || h.endsWith(".example.org")) return true;
  if (h === "example.net" || h.endsWith(".example.net")) return true;
  return POISON_HOST_TOKENS.some((t) => h.includes(t));
}

export const siteConfig = {
  name: "Tool4SaaS",
  title: "Free Online Tools - Invoice, QR, Resume Builder | Tool4SaaS",
  description:
    "Free online tools: invoice generator, QR code generator, resume builder and word counter. No sign-up needed, works in your browser instantly, try now.",
  keywords: [
    "free online tools",
    "invoice generator",
    "QR code generator",
    "resume builder",
    "word counter",
    "productivity tools",
  ],
  url: (() => {
    const raw = process.env.NEXT_PUBLIC_SITE_URL;
    const fallback = "https://your-domain.com";
    const candidate = raw?.trim() || "";
    if (!candidate) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("NEXT_PUBLIC_SITE_URL is not set — set it for correct canonicals (fail-closed to avoid localhost canonicals in prod)");
      }
      // Fallback poison avoidance: never expose placeholder domain in SEO; use localhost as safe dev fallback
      return "http://localhost:3000";
    }
    try {
      const u = new URL(candidate);
      if (!/^https?:$/.test(u.protocol)) throw new Error("invalid protocol");
      if (isPoisonHostname(u.hostname)) {
        console.warn(`NEXT_PUBLIC_SITE_URL is placeholder/poison "${candidate}", using fallback http://localhost:3000`);
        return "http://localhost:3000";
      }
      return u.origin + (u.pathname !== "/" ? u.pathname.replace(/\/$/, "") : "");
    } catch {
      console.warn(`NEXT_PUBLIC_SITE_URL is invalid "${candidate}", using fallback ${fallback}`);
      // Avoid leaking poison fallback into canonical/sitemap; use safe localhost
      return "http://localhost:3000";
    }
  })(),
  locale: "en_US",
  adsenseClient: (() => {
    const raw = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").trim();
    if (!raw) return "";
    if (!/^ca-pub-\d{16}$/.test(raw)) {
      console.warn(`NEXT_PUBLIC_ADSENSE_CLIENT is invalid "${raw}" — expected format ca-pub-XXXXXXXXXXXXXXXX`);
      return "";
    }
    return raw;
  })(),
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim() || "hello@tool4saas.com",
  author: "Tool4SaaS",
  // E-E-A-T author authority: role + short bio used by ToolPageShell author box
  // and ToolSeo reviewer JSON-LD. Keep generic team identity (no invented people).
  authorRole: "Tool4SaaS Editorial Team",
  authorBio:
    "In-house reviewers who build and test every tool locally for accuracy across current Chrome, Edge, Firefox, and Safari.",
  authorUrl: (() => {
    const raw = (process.env.NEXT_PUBLIC_AUTHOR_URL || "").trim();
    if (raw) {
      try {
        const u = new URL(raw);
        if (/^https?:$/.test(u.protocol) && u.hostname && !isPoisonHostname(u.hostname))
          return u.href.replace(/\/$/, "");
        if (u.hostname && isPoisonHostname(u.hostname)) {
          console.warn(`NEXT_PUBLIC_AUTHOR_URL is placeholder/poison "${raw}", falling back to site author page`);
        }
      } catch {
        // ignore invalid URL, fall through to site URL default
      }
    }
    // Default ownership signal: author page on the canonical site.
    const siteRaw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
    if (siteRaw) {
      try {
        const u = new URL(siteRaw);
        if (/^https?:$/.test(u.protocol) && u.hostname && !isPoisonHostname(u.hostname)) {
          const base = u.origin + (u.pathname !== "/" ? u.pathname.replace(/\/$/, "") : "");
          return `${base}/author`;
        }
        if (u.hostname && isPoisonHostname(u.hostname)) {
          console.warn(`NEXT_PUBLIC_SITE_URL is placeholder/poison "${siteRaw}", using fallback author page`);
        }
      } catch {
        // ignore, use localhost fallback below
      }
    }
    return "http://localhost:3000/author";
  })(),
  // Ownership signals: add your LinkedIn / X / GitHub profile URLs via
  // NEXT_PUBLIC_SAME_AS as a comma-separated list (e.g. "https://www.linkedin.com/company/...,https://x.com/...,https://github.com/...").
  // TODO: keep as empty placeholder until real profiles exist — do not invent URLs.
  sameAs: (() => {
    const raw = process.env.NEXT_PUBLIC_SAME_AS;
    if (!raw) return [];
    const urls: string[] = [];
    for (const s of raw.split(",")) {
      const trimmed = s.trim();
      if (!trimmed) continue;
      try {
        const u = new URL(trimmed);
        if (/^https?:$/.test(u.protocol) && u.hostname && !urls.includes(trimmed)) {
          urls.push(trimmed);
        }
      } catch {
        // ignore invalid urls
      }
    }
    return urls;
  })(),
};

export type SiteConfig = typeof siteConfig;
