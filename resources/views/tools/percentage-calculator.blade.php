<x-tool-paper x-data="{
    tab: 'percent',
    // Tab 1: X% of Y
    rate: 20,
    base: 150,
    get percentResult() {
        const r = parseFloat(this.rate) || 0;
        const b = parseFloat(this.base) || 0;
        return ((r / 100) * b).toFixed(2);
    },
    // Tab 2: What % is X of Y?
    partX: 30,
    wholeY: 150,
    get whatPercentResult() {
        const x = parseFloat(this.partX) || 0;
        const y = parseFloat(this.wholeY) || 0;
        if (y === 0) return '0.00';
        return ((x / y) * 100).toFixed(2);
    },
    // Tab 3: Percent Change
    oldVal: 150,
    newVal: 180,
    get changeResult() {
        const o = parseFloat(this.oldVal) || 0;
        const n = parseFloat(this.newVal) || 0;
        if (o === 0) return '0.00';
        const diff = n - o;
        return ((diff / o) * 100).toFixed(2);
    },
    // Tab 4: Percent Difference
    diffA: 60,
    diffB: 80,
    get diffResult() {
        const a = parseFloat(this.diffA) || 0;
        const b = parseFloat(this.diffB) || 0;
        const avg = (a + b) / 2;
        if (avg === 0) return '0.00';
        const diff = Math.abs(a - b);
        return ((diff / avg) * 100).toFixed(2);
    }
}">
    {{-- Wise Pill Tab Bar --}}
    <div class="flex flex-wrap gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-base-200 border border-base-300 mb-8">
        <button
            type="button"
            class="px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
            :class="tab === 'percent' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
            @click="tab = 'percent'"
        >
            Percentage Of (X% of Y)
        </button>
        <button
            type="button"
            class="px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
            :class="tab === 'what-percent' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
            @click="tab = 'what-percent'"
        >
            What % is X of Y?
        </button>
        <button
            type="button"
            class="px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
            :class="tab === 'change' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
            @click="tab = 'change'"
        >
            Percentage Change (Increase/Decrease)
        </button>
        <button
            type="button"
            class="px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
            :class="tab === 'difference' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
            @click="tab = 'difference'"
        >
            Percentage Difference
        </button>
    </div>

    {{-- Tab 1: Percentage of --}}
    <div x-show="tab === 'percent'" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <x-numeric-field label="Percentage Rate (%)" model="rate" placeholder="20" suffix="%" />
            <x-numeric-field label="Base Number" model="base" placeholder="150" />
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white text-center border border-[#242a20] shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Calculated Result</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums" x-text="percentResult"></div>
            <p class="text-xs text-[#868685] font-mono mt-2">
                Formula: (<span x-text="rate" class="text-white"></span> ÷ 100) × <span x-text="base" class="text-white"></span> = <span x-text="percentResult" class="text-primary font-bold"></span>
            </p>
        </div>
    </div>

    {{-- Tab 2: What % is X of Y --}}
    <div x-show="tab === 'what-percent'" class="space-y-6" style="display: none;">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <x-numeric-field label="Number X (Part)" model="partX" placeholder="30" />
            <x-numeric-field label="Number Y (Whole)" model="wholeY" placeholder="150" />
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white text-center border border-[#242a20] shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Calculated Percentage</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="whatPercentResult"></span>%
            </div>
            <p class="text-xs text-[#868685] font-mono mt-2">
                Formula: (<span x-text="partX" class="text-white"></span> ÷ <span x-text="wholeY" class="text-white"></span>) × 100 = <span x-text="whatPercentResult" class="text-primary font-bold"></span>%
            </p>
        </div>
    </div>

    {{-- Tab 3: Percentage Change --}}
    <div x-show="tab === 'change'" class="space-y-6" style="display: none;">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <x-numeric-field label="Initial Value (Old)" model="oldVal" placeholder="150" />
            <x-numeric-field label="Final Value (New)" model="newVal" placeholder="180" />
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white text-center border border-[#242a20] shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Calculated Percentage Change</span>
            <div class="text-4xl sm:text-6xl font-black my-2 font-display tabular-nums" :class="changeResult >= 0 ? 'text-[#9fe870]' : 'text-[#f87171]'">
                <span x-text="changeResult > 0 ? '+' : ''"></span><span x-text="changeResult"></span>%
            </div>
            <p class="text-xs text-[#868685] font-mono mt-2">
                Formula: ((<span x-text="newVal" class="text-white"></span> - <span x-text="oldVal" class="text-white"></span>) ÷ <span x-text="oldVal" class="text-white"></span>) × 100 = <span x-text="changeResult" class="font-bold text-primary"></span>%
            </p>
        </div>
    </div>

    {{-- Tab 4: Percentage Difference --}}
    <div x-show="tab === 'difference'" class="space-y-6" style="display: none;">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <x-numeric-field label="First Value (A)" model="diffA" placeholder="60" />
            <x-numeric-field label="Second Value (B)" model="diffB" placeholder="80" />
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white text-center border border-[#242a20] shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Calculated Percentage Difference</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="diffResult"></span>%
            </div>
            <p class="text-xs text-[#868685] font-mono mt-2">
                Formula: (|A - B| ÷ ((A + B) / 2)) × 100 = <span x-text="diffResult" class="text-primary font-bold"></span>%
            </p>
        </div>
    </div>
</x-tool-paper>
