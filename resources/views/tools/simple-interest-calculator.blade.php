<x-card class="p-6 md:p-8" x-data="{
    principal: 10000,
    rate: 6.5,
    time: 3,
    timeUnit: 'years',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('principal')) this.principal = parseFloat(params.get('principal')) || this.principal;
        if (params.has('rate')) this.rate = parseFloat(params.get('rate')) || this.rate;
        if (params.has('time')) this.time = parseFloat(params.get('time')) || this.time;
        if (params.has('unit') && ['years', 'months', 'days'].includes(params.get('unit'))) this.timeUnit = params.get('unit');
    },
    setPreset(principal, rate, time, unit) {
        this.principal = principal;
        this.rate = rate;
        this.time = time;
        if (unit) this.timeUnit = unit;
    },

    get timeInYears() {
        const t = Math.max(0, parseFloat(this.time) || 0);
        if (this.timeUnit === 'months') return t / 12;
        if (this.timeUnit === 'days') return t / 365;
        return t;
    },

    get interest() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        const r = Math.max(0, parseFloat(this.rate) || 0);
        const t = this.timeInYears;
        return (p * r * t) / 100;
    },

    get totalAmount() {
        const p = Math.max(0, parseFloat(this.principal) || 0);
        return p + this.interest;
    },

    get monthlyInterest() {
        if (this.timeInYears <= 0) return 0;
        return this.interest / (this.timeInYears * 12);
    },

    get dailyInterest() {
        if (this.timeInYears <= 0) return 0;
        return this.interest / (this.timeInYears * 365);
    }
}">
    <div class="space-y-8">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Scenarios:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(10000, 6.5, 3, 'years')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Standard Deposit ($10k @ 6.5% 3 Yrs)
                </button>
                <button type="button" @click="setPreset(5000, 8.0, 6, 'months')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Short-Term Bridge ($5k @ 8% 6 Mos)
                </button>
                <button type="button" @click="setPreset(25000, 5.0, 5, 'years')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    High Yield ($25k @ 5% 5 Yrs)
                </button>
                <button type="button" @click="setPreset(2000, 12.0, 1, 'years')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    P2P Microloan ($2k @ 12% 1 Yr)
                </button>
            </div>
        </div>

        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="si-principal" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Principal Amount ($)
                </label>
                <input
                    id="si-principal"
                    type="number"
                    x-model.number="principal"
                    min="1"
                    step="100"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Initial deposit or loan</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="si-rate" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Annual Interest Rate (%)
                </label>
                <input
                    id="si-rate"
                    type="number"
                    x-model.number="rate"
                    min="0"
                    max="100"
                    step="0.25"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Percentage per annum</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <div class="flex items-center justify-between mb-2">
                    <label for="si-time" class="block text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Time Duration
                    </label>
                    <select aria-label="Time Duration" x-model="timeUnit" class="select select-ghost select-xs font-bold uppercase text-[11px] text-[#163300] dark:text-[#9fe870]">
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                    </select>
                </div>
                <input
                    id="si-time"
                    type="number"
                    x-model.number="time"
                    min="0.1"
                    step="1"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block" x-text="'Period in ' + timeUnit"></span>
            </div>
        </div>

        {{-- Results Highlight Card (Wise Polarity-Flipped Dark Surface) --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Simple Interest</span>
                    <span class="text-4xl sm:text-5xl font-black text-primary tabular-nums mt-1 block" x-text="'$' + Math.round(interest).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Total interest earned / owed</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Total Maturity Amount</span>
                    <span class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block" x-text="'$' + Math.round(totalAmount).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Principal + Interest</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Monthly Interest</span>
                    <span class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block" x-text="'$' + monthlyInterest.toFixed(2)"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Average per month</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Daily Interest</span>
                    <span class="text-3xl sm:text-4xl font-black text-primary tabular-nums mt-1 block" x-text="'$' + dailyInterest.toFixed(2)"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Daily accrual rate</span>
                </div>
            </div>
        </div>

        {{-- Trust Banner --}}
        <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span class="text-primary font-bold">✓ Standard Simple Interest Formula</span>
            <span class="text-[#868685]">Formula: (P × R × T) / 100. Computes 100% locally. Zero cloud data storage.</span>
        </div>

        {{-- Technical Comparison: Simple vs Compound Interest --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Simple Interest vs. Compound Interest Comparison
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Interest Characteristic</th>
                            <th>Simple Interest (SI)</th>
                            <th>Compound Interest (CI)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Calculation Base</td>
                            <td>Accrues only on the original principal amount</td>
                            <td>Accrues on principal plus accumulated interest</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Growth Pattern</td>
                            <td>Constant, linear growth over time</td>
                            <td>Accelerating, exponential growth over time</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Standard Formula</td>
                            <td>SI = (Principal × Rate × Time) / 100</td>
                            <td>CI = Principal × (1 + Rate / n)^(n × Time) - Principal</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Common Applications</td>
                            <td>Short-term personal loans, auto loans, treasury bills</td>
                            <td>Savings accounts, index funds, retirement portfolios</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Total Yield Over 10+ Yrs</td>
                            <td>Lower total yield for fixed principal</td>
                            <td>Significantly higher total yield due to compounding</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
