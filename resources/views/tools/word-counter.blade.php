<x-tool-paper x-data="{
    text: 'Type or paste your text here to count words, characters, sentences, paragraphs, and reading time in real time...',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('text')) this.text = decodeURIComponent(params.get('text') || '').trim() || this.text;
    },
    setText(t) {
        this.text = t;
    },
    get words() {
        if (!this.text.trim()) return 0;
        return this.text.trim().split(/\s+/).filter(Boolean).length;
    },
    get chars() {
        return this.text.length;
    },
    get charsNoSpaces() {
        return this.text.replace(/\s/g, '').length;
    },
    get sentences() {
        if (!this.text.trim()) return 0;
        const matches = this.text.match(/[.!?]+(\s|$)/g);
        return matches ? matches.length : (this.text.trim().length > 0 ? 1 : 0);
    },
    get paragraphs() {
        if (!this.text.trim()) return 0;
        return this.text.split(/\n+/).filter(p => p.trim().length > 0).length;
    },
    get readingMinutes() {
        return Math.max(1, Math.ceil(this.words / 225));
    },
    get speakingMinutes() {
        return Math.max(1, Math.ceil(this.words / 130));
    },
    clear() {
        this.text = '';
    }
}">
    {{-- Platform Character Limit Chips --}}
    <div class="mb-3">
        <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-1.5">Platform Character Limits:</span>
        <div class="flex flex-wrap gap-2">
            <button type="button" @click="setText('Exploring the frontiers of agentic AI workflows and client-side computational architecture. Building ultra-fast private utilities with zero data egress. #AI #SaaS')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                Twitter/X Post (280 Max)
            </button>
            <button type="button" @click="setText('Tool4SaaS — 100% Free, Private Online Tools for SaaS Founders & Developers')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                SEO Meta Title (60 Max)
            </button>
            <button type="button" @click="setText('Access 135+ free, private developer and business tools online. 100% client-side execution with zero sign up required. Fast, responsive, and secure.')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                SEO Meta Description (160 Max)
            </button>
        </div>
    </div>

    <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-bold text-base-content font-display">Document Input</span>
        <div class="flex items-center gap-2">
            <button
                type="button"
                @click="clear()"
                class="px-3 py-1 rounded-full text-xs font-semibold text-error hover:bg-error/10 transition-colors"
            >
                Clear Text
            </button>
        </div>
    </div>

    <textarea
        x-model="text"
        rows="9"
        placeholder="Start typing or paste content..."
        class="textarea textarea-bordered rounded-3xl w-full text-base font-normal leading-relaxed mb-6 p-5 bg-base-100"
    ></textarea>

    {{-- Realtime Stats Grid (Wise Feature Cards) --}}
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-center">
        {{-- Hero Stat: Words in Polarity-Flipped Dark Card --}}
        <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-xs">
            <div class="text-[11px] font-bold text-[#868685] uppercase tracking-wider font-mono">Words</div>
            <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums" x-text="words.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Characters</div>
            <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums" x-text="chars.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">No Spaces</div>
            <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums" x-text="charsNoSpaces.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Sentences</div>
            <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums" x-text="sentences.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Paragraphs</div>
            <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums" x-text="paragraphs.toLocaleString()"></div>
        </div>
        <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
            <div class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Reading Time</div>
            <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums"><span x-text="readingMinutes"></span>m</div>
        </div>
    </div>

    {{-- Technical Comparison: Word Count Reference Matrix --}}
    <div class="mt-8 pt-6 border-t border-base-300">
        <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
            Word Count to Reading &amp; Speaking Time Reference Matrix
        </h3>
        <div class="overflow-x-auto rounded-3xl border border-base-300">
            <table class="table table-zebra w-full text-xs sm:text-sm">
                <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                    <tr>
                        <th>Word Count</th>
                        <th>Silent Reading (238 WPM)</th>
                        <th>Speech / Speaking (130 WPM)</th>
                        <th>Typical Document Format</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-bold font-mono">250 Words</td>
                        <td class="font-mono">~1.0 Min</td>
                        <td class="font-mono">~1.9 Mins</td>
                        <td>Executive summary, LinkedIn thought-piece, email memo</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">500 Words</td>
                        <td class="font-mono">~2.1 Mins</td>
                        <td class="font-mono">~3.8 Mins</td>
                        <td>Standard 1-page essay, press release, short newsletter</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">1,000 Words</td>
                        <td class="font-mono">~4.2 Mins</td>
                        <td class="font-mono">~7.7 Mins</td>
                        <td>Technical tutorial, SEO blog article, 2-page document</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">1,500 Words</td>
                        <td class="font-mono">~6.3 Mins</td>
                        <td class="font-mono">~11.5 Mins</td>
                        <td>Deep-dive product review, case study, pillar post</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">2,500 Words</td>
                        <td class="font-mono">~10.5 Mins</td>
                        <td class="font-mono">~19.2 Mins</td>
                        <td>Undergraduate research paper, industry whitepaper</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono">5,000 Words</td>
                        <td class="font-mono">~21.0 Mins</td>
                        <td class="font-mono">~38.5 Mins</td>
                        <td>Master handbook, long-form eBook chapter, thesis</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</x-tool-paper>
