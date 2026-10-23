import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Search “BMI for women” and you will find plenty of charts that imply women need a different formula. They usually do not. The adult calculation is the same for both sexes: weight in kilograms divided by height in metres squared, with the same 18.5, 25 and 30 reference points. What differs is the context around the number — body composition, where fat tends to sit, pregnancy, menopause and the fact that a single ratio cannot see any of it.</p>
<p>This guide keeps the arithmetic visible, then spends most of its time on interpretation. If you just want the number, the <a href="/bmi-calculator">BMI calculator</a> will produce it in either metric or imperial units. If you want to know what to do with it, read on.</p>

<h2 id="the-adult-bands">The adult bands apply to women too</h2>
<p>For non-pregnant adults, the standard reference bands are:</p>
<ul>
<li><strong>Under 18.5:</strong> underweight.</li>
<li><strong>18.5 to 24.9:</strong> healthy weight range.</li>
<li><strong>25.0 to 29.9:</strong> overweight.</li>
<li><strong>30.0 and above:</strong> obesity.</li>
</ul>
<p>At a height of 1.65 m, those bands translate into the weights in the table below. The arithmetic is weight = BMI × height², so each boundary is 18.5, 25 or 30 multiplied by 1.65 × 1.65 = 2.7225 m².</p>
<table>
<thead><tr><th>BMI</th><th>Category</th><th>Weight at 1.65 m</th></tr></thead>
<tbody>
<tr><td>Below 18.5</td><td>Underweight</td><td>Below 50.4 kg</td></tr>
<tr><td>18.5 to 24.9</td><td>Healthy range</td><td>50.4 to 67.8 kg</td></tr>
<tr><td>25.0 to 29.9</td><td>Overweight</td><td>68.1 to 81.4 kg</td></tr>
<tr><td>30.0 and above</td><td>Obesity</td><td>81.7 kg and above</td></tr>
</tbody>
</table>
<p>The gaps between 67.8 and 68.1, or between 81.4 and 81.7, are rounding artifacts at the category edges; the underlying BMI values are continuous. A woman who weighs 67.9 kg at this height has a BMI of 24.94, which rounds to 24.9 and stays inside the healthy band. At 68.2 kg the BMI is 25.05, which rounds to 25.1 and crosses into overweight. A 300 g difference does not represent a meaningful change in health, but it can change the label.</p>
<p><strong>Worked examples at 1.65 m:</strong> 65 kg ÷ 2.7225 = 23.9, inside the healthy band. 72 kg ÷ 2.7225 = 26.4, inside the overweight band. 55 kg ÷ 2.7225 = 20.2, also inside the healthy band. The middle example is only 7 kg above the first, yet it moves from the healthy band into overweight because the distance from 23.9 to 26.4 is 2.5 BMI points, and one point at this height is 2.72 kg.</p>
<p>Those labels are population screening categories, not grades of personal health. The word “normal” in some charts is shorthand for the 18.5–24.9 band, not a statement that everyone inside it is healthy or that everyone outside it is ill.</p>

<h2 id="what-bmi-misses">What BMI misses in women</h2>
<p>BMI cannot separate lean mass from fat mass, and it cannot see where fat is stored. Both gaps matter. Two women can share a BMI of 23.9 at 1.65 m while carrying very different amounts of abdominal fat. If one has a waist of 74 cm and the other 94 cm, their waist-to-height ratios are 74 ÷ 165 = 0.45 and 94 ÷ 165 = 0.57. The first sits below the 0.5 heuristic often used as a flag; the second sits above it. Same height, same weight, same BMI, different risk profile.</p>
<p>Fat distribution is not cosmetic. Visceral fat around the organs is more strongly associated with metabolic risk than fat stored on the hips and thighs. BMI treats both the same way. Age changes the pattern too: after menopause, fat often shifts toward the abdomen while muscle mass declines, so a stable BMI can hide a changing composition.</p>
<p>Muscle is the other blind spot. A woman who lifts weights or plays a power sport may weigh more than a sedentary woman of the same height while carrying less fat. At 1.65 m, 70 kg gives a BMI of 25.7 — the overweight band — even if the extra weight is largely lean tissue. The label is arithmetically correct and clinically incomplete.</p>
<p>Waist circumference adds information that BMI lacks, but its cutoffs are not universal. The World Health Organization has used 80 cm and 88 cm as increased and substantially increased risk thresholds for women, while some guidelines for South Asian populations use lower values. Treat any waist cutoff as a population reference, not a personal diagnosis.</p>

<h2 id="pregnancy-postpartum">Pregnancy and the postpartum period</h2>
<p>BMI is not a valid tool during pregnancy. The formula was built for non-pregnant adults, and the weight gained to support a fetus, placenta, blood volume and amniotic fluid is not excess adiposity. Clinicians typically discuss gestational weight gain using pre-pregnancy BMI as one input, alongside individual health history. That conversation is not a license to restrict food intake during pregnancy, and it is not something a web calculator can conduct.</p>
<p>The postpartum period is also a poor time for a strict BMI reading. Fluid shifts, sleep disruption and healing change weight from week to week. Some clinicians wait until a routine postpartum visit before interpreting weight trends at all. If you are breastfeeding, energy needs differ from the non-pregnant estimate, and deliberate restriction can affect milk supply. Ask a clinician or dietitian who knows your history rather than aiming at a chart.</p>

<h2 id="age-ethnicity">Age, ethnicity and the limits of a single cutoff</h2>
<p>Risk at a given BMI is not identical across populations. Some public-health guidance uses lower action points for people of South Asian or East Asian descent, because metabolic risk can appear at a lower BMI than in European reference populations. The exact thresholds vary by guideline. The practical point is that a BMI of 24 is not automatically reassuring for everyone, and a BMI of 26 is not automatically alarming for everyone.</p>
<p>Older women present another version of the problem. Muscle mass tends to fall with age, so an older adult can have a BMI of 22 while carrying a high proportion of body fat and low muscle. That pattern, sometimes called sarcopenic obesity when fat is high and muscle is low, is easy to miss if the only number on the page is BMI. Strength, gait speed, waist circumference and a clinical assessment tell a fuller story.</p>
<p>Sex differences are real but easy to overstate. On average, women carry a higher percentage of body fat than men at the same BMI, and fat distribution differs. Those averages do not define an individual. The formula stays the same; the interpretation should stay humble.</p>

<h2 id="better-metrics">Better metrics to use alongside BMI</h2>
<p>No single measurement replaces a clinical assessment, but a few are more informative than BMI alone.</p>
<ul>
<li><strong>Waist-to-height ratio:</strong> waist ÷ height, both in the same unit. A ratio below 0.5 is a common screening heuristic; 82 ÷ 165 = 0.50 and 92 ÷ 165 = 0.56. It is cheap and tracks abdominal fat better than BMI.</li>
<li><strong>Waist circumference:</strong> useful on its own, but compare it with population-appropriate thresholds rather than a single global number.</li>
<li><strong>Body-fat percentage:</strong> calipers, bioelectrical impedance and DEXA estimate it with different levels of error. A trend over months is more useful than one reading.</li>
<li><strong>Strength and activity:</strong> how much you can lift, how quickly you walk, how often you train. These capture lean mass and fitness that BMI ignores.</li>
<li><strong>Clinical markers:</strong> blood pressure, fasting glucose, lipids and family history, interpreted by a clinician.</li>
</ul>
<p>A measurement is useful if it changes what you do. If a waist measurement prompts a conversation about sleep, activity or a family history of diabetes, it has done more than a BMI label that only produces guilt. If the number is stable and your habits are steady, a category boundary is not an emergency.</p>

<h2 id="calculator">Putting the number in context</h2>
<p>Use the <a href="/bmi-calculator">BMI calculator</a> to get the arithmetic right, then add a waist measurement and a note about your training history. Compare the result with the <a href="/blog/bmi-calculator-guide/healthy-weight-range">healthy weight range chart</a> if you want to see the band as a range of kilograms rather than a single score. The <a href="/blog/bmi-calculator-guide/bmi-for-men">BMI for men guide</a> explains why the same cutoff produces different conversations for men, and the <a href="/blog/bmi-calculator-guide">full BMI guide</a> connects weight, calories and hydration.</p>
<div class="cta-box"><strong>Run your own numbers:</strong> open the <a href="/bmi-calculator">free BMI calculator</a>, enter your height and weight, and read the band beside the result. Then measure your waist at the midpoint between your lowest rib and hip bone, and divide by your height. Two numbers, two minutes, a much more useful conversation.</div>
<p><em>This article is general information, not medical advice. BMI is a screening tool, not a diagnosis. Pregnancy, menopause, athletic training and medical conditions all change how the number should be read; consult a qualified clinician about your own situation.</em></p>
`;

export const bmiWomen: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "bmi-for-women",
  kind: "cluster",
  title: "BMI for Women: Ranges, Limitations & Better Metrics",
  description:
    "BMI ranges for women explained with worked examples, and why pregnancy, menopause, muscle and fat distribution change the number.",
  keywords: ["bmi for women", "healthy bmi for women", "bmi chart women", "bmi after menopause", "bmi during pregnancy", "waist to height ratio women"],
  toolSlugs: ["bmi-calculator"],
  relatedSlugs: ["bmi-for-men", "healthy-weight-range", "bmi-for-athletes"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "the-adult-bands", text: "The adult bands apply to women", level: 2 },
    { id: "what-bmi-misses", text: "What BMI misses in women", level: 2 },
    { id: "pregnancy-postpartum", text: "Pregnancy and postpartum", level: 2 },
    { id: "age-ethnicity", text: "Age, ethnicity and cutoffs", level: 2 },
    { id: "better-metrics", text: "Better metrics to use alongside BMI", level: 2 },
    { id: "calculator", text: "Putting the number in context", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a healthy BMI for a woman?", answer: "The standard reference band for non-pregnant adult women is 18.5 to 24.9, with under 18.5 underweight, 25.0 to 29.9 overweight and 30.0 or above obesity. At 1.65 m, that healthy band covers roughly 50.4 to 67.8 kg. These are population screening ranges, not individual targets, and they do not account for muscle or fat distribution." },
    { question: "Is BMI calculated differently for women than for men?", answer: "No. The formula and the adult cutoffs are the same. Average body composition differs, and women tend to carry more fat at the same BMI, but that is a population pattern rather than a separate equation. Clinical assessment may add waist circumference or other risk factors, but those are additions to BMI, not a replacement formula." },
    { question: "Does menopause change how BMI should be read?", answer: "It can. Menopause is often accompanied by a shift of fat toward the abdomen and a loss of muscle mass, so weight and BMI may stay stable while body composition changes. A waist measurement and a strength or activity review can reveal what the ratio hides. Discuss persistent changes with a clinician rather than relying on BMI alone." },
    { question: "Can I use BMI while pregnant?", answer: "No. BMI is not a valid measure during pregnancy because the formula was designed for non-pregnant adults and cannot distinguish pregnancy-related weight from fat. Prenatal weight guidance uses pre-pregnancy BMI as one input in a clinical conversation. Do not use a BMI chart to restrict food intake during pregnancy; speak with your obstetric clinician." },
    { question: "What waist size is considered high for a woman?", answer: "The World Health Organization has used 80 cm as an increased-risk and 88 cm as a substantially increased-risk waist threshold for women, though some guidelines use lower values for South Asian populations. Measure at the midpoint between the lowest rib and the top of the hip bone. Treat the number as a screening prompt, not a diagnosis." },
    { question: "Is waist-to-height better than BMI for women?", answer: "It adds different information rather than replacing BMI. Waist-to-height ratio catches abdominal fat that BMI cannot see; a ratio of 0.5 or higher is a common flag. Two women at the same BMI can have ratios of 0.45 and 0.57. Use both, along with body-fat trend and clinical markers, for a fuller picture." },
  ],
};
