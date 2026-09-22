import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import ToolCard from "@/components/ToolCard";
import { CATEGORIES, getCategory, toolsByCategoryCached, NOINDEX_SLUGS } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

// AdSense content-depth intros: one unique 80-120 word intro per category,
// each naming its top-3 tools with a worked example. Rendered below instead
// of the short catalogue description (which stays in metadata + JSON-LD).
const CATEGORY_INTROS: Record<
  string,
  { body: string; picks: { slug: string; label: string }[]; faqSlug: string; faqLabel: string }
> = {
  "text-documents": {
    body: "Draft, clean, and compare everyday writing with 19 browser-based utilities that never upload your text. Start with the word counter to hit targets like a 1,500-word essay or a 280-character post, then fix headings with the case converter across 500 lines at once. The text diff highlights every changed word between two drafts, catching edits a quick skim misses. For example, paste 2,000 words to see reading time near 10 minutes alongside keyword hits. Each tool page answers common questions in its FAQ and everything runs offline after load.",
    picks: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "text-diff", label: "Text Diff" },
    ],
    faqSlug: "word-counter",
    faqLabel: "Word Counter FAQ",
  },
  business: {
    body: "Send invoices, build resumes, and beat keyword filters with 9 business document generators that work fully in your browser. The invoice generator totals a 10-line $550 bill with logo and tax, then prints to crisp A4 PDF. The resume builder lays out 3 roles plus skills on one ATS-friendly page, while the checker scores it near 90 percent against a 300-word posting. For example, INV-2026-001 with $500 subtotal plus 10 percent tax totals $550 exactly. Each tool page answers common questions in its FAQ, with no sign-up or upload.",
    picks: [
      { slug: "invoice-generator", label: "Invoice Generator" },
      { slug: "resume-builder", label: "Resume Builder" },
      { slug: "ats-resume-checker", label: "ATS Resume Checker" },
    ],
    faqSlug: "invoice-generator",
    faqLabel: "Invoice Generator FAQ",
  },
  developer: {
    body: "Debug APIs, patterns, and tokens with 29 developer utilities that run 100 percent locally, so secrets never leave your device. The JSON formatter pretty-prints a 500 KB response and points to exact line-column errors like a missing comma at 1:18. The regex tester highlights matches for digit patterns across sample logs, while the JWT decoder exposes expiry claims instantly. For example, formatting a 10,000-line payload takes a blink, and minifying cuts bytes by roughly 20 percent. Each tool page answers common questions in its FAQ, free and offline.",
    picks: [
      { slug: "json-formatter", label: "JSON Formatter" },
      { slug: "regex-tester", label: "Regex Tester" },
      { slug: "jwt-decoder", label: "JWT Decoder" },
    ],
    faqSlug: "json-formatter",
    faqLabel: "JSON Formatter FAQ",
  },
  converters: {
    body: "Translate between units, currencies, and data formats with 13 offline converters in one click. The unit converter turns 100 km into 62.1 miles and 0°C into 32°F with exact factors. The currency converter tracks 150-plus currencies with live rates plus an offline fallback, so 100 USD to EUR works anywhere. The JSON-CSV tool maps a 1,000-row array to spreadsheet columns instantly. For example, 1 kg equals 2.205 lb and a 2-item JSON list becomes a 2-row sheet. Each tool page answers common questions in its FAQ, private by design.",
    picks: [
      { slug: "unit-converter", label: "Unit Converter" },
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "json-csv", label: "JSON-CSV Converter" },
    ],
    faqSlug: "unit-converter",
    faqLabel: "Unit Converter FAQ",
  },
  generators: {
    body: "Create passwords, IDs, and game randomness with 13 privacy-friendly generators powered by your browser crypto engine. The password generator builds 20-character logins with about 131 bits of entropy that resist brute force. The UUID tool mints 500 v4 IDs per batch for database seeding, while the dice roller totals 2d6 like 4 plus 6 equals 10. For example, 16 characters from 94 symbols give about 105 bits of protection. Each tool page answers common questions in its FAQ, with nothing uploaded ever.",
    picks: [
      { slug: "password-generator", label: "Password Generator" },
      { slug: "uuid-generator", label: "UUID Generator" },
      { slug: "dice-roller", label: "Dice Roller" },
    ],
    faqSlug: "password-generator",
    faqLabel: "Password Generator FAQ",
  },
  "images-design": {
    body: "Design faster with 23 free utilities for codes, images, and color that run offline in your browser. The QR generator encodes long URLs into crisp scannable squares, while the compressor shrinks a 2 MB photo for the web without visible loss. The contrast checker verifies pairs like indigo on white against accessibility ratios before you ship. For example, a #6366F1 swatch copies in one click and resizes cleanly to any layout. Each tool page answers common questions in its FAQ, with no sign-up needed.",
    picks: [
      { slug: "qr-code-generator", label: "QR Code Generator" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "color-contrast", label: "Color Contrast Checker" },
    ],
    faqSlug: "qr-code-generator",
    faqLabel: "QR Code Generator FAQ",
  },
  pdf: {
    body: "Handle everyday PDF jobs with a focused set of offline utilities that keep documents on your device. Convert JPG or PNG pages into a single PDF, merge 5 reports into one file, or split a 40-page deck into exact ranges. For example, 10 photos become one shareable PDF in seconds, and a 12 MB file stays private throughout because files process locally start to finish. Each tool page answers common questions in its FAQ, free with no uploads or accounts.",
    picks: [
      { slug: "image-to-pdf", label: "Image to PDF" },
      { slug: "pdf-merge", label: "PDF Merge" },
      { slug: "pdf-split", label: "PDF Split" },
    ],
    faqSlug: "image-to-pdf",
    faqLabel: "Image to PDF FAQ",
  },
  calculators: {
    body: "Answer everyday percent, loan, and body questions with 15 free calculators that work offline. The percentage tool turns 45 out of 60 into 75 percent in one step, while the loan calculator splits a $100,000 loan at 5 percent over 30 years into $536.82 monthly. The BMI checker converts 70 kg at 175 cm into 22.9 with clear ranges. For example, a 20 percent tip on $85 is $17 exactly. Each tool page answers common questions in its FAQ, with no sign-up or limits.",
    picks: [
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "loan-calculator", label: "Loan Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
    faqSlug: "percentage-calculator",
    faqLabel: "Percentage Calculator FAQ",
  },
  finance: {
    body: "Plan mortgages, investments, and taxes with planning calculators that are informational only, never financial advice. The mortgage tool prices a $240,000 loan at 6 percent over 30 years near $1,439 monthly with about $278,000 lifetime interest. The SIP projector grows Rs 5,000 monthly at 12 percent over 10 years toward Rs 11.5L, while the tax estimator nets a $90,000 salary near $75,400 taxable. For example, $200 extra principal monthly can save over $70,000 interest. Each tool page answers common questions in its FAQ, private and offline.",
    picks: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "sip-calculator", label: "SIP Calculator" },
      { slug: "income-tax-calculator", label: "Income Tax Calculator" },
    ],
    faqSlug: "mortgage-calculator",
    faqLabel: "Mortgage Calculator FAQ",
  },
  health: {
    body: "Estimate calories, macros, and body metrics with informational calculators that never replace medical advice — consult a professional for decisions. The calorie tool targets intake from weight, height, age, and activity, like roughly 2,200 kcal for an active 70 kg adult. The macro splitter divides that into protein, carbs, and fat grams, while body-fat trends track change over weeks. For example, 70 kg at 175 cm gives a BMI of 22.9. Each tool page answers common questions in its FAQ, private and offline.",
    picks: [
      { slug: "calorie-calculator", label: "Calorie Calculator" },
      { slug: "macro-calculator", label: "Macro Calculator" },
      { slug: "body-fat-calculator", label: "Body Fat Calculator" },
    ],
    faqSlug: "calorie-calculator",
    faqLabel: "Calorie Calculator FAQ",
  },
  seo: {
    body: "Ship search-ready pages with 8 free SEO and marketing utilities that run offline. The meta tag generator drafts titles near 60 characters with descriptions that lift click-through, while the Open Graph preview shows exactly how links unfurl on social. The sitemap builder maps hundreds of URLs for clean crawling. UTM tagging keeps campaign data clean across channels. For example, preview a 155-character description before publishing to avoid truncation. Each tool page answers common questions in its FAQ, with no sign-up or watermark.",
    picks: [
      { slug: "meta-tag-generator", label: "Meta Tag Generator" },
      { slug: "open-graph-preview", label: "Open Graph Preview" },
      { slug: "sitemap-generator", label: "Sitemap Generator" },
    ],
    faqSlug: "meta-tag-generator",
    faqLabel: "Meta Tag Generator FAQ",
  },
  time: {
    body: "Master dates, zones, and focus with 8 free time and date utilities. The age calculator turns 1990-06-15 into 36 years plus weekday and a live birthday countdown. The timezone converter moves 3:00 PM New York into 4:00 AM next-day Tokyo with DST handled, while the Pomodoro timer structures 25-minute sprints with 5-minute breaks. Countdown links share live targets with friends and teams. For example, four rounds total 100 focus minutes before a long rest. Each tool page answers common questions in its FAQ, free and offline.",
    picks: [
      { slug: "age-calculator", label: "Age Calculator" },
      { slug: "timezone-converter", label: "Timezone Converter" },
      { slug: "pomodoro-timer", label: "Pomodoro Timer" },
    ],
    faqSlug: "age-calculator",
    faqLabel: "Age Calculator FAQ",
  },
};

// Generic fallback intro (used only if a category id has no entry above).
const FALLBACK_INTRO = {
  body: "Browse every tool in this collection below — each one runs in your browser with no sign-up, and most work fully offline with nothing uploaded. Open any card to get the interactive tool plus a 4-step guide, worked examples with real numbers, and a FAQ that answers edge cases. For example, calculator pages show exact inputs like $100,000 at 5 percent alongside expected outputs. Each tool page answers common questions in its FAQ, and our testing method is public for review.",
  picks: [
    { slug: "word-counter", label: "Word Counter" },
    { slug: "json-formatter", label: "JSON Formatter" },
    { slug: "mortgage-calculator", label: "Mortgage Calculator" },
  ],
  faqSlug: "word-counter",
  faqLabel: "Word Counter FAQ",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return {};
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = `${base}/category/${id}`;
  return {
    title: category.label,
    description: category.description,
    alternates: { canonical },
    // Full object: Metadata merges shallowly — a partial openGraph here
    // would drop the parent type/locale/siteName/images.
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: `${category.label} — ${siteConfig.name}`,
      description: category.description,
      images: [{ url: "/og/home", width: 1200, height: 630, alt: `${category.label} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.label} — ${siteConfig.name}`,
      description: category.description,
      images: ["/og/home"],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();

  const allGroups = toolsByCategoryCached();
  const group = allGroups.find((g) => g.category.id === id)!;
  const base = siteConfig.url.replace(/\/$/, "");
  const categoryUrl = `${base}/category/${id}`;
  // Keep sitemap exclusion consistent: NOINDEX_SLUGS (single source in @/lib/tools)
  // are hidden from the ItemList and the ToolCard grid, but the category page
  // itself stays indexable + followable and still links to all categories below.
  const visibleTools = group.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: category.label, item: categoryUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": categoryUrl,
        name: category.label,
        url: categoryUrl,
        description: category.description,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: visibleTools.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: `${base}/${t.slug}`,
            name: t.title,
          })),
        },
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, overflowX: "clip" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">{category.label}</Typography>
      </Breadcrumbs>
      <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 1 }}>
        {category.label}
      </Typography>
      {(() => {
        const intro = CATEGORY_INTROS[id] ?? FALLBACK_INTRO;
        return (
          <Box sx={{ mb: 4, maxWidth: 760 }}>
            <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              {intro.body}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Popular in {category.label}:{" "}
              {intro.picks.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " · "}
                  <Link href={`/${p.slug}`}>{p.label}</Link>
                </span>
              ))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Questions? Each tool page has an FAQ — start with the{" "}
              <Link href={`/${intro.faqSlug}`}>{intro.faqLabel}</Link>. See also our{" "}
              <Link href="/methodology">testing methodology</Link>.
            </Typography>
          </Box>
        );
      })()}
      <Grid container spacing={3}>
        {visibleTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.slug}>
            <ToolCard tool={tool} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h2" sx={{ fontSize: 20, mb: 2 }}>
          Browse all categories
        </Typography>
        <Grid container spacing={3}>
          {allGroups.map((g) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={g.category.id}>
              <Link
                href={`/category/${g.category.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    display: "block",
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
                    contentVisibility: "auto",
                    containIntrinsicSize: "0 180px",
                    transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.01)",
                      borderColor: "rgba(0,0,0,0.12)",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)",
                    },
                    "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: 18, mb: 0.5 }}>
                    {g.category.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {g.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)).length} tools
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
