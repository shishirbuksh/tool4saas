import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Ask how much water you should drink and you will hear eight glasses, half your body weight in ounces, or a flat two liters. None of those answers changes when the weather does. A 70 kg office worker in a temperate city and a 70 kg runner in humid heat lose fluid at very different rates, and a useful estimate has to account for both body size and sweat.</p>
<p>This guide uses the weight-based method behind the water intake calculator: 35 ml per kilogram, with an extra 500 ml for activity or heat, then a conversion to 250 ml glasses. The result is a starting range, not a quota to force. It is general information, not medical advice; consult a qualified clinician if you have kidney, heart or liver disease, take diuretics, are pregnant, or have been told to restrict fluids.</p>

<h2 id="what-the-formula-estimates">What the formula estimates</h2>
<p>The formula estimates total daily fluid, not plain water alone. Soup, tea, coffee, milk, fruit and vegetables all contribute. The 35 ml per kilogram figure is a rule of thumb used for everyday planning; it is not a diagnostic standard and it does not account for every medical condition.</p>
<p>Activity and climate are handled with a flat 500 ml addition. That is deliberately simple. A hard training session in summer can easily cost more than 500 ml, while a gentle walk in mild weather costs less. Treat the addition as a nudge in the right direction, then use sweat loss and thirst to refine it.</p>
<p>Glasses are calculated at 250 ml each, a common kitchen measure. A 2,450 ml target divided by 250 gives 9.8 glasses, which the tool presents as about 10. Rounding up is practical, but it can add up to 250 ml of extra target, so do not treat the glass count as laboratory precision.</p>

<h2 id="worked-examples">Worked examples in liters and glasses</h2>
<p><strong>Example 1: 70 kg adult, temperate climate, desk job.</strong> 70 × 35 = 2,450 ml, or 2.45 liters. Divide by 250: 2,450 ÷ 250 = 9.8, so about 10 glasses. A day with two cups of tea, a bowl of soup and a piece of fruit supplies part of that total without anyone filling a glass.</p>
<p><strong>Example 2: the same 70 kg adult, active or in hot weather.</strong> Add 500 ml: 2,450 + 500 = 2,950 ml, or 2.95 liters. Divide by 250: 2,950 ÷ 250 = 11.8, so about 12 glasses. The 500 ml is not a reward for exercising; it is a rough replacement for the fluid that leaves through sweat and faster breathing.</p>
<p><strong>Example 3: 55 kg adult, office worker.</strong> 55 × 35 = 1,925 ml, or 1.93 liters. Divide by 250: 1,925 ÷ 250 = 7.7, so about 8 glasses. Add the active or hot adjustment and the total becomes 2,425 ml, or about 10 glasses.</p>
<table>
<thead><tr><th>Body weight</th><th>Base target (35 ml/kg)</th><th>Base glasses</th><th>Active or hot (+500 ml)</th><th>Active glasses</th></tr></thead>
<tbody>
<tr><td>55 kg</td><td>1,925 ml (1.93 L)</td><td>8</td><td>2,425 ml (2.43 L)</td><td>10</td></tr>
<tr><td>70 kg</td><td>2,450 ml (2.45 L)</td><td>10</td><td>2,950 ml (2.95 L)</td><td>12</td></tr>
<tr><td>90 kg</td><td>3,150 ml (3.15 L)</td><td>13</td><td>3,650 ml (3.65 L)</td><td>15</td></tr>
</tbody>
</table>
<p>The 90 kg row shows why one universal number fails: 3,150 ml is already well above two liters before any activity is added, while the 55 kg row sits below it. The glass counts are rounded to whole glasses, so the totals are approximate.</p>

<h2 id="exercise-sweat">Exercise: measure sweat instead of guessing</h2>
<p>For a more personal estimate, weigh yourself before and after a typical session. A 70.4 kg runner who finishes a one-hour run at 69.5 kg has lost 0.9 kg. Because one kilogram of body mass lost during exercise is roughly one liter of fluid, that is about 900 ml of sweat, along with whatever was exhaled and not replaced.</p>
<p>Replace most of that over the next few hours with meals and fluids rather than drinking it all at once. If the session was long, hot, or produced salty sweat that stings the eyes, include sodium from food or an electrolyte drink. Sports guidance often treats a loss around 2 percent of body mass as a signal to pay closer attention, but individual sweat rates vary widely and the number is a guide, not a rule.</p>
<p>Drinking faster than you sweat does not improve performance and can be dangerous. The goal is to replace what was lost, not to flood the system.</p>

<h2 id="climate">Heat, humidity, altitude and cold</h2>
<p>In dry heat, sweat evaporates quickly and you may not notice how much is leaving. In humid heat, sweat drips instead of evaporating, so the body works harder to cool and you may underestimate losses. Both cases call for more fluid, but the humid case also calls for paying attention to sodium if sweating is heavy and prolonged.</p>
<p>Cold weather has its own losses. Breathing cold, dry air adds water vapor to every exhale, and heavy clothing can produce sweat during winter activity. Hot tea and soup count toward the total. At altitude, breathing increases and urine output often rises, so thirst can lag behind actual need during the first days of a trip.</p>
<p>Fever, vomiting and diarrhea can change fluid needs sharply. Those are clinical situations, not calculator adjustments, especially for children and older adults. Ask a clinician rather than forcing a formula.</p>

<h2 id="coffee-food-alcohol">Coffee, tea, food and alcohol</h2>
<p>Coffee and tea count toward daily fluid. Caffeine has a mild diuretic effect, but the water in the cup still contributes; a moderate coffee habit is not the same as losing a full cup of water. The calories in sweetened drinks are a separate issue.</p>
<p>Food can supply a meaningful share of fluid, especially fruit, vegetables, yogurt, soup and stew. A day built around dry crackers and little produce needs more drinking water than a day with a large salad and fruit. Salty meals increase thirst and can temporarily change water retention, which is why restaurant sushi or ramen can show up on the scale the next morning.</p>
<p>Alcohol is different. It can increase urine output and does not replace the water you need, and it adds calories without much nutritional value. Alternating an alcoholic drink with water is a practical habit, not a medical treatment.</p>

<h2 id="signs-of-hydration">What hydrated looks like</h2>
<p>Pale straw-colored urine is a rough everyday sign. Dark amber suggests concentrating urine and is a reason to drink, though it can also reflect a first-morning sample or certain medications. B vitamins can turn urine bright yellow, which is harmless but makes color a poor single test. Thirst, headache, fatigue and dizziness are nonspecific: they can point to dehydration, but they can also have other causes.</p>
<p>Use two or three signals together: thirst, urine color, how often you urinate, and how you feel during training. If you are dizzy, confused, have not urinated for many hours, or cannot keep fluids down, seek medical care rather than adjusting a formula.</p>

<h2 id="too-much-water">When drinking more is dangerous</h2>
<p>More water is not always safer. Drinking large volumes of plain water faster than the kidneys can excrete them can dilute blood sodium, a condition called hyponatremia. It has been reported in endurance events among people who drink aggressively before, during and after long races. Early symptoms include headache, nausea, bloating and confusion; severe cases are a medical emergency.</p>
<p>Kidney disease, heart failure, liver cirrhosis, syndrome of inappropriate antidiuretic hormone, and some medications can require a fluid limit below the formula. Pregnancy and breastfeeding usually increase fluid needs, but the amount should be discussed with a clinician. Never use this calculator to override a restriction given by your care team.</p>
<blockquote class="tip">This is general information, not medical advice; consult a qualified clinician for a fluid plan that fits your health conditions, medications and climate.</blockquote>

<h2 id="use-the-calculator">Using the calculator day to day</h2>
<p>Enter your weight in kilograms or pounds, choose your activity level, and mark hot climate if you sweat heavily at work or in training. Read the liters and glasses, then spread the total across the day: a glass after waking, one with each meal, and a bottle during exercise covers most of it without a heroic evening effort.</p>
<p>Front-loading the morning and tapering in the evening reduces nighttime waking. If you train, add fluid around the session rather than saving it for later. Recheck the estimate after a few weeks and adjust for how you feel, urine color, and the scale change after long sessions.</p>
<p>For the body-size context behind the number, see the <a href="/blog/bmi-calculator-guide">BMI calculator guide</a>. Athletes with high sweat rates and long sessions can read the <a href="/blog/bmi-calculator-guide/bmi-for-athletes">BMI for athletes guide</a>, and the <a href="/calorie-calculator">calorie calculator</a> covers the energy side of training and recovery.</p>
<div class="cta-box"><strong>Get your starting range:</strong> open the <a href="/water-intake-calculator">free water intake calculator</a>, enter your weight and conditions, and compare the liters with what you actually drink in a day. Adjust from sweat loss rather than forcing a fixed number.</div>
`;

export const bmiWaterIntake: BlogPost = {
  pillar: "bmi-calculator-guide",
  slug: "daily-water-intake",
  kind: "cluster",
  title: "Daily Water Intake: Formula, Exercise & Climate",
  description:
    "How much water should you drink? Use the 35 ml/kg formula, adjust for sweat and heat, and see worked examples in liters and glasses.",
  keywords: ["how much water should i drink", "daily water intake", "water intake formula", "water intake calculator", "hydration needs by weight"],
  toolSlugs: ["water-intake-calculator", "bmi-calculator"],
  relatedSlugs: ["bmi-for-athletes", "calorie-deficit-for-weight-loss", "healthy-weight-range"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-the-formula-estimates", text: "What the formula estimates", level: 2 },
    { id: "worked-examples", text: "Worked examples in liters and glasses", level: 2 },
    { id: "exercise-sweat", text: "Exercise and sweat rate", level: 2 },
    { id: "climate", text: "Heat, humidity, altitude and cold", level: 2 },
    { id: "coffee-food-alcohol", text: "Coffee, tea, food and alcohol", level: 2 },
    { id: "signs-of-hydration", text: "What hydrated looks like", level: 2 },
    { id: "too-much-water", text: "When drinking more is dangerous", level: 2 },
    { id: "use-the-calculator", text: "Using the calculator day to day", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much water should I drink per day?", answer: "Start with 35 ml per kilogram of body weight. A 70 kg adult lands at 2,450 ml, or about 2.45 liters and 10 glasses of 250 ml. Add roughly 500 ml for activity or hot weather, which gives 2,950 ml and about 12 glasses. Food, coffee and tea also contribute, and kidney, heart or liver conditions can require a different limit set by a clinician." },
    { question: "Does coffee count toward daily water intake?", answer: "Yes, the fluid in coffee and tea counts. Caffeine has a mild diuretic effect, but a moderate cup still adds more water than it removes. The bigger issue is what goes into the cup: sugar, cream and syrups add calories. If you drink many cups, spread them out and keep plain water available too." },
    { question: "Should I drink eight glasses of water a day?", answer: "Eight 250 ml glasses equal 2 liters, which is a slogan rather than a requirement. A 55 kg sedentary adult may need about 1.9 liters, while a 90 kg athlete in heat can need more than 3.5 liters. Body size, sweat, climate and medical conditions matter more than a fixed glass count." },
    { question: "How can I tell if I am dehydrated?", answer: "Thirst, dark yellow urine, headache, fatigue and dizziness can all suggest dehydration, but none is specific on its own. Check several signals together, especially during heat or training. Confusion, fainting, very little urine, or inability to keep fluids down calls for medical care rather than a calculator." },
    { question: "Do I need electrolytes after exercise?", answer: "Water is usually enough for sessions under an hour in mild conditions. Long or hot sessions, heavy sweating and salty sweat may justify sodium from food or an electrolyte drink. Everyone's sweat sodium differs, so use symptoms, session length and the salt visible on clothing as practical clues, and ask a sports clinician for a personal plan." },
    { question: "Can I drink too much water?", answer: "Yes. Drinking very large volumes of plain water faster than the kidneys excrete them can dilute blood sodium, causing hyponatremia. Endurance events are the classic setting. Symptoms include headache, nausea, bloating and confusion, and severe cases need emergency care. Spread intake across the day and follow any fluid limit set by your clinician." },
  ],
};
