export const siteConfig = {
  name: "ToolKit Pro",
  title: "ToolKit Pro — Free Online Productivity Tools",
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
        console.warn("NEXT_PUBLIC_SITE_URL is not set, using fallback https://your-domain.com — set it for correct canonicals");
      }
      return process.env.NODE_ENV === "production" ? fallback : "http://localhost:3000";
    }
    try {
      const u = new URL(candidate);
      if (!/^https?:$/.test(u.protocol)) throw new Error("invalid protocol");
      return u.origin + (u.pathname !== "/" ? u.pathname.replace(/\/$/, "") : "");
    } catch {
      console.warn(`NEXT_PUBLIC_SITE_URL is invalid "${candidate}", using fallback ${fallback}`);
      return fallback;
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
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@toolkitpro.example",
  author: "ToolKit Pro",
  sameAs: process.env.NEXT_PUBLIC_SAME_AS
    ? process.env.NEXT_PUBLIC_SAME_AS.split(",").map((s) => s.trim()).filter(Boolean)
    : [],
};

export type SiteConfig = typeof siteConfig;
