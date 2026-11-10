import { Container, Typography } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { FAQS } from "@/content/home";

// Static FAQ accordion — zero JS, matches the FAQPage JSON-LD 1:1.
export default function HomeFaq() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="bg-base-100 border-t border-b border-base-300 py-14 md:py-20 scroll-mt-[100px]"
    >
      <Container maxWidth="md" className="px-4 md:px-8">
        <div className="text-center mb-6 md:mb-8">
          <Typography
            variant="h2"
            className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.025em] mb-1"
          >
            Frequently asked questions
          </Typography>
          <Typography color="text.secondary" className="text-[0.9375rem] md:text-[1rem]">
            Plain answers. Still stuck? <Link href="/contact">Contact us</Link>.
          </Typography>
        </div>

        {FAQS.map((f, i) => (
          <details
            key={f.q}
            open={i === 0}
            className="collapse collapse-arrow mb-3 rounded-xl border border-base-300 bg-base-100 transition-colors hover:border-base-content/20"
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 64px" }}
          >
            <summary className="collapse-title text-[0.9375rem] md:text-[1rem] font-semibold cursor-pointer py-4 px-5 list-none select-none [&::-webkit-details-marker]:hidden">
              {f.q}
            </summary>
            <div className="collapse-content px-5 pb-4 pt-0">
              <Typography
                color="text.secondary"
                className="speakable-faq-answer leading-[1.7] text-[0.875rem] md:text-[0.9375rem]"
              >
                {f.a}
              </Typography>
            </div>
          </details>
        ))}
      </Container>
    </section>
  );
}
