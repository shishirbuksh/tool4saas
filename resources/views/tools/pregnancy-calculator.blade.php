<x-card class="p-6 md:p-8" x-data="{
    lmp: new Date().toISOString().split('T')[0],
    cycle: 28,
    get dueDate() {
        if (!this.lmp) return '—';
        const d = new Date(this.lmp);
        const cycleAdj = (parseInt(this.cycle) || 28) - 28;
        d.setDate(d.getDate() + 280 + cycleAdj);
        return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },
    get weeksPregnant() {
        if (!this.lmp) return '0w 0d';
        const start = new Date(this.lmp);
        const today = new Date();
        const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return 'LMP in future';
        const w = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        return w + 'w ' + days + 'd';
    },
    get daysRemaining() {
        if (!this.lmp) return 0;
        const d = new Date(this.lmp);
        const cycleAdj = (parseInt(this.cycle) || 28) - 28;
        d.setDate(d.getDate() + 280 + cycleAdj);
        const today = new Date();
        const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
        return Math.max(0, diff);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">First Day of Last Menstrual Period (LMP)</label>
                <input type="date" x-model="lmp" class="input input-bordered w-full rounded-[12px] font-mono text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Average Menstrual Cycle (Days)</label>
                <input type="number" min="20" max="45" x-model="cycle" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
                <span class="text-xs text-base-content/50 mt-1 block">Standard human cycle is 28 days</span>
            </div>
        </div>

        <div class="p-6 rounded-[20px] bg-[#163300] text-white">
            <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Estimated Due Date (Naegele's Rule)</span>
            <p class="font-mono text-3xl sm:text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="dueDate"></p>
            <p class="text-xs text-white/70 mt-2">
                Approx. <span class="font-bold text-white" x-text="daysRemaining + ' days remaining'"></span> (~40 gestational weeks)
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Current Gestational Age</span>
                <p class="font-mono text-2xl font-bold mt-1 text-primary" x-text="weeksPregnant"></p>
            </div>

            <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Trimester Progression</span>
                <p class="font-mono text-lg font-bold mt-1">1st (0-13w) · 2nd (14-27w) · 3rd (28-40w)</p>
            </div>
        </div>

        {{-- Technical Comparison: Pregnancy Trimesters & Fetal Development Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Pregnancy Trimesters, Gestational Milestones &amp; Clinical Screening Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Trimester Stage</th>
                            <th>Gestational Week Span</th>
                            <th>Fetal Development Milestones</th>
                            <th>Standard Clinical Screenings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">First Trimester</td>
                            <td class="font-mono font-bold">Weeks 1 – 13</td>
                            <td>Organogenesis: Neural tube closes, heartbeat detected (w6), limb buds form</td>
                            <td>Nuchal translucency ultrasound, NIPT cell-free DNA blood panel</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Second Trimester</td>
                            <td class="font-mono font-bold">Weeks 14 – 27</td>
                            <td>Quickening (fetal movement felt ~w18-20), auditory development, sex determination</td>
                            <td>Anatomy ultrasound scan (w18-22), maternal serum quad screen</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Third Trimester</td>
                            <td class="font-mono font-bold">Weeks 28 – 40+</td>
                            <td>Rapid brain &amp; lung surfactant maturation, subcutaneous fat deposition</td>
                            <td>Gestational diabetes glucose tolerance test (w24-28), Group B Strep (w36)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">Full Term Window</td>
                            <td class="font-mono font-bold text-success">Weeks 39w 0d – 40w 6d</td>
                            <td>Fully matured respiratory &amp; thermoregulation systems for delivery</td>
                            <td>Biophysical profile (BPP), non-stress test (NST), cervical checks</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
