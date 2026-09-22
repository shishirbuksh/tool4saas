import type { Tool } from "../types";

export const healthTools: Tool[] = [
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    short: "BMR, TDEE & macros",
    description: "Estimate daily calories, BMR and TDEE from age, sex, weight and activity for maintenance, deficit and surplus targets. All calculations stay private in your browser.",
    icon: "FitnessCenter",
    keywords: ["calorie calculator", "bmr calculator", "tdee calculator"],
    category: "health",
    faq: [{ question: "How is BMR calculated?", answer: "Mifflin-St Jeor: Men 10×kg+6.25×cm−5×age+5, Women −161. Example: 70 kg, 175 cm, 30-year man gives BMR near 1,700 kcal; multiply by 1.55 moderate activity for TDEE near 2,635 kcal. Protein and steps do not change BMR." }, { question: "Is this medical advice for dieting?", answer: "No, general nutrition information only, not medical advice. Deficits, pregnancy, thyroid and medications need clinician guidance. Example: 500 kcal deficit suits many, but teens and illness need supervision. Consult a healthcare professional and see /terms." }, { question: "What example shows maintenance versus deficit?", answer: "Example: 70kg, 175cm, 30-year-old man with moderate activity has about 2600 kcal TDEE; maintenance eats that, deficit subtracts 300-500 kcal, surplus adds 200-300 kcal." }, { question: "How accurate are calorie targets?", answer: "Estimates within about 10-15% for most adults; metabolism, food-tracking errors and activity guesses vary daily. Example: 2,600 kcal TDEE may span 2,300-2,900 real burn. Track weight for 2-3 weeks and adjust intake; see /terms." }],
    howTo: [{ name: "Enter body stats", text: "Enter age 30, sex male, 70kg and 175cm as an example." }, { name: "Pick activity", text: "Choose activity like moderate exercise 3-5 days per week." }, { name: "Review BMR TDEE", text: "View BMR near 1700 kcal and TDEE near 2600 kcal." }, { name: "Choose target", text: "Pick maintenance, minus 500 kcal deficit or plus 250 kcal surplus." }],
    guide: [{ heading: "How BMR and TDEE are calculated", body: "BMR uses Mifflin-St Jeor: men 10×kg+6.25×cm−5×age+5 and women 10×kg+6.25×cm−5×age−161, then TDEE multiplies BMR by activity from 1.2 sedentary to 1.9 extra-active. For example, a 28-year-old woman at 65 kg and 168 cm has BMR near 1,399 kcal, and moderate activity at 1.55 gives TDEE near 2,168 kcal. Maintenance eats TDEE, deficit subtracts 300-500 kcal, and surplus adds 200-300 kcal." }, { heading: "Inputs, accuracy and limitations", body: "Enter age, sex, weight, height, and activity level; the model estimates average burn and ignores muscle mass, thyroid, medications, pregnancy, and tracking errors. Accuracy spans about 10-15% for most adults, so daily burn varies with steps, sleep, and food labels. Track weight for two to three weeks and adjust intake rather than chasing single-day numbers." }, { heading: "Next steps and common questions", body: "Pick maintenance, deficit, or surplus targets, set protein near 1.6-2.2 g per kg when dieting or training, and spread activity across the week. If progress stalls, cut 100-200 kcal or add steps before larger changes. See /methodology for equation sources; this is general information only, so consult a healthcare professional for personal advice." }]
  },
  {
    slug: "water-intake-calculator",
    title: "Water Intake Calculator",
    short: "Daily water needs",
    description: "Estimate daily water intake from weight, activity level and climate with liters and glasses per day shown clearly. Your data never leaves your device.",
    icon: "FitnessCenter",
    keywords: ["water intake calculator", "daily water needs", "how much water per day"],
    category: "health",
    faq: [{ question: "How is it calculated?", answer: "Base = weightKg×35ml, +500ml if active or hot climate. Glasses = ml÷250, e.g. 70 kg gives 2,450 ml." }, { question: "Is this hydration guidance medical advice?", answer: "No, general hydration information only; kidneys, heart and pregnancy change needs. Example: 70 kg needs ~2.45L, but illness needs clinician input. Consult a professional and see /terms." }, { question: "What is an example daily target?", answer: "Example: 70kg lightly active in temperate climate needs about 2.45L or 10 glasses; add 500ml if very active or hot, and spread intake through the day." }],
    howTo: [{ name: "Enter weight", text: "Enter 70kg or 154lb as an example weight." }, { name: "Set lifestyle", text: "Select activity level and hot climate if you sweat a lot." }, { name: "View liters glasses", text: "See about 2.9L or 12 glasses for the active-hot case." }, { name: "Adjust day", text: "Add 500ml per workout and spread intake morning to evening." }]
  },
  {
    slug: "ideal-weight-calculator",
    title: "Ideal Weight Calculator",
    short: "Healthy weight range",
    description: "Calculate ideal weight with Devine, Robinson and Miller formulas from height and sex to see healthy range and category. Everything runs offline privately on your device.",
    icon: "FitnessCenter",
    keywords: ["ideal weight calculator", "healthy weight", "devine formula"],
    category: "health",
    faq: [{ question: "Which formula is used?", answer: "Devine: Men 50+2.3*(in-60), Women 45.5+2.3*(in-60). Robinson and Miller shown for comparison, e.g. 5ft 9in male." }, { question: "Is ideal weight a medical prescription?", answer: "No, reference ranges only, not a goal; muscle, age and pregnancy shift healthy weight. Example: Devine 70 kg for 175 cm is a starting point, not a target. Consult a clinician and see /terms." }, { question: "How should I interpret the range?", answer: "Use Devine as a starting point and compare Robinson and Miller; the healthy range is an estimate, not a goal, and muscular builds may sit above it." }],
    howTo: [{ name: "Enter height", text: "Enter 175cm or 5ft 9in as an example height." }, { name: "Choose sex", text: "Select male or female because formulas differ by sex." }, { name: "Compare formulas", text: "Compare Devine 70kg, Robinson 68kg and Miller 66kg outputs." }, { name: "Use range", text: "Use the 62-78kg healthy band as context, not a strict goal." }]
  },
  {
    slug: "macro-calculator",
    title: "Macro Calculator",
    short: "Protein, carbs & fat",
    description: "Split daily calories into protein, carbs and fat grams using preset or custom ratios to get calories per macro. No uploads occur since math runs locally.",
    icon: "FitnessCenter",
    keywords: ["macro calculator", "protein carb fat", "calorie macros"],
    category: "health",
    faq: [{ question: "How are macros calculated?", answer: "Protein grams = cal×protein%÷4, carbs = cal×carb%÷4, fat = cal×fat%÷9, e.g. 2,000 kcal at 30/40/30." }, { question: "Is macro splitting medical advice?", answer: "No, general nutrition math only; diabetes, kidneys and training need dietitian input. Example: 150 g protein suits many lifters, but kidney disease restricts protein. Consult a professional and see /terms." }, { question: "What ratio example works for 2000 kcal?", answer: "Example: 30% protein, 40% carbs, 30% fat at 2000 kcal gives 150g protein, 200g carbs and 67g fat; adjust protein up when dieting or training hard." }],
    howTo: [{ name: "Enter calories", text: "Enter 2000 kcal daily target as an example." }, { name: "Set ratios", text: "Try 30 percent protein, 40 percent carbs and 30 percent fat." }, { name: "View grams", text: "See 150g protein, 200g carbs and 67g fat with calories." }, { name: "Tweak plan", text: "Raise protein to 35 percent when cutting or training hard." }]
  },
  {
    slug: "pregnancy-calculator",
    title: "Pregnancy Calculator",
    short: "Due date & trimesters",
    description: "Estimate due date, conception date and trimesters from last menstrual period and cycle length to see dates. Inputs stay on your device with local math.",
    icon: "Cake",
    keywords: ["pregnancy calculator", "due date calculator", "pregnancy due date"],
    category: "health",
    faq: [{ question: "How is due date calculated?", answer: "Naegele: LMP +280 days + (cycle-28). Conception = LMP+14 days." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance. Consult your healthcare provider." }, { question: "What are the limits of the estimate?", answer: "Naegele assumes a regular 28-day cycle and average ovulation; irregular cycles, IVF dates and early ultrasounds can shift the due date by days or weeks." }],
    howTo: [{ name: "Enter LMP", text: "Pick LMP Jan 1 2026 as an example start date." }, { name: "Set cycle", text: "Enter 28-day cycle, or 32 days if longer than average." }, { name: "View dates", text: "See due date Oct 8 2026, conception Jan 15 and weeks." }, { name: "Track trimesters", text: "Use trimester cutoffs to plan visits and screening windows." }]
  },
  {
    slug: "ovulation-calculator",
    title: "Ovulation Calculator",
    short: "Fertile window",
    description: "Track ovulation and fertile window from last period and cycle length with fertile days shown on a calendar. Processing happens locally with full privacy.",
    icon: "DateRange",
    keywords: ["ovulation calculator", "fertile window calculator", "conception calculator"],
    category: "health",
    faq: [{ question: "How is ovulation day estimated?", answer: "Ovulation = LMP + (cycle-14); fertile window is ovulation-5 to ovulation+1." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance. Consult a healthcare professional." }, { question: "Can I use this for birth control?", answer: "No. The fertile window is an estimate from average cycle length; ovulation varies month to month, so do not use it to prevent pregnancy." }],
    howTo: [{ name: "Enter LMP", text: "Enter LMP Sep 1 2026 as an example date." }, { name: "Set cycle", text: "Enter 28-day cycle, or 32 days for longer cycles." }, { name: "View window", text: "See ovulation near Sep 15 and fertile Sep 10-16." }, { name: "Plan", text: "Use peak 2 days before ovulation for timing context only." }]
  },
  {
    slug: "sleep-cycle-calculator",
    title: "Sleep Calculator",
    short: "Best bedtime & wake",
    description: "Find the best bedtime or wake time using 90-minute sleep cycles with fall-asleep buffer and 5 cycle options. All logic runs in-browser without uploads.",
    icon: "Timer",
    keywords: ["sleep calculator", "sleep cycle calculator", "best time to wake up"],
    category: "health",
    faq: [{ question: "Why 90-minute cycles?", answer: "Average sleep cycle is 90 minutes; waking between cycles reduces grogginess." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "How much buffer for falling asleep?", answer: "Add 15 minutes fall-asleep time to each 90-minute cycle; example: to wake at 6:30am, aim for 11:15pm or 9:45pm bedtimes for 5-6 full cycles." }],
    howTo: [{ name: "Choose mode", text: "Pick wake-up mode for 6:30am or bedtime mode for 11pm." }, { name: "Enter time", text: "Type 6:30am wake target as an example." }, { name: "Add buffer", text: "Set 15 minutes fall-asleep buffer for realism." }, { name: "Pick cycle", text: "Choose 11:15pm for 5 cycles or 9:45pm for 6 cycles." }]
  },
  {
    slug: "body-fat-calculator",
    title: "Body Fat Calculator",
    short: "US Navy method",
    description: "Estimate body fat percentage with the US Navy tape method from neck, waist, hips and height for classification. Results compute locally and stay confidential.",
    icon: "FitnessCenter",
    keywords: ["body fat calculator", "us navy body fat", "body fat percentage"],
    category: "health",
    faq: [{ question: "What measurements do I need?", answer: "Neck, waist, height and hips for women; uses US Navy formula with log10." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "How accurate is the tape method?", answer: "US Navy estimates are within about 3-4% for most adults but underestimate very lean or muscular people; measure relaxed and track trends, not single readings." }],
    howTo: [{ name: "Enter sex height", text: "Select male, 178cm as an example profile." }, { name: "Add measures", text: "Enter neck 40cm, waist 86cm and hips if female." }, { name: "View percent", text: "See about 16 percent body fat with lean mass." }, { name: "Track class", text: "Use athletic, fitness or average class to follow trends." }]
  },
  {
    slug: "period-calculator",
    title: "Period Calculator",
    short: "Next period + fertile",
    description: "Predict next period, fertile window and ovulation from LMP and cycle length with a 3-cycle calendar view. Your entries remain private on this device.",
    icon: "DateRange",
    keywords: ["period calculator", "period tracker", "next period predictor"],
    category: "health",
    faq: [{ question: "How is it predicted?", answer: "Next period = LMP + cycle length; ovulation ≈ LMP + (cycle−14)." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "What if my cycles are irregular?", answer: "The 3-cycle calendar assumes your average length stays steady; if cycles vary by more than 7 days, predictions may shift and ovulation hints become less reliable." }],
    howTo: [{ name: "Enter LMP", text: "Pick LMP Sep 1 2026 as an example." }, { name: "Set cycle", text: "Enter 28-day average and 5-day period length." }, { name: "View calendar", text: "See next period Sep 29 plus Oct and Nov previews." }, { name: "Check fertile", text: "Note ovulation near Sep 15 and fertile Sep 10-16." }]
  },
  {
    slug: "one-rep-max-calculator",
    title: "One-Rep Max Calculator",
    short: "Epley + Brzycki",
    description: "Estimate one-rep max strength from weight lifted and reps with Epley and Brzycki formulas plus training zones. No account needed and nothing is uploaded.",
    icon: "FitnessCenter",
    keywords: ["one rep max calculator", "1rm calculator", "epley brzycki calculator"],
    category: "health",
    faq: [{ question: "Which formulas are used?", answer: "Epley: w×(1+r÷30); Brzycki: w×36÷(37−r); shown side by side." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional for personal guidance." }, { question: "What rep range is most reliable?", answer: "Estimates are best from 1-10 reps; example 100kg for 5 reps predicts about 112-117kg max, while sets above 12 reps overstate strength and raise injury risk." }],
    howTo: [{ name: "Enter lift", text: "Type 100kg lifted for 5 reps as an example." }, { name: "View max", text: "Compare Epley 117kg and Brzycki 112kg estimates." }, { name: "Use zones", text: "Use 65-85 percent zones for 5x5 or hypertrophy sets." }, { name: "Stay safe", text: "Cap attempts at 1-10 reps and warm up before maxes." }]
  },
];
