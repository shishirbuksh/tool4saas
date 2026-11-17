<x-card class="p-6 md:p-8" x-data="{
    lastDate: new Date().toISOString().split('T')[0],
    cycleDays: 28,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('date')) this.lastDate = params.get('date');
        if (params.has('cycle')) this.cycleDays = parseInt(params.get('cycle'), 10) || this.cycleDays;
    },
    setPreset(days) {
        this.cycleDays = days;
    },
    formatDate(d) {
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    },
    get nextPeriod() {
        if (!this.lastDate) return '—';
        const d = new Date(this.lastDate);
        d.setDate(d.getDate() + (parseInt(this.cycleDays) || 28));
        return this.formatDate(d);
    },
    get ovulationDate() {
        if (!this.lastDate) return '—';
        const d = new Date(this.lastDate);
        // Ovulation typically occurs 14 days before next period
        d.setDate(d.getDate() + (parseInt(this.cycleDays) || 28) - 14);
        return this.formatDate(d);
    },
    get fertileWindow() {
        if (!this.lastDate) return '—';
        const d1 = new Date(this.lastDate);
        d1.setDate(d1.getDate() + (parseInt(this.cycleDays) || 28) - 18);
        const d2 = new Date(this.lastDate);
        d2.setDate(d2.getDate() + (parseInt(this.cycleDays) || 28) - 12);
        return this.formatDate(d1) + ' – ' + this.formatDate(d2);
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Cycle Length Presets:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(24)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Short Cycle (24 Days)
                </button>
                <button type="button" @click="setPreset(28)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Standard Cycle (28 Days)
                </button>
                <button type="button" @click="setPreset(30)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Average Cycle (30 Days)
                </button>
                <button type="button" @click="setPreset(35)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Long Cycle (35 Days)
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Start Date of Last Period</label>
                <input type="date" x-model="lastDate" class="input input-bordered w-full rounded-[12px] font-mono text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Average Cycle Length (Days)</label>
                <input type="number" min="21" max="45" x-model="cycleDays" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
                <span class="text-xs text-base-content/50 mt-1 block">Usually 28 days (ranging from 21 to 35)</span>
            </div>
        </div>

        <div class="p-6 rounded-[20px] bg-[#163300] text-white">
            <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Next Predicted Period Start</span>
            <p class="font-mono text-3xl sm:text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="nextPeriod"></p>
            <p class="text-xs text-white/70 mt-2">Projection based on standard biological menstrual regularity.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Estimated Ovulation Date</span>
                <p class="font-mono text-xl font-bold mt-1 text-primary" x-text="ovulationDate"></p>
                <span class="text-xs text-base-content/50">Approx. 14 days before cycle conclusion</span>
            </div>

            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Estimated Fertile Window</span>
                <p class="font-mono text-sm font-bold mt-2" x-text="fertileWindow"></p>
                <span class="text-xs text-base-content/50">Peak likelihood of conception</span>
            </div>
        </div>

        {{-- Technical Comparison: Menstrual Cycle Phases & Hormonal Dynamics Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Menstrual Cycle Phases, Hormonal Fluctuations &amp; Fertility Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Cycle Phase</th>
                            <th>Typical Cycle Days (28-day baseline)</th>
                            <th>Dominant Hormones</th>
                            <th>Endometrial &amp; Ovarian Status</th>
                            <th>Conception Probability</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Menstrual Phase</td>
                            <td class="font-mono">Days 1 – 5</td>
                            <td class="font-mono">Low Estrogen &amp; Progesterone</td>
                            <td>Uterine lining shed (menses)</td>
                            <td class="font-mono text-error font-semibold">Extremely Low (~0% to 1%)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Follicular Phase</td>
                            <td class="font-mono">Days 6 – 13</td>
                            <td class="font-mono">FSH &amp; Rising Estrogen</td>
                            <td>Ovarian follicles mature; uterine lining thickens</td>
                            <td class="font-mono text-warning font-semibold">Rising (Sperm survives up to 5 days)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">Ovulation Phase</td>
                            <td class="font-mono font-bold text-success">Day 14 (±2 days)</td>
                            <td class="font-mono font-bold">LH Surge (Luteinizing Hormone)</td>
                            <td>Mature oocyte released from dominant follicle into fallopian tube</td>
                            <td class="font-bold text-success font-mono">Peak (25% – 35% highest chance)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Luteal Phase</td>
                            <td class="font-mono">Days 15 – 28</td>
                            <td class="font-mono">High Progesterone</td>
                            <td>Corpus luteum maintains endometrium for embryo implantation</td>
                            <td class="font-mono text-error font-semibold">Declines to zero post-egg viability</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
