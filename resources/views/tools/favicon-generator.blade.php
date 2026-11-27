<x-card class="p-6 md:p-8" x-data="{
    text: '🚀',
    bg: '#163300',
    fg: '#9fe870',
    size: 64,
    dataUrl: '',
    generate() {
        const canvas = document.createElement('canvas');
        canvas.width = this.size;
        canvas.height = this.size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = this.bg;
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.fillStyle = this.fg;
        ctx.font = Math.floor(this.size * 0.65) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text.slice(0, 2), this.size / 2, this.size / 2 + this.size * 0.05);
        this.dataUrl = canvas.toDataURL('image/png');
    },
    init() {
        this.generate();
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Icon / Letter (1-2 chars)</label>
                <input aria-label="Icon / Letter (1-2 chars)" type="text" x-model="text" @input="generate()" maxlength="2" class="input input-bordered w-full rounded-[12px] font-bold text-center text-xl" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Background Color</label>
                <div class="flex items-center gap-2">
                    <input aria-label="Background color picker" type="color" x-model="bg" @input="generate()" class="w-10 h-10 rounded-[10px] cursor-pointer border-0 bg-transparent" />
                    <input aria-label="Background Color" type="text" x-model="bg" @input="generate()" class="input input-sm input-bordered rounded-[8px] font-mono w-28 uppercase" />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Text / Symbol Color</label>
                <div class="flex items-center gap-2">
                    <input aria-label="Foreground color picker" type="color" x-model="fg" @input="generate()" class="w-10 h-10 rounded-[10px] cursor-pointer border-0 bg-transparent" />
                    <input aria-label="Text / Symbol Color" type="text" x-model="fg" @input="generate()" class="input input-sm input-bordered rounded-[8px] font-mono w-28 uppercase" />
                </div>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Output Size</label>
                <select aria-label="Output Size" x-model="size" @change="generate()" class="select select-bordered w-full rounded-[12px] text-sm font-mono">
                    <option :value="32">32 x 32 px (Standard Favicon)</option>
                    <option :value="64">64 x 64 px (Retina Favicon)</option>
                    <option :value="192">192 x 192 px (PWA Android)</option>
                    <option :value="512">512 x 512 px (PWA Splash)</option>
                </select>
            </div>
        </div>

        <div class="p-6 bg-base-200/50 rounded-[20px] border border-base-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-4">
                <img :src="dataUrl" alt="Favicon Preview" class="w-16 h-16 rounded-[14px] shadow-sm border border-base-300" />
                <div>
                    <h4 class="font-bold text-sm">Preview Canvas</h4>
                    <p class="text-xs text-base-content/60" x-text="size + ' × ' + size + ' PNG Favicon'"></p>
                </div>
            </div>

            <a :href="dataUrl" :download="'favicon-' + size + 'x' + size + '.png'" class="btn btn-primary rounded-[12px] font-bold">
                Download Favicon PNG
            </a>
        </div>

        {{-- Technical Comparison: Favicon Sizes Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Modern Web Favicon Sizes &amp; Device Targets Specification Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Pixel Size</th>
                            <th>File Format</th>
                            <th>HTML Link Tag Target</th>
                            <th>Operating System &amp; Device Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">16 × 16 px</td>
                            <td class="font-mono">ICO / PNG</td>
                            <td class="font-mono text-xs">&lt;link rel="icon"&gt;</td>
                            <td>Standard desktop browser tabs, URL bookmarks</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">32 × 32 px</td>
                            <td class="font-mono">ICO / PNG</td>
                            <td class="font-mono text-xs">&lt;link rel="icon"&gt;</td>
                            <td>High-DPI Retina browser tabs, Windows taskbar</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">180 × 180 px</td>
                            <td class="font-mono">PNG</td>
                            <td class="font-mono text-xs">&lt;link rel="apple-touch-icon"&gt;</td>
                            <td>Apple iOS Home Screen bookmark icon</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">192 × 192 px</td>
                            <td class="font-mono">PNG</td>
                            <td class="font-mono text-xs">manifest.webmanifest</td>
                            <td>Android Home Screen launcher shortcut</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">512 × 512 px</td>
                            <td class="font-mono">PNG</td>
                            <td class="font-mono text-xs">manifest.webmanifest</td>
                            <td>Progressive Web App (PWA) splash screen</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
