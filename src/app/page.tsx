import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AdSlot from "@/components/AdSlotLazy";
import HeroButtons from "@/components/HeroButtons";
import PaginatedToolGrid from "@/components/PaginatedToolGrid";
import { HomeToolsItemList, HomeFaqJsonLd, HomeBlogItemList } from "@/components/SiteJsonLd";
import { tools, toolsByCategoryCached, getTool, EXPECTED_TOOL_COUNT, EXPECTED_CATEGORY_COUNT } from "@/lib/tools";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

const POPULAR_SLUGS = [
  { slug: "invoice-generator", benefit: "Make a clean invoice PDF in minutes, free." },
  { slug: "qr-code-generator", benefit: "Make a QR code for links, WiFi, or UPI." },
  { slug: "json-formatter", benefit: "Fix and read messy JSON fast." },
  { slug: "word-counter", benefit: "Count words and reading time as you type." },
  { slug: "pdf-merge", benefit: "Join PDF files in order, in your browser." },
  { slug: "image-compressor", benefit: "Shrink photos without losing quality." },
  { slug: "mortgage-calculator", benefit: "See your monthly home loan payment." },
  { slug: "resume-builder", benefit: "Build a clean resume that gets interviews." },
];

const RECENT_GUIDES = [
  {
    title: "Free QR Code Generator Guide: Create Scannable QR Codes Fast",
    desc: "WiFi, UPI, menus, vCards, and print sizes that scan.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide",
  },
  {
    title: "Free Invoice Generator Guide: Create Professional Invoices Fast",
    desc: "What to include, GST rules, and PDF export with no signup.",
    label: "Invoice Guide",
    date: "2026-09-18",
    href: "/blog/invoice-generator-guide",
  },
  {
    title: "Static vs Dynamic QR Codes: Which to Choose",
    desc: "When free static wins and when paid dynamic earns it.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes",
  },
  {
    title: "UPI QR Code for Payments: Setup, Counter Tips & Safety (India)",
    desc: "Fixed vs open amount, lamination, and fraud checks.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india",
  },
  {
    title: "vCard QR Code: Digital Business Card That Saves in 5 Seconds",
    desc: "Fields that import cleanly on iPhone and Android.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide/vcard-contact-qr-code",
  },
  {
    title: "12 Invoice Mistakes That Delay Payment (and How to Fix Them)",
    desc: "10-minute fixes plus a 60-second pre-send checklist.",
    label: "Invoice Guide",
    date: "2026-09-18",
    href: "/blog/invoice-generator-guide/invoicing-mistakes-to-avoid",
  },
];

const FAQS = [
  {
    q: "What is Tool4SaaS?",
    a: "Tool4SaaS is a free set of web utilities that run in your browser. You can count words, make codes, format text, and plan money with ease. Most jobs run on your device, so they are fast and private.",
  },
  {
    q: "Is Tool4SaaS free?",
    a: "Yes. All 185 tools are free to use with no cost and no paywall. You can open any tool, maker, or generator as often as you like each day.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. You do not need an account or signup to use any tool. Just open the page and start your job right away. There are no forms or passwords.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Most tools run local-first, so your text and files stay on your device. Only 4 tools need the internet for live facts: currency rates, YouTube thumbnails, SSL check, and voice input. See our privacy policy for details.",
  },
  {
    q: "Which popular tools should I try first?",
    a: "Top picks are invoice generator for client bills, QR code generator for menus and links, JSON formatter for code checks, word counter for essays, PDF merge for files, and mortgage calculator for home loans.",
  },
  {
    q: "How are tools tested?",
    a: "We build and test every tool in-house. We check outputs against known values, for example a $100,000 loan at 5 percent over 30 years equals $536.82 monthly. See our methodology page for the full process.",
  },
  {
    q: "How do I use tools offline?",
    a: "Open the tool once while online and keep the tab open. Most tools then work without internet because they run locally. Your files stay on your device always.",
  },
  {
    q: "How do I request a new tool?",
    a: "Send your idea through our contact page. Tell us the job to be done and what result you want to see. We review top requests each month and build free private tools first.",
  },
];

export default function HomePage() {
  const hubGroups = toolsByCategoryCached();
  const hubA = hubGroups[0]?.category;
  const hubB = hubGroups[1]?.category;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'clip' }}>
      <HomeToolsItemList />
      <HomeFaqJsonLd />
      <HomeBlogItemList />
      {/* Hero — H1 exact-match primary keyword, simple English */}
      <Box
        component="section"
        className="cinematic-hero"
        sx={{
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 4 } }}>
          <Grid container spacing={6} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, lg: 7 }}>
          <Stack
            spacing={4}
            sx={{
              alignItems: "flex-start",
              textAlign: "left",
              maxWidth: 640,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                letterSpacing: "0.08em",
                fontWeight: 700,
                textTransform: "none",
                color: "primary.main",
                border: "1px solid",
                borderColor: "divider",
                px: 2,
                py: 0.75,
                borderRadius: "999px",
                bgcolor: "background.paper",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
              }}
            >
              Most tools run local — no sign-ups.
            </Typography>
            <Typography
              variant="h1"
              sx={{
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                textWrap: "balance",
                fontSize: 'clamp(2.5rem, 1.6rem + 2.2vw, 4.25rem)',
                fontWeight: 800,
                color: "text.primary"
              }}
            >
              Free Online Tools – No Sign-Up, Right in Your Browser
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                lineHeight: 1.6,
                letterSpacing: "-0.015em",
                textWrap: "pretty",
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                maxWidth: 560,
              }}
            >
              Use 185 free online tools with no signup and no cost. Format JSON, compress images, and create QR codes in seconds. Your files stay on your device. See our <Link href="/privacy">privacy policy</Link>.
            </Typography>
            <Typography
              variant="body2"
              data-numeric
              sx={{ color: "text.secondary", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
              aria-label={`${EXPECTED_TOOL_COUNT} free tools across ${EXPECTED_CATEGORY_COUNT} categories`}
            >
              {EXPECTED_TOOL_COUNT} free tools · {EXPECTED_CATEGORY_COUNT} categories · no sign-up
            </Typography>
            <Box sx={{ pt: 2 }}>
              <HeroButtons firstSlug={tools[0].slug} />
            </Box>
          </Stack>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }} sx={{ display: { xs: "none", lg: "flex" }, justifyContent: "flex-end" }}>
              <Box
                aria-hidden="true"
                className="glass"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  borderRadius: "16px",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ letterSpacing: "0.08em", fontWeight: 700 }}>
                  {EXPECTED_CATEGORY_COUNT} categories
                </Typography>
                <Typography variant="body1" data-numeric sx={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontVariantNumeric: "tabular-nums" }}>
                  {EXPECTED_TOOL_COUNT}+ tools
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Free utilities, makers, and generators. Most run offline in your browser. Four tools need internet. See our privacy policy.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trust bar — text only, zero JS */}
      <Box sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', borderBottom: '1px solid', py: 2 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.7 }}>
            185 free tools · 12 categories · most run offline · no sign-up · <Link href="/methodology">how we test</Link> · <Link href="/about">about us</Link>
          </Typography>
        </Container>
      </Box>

      {/* On this page — jump links, server anchors only */}
      <Box component="nav" aria-label="On this page" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 1.5, contentVisibility: "auto", containIntrinsicSize: "auto 120px" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {[
              { href: "#popular", label: "Popular" },
              { href: "#categories", label: "Categories" },
              { href: "#tools", label: "All tools" },
              { href: "#what-is", label: "What is Tool4SaaS" },
              { href: "#guides", label: "Guides" },
              { href: "#faq", label: "FAQ" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 16px', borderRadius: 999, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}
              >
                {l.label}
              </Link>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Popular Tools — 8 pills, SSR links */}
      <Box component="section" id="popular" aria-label="Popular tools" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: { xs: 4, md: 6 }, scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 200px" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.4rem, 3vw, 2rem)', mb: 1 }}>
            Popular free online tools, no sign-up needed
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            8 most-used free tools for code, money, text, and daily jobs.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {POPULAR_SLUGS.map((p) => {
              const t = getTool(p.slug);
              const label = t?.title ?? p.slug;
              return (
                <Box
                  component={Link}
                  key={p.slug}
                  href={`/${p.slug}`}
                  aria-label={`${label} — ${p.benefit}`}
                  data-track="popular-pill"
                  data-slug={p.slug}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                    padding: '0 20px',
                    borderRadius: 999,
                    border: '1px solid',
                    borderColor: 'divider',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    color: 'text.primary',
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Categories teaser — pill scroll, no H3s, no descs (dedup) */}
      <Box component="nav" id="categories" aria-label="Tool categories" sx={{ bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', py: 3, scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 120px" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', textAlign: 'center', mb: 2 }}>
            Browse 12 free tool categories (no sign-up)
          </Typography>
          <Box component="ul" sx={{ display: 'flex', gap: 1, overflowX: 'auto', listStyle: 'none', m: 0, p: 0, pb: 1, justifyContent: { md: 'center' }, scrollSnapType: 'x mandatory' }}>
            {hubGroups.map((g) => {
              const visible = g.tools.filter((t) => t.slug !== "pdf-compress").length;
              return (
                <Box component="li" key={g.category.id} sx={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                  <Box component={Link} href={`/category/${g.category.id}`} aria-label={`View all ${visible} ${g.category.label} tools`} sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 16px', borderRadius: 999, border: '1px solid', borderColor: 'divider', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', color: 'text.primary', bgcolor: 'background.paper', whiteSpace: 'nowrap' }}>
                    {g.category.label} — {visible}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Features Grid — kept lean, proper H2 parent */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 }, borderBottom: '1px solid', borderColor: 'divider', overflowX: 'clip' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.4rem, 3vw, 2rem)', textAlign: 'center' }}>
            Why use Tool4SaaS free browser tools
          </Typography>
          <Grid container spacing={4}>
            {[
              { t: "Get it done.", d: "Draft invoices, decode JWTs, or preview Open Graph cards. One searchable library for dev, design, and daily jobs." },
              { t: "Local-first processing.", d: "Most tools shrink JPGs and diff files directly in the browser. Nothing is uploaded. Four tools need internet — see our privacy policy." },
              { t: "Instant exports.", d: "Copy HEX values in one click. Download PNG, SVG, and CSV files made for your workflow." },
            ].map((f) => (
              <Grid size={{ xs: 12, md: 4 }} key={f.t}>
                <Stack
                  spacing={1.5}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
                    contentVisibility: "auto",
                    containIntrinsicSize: "0 280px",
                    transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.01)',
                      borderColor: "rgba(0,0,0,0.12)",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)"
                    },
                    '&:active': { transform: 'scale(0.99)', transitionDuration: '100ms' }
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: "-0.01em", fontSize: '1.125rem' }}>
                    {f.t}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {f.d}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tools Section */}
      <Container maxWidth="xl" id="tools" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, scrollMarginTop: 100, overflowX: 'clip' }}>
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Browse all free browser tools by category
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
            Search or browse {EXPECTED_TOOL_COUNT} free utilities, makers, and generators. Most run locally. No paywalls, no limits.
          </Typography>
          {hubA && hubB && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
              Start with the <Link href={`/category/${hubA.id}`}>{hubA.label}</Link> and{" "}
              <Link href={`/category/${hubB.id}`}>{hubB.label}</Link> collections.
            </Typography>
          )}
        </Box>

        <PaginatedToolGrid groups={toolsByCategoryCached()} />
      </Container>

      {/* Mid-page Ad — after value, below fold, lazy, fixed reserve kills CLS */}
      <Container maxWidth="xl" sx={{ pb: 6, px: { xs: 2, md: 4 } }}>
        <Box sx={{ minHeight: { xs: 100, md: 250 }, contentVisibility: "auto", containIntrinsicSize: "auto 250px" }}>
          <AdSlot
            format="leaderboard"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD || ""}
            label="Advertisement"
          />
        </Box>
      </Container>

      {/* What is Tool4SaaS — simple English + persona H3s */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="what-is" aria-label="What is Tool4SaaS" sx={{ maxWidth: 800, mx: "auto", scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 1200px" }}>
          <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            What is Tool4SaaS? Free tools in your browser
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Reviewed by the Tool4SaaS Editorial Team · Last updated <time dateTime="2026-09-22">September 22, 2026</time> · <Link href="/author">Authors</Link> · <Link href="/methodology">How we test</Link> · <Link href="/contact">Contact us</Link>
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Tool4SaaS is a set of free online tools that run in your web browser. You open a tool, do your job, and get a clear result in seconds. There is no install, no wait, and no cost to start.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            Free tools for students — no signup
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Paste a 1,500-word essay into the <Link href="/word-counter">word counter</Link> to fix length fast. Check grades with the <Link href="/gpa-calculator">GPA calculator</Link>. All work runs free in your browser. Nothing uploads to servers.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            Invoice maker for freelancers
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Make a $550 bill free with the <Link href="/invoice-generator">invoice generator</Link> in minutes. Share work with a scannable <Link href="/qr-code-generator">QR code</Link> for menus and portfolios. Your data stays in your browser always.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            JSON formatter for developers
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Paste a 500KB file into the <Link href="/json-formatter">JSON formatter</Link> to validate fast. Test patterns with the <Link href="/regex-tester">regex tester</Link> before you ship. You never upload code. Files stay on your device.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Most tools are local-first. That means your words, files, and photos stay on your own device. They are not sent to our servers. When you close the tab, your data is gone. Only 4 web tools need the net, like live money rates. Each page says so in plain words. See our <Link href="/privacy">privacy policy</Link> and <Link href="/methodology">methodology page</Link>.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Try three top picks. The <Link href="/word-counter">word counter</Link> checks a 1,500-word essay and shows grade level plus read time. The <Link href="/loan-calculator">loan maker</Link> shows that a $100,000 loan at 5 percent for 30 years costs $536.82 a month. The <Link href="/qr-code-generator">QR generator</Link> makes a scan code for a shop menu in one click. Each utility is free, quick, and safe to try today.
          </Typography>
          <Box sx={{ p: 3, borderRadius: "12px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
            <Typography variant="h3" sx={{ fontSize: "1.125rem", fontWeight: 700, mb: 1 }}>
              Do you need an account or install? No.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              General patterns as of September 2026; individual tools differ. Tool4SaaS: no signup, no install, free, files stay local. Typical signup sites: need login, upload to servers, free with limits. Typical desktop apps: need install, stay local, often paid.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Recent Guides — 2 pillars + 4 clusters */}
      <Container maxWidth="xl" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="guides" aria-label="Recent guides" sx={{ scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
          <Box sx={{ textAlign: 'center', mb: 4, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="body2" sx={{ letterSpacing: "0.08em", fontWeight: 700, color: "primary.main", mb: 1 }}>
              Learn — guides that show the clicks
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', mb: 1 }}>
              Recent guides and tutorials for free tools
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Short, plain guides for real jobs. Each guide links back to its free tool.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {RECENT_GUIDES.map((g) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={g.href}>
                <Box sx={{ p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", height: "100%", contentVisibility: "auto", containIntrinsicSize: "auto 300px" }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", mb: 1, fontSize: '0.75rem', letterSpacing: "0.06em" }}>
                    {g.label} · <time dateTime={g.date}>{g.date}</time>
                  </Typography>
                  <Link href={g.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 1, lineHeight: 1.4 }}>
                      {g.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {g.desc}
                  </Typography>
                  <Link href={g.href} aria-label={`Read guide: ${g.title}`} style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                    Read guide →
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Link href="/blog" aria-label="View all blog guides" style={{ fontWeight: 700 }}>
              View all guides →
            </Link>
          </Box>
        </Box>
      </Container>

      {/* Popular workflows + testing summary */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="workflows" aria-label="Popular workflows" sx={{ maxWidth: 800, mx: "auto", scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Popular workflows for work, finance and study
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            How we test every tool
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            We build and test each utility in-house before it ships. We check outputs against known values. A $100,000 loan at 5 percent over 30 years equals $536.82 monthly. 70 kg at 175 cm reads a BMI of 22.9.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Finance and health tools get extra review. We label estimates as estimates, never advice. Every tool ships with a 4-step how-to plus worked numbers. We check pages in Chrome, Edge, Firefox, and Safari. Read the full process on our <Link href="/methodology">methodology page</Link>.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            Why local-first matters
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Most of our 185 utilities run 100 percent locally in your browser. What you type or upload never leaves your device. Close the tab and your data is gone.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Four tools need the internet. The <Link href="/currency-converter">currency converter</Link> needs live rates. YouTube thumbnails, SSL check, and voice input need the net too. Each page says so first. See our <Link href="/privacy">privacy policy</Link> for plain details.
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 1 }}>
            Workflows people love
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Developers <Link href="/json-formatter">format JSON</Link>, test <Link href="/regex-tester">regex patterns</Link>, and decode <Link href="/jwt-decoder">JWT expiry</Link> without pasting secrets elsewhere. Money planners compare a <Link href="/mortgage-calculator">$240,000 mortgage near $1,439 monthly</Link> against rent. They project a ₹5,000 SIP toward ₹11.5L. Creators <Link href="/qr-code-generator">make QR codes</Link> for menus and <Link href="/word-counter">count 1,500-word essays</Link> with read time. Start with <Link href="/category/developer">Developer Tools</Link> and <Link href="/category/finance">Finance planners</Link>.
          </Typography>
        </Box>
      </Container>

      {/* FAQ — static boxes, zero JS */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" id="faq" aria-label="Frequently asked questions" sx={{ maxWidth: 800, mx: "auto", scrollMarginTop: 100, contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
          <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", textAlign: 'center' }}>
            Frequently asked questions about free tools
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Quick answers in plain English. Still stuck? <Link href="/contact">Contact us</Link>.
          </Typography>
          {FAQS.map((f, i) => (
            <Box key={f.q} component="details" open={i === 0} sx={{ mb: 2, p: 3, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", contentVisibility: "auto", containIntrinsicSize: "auto 72px" }}>
              <Typography component="summary" variant="h3" sx={{ fontSize: '1.125rem', fontWeight: 700, cursor: 'pointer', '&:focus-visible': { outline: '3px solid', outlineOffset: '2px' } }}>
                {f.q}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 1 }}>
                {f.a}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Final CTA */}
      <Container maxWidth="lg" sx={{ pb: { xs: 10, md: 14 }, px: { xs: 2, md: 4 } }}>
        <Box component="section" aria-label="Get started" sx={{ maxWidth: 700, mx: "auto", textAlign: 'center', p: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "-0.025em", fontSize: 'clamp(1.5rem, 3vw, 2rem)', mb: 1 }}>
            Start with a free tool now, no account needed
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Pick a maker or generator above. Do the job in seconds. Learn more in our <Link href="/blog">guides</Link> or <Link href="/about">about us</Link>.
          </Typography>
          <HeroButtons firstSlug={tools[0].slug} />
        </Box>
      </Container>
    </Box>
  );
}
