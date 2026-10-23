// Authoritative references for YMYL silos. Kept in one place so the visible
// "Sources and further reading" block and the BlogPosting `citation` array can
// never drift. Links are official guidance pages, checked for reachability;
// they support the guide's general method, not any single numeric claim.
export type GuideSource = { label: string; href: string };

export const YMYL_GUIDE_SOURCES: Record<string, GuideSource[]> = {
  "mortgage-calculator-guide": [
    { label: "CFPB — Owning a Home toolkit", href: "https://www.consumerfinance.gov/owning-a-home/" },
    { label: "CFPB — What are closing costs?", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-closing-costs-en-1801/" },
    { label: "CFPB — What is private mortgage insurance?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/" },
    { label: "HUD — Buying a home", href: "https://www.hud.gov/topics/buying_a_home" },
  ],
  "sip-calculator-guide": [
    { label: "SEBI — Investor education", href: "https://investor.sebi.gov.in/" },
    { label: "Income Tax Department — e-Filing portal", href: "https://www.incometax.gov.in/iec/foportal/" },
    { label: "PFRDA — National Pension System", href: "https://www.pfrda.org.in/" },
    { label: "National Savings Institute — small savings schemes", href: "https://www.nsiindia.gov.in/" },
  ],
  "debt-payoff-guide": [
    { label: "CFPB — Debt collection", href: "https://www.consumerfinance.gov/consumer-tools/debt-collection/" },
    { label: "CFPB — Credit counseling", href: "https://www.consumerfinance.gov/consumer-tools/credit-counseling/" },
    { label: "CFPB — Credit reports and scores", href: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" },
    { label: "Federal Reserve — Consumer credit data (G.19)", href: "https://www.federalreserve.gov/releases/g19/" },
  ],
  "bmi-calculator-guide": [
    { label: "CDC — Adult BMI calculator", href: "https://www.cdc.gov/bmi/adult-calculator/index.html" },
    { label: "NHS — Calculate your BMI", href: "https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/" },
    { label: "WHO — Obesity and overweight fact sheet", href: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
    { label: "CDC — Growth charts", href: "https://www.cdc.gov/growthcharts/" },
  ],
};

export function getGuideSources(pillar: string): GuideSource[] {
  return YMYL_GUIDE_SOURCES[pillar] ?? [];
}

export function getGuideCitationUrls(pillar: string): string[] {
  return getGuideSources(pillar).map((source) => source.href);
}
