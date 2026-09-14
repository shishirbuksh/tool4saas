import type { Tool } from "../types";

export const financeTools: Tool[] = [
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    short: "EMI & amortization schedule",
    description: "Calculate monthly EMI, total interest, and amortization for home loans. Adjust principal, rate, and tenure. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["mortgage calculator", "mortgage emi calculator", "home loan emi calculator"],
    category: "finance",
    faq: [{ question: "How is EMI calculated?", answer: "EMI = P×r×(1+r)^n÷((1+r)^n−1), where P=principal, r=monthly rate, n=months." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult your lender for exact figures." }, { question: "Is my data private?", answer: "Yes, all EMI and schedule calculations run locally in your browser." }],
    howTo: [{ name: "Enter loan", text: "Enter principal, annual rate and tenure." }, { name: "Add down payment", text: "Enter down payment to see loan amount." }, { name: "View schedule", text: "See EMI, total interest and yearly table; export to CSV." }]
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    short: "Maturity & interest growth",
    description: "Track how your money grows over time. Enter principal, rate, frequency, and years to project your maturity amount. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["compound interest calculator", "compound interest maturity calculator", "investment calculator"],
    category: "finance",
    faq: [{ question: "What is compounding frequency?", answer: "Yearly=1, half-yearly=2, quarterly=4, monthly=12. More frequent compounding yields slightly higher maturity." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions. Past performance does not guarantee future returns." }, { question: "Is my data private?", answer: "Yes, all compounding calculations run locally in your browser and stay private." }],
    howTo: [{ name: "Enter principal", text: "Enter initial investment amount." }, { name: "Set rate & years", text: "Enter annual rate, years and compounding frequency." }, { name: "View maturity", text: "See maturity amount and interest breakdown." }]
  },
  {
    slug: "salary-calculator",
    title: "Salary Calculator",
    short: "Take-home pay estimates",
    description: "Estimate take-home pay from your gross salary, tax rate, and deductions. View net annual and per-paycheck amounts. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["salary calculator", "take home pay", "net pay calculator"],
    category: "finance",
    faq: [{ question: "How is net calculated?", answer: "Taxable = gross - deductions, tax = taxable×rate%, net = gross - tax. Per-pay = net ÷ pay periods." }, { question: "Is this tax advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions. Tax laws vary; consult a professional." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional." }],
    howTo: [{ name: "Enter gross", text: "Enter gross annual salary." }, { name: "Set tax", text: "Enter tax rate and deductions." }, { name: "View net", text: "See net annual and per-paycheck." }]
  },
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin Calculator",
    short: "Calculate margin & markup",
    description: "Determine profit, margin, and markup. Enter your cost and revenue to see your financial breakdown instantly. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["profit margin calculator", "markup calculator", "margin vs markup"],
    category: "finance",
    faq: [{ question: "What is margin vs markup?", answer: "Margin = profit÷revenue×100, Markup = profit÷cost×100. Margin is share of revenue, markup is uplift on cost." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is my data private?", answer: "Yes, margin and markup math runs locally in your browser and is private." }],
    howTo: [{ name: "Enter cost", text: "Enter cost amount." }, { name: "Enter revenue", text: "Enter selling price." }, { name: "View", text: "See profit, margin and markup." }]
  },
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator",
    short: "Net pay after taxes",
    description: "Estimate your net pay after taxes. Input your gross salary and deductions to view taxable income, total tax, and effective rate. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["income tax calculator", "after tax salary calculator", "gross to net pay calculator"],
    category: "finance",
    faq: [{ question: "How is tax estimated?", answer: "Demo brackets: 10% ≤11k, 12% ≤44k, 22% ≤95k, 24% above. Taxable = gross - deduction." }, { question: "Is this tax advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions. Consult a tax professional." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional." }],
    howTo: [{ name: "Enter gross", text: "Enter gross annual salary." }, { name: "Set deduction", text: "Choose filing status and deduction." }, { name: "View net", text: "See taxable, tax and net pay." }]
  },
  {
    slug: "inflation-calculator",
    title: "Inflation Calculator",
    short: "Future purchasing power",
    description: "Calculate future value and purchasing power adjusted for inflation. Enter your amount, rate, and years. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["inflation calculator", "future value inflation", "purchasing power"],
    category: "finance",
    faq: [{ question: "How is future value calculated?", answer: "Future = amount×(1+rate)^years. Purchasing power = amount÷(1+rate)^years." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is my data private?", answer: "Yes, inflation math runs locally in your browser and nothing is uploaded." }],
    howTo: [{ name: "Enter amount", text: "Enter present amount." }, { name: "Set rate & years", text: "Enter inflation rate and years." }, { name: "View", text: "See future value and purchasing power." }]
  },
  {
    slug: "sip-calculator",
    title: "SIP Calculator",
    short: "SIP maturity & gains",
    description: "Project SIP maturity, invested amounts, and gains for monthly investments. Enter your monthly SIP, annual rate, and duration. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["sip calculator", "sip maturity", "sip investment calculator"],
    category: "finance",
    faq: [{ question: "How is SIP calculated?", answer: "Future = monthly×((1+mr)^n−1)/mr×(1+mr), where mr=annual/12/100, n=years×12." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is my data private?", answer: "Yes, SIP maturity math runs locally in your browser and stays private." }],
    howTo: [{ name: "Enter SIP", text: "Enter monthly investment." }, { name: "Set rate & years", text: "Enter annual rate and duration." }, { name: "View", text: "See maturity, invested and gains." }]
  },
  {
    slug: "simple-interest-calculator",
    title: "Simple Interest Calculator",
    short: "Interest & total cost",
    description: "Calculate simple interest, total cost, and monthly payments. Enter principal, rate, and time to view the breakdown. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["simple interest calculator", "simple interest formula", "loan interest calculator"],
    category: "finance",
    faq: [{ question: "Simple vs compound?", answer: "Simple = P×R×T/100 on principal only; compound earns on interest too." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter principal", text: "Enter principal amount." }, { name: "Set rate & time", text: "Enter rate and years." }, { name: "View", text: "See interest, total and monthly." }]
  },
  {
    slug: "retirement-calculator",
    title: "Retirement Calculator",
    short: "Plan your savings goal",
    description: "Plan your retirement savings. Model monthly contributions, expected returns, and years to project your final corpus and shortfall. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["retirement calculator", "401k calculator", "how much to retire"],
    category: "finance",
    faq: [{ question: "What return to assume?", answer: "Try 5-7% nominal less 2-3% inflation; shows nominal corpus and shortfall vs goal." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter current", text: "Enter age, savings and monthly contribution." }, { name: "Set rate", text: "Enter expected return and goal." }, { name: "View", text: "See projected corpus and shortfall." }]
  },
  {
    slug: "auto-loan-calculator",
    title: "Auto Loan Calculator",
    short: "EMI & total cost",
    description: "Estimate your car loan EMI, total interest, and payoff schedule. Compare down payments, rates, and loan terms. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["auto loan calculator", "car loan emi calculator", "car payment calculator"],
    category: "finance",
    faq: [{ question: "How does down payment change EMI?", answer: "Higher down lowers principal and EMI; trade-in further reduces amount financed." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter price", text: "Enter vehicle price, down and trade-in." }, { name: "Set loan", text: "Enter rate and years." }, { name: "View", text: "See EMI, total interest and schedule." }]
  },
  {
    slug: "rent-vs-buy-calculator",
    title: "Rent vs Buy Calculator",
    short: "Rent or buy?",
    description: "Compare the costs of renting versus buying. Enter rent, property price, down payment, rates, and growth to find your break-even point. 100% private and offline.",
    icon: "AccountBalance",
    keywords: ["rent vs buy calculator", "rent or buy", "buy vs rent home"],
    category: "finance",
    faq: [{ question: "How is break-even calculated?", answer: "Compares total rent with hikes vs down plus EMI minus appreciation over years." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter rent", text: "Enter monthly rent and hike." }, { name: "Enter buy", text: "Enter price, down, rate and growth." }, { name: "Compare", text: "See break-even and verdict." }]
  },
  {
    slug: "freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    short: "Hourly & project rates",
    description: "Determine your freelance hourly, daily, and project rates. Enter your target salary, billable hours, expenses, and margin to set profitable pricing. 100% private and offline.",
    icon: "AttachMoney",
    keywords: ["freelance rate calculator", "hourly rate calculator", "freelance pricing"],
    category: "finance",
    faq: [{ question: "How is hourly calculated?", answer: "Hourly = (salary+expenses)×(1+margin%)/billable hours; daily = hourly×8." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter salary", text: "Enter target salary and expenses." }, { name: "Set hours", text: "Enter billable hours and margin." }, { name: "View", text: "See hourly, daily and project rates." }]
  },
  {
    slug: "home-affordability-calculator",
    title: "Home Affordability Calculator",
    short: "How much house?",
    description: "Find how much house you can afford from income, debts, down payment and rate with the 28/36 DTI rule. Private estimate, offline in your browser.",
    icon: "AccountBalance",
    keywords: ["home affordability calculator", "how much house can i afford", "affordability calculator"],
    category: "finance",
    faq: [{ question: "What is the 28/36 rule?", answer: "Housing costs under 28% of gross monthly income and total debts under 36%; estimate only." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter income", text: "Enter annual income, debts and down payment." }, { name: "Set rate", text: "Enter mortgage rate and term." }, { name: "View", text: "See affordable payment and price." }]
  },
  {
    slug: "refinance-calculator",
    title: "Refinance Calculator",
    short: "Break-even refi",
    description: "Compare your current loan with a refinance offer: monthly savings, total interest and break-even months from closing costs. Private, offline estimate.",
    icon: "AccountBalance",
    keywords: ["refinance calculator", "mortgage refinance calculator", "refi break even"],
    category: "finance",
    faq: [{ question: "What is break-even?", answer: "Closing costs divided by monthly savings; months until refinancing pays off." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter loans", text: "Enter balance, old and new rates, years left." }, { name: "Add costs", text: "Enter closing costs." }, { name: "Compare", text: "See savings and break-even." }]
  },
  {
    slug: "cagr-calculator",
    title: "CAGR Calculator",
    short: "Growth rate + multiple",
    description: "Calculate compound annual growth rate (CAGR) for investments, SIPs and business revenue. Enter start value, end value and years for instant rate offline.",
    icon: "AccountBalance",
    keywords: ["cagr calculator", "compound annual growth rate", "investment growth rate"],
    category: "finance",
    faq: [{ question: "How is CAGR calculated?", answer: "CAGR = (end÷start)^(1÷years)−1; shows rate plus growth multiple and total gain." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult a qualified professional before making finance decisions." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter values", text: "Enter start value, end value and years." }, { name: "View rate", text: "See CAGR %, multiple and gain." }, { name: "Compare", text: "Try scenarios side by side." }]
  },
];
