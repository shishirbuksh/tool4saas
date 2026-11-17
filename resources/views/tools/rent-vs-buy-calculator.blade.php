<x-card class="p-6 md:p-8" x-data="{
    monthlyRent: 2200,
    homePrice: 450000,
    downPaymentPercent: 20,
    interestRate: 6.5,
    tenureYears: 30,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('rent')) this.monthlyRent = parseFloat(params.get('rent')) || this.monthlyRent;
        if (params.has('price')) this.homePrice = parseFloat(params.get('price')) || this.homePrice;
        if (params.has('down')) this.downPaymentPercent = parseFloat(params.get('down')) || this.downPaymentPercent;
        if (params.has('rate')) this.interestRate = parseFloat(params.get('rate')) || this.interestRate;
        if (params.has('tenure')) this.tenureYears = parseInt(params.get('tenure'), 10) || this.tenureYears;
    },
    setPreset(rent, price, down, rate, tenure) {
        this.monthlyRent = rent;
        this.homePrice = price;
        this.downPaymentPercent = down;
        this.interestRate = rate;
        this.tenureYears = tenure;
    },
    get monthlyMortgage() {
        const p = this.homePrice * (1 - this.downPaymentPercent / 100);
        const r = (parseFloat(this.interestRate) || 6.5) / 100 / 12;
        const n = this.tenureYears * 12;
        if (r === 0) return p / n;
        return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },
    get totalMonthlyBuy() {
        // Mortgage + approx 1.2% property tax + 0.5% home insurance
        const taxAndIns = (this.homePrice * 0.017) / 12;
        return this.monthlyMortgage + taxAndIns;
    },
    get monthlyDifference() {
        return Math.round(this.totalMonthlyBuy - this.monthlyRent);
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Housing Market Scenarios:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(3200, 750000, 20, 6.5, 30)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    High-Cost Metro (Rent $3,200 vs Buy $750k)
                </button>
                <button type="button" @click="setPreset(2000, 400000, 20, 6.5, 30)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Suburban Family (Rent $2,000 vs Buy $400k)
                </button>
                <button type="button" @click="setPreset(1200, 250000, 10, 6.5, 30)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Low-Cost Area (Rent $1,200 vs Buy $250k)
                </button>
                <button type="button" @click="setPreset(1800, 320000, 5, 6.8, 30)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Starter Home (Rent $1,800 vs Buy $320k)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Monthly Rent ($)</label>
                <input type="number" min="0" step="50" x-model="monthlyRent" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Home Purchase Price ($)</label>
                <input type="number" min="50000" step="10000" x-model="homePrice" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Down Payment (%)</label>
                <input type="number" min="3" max="100" x-model="downPaymentPercent" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Mortgage Interest Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Mortgage Tenure (Years)</label>
                <input type="number" min="10" max="30" step="5" x-model="tenureYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Monthly Cost to Rent</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-base-content" x-text="'$' + Number(monthlyRent).toLocaleString()"></p>
                <p class="text-xs text-base-content/60 mt-2">Zero equity accumulation, fixed maintenance</p>
            </div>

            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Total Monthly Ownership Cost</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + Math.round(totalMonthlyBuy).toLocaleString()"></p>
                <p class="text-xs text-white/70 mt-2" x-text="monthlyDifference > 0 ? '$' + monthlyDifference + '/mo more expensive than renting' : '$' + Math.abs(monthlyDifference) + '/mo cheaper than renting'"></p>
            </div>
        </div>

        {{-- Technical Comparison: Rent vs Buy Financial Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Renting vs. Buying a Home 10-Year Financial Impact Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Decision Factor</th>
                            <th>Renting an Apartment / Home</th>
                            <th>Buying with a Mortgage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Initial Cash Required</td>
                            <td>1st month rent + security deposit</td>
                            <td>3%–20% down payment + 3% closing costs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Equity Accumulation</td>
                            <td>Zero home equity (opportunity to invest delta)</td>
                            <td>Monthly amortization builds substantial equity</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Maintenance Liability</td>
                            <td>Landlord pays for HVAC, roof, appliances</td>
                            <td>Owner pays 100% of repairs (~1% property value/yr)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Relocation Flexibility</td>
                            <td>High; relocate easily at annual lease end</td>
                            <td>Low; selling incurs 6% realtor commission fees</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Inflation Defense</td>
                            <td>Subject to market rent escalations</td>
                            <td>Fixed 30-year principal and interest payments</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
