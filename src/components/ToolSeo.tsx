import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@/components/ds";

import { ExpandMore as ExpandMoreIcon } from "@/components/ds/icons";
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
    <Box component="section" aria-label={`${tool.title} FAQ and guide`} className="mt-12">
      {validFaq.length > 0 && (
        <>
          <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
            {locale === "es" ? "Preguntas frecuentes" : locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </Typography>
          {validFaq.map((f, i) => (
            <Accordion
              key={i}
              elevation={0}
              className="bg-base-100 border border-base-300 before:hidden mb-2 rounded-xl"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" className="font-semibold text-[1rem]">
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
        <Box component="section" className="mt-8">
          <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
            {locale === "es" ? `Cómo usar ${tool.title}` : locale === "fr" ? `Comment utiliser ${tool.title}` : `How to use ${tool.title}`}
          </Typography>
          <Box component="ol" className="pl-6 text-base-content/70 [&_li]:mb-2">
            {validHowTo.map((s, i) => (
              <li key={i} id={`howto-step-${i + 1}`} className="howto-passage">
                <Typography component="span" color="text.primary" className="font-semibold">
                  {s.name}:{" "}
                </Typography>
                <Typography component="span">{s.text}</Typography>
              </li>
            ))}
          </Box>
        </Box>
      )}

      {guideSections.length > 0 && (
        <Box component="section" aria-label="In-depth guide" className="mt-8">
          <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
            {locale === "es" ? "Guía en profundidad" : locale === "fr" ? "Guide approfondi" : "In-depth guide"}
          </Typography>
          {guideSections.map((entry: unknown, i: number) => {
            if (typeof entry === "string") {
              return (
                <Typography key={i} color="text.secondary" className="leading-[1.8] mb-4">
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
              <Box key={i} className="mt-6">
                <Typography variant="h3" className="text-[1.25rem] md:text-[1.5rem] mb-2">
                  {heading}
                </Typography>
                {paragraphs.map((p, j) => (
                  <Typography key={j} color="text.secondary" className="leading-[1.8] mb-3">
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
