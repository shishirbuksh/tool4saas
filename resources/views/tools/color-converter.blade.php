<x-tool-paper x-data="{
    hex: '#9fe870',
    copiedField: '',
    get rgb() {
        let h = this.hex.replace('#', '').trim();
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        if (!/^[0-9a-fA-F]{6}$/.test(h)) return { r: 159, g: 232, b: 112 };
        return {
            r: parseInt(h.slice(0, 2), 16),
            g: parseInt(h.slice(2, 4), 16),
            b: parseInt(h.slice(4, 6), 16)
        };
    },
    get rgbStr() {
        return `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b})`;
    },
    get hsl() {
        let r = this.rgb.r / 255;
        let g = this.rgb.g / 255;
        let b = this.rgb.b / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
            else if (max === g) h = (b - r) / d + 2;
            else h = (r - g) / d + 4;
            h *= 60;
        }
        return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
    },
    get hslStr() {
        return `hsl(${this.hsl.h}, ${this.hsl.s}%, ${this.hsl.l}%)`;
    },
    copy(field, val) {
        navigator.clipboard.writeText(val);
        this.copiedField = field;
        setTimeout(() => this.copiedField = '', 2000);
    }
}">
    <div class="space-y-8">
        {{-- Interactive Color Picker & Live Swatch Card --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-base-200/60 border border-base-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-5 w-full sm:w-auto">
                <input
                    type="color"
                    x-model="hex"
                    class="w-18 h-18 rounded-2xl cursor-pointer border-none p-1 bg-transparent shrink-0"
                />
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Pick / Enter HEX</label>
                    <input
                        type="text"
                        x-model="hex"
                        class="input input-bordered rounded-xl font-mono text-xl font-black w-36 uppercase"
                    />
                </div>
            </div>

            <div
                class="w-full sm:w-48 h-20 rounded-2xl border border-base-300/80 shadow-xs flex items-center justify-center font-bold font-mono text-sm"
                :style="`background-color: ${hex}; color: ${hsl.l > 60 ? '#0e0f0c' : '#ffffff'};`"
            >
                <span x-text="hex.toUpperCase()"></span>
            </div>
        </div>

        {{-- Converted Formats Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {{-- HEX Card --}}
            <div class="p-5 rounded-2xl bg-base-100 border border-base-300 flex flex-col justify-between shadow-xs">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-primary font-mono block mb-1">HEX Code</span>
                    <div class="font-mono text-xl font-black text-base-content uppercase select-all" x-text="hex"></div>
                </div>
                <div class="pt-4 mt-2 border-t border-base-200">
                    <button
                        type="button"
                        @click="copy('hex', hex)"
                        class="w-full py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                    >
                        <span x-text="copiedField === 'hex' ? 'Copied!' : 'Copy HEX'"></span>
                    </button>
                </div>
            </div>

            {{-- RGB Card --}}
            <div class="p-5 rounded-2xl bg-base-100 border border-base-300 flex flex-col justify-between shadow-xs">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-1">RGB Format</span>
                    <div class="font-mono text-lg font-bold text-base-content select-all" x-text="rgbStr"></div>
                </div>
                <div class="pt-4 mt-2 border-t border-base-200">
                    <button
                        type="button"
                        @click="copy('rgb', rgbStr)"
                        class="w-full py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                    >
                        <span x-text="copiedField === 'rgb' ? 'Copied!' : 'Copy RGB'"></span>
                    </button>
                </div>
            </div>

            {{-- HSL Card --}}
            <div class="p-5 rounded-2xl bg-base-100 border border-base-300 flex flex-col justify-between shadow-xs">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-1">HSL Format</span>
                    <div class="font-mono text-lg font-bold text-base-content select-all" x-text="hslStr"></div>
                </div>
                <div class="pt-4 mt-2 border-t border-base-200">
                    <button
                        type="button"
                        @click="copy('hsl', hslStr)"
                        class="w-full py-2 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                    >
                        <span x-text="copiedField === 'hsl' ? 'Copied!' : 'Copy HSL'"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
