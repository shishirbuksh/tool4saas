import Link from "@/lib/astro/navigation";import { Container, Box, Typography, Breadcrumbs, Grid } from "@/components/ds";

import ToolCard from "@/components/ToolCard";
import { getCategory, toolsByCategoryCached, NOINDEX_SLUGS } from "@/lib/tools";
import { introForCategory, faqContentForCategory } from "@/lib/category-content";
import { siteConfig } from "@/lib/site";

export default function CategoryView({ id }: { id: string }) {
  const category = getCategory(id);
  if (!category) return null;
  const allGroups = toolsByCategoryCached();
  const currentGroup = allGroups.find((g) => g.category.id === id);
  const tools = currentGroup?.tools ?? [];
  const visibleTools = tools.filter((t) => !NOINDEX_SLUGS.has(t.slug));
  const base = siteConfig.url.replace(/\/$/, "");
  const categoryUrl = `${base}/category/${id}`;
  const faqContent = faqContentForCategory(id);
  const categoryFaqs = [
    {
      q: `What are the best free ${category.label.toLowerCase()} tools?`,
      a: faqContent[0].text,
      link: { slug: faqContent[0].linkSlug, label: faqContent[0].linkLabel },
    },
    {
      q: `Are ${category.label.toLowerCase()} tools on Tool4SaaS really free?`,
      a: faqContent[1].text,
      link: { slug: faqContent[1].linkSlug, label: faqContent[1].linkLabel },
    },
    {
      q: `Is my data safe when using ${category.label.toLowerCase()} tools?`,
      a: faqContent[2].text,
      link: { slug: faqContent[2].linkSlug, label: faqContent[2].linkLabel },
    },
    {
      q: `How do I use ${category.label.toLowerCase()} tools offline?`,
      a: faqContent[3].text,
      link: { slug: faqContent[3].linkSlug, label: faqContent[3].linkLabel },
    },
    {
      q: `Where do I get help for ${category.label.toLowerCase()}?`,
      a: faqContent[4].text,
      link: { slug: faqContent[4].linkSlug, label: faqContent[4].linkLabel },
    },
  ];
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
        author: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".faq-passage", ".category-answer-first"],
        },
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
      {
        "@type": "FAQPage",
        "@id": `${categoryUrl}#faq`,
        mainEntity: categoryFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <Container maxWidth="xl" className="py-16 md:py-24 px-4 md:px-8 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumbs className="mb-4" aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">{category.label}</Typography>
      </Breadcrumbs>
      <Typography variant="h1" className="text-[2rem] md:text-[2.5rem] mb-2">
        {category.label}
      </Typography>
      {(() => {
        const intro = introForCategory(id);
        return (
          <Box className="mb-8 max-w-[760px]">
            <Typography color="text.secondary" className="mb-4 leading-[1.8]">
              {intro.body}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-2">
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
      <Box
        component="section"
        aria-label={`Frequently asked questions about ${category.label}`}
        className="mt-12 max-w-[800px]"
      >
        <Typography variant="h2" className="text-[22px] font-extrabold mb-2">
          Frequently asked questions about {category.label}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Reviewed by the Tool4SaaS Editorial Team · <Link href="/author">Authors</Link> ·{" "}
          <Link href="/methodology">How we test</Link>
        </Typography>
        {categoryFaqs.map((f) => {
          const link = (f as { link?: { slug: string; label: string } }).link;
          const parts = link && f.a.includes(link.label) ? f.a.split(link.label) : null;
          return (
            <Box
              key={f.q}
              component="details"
              className="mb-4 p-5 rounded-[12px] border border-base-300 bg-base-100"
            >
              <Typography
                component="summary"
                variant="h3"
                className="text-[1.05rem] font-bold cursor-pointer"
              >
                {f.q}
              </Typography>
              <Typography color="text.secondary" className="faq-passage speakable-answer-first leading-[1.7] mt-2" >
                {parts ? (
                  <>
                    {parts.map((part, idx) => (
                      <span key={idx}>
                        {part}
                        {idx < parts.length - 1 && <Link href={`/${link!.slug}`}>{link!.label}</Link>}
                      </span>
                    ))}
                  </>
                ) : (
                  f.a
                )}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box className="mt-10">
        <Typography variant="h2" className="text-[20px] mb-4">
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
                  className="block p-6 bg-base-100 rounded-[16px] border border-base-300 h-full hover:[transform:translateY(-2px)_scale(1.01)] hover:border-[rgba(0,0,0,0.12)] hover:[box-shadow:0_0_0_1px_rgba(0,0,0,0.06),_0_12px_32px_rgba(34,29,29,0.08),_0_4px_12px_rgba(34,29,29,0.05)] active:[transform:scale(0.99)] active:[transition-duration:100ms]" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)", contentVisibility: "auto", containIntrinsicSize: "0 180px", transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)" }}
                >
                  <Typography variant="h3" className="text-[18px] mb-1">
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
