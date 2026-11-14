<x-tool-paper x-data="{
    age: 28,
    sex: 'male',
    weight: 70,
    height: 175,
    activity: 1.375,
    get bmr() {
        const a = parseInt(this.age, 10) || 0;
        const w = parseFloat(this.weight) || 0;
        const h = parseFloat(this.height) || 0;
        if (a <= 0 || w <= 0 || h <= 0) return 0;
        const base = 10 * w + 6.25 * h - 5 * a;
        return Math.round(this.sex === 'male' ? base + 5 : base - 161);
    },
    get tdee() {
        return Math.round(this.bmr * (parseFloat(this.activity) || 1.2));
    }
}">
    <div class="space-y-6">
        {{-- Gender Selection --}}
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="sex = 'male'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="sex === 'male' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Male
            </button>
            <button
                type="button"
                @click="sex = 'female'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="sex === 'female' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                Female
            </button>
        </div>

        {{-- Metrics Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <x-numeric-field label="Age" model="age" suffix="yrs" min="15" max="100" placeholder="28" />
            <x-numeric-field label="Weight (kg)" model="weight" suffix="kg" step="0.5" placeholder="70" />
            <x-numeric-field label="Height (cm)" model="height" suffix="cm" min="100" max="250" placeholder="175" />
        </div>

        <div class="form-control">
            <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Activity Level</span></label>
            <select x-model.number="activity" class="select select-bordered rounded-xl w-full text-sm">
                <option value="1.2">Sedentary (Little or no exercise, desk job)</option>
                <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra Active (Very heavy physical job or 2x/day training)</option>
            </select>
        </div>

        {{-- Polarity-Flipped Dark Hero Card --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Daily Calorie Target (TDEE)</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="tdee.toLocaleString()"></span> <span class="text-2xl font-mono text-white">kcal/day</span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Basal Metabolic Rate (BMR): <span class="text-white font-bold" x-text="bmr.toLocaleString()"></span> kcal/day (Mifflin-St Jeor formula)
            </p>
        </div>

        {{-- Caloric Goals Breakdown --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Maintain Weight</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="tdee.toLocaleString()"></span> kcal
                </div>
                <span class="text-[10px] text-base-content/60 font-mono">0 kg/week change</span>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Mild Fat Loss (-0.25kg)</span>
                <div class="text-2xl font-black text-[#2ead4b] mt-1 font-display tabular-nums">
                    <span x-text="Math.max(1200, tdee - 250).toLocaleString()"></span> kcal
                </div>
                <span class="text-[10px] text-base-content/60 font-mono">-250 kcal deficit</span>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Standard Fat Loss (-0.5kg)</span>
                <div class="text-2xl font-black text-warning mt-1 font-display tabular-nums">
                    <span x-text="Math.max(1200, tdee - 500).toLocaleString()"></span> kcal
                </div>
                <span class="text-[10px] text-base-content/60 font-mono">-500 kcal deficit</span>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Lean Muscle Gain</span>
                <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums">
                    <span x-text="(tdee + 300).toLocaleString()"></span> kcal
                </div>
                <span class="text-[10px] text-base-content/60 font-mono">+300 kcal surplus</span>
            </div>
        </div>
    </div>
</x-tool-paper>
