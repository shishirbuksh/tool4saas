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
                            <td class="font-mono text-primary font-bold">2.10 L</td>
                            <td class="font-mono">2.50 L</td>
                            <td>7 – 10 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">60 kg (132 lbs)</td>
                            <td class="font-mono">2.10 L</td>
                            <td class="font-mono text-primary font-bold">2.50 L</td>
                            <td class="font-mono">3.00 L</td>
                            <td>9 – 12 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">70 kg (154 lbs)</td>
                            <td class="font-mono">2.45 L</td>
                            <td class="font-mono text-primary font-bold">2.90 L</td>
                            <td class="font-mono">3.40 L</td>
                            <td>10 – 14 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">80 kg (176 lbs)</td>
                            <td class="font-mono">2.80 L</td>
                            <td class="font-mono text-primary font-bold">3.30 L</td>
                            <td class="font-mono">3.90 L</td>
                            <td>12 – 16 Cups</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">90 kg (198 lbs)</td>
                            <td class="font-mono">3.15 L</td>
                            <td class="font-mono text-primary font-bold">3.70 L</td>
                            <td class="font-mono">4.40 L</td>
                            <td>13 – 18 Cups</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
