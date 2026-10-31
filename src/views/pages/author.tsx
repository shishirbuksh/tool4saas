import { Container, Typography, Box, Avatar } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { siteConfig } from "@/lib/site";

const reviewers = [
  {
    initials: "TR",
    role: "Tools Reviewer",
    name: "Tools Reviewer",
    bio: "Tests developer and productivity tools against known samples for correct output. Verifies every tool runs locally in the browser with no sign-up required. Re-checks pages in current Chrome, Edge, Firefox, and Safari.",
    focusAreas: [
      "Developer and productivity tool accuracy",
      "Browser compatibility across Chrome, Edge, Firefox, and Safari",
      "Local-first privacy checks (no uploads, no sign-up)",
    ],
    knowsAbout: ["Developer Tools", "Software Testing", "Web Browsers"],
  },
  {
    initials: "FR",
    role: "Finance Reviewer",
    name: "Finance Reviewer",
    bio: "Reviews finance calculators using a documented methodology: cross-check formulas against public references and sample inputs. Flags estimates as estimates, never financial advice. Re-verifies tax and interest logic when rules change.",
    focusAreas: [
      "Loan and interest calculator logic",
      "Tax estimate assumptions and edge cases",
      "Formula cross-checks against public references",
    ],
    knowsAbout: ["Finance", "Interest Rates", "Tax Estimation"],
  },
  {
    initials: "HR",
    role: "Health Reviewer",
    name: "Health Reviewer",
    bio: "Checks health calculators for sane ranges and clear disclaimers. Confirms results encourage consulting a professional where appropriate. Validates metric/imperial conversions against reference values.",
    focusAreas: [
      "Health calculator ranges and disclaimers",
      "Metric and imperial conversion accuracy",
      "Clear guidance to consult a professional where appropriate",
    ],
    knowsAbout: ["Health", "Body Mass Index", "Unit Conversion"],
  },
];

export default function AuthorView() {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${base}/author`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.author,
      url: base,
      member: reviewers.map((r) => ({
        "@type": "Person",
        name: `${r.name} — ${siteConfig.authorRole}`,
        url: `${base}/author`,
        jobTitle: r.role,
        knowsAbout: r.knowsAbout,
        description: r.bio,
      })),
    },
  };

  return (
    <Container maxWidth="md" className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Typography variant="h1" className="text-[2.25rem] mb-4">
        Our authors
      </Typography>
      <Typography color="text.secondary" className="mb-2 leading-[1.8]">
        Reviewed by the <span translate="no">{siteConfig.authorRole}</span> — {siteConfig.authorBio}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-8">
        Last updated: <time dateTime="2026-09-09">September 9, 2026</time>
      </Typography>

      <Box className="grid gap-4">
        {reviewers.map((r) => (
          <Box
            key={r.role}
            component="section"
            aria-label={r.role}
            className="p-6 border border-base-300 rounded-[24px] bg-base-100 flex gap-4"
          >
            <Avatar className="w-[48px] h-[48px] font-bold" aria-hidden="true">
              {r.initials}
            </Avatar>
            <Box>
              <Typography variant="h2" className="text-[1.25rem] mb-1">
                {r.role}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="leading-[1.8]">
                {r.bio}
              </Typography>
              <Typography
                component="h3"
                variant="body2"
                className="font-bold mt-3 mb-1"
              >
                Focus areas
              </Typography>
              <Box component="ul" className="m-0 pl-5 text-base-content/70">
                {r.focusAreas.map((area) => (
                  <Typography key={area} component="li" variant="body2" className="leading-[1.8]">
                    {area}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        component="section"
        aria-label="Editorial process, credentials and corrections"
        className="mt-8 p-6 border border-base-300 rounded-[24px] bg-base-100"
      >
        <Typography variant="h2" className="text-[1.25rem] mb-2">
          Editorial process, credentials and corrections
        </Typography>
        <Typography variant="body2" color="text.secondary" className="leading-[1.8]">
          We publish as the <span translate="no">{siteConfig.authorRole}</span>, a role-based byline rather
          than individual names, so accountability sits with the process, not a persona. Tool reviewers verify
          outputs against reference samples, finance reviewers cross-check formulas against public guidance and
          label every estimate, and health reviewers confirm sane ranges with professional-consultation
          pointers. Every page is re-checked in current Chrome, Edge, Firefox, and Safari before publishing,
          and re-verified when logic or rules change. Review dates appear on our About and methodology pages,
          and every tool page carries its own FAQ with worked numbers. Spotted an error?{" "}
          <Link href="/contact">Contact us</Link> and we correct verified mistakes, noting the fix in our
          changelog. Our qualification is practical: we build each tool ourselves, so we test what we ship.
        </Typography>
      </Box>

      <Box
        component="section"
        aria-label="How we verify"
        className="mt-8 p-6 border border-base-300 rounded-[24px] bg-base-100"
      >
        <Typography variant="h2" className="text-[1.25rem] mb-2">
          How we verify
        </Typography>
        <Box component="ul" className="m-0 pl-5 text-base-content/70">
          <Typography component="li" variant="body2" className="leading-[1.8]">
            Build and test every tool in-house against known samples before publishing.
          </Typography>
          <Typography component="li" variant="body2" className="leading-[1.8]">
            Re-check outputs in current Chrome, Edge, Firefox, and Safari.
          </Typography>
          <Typography component="li" variant="body2" className="leading-[1.8]">
            Re-verify calculator logic when rules change; label estimates as estimates.
          </Typography>
        </Box>
        <Typography variant="body2" className="mt-3">
          <Link href="/methodology">How we verify — see our methodology</Link>
        </Typography>
      </Box>

      <Box
        component="nav"
        aria-label="Related pages"
        className="mt-8 flex flex-wrap gap-4 text-base-content/70"
      >
        <Typography variant="body2">
          <Link href="/about">About us</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/methodology">How we test</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/contact">Contact us</Link>
        </Typography>
      </Box>
    </Container>
  );
}
