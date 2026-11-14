<x-tool-paper x-data="{
    deposit: 150000,
    rate: 7.1,
    years: 15,
    get numDep() { return Math.max(0, parseFloat(this.deposit) || 0); },
    get numRate() { return Math.max(0, parseFloat(this.rate) || 0) / 100; },
    get numY() { return Math.max(1, parseInt(this.years, 10) || 15); },
    get schedule() {
        const rows = [];
        let balance = 0;
        for (let y = 1; y <= this.numY; y++) {
            const interest = (balance + this.numDep) * this.numRate;
            balance += this.numDep + interest;
            rows.push({
                year: y,
                invested: this.numDep * y,
                interest: Math.round(interest),
                balance: Math.round(balance)
            });
        }
        return rows;
    },
    get maturity() {
        return this.schedule.length ? this.schedule[this.schedule.length - 1].balance : 0;
    },
    get totalInvested() {
        return this.numDep * this.numY;
    },
    get totalInterest() {
        return Math.max(0, this.maturity - this.totalInvested);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <x-numeric-field label="Yearly Investment (₹)" model="deposit" prefix="₹" min="500" max="150000" step="5000" placeholder="150000" />
            <x-numeric-field label="Current PPF Rate (% p.a.)" model="rate" suffix="%" step="0.1" placeholder="7.1" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Tenure (Years)</span></label>
                <select x-model.number="years" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="15">15 Years (Standard Lock-in)</option>
                    <option value="20">20 Years (1 Block Extension)</option>
                    <option value="25">25 Years (2 Block Extensions)</option>
                    <option value="30">30 Years (3 Block Extensions)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Total Tax-Free Maturity Value</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                ₹<span x-text="maturity.toLocaleString()"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                EEE (Exempt-Exempt-Exempt) category: Zero tax on investment, interest, or withdrawal
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Capital Deposited</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    ₹<span x-text="totalInvested.toLocaleString()"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Total Tax-Free Interest</span>
                <div class="text-2xl font-black text-[#2ead4b] mt-1 font-display tabular-nums">
                    +₹<span x-text="totalInterest.toLocaleString()"></span>
                </div>
            </div>
        </div>

        {{-- Schedule Preview --}}
        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block">Year-Wise PPF Accumulation Schedule</span>
            <div class="overflow-x-auto max-h-64">
                <table class="table table-xs w-full font-mono">
                    <thead>
                        <tr class="text-base-content/60 border-b border-base-300">
                            <th>Year</th>
                            <th class="text-right">Deposit</th>
                            <th class="text-right">Interest (7.1%)</th>
                            <th class="text-right">Closing Balance</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200">
                        <template x-for="r in schedule" :key="r.year">
                            <tr>
                                <td class="font-bold">Year <span x-text="r.year"></span></td>
                                <td class="text-right">₹<span x-text="Number(deposit).toLocaleString()"></span></td>
                                <td class="text-right text-[#2ead4b]">+₹<span x-text="r.interest.toLocaleString()"></span></td>
                                <td class="text-right font-black">₹<span x-text="r.balance.toLocaleString()"></span></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
