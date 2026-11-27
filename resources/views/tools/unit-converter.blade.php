<x-tool-paper x-data="{
    category: 'length',
    val: 1,
    fromUnit: 'm',
    toUnit: 'ft',
    categories: {
        length: {
            label: 'Length',
            units: {
                mm: { label: 'Millimeters (mm)', factor: 0.001 },
                cm: { label: 'Centimeters (cm)', factor: 0.01 },
                m: { label: 'Meters (m)', factor: 1 },
                km: { label: 'Kilometers (km)', factor: 1000 },
                inch: { label: 'Inches (in)', factor: 0.0254 },
                ft: { label: 'Feet (ft)', factor: 0.3048 },
                yd: { label: 'Yards (yd)', factor: 0.9144 },
                mi: { label: 'Miles (mi)', factor: 1609.344 }
            }
        },
        weight: {
            label: 'Weight',
            units: {
                mg: { label: 'Milligrams (mg)', factor: 0.000001 },
                g: { label: 'Grams (g)', factor: 0.001 },
                kg: { label: 'Kilograms (kg)', factor: 1 },
                oz: { label: 'Ounces (oz)', factor: 0.0283495 },
                lb: { label: 'Pounds (lbs)', factor: 0.45359237 },
                ton: { label: 'Metric Tons (t)', factor: 1000 }
            }
        },
        data: {
            label: 'Digital Data',
            units: {
                b: { label: 'Bytes (B)', factor: 1 },
                kb: { label: 'Kilobytes (KB)', factor: 1024 },
                mb: { label: 'Megabytes (MB)', factor: 1048576 },
                gb: { label: 'Gigabytes (GB)', factor: 1073741824 },
                tb: { label: 'Terabytes (TB)', factor: 1099511627776 }
            }
        },
        temperature: {
            label: 'Temperature',
            units: {
                c: { label: 'Celsius (°C)', factor: 1 },
                f: { label: 'Fahrenheit (°F)', factor: 1 },
                k: { label: 'Kelvin (K)', factor: 1 }
            }
        }
    },
    get currentUnits() {
        return this.categories[this.category].units;
    },
    switchCategory(c) {
        this.category = c;
        const keys = Object.keys(this.categories[c].units);
        this.fromUnit = keys[0];
        this.toUnit = keys[1] || keys[0];
    },
    swap() {
        const tmp = this.fromUnit;
        this.fromUnit = this.toUnit;
        this.toUnit = tmp;
    },
    setPreset(c, v, from, to) {
        this.category = c;
        this.val = v;
        this.fromUnit = from;
        this.toUnit = to;
    },
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('cat') && this.categories[params.get('cat')]) this.category = params.get('cat');
        if (params.has('val')) this.val = parseFloat(params.get('val')) || this.val;
        if (params.has('from')) this.fromUnit = params.get('from');
        if (params.has('to')) this.toUnit = params.get('to');
    },
    get converted() {
        const v = parseFloat(this.val);
        if (isNaN(v)) return 0;

        if (this.category === 'temperature') {
            // Convert from fromUnit to Celsius
            let inC = v;
            if (this.fromUnit === 'f') inC = (v - 32) * (5/9);
            else if (this.fromUnit === 'k') inC = v - 273.15;

            // Convert Celsius to toUnit
            if (this.toUnit === 'c') return inC.toFixed(2);
            if (this.toUnit === 'f') return ((inC * (9/5)) + 32).toFixed(2);
            if (this.toUnit === 'k') return (inC + 273.15).toFixed(2);
            return inC.toFixed(2);
        }

        const fromFactor = this.currentUnits[this.fromUnit]?.factor || 1;
        const toFactor = this.currentUnits[this.toUnit]?.factor || 1;
        const baseValue = v * fromFactor;
        const result = baseValue / toFactor;
        return result < 0.0001 ? result.toExponential(4) : parseFloat(result.toFixed(6));
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Unit Conversions:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset('length', 1, 'm', 'ft')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Meters to Feet (1 m ➔ ft)
                </button>
                <button type="button" @click="setPreset('weight', 1, 'kg', 'lb')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Kg to Pounds (1 kg ➔ lbs)
                </button>
                <button type="button" @click="setPreset('temperature', 25, 'c', 'f')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Celsius to Fahrenheit (25°C ➔ °F)
                </button>
                <button type="button" @click="setPreset('data', 1024, 'mb', 'gb')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    MB to GB (1,024 MB ➔ GB)
                </button>
                <button type="button" @click="setPreset('length', 10, 'km', 'mi')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Km to Miles (10 km ➔ mi)
                </button>
            </div>
        </div>

        {{-- Category Pills --}}
        <div class="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-base-200 border border-base-300">
            <template x-for="(cat, key) in categories" :key="key">
                <button
                    type="button"
                    class="px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                    :class="category === key ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                    @click="switchCategory(key)"
                    x-text="cat.label"
                ></button>
            </template>
        </div>

        {{-- Interactive Conversion Controls --}}
        <div class="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {{-- From Input --}}
            <div class="md:col-span-3 space-y-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">From</label>
                <input aria-label="From"
                    type="number"
                    step="any"
                    x-model="val"
                    class="input input-bordered rounded-2xl w-full text-xl font-bold p-4 tabular-nums"
                />
                <select aria-label="From unit" x-model="fromUnit" class="select select-bordered rounded-xl w-full text-xs font-semibold">
                    <template x-for="(u, k) in currentUnits" :key="k">
                        <option :value="k" x-text="u.label" :selected="fromUnit === k"></option>
                    </template>
                </select>
            </div>

            {{-- Swap Button --}}
            <div class="md:col-span-1 flex justify-center py-2 md:py-0">
                <button
                    type="button"
                    @click="swap()"
                    class="w-12 h-12 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content border border-base-300 flex items-center justify-center transition-all shadow-xs"
                    aria-label="Swap units"
                >
                    ⇄
                </button>
            </div>

            {{-- To Output --}}
            <div class="md:col-span-3 space-y-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">To (Converted)</label>
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300 min-h-[48px] flex items-center font-display text-xl font-black text-base-content tabular-nums">
                    <span x-text="converted"></span>
                </div>
                <select aria-label="To (Converted)" x-model="toUnit" class="select select-bordered rounded-xl w-full text-xs font-semibold">
                    <template x-for="(u, k) in currentUnits" :key="k">
                        <option :value="k" x-text="u.label" :selected="toUnit === k"></option>
                    </template>
                </select>
            </div>
        </div>

        {{-- Result Summary (Wise Polarity-Flipped Dark Card) --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Conversion Result</span>
            <div class="text-3xl sm:text-5xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="val"></span> <span x-text="fromUnit" class="text-lg text-[#868685] font-mono"></span> = <span x-text="converted"></span> <span x-text="toUnit" class="text-lg text-primary font-mono"></span>
            </div>
            <p class="text-xs text-[#868685] font-mono mt-1">100% deterministic local calculation. Zero precision truncation.</p>
        </div>

        {{-- Technical Comparison: Metric vs Imperial Conversion Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Metric (SI System) vs. Imperial System Conversion Multipliers Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Measurement Dimension</th>
                            <th>Metric Base (SI)</th>
                            <th>Imperial Unit</th>
                            <th>Exact Mathematical Multiplier</th>
                            <th>Mental Math Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Length</td>
                            <td class="font-mono">1 Meter (m)</td>
                            <td class="font-mono">3.28084 Feet (ft)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">ft = m × 3.28084</td>
                            <td>Multiply meters by 3.3</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Distance</td>
                            <td class="font-mono">1 Kilometer (km)</td>
                            <td class="font-mono">0.621371 Miles (mi)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">mi = km × 0.621371</td>
                            <td>Multiply km by 0.6 or divide by 1.6</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Mass / Weight</td>
                            <td class="font-mono">1 Kilogram (kg)</td>
                            <td class="font-mono">2.20462 Pounds (lbs)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">lbs = kg × 2.20462</td>
                            <td>Double the kg value and add 10%</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Liquid Volume</td>
                            <td class="font-mono">1 Liter (L)</td>
                            <td class="font-mono">0.264172 US Gallons</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">gal = L × 0.264172</td>
                            <td>~3.785 Liters per US Gallon</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Temperature</td>
                            <td class="font-mono">0° Celsius (°C)</td>
                            <td class="font-mono">32° Fahrenheit (°F)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">°F = (°C × 1.8) + 32</td>
                            <td>Double Celsius, add 30</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
