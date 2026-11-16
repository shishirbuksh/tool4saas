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

        {{-- Technical Comparison: Color Models Representation Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Color Models &amp; Spaces Comparison (HEX vs. RGB vs. HSL vs. CMYK vs. OKLCH)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Color Space</th>
                            <th>Channel Channels</th>
                            <th>Gamut Support</th>
                            <th>Human Intuition</th>
                            <th>Standard Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">HEX (#RRGGBB)</td>
                            <td class="font-mono">Hexadecimal (00-FF)</td>
                            <td>sRGB Standard</td>
                            <td>Low (Hex strings)</td>
                            <td>Traditional web CSS, brand guidelines</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">RGB</td>
                            <td class="font-mono">Red, Green, Blue (0-255)</td>
                            <td>sRGB Standard</td>
                            <td>Moderate</td>
                            <td>Canvas API, graphic rendering engines</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">HSL</td>
                            <td class="font-mono">Hue (360°), Sat (%), Light (%)</td>
                            <td>sRGB Standard</td>
                            <td class="text-[#2ead4b] font-bold">High (Intuitive)</td>
                            <td>Design systems, interactive hover lightness</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">CMYK</td>
                            <td class="font-mono">Cyan, Magenta, Yellow, Black</td>
                            <td>Subtractive Print</td>
                            <td>Moderate</td>
                            <td>Commercial offset print, product packaging</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#2ead4b]">OKLCH</td>
                            <td class="font-mono">Lightness, Chroma, Hue</td>
                            <td class="text-[#2ead4b] font-bold">Display P3 / Rec.2020</td>
                            <td class="text-[#2ead4b] font-bold">Perceptually Uniform</td>
                            <td>Tailwind CSS v4, modern HDR displays</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
