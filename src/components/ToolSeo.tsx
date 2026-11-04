import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@/components/ds";
import { ExpandMore as ExpandMoreIcon } from "@/components/ds/icons";
import type { ToolView } from "@/lib/tool-view";

function renderRichText(text: string): React.ReactNode {
  if (!text || !text.includes("[")) return text;
  const parts: (string | React.JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    parts.push(
      <a key={match.index} href={href} className="text-primary hover:underline font-medium">
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export default function ToolSeo({ view }: { view: ToolView }) {
  const { tool } = view;
  const validFaq = view.validFaq;
  const validHowTo = view.validHowTo;
  const guideSections = view.guideSections;

  return (
    <Box component="section" aria-label={`${tool.title} FAQ and guide`} className="mt-12">
      {validFaq.length > 0 && (
        <>
          <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
            Frequently asked questions
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
                  {renderRichText(f.answer)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}

      {validHowTo.length > 0 && (
        <Box component="section" className="mt-8">
          <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
            How to use {tool.title}
          </Typography>
          <Box component="ol" className="pl-6 text-base-content/70 [&_li]:mb-2">
            {validHowTo.map((s, i) => (
              <li key={i} id={`howto-step-${i + 1}`} className="howto-passage">
                <Typography component="span" color="text.primary" className="font-semibold">
                  {s.name}:{" "}
                </Typography>
                <Typography component="span">{renderRichText(s.text)}</Typography>
              </li>
            ))}
          </Box>
        </Box>
      )}

      {guideSections.length > 0 && (
        <Box component="section" aria-label="In-depth guide" className="mt-8">
          <Typography variant="h2" className="text-[1.5rem] md:text-[2rem] mb-4">
            In-depth guide
          </Typography>
          {guideSections.map((entry: unknown, i: number) => {
            if (typeof entry === "string") {
              return (
                <Typography key={i} color="text.secondary" className="leading-[1.8] mb-4">
                  {renderRichText(entry)}
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
              table?: { caption?: string; headers: string[]; rows: (string | number)[][] };
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

            const table = section?.table;

            return (
              <Box key={i} className="mt-6">
                <Typography variant="h3" className="text-[1.25rem] md:text-[1.5rem] mb-2">
                  {heading}
                </Typography>
                {paragraphs.map((p, j) => (
                  <Typography key={j} color="text.secondary" className="leading-[1.8] mb-3">
                    {renderRichText(p)}
                  </Typography>
                ))}
                {table && Array.isArray(table.headers) && Array.isArray(table.rows) && (
                  <div className="overflow-x-auto my-4 rounded-xl border border-base-300 bg-base-100">
                    <table className="table table-zebra w-full text-sm">
                      {table.caption && (
                        <caption className="p-3 text-xs font-semibold text-base-content/70 text-left bg-base-200/40">
                          {table.caption}
                        </caption>
                      )}
                      <thead className="bg-base-200/80 font-semibold text-base-content">
                        <tr>
                          {table.headers.map((h, k) => (
                            <th key={k} className="py-2.5 px-4 text-left font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-base-200/50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-4">
                                {typeof cell === "string" ? renderRichText(cell) : cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
