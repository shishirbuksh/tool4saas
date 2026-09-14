import type { Tool } from "../types";

export const healthTools: Tool[] = [
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    short: "BMR, TDEE & macros",
    description: "Estimate daily calories, BMR and TDEE from age, sex, weight and activity. Get maintenance, deficit and surplu. 100% private and offline.",
    icon: "FitnessCenter",
    keywords: ["calorie calculator", "bmr calculator", "tdee calculator"],
    category: "health",
    faq: [{ question: "How is BMR calculated?", answer: "Mifflin-St Jeor: Men 10*kg+6.25*cm-5*age+5, Women -161. TDEE=BMR×activity factor." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional." }, { question: "Is my data private?", answer: "Yes, BMR and TDEE math runs locally in your browser and stays private." }],
    howTo: [{ name: "Enter stats", text: "Enter age, sex, weight, height and activity." }, { name: "View calories", text: "See BMR, TDEE and calorie targets." }, { name: "Plan", text: "Use deficit/surplus rows to plan intake." }]
  },
  {
    slug: "water-intake-calculator",
    title: "Water Intake Calculator",
    short: "Daily water needs",
    description: "Estimate daily water intake from weight, activity and climate. See liters and glasses per da. 100% private and offline.",
    icon: "FitnessCenter",
    keywords: ["water intake calculator", "daily water needs", "how much water per day"],
    category: "health",
    faq: [{ question: "How is it calculated?", answer: "Base = weightKg×35ml, +500ml if active or hot climate. Glasses = ml÷250." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance. Hydration needs vary; consult a professional." }, { question: "Is my data private?", answer: "Yes, water intake math runs locally in your browser and stays private." }],
    howTo: [{ name: "Enter weight", text: "Enter weight in kg or lb." }, { name: "Set activity", text: "Choose activity and climate." }, { name: "View", text: "See liters and glasses per day." }]
  },
  {
    slug: "ideal-weight-calculator",
    title: "Ideal Weight Calculator",
    short: "Healthy weight range",
    description: "Calculate ideal weight via Devine, Robinson and Miller formulas. Enter height and sex to see healthy range an. 100% private and offline.",
    icon: "FitnessCenter",
    keywords: ["ideal weight calculator", "healthy weight", "devine formula"],
    category: "health",
    faq: [{ question: "Which formula is used?", answer: "Devine: Men 50+2.3*(in-60), Women 45.5+2.3*(in-60). Robinson and Miller shown for comparison." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance. Healthy weight depends on many factors." }, { question: "Is my data private?", answer: "Yes, ideal weight math runs locally in your browser and stays private." }],
    howTo: [{ name: "Enter height", text: "Enter height in cm or in." }, { name: "Choose formula", text: "Pick Devine, Robinson or Miller." }, { name: "View", text: "See ideal weight and healthy range." }]
  },
  {
    slug: "macro-calculator",
    title: "Macro Calculator",
    short: "Protein, carbs & fat",
    description: "Split calories into protein, carbs and fat grams. Choose preset or custom ratios to get macro grams and calories pe. 100% private and offline.",
    icon: "FitnessCenter",
    keywords: ["macro calculator", "protein carb fat", "calorie macros"],
    category: "health",
    faq: [{ question: "How are macros calculated?", answer: "Protein grams = cal×protein%/4, carbs = cal×carb%/4, fat = cal×fat%/9." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "Is my data private?", answer: "Yes, macro split math runs locally in your browser and stays private." }],
    howTo: [{ name: "Enter calories", text: "Enter daily calorie target." }, { name: "Set ratios", text: "Choose preset or custom protein/carb/fat %." }, { name: "View", text: "See grams and calories per macro." }]
  },
  {
    slug: "pregnancy-calculator",
    title: "Pregnancy Calculator",
    short: "Due date & trimesters",
    description: "Estimate due date, conception date and trimesters from last menstrual period. Enter LMP and cycle length to se. 100% private and offline.",
    icon: "Cake",
    keywords: ["pregnancy calculator", "due date calculator", "pregnancy due date"],
    category: "health",
    faq: [{ question: "How is due date calculated?", answer: "Naegele: LMP +280 days + (cycle-28). Conception = LMP+14 days." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance. Consult your healthcare provider." }, { question: "Is my data private?", answer: "Yes, due date math runs locally in your browser and stays private." }],
    howTo: [{ name: "Enter LMP", text: "Pick last menstrual period date." }, { name: "Set cycle", text: "Enter cycle length in days." }, { name: "View", text: "See due date, trimesters and weeks." }]
  },
  {
    slug: "ovulation-calculator",
    title: "Ovulation Calculator",
    short: "Fertile window",
    description: "Track ovulation and fertile window from last period and cycle length. See fertile days, due hints and calenda. 100% private and offline.",
    icon: "DateRange",
    keywords: ["ovulation calculator", "fertile window calculator", "conception calculator"],
    category: "health",
    faq: [{ question: "How is ovulation day estimated?", answer: "Ovulation = LMP + (cycle-14); fertile window is ovulation-5 to ovulation+1." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance. Consult a healthcare professional." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter LMP", text: "Pick last period date." }, { name: "Set cycle", text: "Enter cycle length." }, { name: "View", text: "See ovulation and fertile days." }]
  },
  {
    slug: "sleep-cycle-calculator",
    title: "Sleep Calculator",
    short: "Best bedtime & wake",
    description: "Find best bedtime or wake time with 90-minute sleep cycles. Pick wake-up or bedtime, add fall-asleep time —, private, runs in browser.",
    icon: "Timer",
    keywords: ["sleep calculator", "sleep cycle calculator", "best time to wake up"],
    category: "health",
    faq: [{ question: "Why 90-minute cycles?", answer: "Average sleep cycle is 90 minutes; waking between cycles reduces grogginess." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose mode", text: "Pick wake-up or bedtime mode." }, { name: "Enter time", text: "Set target time." }, { name: "View", text: "See 5-6 cycle options." }]
  },
  {
    slug: "body-fat-calculator",
    title: "Body Fat Calculator",
    short: "US Navy method",
    description: "Estimate body fat % with US Navy tape method. Enter neck, waist, hips and height for lean mass and clas. 100% private and offline.",
    icon: "FitnessCenter",
    keywords: ["body fat calculator", "us navy body fat", "body fat percentage"],
    category: "health",
    faq: [{ question: "What measurements do I need?", answer: "Neck, waist, height and hips for women; uses US Navy formula with log10." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter stats", text: "Enter sex and measurements." }, { name: "View", text: "See body fat % and category." }, { name: "Plan", text: "Use for tracking only." }]
  },
  {
    slug: "period-calculator",
    title: "Period Calculator",
    short: "Next period + fertile",
    description: "Predict your next period, fertile window and ovulation from LMP and cycle length. Calendar of the next 3 cycles; estimate only, private and offline.",
    icon: "DateRange",
    keywords: ["period calculator", "period tracker", "next period predictor"],
    category: "health",
    faq: [{ question: "How is it predicted?", answer: "Next period = LMP + cycle length; ovulation ≈ LMP + (cycle−14)." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter LMP", text: "Pick last period start date." }, { name: "Set cycle", text: "Enter average cycle length." }, { name: "View", text: "See next periods and fertile days." }]
  },
  {
    slug: "one-rep-max-calculator",
    title: "One-Rep Max Calculator",
    short: "Epley + Brzycki",
    description: "Estimate your one-rep max strength from weight lifted and reps using Epley and Brzycki formulas. Get training-zone weights instantly, private offline.",
    icon: "FitnessCenter",
    keywords: ["one rep max calculator", "1rm calculator", "epley brzycki calculator"],
    category: "health",
    faq: [{ question: "Which formulas are used?", answer: "Epley: w×(1+r÷30); Brzycki: w×36÷(37−r); shown side by side." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter lift", text: "Type weight and reps performed." }, { name: "View max", text: "See Epley and Brzycki estimates." }, { name: "Train", text: "Use zone table for sets." }]
  },
];
