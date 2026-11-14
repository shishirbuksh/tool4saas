<x-tool-paper x-data="{
    result: null,
    flipping: false,
    history: [],
    flip() {
        if (this.flipping) return;
        this.flipping = true;
        const buf = new Uint32Array(1);
        crypto.getRandomValues(buf);
        const outcome = (buf[0] % 2 === 0) ? 'Heads' : 'Tails';
        setTimeout(() => {
            this.result = outcome;
            this.history.unshift({ id: this.history.length + 1, outcome: outcome });
            this.flipping = false;
        }, 400);
    },
    get headsCount() {
        return this.history.filter(h => h.outcome === 'Heads').length;
    },
    get tailsCount() {
        return this.history.filter(h => h.outcome === 'Tails').length;
    },
    get streak() {
        if (!this.history.length) return null;
        const last = this.history[0].outcome;
        let count = 0;
        for (const h of this.history) {
            if (h.outcome === last) count++;
            else break;
        }
        return { outcome: last, count: count };
    },
    reset() {
        this.result = null;
        this.history = [];
    }
}">
    <div class="space-y-6">
        {{-- Coin Flip Dark Hero Card --}}
        <div class="p-8 sm:p-12 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">CSPRNG Cryptographic Coin Toss</span>
            
            <div class="my-6 flex justify-center">
                <div
                    class="size-32 rounded-full border-4 border-primary bg-[#163300] flex items-center justify-center text-3xl font-black text-primary font-display shadow-lg transition-transform duration-300"
                    :class="flipping ? 'animate-bounce scale-95' : 'scale-100'"
                >
                    <span x-text="flipping ? '...' : (result || 'Flip')"></span>
                </div>
            </div>

            <div class="flex items-center justify-center gap-3 pt-2">
                <button
                    type="button"
                    @click="flip()"
                    :disabled="flipping"
                    class="px-8 py-3.5 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-sm font-bold transition-all shadow-sm disabled:opacity-50"
                >
                    Flip Coin
                </button>
                <button
                    type="button"
                    @click="reset()"
                    :disabled="!history.length"
                    class="px-5 py-3.5 rounded-full bg-transparent border border-[#242a20] text-[#868685] hover:text-white text-sm font-bold transition-all disabled:opacity-40"
                >
                    Reset Stats
                </button>
            </div>
        </div>

        {{-- Stats Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Heads (Total)</span>
                <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums">
                    <span x-text="headsCount"></span>
                    <span class="text-xs font-mono font-normal text-base-content/60" x-text="history.length ? '(' + Math.round((headsCount / history.length) * 100) + '%)' : ''"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Tails (Total)</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="tailsCount"></span>
                    <span class="text-xs font-mono font-normal text-base-content/60" x-text="history.length ? '(' + Math.round((tailsCount / history.length) * 100) + '%)' : ''"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Active Streak</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display" x-text="streak ? streak.count + ' ' + streak.outcome : 'None'"></div>
            </div>
        </div>

        {{-- Recent Flips Feed --}}
        <template x-if="history.length > 0">
            <div class="p-5 rounded-2xl bg-base-100 border border-base-300">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-3">Recent 10 Flips</span>
                <div class="flex flex-wrap gap-2">
                    <template x-for="h in history.slice(0, 10)" :key="h.id">
                        <span class="px-3 py-1 rounded-full text-xs font-bold font-mono" :class="h.outcome === 'Heads' ? 'bg-primary/20 text-primary-content border border-primary/40' : 'bg-base-200 text-base-content border border-base-300'" x-text="'#' + h.id + ' ' + h.outcome"></span>
                    </template>
                </div>
            </div>
        </template>
    </div>
</x-tool-paper>
