import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>BMI for children and teens uses the same division as adult BMI, then the answer has to be read differently. A BMI of 19 can be unremarkable for a 15-year-old and high for a 6-year-old. That is not a flaw in the arithmetic; it is why pediatric screening uses age- and sex-specific percentiles instead of the adult cutoffs at 18.5, 25 and 30.</p>
<p>This guide explains the formula, walks through two worked examples, and shows how the percentile bands are read. It is general information, not medical advice; consult a qualified pediatric clinician for anything concerning a child's growth, weight or eating.</p>

<h2 id="same-formula-different-yardstick">Same formula, a different yardstick</h2>
<p>The arithmetic is unchanged: BMI = weight in kilograms divided by height in meters squared. What changes is the comparison. For children and teens from age 2 to 20, the Centers for Disease Control and Prevention recommends BMI-for-age, plotted on growth charts that are specific to sex and age in months. Under age 2, clinicians use World Health Organization weight-for-length and weight-for-age charts rather than BMI.</p>
<p>A percentile is a rank against a reference population of the same age and sex. A child at the 70th percentile has a BMI higher than about 70 of every 100 children in that reference group. It is not a body-fat percentage, and it does not by itself say whether the child is healthy. The percentile is a position on a chart, not a diagnosis.</p>
<p>This is the part parents most often miss. An adult BMI table cannot be applied to a growing child, even when the number looks familiar. A 12-year-old with a BMI of 21 is not being measured against the adult "normal" band; the pediatric chart decides what that 21 means for a 12-year-old of that sex.</p>

<h2 id="why-age-and-sex-matter">Why age and sex change the meaning</h2>
<p>Body proportions change constantly during growth. BMI rises in infancy, falls through early childhood, reaches a low point often around ages 5 to 7, then rises again. That later rise is called adiposity rebound, and its timing varies from child to child. A BMI that looks like it is climbing may be following a normal growth pattern, or it may be crossing percentile lines faster than expected. The chart and the trend separate those cases.</p>
<p>Puberty adds another layer. Girls typically gain body fat during puberty, while boys typically gain more muscle, and the growth spurt arrives at different ages. An early-maturing child can look heavier than peers of the same age, and a late-maturing child can look leaner, without either having a weight problem. The percentile chart accounts for age and sex but not for pubertal stage, so a clinician may weigh that separately.</p>
<p>Ancestry, body composition and measurement technique also matter. BMI is a screening tool, not a measure of fat distribution, and two children at the same percentile can carry their weight very differently.</p>

<h2 id="worked-examples">Worked examples with the arithmetic</h2>
<p><strong>Example 1: an 8-year-old, 128 cm and 26 kg.</strong> Convert height to meters: 128 cm = 1.28 m. Square it: 1.28 × 1.28 = 1.6384. Divide weight by that figure: 26 ÷ 1.6384 = 15.87. The BMI is about 15.9.</p>
<p>Now keep the same height and raise weight to 32 kg: 32 ÷ 1.6384 = 19.53. Six kilograms move the index by 3.66 points, from about 15.9 to 19.5. Both results still need a percentile lookup for an 8-year-old of that child's sex. The formula alone cannot say whether 15.9 or 19.5 is high, low or mid-range for that age.</p>
<p><strong>Example 2: a 15-year-old, 170 cm and 60 kg.</strong> Height in meters is 1.70. Square it: 1.70 × 1.70 = 2.89. Divide: 60 ÷ 2.89 = 20.76. The BMI is about 20.8. An adult table would call that normal, but a 15-year-old's percentile depends on sex and exact age in months, so the chart still decides.</p>
<p>Measurement error is large enough to matter. If the 26 kg child is actually 130 cm, the BMI is 26 ÷ 1.69 = 15.38. If the height is recorded as 126 cm, it becomes 26 ÷ 1.5876 = 16.38. Two centimeters of error moves the result by about one point, which can shift a percentile. Measure without shoes, use a stadiometer or a wall mark with a flat object, and record age in months rather than rounding to the nearest year.</p>

<h2 id="percentile-bands">Reading the percentile bands</h2>
<p>For children and teens aged 2 to 20, the CDC uses four screening categories. They describe where a BMI falls on the growth chart, not a medical condition.</p>
<table>
<thead><tr><th>BMI-for-age percentile</th><th>Category</th><th>What it describes</th><th>General next step</th></tr></thead>
<tbody>
<tr><td>Below the 5th</td><td>Underweight</td><td>BMI lower than 95 of every 100 children in the reference group</td><td>Pediatric review of growth, intake and symptoms</td></tr>
<tr><td>5th to below the 85th</td><td>Healthy weight</td><td>BMI within the broad middle of the reference group</td><td>Keep supporting normal growth and healthy habits</td></tr>
<tr><td>85th to below the 95th</td><td>Overweight</td><td>BMI above most peers of the same age and sex</td><td>Pediatric clinician reviews the trend and context</td></tr>
<tr><td>95th and above</td><td>Obesity</td><td>BMI at or above the top 5 percent of the reference group</td><td>Pediatric clinician assesses growth, health and family history</td></tr>
</tbody>
</table>
<p>These labels are screening categories, not diagnoses. A clinician may also look at waist circumference, blood pressure, family history, symptoms and how the child has grown over time. The label on a chart is the start of a conversation, not the end of one.</p>

<h2 id="trend-matters">Why the trend matters more than one point</h2>
<p>A single percentile is a snapshot. The pattern across months and years is more informative. A child who moves gradually from the 50th to the 60th percentile over a year is in a different situation from one who jumps from the 50th to the 90th in three months. The same applies downward: a child who drops across percentile lines may be growing too slowly, and that deserves pediatric attention.</p>
<p>Adiposity rebound timing is part of the trend. An early rebound, where BMI starts climbing again sooner than expected, is one factor clinicians may consider alongside family history and current growth. It is not a prediction of the child's adult body, and it should not be treated as one.</p>
<p>Puberty timing can make a normal growth spurt look like a sudden change. A child who matures early may have a higher BMI than classmates for a period, while a late maturer may look leaner. The chart accounts for age and sex, but the clinician can account for the stage of puberty.</p>

<h2 id="what-parents-can-do">What parents should do with the number</h2>
<p>Do not put a child on an adult-style calorie deficit or a restrictive diet without pediatric guidance. Growing children need energy, protein, calcium, iron and other nutrients, and restriction can interfere with growth, learning and mood. The goal for most children is healthy growth, not a smaller adult body.</p>
<p>Focus on what the whole family can do: regular meals and snacks, fruit and vegetables, adequate protein, water instead of sugary drinks, daily movement, consistent sleep, and less time sitting. These are general habits, not a treatment plan, and they work better when the child is not singled out or labeled.</p>
<p>Words matter. Calling a child "big" or putting them on a scale in front of siblings can create shame without improving health. Talk about strength, energy and habits rather than size. If a child shows restricted eating, hiding food, body-image distress, rapid weight change, excessive thirst or urination, snoring, or fatigue, raise it with a pediatric clinician rather than adjusting the calculator.</p>

<h2 id="use-the-calculator">Using the calculator correctly</h2>
<p>The BMI calculator gives the height-and-weight division, which is the same for children and adults. Do not read the adult category bands for a child or teen. Take the result, the child's exact age in months and sex to a pediatric growth chart or clinician, and let the percentile and trend drive the interpretation.</p>
<p>The <a href="/blog/bmi-calculator-guide">BMI calculator guide</a> covers the adult bands and their limits, while the <a href="/blog/bmi-calculator-guide/how-bmi-is-calculated">guide to how BMI is calculated</a> explains the metric and imperial arithmetic. Neither replaces a pediatric growth assessment.</p>
<blockquote class="tip">This is general information, not medical advice; consult a qualified clinician before changing a child's diet, activity or weight goals.</blockquote>
<div class="cta-box"><strong>Get the arithmetic first:</strong> open the <a href="/bmi-calculator">BMI calculator</a>, record height and weight accurately, then bring the number and the growth trend to a pediatric appointment. A percentile is more useful than a single cutoff.</div>
`;

export const bmiChildren: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "bmi-for-children-teens",
  kind: "cluster",
  title: "BMI for Children and Teens: Percentiles, Not Cutoffs",
  description:
    "BMI for children and teens is read as an age- and sex-specific percentile, not an adult cutoff. See the formula, worked examples and CDC screening bands.",
  keywords: ["bmi for children", "bmi for teens", "child bmi percentile", "bmi calculator for kids", "healthy bmi for children"],
  toolSlugs: ["bmi-calculator"],
  relatedSlugs: ["how-bmi-is-calculated", "healthy-weight-range", "bmi-for-women"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "same-formula-different-yardstick", text: "Same formula, a different yardstick", level: 2 },
    { id: "why-age-and-sex-matter", text: "Why age and sex change the meaning", level: 2 },
    { id: "worked-examples", text: "Worked examples with the arithmetic", level: 2 },
    { id: "percentile-bands", text: "Reading the percentile bands", level: 2 },
    { id: "trend-matters", text: "Why the trend matters", level: 2 },
    { id: "what-parents-can-do", text: "What parents should do", level: 2 },
    { id: "use-the-calculator", text: "Using the calculator correctly", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a healthy BMI for a child?", answer: "There is no single healthy number. For ages 2 to 20, a BMI-for-age percentile from the 5th to below the 85th is the CDC's healthy-weight screening range. The percentile depends on exact age in months and sex, so the same BMI can fall in different ranges at different ages. A pediatric clinician interprets the result with the growth trend." },
    { question: "How is BMI calculated for children?", answer: "Use the same formula as adults: kilograms divided by meters squared. An 8-year-old at 128 cm and 26 kg has 1.28 squared equal to 1.6384, and 26 divided by 1.6384 equals about 15.9. That number is then plotted as a percentile for the child's age and sex; the arithmetic alone does not classify it." },
    { question: "What percentile is overweight for a child?", answer: "The CDC labels a BMI-for-age from the 85th to below the 95th percentile as overweight, and at or above the 95th as obesity. Below the 5th is underweight. These are screening labels, not diagnoses, and a clinician may consider waist, blood pressure, family history and growth pattern before drawing conclusions." },
    { question: "Is BMI accurate for children and teens?", answer: "It is a screening tool, not a body-fat measurement. Muscular children, early or late maturers, and children of different ancestries can be misclassified. Measurement error in height also shifts the percentile. The trend across time is more informative than one reading, and a pediatric clinician should interpret anything concerning." },
    { question: "When should I be concerned about my child's BMI?", answer: "Ask for a pediatric review if the percentile crosses major lines quickly in either direction, if growth seems to stall, or if there are symptoms such as fatigue, excessive thirst, snoring, restricted eating or body-image distress. One measurement is rarely enough. Bring the growth chart and any changes in appetite or activity to the visit." },
    { question: "Can children lose weight safely?", answer: "Growing children usually need adequate energy and nutrients, so adult-style calorie restriction is not a do-it-yourself fix. A pediatric clinician or dietitian may recommend changes in habits or, in specific cases, a structured plan. Family meals, activity, sleep and reduced sugary drinks are safer starting points than putting a child on a diet." },
  ],
};
