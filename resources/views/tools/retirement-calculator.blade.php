<x-card class="p-6 md:p-8" x-data="{
    currentAge: 30,
    retirementAge: 65,
    annualSpend: 60000,
    currentSavings: 50000,
    returnRate: 7,
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Age</label>
                <input type="number" min="18" max="90" x-model="currentAge" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Target Retirement Age</label>
                <input type="number" min="30" max="100" x-model="retirementAge" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Annual Retirement Expenses ($)</label>
                <input type="number" min="1000" step="5000" x-model="annualSpend" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Current Savings ($)</label>
                <input type="number" min="0" step="5000" x-model="currentSavings" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Expected Annual Return (%)</label>
                <input type="number" min="1" max="15" step="0.5" x-model="returnRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
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
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="'$' + Math.round(requiredMonthlySaving).toLocaleString()"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Monthly contribution across the next ' + yearsToRetire + ' years.'"></p>
            </div>
        </div>
    </div>
</x-card>
