export const siteConfig = {
  name: "Tool4SaaS",
  title: "Tool4SaaS - Free Online Productivity Tools",
  description:
    "Free online productivity tools: invoice generator, QR code generator, resume builder and word counter. No sign-up required, works in your browser.",
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
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@tool4saas.com",
  author: "Tool4SaaS",
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
