<x-tool-paper x-data="{
    text: 'Type or paste your text here to count words, characters, sentences, paragraphs, and reading time in real time...',
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
</x-tool-paper>
