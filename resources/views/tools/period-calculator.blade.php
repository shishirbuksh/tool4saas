<x-card class="p-6 md:p-8" x-data="{
    lastDate: new Date().toISOString().split('T')[0],
    cycleDays: 28,
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
    </div>
</x-card>
