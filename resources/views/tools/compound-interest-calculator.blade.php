<x-tool-paper x-data="{
    principal: 10000,
    rate: 8,
    years: 5,
    freq: 12,
    currency: 'USD',
    currencySymbol: '$',
    get totalAmount() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        const r = Math.max(0, parseFloat(this.rate) || 0) / 100;
        const y = Math.max(0, parseFloat(this.years) || 0);
        const n = parseInt(this.freq, 10) || 1;
        if (!p || !y) return 0;
        return p * Math.pow(1 + (r / n), n * y);
    },
    get interestEarned() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        return Math.max(0, this.totalAmount - p);
    },
    updateCurrency(code, symbol) {
        this.currency = code;
        this.currencySymbol = symbol;
    }
}">
    <div class="space-y-6">
        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Principal Deposit" model="principal" prefix="$" placeholder="10000" />
            <x-numeric-field label="Annual Rate (%)" model="rate" suffix="%" step="0.1" placeholder="8.0" />
            <x-numeric-field label="Investment Term" model="years" suffix="Yrs" min="1" max="50" placeholder="5" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Frequency</span></label>
                <select x-model.number="freq" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="1">Annually (1x/yr)</option>
                    <option value="2">Semi-Annually (2x/yr)</option>
                    <option value="4">Quarterly (4x/yr)</option>
                    <option value="12">Monthly (12x/yr)</option>
                    <option value="365">Daily (365x/yr)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Card --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Projected Total Balance</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="Math.round(totalAmount).toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Includes <span class="font-bold text-white"><span x-text="currencySymbol"></span><span x-text="Math.round(interestEarned).toLocaleString()"></span></span> compound interest over <span x-text="years"></span> years
            </p>
        </div>

        {{-- Growth Breakdown Cards --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Starting Principal</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="Number(principal).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Interest</span>
                <div class="text-2xl font-black text-[#2ead4b] mt-1 font-display tabular-nums">
                    +<span x-text="currencySymbol"></span><span x-text="Math.round(interestEarned).toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Growth</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    +<span x-text="principal > 0 ? Math.round((interestEarned / principal) * 100) : 0"></span>%
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
