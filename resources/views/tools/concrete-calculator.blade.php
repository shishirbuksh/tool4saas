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
    }
}">
    <div class="space-y-6">
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
    </div>
</x-card>
