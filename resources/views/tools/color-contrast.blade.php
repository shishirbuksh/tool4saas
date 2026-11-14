<x-tool-paper x-data="{
    fg: '#163300',
    bg: '#9fe870',
    toRgb(hex) {
        let h = hex.replace('#', '');
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        if (h.length !== 6) return null;
        return {
            r: parseInt(h.slice(0, 2), 16),
            g: parseInt(h.slice(2, 4), 16),
            b: parseInt(h.slice(4, 6), 16)
        };
    },
    luminance(r, g, b) {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    },
    get ratio() {
        const c1 = this.toRgb(this.fg);
        const c2 = this.toRgb(this.bg);
        if (!c1 || !c2) return 0;
        const l1 = this.luminance(c1.r, c1.g, c1.b);
        const l2 = this.luminance(c2.r, c2.g, c2.b);
        const light = Math.max(l1, l2);
        const dark = Math.min(l1, l2);
        return ((light + 0.05) / (dark + 0.05)).toFixed(2);
    },
    swap() {
        const tmp = this.fg;
        this.fg = this.bg;
        this.bg = tmp;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div class="flex items-center gap-3 p-3 rounded-2xl bg-base-100 border border-base-300">
                <input type="color" x-model="fg" class="size-11 rounded-xl cursor-pointer border-0 bg-transparent" />
                <div class="flex-1">
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-base-content/60 font-mono">Foreground (Text)</label>
                    <input type="text" x-model="fg" class="input input-ghost input-sm p-0 text-sm font-mono font-bold uppercase w-full" />
                </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-2xl bg-base-100 border border-base-300">
                <input type="color" x-model="bg" class="size-11 rounded-xl cursor-pointer border-0 bg-transparent" />
                <div class="flex-1">
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-base-content/60 font-mono">Background</label>
                    <input type="text" x-model="bg" class="input input-ghost input-sm p-0 text-sm font-mono font-bold uppercase w-full" />
                </div>
                <button type="button" @click="swap()" class="btn btn-circle btn-ghost btn-sm" title="Swap colors">
                    ⇄
                </button>
            </div>
        </div>

        {{-- Live Sample Card --}}
        <div class="p-8 rounded-3xl border border-base-300 transition-colors duration-200" :style="'background-color: ' + bg + '; color: ' + fg + ';'">
            <h3 class="text-2xl font-black font-display mb-1">Accessible Typography Preview</h3>
            <p class="text-sm font-normal leading-relaxed opacity-90">
                The quick brown fox jumps over the lazy dog. Good design guarantees readable contrast for everyone under all lighting conditions.
            </p>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">WCAG 2.1 Contrast Ratio</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="ratio"></span>:1
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Higher ratios provide clearer legibility across desktop monitors and mobile devices.
            </p>
        </div>

        {{-- WCAG Badges --}}
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-4 rounded-2xl border" :class="parseFloat(ratio) >= 4.5 ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-xs font-bold font-mono block">AA Normal Text</span>
                <span class="text-lg font-black mt-1 block" x-text="parseFloat(ratio) >= 4.5 ? '✓ Pass (4.5:1)' : '✗ Fail'"></span>
            </div>
            <div class="p-4 rounded-2xl border" :class="parseFloat(ratio) >= 3.0 ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-xs font-bold font-mono block">AA Large Text</span>
                <span class="text-lg font-black mt-1 block" x-text="parseFloat(ratio) >= 3.0 ? '✓ Pass (3.0:1)' : '✗ Fail'"></span>
            </div>
            <div class="p-4 rounded-2xl border" :class="parseFloat(ratio) >= 7.0 ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-xs font-bold font-mono block">AAA Normal Text</span>
                <span class="text-lg font-black mt-1 block" x-text="parseFloat(ratio) >= 7.0 ? '✓ Pass (7.0:1)' : '✗ Fail'"></span>
            </div>
            <div class="p-4 rounded-2xl border" :class="parseFloat(ratio) >= 4.5 ? 'bg-primary/10 border-primary text-primary-content' : 'bg-base-200/50 border-base-300 text-base-content/60'">
                <span class="text-xs font-bold font-mono block">AAA Large Text</span>
                <span class="text-lg font-black mt-1 block" x-text="parseFloat(ratio) >= 4.5 ? '✓ Pass (4.5:1)' : '✗ Fail'"></span>
            </div>
        </div>
    </div>
</x-tool-paper>
