<x-tool-paper x-data="{
    unit: 'metric',
    // Metric
    weightKg: 70,
    heightCm: 175,
    // Imperial
    weightLbs: 154,
    heightInches: 69,
    get bmi() {
        if (this.unit === 'metric') {
            const h = parseFloat(this.heightCm) || 0;
            const w = parseFloat(this.weightKg) || 0;
            if (!h || !w) return '0.0';
            const hM = h / 100;
            return (w / (hM * hM)).toFixed(1);
        } else {
            const h = parseFloat(this.heightInches) || 0;
            const w = parseFloat(this.weightLbs) || 0;
            if (!h || !w) return '0.0';
            return ((703 * w) / (h * h)).toFixed(1);
        }
    },
    get category() {
        const val = parseFloat(this.bmi);
        if (val < 18.5) return { label: 'Underweight', color: 'text-[#38c8ff]', bg: 'bg-[#38c8ff]/15', textBadge: 'text-[#0e0f0c]' };
        if (val < 25) return { label: 'Normal weight', color: 'text-[#2ead4b]', bg: 'bg-[#e2f6d5]', textBadge: 'text-[#054d28]' };
        if (val < 30) return { label: 'Overweight', color: 'text-[#ffd11a]', bg: 'bg-[#ffd11a]/20', textBadge: 'text-[#4a3b1c]' };
        return { label: 'Obesity', color: 'text-[#d03238]', bg: 'bg-[#d03238]/15', textBadge: 'text-[#a7000d]' };
    },
    get idealWeightRange() {
        if (this.unit === 'metric') {
            const h = parseFloat(this.heightCm) || 175;
            const hM = h / 100;
            const min = (18.5 * hM * hM).toFixed(1);
            const max = (24.9 * hM * hM).toFixed(1);
            return `${min} kg – ${max} kg`;
        } else {
            const h = parseFloat(this.heightInches) || 69;
            const min = ((18.5 * h * h) / 703).toFixed(1);
            const max = ((24.9 * h * h) / 703).toFixed(1);
            return `${min} lbs – ${max} lbs`;
        }
    }
}">
    {{-- Wise Unit Toggle Pills --}}
    <div class="flex justify-center mb-8">
        <div class="inline-flex p-1.5 rounded-full bg-base-200 border border-base-300 gap-1">
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="unit === 'metric' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="unit = 'metric'"
            >
                Metric (kg / cm)
            </button>
            <button
                type="button"
                class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                :class="unit === 'imperial' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                @click="unit = 'imperial'"
            >
                Imperial (lbs / inches)
            </button>
        </div>
    </div>

    {{-- Metric Inputs --}}
    <div x-show="unit === 'metric'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <x-numeric-field label="Height" model="heightCm" suffix="cm" placeholder="175" />
        <x-numeric-field label="Weight" model="weightKg" suffix="kg" placeholder="70" />
    </div>

    {{-- Imperial Inputs --}}
    <div x-show="unit === 'imperial'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" style="display: none;">
        <x-numeric-field label="Height" model="heightInches" suffix="inches" placeholder="69" />
        <x-numeric-field label="Weight" model="weightLbs" suffix="lbs" placeholder="154" />
    </div>

    {{-- Result Hero Card (Wise Polarity-Flipped Dark Surface) --}}
    <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white text-center mb-8 border border-[#242a20] shadow-sm">
        <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Your Body Mass Index</span>
        <div class="text-5xl sm:text-7xl font-black my-2 font-display tabular-nums tracking-tight" :class="category.color" x-text="bmi"></div>
        <div class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mt-1" :class="[category.bg, category.textBadge]">
            <span x-text="category.label"></span>
        </div>
        <div class="text-xs text-[#868685] mt-4 font-mono">
            Healthy Weight Range for your height: <strong class="text-white" x-text="idealWeightRange"></strong>
        </div>
    </div>

    {{-- WHO Classification Bands Legend --}}
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
        <div class="p-3.5 rounded-2xl border border-base-300" :class="category.label === 'Underweight' ? 'bg-[#38c8ff]/15 font-bold border-[#38c8ff]' : 'bg-base-200/50'">
            <div class="text-[#38c8ff] font-bold">Underweight</div>
            <div class="text-base-content/60 mt-0.5 font-mono">&lt; 18.5</div>
        </div>
        <div class="p-3.5 rounded-2xl border border-base-300" :class="category.label === 'Normal weight' ? 'bg-[#e2f6d5] font-bold border-[#2ead4b]' : 'bg-base-200/50'">
            <div class="text-[#2ead4b] font-bold">Normal</div>
            <div class="text-base-content/60 mt-0.5 font-mono">18.5 – 24.9</div>
        </div>
        <div class="p-3.5 rounded-2xl border border-base-300" :class="category.label === 'Overweight' ? 'bg-[#ffd11a]/20 font-bold border-[#ffd11a]' : 'bg-base-200/50'">
            <div class="text-[#b86700] font-bold">Overweight</div>
            <div class="text-base-content/60 mt-0.5 font-mono">25 – 29.9</div>
        </div>
        <div class="p-3.5 rounded-2xl border border-base-300" :class="category.label === 'Obesity' ? 'bg-[#d03238]/15 font-bold border-[#d03238]' : 'bg-base-200/50'">
            <div class="text-[#d03238] font-bold">Obese</div>
            <div class="text-base-content/60 mt-0.5 font-mono">&ge; 30.0</div>
        </div>
    </div>
</x-tool-paper>
