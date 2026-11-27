<x-card class="p-6 md:p-8" x-data="{
    weight: 225,
    reps: 5,
    unit: 'lbs',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('weight')) this.weight = parseFloat(params.get('weight')) || this.weight;
        if (params.has('reps')) this.reps = parseInt(params.get('reps'), 10) || this.reps;
        if (params.has('unit') && ['lbs', 'kg'].includes(params.get('unit'))) this.unit = params.get('unit');
    },
    setPreset(weight, reps, unit) {
        this.weight = weight;
        this.reps = reps;
        if (unit) this.unit = unit;
    },
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
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Strength Benchmarks:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(135, 8, 'lbs')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    1 Plate: 135 lbs × 8 Reps
                </button>
                <button type="button" @click="setPreset(225, 5, 'lbs')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    2 Plates: 225 lbs × 5 Reps
                </button>
                <button type="button" @click="setPreset(315, 3, 'lbs')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    3 Plates: 315 lbs × 3 Reps
                </button>
                <button type="button" @click="setPreset(100, 5, 'kg')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Metric: 100 kg × 5 Reps
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Weight Lifted</label>
                <input aria-label="Weight Lifted" type="number" min="1" step="5" x-model="weight" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Repetitions Completed</label>
                <input aria-label="Repetitions Completed" type="number" min="1" max="25" x-model="reps" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Measurement Unit</label>
                <select aria-label="Measurement Unit" x-model="unit" class="select select-bordered w-full rounded-[12px] text-sm">
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
                <span class="font-mono text-lg font-bold text-[#163300] dark:text-[#9fe870]" x-text="Math.round(oneRepMax * 0.95) + ' ' + unit"></span>
            </div>
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">90% (4 Reps)</span>
                <span class="font-mono text-lg font-bold text-[#163300] dark:text-[#9fe870]" x-text="Math.round(oneRepMax * 0.90) + ' ' + unit"></span>
            </div>
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">80% (8 Reps)</span>
                <span class="font-mono text-lg font-bold text-[#163300] dark:text-[#9fe870]" x-text="Math.round(oneRepMax * 0.80) + ' ' + unit"></span>
            </div>
            <div class="p-3 rounded-[12px] bg-base-200/50 border border-base-300 text-center">
                <span class="text-xs text-base-content/60 font-bold block">70% (12 Reps)</span>
                <span class="font-mono text-lg font-bold text-[#163300] dark:text-[#9fe870]" x-text="Math.round(oneRepMax * 0.70) + ' ' + unit"></span>
            </div>
        </div>

        {{-- Technical Comparison: 1RM Formulas Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                1-Repetition Maximum (1RM) Formulas &amp; Estimation Accuracy Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Formula Model</th>
                            <th>Mathematical Expression</th>
                            <th>Accuracy (1–5 Reps)</th>
                            <th>Accuracy (6–10 Reps)</th>
                            <th>Strength Discipline Usage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Epley Formula (Default)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">Weight × (1 + Reps ÷ 30)</td>
                            <td class="text-[#2ead4b] font-bold">~98% Accurate</td>
                            <td class="text-[#2ead4b]">~95% Accurate</td>
                            <td>Powerlifting, strength training, collegiate athletics</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Brzycki Formula</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">Weight × (36 ÷ (37 − Reps))</td>
                            <td class="text-[#2ead4b] font-bold">~98% Accurate</td>
                            <td>~93% Accurate</td>
                            <td>Bodybuilding, general gym strength baselines</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Lombardi Formula</td>
                            <td class="font-mono">Weight × Reps^0.10</td>
                            <td>~94% Accurate</td>
                            <td class="text-[#2ead4b]">~96% Accurate</td>
                            <td>Endurance strength, cross-training reps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">O'Conner et al.</td>
                            <td class="font-mono">Weight × (1 + 0.025 × Reps)</td>
                            <td>~96% Accurate</td>
                            <td>~92% (Conservative)</td>
                            <td>Clinical rehabilitation, safe return to lifting</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
