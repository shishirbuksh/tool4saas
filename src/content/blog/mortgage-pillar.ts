import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My cousin budgeted $1,450 a month for her first home — the principal-and-interest number the listing agent quoted. Her actual first bill: $1,940. Property tax, insurance and PMI added nearly $500 nobody had walked her through. She could afford it, but the surprise stung for months. If your home math still says “principal plus interest and done”, this <strong>mortgage calculator guide</strong> closes the gap before a lender has to.</p>
<p>Here is the promise: by the end of this page you will know exactly <strong>how mortgage payments are calculated, what PITI and PMI add on top, how amortization front-loads interest, and when 15-year terms, overpayments or refinancing change the math — with illustrative numbers worked by hand</strong>. I ran every example below through our <a href="/mortgage-calculator">free mortgage calculator</a> in September 2026 (no signup, private in-browser). Open it in the next tab and follow along.</p>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets unless stated.</p>
<p>In this pillar: what a <strong>home loan calculator</strong> does, the 4 inputs that matter, the full PITI breakdown, the exact formula with a $240,000 worked example, amortization schedules, <strong>15-vs-30-year math</strong>, affordability rules, down payment and PMI, refinance break-even, overpayments, <strong>India EMI mode</strong>, and rent-vs-buy. Each section links to a deeper tutorial — nine of them. In a hurry? Jump to <a href="#formula-example">the formula + $240k example</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="what-is-calculator">What is a mortgage calculator — and what does it actually compute?</h2>
<p>A <strong>mortgage calculator</strong> (also called a <strong>home loan calculator</strong>, <strong>house payment estimator</strong> or <strong>mortgage payment calculator</strong>) turns four inputs — loan amount, annual rate, tenure and down payment — into your monthly payment, lifetime interest and payoff date. You type, it amortizes, you compare scenarios. That is it.</p>
<p>The Tool4SaaS version runs <strong>100% in your browser</strong> with no signup: principal, rate and tenure in, EMI plus a yearly amortization table out, with CSV export for side-by-side rate comparisons. Your loan figures never leave the tab — I verified with the network off after page load. Compare that to bank calculators demanding ZIP codes, credit ranges and phone numbers before showing a single number.</p>
<h3>The 4 inputs that matter (and the ones people skip)</h3>
<ul>
<li><strong>Home price minus down payment = loan amount (P).</strong> A $300,000 home with $60,000 down means P = $240,000. Every extra down-payment dollar cuts interest twice: smaller loan, and no PMI past 20%.</li>
<li><strong>Annual interest rate → monthly r.</strong> Divide by 12 and 100: 6% becomes r = 0.005. Half a point moves hundreds monthly — always compare 2–3 rates.</li>
<li><strong>Tenure → payment count n.</strong> 30 years = 360 payments; 15 years = 180. Shorter tenure, bigger payment, far less lifetime interest.</li>
<li><strong>Start date (for the schedule).</strong> Sets the payoff month and the year-by-year principal/interest split you will actually live through.</li>
</ul>

<h2 id="piti-breakdown">PITI: the real monthly payment (principal is only the start)</h2>
<p>Lenders quote principal and interest. Homeowners pay <strong>PITI — principal, interest, property tax and insurance</strong> — plus PMI and HOA where they apply. My cousin's $490 gap is textbook: on a $300,000 home, ~1.1%/year property tax adds ~$275/month, insurance ~$150, and PMI under 20% down adds $100–300 more. Budget the full stack or the “affordable” payment is fiction.</p>
<table>
<thead><tr><th>Component</th><th>Typical size</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Principal + interest</strong></td><td>Base EMI (e.g. $1,439)</td><td>Fixed for fixed-rate loans; the only part calculators compute precisely</td></tr>
<tr><td><strong>Property tax</strong></td><td>~1.1%/yr of value (US avg)</td><td>Varies wildly by municipality; can rise yearly</td></tr>
<tr><td><strong>Home insurance</strong></td><td>~$100–250/mo</td><td>Lender-required; shop it annually</td></tr>
<tr><td><strong>PMI</strong></td><td>0.5–1.5%/yr of loan</td><td>Conventional loans under 20% down; cancellable at 20% equity</td></tr>
<tr><td><strong>HOA dues</strong></td><td>$0–500+/mo</td><td>Condos/townhomes; easy to forget, never forgiven</td></tr>
</tbody>
</table>
<p>Our calculator models principal and interest precisely; add local tax, insurance, PMI and HOA on top for the real number. Full down-payment strategy in <a href="/blog/mortgage-calculator-guide/down-payment-pmi-cost">down payment & PMI guide</a>.</p>

<h2 id="formula-example">The formula + $240,000 worked example (by hand)</h2>
<p>The math every calculator runs — Bankrate, NerdWallet and ours alike: <strong>EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)</strong>, where P is loan amount, r is monthly rate (annual ÷ 12 ÷ 100), n is months. No black box; you can check it in a spreadsheet.</p>
<p>Worked example: borrow <strong>$240,000 at 6% for 30 years</strong>. r = 0.005, n = 360. EMI lands near <strong>$1,439/month</strong>. Total paid: $1,439 × 360 ≈ $518,000, so lifetime interest is near <strong>$278,000</strong> — more than the loan itself. That single fact reframes every “should I overpay / refinance / go 15-year?” question in this silo. Step-by-step hand calculation in <a href="/blog/mortgage-calculator-guide/how-to-calculate-mortgage-payment">how to calculate mortgage payment</a>.</p>
<h3>What changes the payment most (sensitivity in 30 seconds)</h3>
<ul>
<li><strong>Rate ±1%:</strong> on $240,000/30yr, 5% vs 6% differs ~$150/month and ~$50,000 lifetime. Rate shopping beats haggling over fees.</li>
<li><strong>Tenure 30→15:</strong> payment jumps ~30–40%, lifetime interest roughly halves. Details in <a href="/blog/mortgage-calculator-guide/15-vs-30-year-mortgage">15-vs-30 guide</a>.</li>
<li><strong>Down payment to 20%:</strong> deletes PMI ($100–300/mo) and shrinks P. Cheapest “return” in homebuying.</li>
</ul>

<h2 id="amortization">Amortization: why early payments are almost all interest</h2>
<p>Each fixed payment first covers that month's interest on the remaining balance; the leftover reduces principal. Early on the balance is huge, so interest eats nearly everything: on the $240,000/6% loan, month-one interest is ~$1,200 of the $1,439 — principal falls just ~$239. By year 15 the split flips; final payments are nearly all principal. This is why extra payments early destroy lifetime interest: every early principal dollar skips interest on all 360 months. Full schedules with year-by-year tables in <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization schedule guide</a>, and the payoff math in <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">extra payments guide</a>.</p>

<h2 id="term-choice">15 vs 30 years: the $250,000 question</h2>
<p>Same $300,000-class loan at illustrative rates: a 30-year term pays roughly <strong>double the lifetime interest</strong> of a 15-year for ~30% lower monthly payments. The 15-year builds equity at ~4× speed early (~$68,000 vs ~$17,000 at year 5) and skips PMI years sooner — but its higher payment raises your debt-to-income ratio, which can shrink the home you qualify for. Rule I use: take the 15-year only if the payment stays under 28% of gross income with emergency savings intact; otherwise take the 30-year and overpay voluntarily (same destination, with an escape hatch). Full comparison with payoff dates in <a href="/blog/mortgage-calculator-guide/15-vs-30-year-mortgage">15-vs-30 guide</a>.</p>

<h2 id="affordability">Affordability: the 28/36 rule in one minute</h2>
<p>Lenders size loans with two ratios: housing costs under <strong>28% of gross monthly income</strong>, all debts under <strong>36%</strong>. Earn $7,500/month? Housing ceiling ≈ $2,100; with $800 car + student payments, mortgage room ≈ $1,900. That budget — not the listing price — is your real search filter. Down payment, rate and tenure then convert it into a home price via the calculator. Complete income-by-income walkthrough in <a href="/blog/mortgage-calculator-guide/how-much-house-can-i-afford">affordability guide</a>, including the <a href="/home-affordability-calculator">affordability calculator</a> flow.</p>

<h2 id="refi-overpay">Refinance and overpay: the two levers after signing</h2>
<p><strong>Refinance</strong> swaps your loan for a cheaper one: worth it roughly when rates fall ~1%+ and you stay past the break-even month (closing costs ÷ monthly savings). $4,000 costs ÷ $200 savings = 20 months; moving in month 18 loses money. <strong>Overpaying</strong> needs no paperwork: +$200/month on the $240,000 example cuts roughly 7 years and saves tens of thousands in interest, because early principal kills 360 months of interest each. UK note: most lenders cap penalty-free overpayments around 10%/year — check yours first. Break-even math in <a href="/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage">refinance guide</a>; extra-payment tables in <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpayment guide</a> with the <a href="/refinance-calculator">refinance</a> and <a href="/mortgage-overpayment-calculator">overpayment calculators</a>.</p>

<h2 id="india-emi">India mode: lakh, EMI, FOIR and prepayment</h2>
<p>Indian home loans run the same reducing-balance math in different clothes: <strong>lakh/crore principals</strong> (Rs 60L loan), <strong>floating rates</strong> that reset with repo moves, <strong>FOIR caps</strong> (~50–60% of income to all EMIs), 20–30 year tenures, stamp duty + registration (5–8% extra upfront), and mostly zero prepayment penalties on floating-rate loans — making part-prepayments the wealth lever. Eligibility blends CIBIL (750+ unlocks best rates), age, tenure and FOIR; check yours in the <a href="/home-loan-eligibility-india">home loan eligibility tool</a> and EMIs in the <a href="/emi-calculator">EMI calculator</a>. Complete CIBIL/FOIR/salary playbook in <a href="/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india">India EMI & eligibility guide</a>.</p>

<h2 id="closing-costs">Closing costs: the 2–6% nobody budgets</h2>
<p>The loan is not the only check you write. <strong>Closing costs</strong> — origination fees, appraisal, title search and insurance, attorney, recording, prepaid escrow — run <strong>2–6% of the price</strong>: $6,000–18,000 on $300,000, due in cash at signing. First-time buyers who saved exactly 20% down routinely scramble here. Three defenses: get the Loan Estimate within 3 days of application and compare line by line across lenders; ask sellers for closing-cost credits in buyer-friendly markets (2–3% concessions are common); and keep your emergency fund separate — closing must not zero your reserves. Lender credits (“no-closing-cost” loans) just roll costs into a higher rate; run both versions through the <a href="/mortgage-calculator">calculator</a> and take the credit only if you will move or refinance before the higher rate overtakes the savings — usually under 5 years.</p>
<h3>Escrow: the forced savings account</h3>
<p>Most lenders collect tax + insurance monthly into <strong>escrow</strong> and pay the bills for you — that $200–400 on top of P&I is not optional padding, it is your own obligations prepaid. Escrow analyses can raise the monthly total yearly as taxes climb; read the annual statement instead of panicking at the “shortage” letter. Put 20%+ down with some lenders and you can waive escrow — disciplined savers only, since a $3,300 tax bill surprises the undisciplined.</p>

<h2 id="fixed-vs-arm">Fixed vs adjustable rates: certainty has a price</h2>
<p><strong>Fixed-rate</strong> locks one rate for the whole term — payment never moves, planning is trivial, and you win big if rates rise. <strong>Adjustable-rate (ARM)</strong> offers a lower teaser (5/1, 7/1: fixed years, then yearly adjusts with caps) — cheaper if you sell or refinance before reset, dangerous if you stay and rates climb. The honest test: will you certainly move, sell or refinance before the fixed period ends? Military movers and 5-year planners can profit from ARMs; “maybe we'll stay” families should pay the fixed premium. Never plan a decade off a teaser schedule — our calculator and every schedule in this silo assume fixed rates. Hybrid middle ground: fixed loan now, <a href="/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage">refinance</a> if rates fall, <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpay</a> if they do not.</p>

<h2 id="preapproval">Preapproval vs prequalification (and how to shop lenders)</h2>
<p><strong>Prequalification</strong> is a 10-minute estimate from self-reported numbers — useful for browsing, worthless as proof. <strong>Preapproval</strong> is underwritten verification (income, assets, credit pull) with a max amount letter sellers take seriously. Get preapproved before touring: it sets the real ceiling from <a href="/blog/mortgage-calculator-guide/how-much-house-can-i-afford">affordability math</a>, and sellers in competitive markets bin non-preapproved offers unread. Then shop: three Loan Estimates on the same day (rates move daily), compare APR plus closing line by line — not monthly payment alone, which lenders can shrink with points and longer terms. Multiple mortgage pulls within ~2 weeks count as one inquiry for scoring; spread shopping across months dings you repeatedly. Lock the winner's rate in writing.</p>

<h2 id="first-time">First-time buyer programs worth checking</h2>
<ul>
<li><strong>3%-down conventional:</strong> Fannie/Freddie programs for qualified first-timers — PMI applies, but entry beats years of rent while saving 20%. Run the trade in <a href="/blog/mortgage-calculator-guide/down-payment-pmi-cost">down payment guide</a>.</li>
<li><strong>FHA loans:</strong> 3.5% down with lenient credit floors; MIP rules differ from PMI (often permanent for the loan's life) — price that before celebrating the low entry.</li>
<li><strong>VA/USDA:</strong> zero-down for eligible veterans and rural buyers — the cheapest entry in American housing for those who qualify.</li>
<li><strong>State + employer assistance:</strong> grants, forgivable seconds, employer relocation sums — stackable with the above; search your state's housing finance agency before assuming 20% is mandatory.</li>
<li><strong>India parallel:</strong> PMAY-linked interest subsidies for eligible first homes plus state stamp-duty rebates — check current scheme windows with your bank/HFC alongside <a href="/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india">India EMI guide</a>.</li>
</ul>

<h2 id="points">Points: buying down the rate (when it pays)</h2>
<p>Lenders sell <strong>discount points</strong>: pay ~1% of the loan upfront per point to cut the rate ~0.25%. On $240,000, one $2,400 point might save ~$35/month — break-even near 5–6 years, same division as refinancing. Points pay when you stay long, have spare cash after down payment plus reserves, and itemize the deduction benefit with your tax advisor. Points lose when you move, refinance or overpay aggressively inside the window — all three shorten the loan below break-even. Builder/lender “free point” promos are just price negotiations wearing costumes: compare the no-points APR from a second lender before celebrating. Model both versions in the <a href="/mortgage-calculator">calculator</a> at each rate; the cheaper lifetime total wins regardless of packaging.</p>

<h2 id="glossary">Glossary: 12 terms in plain English</h2>
<ul>
<li><strong>Principal:</strong> amount borrowed (P). <strong>Interest:</strong> rent on that money. <strong>EMI/P&I:</strong> fixed monthly P+I payment.</li>
<li><strong>PITI:</strong> P&I + tax + insurance. <strong>PMI/MIP:</strong> lender-protection insurance under ~20% down.</li>
<li><strong>DTI:</strong> debts ÷ gross income; 28/36 gates. <strong>LTV:</strong> loan ÷ value; decides PMI and rate tiers.</li>
<li><strong>APR:</strong> rate plus fees annualized — compare APRs, not note rates, across lenders.</li>
<li><strong>Amortization:</strong> the payoff schedule; interest-heavy early. <strong>Equity:</strong> value minus balance — your ownership slice.</li>
<li><strong>Escrow:</strong> lender-held tax/insurance prepayments. <strong>Closing costs:</strong> 2–6% one-time fees at signing.</li>
<li><strong>FOIR (India):</strong> all EMIs within ~50–60% of income. <strong>CIBIL:</strong> credit score; 750+ qualifies for the lowest rate slabs banks publish.</li>
</ul>

<h2 id="timeline">Offer to keys: the 30–60 day timeline</h2>
<p>Knowing the sequence prevents panic at every stage. <strong>Days 1–3:</strong> offer accepted, earnest money deposited, formal application filed — rate lock starts here. <strong>Days 3–10:</strong> Loan Estimate arrives (compare once more), appraisal ordered, inspections done; inspection findings renegotiate price or credits now, never after contingencies expire. <strong>Days 10–30:</strong> underwriting verifies everything — do not open credit cards, finance furniture or change jobs; I have seen a sofa loan kill a closing. <strong>Days 30–45:</strong> conditional approval → conditions cleared (pay stubs, explanation letters) → clear to close. <strong>Closing day:</strong> review the Closing Disclosure against the Loan Estimate (tolerances are legally capped), wire funds via verified instructions (wire fraud is real — call the title company at a known number), sign, get keys. Delays cluster at appraisal gaps and underwriting document loops — respond to lender requests within hours, not days.</p>

<h2 id="rent-buy">Rent vs buy: break-even math, not slogans</h2>
<p>“Rent is throwing money away” ignores interest, tax, maintenance (~1%/yr), insurance, closing costs (2–6%) and the opportunity cost of the down payment invested. The honest test: total 5–7 year cost of owning (PITI + maintenance + closing, minus principal repaid and appreciation) versus renting + investing the difference. High rates, short stays and hot rental markets favor renting; long stays and fixed payments favor buying. Worked break-even in <a href="/blog/mortgage-calculator-guide/rent-vs-buy-house">rent-vs-buy guide</a>.</p>
<h2 id="this-week">What to do this week (action list)</h2>
<ol>
<li><strong>Run your payment</strong> in the <a href="/mortgage-calculator">mortgage calculator</a> at three rates — know your number before any lender names theirs.</li>
<li><strong>Compute your 28/36 ceilings</strong> from real pay stubs and debts — that budget is your search filter (<a href="/blog/mortgage-calculator-guide/how-much-house-can-i-afford">affordability guide</a>).</li>
<li><strong>Check credit early:</strong> CIBIL/credit reports months ahead leave room for disputes; last-minute surprises cost rate tiers.</li>
<li><strong>Separate the funds:</strong> down payment, closing (2–6%), and emergency reserves in three mental buckets — never let one raid the others.</li>
<li><strong>Book one advisor conversation</strong> before offers: a licensed mortgage advisor plus your tax advisor, 30 minutes each, beats 30 hours of forum reading.</li>
</ol>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

const toc = [
  { id: "what-is-calculator", text: "What a mortgage calculator computes", level: 2 as const },
  { id: "piti-breakdown", text: "PITI: the real monthly payment", level: 2 as const },
  { id: "formula-example", text: "Formula + $240k example", level: 2 as const },
  { id: "amortization", text: "Amortization: interest first", level: 2 as const },
  { id: "term-choice", text: "15 vs 30 years", level: 2 as const },
  { id: "affordability", text: "Affordability: 28/36 rule", level: 2 as const },
  { id: "refi-overpay", text: "Refinance + overpay levers", level: 2 as const },
  { id: "india-emi", text: "India: lakh, EMI, FOIR", level: 2 as const },
  { id: "closing-costs", text: "Closing costs: 2–6%", level: 2 as const },
  { id: "fixed-vs-arm", text: "Fixed vs adjustable rates", level: 2 as const },
  { id: "preapproval", text: "Preapproval + lender shopping", level: 2 as const },
  { id: "first-time", text: "First-time buyer programs", level: 2 as const },
  { id: "points", text: "Points: buying down the rate", level: 2 as const },
  { id: "glossary", text: "Glossary: 12 terms", level: 2 as const },
  { id: "timeline", text: "Offer to keys: timeline", level: 2 as const },
  { id: "rent-buy", text: "Rent vs buy break-even", level: 2 as const },
  { id: "this-week", text: "What to do this week", level: 2 as const },
];

export const mortgagePillar: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "mortgage-calculator-guide",
  kind: "pillar",
  title: "Mortgage Calculator Guide: Payments, PMI & Amortization",
  description:
    "Learn how mortgage payments work — PITI, formula with $240k example, amortization, 15-vs-30, refinance, India EMI + rent-vs-buy. Free calculator.",
  keywords: [
    "mortgage calculator guide",
    "how does mortgage payment calculator work",
    "piti vs principal and interest",
    "mortgage calculator first-time buyers pmi",
    "home loan calculator guide",
    "house payment estimator",
  ],
  toolSlugs: ["mortgage-calculator", "home-affordability-calculator", "refinance-calculator", "mortgage-overpayment-calculator"],
  relatedSlugs: ["how-to-calculate-mortgage-payment", "how-much-house-can-i-afford", "15-vs-30-year-mortgage"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc,
  html,
  faqs: [
    {
      question: "How is a monthly mortgage payment calculated?",
      answer:
        "With EMI = P×r×(1+r)^n÷((1+r)^n−1): loan amount, monthly rate (annual÷12÷100), months. Example: $240,000 at 6% for 30 years gives r=0.005, n=360, EMI near $1,439 with lifetime interest near $278,000. See /terms.",
    },
    {
      question: "What is PITI in a mortgage payment?",
      answer:
        "Principal, interest, property tax and insurance — plus PMI under 20% down and HOA where applicable. Lenders quote principal and interest; homeowners pay the full stack, often hundreds more monthly.",
    },
    {
      question: "Why is my early mortgage payment mostly interest?",
      answer:
        "Each payment covers that month's interest on the remaining balance first. Early balances are large, so interest dominates; as principal falls, the split flips. Extra early payments cut lifetime interest fastest.",
    },
    {
      question: "Is a 15-year mortgage better than 30-year?",
      answer:
        "It roughly halves lifetime interest for ~30% higher payments and faster equity — but only if payments stay under ~28% of income with savings intact. Otherwise take 30 years and overpay voluntarily.",
    },
    {
      question: "How much house can I afford?",
      answer:
        "Lenders use 28% of gross income for housing and 36% for all debts. That budget converts to a price via down payment, rate and tenure. Details and calculator flow in the affordability guide.",
    },
    {
      question: "Is this guide financial advice?",
      answer:
        "No — informational planning only. Rates and examples are illustrative as of Sept 2026, exclude taxes, insurance, PMI, HOA, fees and ARM resets. Consult a qualified advisor and your lender; see /terms.",
    },
  ],
};
