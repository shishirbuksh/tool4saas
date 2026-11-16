<x-card class="p-6 md:p-8" x-data="{
    c1: '#9fe870',
    c2: '#163300',
    angle: 135,
    type: 'linear',
    copied: false,
    get gradientCss() {
        return this.type === 'linear'
            ? 'linear-gradient(' + this.angle + 'deg, ' + this.c1 + ', ' + this.c2 + ')'
            : 'radial-gradient(circle, ' + this.c1 + ', ' + this.c2 + ')';
    },
    copyCss() {
        navigator.clipboard.writeText('background: ' + this.gradientCss + ';');
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="h-44 rounded-[20px] shadow-inner border border-base-300 transition-all duration-300" :style="'background: ' + gradientCss"></div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Color 1</label>
                <div class="flex items-center gap-2">
                    <input type="color" x-model="c1" class="w-10 h-10 rounded-[10px] cursor-pointer border-0 bg-transparent" />
                    <input type="text" x-model="c1" class="input input-sm input-bordered rounded-[8px] font-mono w-28 uppercase" />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Color 2</label>
                <div class="flex items-center gap-2">
                    <input type="color" x-model="c2" class="w-10 h-10 rounded-[10px] cursor-pointer border-0 bg-transparent" />
                    <input type="text" x-model="c2" class="input input-sm input-bordered rounded-[8px] font-mono w-28 uppercase" />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Type</label>
                <div class="join">
                    <button type="button" @click="type = 'linear'" class="btn btn-sm join-item" :class="type === 'linear' ? 'btn-primary' : 'btn-outline'">Linear</button>
                    <button type="button" @click="type = 'radial'" class="btn btn-sm join-item" :class="type === 'radial' ? 'btn-primary' : 'btn-outline'">Radial</button>
                </div>
            </div>

            <div x-show="type === 'linear'">
                <div class="flex justify-between items-center mb-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Angle</label>
                    <span class="text-xs font-mono font-bold" x-text="angle + '°'"></span>
                </div>
                <input type="range" min="0" max="360" step="5" x-model="angle" class="range range-primary range-sm" />
            </div>
        </div>

        <div class="p-4 bg-base-200/50 rounded-[16px] border border-base-300 space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/70">CSS Snippet</span>
                <button type="button" @click="copyCss()" class="btn btn-sm btn-primary rounded-[10px]">
                    <span x-show="!copied">Copy CSS</span>
                    <span x-show="copied" x-cloak>✓ Copied!</span>
                </button>
            </div>
            <code class="block font-mono text-sm bg-base-100 p-3 rounded-[10px] text-primary break-all" x-text="'background: ' + gradientCss + ';'"></code>
        </div>

        {{-- Technical Comparison: CSS Gradient Types & Syntax Standards Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                CSS Gradient Functions, Color Interpolation &amp; Browser Compatibility Matrix (W3C CSS Images 3 &amp; 4)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Gradient Function</th>
                            <th>Geometry / Coordinate Axis</th>
                            <th>Syntax Example</th>
                            <th>Color Interpolation Spaces</th>
                            <th>Browser Compatibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">linear-gradient()</td>
                            <td>Straight angle line (0° to 360° or side/corner)</td>
                            <td class="font-mono text-xs">linear-gradient(135deg, #f06, #4a9)</td>
                            <td class="font-mono">sRGB, OKLCH, Display P3</td>
                            <td class="text-success font-semibold">100% all modern &amp; legacy browsers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">radial-gradient()</td>
                            <td>Elliptical or circular radiating from center</td>
                            <td class="font-mono text-xs">radial-gradient(circle at center, #fff, #000)</td>
                            <td class="font-mono">sRGB, OKLCH, Display P3</td>
                            <td class="text-success font-semibold">100% all modern browsers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">conic-gradient()</td>
                            <td>Rotational sweep around a central pivot (color wheel)</td>
                            <td class="font-mono text-xs">conic-gradient(from 45deg, #f00, #ff0, #0f0)</td>
                            <td class="font-mono">sRGB, OKLCH</td>
                            <td class="text-success font-semibold">Chrome 69+, Safari 12.1+, Firefox 83+</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">repeating-linear-gradient()</td>
                            <td>Patterned stripes repeating at fixed length</td>
                            <td class="font-mono text-xs">repeating-linear-gradient(45deg, #000 0 10px, #fff 10px 20px)</td>
                            <td class="font-mono">sRGB</td>
                            <td class="text-success font-semibold">100% modern browsers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">in oklch (CSS 4)</td>
                            <td>Perceptually uniform color interpolation (no gray dead zones)</td>
                            <td class="font-mono text-xs">linear-gradient(in oklch to right, blue, red)</td>
                            <td class="font-mono font-bold text-success">OKLCH / CIELAB</td>
                            <td class="text-success font-semibold">Chrome 111+, Safari 16.2+, Firefox 113+</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
