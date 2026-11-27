<x-card class="p-6 md:p-8" x-data="{
    palette: [],
    fileName: '',
    copied: '',
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 100;
                canvas.height = 100;
                ctx.drawImage(img, 0, 0, 100, 100);
                const data = ctx.getImageData(0, 0, 100, 100).data;
                const colors = {};
                for (let i = 0; i < data.length; i += 16) {
                    const r = Math.round(data[i] / 32) * 32;
                    const g = Math.round(data[i+1] / 32) * 32;
                    const b = Math.round(data[i+2] / 32) * 32;
                    const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
                    colors[hex] = (colors[hex] || 0) + 1;
                }
                const sorted = Object.keys(colors).sort((a,b) => colors[b] - colors[a]);
                this.palette = sorted.slice(0, 6);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    },
    copy(hex) {
        window.copyTextSafe(hex);
        this.copied = hex;
        setTimeout(() => this.copied = '', 2000);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input aria-label="Upload file for Image Color Extractor" type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload any image to extract dominant brand colors, hex codes, and visual palettes.</p>
        </div>

        <template x-if="palette.length > 0">
            <div class="space-y-4">
                <h4 class="font-bold text-sm uppercase tracking-wider text-base-content/70">Extracted Dominant Color Palette</h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    <template x-for="hex in palette" :key="hex">
                        <div class="p-3 rounded-[16px] border border-base-300 bg-base-100 flex flex-col items-center gap-2">
                            <div class="w-full h-16 rounded-[12px] shadow-sm border border-black/10" :style="'background: ' + hex"></div>
                            <span class="font-mono text-xs font-bold" x-text="hex"></span>
                            <button type="button" @click="copy(hex)" class="btn btn-xs btn-outline rounded-[8px] w-full">
                                <span x-show="copied !== hex">Copy</span>
                                <span x-show="copied === hex" x-cloak>✓ Copied</span>
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Color Harmony Systems & Palette Theory Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Color Theory Harmony Systems &amp; Palette Composition Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Harmony System</th>
                            <th>Color Wheel Geometry</th>
                            <th>Visual Dynamic &amp; Contrast</th>
                            <th>Psychological Mood</th>
                            <th>Best UI Design Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Complementary</td>
                            <td>Exact opposite sides (180° separation)</td>
                            <td class="font-bold text-success">Maximum visual contrast &amp; punch</td>
                            <td>High energy, bold, action-oriented</td>
                            <td>Primary CTAs, conversion buttons against neutral backgrounds</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Analogous</td>
                            <td>Adjacent hues (30° to 60° proximity)</td>
                            <td>Low contrast, harmonious gradient flow</td>
                            <td>Calm, serene, cohesive, natural</td>
                            <td>Backgrounds, illustrations, corporate hero cards</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Triadic</td>
                            <td>Equilateral triangle (120° equidistant)</td>
                            <td>Vibrant balance across diverse spectra</td>
                            <td>Playful, vibrant, dynamic</td>
                            <td>Gamified dashboards, multi-category SaaS interfaces</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Split-Complementary</td>
                            <td>Base hue plus 2 adjacent to its complement (150°/210°)</td>
                            <td>High contrast with less tension than pure opposite</td>
                            <td>Sophisticated, nuanced, balanced</td>
                            <td>Editorial design, magazine layouts, brand guidelines</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Monochromatic</td>
                            <td>Single hue varied by lightness &amp; saturation</td>
                            <td>Uniform visual hierarchy</td>
                            <td>Minimalist, elegant, structured</td>
                            <td>Enterprise productivity tools, documentation portals</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
