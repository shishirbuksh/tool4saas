import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“What is a healthy weight for my height?” sounds like a question with one answer. In practice, the answer is a range — often a fairly wide one — because the standard BMI bands accept a span of weights at every height. At 1.75 m, the 18.5 to 24.9 band covers roughly 56.7 to 76.3 kg, a spread of almost 20 kg. At 1.90 m, it stretches from about 66.8 to 89.9 kg.</p>
<p>That width is the point. A healthy weight range is a reference interval, not a target weight. This guide shows how the interval is calculated, gives a chart for common heights, and explains why two people with the same height can sit at opposite ends of it and both be fine.</p>

<h2 id="what-the-range-means">What the healthy weight range is built from</h2>
<p>The range comes directly from the adult BMI bands. Take the lower bound of 18.5 and the upper bound of 24.9, then multiply each by your height in metres squared. The formula is weight = BMI × height².</p>
<p>For 1.75 m: 1.75² = 3.0625. The lower end is 18.5 × 3.0625 = 56.66 kg, which rounds to 56.7 kg. The upper end is 24.9 × 3.0625 = 76.26 kg, which rounds to 76.3 kg. So the chart says 56.7 to 76.3 kg for that height.</p>
<p>For 1.63 m: 1.63² = 2.6569. The lower end is 18.5 × 2.6569 = 49.15 kg, or 49.2 kg. The upper end is 24.9 × 2.6569 = 66.16 kg, or 66.2 kg. The range is 49.2 to 66.2 kg.</p>
<p>Notice that the width of the range grows with height. At 1.55 m it spans about 15.4 kg (44.4 to 59.8 kg); at 1.90 m it spans about 23.1 kg (66.8 to 89.9 kg). A taller frame has more room within the same BMI interval because each BMI point represents more kilograms.</p>

<h2 id="the-chart">Healthy weight range by height</h2>
<p>The chart below uses the 18.5 to 24.9 adult reference band. Weights are rounded to one decimal place; pounds are converted at 2.20462 lb per kilogram and rounded to one decimal. Heights are shown to the nearest inch for orientation only.</p>
<table>
<thead><tr><th>Height</th><th>Approx. feet</th><th>Lower kg (BMI 18.5)</th><th>Upper kg (BMI 24.9)</th><th>Range in lb</th></tr></thead>
<tbody>
<tr><td>1.50 m</td><td>4 ft 11 in</td><td>41.6</td><td>56.0</td><td>91.7 to 123.5</td></tr>
<tr><td>1.55 m</td><td>5 ft 1 in</td><td>44.4</td><td>59.8</td><td>97.9 to 131.8</td></tr>
<tr><td>1.60 m</td><td>5 ft 3 in</td><td>47.4</td><td>63.7</td><td>104.5 to 140.4</td></tr>
<tr><td>1.65 m</td><td>5 ft 5 in</td><td>50.4</td><td>67.8</td><td>111.1 to 149.5</td></tr>
<tr><td>1.70 m</td><td>5 ft 7 in</td><td>53.5</td><td>72.0</td><td>117.9 to 158.7</td></tr>
<tr><td>1.75 m</td><td>5 ft 9 in</td><td>56.7</td><td>76.3</td><td>125.0 to 168.2</td></tr>
<tr><td>1.80 m</td><td>5 ft 11 in</td><td>59.9</td><td>80.7</td><td>132.1 to 177.9</td></tr>
<tr><td>1.85 m</td><td>6 ft 1 in</td><td>63.3</td><td>85.2</td><td>139.6 to 187.8</td></tr>
<tr><td>1.90 m</td><td>6 ft 3 in</td><td>66.8</td><td>89.9</td><td>147.3 to 198.2</td></tr>
</tbody>
</table>
<p>The feet-and-inches column is approximate because a single centimetre does not map cleanly onto inches. Use the metric column if your height was measured in centimetres; the difference is small but can matter at a category edge.</p>

<h2 id="worked-examples">Two worked examples, including the reverse check</h2>
<p><strong>Example 1: 1.70 m.</strong> Square the height: 1.70 × 1.70 = 2.89 m². Lower bound: 18.5 × 2.89 = 53.465, which rounds to 53.5 kg. Upper bound: 24.9 × 2.89 = 71.961, which rounds to 72.0 kg. The healthy weight range is 53.5 to 72.0 kg, or about 117.9 to 158.7 lb.</p>
<p>Check the upper bound by going forward again: 72.0 ÷ 2.89 = 24.91, which rounds to 24.9. Check the lower bound: 53.5 ÷ 2.89 = 18.51, which rounds to 18.5. If either division lands outside 18.5–24.9, the multiplication or the rounding went wrong.</p>
<p><strong>Example 2: 1.85 m.</strong> 1.85² = 3.4225 m². Lower bound: 18.5 × 3.4225 = 63.316, or 63.3 kg. Upper bound: 24.9 × 3.4225 = 85.220, or 85.2 kg. The range is 63.3 to 85.2 kg. The reverse check gives 63.3 ÷ 3.4225 = 18.50 and 85.2 ÷ 3.4225 = 24.89.</p>
<p>One BMI point at 1.85 m is 3.42 kg. That is why a 3 kg change can move the number by nearly a full point, while at 1.55 m the same 3 kg change moves it by about 1.25 points. The shorter the frame, the more each kilogram matters to the ratio.</p>
<p><strong>An imperial check:</strong> the same 1.75 m range is 56.7 × 2.20462 = 125.0 lb at the bottom and 76.3 × 2.20462 = 168.2 lb at the top. If you measured 5 ft 9 in, that is 69 in, and the metric height is 175.26 cm rather than exactly 175 cm. The difference shifts the lower bound by only a few hundred grams, but it explains why a pound-based chart can differ from a kilogram-based one by a few tenths of a pound.</p>

<h2 id="what-it-cannot-tell">What the range cannot tell you</h2>
<p>The chart assumes an average frame and an average body composition. It has no idea whether your weight is muscle, fat, bone or fluid. A 1.75 m man at 80 kg has a BMI of 26.1 and sits above the chart, but if his waist is 84 cm and he trains regularly, the label may say little about his health. A 1.75 m woman at 70 kg has a BMI of 22.9 and sits inside the chart, but a 96 cm waist would give a waist-to-height ratio of 0.55, which is a more concerning signal than the BMI suggests.</p>
<p>Age changes the picture. Older adults tend to lose muscle and gain abdominal fat, so a weight inside the range can coexist with low muscle mass. Pregnancy adds weight that the standard range was not designed to interpret. Athletes can sit above the range with low body fat. People with amputations, edema or conditions that affect fluid balance may need clinical adjustments rather than a chart.</p>
<p>Ethnicity also affects risk at a given BMI. Some guidelines use lower action points for people of South Asian or East Asian descent because metabolic risk can appear at a lower BMI. The chart is a population reference, not a personalized prescription.</p>

<h2 id="using-the-range">How to use the range without turning it into a target</h2>
<p>The healthiest way to use the chart is as a wide corridor, not a bullseye. Being anywhere inside the 18.5–24.9 band is the reference outcome; there is no bonus for landing in the middle. A weight at 24.5 is not “worse” than a weight at 21.5 in any way the chart can measure.</p>
<p>If you are above the range, the useful questions are about trend, waist and habits rather than the gap to the upper bound. Has your weight been stable for a year or rising for five? Is your waist growing faster than your weight? Are you sleeping, moving and eating in a way you can sustain? A clinician can add blood pressure, glucose and lipids to the picture.</p>
<p>If you are below the range, the same logic applies in reverse. Unexplained weight loss, low muscle mass or a restricted diet deserves a clinical conversation rather than a push toward more calories. The chart cannot tell whether a low weight is healthy for you or a symptom.</p>
<p>Weigh yourself under consistent conditions — same time of day, same scale, after using the bathroom, before eating — and look at the trend over four to six weeks. A single reading is noise. A trend and a waist measurement together are a signal.</p>

<h2 id="calculator">Get your range from the calculator</h2>
<p>Open the <a href="/bmi-calculator">BMI calculator</a> to see your current index, then use the arithmetic above to turn the band into kilograms at your height. The <a href="/blog/bmi-calculator-guide/how-bmi-is-calculated">formula guide</a> shows both metric and imperial calculations if you want to check the math by hand. For context on how the range differs by sex, read the <a href="/blog/bmi-calculator-guide/bmi-for-women">BMI for women guide</a>; the <a href="/blog/bmi-calculator-guide">full BMI guide</a> connects weight with calorie and water estimates.</p>
<div class="cta-box"><strong>Find your interval:</strong> open the <a href="/bmi-calculator">free BMI calculator</a>, enter your height and current weight, and compare the result with the range in the chart. Then measure your waist. The two numbers together are more useful than either one alone.</div>
<p><em>This article is general information, not medical advice. BMI ranges are screening references, not personal targets or diagnoses. Age, sex, ethnicity, pregnancy, muscle mass and medical conditions all affect interpretation; consult a qualified clinician before making health decisions.</em></p>
`;

export const bmiHealthyWeight: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "healthy-weight-range",
  kind: "cluster",
  title: "Healthy Weight Range for Your Height (BMI Chart)",
  description:
    "Healthy weight range by height from the 18.5–24.9 BMI band, with a metric and imperial chart, worked examples and key limitations.",
  keywords: ["healthy weight for height", "healthy weight range", "weight for height chart", "bmi weight range", "ideal weight by height", "healthy bmi range chart"],
  toolSlugs: ["bmi-calculator"],
  relatedSlugs: ["how-bmi-is-calculated", "bmi-for-women", "bmi-for-men"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-the-range-means", text: "What the range is built from", level: 2 },
    { id: "the-chart", text: "Healthy weight range by height", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "what-it-cannot-tell", text: "What the range cannot tell you", level: 2 },
    { id: "using-the-range", text: "Using the range sensibly", level: 2 },
    { id: "calculator", text: "Get your range", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a healthy weight for my height?", answer: "Multiply your height in metres squared by 18.5 for the lower bound and by 24.9 for the upper bound. At 1.70 m, 2.89 × 18.5 = 53.5 kg and 2.89 × 24.9 = 72.0 kg, so the reference range is 53.5 to 72.0 kg. At 1.85 m, the same arithmetic gives 63.3 to 85.2 kg." },
    { question: "Is the BMI healthy weight range accurate for everyone?", answer: "It is a population reference, not a personal prescription. It cannot distinguish muscle from fat, does not adjust for age or pregnancy, and uses cutoffs that may not fit every ethnic group. Athletes often sit above it with low body fat, while older adults can sit inside it with low muscle. Pair it with waist circumference and clinical advice." },
    { question: "How much weight is one BMI point?", answer: "One BMI point equals your height in metres squared in kilograms. At 1.70 m, 2.89 kg; at 1.75 m, 3.06 kg; at 1.85 m, 3.42 kg. That is why the same 3 kg change moves BMI more at a shorter height. At 24.9, crossing to 25.0 can take less than half a kilogram." },
    { question: "What if I am above the range but muscular?", answer: "BMI cannot tell muscle from fat, so a lean, muscular person can sit above 24.9. Check your waist-to-height ratio; below 0.5 is a common screening heuristic. A 1.75 m man with an 84 cm waist has a ratio of 0.48. If the waist is low and training is consistent, the BMI label may be less informative than the measurement." },
    { question: "Should I aim for the middle of the healthy range?", answer: "No. The band is a corridor, not a target. A weight at 24.5 is not worse than one at 21.5 in any way the chart measures. Stability, waist circumference, fitness and clinical markers matter more than the position inside the range. Chasing a midpoint can encourage unnecessary restriction." },
    { question: "Does the healthy weight range change with age?", answer: "The adult BMI cutoffs stay the same, but body composition changes. Older adults tend to lose muscle and gain abdominal fat, so the same weight can mean a different composition. There is no separate healthy-weight chart for healthy ageing that replaces a clinical assessment. Discuss unexplained weight or waist changes with a clinician." },
  ],
};
