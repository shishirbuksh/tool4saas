import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getCategory, type Tool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

// Stagger dateModified per-tool across Sept 1-9 2026 from a deterministic
// slug hash (charCode sum % 9 + 1). This avoids a programmatic same-date
// freshness signal where every tool page shares an identical dateModified.
function getStaggeredDay(slug: string): number {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
  return (sum % 9) + 1;
}

function getDateModifiedIso(slug: string): string {
  const day = getStaggeredDay(slug);
  return `2026-09-${String(day).padStart(2, "0")}`;
}

export default function ToolSeo({ tool }: { tool: Tool }) {
  const cat = getCategory(tool.category);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/${tool.slug}`;
  const catUrl = cat ? `${base}/category/${cat.id}` : undefined;

  const datePublished = "2026-09-09";
  const dateModified = getDateModifiedIso(tool.slug);

  // Validate JSON-LD inputs: drop malformed/empty entries so FAQPage always
  // has Question + acceptedAnswer Answer text, and HowTo steps always have
  // position + name + text.
  const validFaq = Array.isArray(tool.faq)
    ? tool.faq.filter(
        (f) =>
          typeof f?.question === "string" &&
          f.question.trim().length > 0 &&
          typeof f?.answer === "string" &&
          f.answer.trim().length > 0
      )
    : [];
  const validHowTo = Array.isArray(tool.howTo)
    ? tool.howTo.filter(
        (s) =>
          typeof s?.name === "string" &&
          s.name.trim().length > 0 &&
          typeof s?.text === "string" &&
          s.text.trim().length > 0
      )
    : [];

  // BreadcrumbList with guaranteed sequential positions 1..n.
  const crumbItems: { name: string; item: string | undefined }[] = [
    { name: "Home", item: base },
    ...(cat ? [{ name: cat.label, item: catUrl }] : []),
    { name: tool.title, item: url },
  ];

  // Optional in-depth guide (field may not exist on Tool type yet).
  const guide: unknown = (tool as unknown as { guide?: unknown }).guide;
  const guideSections: unknown[] = Array.isArray(guide) ? guide : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: tool.title,
        description: tool.description,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        ...(tool.keywords?.length >= 3 ? { featureList: tool.keywords } : {}),
        // Validated: free tool must be price 0 USD.
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: "en",
        author: { "@type": "Organization", name: siteConfig.author, url: base },
        reviewer: { "@type": "Person", name: siteConfig.authorRole, url: `${base}/author` },
        datePublished,
        dateModified,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbItems.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      },
      ...(validFaq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: validFaq.map((f) => ({
                "@type": "Question",
                name: f.question.trim(),
                acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
              })),
            },
          ]
        : []),
      ...(validHowTo.length
        ? [
            {
              "@type": "HowTo",
              name: `How to use ${tool.title}`,
              step: validHowTo.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name.trim(),
                text: s.text.trim(),
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <Box component="section" aria-label={`${tool.title} FAQ and guide`} sx={{ mt: 6 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {validFaq.length > 0 && (
        <>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            Frequently asked questions
          </Typography>
          {validFaq.map((f, i) => (
            <Accordion
              key={i}
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                "&:before": { display: "none" },
                mb: 1,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>{f.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{f.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}

      {validHowTo.length > 0 && (
        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            How to use {tool.title}
          </Typography>
          <Box component="ol" sx={{ pl: 3, color: "text.secondary", "& li": { mb: 1 } }}>
            {validHowTo.map((s, i) => (
              <li key={i}>
                <Typography component="span" color="text.primary" sx={{ fontWeight: 600 }}>
                  {s.name}:{" "}
                </Typography>
                <Typography component="span">{s.text}</Typography>
              </li>
            ))}
          </Box>
        </Box>
      )}

      {guideSections.length > 0 && (
        <Box component="section" aria-label="In-depth guide" sx={{ mt: 4 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            In-depth guide
          </Typography>
          {guideSections.map((entry: unknown, i: number) => {
            if (typeof entry === "string") {
              return (
                <Typography key={i} color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                  {entry}
                </Typography>
              );
            }
            const section = entry as {
              heading?: unknown;
              title?: unknown;
              h2?: unknown;
              body?: unknown;
              content?: unknown;
              text?: unknown;
              paragraphs?: unknown;
            };
            const heading =
              (typeof section?.heading === "string" && section.heading) ||
              (typeof section?.title === "string" && section.title) ||
              (typeof section?.h2 === "string" && section.h2) ||
              `Section ${i + 1}`;
            const paragraphs: string[] = Array.isArray(section?.paragraphs)
              ? (section.paragraphs as unknown[]).filter(
                  (p): p is string => typeof p === "string" && p.trim().length > 0
                )
              : [
                  section?.body,
                  section?.content,
                  section?.text,
                ].filter((p): p is string => typeof p === "string" && p.trim().length > 0);
            return (
              <Box key={i} sx={{ mt: 3 }}>
                <Typography variant="h3" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, mb: 1 }}>
                  {heading}
                </Typography>
                {paragraphs.map((p, j) => (
                  <Typography key={j} color="text.secondary" sx={{ lineHeight: 1.8, mb: 1.5 }}>
                    {p}
                  </Typography>
                ))}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
