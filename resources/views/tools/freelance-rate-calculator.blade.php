<x-card class="p-6 md:p-8" x-data="{
    targetIncome: 90000,
    annualExpenses: 15000,
    weeksOff: 4,
    hoursPerWeek: 40,
    billableRatio: 65,
    get hourlyRate() {
        const income = parseFloat(this.targetIncome) || 0;
        const exp = parseFloat(this.annualExpenses) || 0;
        const totalNeeded = income + exp;
        const workWeeks = Math.max(1, 52 - (parseFloat(this.weeksOff) || 0));
        const totalHours = workWeeks * (parseFloat(this.hoursPerWeek) || 0);
        const billableHours = totalHours * ((parseFloat(this.billableRatio) || 65) / 100);
        if (billableHours <= 0) return 0;
        return totalNeeded / billableHours;
    },
    get dayRate() {
        return this.hourlyRate * 8;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Desired Net Annual Salary ($)</label>
                <input type="number" min="10000" step="5000" x-model="targetIncome" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Annual Business Overhead ($)</label>
                <input type="number" min="0" step="1000" x-model="annualExpenses" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Vacation & Holidays (Weeks/yr)</label>
                <input type="number" min="0" max="20" x-model="weeksOff" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Working Hours per Week</label>
                <input type="number" min="10" max="60" x-model="hoursPerWeek" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Billable Work Ratio (%)</label>
                <input type="number" min="20" max="100" step="5" x-model="billableRatio" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
                <span class="text-xs text-base-content/50 mt-1 block">Excludes admin, sales, invoicing (~60-70%)</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Minimum Hourly Rate</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + Math.ceil(hourlyRate) + '/hr'"></p>
                <p class="text-xs text-white/70 mt-2">Required rate to meet your target income and business costs.</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Suggested Day Rate (8 hrs)</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-primary" x-text="'$' + Math.ceil(dayRate) + '/day'"></p>
                <p class="text-xs text-base-content/60 mt-2">Standard client daily consulting retainer.</p>
            </div>
        </div>

        {{-- Technical Comparison: Freelance Pricing Models Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Freelance &amp; Consulting Pricing Models: Hourly vs. Day Rate vs. Retainer vs. Value-Based
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Pricing Model</th>
                            <th>Billing Mechanism</th>
                            <th>Income Predictability</th>
                            <th>Scope Creep Risk</th>
                            <th>Best Career Stage &amp; Project Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Hourly Billing ($/hr)</td>
                            <td class="font-mono">Time tracked (T&amp;M)</td>
                            <td>Low (Varies with logged hours)</td>
                            <td class="text-success font-semibold">Low (Every extra hour paid)</td>
                            <td>Early freelancers, debugging, maintenance, shifting specs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Day / Half-Day Rate</td>
                            <td class="font-mono">Per 8-hour block reserved</td>
                            <td>Moderate (Blocks booked in advance)</td>
                            <td class="text-success font-semibold">Low (Dedicated time commitment)</td>
                            <td>Senior contractors, design sprints, technical audits</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Monthly Retainer</td>
                            <td class="font-mono">Fixed recurring fee (e.g. $5k/mo)</td>
                            <td class="text-success font-bold">Highest (Guaranteed monthly cash flow)</td>
                            <td class="text-warning font-semibold">Moderate (Cap hours strictly in SLA)</td>
                            <td>Ongoing advisory, DevOps support, content operations</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Fixed Project Fee</td>
                            <td class="font-mono">Milestone deliverables based</td>
                            <td>Moderate (Milestone approval lag)</td>
                            <td class="text-error font-semibold">High (Requires tight statement of work)</td>
                            <td>Well-defined MVPs, landing pages, complete app builds</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">Value-Based Pricing</td>
                            <td class="font-mono">Tied to client ROI / revenue upside</td>
                            <td class="text-success font-bold">Highest earning ceiling</td>
                            <td class="text-success font-semibold">Low (Priced on business outcome)</td>
                            <td>Expert consultants (Conversion optimization, enterprise sales)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
