<x-card class="p-6 md:p-8" x-data="{
    length: 12,
    width: 10,
    depth: 4,
    unit: 'feet',
    get cubicYards() {
        const l = parseFloat(this.length) || 0;
        const w = parseFloat(this.width) || 0;
        const d = (parseFloat(this.depth) || 0) / 12; // inches to feet
        const cubicFeet = l * w * d;
        return (cubicFeet / 27).toFixed(2);
    },
    get bags60lb() {
        const cy = parseFloat(this.cubicYards) || 0;
        // ~60 bags of 60lb concrete per cubic yard
        return Math.ceil(cy * 60);
    },
    get bags80lb() {
        const cy = parseFloat(this.cubicYards) || 0;
        // ~45 bags of 80lb concrete per cubic yard
        return Math.ceil(cy * 45);
    },
    setPreset(l, w, d) {
        this.length = l;
        this.width = w;
        this.depth = d;
    }
}">
    <div class="space-y-6">
        {{-- 1-Click Concrete Slab Presets --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Popular Pour Projects:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset(10, 10, 4)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    10' × 10' Patio (4" slab)
                </button>
                <button type="button" @click="setPreset(20, 20, 4)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    2-Car Garage (20' × 20' × 4")
                </button>
                <button type="button" @click="setPreset(50, 4, 4)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    Walkway Sidewalk (50' × 4' × 4")
                </button>
                <button type="button" @click="setPreset(12, 12, 6)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:border-primary hover:bg-[#e2f6d5] font-mono transition-all">
                    Heavy Shed Pad (12' × 12' × 6")
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Slab Length (Feet)</label>
                <input type="number" min="1" step="0.5" x-model="length" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Slab Width (Feet)</label>
                <input type="number" min="1" step="0.5" x-model="width" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Thickness / Depth (Inches)</label>
                <input type="number" min="1" max="24" step="0.5" x-model="depth" class="input input-bordered w-full rounded-[12px] font-bold text-sm" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Volume Required</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-[#9fe870]" x-text="cubicYards + ' Yards³'"></p>
                <p class="text-xs text-white/70 mt-1">Ready-mix truck volume</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">60 lb Premix Bags</span>
                <p class="font-mono text-3xl font-extrabold mt-2 text-primary" x-text="bags60lb + ' Bags'"></p>
                <p class="text-xs text-base-content/60 mt-1">Pre-bagged dry mix equivalent</p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">80 lb Premix Bags</span>
                <p class="font-mono text-3xl font-extrabold mt-2" x-text="bags80lb + ' Bags'"></p>
                <p class="text-xs text-base-content/60 mt-1">Heavy-duty dry mix equivalent</p>
            </div>
        </div>

        {{-- Technical Comparison: Concrete Mix Ratios & Compressive Strength Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Standard Concrete Mix Ratios &amp; Compressive Strength Matrix (IS / ASTM Standards)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Concrete Grade</th>
                            <th>Mix Ratio (Cement : Sand : Aggregate)</th>
                            <th>28-Day Strength (psi / MPa)</th>
                            <th>Primary Construction Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">M5</td>
                            <td class="font-mono">1 : 5 : 10</td>
                            <td class="font-mono">725 psi (5 MPa)</td>
                            <td>Mass concrete, non-structural sub-bases</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">M7.5</td>
                            <td class="font-mono">1 : 4 : 8</td>
                            <td class="font-mono">1,087 psi (7.5 MPa)</td>
                            <td>PCC foundation bedding, trench fill</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">M10</td>
                            <td class="font-mono">1 : 3 : 6</td>
                            <td class="font-mono">1,450 psi (10 MPa)</td>
                            <td>Patio sub-bases, leveling courses, pathways</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">M15</td>
                            <td class="font-mono">1 : 2 : 4</td>
                            <td class="font-mono">2,175 psi (15 MPa)</td>
                            <td>Residential driveways, sidewalks, light slabs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">M20</td>
                            <td class="font-mono">1 : 1.5 : 3</td>
                            <td class="font-mono">2,900 psi (20 MPa)</td>
                            <td>Reinforced concrete (RCC) beams, slabs, columns</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">M25</td>
                            <td class="font-mono">1 : 1 : 2</td>
                            <td class="font-mono">3,625 psi (25 MPa)</td>
                            <td>Heavy-duty structural footings, load-bearing walls</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
