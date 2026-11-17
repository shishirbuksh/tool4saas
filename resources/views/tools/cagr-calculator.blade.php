<x-card class="p-6 md:p-8" x-data="{
    initialValue: 10000,
    finalValue: 25000,
    years: 5,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('initial')) this.initialValue = parseFloat(params.get('initial')) || this.initialValue;
        if (params.has('final')) this.finalValue = parseFloat(params.get('final')) || this.finalValue;
        if (params.has('years')) this.years = parseFloat(params.get('years')) || this.years;
    },
    setPreset(initial, final, years) {
        this.initialValue = initial;
        this.finalValue = final;
        this.years = years;
    },

    get cagr() {
        const init = Math.max(0.01, parseFloat(this.initialValue) || 0);
        const fin = Math.max(0, parseFloat(this.finalValue) || 0);
        const y = Math.max(0.01, parseFloat(this.years) || 1);
        if (fin <= 0) return 0;
        return ((Math.pow(fin / init, 1 / y) - 1) * 100);
    },

    get totalReturn() {
        const init = Math.max(0.01, parseFloat(this.initialValue) || 0);
        const fin = Math.max(0, parseFloat(this.finalValue) || 0);
        return ((fin - init) / init) * 100;
    },

    get absoluteGain() {
        const init = parseFloat(this.initialValue) || 0;
        const fin = parseFloat(this.finalValue) || 0;
        return Math.max(0, fin - init);
    },

    get multiplier() {
        const init = Math.max(0.01, parseFloat(this.initialValue) || 0);
        const fin = Math.max(0, parseFloat(this.finalValue) || 0);
        return (fin / init).toFixed(2);
    },

    get yearlySchedule() {
        const schedule = [];
        const init = Math.max(0.01, parseFloat(this.initialValue) || 0);
        const rate = this.cagr / 100;
        const totalYears = Math.min(50, Math.max(1, Math.round(parseFloat(this.years) || 1)));
        let balance = init;

        for (let i = 1; i <= totalYears; i++) {
            const start = balance;
            balance = start * (1 + rate);
            schedule.push({
                year: i,
                opening: start,
                growth: balance - start,
                closing: balance
            });
        }
        return schedule;
    }
}">
    <div class="space-y-8">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular CAGR Benchmarks:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(10000, 20000, 5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    2x in 5 Yrs (14.87% CAGR)
                </button>
                <button type="button" @click="setPreset(10000, 30000, 7)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    3x in 7 Yrs (16.99% CAGR)
                </button>
                <button type="button" @click="setPreset(10000, 100000, 10)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    10x in 10 Yrs (25.89% CAGR)
                </button>
                <button type="button" @click="setPreset(10000, 26000, 10)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Index Fund ($10k ➔ $26k in 10 Yrs)
                </button>
            </div>
        </div>

        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="cagr-initial" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Initial Investment ($)
                </label>
                <input
                    id="cagr-initial"
                    type="number"
                    x-model.number="initialValue"
                    min="1"
                    step="500"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Beginning portfolio value</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="cagr-final" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Final Investment ($)
                </label>
                <input
                    id="cagr-final"
                    type="number"
                    x-model.number="finalValue"
                    min="0"
                    step="500"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Ending portfolio value</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="cagr-years" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Duration (Years)
                </label>
                <input
                    id="cagr-years"
                    type="number"
                    x-model.number="years"
                    min="0.1"
                    max="50"
                    step="0.5"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Holding period in years</span>
            </div>
        </div>

        {{-- Results Highlight Card (Wise Polarity-Flipped Dark Surface) --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Compound Annual Rate</span>
                    <span class="text-4xl sm:text-5xl font-black text-primary tabular-nums mt-1 block" x-text="cagr.toFixed(2) + '%'"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Annualized growth rate</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Total Return</span>
                    <span class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block" x-text="totalReturn.toFixed(1) + '%'"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Cumulative gain</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Absolute Profit</span>
                    <span class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block" x-text="'$' + Math.round(absoluteGain).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Capital appreciation</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Capital Multiplier</span>
                    <span class="text-3xl sm:text-4xl font-black text-primary tabular-nums mt-1 block" x-text="multiplier + 'x'"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Growth multiple</span>
                </div>
            </div>
        </div>

        {{-- Year-by-Year Growth Table --}}
        <div class="space-y-3">
            <h3 class="font-bold text-lg text-base-content font-display">Year-by-Year Compounding Breakdown</h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Year</th>
                            <th>Opening Value</th>
                            <th>Yearly Gain</th>
                            <th>Ending Value</th>
                        </tr>
                    </thead>
                    <tbody class="font-mono">
                        <template x-for="row in yearlySchedule" :key="row.year">
                            <tr>
                                <td class="font-bold text-base-content" x-text="'Year ' + row.year"></td>
                                <td class="tabular-nums" x-text="'$' + Math.round(row.opening).toLocaleString()"></td>
                                <td class="tabular-nums text-success font-semibold" x-text="'+$' + Math.round(row.growth).toLocaleString()"></td>
                                <td class="tabular-nums font-bold text-base-content" x-text="'$' + Math.round(row.closing).toLocaleString()"></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        {{-- Trust Banner --}}
        <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span class="text-primary font-bold">✓ Standard Financial Mathematics</span>
            <span class="text-[#868685]">Formula: ((Final / Initial) ^ (1 / Years)) - 1. Computes 100% locally.</span>
        </div>
    </div>
</x-card>
