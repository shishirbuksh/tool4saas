import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>The debt avalanche method is two rules. Sort debts by APR, highest first. Pay every minimum, then send the rest of a fixed monthly pool to the top debt. When it clears, the pool does not shrink. The freed minimum rolls into the next balance, which is why avalanche accelerates once the first account disappears.</p>
<p>This walkthrough shows the rule in action with three debts, including the first month's allocation and the month a cleared payment rolls forward. The <a href="/debt-payoff-calculator">debt payoff calculator</a> runs the same schedule with your balances and rates.</p>

<h2 id="what-avalanche-does">What the avalanche method optimizes</h2>
<p>Avalanche sends money to the balance with the highest APR because that is where each dollar costs the most per month. A 27% card charges roughly 2.25% of its balance in monthly interest. An 8% loan charges roughly 0.67%. Paying the expensive balance first reduces the interest that accrues on the largest rate.</p>
<p>The method does not change any APR, negotiate a balance or move debt to a new account. It also does not guarantee a lower total cost if rates change, new charges appear or a promotional rate expires. It is a sorting rule for a fixed pool under stable assumptions.</p>
<p>The tradeoff is timing. The highest-rate debt may not be the smallest, so the first cleared account can be months away. Avalanche is usually cheapest for a given pool, but it can feel slow. That is why the choice between avalanche and snowball is partly mathematical and partly behavioral.</p>

<h2 id="step-by-step">The avalanche method, step by step</h2>
<ol>
<li><strong>List every debt.</strong> Write down the name, balance, APR, minimum payment and due date. Include cards, personal loans and any other balance with a rate.</li>
<li><strong>Confirm the minimums.</strong> Use the current amount from each statement. Put every minimum on autopay so a late payment cannot trigger a fee or a penalty rate.</li>
<li><strong>Set the extra amount.</strong> Choose an extra payment that fits after essentials and a small emergency buffer. The pool is the sum of all minimums and that extra amount.</li>
<li><strong>Sort by APR.</strong> Highest APR first. If two debts share the same rate, put the smaller balance first so the order is defined.</li>
<li><strong>Pay the minimums, then the target.</strong> Every debt gets its minimum. The rest of the pool goes to the first debt on the list.</li>
<li><strong>Keep the pool fixed when a debt clears.</strong> The cleared debt's minimum stays in the pool. The next debt receives the larger payment automatically.</li>
<li><strong>Review the schedule.</strong> Update the balances and minimums when they change, and rerun the simulation. A plan built on stale inputs drifts.</li>
</ol>
<p>The order is the easy part. Keeping the pool constant while life changes around it is the part that requires discipline. The schedule is a map, not a substitute for a budget.</p>

<h2 id="example-one-first-month">Example 1: the first month of an avalanche plan</h2>
<p>The example has three debts. Card A carries $4,000 at 27% APR with a $100 minimum. Card B carries $1,500 at 21% APR with a $45 minimum. An auto loan carries $6,000 at 8% APR with a $160 minimum. The extra payment is $300, so the pool is $100 + $45 + $160 + $300 = $605.</p>
<table>
<thead><tr><th>Debt</th><th>Balance</th><th>APR</th><th>Minimum</th><th>Month-one interest</th><th>Month-one payment</th></tr></thead>
<tbody>
<tr><td><strong>Card A</strong></td><td>$4,000</td><td>27%</td><td>$100</td><td>$90.00</td><td>$400.00</td></tr>
<tr><td><strong>Card B</strong></td><td>$1,500</td><td>21%</td><td>$45</td><td>$26.25</td><td>$45.00</td></tr>
<tr><td><strong>Auto loan</strong></td><td>$6,000</td><td>8%</td><td>$160</td><td>$40.00</td><td>$160.00</td></tr>
<tr><td><strong>Total</strong></td><td>$11,500</td><td>—</td><td>$305</td><td>$156.25</td><td>$605.00</td></tr>
</tbody>
</table>
<p>Month one interest is $4,000 × 0.27 ÷ 12 = $90 on Card A, $1,500 × 0.21 ÷ 12 = $26.25 on Card B, and $6,000 × 0.08 ÷ 12 = $40 on the auto loan. Interest is added before payments, so the total owed is $11,656.25 at the start of the payment step.</p>
<p>Avalanche sorts Card A first because 27% is the highest rate. Card A receives its $100 minimum and the $300 extra, or $400. Card B receives $45 and the auto loan receives $160. End-of-month balances are $3,690 on Card A, $1,481.25 on Card B and $5,880 on the auto loan. The payment pool has been fully used.</p>

<h2 id="rolled-payment-example">Example 2: the rolled payment when Card A clears</h2>
<p>Card A clears in month 12. At the end of month 11 its balance is $179.28. Month 12 interest of about $4.03 brings that to $183.31. The final payment clears it, and the rest of that month's pool, about $216.69, goes to Card B in the same month. No money waits for the next due date.</p>
<p>From month 13, Card B receives $445 a month: its $45 minimum and the $400 that used to go to Card A. Its balance falls from $1,053.46 to $608.46 in that single month. Before the roll, Card B was receiving only its minimum. The auto loan continues at $160 until Card B clears in month 15, then it receives the full $605.</p>
<p>The full schedule finishes in month 22. Total interest is $1,518.13, so total paid is $11,500 + $1,518.13 = $13,018.13. The first cleared account arrives at month 12, and the payment pool grows in effect without any increase in the monthly commitment.</p>

<h2 id="avalanche-vs-snowball">How avalanche compares with snowball here</h2>
<p>Run the same three debts through snowball and the order changes. Card B is the smallest balance, so it clears in month 5. Card A then receives the rolled payment and clears in month 15. The auto loan follows and the plan finishes in month 22. Total interest is $1,604.67.</p>
<p>Avalanche saves $86.54 and finishes in the same 22 months. Snowball delivers the first zero at month 5 instead of month 12. That is a clear tradeoff: a faster emotional win for a modestly higher interest bill. The <a href="/blog/debt-payoff-guide/snowball-vs-avalanche">snowball vs avalanche comparison</a> works through a two-debt case where both orders finish in the same month.</p>
<p>When the highest-rate balance is much larger than the others, the avalanche advantage usually widens. When the rates are close, the interest difference shrinks and the behavioral case for snowball gets stronger.</p>

<h2 id="common-frictions">Common frictions that change the schedule</h2>
<p>The simulation holds APRs and minimums fixed. Real cards can change rates, and real issuers can recalculate minimums as balances fall. If the highest APR is variable, stress-test the plan at a higher rate before relying on the finish date. If a minimum drops, the pool in the calculator stays fixed, which is conservative for payoff but may not match your cash flow.</p>
<p>New charges are the biggest threat. A purchase added to the priority card can cancel the principal reduction you just paid for. Stop routine spending on the cards in the plan, keep one card for planned purchases only if you pay it in full, and automate the minimums so a missed payment cannot trigger a penalty rate.</p>
<p>Check prepayment penalties on loans before sending extra money. Most credit cards do not charge them, but personal loans and auto loans can. Keep a small emergency buffer outside the pool so a repair does not become new debt.</p>

<h2 id="when-to-switch">When to switch methods</h2>
<p>If the highest-rate balance is large and progress feels invisible, switch to snowball for one or two debts, then return to avalanche. The point of the method is to finish, not to defend a spreadsheet choice. Rerun the calculator with the remaining balances and the same pool to see the new timeline.</p>
<p>Review the schedule at least once a quarter and after any rate change. If the plan still fits, keep going. If it does not, adjust the extra amount or the order rather than abandoning the pool. A smaller extra payment that survives is better than a larger one that lasts two months.</p>
<p>For a fuller routine, read the <a href="/blog/debt-payoff-guide/debt-snowball-method">snowball method guide</a>, the <a href="/blog/debt-payoff-guide/extra-payment-strategy">extra payment strategy</a> and the <a href="/blog/debt-payoff-guide/debt-free-date">debt-free date guide</a>.</p>
<div class="cta-box"><strong>Build your avalanche schedule:</strong> open the <a href="/debt-payoff-calculator">debt payoff calculator</a>, enter each balance, APR and minimum, then add an extra amount. The tool sorts by APR, pools the minimums, rolls freed payments forward and shows the months, interest and debt-free date. It does not negotiate debts, move balances or promise approvals.</div>
`;

export const debtAvalanche: BlogPost = {
  pillar: "debt-payoff-guide",
  slug: "debt-avalanche-method",
  kind: "cluster",
  title: "Debt Avalanche Method: Steps, Example and Rolled Payments",
  description:
    "Follow the debt avalanche method step by step, with a rolled-payment example showing how freed minimums speed up the next balance.",
  keywords: ["debt avalanche method", "avalanche debt payoff", "highest apr first", "debt payoff steps", "rolled payment method", "avalanche vs snowball"],
  toolSlugs: ["debt-payoff-calculator"],
  relatedSlugs: ["snowball-vs-avalanche", "debt-snowball-method", "extra-payment-strategy", "debt-free-date"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-avalanche-does", text: "What the avalanche method optimizes", level: 2 },
    { id: "step-by-step", text: "The avalanche method, step by step", level: 2 },
    { id: "example-one-first-month", text: "Example 1: the first month", level: 2 },
    { id: "rolled-payment-example", text: "Example 2: the rolled payment", level: 2 },
    { id: "avalanche-vs-snowball", text: "How avalanche compares with snowball", level: 2 },
    { id: "common-frictions", text: "Frictions that change the schedule", level: 2 },
    { id: "when-to-switch", text: "When to switch methods", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the debt avalanche method?", answer: "It is a payoff order that ranks debts by APR, highest first. You pay every minimum, then send the rest of a fixed monthly pool to the highest-rate debt. When that debt clears, its minimum stays in the pool and the next-highest-rate debt receives the larger payment. The method targets interest cost rather than quick wins." },
    { question: "Is the avalanche method always cheaper than snowball?", answer: "It is usually cheaper for the same payment pool when APRs are fixed and there are no new charges, because it retires the most expensive balance first. It is not always cheaper in every real situation. Variable rates, promotional rates, fees and new spending can change the result. In the three-debt example, avalanche saved $86.54 and finished in the same 22 months as snowball." },
    { question: "What happens to the minimum payment when a debt is paid off?", answer: "It stays in the payoff pool. Suppose the cleared debt had a $100 minimum. That $100 does not leave your budget. It joins the extra amount on the next priority debt, so the next payment is larger without any increase in your total monthly commitment. The calculator models this roll-forward automatically." },
    { question: "Should I use avalanche if I have a 0% promotional card?", answer: "A promotional rate changes the ranking because the current APR is lower than the rate after the promotion ends. Check the expiry date, the transfer fee and the rate that applies afterward. The calculator uses the APR you enter, so you can test the post-promotion rate as a stress case. Do not assume the promotional rate lasts longer than the terms state." },
    { question: "How do I handle a variable APR in the plan?", answer: "Rerun the simulation with a higher APR to see how sensitive the timeline is. If the plan only works at the current rate, it has less margin for a rate increase. Keep the minimums current and review the schedule when the issuer changes the rate. The tool assumes a fixed rate for each debt, so the result is a scenario rather than a forecast." },
    { question: "Do I need to close credit cards after paying them off?", answer: "Not necessarily. Closing a card can reduce available credit and change utilization, and it may affect the length of your credit history. The payoff calculator does not model credit scores or account closures. If you are considering closing an account, review the effect on your overall credit profile first." },
  ],
};
