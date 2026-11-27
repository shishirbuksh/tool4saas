<x-card class="p-6 md:p-8" x-data="{
    text: '',
    get metrics() {
        if (!this.text.trim()) return null;
        const words = this.text.trim().split(/\s+/);
        const sentences = this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (words.length < 15) return { score: 10, label: 'Text too short for accurate statistical heuristics', human: true };
        
        // Variance in sentence length (Perplexity / Burstiness)
        const lengths = sentences.map(s => s.trim().split(/\s+/).length);
        const avg = lengths.reduce((a,b) => a+b, 0) / lengths.length;
        const variance = lengths.map(l => Math.pow(l - avg, 2)).reduce((a,b) => a+b, 0) / lengths.length;
        const stdDev = Math.sqrt(variance);

        // Typical AI has low standard deviation (uniform sentence lengths ~15-22 words)
        let aiScore = 50;
        if (stdDev < 4) aiScore += 30; // very uniform
        else if (stdDev > 9) aiScore -= 30; // very high human burstiness

        // Transitional repetitive connector checks (moreover, furthermore, in conclusion, delves)
        const connectors = (this.text.match(/\b(delve|furthermore|moreover|in conclusion|testament|crucial|seamlessly)\b/gi) || []).length;
        aiScore += connectors * 8;

        aiScore = Math.max(5, Math.min(95, Math.round(aiScore)));
        return {
            score: aiScore,
            humanScore: 100 - aiScore,
            words: words.length,
            sentences: sentences.length,
            burstiness: stdDev.toFixed(1)
        };
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Analyze Text for AI Patterns</label>
            <textarea aria-label="Analyze Text for AI Patterns"
                x-model="text"
                rows="8"
                placeholder="Paste articles, essays, or paragraphs to evaluate statistical burstiness and perplexity heuristics..."
                class="textarea textarea-bordered w-full rounded-[16px] text-base leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary"
            ></textarea>
        </div>

        <template x-if="metrics">
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                        <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">AI Probability Score</span>
                        <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="metrics.score + '%'"></p>
                        <p class="text-xs text-white/70 mt-2">Likelihood of algorithmic generation</p>
                    </div>

                    <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                        <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Human Probability</span>
                        <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-[#9fe870]" x-text="metrics.humanScore + '%'"></p>
                        <p class="text-xs text-base-content/60 mt-2" x-text="'Sentence length burstiness index: ' + metrics.burstiness"></p>
                    </div>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: AI vs. Human Text Signatures Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                AI vs. Human Writing Signatures, Perplexity &amp; Burstiness Diagnostic Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Stylistic Marker</th>
                            <th>AI Model Generated (GPT-4 / Claude)</th>
                            <th>Human Author Composition</th>
                            <th>Statistical Diagnostic Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Sentence Length Variance (Burstiness)</td>
                            <td class="font-mono">Uniform (std dev &lt; 4.0 words)</td>
                            <td class="font-mono font-bold text-success">High variance (mix of 3 to 35+ words)</td>
                            <td>Calculates standard deviation across sentence tokens</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Vocabulary Perplexity</td>
                            <td class="font-mono">Low (Picks highest probability tokens)</td>
                            <td class="font-mono font-bold text-success">High (Uses idiosyncratic idioms &amp; slang)</td>
                            <td>Evaluates cross-entropy loss against n-gram models</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Transitional Connectors</td>
                            <td class="font-mono text-warning">Heavy (&ldquo;Moreover&rdquo;, &ldquo;Delve&rdquo;, &ldquo;In summary&rdquo;)</td>
                            <td class="font-mono">Varied, organic contextual pivots</td>
                            <td>Frequency count of stereotyped discourse markers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Paragraph Rhythm &amp; Cadence</td>
                            <td class="font-mono">Balanced 3–4 sentence blocks</td>
                            <td class="font-mono">Erratic (one-line zingers, asymmetric blocks)</td>
                            <td>Paragraph token distribution histogram</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Emotional Nuance &amp; Vulnerability</td>
                            <td class="font-mono">Neutral, cautious, balanced viewpoint</td>
                            <td class="font-mono font-bold">Strong personal stance, humor, typos</td>
                            <td>Sentiment polarization &amp; tonal subjectivity index</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
