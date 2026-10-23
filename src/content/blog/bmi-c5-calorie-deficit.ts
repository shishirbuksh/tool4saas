import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A calorie deficit for weight loss is not a menu or a macro split. It is the gap between the energy you take in and the energy your body uses. The practical question is how wide that gap should be at the start: too narrow and the scale barely moves, too wide and hunger, fatigue and muscle loss make the plan collapse by week three. The arithmetic below uses two adults to show how the estimate is built, then explains how to adjust it from a three-week weight trend instead of a single morning weigh-in.</p>
<p>This is general information, not medical advice; consult a qualified clinician before changing your diet, especially if you take medication, are pregnant, have a thyroid or kidney condition, or have a history of disordered eating.</p>

<h2 id="what-a-deficit-measures">What a calorie deficit actually measures</h2>
<p>Total daily energy expenditure, usually shortened to TDEE, is the sum of resting metabolism, the energy used to digest food, and every movement from a gym session to fidgeting. Resting metabolism does most of the work; structured exercise is usually a smaller slice than people expect. A deficit simply means intake sits below that total.</p>
<p>The gap is a rate, not a personality test. A 300 kcal daily gap adds up to 2,100 kcal over a week whether it comes from smaller portions, more walking, or a mix of both. Food choice still matters for protein, fiber, vitamins and how full you feel, but it does not change the direction of the energy balance.</p>
<p>Bodies are not spreadsheets. When intake falls, appetite often rises, spontaneous movement drops, and training quality can suffer. That is why a deficit is best treated as an experiment with a feedback loop, not a number carved into stone.</p>

<h2 id="estimate-maintenance">Estimate maintenance before cutting</h2>
<p>The calorie and macro calculator uses the Mifflin-St Jeor equation for basal metabolic rate, then multiplies by an activity factor. The equations are:</p>
<ul>
<li><strong>Men:</strong> BMR = 10 × weight in kg + 6.25 × height in cm − 5 × age + 5</li>
<li><strong>Women:</strong> BMR = 10 × weight in kg + 6.25 × height in cm − 5 × age − 161</li>
</ul>
<p>Activity multipliers run from 1.2 for sedentary days to about 1.9 for very high training loads. A desk worker who lifts three times a week is not the same as a warehouse worker who also lifts.</p>
<p><strong>Worked example 1: 30-year-old man, 70 kg, 175 cm, moderately active.</strong></p>
<p>BMR = 10 × 70 + 6.25 × 175 − 5 × 30 + 5 = 700 + 1,093.75 − 150 + 5 = 1,648.75, which rounds to 1,649 kcal. With a 1.55 multiplier, maintenance is 1,649 × 1.55 = 2,555.95, or about 2,556 kcal per day. If his real maintenance is 150 kcal higher or lower, the estimate is still useful as a starting band rather than a verdict.</p>
<p>The equation does not know body composition, thyroid status, medication effects, or how much he actually moves outside the gym. Treat the result as a center point and let the scale trend correct it.</p>

<h2 id="picking-the-gap">Picking a first deficit</h2>
<p>Two conventions show up in nutrition practice: a fixed daily gap of roughly 250 to 500 kcal, or a percentage of maintenance around 10 to 20 percent. Neither is a prescription. On a 2,556 kcal maintenance estimate, 10 percent is 255.6 kcal, 15 percent is 383.4 kcal, and 20 percent is 511.2 kcal. A 400 kcal gap lands at an illustrative intake of 2,156 kcal.</p>
<p>The percentage view matters when bodies differ in size. A 500 kcal gap is about 20 percent of the man's maintenance but more than a quarter of the smaller woman's maintenance in the next example. The same absolute number is a very different physiological request.</p>
<p>Aggressive deficits have costs that do not show up on day one: hunger, low training energy, poor sleep, nutrient gaps, and a higher risk of losing lean mass. Very low intakes should be supervised rather than copied from a forum. A moderate gap you can hold for twelve weeks beats an extreme one you abandon in ten days.</p>

<h2 id="second-example">Second worked example: a smaller body</h2>
<p><strong>32-year-old woman, 65 kg, 165 cm, lightly active.</strong></p>
<p>BMR = 10 × 65 + 6.25 × 165 − 5 × 32 − 161 = 650 + 1,031.25 − 160 − 161 = 1,360.25, or about 1,360 kcal. With a 1.375 multiplier, maintenance is 1,360 × 1.375 = 1,870 kcal.</p>
<p>A 250 kcal gap gives 1,870 − 250 = 1,620 kcal; a 300 kcal gap gives 1,570 kcal. The weekly gaps are 1,750 and 2,100 kcal. Those numbers are arithmetic outputs, not recommendations. A clinician would also ask whether the intake leaves room for iron, calcium, protein and medication timing, and whether the pace fits her sleep, training and stress load.</p>
<p>The table collects both examples so the proportional difference is visible.</p>
<table>
<thead><tr><th>Profile</th><th>Estimated maintenance</th><th>Daily gap</th><th>Arithmetic</th><th>Illustrative intake</th><th>Weekly gap</th></tr></thead>
<tbody>
<tr><td>Man, 30, 70 kg</td><td>2,556 kcal</td><td>250 kcal</td><td>2,556 − 250</td><td>2,306 kcal</td><td>1,750 kcal</td></tr>
<tr><td>Man, 30, 70 kg</td><td>2,556 kcal</td><td>500 kcal</td><td>2,556 − 500</td><td>2,056 kcal</td><td>3,500 kcal</td></tr>
<tr><td>Woman, 32, 65 kg</td><td>1,870 kcal</td><td>250 kcal</td><td>1,870 − 250</td><td>1,620 kcal</td><td>1,750 kcal</td></tr>
<tr><td>Woman, 32, 65 kg</td><td>1,870 kcal</td><td>400 kcal</td><td>1,870 − 400</td><td>1,470 kcal</td><td>2,800 kcal</td></tr>
</tbody>
</table>

<h2 id="weekly-math">What the weekly math can and cannot tell you</h2>
<p>With a 300 kcal daily gap, the weekly total is 300 × 7 = 2,100 kcal. A rough convention many weight-management programs use is about 7,700 kcal per kilogram of body mass, which would put the theoretical change near 2,100 ÷ 7,700 = 0.27 kg per week. A 500 kcal gap gives 3,500 ÷ 7,700 = 0.45 kg. Those figures assume the maintenance estimate is exact and adherence is perfect. Neither assumption holds for long.</p>
<p>Scale weight moves with water, glycogen, sodium, carbohydrate intake, menstrual cycle phase, travel, creatine, and the inflammation that follows a hard session. A salty restaurant meal can add a kilogram of water overnight without adding fat. The reverse is also true: a dehydrated morning can make a good week look flat.</p>
<p>Use a seven-day average rather than any single reading, taken under similar conditions: same time of day, after using the bathroom, before breakfast, with minimal clothing. Compare weekly averages across two to three weeks before deciding the deficit is wrong.</p>

<h2 id="adjusting">Adjusting after three weeks</h2>
<p>If the seven-day average has not moved for two to three weeks and adherence was genuinely consistent, change one variable by a small amount. Reduce intake by 100 to 200 kcal, or add 1,000 to 2,000 daily steps, but not both at once. One change gives you a cleaner read on what worked.</p>
<p>If weight is dropping quickly, or if fatigue, dizziness, hair shedding, missed periods, or worsening sleep appear, the deficit is too aggressive for your context. Add food and seek clinical advice. These symptoms are not proof of a specific condition, but they are reasons to stop guessing.</p>
<p>Protein and resistance training help preserve lean mass during a deficit. General guidance for adults often lands around 1.6 to 2.2 grams of protein per kilogram of body weight, with adjustments for kidney health and medical conditions. That range is a planning aid, not a prescription.</p>
<p>Sleep and alcohol belong in the same conversation. Short sleep changes appetite and training recovery, and alcohol adds calories while reducing the chances of a controlled next day. Neither has to be perfect, but both explain why two people with the same arithmetic get different results.</p>

<h2 id="use-the-calculator">Use the calculator as a starting estimate</h2>
<p>Enter age, sex, height, weight and activity level in the calorie and macro calculator, then read the BMR and TDEE lines. Subtract a gap you can defend, compare the result with what you actually eat for a week, and let the three-week trend decide the next adjustment.</p>
<p>For the weight-for-height side of the picture, run the same stats through the <a href="/bmi-calculator">BMI calculator</a> and read the <a href="/blog/bmi-calculator-guide">BMI calculator guide</a>. If you want to know what a healthy weight range looks like before choosing a gap, the <a href="/blog/bmi-calculator-guide/healthy-weight-range">healthy weight range guide</a> explains why the range is wider than a single number.</p>
<blockquote class="tip">This is general information, not medical advice; consult a qualified clinician for a plan that accounts for your health history, medications and goals.</blockquote>
<div class="cta-box"><strong>Run your own numbers:</strong> open the <a href="/calorie-calculator">free calorie calculator</a>, note your maintenance estimate, and test a moderate gap for three weeks. Adjust from the trend, not from a single weigh-in.</div>
`;

export const bmiCalorieDeficit: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "calorie-deficit-for-weight-loss",
  kind: "cluster",
  title: "Calorie Deficit for Weight Loss: Safe Starting Point",
  description:
    "How to estimate a calorie deficit for weight loss: Mifflin-St Jeor math, two worked examples, adjustment rules and safety limits. No fixed targets.",
  keywords: ["calorie deficit for weight loss", "safe calorie deficit", "how to calculate calorie deficit", "calorie deficit calculator", "weight loss calorie gap"],
  toolSlugs: ["calorie-calculator", "bmi-calculator"],
  relatedSlugs: ["healthy-weight-range", "bmi-for-women", "bmi-for-men"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-a-deficit-measures", text: "What a calorie deficit measures", level: 2 },
    { id: "estimate-maintenance", text: "Estimate maintenance first", level: 2 },
    { id: "picking-the-gap", text: "Picking a first deficit", level: 2 },
    { id: "second-example", text: "Second worked example", level: 2 },
    { id: "weekly-math", text: "What the weekly math shows", level: 2 },
    { id: "adjusting", text: "Adjusting after three weeks", level: 2 },
    { id: "use-the-calculator", text: "Using the calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a safe calorie deficit for weight loss?", answer: "There is no universal safe number. Many adults begin with a gap of roughly 250 to 500 kcal per day, or 10 to 20 percent below estimated maintenance, then adjust from a two- to three-week trend. Smaller bodies, pregnancy, medication, diabetes, thyroid disease and a history of disordered eating need clinician-guided planning. Dizziness, missed periods or constant fatigue are reasons to stop and seek advice." },
    { question: "Why am I not losing weight on a calorie deficit?", answer: "Check the trend before cutting further. Water retention from sodium, carbohydrates or training can hide two weeks of fat change, and weekends or unmeasured oils can erase a small weekday gap. Spontaneous movement also falls when intake drops. Compare seven-day averages across three weeks, review portions and drinks, then change one variable by 100 to 200 kcal or add daily steps." },
    { question: "Is 1,200 calories a day safe?", answer: "It is a common internet figure, not a medical standard. For many adults, 1,200 kcal is a very low intake that makes protein, iron, calcium and other nutrients hard to meet, and it should not be adopted without clinical guidance. A clinician may use a similar level for a specific person, but the decision depends on body size, health conditions, medications and supervision." },
    { question: "How do I calculate maintenance calories?", answer: "Use Mifflin-St Jeor: for a 30-year-old man at 70 kg and 175 cm, 10 × 70 + 6.25 × 175 − 5 × 30 + 5 = 1,649 kcal. Multiply by an activity factor such as 1.55 for moderate activity to get 2,556 kcal. Treat that as an estimate, then compare it with three weeks of weight and intake data." },
    { question: "Does exercise or eating less create a better deficit?", answer: "Both create the same kind of energy gap, but they behave differently. Exercise adds cardiovascular and strength benefits while raising appetite and recovery needs. Eating less is easier to measure but can make nutrient targets harder. Most plans combine a moderate food gap with regular movement, and neither approach guarantees a specific rate of loss." },
    { question: "How long before the scale shows a deficit?", answer: "Water and glycogen can shift within days, while fat change accumulates slowly. A single week is too noisy to judge. Use seven-day averages over two to three weeks, measured under similar conditions, before changing the plan. If nothing moves despite consistent intake, adjust one variable rather than making a large cut." },
  ],
};
