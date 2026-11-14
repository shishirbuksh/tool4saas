<x-card class="p-6 md:p-8" x-data="{
    loanAmount: 250000,
    interestRate: 6.0,
    tenureYears: 25,
    extraMonthly: 200,
    calcEmi(p, rPct, yrs) {
        const r = (rPct / 100) / 12;
        const n = yrs * 12;
        if (r === 0) return p / n;
        return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    },
    get standardEmi() {
        return this.calcEmi(parseFloat(this.loanAmount) || 0, parseFloat(this.interestRate) || 0, parseInt(this.tenureYears) || 25);
    },
    get simulation() {
        const p0 = parseFloat(this.loanAmount) || 0;
        const r = (parseFloat(this.interestRate) || 0) / 100 / 12;
        const stdPmt = this.standardEmi;
        const extra = parseFloat(this.extraMonthly) || 0;
        const totalPmt = stdPmt + extra;

        let bal1 = p0;
        let totalIntStd = 0;
        for (let i = 0; i < this.tenureYears * 12; i++) {
            const int = bal1 * r;
            totalIntStd += int;
            bal1 -= (stdPmt - int);
            if (bal1 <= 0) break;
        }

        let bal2 = p0;
        let totalIntNew = 0;
        let months = 0;
        while (bal2 > 0 && months < this.tenureYears * 12) {
            const int = bal2 * r;
            totalIntNew += int;
            bal2 -= (totalPmt - int);
            months++;
        }

        const yearsSaved = Math.max(0, ((this.tenureYears * 12 - months) / 12).toFixed(1));
        const interestSaved = Math.max(0, Math.round(totalIntStd - totalIntNew));

        return { yearsSaved, interestSaved, newMonths: months };
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Loan Principal ($)</label>
                <input type="number" min="10000" step="10000" x-model="loanAmount" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Interest Rate (%)</label>
                <input type="number" min="1" max="15" step="0.1" x-model="interestRate" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Loan Term (Years)</label>
                <input type="number" min="5" max="35" step="5" x-model="tenureYears" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Extra Monthly Payment ($)</label>
                <input type="number" min="0" step="50" x-model="extraMonthly" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Total Interest Saved</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + simulation.interestSaved.toLocaleString()"></p>
                <p class="text-xs text-white/70 mt-2">Money saved directly on mortgage financing charges.</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Time Saved on Loan</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="simulation.yearsSaved + ' Years Earlier'"></p>
                <p class="text-xs text-base-content/60 mt-2" x-text="'Paid off in ' + (simulation.newMonths / 12).toFixed(1) + ' years instead of ' + tenureYears + ' years.'"></p>
            </div>
        </div>
    </div>
</x-card>
