import { Container, Typography, Box } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { siteConfig } from "@/lib/site";
import { getPageModifiedIso, formatIsoHuman } from "@/lib/dates";

export default function AboutView() {
  const lastUpdatedIso = getPageModifiedIso("about") ?? "";
  return (
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">About <span translate="no">{siteConfig.name}</span></Typography>
      <Typography variant="body2" color="text.secondary" className="mb-6">
        Last updated: <time dateTime={lastUpdatedIso}>{formatIsoHuman(lastUpdatedIso)}</time>
      </Typography>
      <Box component="div" className="text-base-content/70 leading-[1.8]">
        <Typography className="block mb-2">
          <span translate="no">{siteConfig.name}</span> is a collection of free, privacy-friendly productivity tools that run mostly in your browser. Most tools run 100% locally; 4 network tools (currency converter, YouTube thumbnails, SSL checker, voice input) need internet — see <Link href="/privacy">/privacy</Link>. We built it because great tools shouldn&apos;t require an account, a subscription, or handing over your data.
        </Typography>
        <Typography className="block mb-2">
          Most tools process your input locally on your device. Nothing you type is uploaded to our servers unless you explicitly download or print the result, except for the 4 network tools disclosed in our Privacy Policy.
        </Typography>
        <Typography className="block mb-2">
          We keep the service free by displaying advertisements. This helps us cover hosting and continue improving the toolkit. Thank you for using it.
        </Typography>
        <Typography className="block mb-2">
          Location &amp; contact: <span translate="no">{siteConfig.name}</span> is an online-only service operated remotely. Questions or feedback? See <Link href="/contact">/contact</Link> — we aim to respond within 2 business days at {siteConfig.email}.
        </Typography>
        <Typography className="block mb-2">
          How we test: we build and test every tool in-house, checking outputs against known samples and reviewing guides for accuracy. We verify in current Chrome, Edge, Firefox, and Safari on desktop and mobile viewports, and re-check pages as tools improve.
        </Typography>
      </Box>
      <Box component="section" aria-label="Timeline" className="mt-8">
        <Typography variant="h2" className="text-[1.5rem] mb-2 text-base-content">Launched in 2026: why local-first</Typography>
        <Typography className="block mb-2 text-base-content/70 leading-[1.8]">
          <span translate="no">{siteConfig.name}</span> launched in 2026 as a one-person side project that grew into a maintained library of free utilities. The founding constraint has never changed: tools must work the moment the page opens, with no account wall and no upload step. Most utilities therefore run entirely in the browser, a harder way to build that keeps your work on the visitor device. Advertising covers hosting so the library stays free.
        </Typography>
      </Box>
      <Box component="section" aria-label="Testing rig" className="mt-8">
        <Typography variant="h2" className="text-[1.5rem] mb-2 text-base-content">Testing rig</Typography>
        <Typography className="block mb-2 text-base-content/70 leading-[1.8]">
          Every tool is built and verified in-house on current stable Chrome, Edge, Firefox, and Safari, across desktop viewports from 1280 pixels up and mobile widths of 360 to 390 pixels. Sample checks anchor each release: loan math must hit $536.82 on the reference case, BMI must read 22.9, and converters must round-trip fixtures like Ada age 36 without loss. Finance and health pages carry FAQ answers averaging well above our editorial floor, labeled as estimates with professional-consultation pointers. Logic changes trigger a full re-check before re-publishing — see <Link href="/methodology">/methodology</Link> for the complete process.
        </Typography>
      </Box>
      <Box component="section" aria-label="Changelog" className="mt-8">
        <Typography variant="h2" className="text-[1.5rem] mb-2 text-base-content">Changelog</Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          Recent site updates, newest first:
        </Typography>
        <Box
          component="table"
          className="w-full border-collapse text-[0.875rem] text-base-content/70"
        >
          <Box component="thead">
            <Box component="tr">
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Date
              </Box>
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Change
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr">
              <Box component="td" className="p-2 border-b border-base-300 whitespace-nowrap">
                October 2026
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                Added in-depth guides to 10 utilities (randomness, time, converters, developer checks) and expanded all category introductions.
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td" className="p-2 border-b border-base-300 whitespace-nowrap">
                September 2026
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                Published the testing methodology and the editorial review process behind every tool.
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td" className="p-2 border-b border-base-300 whitespace-nowrap">
                September 2026
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                Expanded the home page with testing, privacy, and workflow documentation for new visitors.
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        component="section"
        aria-label="Founder story"
        className="mt-8 p-6 border border-base-300 rounded-[24px] bg-base-100"
      >
        <Typography variant="h2" className="text-[1.5rem] mb-2 text-base-content">Why we built it</Typography>
        <Typography className="block mb-2 text-base-content/70 leading-[1.8]">
          We built <span translate="no">{siteConfig.name}</span> around one repeated frustration: needing a quick document, code snippet or calculation, and finding that site after site demanded an account or an upload first. The goal is tools that just work — open the page, get it done, leave nothing behind.
        </Typography>
        <Typography className="block text-base-content/70 leading-[1.8]">
          So every tool is built to run locally in your browser. Your text and files never leave your device. That constraint makes the work harder, but it is the whole point — and why <span translate="no">{siteConfig.name}</span> stays free and privacy-first.
        </Typography>
      </Box>
      <Box
        component="section"
        aria-label="About the author"
        className="mt-6 p-6 border border-base-300 rounded-[24px]"
      >
        <Typography variant="h2" className="text-[1.25rem] mb-2 text-base-content">About the author</Typography>
        <Typography variant="body2" color="text.secondary" className="leading-[1.8]">
          Written and maintained by the <span translate="no">{siteConfig.name}</span> editorial team ({siteConfig.author}). We build and maintain every tool in-house, review guides for accuracy, and update pages as tools improve. Contact: {siteConfig.email}. Reviewed: <time dateTime={lastUpdatedIso}>{formatIsoHuman(lastUpdatedIso)}</time>.
        </Typography>
      </Box>
    </Container>
  );
}
