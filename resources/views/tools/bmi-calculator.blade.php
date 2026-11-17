<x-tool-paper x-data="{
    unit: 'metric',
    // Metric
    weightKg: 70,
    heightCm: 175,
    // Imperial
    weightLbs: 154,
    heightInches: 69,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('unit') && ['metric', 'imperial'].includes(params.get('unit'))) {
            this.unit = params.get('unit');
        }
        if (params.has('weight')) {
            const w = parseFloat(params.get('weight'));
            if (!isNaN(w) && w > 0) {
                if (this.unit === 'metric') this.weightKg = w;
                else this.weightLbs = w;
            }
        }
        if (params.has('height')) {
            const h = parseFloat(params.get('height'));
            if (!isNaN(h) && h > 0) {
                if (this.unit === 'metric') this.heightCm = h;
                else this.heightInches = h;
            }
        }
    },
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

    {{-- Quick Height Benchmarks --}}
    <div class="mb-8">
        <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Quick Height Benchmarks</span>
        <div x-show="unit === 'metric'" class="flex flex-wrap gap-2">
            <button type="button" @click="heightCm = 160" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">160 cm</button>
            <button type="button" @click="heightCm = 165" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">165 cm</button>
            <button type="button" @click="heightCm = 170" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">170 cm</button>
            <button type="button" @click="heightCm = 175" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">175 cm</button>
            <button type="button" @click="heightCm = 180" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">180 cm</button>
            <button type="button" @click="heightCm = 185" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">185 cm</button>
        </div>
        <div x-show="unit === 'imperial'" class="flex flex-wrap gap-2" style="display: none;">
            <button type="button" @click="heightInches = 64" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">5'4" (64 in)</button>
            <button type="button" @click="heightInches = 67" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">5'7" (67 in)</button>
            <button type="button" @click="heightInches = 69" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">5'9" (69 in)</button>
            <button type="button" @click="heightInches = 71" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">5'11" (71 in)</button>
            <button type="button" @click="heightInches = 72" class="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">6'0" (72 in)</button>
        </div>
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

    {{-- Technical Comparison: WHO BMI Risk Matrix --}}
    <div class="mt-8 pt-6 border-t border-base-300">
        <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
            World Health Organization (WHO) BMI Classification &amp; Health Risk Matrix
        </h3>
        <div class="overflow-x-auto rounded-3xl border border-base-300">
            <table class="table table-zebra w-full text-xs sm:text-sm">
                <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                    <tr>
                        <th>WHO Category</th>
                        <th>BMI Range (kg/m²)</th>
                        <th>Health Risk Level</th>
                        <th>Clinical Guidance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-bold font-mono text-[#38c8ff]">Severe Underweight</td>
                        <td class="font-mono">&lt; 16.0</td>
                        <td>High nutritional deficiency</td>
                        <td>Clinical health review; targeted caloric rehabilitation</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono text-[#38c8ff]">Underweight</td>
                        <td class="font-mono">16.0 – 18.4</td>
                        <td>Moderate deficiency risk</td>
                        <td>Increase nutrient-dense whole foods and strength training</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono text-[#2ead4b]">Normal Weight</td>
                        <td class="font-mono">18.5 – 24.9</td>
                        <td>Lowest morbidity risk</td>
                        <td>Maintain current energy balance and regular exercise</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono text-[#b86700]">Overweight</td>
                        <td class="font-mono">25.0 – 29.9</td>
                        <td>Moderate cardiovascular risk</td>
                        <td>Modest 300–500 kcal deficit with 150m weekly activity</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono text-[#d03238]">Obese Class I</td>
                        <td class="font-mono">30.0 – 34.9</td>
                        <td>High risk for diabetes &amp; BP</td>
                        <td>Physician-guided weight management and nutrition plan</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono text-[#d03238]">Obese Class II</td>
                        <td class="font-mono">35.0 – 39.9</td>
                        <td>Very high metabolic risk</td>
                        <td>Comprehensive medical consultation and lifestyle therapy</td>
                    </tr>
                    <tr>
                        <td class="font-bold font-mono text-[#d03238]">Obese Class III</td>
                        <td class="font-mono">&ge; 40.0</td>
                        <td>Extremely high morbid risk</td>
                        <td>Specialized multidisciplinary clinical intervention</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</x-tool-paper>
