<x-card class="p-6 md:p-8" x-data="{
    originalVal: 100,
    newVal: 150,

    get change() {
        const orig = parseFloat(this.originalVal);
        const nw = parseFloat(this.newVal);
        if (isNaN(orig) || isNaN(nw) || orig === 0) return 0;
        return ((nw - orig) / Math.abs(orig)) * 100;
    },

    get difference() {
        const orig = parseFloat(this.originalVal) || 0;
        const nw = parseFloat(this.newVal) || 0;
        return nw - orig;
    },

    get isIncrease() {
        return this.difference >= 0;
    },

    get ratio() {
        const orig = parseFloat(this.originalVal);
        const nw = parseFloat(this.newVal);
        if (isNaN(orig) || isNaN(nw) || orig === 0) return 1;
        return (nw / orig).toFixed(2);
    }
}">
    <div class="space-y-8">
        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="pct-orig" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Original Value (From)
                </label>
                <input
                    id="pct-orig"
                    type="number"
                    step="any"
                    x-model.number="originalVal"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-2xl tabular-nums"
                />
                <span class="text-xs text-base-content/50 mt-1.5 block">Starting quantity or benchmark</span>
            </div>

            <div class="p-6 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="pct-new" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    New Value (To)
                </label>
                <input
                    id="pct-new"
                    type="number"
                    step="any"
                    x-model.number="newVal"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-2xl tabular-nums"
                />
                <span class="text-xs text-base-content/50 mt-1.5 block">Ending quantity or final measurement</span>
            </div>
        </div>

        {{-- Results Highlight Card (Wise Polarity-Flipped Dark Surface) --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Percentage Change</span>
                    <div class="flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <span
                            class="text-4xl sm:text-5xl font-black tabular-nums"
                            :class="isIncrease ? 'text-primary' : 'text-error'"
                            x-text="(isIncrease ? '+' : '') + change.toFixed(2) + '%'"
                        ></span>
                    </div>
                    <span class="text-xs text-[#868685] mt-1 block" x-text="isIncrease ? '▲ Net Percentage Increase' : '▼ Net Percentage Decrease'"></span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Absolute Difference</span>
                    <span
                        class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block"
                        x-text="(difference >= 0 ? '+' : '') + difference.toLocaleString()"
                    ></span>
                    <span class="text-xs text-[#868685] mt-1 block">New Value minus Original Value</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Multiplication Factor</span>
                    <span class="text-3xl sm:text-4xl font-black text-primary tabular-nums mt-1 block" x-text="ratio + 'x'"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Relative multiple</span>
                </div>
            </div>
        </div>

        {{-- Step-by-Step Explanation --}}
        <div class="p-6 rounded-3xl bg-base-200/50 border border-base-300 space-y-3 font-mono text-xs sm:text-sm">
            <h4 class="font-bold text-base text-base-content font-display">Mathematical Step-by-Step Solution:</h4>
            <div class="space-y-1.5 text-base-content/80">
                <p><strong>Step 1:</strong> Calculate the difference = <span class="bg-base-100 px-2 py-0.5 rounded-lg border border-base-300" x-text="newVal + ' - ' + originalVal + ' = ' + difference"></span></p>
                <p><strong>Step 2:</strong> Divide difference by original value = <span class="bg-base-100 px-2 py-0.5 rounded-lg border border-base-300" x-text="difference + ' / ' + Math.abs(originalVal) + ' = ' + (originalVal != 0 ? (difference / Math.abs(originalVal)).toFixed(4) : 0)"></span></p>
                <p><strong>Step 3:</strong> Multiply by 100 for percentage = <span class="bg-base-100 px-2 py-0.5 rounded-lg border border-base-300 font-bold text-primary" x-text="change.toFixed(2) + '%'"></span></p>
            </div>
        </div>

        {{-- Trust Banner --}}
        <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span class="text-primary font-bold">✓ Standard Mathematical Formula</span>
            <span class="text-[#868685]">Formula: ((New - Original) / |Original|) × 100. Computes locally in real time.</span>
        </div>
    </div>
</x-card>
