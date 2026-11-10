import { Container, Grid, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { HOME_GUIDES } from "@/content/home";

export default function HomeGuides() {
  return (
    <section
      id="guides"
      aria-labelledby="guides-heading"
      className="py-14 md:py-20 scroll-mt-[100px]"
    >
      <Container maxWidth="xl" className="px-4 md:px-8">
        <div
          className="flex items-end justify-between gap-4 mb-6 md:mb-8 flex-wrap"
        >
          <div className="max-w-[620px]">
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
          </div>
          <Link href="/blog" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
            All guides →
          </Link>
        </div>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {HOME_GUIDES.map((guide) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={guide.href}>
              <div
                className="p-5 rounded-xl border border-base-300 bg-base-100 h-full flex flex-col transition-all duration-150 hover:-translate-y-0.5 hover:border-base-content/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] active:scale-[0.99]"
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
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
