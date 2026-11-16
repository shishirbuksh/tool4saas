<x-card class="p-6 md:p-8" x-data="{
    principal: 10000,
    rate: 6.5,
    time: 3,
    timeUnit: 'years',

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
                    <select x-model="timeUnit" class="select select-ghost select-xs font-bold uppercase text-[11px] text-primary">
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
    </div>
</x-card>
