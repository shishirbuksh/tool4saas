import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>BMI is one of the most widely used numbers in health and one of the least self-explanatory. It arrives as a single value — 22.9, 27.4, 31.1 — attached to a label such as “healthy” or “overweight.” The label sounds final. The arithmetic behind it is simple, and the interpretation is not.</p>
<p>This guide covers the whole chain: how the ratio is calculated, what the adult bands mean, how to turn them into a weight range, where the number misleads for women, men, athletes and children, and how calorie and water needs fit around it. It does not prescribe a diet or a goal weight. It gives you the reference points and the caveats so a conversation with a clinician starts from something accurate.</p>

<h2 id="what-bmi-measures">What BMI measures, and what it does not</h2>
<p>Body mass index is weight divided by height squared. In metric units, kilograms divided by metres squared; in imperial units, 703 times pounds divided by inches squared. The output is a ratio, not a percentage and not a diagnosis.</p>
<p>The index dates to the 19th century, when Adolphe Quetelet used a weight-to-height ratio to describe population averages. The modern name and cutoffs arrived much later. That origin explains both its strength and its weakness: it was built to compare groups, not to diagnose an individual. A population curve can be a useful map; it is not a medical record.</p>
<p>A BMI of 22.9 at 1.75 m corresponds to 70 kg. The same height at 90 kg gives 29.4. The difference of 20 kg moves the number by 6.5 points, which is why BMI responds quickly to weight change and slowly to almost everything else.</p>
<p>What it does not measure is body composition. It cannot tell lean mass from fat mass, and it cannot see whether fat is stored around the organs or on the hips. At a population level, higher BMI values are associated with higher average body fat and higher risk of certain conditions. At the level of one person, the association is weaker. A muscular athlete and a sedentary adult can share the same score.</p>
<p>That is not a reason to discard the number. It is a reason to use it as a first question rather than a final answer. BMI is cheap, quick and consistent, which makes it useful for screening and for tracking trends. It becomes more useful when paired with a waist measurement, an activity history and routine clinical checks.</p>

<h2 id="how-bmi-is-calculated">How BMI is calculated</h2>
<p>The metric calculation takes three steps. Convert height to metres, square it, then divide weight by the square. For 70 kg at 175 cm: 175 ÷ 100 = 1.75 m; 1.75² = 3.0625; 70 ÷ 3.0625 = 22.857, which rounds to 22.9.</p>
<p>The imperial calculation is BMI = 703 × pounds ÷ inches². For 180 lb at 70 in: 70² = 4,900; 703 × 180 = 126,540; 126,540 ÷ 4,900 = 25.8. Converted to metric, 180 lb is 81.65 kg and 70 in is 1.778 m, and 81.65 ÷ 3.161 = 25.8. The two systems agree when the conversions are done correctly.</p>
<p>The 703 is a unit conversion, not a health threshold. One pound is 0.453592 kg and one inch is 0.0254 m, so the factor is 0.453592 ÷ (0.0254 × 0.0254) = 703.07. Rounding to 703 changes a result by less than 0.1%. Using 700 instead would bias the answer low by about 0.4%, which matters only near a category edge.</p>
<p>Most mismatches between calculators come from inputs rather than formulas. A height measured with shoes on can be 2 cm taller, which lowers BMI by about 0.5 points at 70 kg. A weight taken after a meal can be 1 to 2 kg higher than a morning reading. Rounding also matters at boundaries: 76.4 kg at 1.75 m is 24.947, which displays as 24.9 but sits a hair below 25.0. The <a href="/blog/bmi-calculator-guide/how-bmi-is-calculated">full formula guide</a> walks through metric and imperial examples step by step.</p>

<h2 id="reading-the-bands">Reading the adult BMI bands</h2>
<p>The standard reference categories for non-pregnant adults are under 18.5 for underweight, 18.5 to 24.9 for the healthy range, 25.0 to 29.9 for overweight and 30.0 or above for obesity. At 1.75 m, those cutoffs correspond to the weights in the table below, using weight = BMI × 3.0625.</p>
<table>
<thead><tr><th>BMI</th><th>Category</th><th>Weight at 1.75 m</th><th>What it is useful for</th></tr></thead>
<tbody>
<tr><td>Below 18.5</td><td>Underweight</td><td>Below 56.7 kg</td><td>Flagging possible undernutrition or unexplained loss</td></tr>
<tr><td>18.5 to 24.9</td><td>Healthy range</td><td>56.7 to 76.3 kg</td><td>A population reference band, not a personal target</td></tr>
<tr><td>25.0 to 29.9</td><td>Overweight</td><td>76.6 to 91.6 kg</td><td>Prompting a waist and risk-factor review</td></tr>
<tr><td>30.0 and above</td><td>Obesity</td><td>91.9 kg and above</td><td>Prompting clinical assessment, not a label</td></tr>
</tbody>
</table>
<p>The small gaps between 76.3 and 76.6, or 91.6 and 91.9, are rounding artifacts. The underlying scale is continuous. At this height, 0.1 BMI point is 0.31 kg, so a large glass of water can move the displayed number by a tenth without changing anything meaningful.</p>
<p>Obesity is sometimes split into class 1 (30.0–34.9), class 2 (35.0–39.9) and class 3 (40.0 and above). Those subdivisions are used in clinical and public-health settings; they are not a measure of personal worth and they do not describe fitness, diet quality or mental health. A BMI of 31 and a BMI of 39 both sit in the obesity range, but the clinical conversation around them may differ substantially.</p>
<p>Treat every band as a screening prompt. A result inside the healthy range is not proof of metabolic health. A result outside it is not proof of disease. Blood pressure, fasting glucose, lipids and family history can be abnormal at any BMI, and they can be normal at a BMI of 30.</p>

<h2 id="healthy-weight-range">Turning the bands into a healthy weight range</h2>
<p>A range is more honest than a single target. Multiply 18.5 and 24.9 by your height squared to get the interval. At 1.63 m, 1.63² = 2.6569, so the range is 18.5 × 2.6569 = 49.2 kg to 24.9 × 2.6569 = 66.2 kg. At 1.80 m, it is 59.9 to 80.7 kg.</p>
<p>The interval is wide on purpose. At 1.75 m it spans 19.6 kg, and at 1.90 m it spans 23.1 kg. Two people at the same height can sit at opposite ends and both be inside the reference band. There is no health bonus for the midpoint, and no failure at 24.5 rather than 21.5.</p>
<p>Use the range as a corridor, not a bullseye. If you are above it, the useful questions are about trend, waist and habits rather than the exact distance to the upper bound. If you are below it, unexplained weight loss or low muscle mass deserves a clinical conversation. The <a href="/blog/bmi-calculator-guide/healthy-weight-range">healthy weight range chart</a> lists the interval for common heights in kilograms and pounds.</p>

<h2 id="women-and-men">BMI for women and men</h2>
<p>The formula and the adult cutoffs are the same for both sexes. Average body composition is not. Women tend to carry a higher percentage of body fat at the same BMI, and fat distribution differs on average. Men are more likely to store fat abdominally, which is why waist circumference often adds more information for men at the same score.</p>
<p>Take two examples. A woman at 1.65 m and 65 kg has a BMI of 23.9. If her waist is 94 cm, her waist-to-height ratio is 94 ÷ 165 = 0.57. A man at 1.80 m and 95 kg has a BMI of 29.3. If his waist is 86 cm, his ratio is 86 ÷ 180 = 0.48. The first BMI looks better; the first waist ratio looks worse. Neither number alone tells the whole story.</p>
<p>Pregnancy is a separate case. BMI is not valid during pregnancy because the formula was designed for non-pregnant adults and cannot distinguish pregnancy-related weight from fat. Postpartum readings are also noisy while fluid shifts and healing continue. Use pre-pregnancy BMI only as one input in a clinical conversation, never as a reason to restrict food during pregnancy.</p>
<p>The <a href="/blog/bmi-calculator-guide/bmi-for-women">BMI for women guide</a> covers menopause, pregnancy and waist thresholds in more detail. The <a href="/blog/bmi-calculator-guide/bmi-for-men">BMI for men guide</a> focuses on muscle, abdominal fat and age-related composition changes.</p>

<h2 id="athletes-and-children">Athletes and children need different readings</h2>
<p>A lean, muscular athlete can score in the overweight or obesity range without excess fat. At 1.80 m, 95 kg gives 29.3 whether that weight is muscle or fat. A strength athlete with an 86 cm waist may have a waist-to-height ratio of 0.48 and excellent metabolic markers. A sedentary adult with the same BMI and a 104 cm waist may have a very different risk profile.</p>
<p>This does not mean a high BMI in an athlete is always harmless. Muscle mass can coexist with visceral fat, and retired athletes can lose muscle while keeping weight. The ratio is ambiguous in both directions. Waist circumference, body-fat trend and performance measures are more informative for this group. The <a href="/blog/bmi-calculator-guide/bmi-for-athletes">BMI for athletes guide</a> works through the muscle confound.</p>
<p>Children and teenagers are a different measurement problem entirely. Adult bands do not apply because body composition changes rapidly with growth. A 10-year-old at 1.40 m and 38 kg has a BMI of 19.4, but that value has to be placed on an age-and-sex percentile chart. Under the CDC reference, below the 5th percentile is underweight, the 5th to below the 85th is healthy, the 85th to below the 95th is overweight, and the 95th or above is obesity. The <a href="/blog/bmi-calculator-guide/bmi-for-children-teens">BMI for children and teens guide</a> explains why the adult number cannot be reused.</p>

<h2 id="calories">BMI does not set your calorie needs</h2>
<p>Two people can share a BMI and have very different energy requirements. Calorie needs depend on age, sex, weight, height, activity, muscle mass, health conditions and medication. BMI captures only weight and height, so it cannot produce a personal calorie target.</p>
<p>A common estimate starts with the Mifflin-St Jeor equation for basal metabolic rate. For a 30-year-old man at 70 kg and 175 cm: 10 × 70 = 700; 6.25 × 175 = 1,093.75; 5 × 30 = 150; so 700 + 1,093.75 − 150 + 5 = 1,648.75, or about 1,649 kcal at rest. Multiply by 1.55 for moderate activity and the total daily estimate is about 2,556 kcal.</p>
<p>For a 30-year-old woman at 65 kg and 165 cm: 10 × 65 = 650; 6.25 × 165 = 1,031.25; 5 × 30 = 150; so 650 + 1,031.25 − 150 − 161 = 1,370.25, or about 1,370 kcal at rest. With the same 1.55 activity factor, the total is about 2,124 kcal.</p>
<p>These are estimates, not prescriptions. Individual variation of 10–15% is common, and thyroid function, medication, sleep and label accuracy all add noise. A 500 kcal daily deficit is sometimes used as an illustration: 500 × 7 = 3,500 kcal per week, and at roughly 7,700 kcal per kilogram of fat, that implies about 0.45 kg per week. Real loss is not linear, includes water and lean tissue, and slows as body mass falls. The <a href="/blog/bmi-calculator-guide/calorie-deficit-for-weight-loss">calorie deficit guide</a> explains the arithmetic and the limits, and the <a href="/calorie-calculator">calorie calculator</a> shows BMR, total daily expenditure and macro splits.</p>

<h2 id="water">Water needs scale with weight, activity and climate</h2>
<p>Hydration estimates often start with 35 mL per kilogram of body weight. At 70 kg: 70 × 35 = 2,450 mL, or 2.45 L. Add 500 mL for regular activity or a hot climate and the estimate becomes 2,950 mL, about 12 glasses at 250 mL each. At 55 kg, the base is 55 × 35 = 1,925 mL, or about 8 glasses.</p>
<p>Those numbers are starting points, not rules. Food contributes water, especially fruit, vegetables, soup and yogurt. Coffee and tea count toward fluid intake for most people. Sweat rate varies with fitness, clothing and humidity. Pregnancy, breastfeeding, kidney disease, heart failure and diuretic medication all change the picture, sometimes in opposite directions.</p>
<p>Thirst and urine colour are practical guides for everyday hydration; pale yellow is a reasonable target, while persistent dark urine or little output deserves attention. Drinking far beyond thirst is not a virtue and can be dangerous during endurance events, where excessive water without sodium can dilute blood sodium. The <a href="/blog/bmi-calculator-guide/daily-water-intake">daily water intake guide</a> covers climate, exercise and electrolyte exceptions, and the <a href="/water-intake-calculator">water intake calculator</a> turns your weight and activity into litres and glasses.</p>

<h2 id="limitations">Limitations, better metrics and next steps</h2>
<p>BMI has known blind spots: age, sex, ethnicity, pregnancy, muscle mass, bone density, fluid status and fat distribution. Some guidelines use lower action points for people of South Asian or East Asian descent because metabolic risk can appear at a lower BMI. Amputations and edema change the relationship between weight and body size. None of these are edge cases in a real clinic; they are ordinary reasons to interpret the number carefully.</p>
<p>The table below compares BMI with measurements that add information. None of them is a diagnosis on its own.</p>
<table>
<thead><tr><th>Measure</th><th>What it adds</th><th>Example</th><th>Main limitation</th></tr></thead>
<tbody>
<tr><td><strong>BMI</strong></td><td>Weight-for-height screening</td><td>70 kg at 1.75 m = 22.9</td><td>Cannot separate muscle from fat</td></tr>
<tr><td><strong>Waist circumference</strong></td><td>Abdominal fat</td><td>94 cm</td><td>Cutoffs vary by sex and population</td></tr>
<tr><td><strong>Waist-to-height ratio</strong></td><td>Abdominal fat relative to frame</td><td>94 ÷ 175 = 0.54</td><td>Screening heuristic, not a diagnosis</td></tr>
<tr><td><strong>Body-fat estimate</strong></td><td>Proportion of mass that is fat</td><td>Method-dependent</td><td>Calipers, impedance and DEXA have different error</td></tr>
<tr><td><strong>BMI-for-age</strong></td><td>Growth screening under 18</td><td>38 kg at 1.40 m = 19.4</td><td>Needs age-and-sex percentile charts</td></tr>
</tbody>
</table>
<p>A sensible next step is to use the <a href="/bmi-calculator">BMI calculator</a> for the ratio, add a waist measurement, and look at the trend over several weeks rather than a single day. If the numbers disagree, or if you have symptoms, a family history of metabolic disease, are pregnant, are under 18 or are managing a condition that affects weight or fluid balance, take the conversation to a qualified clinician.</p>
<div class="cta-box"><strong>Start with your own numbers:</strong> open the <a href="/bmi-calculator">free BMI calculator</a> for the index and category, then use the <a href="/calorie-calculator">calorie calculator</a> for an energy estimate and the <a href="/water-intake-calculator">water intake calculator</a> for a fluid starting point. Each tool shows its formula and keeps the arithmetic visible.</div>
<p><em>This article is general information, not medical advice. BMI is a screening tool, not a diagnosis, and no BMI range guarantees health. Do not use this guide to prescribe calories, restrict food or replace care from a qualified clinician, especially during pregnancy, adolescence or while managing a medical condition.</em></p>
`;

export const bmiPillar: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "bmi-calculator-guide",
  kind: "pillar",
  title: "BMI Calculator Guide: Healthy Weight, Calories & Water Needs",
  description:
    "BMI explained end to end: formula, adult bands, weight ranges, sex differences, athletes, children, calories and water needs, with clear limits.",
  keywords: ["bmi calculator guide", "healthy bmi range", "bmi formula", "healthy weight for height", "bmi for women", "bmi for men", "calorie deficit", "daily water intake"],
  toolSlugs: ["bmi-calculator", "calorie-calculator", "water-intake-calculator"],
  relatedSlugs: ["how-bmi-is-calculated", "bmi-for-women", "bmi-for-men", "healthy-weight-range", "calorie-deficit-for-weight-loss", "daily-water-intake", "bmi-for-athletes", "bmi-for-children-teens"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-bmi-measures", text: "What BMI measures", level: 2 },
    { id: "how-bmi-is-calculated", text: "How BMI is calculated", level: 2 },
    { id: "reading-the-bands", text: "Reading the adult BMI bands", level: 2 },
    { id: "healthy-weight-range", text: "Turning bands into a weight range", level: 2 },
    { id: "women-and-men", text: "BMI for women and men", level: 2 },
    { id: "athletes-and-children", text: "Athletes and children", level: 2 },
    { id: "calories", text: "BMI and calorie needs", level: 2 },
    { id: "water", text: "BMI and water needs", level: 2 },
    { id: "limitations", text: "Limitations and next steps", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is BMI and what does it measure?", answer: "BMI is weight divided by height squared, using kilograms and metres or 703 times pounds divided by inches squared. It estimates weight-for-height at a population level and sorts adults into underweight, healthy, overweight and obesity bands. It does not measure body fat, muscle mass or fat distribution, so it is a screening input rather than a diagnosis." },
    { question: "What is a healthy BMI for an adult?", answer: "The common reference band is 18.5 to 24.9 for non-pregnant adults, with under 18.5 underweight, 25.0 to 29.9 overweight and 30.0 or above obesity. At 1.75 m, that band is roughly 56.7 to 76.3 kg. These are population ranges, not personal targets, and they do not guarantee or rule out health." },
    { question: "Why can a muscular person have a high BMI?", answer: "Muscle is denser than fat, so a lean athlete can weigh as much as a less lean person of the same height. At 1.80 m, 95 kg gives a BMI of 29.3 regardless of body composition. A waist measurement helps: 86 cm gives a waist-to-height ratio of 0.48, while 104 cm gives 0.58. The BMI is arithmetically correct but incomplete." },
    { question: "Does BMI differ for men and women?", answer: "The formula and adult cutoffs are identical. Average body composition and fat distribution differ, so the same score can carry different context. Women tend to carry more body fat at the same BMI, and men are more likely to store fat abdominally. Waist circumference and clinical markers help interpret the number for either sex." },
    { question: "Can I use BMI for children and teenagers?", answer: "Not with adult bands. Children and teenagers are assessed with BMI-for-age and sex percentile charts because body composition changes during growth. Under the CDC reference, below the 5th percentile is underweight, the 5th to below the 85th is healthy, the 85th to below the 95th is overweight, and the 95th or above is obesity. Use a paediatric clinician." },
    { question: "How many calories should I eat based on my BMI?", answer: "BMI cannot set a calorie target. Needs depend on age, sex, weight, height, activity, muscle mass, health conditions and medication. A 30-year-old man at 70 kg and 175 cm has an estimated resting need near 1,649 kcal and a moderate-activity total near 2,556 kcal, but that is an estimate for illustration, not a prescription. Discuss personal targets with a clinician or dietitian." },
    { question: "How much water should I drink each day?", answer: "A common starting estimate is 35 mL per kilogram, so 70 kg gives about 2.45 L, or 2.95 L with an activity or heat adjustment. Food, coffee and tea also contribute. Needs rise with sweat losses and fall with some medical conditions. Thirst and pale-yellow urine are practical everyday guides; persistent dark urine or reduced output deserves medical advice." },
  ],
};
