import type { BlogPost, BlogPillarMeta } from "@/lib/blog";
import { invoicePillar } from "@/content/blog/invoice-pillar";
import { invoiceHowToCreate } from "@/content/blog/invoice-c1-how-to-create";
import { invoiceGstFormat } from "@/content/blog/invoice-c2-gst-format";
import { invoiceFreelancer } from "@/content/blog/invoice-c3-freelancer";
import { invoiceSmallBusiness } from "@/content/blog/invoice-c4-small-business";
import { invoiceTemplates } from "@/content/blog/invoice-c5-templates";
import { invoiceVsDocs } from "@/content/blog/invoice-c6-vs-docs";
import { invoiceNumbering } from "@/content/blog/invoice-c7-numbering";
import { invoicePaymentTerms } from "@/content/blog/invoice-c8-payment-terms";
import { invoiceMistakes } from "@/content/blog/invoice-c9-mistakes";
import { qrPillar } from "@/content/blog/qr-pillar";
import { qrHowToCreate } from "@/content/blog/qr-c1-how-to-create";
import { qrWifi } from "@/content/blog/qr-c2-wifi";
import { qrBusiness } from "@/content/blog/qr-c3-business";
import { qrVsBarcode } from "@/content/blog/qr-c4-vs-barcode";
import { qrSizePrint } from "@/content/blog/qr-c5-size-print";
import { qrNotScanning } from "@/content/blog/qr-c6-not-scanning";
import { qrVcard } from "@/content/blog/qr-c7-vcard";
import { qrUpi } from "@/content/blog/qr-c8-upi";
import { qrStaticDynamic } from "@/content/blog/qr-c9-static-dynamic";
import { resumePillar } from "@/content/blog/resume-pillar";
import { resumeHowTo } from "@/content/blog/resume-c1-how-to";
import { resumeFormat } from "@/content/blog/resume-c2-format";
import { resumeAts } from "@/content/blog/resume-c3-ats";
import { resumeFresher } from "@/content/blog/resume-c4-fresher";
import { resumeExperienced } from "@/content/blog/resume-c5-experienced";
import { resumeVsCv } from "@/content/blog/resume-c6-vs-cv";
import { resumeCoverLetter } from "@/content/blog/resume-c7-cover-letter";
import { resumeMistakes } from "@/content/blog/resume-c8-mistakes";
import { resumeOfferLetter } from "@/content/blog/resume-c9-offer-letter";

export const BLOG_PILLARS: BlogPillarMeta[] = [
  {
    pillar: "invoice-generator-guide",
    title: "Free Invoice Generator Guide: Create Professional Invoices Fast",
    shortLabel: "Invoice Guide",
    description:
      "The complete free invoice generator guide — what to include, GST rules, templates, numbering, payment terms and how to create a PDF invoice in minutes with no signup.",
    toolSlug: "invoice-generator",
    keywords: [
      "free invoice generator",
      "invoice maker",
      "create invoice online free",
      "gst invoice format",
      "freelancer invoice",
    ],
    updated: "2026-09-18",
  },
  {
    pillar: "qr-code-generator-guide",
    title: "Free QR Code Generator Guide: Create Scannable QR Codes Fast",
    shortLabel: "QR Code Guide",
    description:
      "The complete free QR code generator guide — WiFi, UPI, menus, vCards, print sizing, static vs dynamic and scan fixes. No signup, no expiry.",
    toolSlug: "qr-code-generator",
    keywords: [
      "free qr code generator",
      "qr code maker",
      "wifi qr code",
      "upi qr code",
      "qr code size print",
    ],
    updated: "2026-09-22",
  },
  {
    pillar: "resume-builder-guide",
    title: "Free Resume Builder Guide: Build a Job-Winning Resume Fast",
    shortLabel: "Resume Guide",
    description:
      "The complete free resume builder guide — sections, fresher vs experienced, ATS rules, India/US/UK formats, cover letters, offer letters + PDF export.",
    toolSlug: "resume-builder",
    keywords: [
      "free resume builder",
      "resume maker",
      "ats friendly resume",
      "resume format india",
      "fresher resume",
    ],
    updated: "2026-09-23",
  },
];

const ALL_POSTS: BlogPost[] = [
  invoicePillar,
  invoiceHowToCreate,
  invoiceGstFormat,
  invoiceFreelancer,
  invoiceSmallBusiness,
  invoiceTemplates,
  invoiceVsDocs,
  invoiceNumbering,
  invoicePaymentTerms,
  invoiceMistakes,
  qrPillar,
  qrHowToCreate,
  qrWifi,
  qrBusiness,
  qrVsBarcode,
  qrSizePrint,
  qrNotScanning,
  qrVcard,
  qrUpi,
  qrStaticDynamic,
  resumePillar,
  resumeHowTo,
  resumeFormat,
  resumeAts,
  resumeFresher,
  resumeExperienced,
  resumeVsCv,
  resumeCoverLetter,
  resumeMistakes,
  resumeOfferLetter,
];

export function getPillarMeta(pillar: string): BlogPillarMeta | undefined {
  return BLOG_PILLARS.find((p) => p.pillar === pillar);
}

export function getPillarPost(pillar: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.pillar === pillar && p.kind === "pillar");
}

export function getClusterPost(pillar: string, cluster: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.pillar === pillar && p.slug === cluster && p.kind === "cluster");
}

export function getClustersForPillar(pillar: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.pillar === pillar && p.kind === "cluster");
}

export function getAllBlogStaticParams(): { pillar: string; cluster?: string }[] {
  const params: { pillar: string; cluster?: string }[] = [];
  for (const meta of BLOG_PILLARS) {
    params.push({ pillar: meta.pillar });
    for (const c of getClustersForPillar(meta.pillar)) {
      params.push({ pillar: meta.pillar, cluster: c.slug });
    }
  }
  return params;
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const siblings = getClustersForPillar(post.pillar).filter((p) => p.slug !== post.slug);
  // Prefer explicitly related slugs first, then fill with the rest.
  const ordered = [
    ...siblings.filter((s) => post.relatedSlugs.includes(s.slug)),
    ...siblings.filter((s) => !post.relatedSlugs.includes(s.slug)),
  ];
  if (post.kind === "pillar") return ordered.slice(0, limit);
  const pillar = getPillarPost(post.pillar);
  const rest = ordered.filter((p) => p.slug !== post.slug).slice(0, Math.max(0, limit - (pillar ? 1 : 0)));
  return [...(pillar ? [pillar] : []), ...rest].slice(0, limit);
}

export const BLOG_POST_COUNT = ALL_POSTS.length;
