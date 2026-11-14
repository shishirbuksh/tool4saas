<x-tool-paper x-data="{
    text: 'Tool4SaaS provides 100% private, local-first in-browser tools. Compute occurs directly within WebAssembly, Alpine.js, and client memory.',
    models: [
        { name: 'GPT-4o', price: 2.50 },
        { name: 'Claude 3.5 Sonnet', price: 3.00 },
        { name: 'Gemini 1.5 Flash', price: 0.075 },
        { name: 'GPT-4o-mini', price: 0.15 }
    ],
    get chars() {
        return this.text.length;
    },
    get words() {
        return this.text.trim() ? this.text.trim().split(/\s+/).length : 0;
    },
    get tokens() {
        if (!this.text.trim()) return 0;
        const codeBoost = /[{}\[\]();=<>:/\\]{3,}|function |const |import |def |class /.test(this.text) ? 1.15 : 1;
        return Math.ceil((this.chars / 4) * codeBoost);
    },
    calcCost(pricePerM) {
        return ((this.tokens / 1000000) * pricePerM).toFixed(6);
    }
}">
    <div class="space-y-6">
        <div>
            <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Prompt / Document Input</label>
                <span class="text-xs text-base-content/50 font-mono">
                    <span x-text="chars"></span> chars · <span x-text="words"></span> words
                </span>
            </div>
            <textarea
                x-model="text"
                rows="8"
                placeholder="Paste prompt, code, or article text here..."
                class="textarea textarea-bordered rounded-3xl w-full text-sm font-mono p-5 bg-base-100 leading-relaxed"
            ></textarea>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Estimated Token Count</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="tokens.toLocaleString()"></span> <span class="text-2xl font-mono text-white">tokens</span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Calibrated against OpenAI tiktoken (cl100k) &amp; Anthropic Claude BPE tokenizer heuristics
            </p>
        </div>

        {{-- Cost Across Leading LLM APIs --}}
        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block">Estimated API Input Cost Comparison</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <template x-for="m in models" :key="m.name">
                    <div class="p-4 rounded-2xl bg-base-200/60 border border-base-300 space-y-1">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold font-mono text-base-content" x-text="m.name"></span>
                            <span class="text-[10px] text-base-content/50 font-mono" x-text="'$' + m.price + '/M'"></span>
                        </div>
                        <div class="text-xl font-black text-primary font-mono tabular-nums">
                            $<span x-text="calcCost(m.price)"></span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</x-tool-paper>
