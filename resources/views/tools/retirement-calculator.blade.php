<x-card class="p-6 md:p-8" x-data="{
    currentAge: 30,
    retirementAge: 65,
    annualSpend: 60000,
    currentSavings: 50000,
    returnRate: 7,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('age')) this.currentAge = parseInt(params.get('age'), 10) || this.currentAge;
        if (params.has('retire')) this.retirementAge = parseInt(params.get('retire'), 10) || this.retirementAge;
        if (params.has('spend')) this.annualSpend = parseFloat(params.get('spend')) || this.annualSpend;
        if (params.has('savings')) this.currentSavings = parseFloat(params.get('savings')) || this.currentSavings;
        if (params.has('rate')) this.returnRate = parseFloat(params.get('rate')) || this.returnRate;
    },
    setPreset(age, retire, spend, savings, rate) {
        this.currentAge = age;
        this.retirementAge = retire;
        this.annualSpend = spend;
        this.currentSavings = savings;
        this.returnRate = rate;
    },
    get nestEggTarget() {
        // Trinity Study 4% rule: annual spend * 25
        return (parseFloat(this.annualSpend) || 0) * 25;
    },
    get yearsToRetire() {
        return Math.max(1, (parseInt(this.retirementAge) || 65) - (parseInt(this.currentAge) || 30));
    },
    get requiredMonthlySaving() {
        const target = this.nestEggTarget;
        const current = parseFloat(this.currentSavings) || 0;
        const n = this.yearsToRetire * 12;
        const r = (parseFloat(this.returnRate) || 7) / 100 / 12;
        const fvCurrent = current * Math.pow(1 + r, n);
        const shortfall = Math.max(0, target - fvCurrent);
        if (shortfall <= 0) return 0;
        return shortfall * (r / (Math.pow(1 + r, n) - 1));
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Retirement Profiles:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(28, 45, 80000, 75000, 8)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    FIRE Early (Age 45 / $80k Spend)
                </button>
                <button type="button" @click="setPreset(30, 65, 60000, 50000, 7)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Standard Track (Age 65 / $60k Spend)
                </button>
                <button type="button" @click="setPreset(35, 60, 100000, 150000, 7.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    High Earner (Age 60 / $100k Spend)
                </button>
                <button type="button" @click="setPreset(45, 67, 50000, 80000, 6.5)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Catch-Up Mode (Age 67 / $50k Spend)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Age</label>
                <input aria-label="Current Age" type="number" min="18" max="90" x-model="currentAge" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Retirement Age</label>
                <input aria-label="Target Retirement Age" type="number" min="30" max="100" x-model="retirementAge" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Annual Retirement Expenses ($)</label>
                <input aria-label="Annual Retirement Expenses ($)" type="number" min="1000" step="5000" x-model="annualSpend" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Savings ($)</label>
                <input aria-label="Current Savings ($)" type="number" min="0" step="5000" x-model="currentSavings" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Expected Annual Return (%)</label>
                <input aria-label="Expected Annual Return (%)" type="number" min="1" max="15" step="0.5" x-model="returnRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Target Nest Egg (4% Rule)</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + nestEggTarget.toLocaleString()"></p>
                <p class="text-xs text-white/70 mt-2" x-text="'25× your annual $' + Number(annualSpend).toLocaleString() + ' living expenses.'"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Required Monthly Investment</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-[#9fe870]" x-text="'$' + Math.round(requiredMonthlySaving).toLocaleString()"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Monthly contribution across the next ' + yearsToRetire + ' years.'"></p>
            </div>
        </div>

        {{-- Technical Comparison: Retirement Safe Withdrawal Strategies --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Retirement Safe Withdrawal Strategies Comparison (4% Trinity Rule vs. Conservative vs. Dynamic)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Strategy Framework</th>
                            <th>Year 1 Draw ($1M Nest Egg)</th>
                            <th>Target Horizon</th>
                            <th>Sequence-of-Returns Resilience</th>
                            <th>Lifestyle Flexibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">4% Trinity Study Rule</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">$40,000 / Year</td>
                            <td class="font-mono">30 Years</td>
                            <td>95% historical survival; risk in early bear market</td>
                            <td>Fixed mechanical formula; inflation adjusted</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">3.25% Conservative (FIRE)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">$32,500 / Year</td>
                            <td class="font-mono">40–50+ Years</td>
                            <td>Near 100% survival; immune to multi-year drawdowns</td>
                            <td>Maximum safety for early retirees under age 50</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Guyton-Klinger Guardrails</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">$45,000 / Year</td>
                            <td class="font-mono">Indefinite</td>
                            <td>Trims spending by 10% only during market crashes</td>
                            <td>Dynamic; rewards market booms and protects during dips</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
