<x-tool-paper x-data="{
    text: '',
    ratio: 30,
    copied: false,
    sampleText: 'Artificial intelligence and local-first software are reshaping how developers build productivity tools. In traditional web applications, sensitive user documents, invoices, and credentials are sent to remote servers for processing. This architectural model introduces significant privacy liabilities, compliance headaches, and potential security vulnerabilities. Local-first tools solve this dilemma by running computation directly inside the user browser tab. Modern browser APIs like Web Crypto, Canvas, and WebAssembly deliver near-native speeds while keeping confidential data on the user device. As regulatory scrutiny around data residency intensifies, client-side productivity software provides unmatched peace of mind for freelancers and enterprise teams alike.',
    get stats() {
        const trimmed = this.text.trim();
        if (!trimmed) {
            return { summary: '', totalSentences: 0, summarySentences: 0, originalWords: 0, summaryWords: 0 };
        }

        const raw = trimmed.match(/[^.!?]+[.!?]+/g);
        const sentences = raw ? raw.map(s => s.trim()).filter(Boolean) : [trimmed];
        const total = sentences.length;

        const words = trimmed.toLowerCase().split(/\W+/).filter(Boolean);
        const freq = {};
        for (const w of words) {
            freq[w] = (freq[w] || 0) + 1;
        }

        const scored = sentences.map((sentence, index) => {
            const sWords = sentence.toLowerCase().split(/\W+/).filter(Boolean);
            let score = 0;
            for (const w of sWords) {
                score += (freq[w] || 0);
            }
            return { sentence, score, index };
        });

        const n = Math.max(1, Math.ceil((total * (parseInt(this.ratio, 10) || 30)) / 100));
        const topByScore = [...scored]
            .sort((a, b) => b.score - a.score)
            .slice(0, n)
            .sort((a, b) => a.index - b.index);

        const result = topByScore.map(s => s.sentence).join(' ');
        const sumWords = result.split(/\W+/).filter(Boolean).length;

        return {
            summary: result,
            totalSentences: total,
            summarySentences: topByScore.length,
            originalWords: words.length,
            summaryWords: sumWords
        };
    },
    loadSample() {
        this.text = this.sampleText;
    },
    clear() {
        this.text = '';
    },
    copy() {
        if (!this.stats.summary) return;
        navigator.clipboard.writeText(this.stats.summary);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        {{-- Header Controls --}}
        <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="text-sm font-bold text-base-content font-display">Source Document</span>
            <div class="flex items-center gap-2">
                <button
                    type="button"
                    @click="loadSample()"
                    class="px-3.5 py-1.5 rounded-full bg-base-200 hover:bg-base-300 text-xs font-semibold text-base-content transition-colors"
                >
                    Paste Sample Text
                </button>
                <button
                    type="button"
                    @click="clear()"
                    class="px-3.5 py-1.5 rounded-full text-xs font-semibold text-error hover:bg-error/10 transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>

        {{-- Text Input Area --}}
        <textarea
            x-model="text"
            rows="8"
            placeholder="Paste your long article, essay, report or meeting notes here to extract key takeaways..."
            class="textarea textarea-bordered rounded-3xl w-full text-base p-5 leading-relaxed bg-base-100"
        ></textarea>

        {{-- Summary Ratio Slider Card --}}
        <div class="p-6 rounded-3xl bg-base-200/60 border border-base-300">
            <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Summary Ratio</span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-content font-bold text-xs">
                    <span x-text="ratio"></span>% length
                </span>
            </div>
            <input
                type="range"
                min="10"
                max="60"
                step="5"
                x-model.number="ratio"
                class="range range-primary range-sm w-full"
            />
            <div class="flex justify-between text-[11px] font-mono text-base-content/50 mt-2">
                <span>10% (Concise)</span>
                <span>30% (Standard)</span>
                <span>60% (Detailed)</span>
            </div>
        </div>

        {{-- Live Extracted Summary Result --}}
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                    Extractive Summary
                    <template x-if="stats.summarySentences > 0">
                        <span class="text-base-content font-bold">
                            (<span x-text="stats.summarySentences"></span> of <span x-text="stats.totalSentences"></span> sentences)
                        </span>
                    </template>
                </span>
                <button
                    type="button"
                    @click="copy()"
                    :disabled="!stats.summary"
                    class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-xs sm:text-sm transition-all shadow-xs disabled:opacity-50"
                >
                    <span x-text="copied ? 'Copied!' : 'Copy Summary'"></span>
                </button>
            </div>

            <div class="p-6 sm:p-7 rounded-3xl bg-base-200/50 border border-base-300 min-h-[140px] leading-relaxed text-base text-base-content">
                <template x-if="stats.summary">
                    <p class="leading-relaxed" x-text="stats.summary"></p>
                </template>
                <template x-if="!stats.summary">
                    <div class="text-base-content/50 text-sm flex items-center justify-center py-8">
                        Enter text above to generate a client-side extractive summary. Sentences are ranked by keyword frequency without sending data to any external server.
                    </div>
                </template>
            </div>
        </div>

        {{-- Summary Stats Pills --}}
        <template x-if="stats.summary">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                <div class="p-4 rounded-2xl bg-base-100 border border-base-300 shadow-xs">
                    <span class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Original Words</span>
                    <div class="text-xl font-black text-base-content mt-1 tabular-nums" x-text="stats.originalWords"></div>
                </div>
                <div class="p-4 rounded-2xl bg-base-100 border border-base-300 shadow-xs">
                    <span class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Summary Words</span>
                    <div class="text-xl font-black text-base-content mt-1 tabular-nums" x-text="stats.summaryWords"></div>
                </div>
                <div class="p-4 rounded-2xl bg-base-100 border border-base-300 shadow-xs">
                    <span class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Reduction</span>
                    <div class="text-xl font-black text-[#2ead4b] mt-1 tabular-nums">
                        -<span x-text="Math.round((1 - (stats.summaryWords / (stats.originalWords || 1))) * 100)"></span>%
                    </div>
                </div>
                <div class="p-4 rounded-2xl bg-base-100 border border-base-300 shadow-xs">
                    <span class="text-[11px] font-bold text-base-content/60 uppercase font-mono">Processing</span>
                    <div class="text-xl font-black text-primary mt-1">100% Local</div>
                </div>
            </div>
        </template>
    </div>
</x-tool-paper>
