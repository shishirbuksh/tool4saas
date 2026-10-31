import type { APIRoute } from "astro";
import { tools, CATEGORIES, getTool, getCategory, NOINDEX_SLUGS } from "@/lib/tools";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";
import { siteConfig } from "@/lib/site";
import { ogSanitizeTitle, ogSanitizeDesc } from "@/lib/og-text";
import { renderOgImagePng } from "@/lib/og-image";

const STATIC_PAGES: Record<string, { title: string; desc: string }> = {
  about: { title: "About Tool4SaaS", desc: "Free browser tools, tested in-house. Local-first, private by design." },
  privacy: { title: "Privacy Policy", desc: "What runs locally, what needs internet, and your cookie choices." },
  terms: { title: "Terms of Service", desc: "Fair use, calculator disclaimers and content limits." },
  contact: { title: "Contact Tool4SaaS", desc: "Request tools, report issues, ask questions." },
  author: { title: "Tool4SaaS Editorial Team", desc: "In-house reviewers testing every tool across browsers." },
  methodology: { title: "How We Test Tools", desc: "Golden values, boundary tests and browser matrix." },
  blog: { title: "Tool4SaaS Blog Guides", desc: "Tested walkthroughs for invoices, QR, resumes and more." },
  guides: { title: "All Guides & Tutorials", desc: "Every pillar guide and tutorial, indexed by topic." },
  sitemap: { title: "HTML Sitemap", desc: "Complete directory of all free browser tools, guides, and categories." },
};

export function getStaticPaths() {
  const staticPageSlugs = Object.keys(STATIC_PAGES).map((key) => `static-${key}`);
  const catSlugs = CATEGORIES.map((c) => `category-${c.id}`);
  const toolSlugs = tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)).map((t) => t.slug);

  const allSlugs = ["home", ...staticPageSlugs, ...catSlugs, ...toolSlugs];
  return allSlugs.map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  let title: string;
  let desc: string;
  let badge: string;

  if (slug === "home") {
    title = `${VISIBLE_TOOL_COUNT} free online tools, one browser tab`;
    desc = "Invoices, PDFs, images, code and calculators. No signup; most tools run locally.";
    badge = "No signup · Local-first";
  } else if (slug.startsWith("static-")) {
    const page = STATIC_PAGES[slug.slice("static-".length)];
    title = ogSanitizeTitle(page ? page.title : siteConfig.name);
    desc = ogSanitizeDesc(page ? page.desc : siteConfig.description);
    badge = siteConfig.name;
  } else if (slug.startsWith("category-")) {
    const category = getCategory(slug.slice("category-".length));
    title = ogSanitizeTitle(category ? category.label : siteConfig.name);
    desc = ogSanitizeDesc(category ? category.description : siteConfig.description);
    badge = ogSanitizeTitle(category ? siteConfig.name : "Free Online Tools");
  } else {
    const tool = getTool(slug);
    title = ogSanitizeTitle(tool ? tool.title : siteConfig.name);
    desc = ogSanitizeDesc(tool ? tool.description : siteConfig.description);
    badge = tool
      ? ogSanitizeTitle(getCategory(tool.category)?.label ?? "Free Tools")
      : "Free Online Tools";
  }

  const png = await renderOgImagePng({ title, desc, badge });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
};
