<x-tool-paper x-data="{
    weight: 70,
    unit: 'kg',
    activity: 'moderate',
    climate: 'normal',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('weight')) {
            const w = parseFloat(params.get('weight'));
            if (!isNaN(w) && w > 10 && w < 300) this.weight = w;
        }
        if (params.has('unit') && ['kg', 'lb'].includes(params.get('unit'))) {
            this.unit = params.get('unit');
        }
        if (params.has('activity') && ['sedentary', 'moderate', 'active'].includes(params.get('activity'))) {
            this.activity = params.get('activity');
        }
        if (params.has('climate') && ['normal', 'hot'].includes(params.get('climate'))) {
            this.climate = params.get('climate');
        }
    },
    setWeightPreset(w, u) {
        this.weight = w;
        this.unit = u;
    },
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
        {{-- Quick Weight Presets --}}
        <div>
            <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Common Body Weights</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setWeightPreset(55, 'kg')" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">55 kg (121 lbs)</button>
                <button type="button" @click="setWeightPreset(65, 'kg')" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">65 kg (143 lbs)</button>
                <button type="button" @click="setWeightPreset(75, 'kg')" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">75 kg (165 lbs)</button>
                <button type="button" @click="setWeightPreset(85, 'kg')" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">85 kg (187 lbs)</button>
                <button type="button" @click="setWeightPreset(95, 'kg')" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">95 kg (209 lbs)</button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-numeric-field label="Body Weight" model="weight" suffix="kg" step="1" placeholder="70" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Weight Unit</span></label>
                <select aria-label="Weight Unit" x-model="unit" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                </select>
            </div>
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Exercise Level</span></label>
                <select aria-label="Exercise Level" x-model="activity" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="sedentary">Sedentary (No exercise)</option>
                    <option value="moderate">Moderate (30-60m workout)</option>
                    <option value="active">Active (Heavy training / sports)</option>
                </select>
            </div>
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Climate</span></label>
                <select aria-label="Climate" x-model="climate" class="select select-bordered rounded-xl w-full text-sm">
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

        {{-- Technical Comparison: Daily Hydration Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Daily Hydration Requirements Matrix by Body Weight &amp; Activity Level
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Body Weight</th>
                            <th>Sedentary Intake</th>
                            <th>Moderate Exercise (45m)</th>
                            <th>Intense Athletics (60m+)</th>
                            <th>US Cups Equivalent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">50 kg (110 lbs)</td>
                            <td class="font-mono">1.75 L</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">2.10 L</td>
                            <td class="font-mono">2.50 L</td>
                            <td>7 – 10 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">60 kg (132 lbs)</td>
                            <td class="font-mono">2.10 L</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">2.50 L</td>
                            <td class="font-mono">3.00 L</td>
                            <td>9 – 12 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">70 kg (154 lbs)</td>
                            <td class="font-mono">2.45 L</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">2.90 L</td>
                            <td class="font-mono">3.40 L</td>
                            <td>10 – 14 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">80 kg (176 lbs)</td>
                            <td class="font-mono">2.80 L</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">3.30 L</td>
                            <td class="font-mono">3.90 L</td>
                            <td>12 – 16 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">90 kg (198 lbs)</td>
                            <td class="font-mono">3.15 L</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">3.70 L</td>
                            <td class="font-mono">4.40 L</td>
                            <td>13 – 18 Cups</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
