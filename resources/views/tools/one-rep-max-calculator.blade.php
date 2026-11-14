<x-card class="p-6 md:p-8" x-data="{
    weight: 225,
    reps: 5,
    unit: 'lbs',
    get epley() {
        const w = parseFloat(this.weight) || 0;
        const r = parseFloat(this.reps) || 0;
        if (r <= 1) return w;
        return Math.round(w * (1 + r / 30));
    },
    get brzycki() {
        const w = parseFloat(this.weight) || 0;
        const r = parseFloat(this.reps) || 0;
        if (r >= 37) return w;
        return Math.round(w * (36 / (37 - r)));
    },
    get oneRepMax() {
        return Math.round((this.epley + this.brzycki) / 2);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Weight Lifted</label>
                <input type="number" min="1" step="5" x-model="weight" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Repetitions Completed</label>
                <input type="number" min="1" max="25" x-model="reps" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Measurement Unit</label>
                <select x-model="unit" class="select select-bordered w-full rounded-[12px] text-sm">
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="kg">Kilograms (kg)</option>
                </select>
            </div>
        </div>

        <div class="p-6 rounded-[20px] bg-[#163300] text-white">
            <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Estimated 1 Rep Max (1RM)</span>
            <p class="font-mono text-5xl font-black mt-2 text-[#9fe870]" x-text="oneRepMax + ' ' + unit"></p>
            <p class="text-xs text-white/70 mt-2" x-text="'Epley Formula: ' + epley + unit + ' · Brzycki Formula: ' + brzycki + unit"></p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">95% (2 Reps)</span>
                <span class="font-mono text-lg font-bold text-primary" x-text="Math.round(oneRepMax * 0.95) + ' ' + unit"></span>
            </div>
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">90% (4 Reps)</span>
                <span class="font-mono text-lg font-bold text-primary" x-text="Math.round(oneRepMax * 0.90) + ' ' + unit"></span>
            </div>
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">80% (8 Reps)</span>
                <span class="font-mono text-lg font-bold text-primary" x-text="Math.round(oneRepMax * 0.80) + ' ' + unit"></span>
            </div>
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">70% (12 Reps)</span>
                <span class="font-mono text-lg font-bold text-primary" x-text="Math.round(oneRepMax * 0.70) + ' ' + unit"></span>
            </div>
        </div>
    </div>
</x-card>
