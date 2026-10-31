import { Container, Box, Grid, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { HOME_GUIDES } from "@/content/home";

export default function HomeGuides() {
  return (
    <Box
      component="section"
      id="guides"
      aria-labelledby="guides-heading"
      className="py-14 md:py-20 scroll-mt-[100px]"
    >
      <Container maxWidth="xl" className="px-4 md:px-8">
        <Box
          className="flex items-end justify-between gap-4 mb-6 md:mb-8 flex-wrap"
        >
          <Box className="max-w-[620px]">
            <Typography
              component="h2"
              id="guides-heading"
              className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] mb-1"
            >
              Guides and tutorials
            </Typography>
            <Typography color="text.secondary" className="text-[0.9375rem] md:text-[1rem]">
              Practical walkthroughs. Each guide links back to a free tool.
            </Typography>
          </Box>
          <Link href="/guides" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
            All guides →
          </Link>
        </Box>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {HOME_GUIDES.map((guide) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={guide.href}>
              <Box
                className="p-4 md:p-5 rounded-xl border border-base-300 bg-base-100 h-full flex flex-col hover:border-[rgba(0,0,0,0.16)] hover:[transform:translateY(-2px)] dark:[&_:hover]:border-[rgba(255,255,255,0.2)]" style={{ transition: "border-color 200ms ease, transform 200ms ease" }}
              >
                <Typography
                  variant="body2"
                  className="font-bold text-base-content/70 mb-1.5 text-[0.6875rem] tracking-[0.06em] uppercase"
                >
                  {guide.label} · <time dateTime={guide.date}>{guide.date}</time>
                </Typography>
                <Link href={guide.href} style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography
                    component="h3"
                    className="text-[1.0625rem] md:text-[1.125rem] font-bold leading-[1.35] tracking-[-0.015em] mb-1.5 text-balance"
                  >
                    {guide.title}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="leading-[1.55] mb-3 line-clamp-2 overflow-hidden" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
                >
                  {guide.desc}
                </Typography>
                <Link
                  href={guide.href}
                  aria-label={`Read guide: ${guide.title}`}
                  style={{ fontWeight: 600, fontSize: "0.8125rem", marginTop: "auto" }}
                >
                  Read guide →
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
