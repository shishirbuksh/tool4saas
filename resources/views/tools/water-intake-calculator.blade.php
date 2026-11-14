<x-tool-paper x-data="{
    weight: 70,
    unit: 'kg',
    activity: 'moderate',
    climate: 'normal',
    get weightKg() {
        const w = parseFloat(this.weight) || 0;
        return this.unit === 'kg' ? w : w * 0.453592;
    },
    get totalMl() {
        if (this.weightKg <= 0) return 0;
        let base = this.weightKg * 35;
        if (this.activity === 'moderate') base += 350;
        if (this.activity === 'active') base += 700;
        if (this.climate === 'hot') base += 500;
        return Math.round(base);
    },
    get liters() {
        return (this.totalMl / 1000).toFixed(2);
    },
    get glasses() {
        return Math.round((this.totalMl / 250) * 10) / 10;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Body Weight" model="weight" suffix="kg" step="1" placeholder="70" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Weight Unit</span></label>
                <select x-model="unit" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                </select>
            </div>
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Exercise Level</span></label>
                <select x-model="activity" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="sedentary">Sedentary (No exercise)</option>
                    <option value="moderate">Moderate (30-60m workout)</option>
                    <option value="active">Active (Heavy training / sports)</option>
                </select>
            </div>
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Climate</span></label>
                <select x-model="climate" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="normal">Temperate / AC</option>
                    <option value="hot">Hot / Tropical / Humid</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Recommended Daily Fluid Intake</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="liters"></span> <span class="text-2xl font-mono text-white">Liters</span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Equivalent to <span class="text-white font-bold" x-text="totalMl.toLocaleString()"></span> ml or approx. <span class="text-white font-bold" x-text="glasses"></span> glasses (250 ml each)
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Morning Requirement</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="Math.round(totalMl * 0.4)"></span> ml
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Afternoon Hydration</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="Math.round(totalMl * 0.4)"></span> ml
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Evening Intake</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="Math.round(totalMl * 0.2)"></span> ml
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
