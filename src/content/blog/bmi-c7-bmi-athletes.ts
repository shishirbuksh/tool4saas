import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>BMI for athletes is a case of a useful population tool being asked an individual question. A 95 kg rugby forward at 180 cm scores 29.3, which the standard adult bands call overweight. The score does not know whether that 95 kg is muscle, fat, bone or water, and for a collision-sport athlete it often tells the wrong story.</p>
<p>None of this makes BMI worthless. It makes it a first screen that needs context. This guide shows the arithmetic, explains why muscular bodies break the category, and lays out the measures that answer the question BMI was never designed to answer. It is general information, not medical advice; consult a qualified clinician before acting on a body-composition number.</p>

<h2 id="formula-does-one-job">The formula does exactly one job</h2>
<p>BMI divides weight in kilograms by height in meters squared. Nothing else goes in. For the 95 kg athlete at 180 cm, height squared is 1.8 × 1.8 = 3.24, so BMI = 95 ÷ 3.24 = 29.32, usually written 29.3. Drop the same athlete to 80 kg and the result is 80 ÷ 3.24 = 24.69, or 24.7. Add five kilograms of lean mass and 85 ÷ 3.24 = 26.23.</p>
<p>Notice what those numbers do not say. The five-kilogram change moves the index by about 1.5 points, but the formula cannot distinguish a hard-won gain in muscle from a week of holiday eating. Height matters just as much: 70 kg at 170 cm is 70 ÷ 2.89 = 24.2, while the same 70 kg at 180 cm is 70 ÷ 3.24 = 21.6. Same mass, different frame, a 2.6-point gap.</p>
<p>That is the entire mechanism. BMI is a ratio, not a measurement of fat, fitness or health.</p>

<h2 id="why-muscle-breaks-it">Why muscle changes the reading</h2>
<p>Muscle tissue is denser than fat tissue, so a liter of muscle weighs more than a liter of fat. An athlete who adds muscle without changing height gains weight and raises BMI while body fat may stay the same or fall. A lean sprinter, rower or rugby forward can land in the overweight band with a waist that looks unremarkable. The category is doing what it was built to do, describing weight for height, and the athlete is asking it to describe composition.</p>
<p>The reverse error is just as important. A sedentary adult can sit at BMI 23 with a high body-fat percentage and little muscle, which is sometimes called normal-weight obesity. The number looks reassuring while the health risk is not. Using BMI alone can miss both the muscular athlete and the unmuscular non-athlete, in opposite directions.</p>
<p>Hydration and fuel status add noise. Glycogen holds water, creatine draws water into muscle, and a salty meal or a hard session can shift scale weight by a kilogram or more. A single weigh-in after a match is a poor basis for any conclusion about body composition.</p>

<h2 id="what-bmi-cannot-see">What BMI cannot see</h2>
<p>It cannot see where fat sits. Visceral fat around the organs carries different risk from fat under the skin at the hips, and two people with the same BMI can have very different waistlines. It cannot see bone density, joint size or frame. It cannot see blood pressure, lipids, blood glucose, sleep, training load or eating behavior.</p>
<p>BMI bands are also conventions rather than natural laws. The World Health Organization's adult cutoffs of 18.5, 25 and 30 were built for population screening. Some guidelines use lower thresholds for people of South Asian, Chinese, Japanese and other Asian ancestries because metabolic risk rises at lower BMI values. An athlete with a different ancestry and a different body composition is several steps away from the population the bands were drawn from.</p>
<p>For sport, the mismatch is obvious. A distance runner and a shot putter can share a BMI and share almost nothing else about health or performance.</p>

<h2 id="better-measures">Better measures for athletes</h2>
<p><strong>Waist-to-height ratio.</strong> Divide waist circumference by height in the same units. A ratio under 0.5 is a common general screening target, and it is easy to track. Measure at the midpoint between the lowest rib and the top of the hip bone, after a normal exhale, with the tape snug but not compressing the skin.</p>
<p><strong>Waist circumference over time.</strong> Absolute waist thresholds vary by sex and ancestry, so a personal trend is often more useful than a single cutoff. A waist that grows during an off-season while strength climbs tells a different story from a waist that grows while performance falls.</p>
<p><strong>Body-fat estimate.</strong> DEXA, bioelectrical impedance and calipers all estimate rather than measure. Each has error, and each is best used with the same method, the same conditions and a trend across months. A DEXA scan before and after a training block is more informative than comparing a caliper reading to a scale reading.</p>
<p><strong>Performance and health markers.</strong> Relative strength, power-to-weight, aerobic capacity, recovery, sleep, menstrual function, bone-stress history and routine blood work fill in what no body measurement can. Persistent fatigue, recurrent injury or disrupted menstruation in a female athlete can signal relative energy deficiency in sport, which needs clinical and coaching input rather than a stricter diet.</p>

<h2 id="waist-examples">Waist-to-height worked examples</h2>
<p>A 180 cm athlete with an 82 cm waist: 82 ÷ 180 = 0.456, or about 0.46. At that height, a 0.5 ratio corresponds to a 90 cm waist because 180 × 0.5 = 90. A 175 cm athlete with a 92 cm waist: 92 ÷ 175 = 0.526, or about 0.53, which sits above the general 0.5 screening line. At 175 cm, the line falls at 87.5 cm.</p>
<p>Two more checks: a 190 cm rower with an 88 cm waist gives 88 ÷ 190 = 0.463, and a 170 cm distance runner with a 66 cm waist gives 66 ÷ 170 = 0.388. The ratios separate bodies that BMI might lump together, and they take about a minute to collect.</p>
<table>
<thead><tr><th>Illustrative profile</th><th>Height and weight</th><th>BMI</th><th>Waist-to-height</th><th>How to read it</th></tr></thead>
<tbody>
<tr><td>Collision-sport forward</td><td>180 cm, 95 kg</td><td>29.3</td><td>82 ÷ 180 = 0.46</td><td>BMI band says overweight; waist ratio sits below 0.5</td></tr>
<tr><td>Rower</td><td>190 cm, 100 kg</td><td>27.7</td><td>88 ÷ 190 = 0.46</td><td>High mass, low waist ratio, sport favors size and leverage</td></tr>
<tr><td>Distance runner</td><td>170 cm, 58 kg</td><td>20.1</td><td>66 ÷ 170 = 0.39</td><td>Low BMI and low ratio; performance and health still need context</td></tr>
<tr><td>Strength athlete</td><td>175 cm, 92 kg</td><td>30.0</td><td>92 ÷ 175 = 0.53</td><td>BMI and waist ratio both elevated; worth a clinical conversation</td></tr>
</tbody>
</table>
<p>These are hypothetical profiles, not real athletes. The point is the pattern: BMI and waist-to-height can agree, disagree, or tell different parts of the same story. Neither is a diagnosis.</p>

<h2 id="when-bmi-helps">When BMI still earns a place</h2>
<p>BMI is cheap, fast, reproducible and familiar. Team medical staff can use it as a baseline at the start of a season, then watch the trend across months. A rapid rise or fall in weight for height is a prompt to ask why, even when the absolute number looks ordinary. In a clinic without a body-composition scanner, BMI, waist and blood pressure together make a reasonable first pass.</p>
<p>It is also useful for research and population health, where individual muscle mass is not available and the question is about groups rather than people. The mistake is treating a group statistic as a personal verdict.</p>
<p>A practical sequence looks like this: calculate BMI, note the band, add waist-to-height, then look at performance, recovery and health markers. If the waist ratio is at or above 0.5, if weight is changing quickly without a planned reason, or if fatigue and injury keep recurring, take the whole picture to a clinician or sports dietitian. Do not chase a BMI number with a weight cut.</p>

<h2 id="use-the-calculator">Put the number in context</h2>
<p>Use the BMI calculator for the division and the waist-to-height arithmetic, then read the <a href="/blog/bmi-calculator-guide">BMI calculator guide</a> for the adult bands and their limits. If you are comparing yourself with a non-athlete, the <a href="/blog/bmi-calculator-guide/healthy-weight-range">healthy weight range guide</a> explains why the range is broad. For the energy side of training and recovery, the <a href="/calorie-calculator">calorie calculator</a> estimates maintenance and protein needs.</p>
<blockquote class="tip">This is general information, not medical advice; consult a qualified clinician before changing training, body composition or weight for a sport.</blockquote>
<div class="cta-box"><strong>Check both numbers:</strong> open the <a href="/bmi-calculator">free BMI and body-fat calculator</a>, enter your height and weight, then add your waist measurement. A single index is a start; the pair is a better conversation.</div>
`;

export const bmiAthletes: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "bmi-for-athletes",
  kind: "cluster",
  title: "Why BMI Misreads Athletes (and What to Use Instead)",
  description:
    "Why BMI flags muscular athletes as overweight, what it misses, and better measures: waist-to-height, body fat and performance. Includes worked examples.",
  keywords: ["bmi for athletes", "bmi athlete overweight", "muscle and bmi", "waist to height ratio athletes", "body composition vs bmi"],
  toolSlugs: ["bmi-calculator", "calorie-calculator"],
  relatedSlugs: ["healthy-weight-range", "how-bmi-is-calculated", "bmi-for-men"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "formula-does-one-job", text: "The formula does one job", level: 2 },
    { id: "why-muscle-breaks-it", text: "Why muscle changes the reading", level: 2 },
    { id: "what-bmi-cannot-see", text: "What BMI cannot see", level: 2 },
    { id: "better-measures", text: "Better measures for athletes", level: 2 },
    { id: "waist-examples", text: "Waist-to-height worked examples", level: 2 },
    { id: "when-bmi-helps", text: "When BMI still earns a place", level: 2 },
    { id: "use-the-calculator", text: "Putting the number in context", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can you be overweight by BMI and still be healthy?", answer: "Yes, BMI can label a muscular athlete overweight without excess fat. A 95 kg athlete at 180 cm scores 29.3, yet a waist-to-height ratio of 0.46 suggests less central fat than the band implies. That does not prove health either. Blood pressure, lipids, fitness, sleep and waist trend still matter, and a clinician should interpret the whole picture." },
    { question: "What is a healthy BMI for athletes?", answer: "There is no separate athlete BMI target. Sport demands differ: a rower and a distance runner can share a BMI and need different bodies. Coaches and clinicians usually care about body composition, waist ratio, performance and health markers rather than a single index. Chasing a BMI number can push athletes toward unnecessary weight cuts." },
    { question: "Is BMI useless for athletes?", answer: "No. It is fast, reproducible and useful as a baseline or a trend. A rapid change in weight for height is worth investigating even when the absolute score looks normal. It becomes misleading when a single reading is treated as a diagnosis of body fat or health, especially in muscular or very lean athletes." },
    { question: "What is waist-to-height ratio and what number should I aim for?", answer: "Divide waist circumference by height in the same units. A 180 cm athlete with an 82 cm waist has 82 divided by 180, or 0.46. A ratio below 0.5 is a common general screening target, but it is not a diagnosis and thresholds vary by population. Track the trend and use the same measuring technique each time." },
    { question: "Are body-fat scales accurate enough for athletes?", answer: "Consumer bioelectrical impedance scales are sensitive to hydration, recent food and training, so the absolute percentage can be off. They are more useful for direction over weeks when measured under the same conditions. DEXA and calipers also estimate rather than measure. Pick one method and compare like with like." },
    { question: "Should an athlete lose weight to lower BMI?", answer: "Not on the basis of BMI alone. Weight cuts should be planned with a clinician, dietitian and coach, with attention to fueling, menstrual function, bone health and performance. Rapid loss or chronic underfueling can backfire through fatigue, injury and relative energy deficiency in sport." },
  ],
};
