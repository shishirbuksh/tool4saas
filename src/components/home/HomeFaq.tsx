import { Container, Box, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { FAQS } from "@/content/home";

// Static FAQ accordion — zero JS, matches the FAQPage JSON-LD 1:1.
export default function HomeFaq() {
  return (
    <Box
      component="section"
      id="faq"
      aria-label="Frequently asked questions"
      className="bg-base-100 border-t border-b border-base-300 py-14 md:py-20 scroll-mt-[100px]"
    >
      <Container maxWidth="md" className="px-4 md:px-8">
        <Box className="text-center mb-6 md:mb-8">
          <Typography
            variant="h2"
            className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] mb-1"
          >
            Frequently asked questions
          </Typography>
          <Typography color="text.secondary" className="text-[0.9375rem] md:text-[1rem]">
            Plain answers. Still stuck? <Link href="/contact">Contact us</Link>.
          </Typography>
        </Box>

        {FAQS.map((f, i) => (
          <Box
            key={f.q}
            component="details"
            open={i === 0}
            className="mb-2 px-4 md:px-5 py-3.5 md:py-4 rounded-[12px] border border-base-300 bg-base-100 [&[open]]:border-[rgba(0,0,0,0.16)] dark:[&_[open]]:border-[rgba(255,255,255,0.2)]" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 64px" }}
          >
            <Typography
              component="summary"
              className="text-[0.9375rem] md:text-[1rem] font-semibold cursor-pointer leading-[1.4] focus-visible:[outline:3px_solid] focus-visible:[outline-offset:4px]"
            >
              {f.q}
            </Typography>
            <Typography
              color="text.secondary"
              className="speakable-faq-answer leading-[1.7] mt-2 text-[0.875rem] md:text-[0.9375rem]"
              
            >
              {f.a}
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
