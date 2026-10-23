import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Men often arrive at BMI with a different question than women do. Often it is not “what is the range?” but “why does this say overweight when I train five days a week?” The range is easy. The answer to the second question is more interesting, and it starts with what the ratio can actually see.</p>
<p>The adult formula is the same for men: kilograms divided by metres squared. At 1.80 m, a weight of 82 kg gives 25.3, which lands just inside the overweight band. A lean 95 kg athlete at the same height scores 29.3. Both numbers are correct. Only one of them may be a useful description of health. This guide explains where the line sits, why muscle distorts it, and which measurements add the missing context.</p>

<h2 id="same-bands">The same adult bands, with different stakes</h2>
<p>For non-pregnant adults, the reference categories are under 18.5 for underweight, 18.5 to 24.9 for the healthy range, 25.0 to 29.9 for overweight and 30.0 or above for obesity. At 1.80 m, those cutoffs convert to the weights below using weight = BMI × 3.24 m².</p>
<table>
<thead><tr><th>BMI</th><th>Category</th><th>Weight at 1.80 m</th></tr></thead>
<tbody>
<tr><td>Below 18.5</td><td>Underweight</td><td>Below 59.9 kg</td></tr>
<tr><td>18.5 to 24.9</td><td>Healthy range</td><td>59.9 to 80.7 kg</td></tr>
<tr><td>25.0 to 29.9</td><td>Overweight</td><td>81.0 to 96.9 kg</td></tr>
<tr><td>30.0 and above</td><td>Obesity</td><td>97.2 kg and above</td></tr>
</tbody>
</table>
<p><strong>Worked examples at 1.80 m:</strong> 70 kg ÷ 3.24 = 21.6, healthy. 82 kg ÷ 3.24 = 25.3, overweight. 95 kg ÷ 3.24 = 29.3, still overweight but near the top of the band. 100 kg ÷ 3.24 = 30.9, obesity. The step from 95 to 100 kg is only 5 kg, yet it moves the label across a boundary because one BMI point at this height is 3.24 kg.</p>
<p>That boundary is a screening convention, not a physical switch. A man at 96.8 kg and a man at 97.4 kg are nearly the same size, but one is labelled overweight and the other obese. The label can prompt a useful conversation; it should not be mistaken for the conversation itself.</p>

<h2 id="muscle">Why muscular men land in the overweight band</h2>
<p>Muscle is denser than fat, so a lean, well-trained man can weigh as much as a sedentary man who carries more fat. BMI sees only the total mass. At 1.80 m, 95 kg produces 29.3 whether that mass is 12% body fat or 32%. The ratio cannot tell the difference, and no amount of staring at the number will make it.</p>
<p>A waist measurement helps separate the two cases. Take the same 95 kg at 1.80 m. With an 86 cm waist, waist-to-height is 86 ÷ 180 = 0.48, below the 0.5 heuristic. With a 102 cm waist, the ratio is 102 ÷ 180 = 0.57. Same height, same weight, same BMI, very different abdominal profile. The first man may be a strength athlete; the second may be carrying visceral fat that the BMI label captures only indirectly.</p>
<p>This does not mean every overweight man is muscular. Not every man in the 25–29.9 band is lean, and the assumption that a high BMI is “just muscle” can delay a useful check. The honest position is that BMI is ambiguous in both directions: it can overstate risk in a lean, heavy man and understate it in a man with a normal weight but high abdominal fat.</p>

<h2 id="where-fat-sits">Where the fat sits matters more than the label</h2>
<p>Visceral fat, stored around the internal organs, is more closely linked to metabolic risk than subcutaneous fat on the hips and thighs. BMI does not distinguish the two. A man with a BMI of 24 and a 104 cm waist can be at higher risk than a man with a BMI of 27 and an 88 cm waist, even though the chart says the first is healthy and the second is overweight.</p>
<p>Height matters when you compare waist numbers directly. At 1.80 m, a 78 kg man has a BMI of 24.1, inside the healthy band, but a 100 cm waist gives a ratio of 0.56. The BMI says normal; the waist says keep looking. That is the gap the ratio cannot close on its own.</p>
<p>Waist circumference is the simplest addition. The World Health Organization has used 94 cm as an increased-risk threshold and 102 cm as a substantially increased-risk threshold for men, with lower values in some South Asian guidelines. Measure at the midpoint between the lowest rib and the top of the hip bone, at the end of a normal exhale, without pulling the tape tight. One reading is a snapshot; a trend over months is more informative.</p>
<p>Waist-to-height ratio is easy to remember because the target is roughly the same for everyone: keep it below 0.5. A 1.80 m man would aim for a waist under 90 cm on that heuristic, which is slightly stricter than the 94 cm population threshold. Neither number is a diagnosis. They are prompts to look at blood pressure, fasting glucose, lipids and family history with a clinician.</p>

<h2 id="age-ethnicity">Age and ethnicity shift the interpretation</h2>
<p>Men lose muscle mass gradually from midlife, and fat often shifts toward the abdomen. A 60-year-old man can keep the same weight and BMI for a decade while his waist grows and his strength falls. The scale looks stable; the composition does not. Resistance training and protein intake affect this trajectory, but so do hormones, illness and medication, which is why a clinician should be involved when the change is rapid or unexplained.</p>
<p>Ethnicity matters too. Some public-health guidance uses lower BMI action points for people of South Asian or East Asian descent, reflecting a tendency for metabolic risk to appear at a lower BMI. The exact numbers vary by guideline and should not be applied as a personal diagnosis. The practical takeaway is symmetrical: a BMI of 24 is not automatically reassuring for every man, and a BMI of 27 is not automatically a problem for every man.</p>
<p>Age also changes what “healthy” means in practice. For an older man, preserving muscle and function may matter more than hitting the middle of the BMI band. For a younger man, the same band may be a reasonable population reference. The number does not carry its own context; you have to supply it.</p>

<h2 id="better-metrics">A better set of numbers</h2>
<p>BMI is a starting point, not a finish line. The following measures are more useful when read together:</p>
<ul>
<li><strong>Waist circumference:</strong> 94 cm and 102 cm are common population reference points for men; some guidelines use lower values for South Asian populations.</li>
<li><strong>Waist-to-height ratio:</strong> waist ÷ height, aiming below 0.5 as a screening heuristic. At 1.80 m, that means a waist under 90 cm.</li>
<li><strong>Body-fat percentage:</strong> useful as a trend, though calipers, impedance scales and DEXA have different error margins.</li>
<li><strong>Strength and aerobic fitness:</strong> how much you lift, how fast you walk or run, how quickly your heart rate recovers. These capture health that BMI cannot.</li>
<li><strong>Clinical markers:</strong> blood pressure, fasting glucose, lipids and family history, interpreted by a professional.</li>
</ul>
<p>The goal is not to collect numbers for their own sake. It is to notice which one changes the conversation. If your BMI is 27 but your waist is 86 cm and your blood pressure and glucose are normal, the label may be less informative than your training and family history. If your BMI is 24 but your waist is 102 cm, the reverse may be true. Either way, the next step is a clinician, not another online calculator.</p>

<h2 id="calculator">Check the arithmetic, then add context</h2>
<p>Use the <a href="/bmi-calculator">BMI calculator</a> to confirm the number in metric or imperial units, then measure your waist and divide by your height. The <a href="/blog/bmi-calculator-guide/bmi-for-women">BMI for women guide</a> covers the parallel limitations, the <a href="/blog/bmi-calculator-guide/bmi-for-athletes">athlete guide</a> goes deeper on muscle-heavy bodies, and the <a href="/blog/bmi-calculator-guide">full BMI guide</a> connects the bands with weight ranges, calories and hydration.</p>
<div class="cta-box"><strong>Run your own numbers:</strong> open the <a href="/bmi-calculator">free BMI calculator</a>, enter your height and weight, and note the band. Then add your waist measurement. If the two tell different stories, that gap is the useful part.</div>
<p><em>This article is general information, not medical advice. BMI is a screening tool, not a diagnosis. Muscle mass, age, ethnicity and medical conditions all affect how the number should be read; consult a qualified clinician about your own health.</em></p>
`;

export const bmiMen: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "bmi-for-men",
  kind: "cluster",
  title: "BMI for Men: What the Number Does and Doesn't Tell You",
  description:
    "BMI for men explained: healthy ranges, why muscular builds score high, waist thresholds and the measurements that add missing context.",
  keywords: ["bmi for men", "healthy bmi for men", "bmi chart men", "bmi muscular men", "waist size men", "bmi waist height ratio men"],
  toolSlugs: ["bmi-calculator"],
  relatedSlugs: ["bmi-for-women", "healthy-weight-range", "bmi-for-athletes"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "same-bands", text: "The same adult bands", level: 2 },
    { id: "muscle", text: "Why muscular men score high", level: 2 },
    { id: "where-fat-sits", text: "Where the fat sits", level: 2 },
    { id: "age-ethnicity", text: "Age and ethnicity", level: 2 },
    { id: "better-metrics", text: "A better set of numbers", level: 2 },
    { id: "calculator", text: "Check the arithmetic", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a healthy BMI for a man?", answer: "The usual reference band for non-pregnant adult men is 18.5 to 24.9, with 25.0 to 29.9 overweight and 30.0 or above obesity. At 1.80 m, that healthy band is roughly 59.9 to 80.7 kg. These are population screening categories, not individual health guarantees, and they do not distinguish muscle from fat." },
    { question: "Why does BMI say overweight when I lift weights?", answer: "Muscle is denser than fat, so a lean, muscular man can weigh as much as a less lean man of the same height. At 1.80 m, 95 kg gives a BMI of 29.3 regardless of body composition. A waist measurement helps: 86 cm gives a waist-to-height ratio of 0.48, while 102 cm gives 0.57. Same BMI, different profile." },
    { question: "Is BMI different for men and women?", answer: "The formula and adult cutoffs are identical. Average body composition and fat distribution differ, so the same number can carry different context, but there is no separate male equation. Clinical tools may add waist circumference or other risk factors; those are additions to BMI, not a different BMI formula." },
    { question: "What waist size is too high for a man?", answer: "The World Health Organization has used 94 cm as an increased-risk and 102 cm as a substantially increased-risk waist threshold for men, with some guidelines using lower values for South Asian populations. Measure at the midpoint between the lowest rib and the top of the hip bone after a normal exhale. Treat it as a screening prompt, not a diagnosis." },
    { question: "Does BMI become less accurate with age?", answer: "It can. Muscle mass tends to decline and abdominal fat tends to increase with age, so weight and BMI may stay stable while body composition changes. A man can have a BMI of 22 and low muscle mass, or a BMI of 27 with high muscle and a low waist. Waist, strength and clinical markers fill in what the ratio misses." },
    { question: "What should I use instead of BMI?", answer: "Use BMI as one screening input alongside waist circumference, waist-to-height ratio, body-fat trend, strength and aerobic fitness, and clinical markers such as blood pressure and fasting glucose. No single measurement replaces a clinical assessment. If the numbers disagree, that gap is worth discussing with a qualified clinician." },
  ],
};
