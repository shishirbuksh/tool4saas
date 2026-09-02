import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getCategory, type Tool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export default function ToolSeo({ tool }: { tool: Tool }) {
  const cat = getCategory(tool.category);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/${tool.slug}`;
  const catUrl = cat ? `${base}/category/${cat.id}` : undefined;

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
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          ...(cat
            ? [{ "@type": "ListItem", position: 2, name: cat.label, item: catUrl }]
            : []),
          {
            "@type": "ListItem",
            position: cat ? 3 : 2,
            name: tool.title,
            item: url,
          },
        ],
      },
      ...(tool.faq && tool.faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: tool.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
      ...(tool.howTo && tool.howTo.length
        ? [
            {
              "@type": "HowTo",
              name: `How to use ${tool.title}`,
              step: tool.howTo.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name,
                text: s.text,
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
      {tool.faq && tool.faq.length > 0 && (
        <>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            Frequently asked questions
          </Typography>
          {tool.faq.map((f, i) => (
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

      {tool.howTo && tool.howTo.length > 0 && (
        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            How to use {tool.title}
          </Typography>
          <Box component="ol" sx={{ pl: 3, color: "text.secondary", "& li": { mb: 1 } }}>
            {tool.howTo.map((s, i) => (
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
    </Box>
  );
}
