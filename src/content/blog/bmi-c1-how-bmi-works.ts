import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>BMI is a ratio, so the calculation itself is short: weight divided by height squared. The parts people get wrong are the unit conversions and the order of operations. A height entered in centimetres instead of metres turns 22.9 into 0.00229 unless you scale it back. A weight in pounds dropped into the metric formula produces a number that looks plausible and is wrong by a factor of 2.2.</p>
<p>This walkthrough does the arithmetic twice, once in kilograms and metres and once in pounds and inches, then shows why the two answers converge. Keep the <a href="/bmi-calculator">BMI calculator</a> open if you want to check your own numbers; it runs the same formulas and places the result in a category band.</p>

<h2 id="what-the-formula-does">What the BMI formula actually measures</h2>
<p>Body mass index compares weight with height. The metric version divides kilograms by metres squared. The result carries units of kg/m², although the number is usually quoted bare: a BMI of 22.9, not 22.9 kg/m².</p>
<p>That ratio is a screening shortcut, not a body-composition test. It cannot tell a kilogram of muscle from a kilogram of fat, and it says nothing about where fat sits. Two adults can both score 22.9 while carrying very different amounts of muscle, bone and abdominal fat. The number is useful because it is cheap, quick and comparable across large groups; it is limited because an individual is not a group.</p>
<p>The formula is identical for adult men and women. The four category bands are also the same for non-pregnant adults. What changes is how much weight to give the result when muscle mass, age, ethnicity or pregnancy make the ratio less representative. That context gets its own sections later.</p>
<p>The core idea is simple: for a fixed height, BMI rises in a straight line with weight. At 1.75 m, every extra kilogram adds 1 ÷ 3.0625 = 0.33 BMI points. At 1.60 m, every kilogram adds 1 ÷ 2.56 = 0.39 points, because the same weight is being spread over a smaller frame. That is why a 2 kg change matters more at 1.55 m than at 1.90 m.</p>

<h2 id="metric-formula">The metric formula, step by step</h2>
<p>Use kilograms and metres. If your height is in centimetres, divide by 100 first; if it is already in metres, skip that step. Then square the height and divide the weight by the result.</p>
<ol>
<li>Convert 175 cm to metres: 175 ÷ 100 = 1.75 m.</li>
<li>Square the height: 1.75 × 1.75 = 3.0625 m².</li>
<li>Divide weight by the square: 70 ÷ 3.0625 = 22.857.</li>
<li>Round to one decimal place: 22.9.</li>
</ol>
<p>Check the arithmetic in reverse: 22.9 × 3.0625 = 70.1 kg, close to the starting weight. That backward multiplication is a useful sanity check because it catches a height that was squared incorrectly.</p>
<p><strong>Second example:</strong> 85 kg at 180 cm. First, 180 ÷ 100 = 1.80 m. Then 1.80² = 3.24. Finally, 85 ÷ 3.24 = 26.234, which rounds to 26.2. That sits in the overweight band (25.0 to 29.9).</p>
<p><strong>Third example:</strong> 50 kg at 175 cm. The height square is still 3.0625, so 50 ÷ 3.0625 = 16.326, or 16.3. This time the result falls below 18.5, the underweight band.</p>
<p>If you enter centimetres by mistake, the raw result is 70 ÷ 30,625 = 0.00229. Multiply by 10,000 and you recover 22.9, because one square metre contains 10,000 square centimetres. Some calculators do that scaling internally; others expect metres. Knowing the factor makes the difference obvious rather than mysterious.</p>

<h2 id="imperial-formula">The imperial formula and the 703 factor</h2>
<p>The imperial version is BMI = 703 × pounds ÷ inches². The 703 is not arbitrary decoration. It folds the pound-to-kilogram and inch-to-metre conversions into one constant so the output lands on the same scale as the metric formula.</p>
<p><strong>Example:</strong> 180 lb at 70 in (5 ft 10 in).</p>
<ol>
<li>Square the height in inches: 70 × 70 = 4,900.</li>
<li>Multiply weight by 703: 703 × 180 = 126,540.</li>
<li>Divide by the height square: 126,540 ÷ 4,900 = 25.824.</li>
<li>Round: 25.8.</li>
</ol>
<p>Convert the same measurements to metric and the answer should match. 180 lb ÷ 2.20462 = 81.65 kg. 70 in × 2.54 = 177.8 cm = 1.778 m. Squaring gives 3.161 m², and 81.65 ÷ 3.161 = 25.83. The small difference comes from rounding the converted inputs, not from a different formula.</p>
<p><strong>Second example:</strong> 140 lb at 65 in (5 ft 5 in). 65² = 4,225. 703 × 140 = 98,420. 98,420 ÷ 4,225 = 23.295, or 23.3. In metric terms that is 63.50 kg at 1.651 m, and 63.50 ÷ 2.726 = 23.3.</p>
<p>Height in feet and inches has to be converted to a single inch count before squaring. Five feet ten inches is 5 × 12 + 10 = 70 in, not 5.10 ft and not 5.9 ft. Typing 5.9 as a decimal is a common slip: it represents 5 ft 10.8 in, almost two inches taller than intended.</p>

<h2 id="converting-units">Converting between the two systems</h2>
<p>The conversions are worth memorising because they explain most mismatches between apps.</p>
<ul>
<li><strong>Centimetres to metres:</strong> divide by 100. 163 cm = 1.63 m.</li>
<li><strong>Inches to centimetres:</strong> multiply by 2.54. 69 in = 175.26 cm.</li>
<li><strong>Pounds to kilograms:</strong> divide by 2.20462. 165 lb = 74.84 kg.</li>
<li><strong>Feet and inches to inches:</strong> feet × 12, then add the remaining inches. 5 ft 9 in = 69 in.</li>
</ul>
<p>Take 165 lb at 5 ft 9 in. The height is 69 in, or 1.7526 m; the weight is 74.84 kg. The metric calculation is 74.84 ÷ (1.7526 × 1.7526) = 74.84 ÷ 3.0716 = 24.36, which rounds to 24.4. The imperial calculation is 703 × 165 = 115,995, and 115,995 ÷ 4,761 = 24.36. Same answer.</p>
<p>One subtlety: 5 ft 9 in is 175.26 cm, not exactly 175 cm. Across a 1 cm height difference at this weight, BMI moves by roughly 0.3 points. That is small, but it can matter at a category boundary. Use the most precise height you have rather than a rounded guess.</p>

<h2 id="worked-examples">Worked examples in both systems</h2>
<p>The table below repeats the calculations with the intermediate values visible. Every row uses the same formulas; only the units change.</p>
<table>
<thead><tr><th>Profile</th><th>Calculation</th><th>BMI</th><th>Band</th></tr></thead>
<tbody>
<tr><td>70 kg, 175 cm</td><td>70 ÷ 3.0625</td><td>22.9</td><td>Healthy</td></tr>
<tr><td>85 kg, 180 cm</td><td>85 ÷ 3.24</td><td>26.2</td><td>Overweight</td></tr>
<tr><td>50 kg, 175 cm</td><td>50 ÷ 3.0625</td><td>16.3</td><td>Underweight</td></tr>
<tr><td>180 lb, 70 in</td><td>703 × 180 ÷ 4,900</td><td>25.8</td><td>Overweight</td></tr>
<tr><td>140 lb, 65 in</td><td>703 × 140 ÷ 4,225</td><td>23.3</td><td>Healthy</td></tr>
</tbody>
</table>
<p>The bands in the final column are reference ranges for non-pregnant adults: under 18.5 is underweight, 18.5 to 24.9 is healthy, 25.0 to 29.9 is overweight and 30.0 or above is obesity. They are not individual diagnoses, and a result within a band does not guarantee anything about blood pressure, insulin sensitivity or fitness.</p>

<h2 id="why-your-number-differs">Why your result may not match another calculator</h2>
<p>Most disagreements come from inputs, not formulas. A height measured in shoes can be 2 cm taller than one measured barefoot. At 70 kg, entering 1.77 m instead of 1.75 m changes the result from 22.9 to 22.3, a difference of about 0.5 points. Weighing after a meal or later in the day can add 1 to 2 kg, which moves BMI by 0.3 to 0.7 points at this height.</p>
<p>Rounding produces smaller discrepancies. The exact result of the first example is 22.857. A calculator that truncates shows 22.8; one that rounds shows 22.9. Both are defensible, but the truncation is not a different measurement. At a boundary the effect can look dramatic: 76.4 kg at 1.75 m gives 24.947, which rounds to 24.9 and stays in the healthy band, while a tool that rounds up to 25.0 would label it overweight. The underlying weight is the same.</p>
<p>Age and pregnancy change the interpretation, not the arithmetic. Children and teenagers need BMI-for-age percentiles rather than adult bands. Pregnancy adds weight that the standard ratio was never designed to interpret. A muscular athlete can carry a high BMI with a low body-fat percentage. None of those cases makes the division wrong; they make the label less useful.</p>

<h2 id="limits-and-next-steps">What the number cannot tell you</h2>
<p>BMI does not measure visceral fat, cardiorespiratory fitness, muscle mass, bone density, blood pressure or blood glucose. It also uses one population-level cutoff set for everyone, while risk varies with age, sex, ethnicity and family history. Some guidelines use lower action points for people of South Asian or East Asian descent, and clinicians may weigh waist circumference more heavily when BMI sits near a boundary.</p>
<p>A BMI inside the healthy band is not proof of metabolic health, and a BMI inside the overweight band is not proof of disease. The ratio is a first pass that becomes more useful when paired with a waist measurement, an activity history and routine clinical checks. If you are pregnant, under 18, very muscular, over 65, or managing a condition that affects weight or fluid balance, treat the number as a conversation starter rather than a conclusion.</p>
<div class="cta-box"><strong>Check your own arithmetic:</strong> open the <a href="/bmi-calculator">BMI calculator</a> in metric or imperial mode and compare the displayed formula with the steps above. For the range of weights that maps to 18.5–24.9 at your height, read the <a href="/blog/bmi-calculator-guide/healthy-weight-range">healthy weight range chart</a>. If you are using the result to think about energy intake, the <a href="/calorie-calculator">calorie calculator</a> shows why BMI cannot set a calorie target by itself. The <a href="/blog/bmi-calculator-guide">full BMI guide</a> connects the bands, weight ranges, calories and hydration.</div>
<p><em>This article is general information, not medical advice. BMI is a screening tool, not a diagnosis. Talk with a qualified clinician about your own health, especially during pregnancy, adolescence or while managing a medical condition.</em></p>
`;

export const bmiHowItWorks: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "how-bmi-is-calculated",
  kind: "cluster",
  title: "How BMI Is Calculated: Formula, Metric & Imperial",
  description:
    "How BMI is calculated in metric and imperial units, with worked examples, unit conversions and the rounding quirks that change the category.",
  keywords: ["how is bmi calculated", "bmi formula metric", "bmi formula imperial", "bmi calculation example", "convert bmi units", "body mass index equation"],
  toolSlugs: ["bmi-calculator", "calorie-calculator"],
  relatedSlugs: ["healthy-weight-range", "bmi-for-women", "bmi-for-men"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-the-formula-does", text: "What the BMI formula measures", level: 2 },
    { id: "metric-formula", text: "The metric formula step by step", level: 2 },
    { id: "imperial-formula", text: "The imperial formula and 703", level: 2 },
    { id: "converting-units", text: "Converting between systems", level: 2 },
    { id: "worked-examples", text: "Worked examples in both systems", level: 2 },
    { id: "why-your-number-differs", text: "Why your number differs", level: 2 },
    { id: "limits-and-next-steps", text: "What the number cannot tell you", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the formula for BMI in metric units?", answer: "Divide weight in kilograms by height in metres squared. For 70 kg at 175 cm, convert the height to 1.75 m, square it to 3.0625, then divide: 70 ÷ 3.0625 = 22.857, or 22.9. If you only have centimetres, multiply the result of kg ÷ cm² by 10,000 to get the same number." },
    { question: "What is the formula for BMI in imperial units?", answer: "Multiply weight in pounds by 703, then divide by height in inches squared. For 180 lb at 70 in, 703 × 180 = 126,540 and 70² = 4,900, so 126,540 ÷ 4,900 = 25.8. The 703 constant folds the pound and inch conversions into the formula so the result matches the metric scale." },
    { question: "Why does my BMI differ by a few tenths between calculators?", answer: "The formula is the same; the inputs and rounding differ. A height taken with shoes on can be 2 cm taller, and 2 cm at 70 kg changes BMI by about 0.5 points. Some tools truncate 22.857 to 22.8 while others round to 22.9. Weigh at the same time of day and enter height barefoot for a fair comparison." },
    { question: "Is BMI calculated differently for men and women?", answer: "No. The adult formula and the 18.5, 25 and 30 cutoffs are the same for both sexes. Body composition and fat distribution differ on average, so the same number can carry different context. Clinical tools sometimes add waist circumference or sex-specific risk factors, but those are additions to BMI, not changes to its arithmetic." },
    { question: "Can I use the adult BMI formula for children?", answer: "No. Children and teenagers are assessed with BMI-for-age and sex percentile charts because normal body composition changes substantially during growth. A value that would be healthy for an adult can sit above the 85th percentile for a 10-year-old. Use a paediatric growth chart and a clinician for anyone under 18." },
    { question: "What BMI is considered healthy for an adult?", answer: "The common reference band is 18.5 to 24.9 for non-pregnant adults, with under 18.5 underweight, 25.0 to 29.9 overweight and 30.0 or above obesity. These are population screening ranges, not personal targets. A healthy result does not guarantee metabolic health, and a result outside the band does not by itself diagnose a problem." },
  ],
};
