export type Guide = {
  title: string;
  desc: string;
  label: string;
  date: string;
  href: string;
};

export type Faq = { q: string; a: string };

export const HOME_GUIDES: Guide[] = [
  {
    title: "ATS-Friendly Resume: Beat Applicant Tracking Software (2026)",
    desc: "How parsers read a resume, which keywords matter, and a five-minute pre-application check.",
    label: "Resume Guide",
    date: "2026-09-23",
    href: "/blog/resume-builder-guide/ats-resume-guide",
  },
  {
    title: "UPI QR Code for Payments: Setup, Counter Tips & Safety (India)",
    desc: "Fixed versus open amounts, printing advice, and the fraud checks that matter.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india",
  },
  {
    title: "GST Invoice Format India: Mandatory Fields, HSN & Sample (2026)",
    desc: "CGST/SGST versus IGST, GSTIN, HSN codes, and a freelancer invoice sample.",
    label: "Invoice Guide",
    date: "2026-09-18",
    href: "/blog/invoice-generator-guide/gst-invoice-format-india",
  },
];

export const FAQS: Faq[] = [
  {
    q: "What is Tool4SaaS?",
    a: "Tool4SaaS is a free set of web utilities that run in your browser. You can count words, make codes, format text, and plan money with ease. Most jobs run on your device, so they are fast and private.",
  },
  {
    q: "Is Tool4SaaS free?",
    a: "Yes. Every tool is free to use with no cost and no paywall. You can open any tool, maker, or generator as often as you like each day.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. You do not need an account or signup to use any tool. Just open the page and start your job right away. There are no forms or passwords.",
  },
  {
    q: "Is my data safe?",
    a: "Most tools run local-first, so your text and files stay on your device. A few tools need the internet for live data, such as currency rates, YouTube thumbnails, SSL checks, and voice input. See our privacy policy for details.",
  },
  {
    q: "Which popular tools should I try first?",
    a: "Top picks are invoice generator for client bills, QR code generator for menus and links, JSON formatter for code checks, word counter for essays, PDF merge for files, and mortgage calculator for home loans.",
  },
  {
    q: "How are tools tested?",
    a: "We build and test every tool in-house. We check outputs against known values, for example a $100,000 loan at 5 percent over 30 years equals $536.82 monthly. See our methodology page for the full process.",
  },
  {
    q: "How do I use tools offline?",
    a: "Open the tool once while online and keep the tab open. Most tools then work without internet because they run locally. Your files stay on your device.",
  },
  {
    q: "How do I request a new tool?",
    a: "Send your idea through our contact page. Tell us the job to be done and what result you want to see. We review top requests each month and build free private tools first.",
  },
];
