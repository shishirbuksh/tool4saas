<x-card class="p-6 md:p-8" x-data="{
    price: 32000,
    downPayment: 5000,
    tradeIn: 2000,
    taxRate: 6.5,
    interestRate: 5.9,
    termMonths: 60,

    get netPrice() {
        const p = Math.max(0, parseFloat(this.price) || 0);
        const t = Math.max(0, parseFloat(this.tradeIn) || 0);
        return Math.max(0, p - t);
    },

    get salesTaxAmount() {
        const rate = Math.max(0, parseFloat(this.taxRate) || 0) / 100;
        return this.netPrice * rate;
    },

    get loanAmount() {
        const p = this.netPrice + this.salesTaxAmount;
        const down = Math.max(0, parseFloat(this.downPayment) || 0);
        return Math.max(0, p - down);
    },

    get monthlyPayment() {
        const principal = this.loanAmount;
        const annualRate = Math.max(0.01, parseFloat(this.interestRate) || 0) / 100;
        const r = annualRate / 12;
        const n = Math.max(1, parseInt(this.termMonths) || 12);

        if (principal <= 0) return 0;
        return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },

    get totalInterest() {
        const n = Math.max(1, parseInt(this.termMonths) || 12);
        const totalPaid = this.monthlyPayment * n;
        return Math.max(0, totalPaid - this.loanAmount);
    },

    get totalCost() {
        return (parseFloat(this.downPayment) || 0) + (parseFloat(this.tradeIn) || 0) + (this.monthlyPayment * (parseInt(this.termMonths) || 12));
    }
}">
    <div class="space-y-8">
        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="car-price" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Vehicle Price ($)
                </label>
                <input
                    id="car-price"
                    type="number"
                    x-model.number="price"
                    min="500"
                    step="500"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Sticker or negotiated price</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="car-down" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Down Payment ($)
                </label>
                <input
                    id="car-down"
                    type="number"
                    x-model.number="downPayment"
                    min="0"
                    step="500"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Cash upfront</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="car-trade" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Trade-In Value ($)
                </label>
                <input
                    id="car-trade"
                    type="number"
                    x-model.number="tradeIn"
                    min="0"
                    step="500"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Value of old vehicle</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="car-rate" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Interest Rate (APR %)
                </label>
                <input
                    id="car-rate"
                    type="number"
                    x-model.number="interestRate"
                    min="0"
                    max="30"
                    step="0.1"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">Annual percentage rate</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="car-term" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Loan Term (Months)
                </label>
                <select id="car-term" x-model.number="termMonths" class="select select-bordered w-full rounded-2xl bg-base-100 font-black text-base">
                    <option :value="24">24 Months (2 Years)</option>
                    <option :value="36">36 Months (3 Years)</option>
                    <option :value="48">48 Months (4 Years)</option>
                    <option :value="60">60 Months (5 Years)</option>
                    <option :value="72">72 Months (6 Years)</option>
                    <option :value="84">84 Months (7 Years)</option>
                </select>
                <span class="text-[11px] text-base-content/50 mt-1 block">Financing period</span>
            </div>

            <div class="p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <label for="car-tax" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Sales Tax (%)
                </label>
                <input
                    id="car-tax"
                    type="number"
                    x-model.number="taxRate"
                    min="0"
                    max="15"
                    step="0.1"
                    class="input input-bordered w-full rounded-2xl bg-base-100 font-black text-xl tabular-nums"
                />
                <span class="text-[11px] text-base-content/50 mt-1 block">State &amp; local sales tax</span>
            </div>
        </div>

        {{-- Results Highlight Card (Wise Polarity-Flipped Dark Surface) --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Monthly Payment</span>
                    <span class="text-4xl sm:text-5xl font-black text-primary tabular-nums mt-1 block" x-text="'$' + Math.round(monthlyPayment).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Principal + Interest per month</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Total Loan Amount</span>
                    <span class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block" x-text="'$' + Math.round(loanAmount).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Financed with tax</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Total Interest</span>
                    <span class="text-3xl sm:text-4xl font-black text-white tabular-nums mt-1 block" x-text="'$' + Math.round(totalInterest).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Cost of borrowing</span>
                </div>

                <div>
                    <span class="block text-xs uppercase tracking-wider text-[#868685] font-mono">Total Cost</span>
                    <span class="text-3xl sm:text-4xl font-black text-primary tabular-nums mt-1 block" x-text="'$' + Math.round(totalCost).toLocaleString()"></span>
                    <span class="text-xs text-[#868685] mt-1 block">Everything out-of-pocket</span>
                </div>
            </div>
        </div>

        {{-- Trust Banner --}}
        <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span class="text-primary font-bold">✓ Standard Amortization Formula</span>
            <span class="text-[#868685]">Calculated using M = P[r(1+r)^n] / [(1+r)^n - 1]. No server data egress.</span>
        </div>

        {{-- Technical Comparison: Auto Loan Term Length Impact --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Auto Loan Term Comparison: Monthly Payment vs. Total Interest
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Financing Term</th>
                            <th>Monthly Payment Impact</th>
                            <th>Total Interest Paid</th>
                            <th>Depreciation &amp; Equity Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">36 Months (3 Yrs)</td>
                            <td>Highest monthly payment</td>
                            <td>Lowest total interest expense</td>
                            <td>Builds positive equity rapidly; minimal underwater risk</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">48 Months (4 Yrs)</td>
                            <td>Moderate monthly payment</td>
                            <td>Low overall interest expense</td>
                            <td>Standard healthy equity buildup across vehicle lifecycle</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">60 Months (5 Yrs)</td>
                            <td>Affordable monthly payment</td>
                            <td>Moderate interest expense</td>
                            <td>Industry median; slight negative equity risk in years 1–2</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">72 Months (6 Yrs)</td>
                            <td>Lower monthly payment</td>
                            <td>High interest expense</td>
                            <td>Elevated risk of negative equity (owing more than car is worth)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">84 Months (7 Yrs)</td>
                            <td>Lowest monthly payment</td>
                            <td>Highest overall financing cost</td>
                            <td>High probability of remaining underwater past manufacturer warranty</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
