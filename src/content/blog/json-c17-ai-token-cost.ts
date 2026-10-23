import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>AI providers bill by tokens, not by words or characters. That makes a long prompt feel cheaper than it is: a 10,000-word document can be tens of thousands of tokens before the model writes a single sentence. The <a href="/ai-token-counter">AI token counter</a> estimates input tokens from the pasted text, compares a few default model prices and shows an editable cost table. It is a planning aid, not a billing statement.</p>
<p>Part of the <a href="/blog/json-formatter-guide">JSON formatter guide</a>. The connection is practical: prompts often carry JSON, code and structured examples, and those characters do not tokenize like ordinary English. The tool is input-only. It does not estimate the model's reply, reserve space for a system prompt or enforce a context window.</p>

<h2 id="heuristic">How the estimate is produced</h2>
<p>The page normalizes the text to Unicode NFC, counts Unicode code points as characters, counts runs of non-whitespace as words, and applies a simple ratio:</p>
<ul>
<li><strong>Base estimate</strong> = characters / 4</li>
<li><strong>Code estimate</strong> = base x 1.15 when the text looks code-like</li>
<li><strong>Displayed tokens</strong> = rounded up to the next whole token</li>
</ul>
<p>The code boost triggers on three or more characters from a punctuation set, in a row, that includes braces, brackets, parentheses, semicolons, equals signs, angle brackets, colons, slashes and backslashes, or on keywords such as <code>function</code>, <code>const</code>, <code>import</code>, <code>def</code> and <code>class</code>. It is a single multiplier, not a syntax-aware parser. A string of nested braces or array brackets can trigger the boost, while a plain English paragraph with one colon usually does not. Many ordinary JSON payloads will not trigger it, so the estimate can land low for structured data.</p>
<p>For 4,000 characters of prose, the base estimate is 1,000 tokens. If the same length looks code-like, the estimate becomes 1,150. A 2,000-word article is often around 10,000 to 13,000 characters, which puts the rough range near 2,500 to 3,250 tokens. That is close enough for a budget estimate and far enough from exact to matter when you are near a hard limit.</p>
<p>Characters are counted as Unicode code points, so a simple emoji is one character. A multi-person emoji built from several code points can count as more than one. This is one reason the estimate should be treated as a range rather than a precise count.</p>

<h2 id="cost">Turning tokens into a cost</h2>
<p>The cost formula is straightforward:</p>
<p><strong>Input cost</strong> = estimated tokens / 1,000,000 x price per million input tokens</p>
<p>The default table uses GPT-4o at 2.50 dollars per million input tokens, Claude Sonnet at 3.00 and Gemini Flash at 0.35. Those are editable starting values, not a live price list. Provider pricing changes, and the same family can have different prices for input, cached input, output, batch processing and long-context tiers.</p>
<table>
<thead><tr><th>Input tokens</th><th>GPT-4o at $2.50</th><th>Claude Sonnet at $3.00</th><th>Gemini Flash at $0.35</th></tr></thead>
<tbody>
<tr><td>1,000</td><td>$0.002500</td><td>$0.003000</td><td>$0.000350</td></tr>
<tr><td>10,000</td><td>$0.025000</td><td>$0.030000</td><td>$0.003500</td></tr>
<tr><td>50,000</td><td>$0.125000</td><td>$0.150000</td><td>$0.017500</td></tr>
<tr><td>100,000</td><td>$0.250000</td><td>$0.300000</td><td>$0.035000</td></tr>
<tr><td>1,000,000</td><td>$2.500000</td><td>$3.000000</td><td>$0.350000</td></tr>
</tbody>
</table>
<p>At 100,000 input tokens, GPT-4o is 0.25 dollars, Claude Sonnet is 0.30 and Gemini Flash is 0.035 on these assumptions. The cheapest model is roughly seven times cheaper for the input portion. That does not automatically make it the best choice: output quality, latency, context limits and output prices can reverse the decision.</p>
<p>The table displays six decimal places. Very small jobs can round to 0.000000 even when the real cost is a tiny fraction of a cent. For a one-off prompt that is harmless; for a high-volume workload, export the token count and calculate against current prices in a spreadsheet instead of reading a rounded display.</p>

<h2 id="scope">What the estimate leaves out</h2>
<p>The biggest omission is output. Many providers charge a different, often higher, rate for generated tokens. A prompt with 2,000 input tokens and a 1,000-token response has two billable components, and this page estimates only the first. Add the expected output separately using the provider's output price.</p>
<p>A real request also includes more than the text you paste. System instructions, conversation history, retrieved documents, tool definitions, images and formatting can all consume input tokens. Conversation history grows with every turn, so the tenth message can be far more expensive than the first even when the new question is short. The tool has one text area and no notion of turns.</p>
<p>Context limits are separate from cost. A model may accept a large context but charge more above a threshold, or reject the request when input and reserved output together exceed the window. The counter does not know the selected model's actual context size, does not count the system prompt and does not reserve room for a reply. Check the provider's limit before sending a long document.</p>
<p>Caching, batch discounts, free tiers and reasoning-token billing are not modeled. Those can change the real bill by a large factor. The estimate is most useful for comparing prompt drafts and spotting runaway length before you call an API.</p>

<h2 id="exact">Why a tokenizer still matters</h2>
<p>Production tokenizers use byte-pair encoding or a similar scheme. They split common words into single tokens, rare words into pieces, punctuation into separate tokens and code according to learned patterns. Four characters per token is an average for English prose, not a rule. The same 1,000 characters can produce very different counts in English, Chinese, Python, minified JSON or a block of emoji.</p>
<p>Use the page to choose a model and budget a draft. Use the provider's tokenizer or the usage field in an API response when the number affects billing, truncation or a hard limit. If the two disagree by more than a few percent, trust the provider's count for the request you actually send.</p>
<p>Normalization also creates small differences. NFC combines some accented characters, which can change the character count before the ratio is applied. That is reasonable for text comparison, but a provider may tokenize the original byte sequence differently. Keep a margin near limits rather than tuning a prompt to the last estimated token.</p>

<h2 id="workflow">A practical prompt-budget workflow</h2>
<ol>
<li>Paste the exact prompt or document, not a summary of it.</li>
<li>Read the character, word and estimated-token figures together. A high word count with a low token estimate is a signal to check the text, not a guarantee.</li>
<li>Replace the default prices with the current input price for the models you are considering.</li>
<li>Compare the input cost first, then add the expected output cost from the provider's separate output rate.</li>
<li>Add room for system instructions, history and retrieved context, and confirm the total fits the context window.</li>
<li>Copy the summary for your notes, then verify the first real request against the provider's usage report.</li>
</ol>
<p>When a prompt is too expensive, shorten it before changing models. Remove duplicated instructions, replace pasted reference material with a short excerpt, summarize earlier turns, and send structured data in a compact format. The <a href="/json-formatter">JSON formatter</a> can help you inspect a payload, and the <a href="/word-counter">word counter</a> gives a second view of length. Neither replaces a tokenizer, but both make waste easier to see.</p>
<p>The text stays in the page. There is no account, upload or saved history, and the input is capped at 500,000 characters for performance. That cap is a guardrail, not a context-window recommendation; many models accept far less, and some accept more.</p>
<div class="cta-box"><strong>Estimate before you send:</strong> open the <a href="/ai-token-counter">AI token counter</a>, paste the prompt, and edit the per-million prices to match your provider. For structured prompts, clean the payload with the <a href="/json-formatter">JSON formatter</a> first.</div>
`;

export const aiTokenCost: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "estimate-ai-token-cost",
  kind: "cluster",
  title: "Estimate AI Token Cost Before Sending a Prompt",
  description:
    "Estimate input tokens from characters, compare model costs per million tokens, and see why a heuristic is not a provider tokenizer or a final bill.",
  keywords: ["ai token cost", "token counter", "estimate tokens", "llm cost calculator", "prompt cost", "input token pricing"],
  toolSlugs: ["ai-token-counter"],
  relatedSlugs: ["json-parse-errors", "base64-url-safe-vs-standard", "minify-css-js-safely"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "heuristic", text: "How the estimate is produced", level: 2 },
    { id: "cost", text: "Turning tokens into a cost", level: 2 },
    { id: "scope", text: "What the estimate leaves out", level: 2 },
    { id: "exact", text: "Why a tokenizer still matters", level: 2 },
    { id: "workflow", text: "A prompt-budget workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is this an exact token count?", answer: "No. It uses about four characters per token, with a 1.15 multiplier for code-like text. Provider tokenizers split text differently, so use the API usage report when the exact number matters." },
    { question: "Does it estimate output tokens?", answer: "No. It counts the pasted input only. Add the expected response length separately at the provider's output price, and reserve context space for it." },
    { question: "Why does code cost more in the estimate?", answer: "The heuristic applies a 1.15 multiplier when it detects code-like punctuation or keywords. Code and JSON often tokenize less efficiently than plain English, so the boost is a rough adjustment rather than a syntax-aware count." },
    { question: "Are the model prices live?", answer: "No. GPT-4o at 2.50, Claude Sonnet at 3.00 and Gemini Flash at 0.35 per million input tokens are editable defaults. Replace them with current provider prices before relying on a cost." },
    { question: "Is my prompt uploaded?", answer: "No. The estimate runs in the page and nothing is saved. The input is capped at 500,000 characters, and refreshing clears the text." },
  ],
};
