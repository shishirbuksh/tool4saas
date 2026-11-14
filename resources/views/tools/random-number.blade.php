<x-tool-paper x-data="{
    minVal: 1,
    maxVal: 100,
    count: 5,
    unique: false,
    results: [],
    copied: false,
    generate() {
        const lo = Math.min(parseInt(this.minVal, 10) || 1, parseInt(this.maxVal, 10) || 100);
        const hi = Math.max(parseInt(this.minVal, 10) || 1, parseInt(this.maxVal, 10) || 100);
        const n = Math.max(1, Math.min(100, parseInt(this.count, 10) || 1));
        const range = hi - lo + 1;

        const out = [];
        const arr = new Uint32Array(1);

        const getRand = () => {
            window.crypto.getRandomValues(arr);
            return lo + (arr[0] % range);
        };

        if (this.unique && n <= range) {
            const seen = new Set();
            while (seen.size < n) {
                seen.add(getRand());
            }
            out.push(...seen);
        } else {
            for (let i = 0; i < n; i++) {
                out.push(getRand());
            }
        }

        this.results = out;
    },
    copy() {
        if (!this.results.length) return;
        navigator.clipboard.writeText(this.results.join(', '));
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    init() {
        this.generate();
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Minimum Value</label>
                <input type="number" x-model.number="minVal" class="input input-bordered rounded-xl w-full text-base font-bold tabular-nums" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Maximum Value</label>
                <input type="number" x-model.number="maxVal" class="input input-bordered rounded-xl w-full text-base font-bold tabular-nums" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Quantity (How Many)</label>
                <input type="number" min="1" max="100" x-model.number="count" class="input input-bordered rounded-xl w-full text-base font-bold tabular-nums" />
            </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-base-200/60 border border-base-300">
            <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" x-model="unique" class="checkbox checkbox-primary checkbox-sm" />
                <span class="text-xs font-bold text-base-content">Unique Numbers Only (No Duplicates)</span>
            </label>
            <button
                type="button"
                @click="generate()"
                class="px-6 py-2.5 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
                Generate Numbers →
            </button>
        </div>

        {{-- Results Area (Wise Polarity-Flipped Dark Hero Card) --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">
                    Cryptographically Secure Output (<span x-text="results.length"></span> Generated)
                </span>
                <button
                    type="button"
                    @click="copy()"
                    class="px-3.5 py-1 rounded-full bg-[#161a14] border border-[#343d2e] hover:bg-[#242a20] text-primary text-xs font-bold transition-all"
                >
                    <span x-text="copied ? 'Copied!' : 'Copy List'"></span>
                </button>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3">
                <template x-for="(num, idx) in results" :key="idx">
                    <span class="px-5 py-3 rounded-2xl bg-[#161a14] border border-[#242a20] text-primary text-2xl sm:text-3xl font-black font-display tabular-nums shadow-xs" x-text="num"></span>
                </template>
            </div>

            <p class="text-xs text-[#868685] font-mono mt-5">Entropy sourced via browser Web Crypto CSPRNG API.</p>
        </div>
    </div>
</x-tool-paper>
