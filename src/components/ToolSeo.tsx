import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ToolView } from "@/lib/tool-view";

// Real dates per-tool from git history — see src/lib/dates.ts
// (shared with ToolPageShell visible <time> and sitemap lastmod).

export default function ToolSeo({ view }: { view: ToolView }) {
  const { tool, locale } = view;
  // FAQ/HowTo/guide copy is pre-validated on the server; JSON-LD is emitted
  // into <head> by AppPage.astro from src/lib/tool-view.server.ts.
  const validFaq = view.validFaq;
  const validHowTo = view.validHowTo;
  const guideSections = view.guideSections;

  return (
    <Box component="section" aria-label={`${tool.title} FAQ and guide`} sx={{ mt: 6 }}>
      {validFaq.length > 0 && (
        <>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            {locale === "es" ? "Preguntas frecuentes" : locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
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
                <Typography component="span" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  {f.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" className="faq-passage speakable-answer-first">
                  {f.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}

      {validHowTo.length > 0 && (
        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}>
            {locale === "es" ? `Cómo usar ${tool.title}` : locale === "fr" ? `Comment utiliser ${tool.title}` : `How to use ${tool.title}`}
          </Typography>
          <Box component="ol" sx={{ pl: 3, color: "text.secondary", "& li": { mb: 1 } }}>
            {validHowTo.map((s, i) => (
              <li key={i} id={`howto-step-${i + 1}`} className="howto-passage">
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
            {locale === "es" ? "Guía en profundidad" : locale === "fr" ? "Guide approfondi" : "In-depth guide"}
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
