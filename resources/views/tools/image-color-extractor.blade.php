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
        navigator.clipboard.writeText(hex);
        this.copied = hex;
        setTimeout(() => this.copied = '', 2000);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
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
    </div>
</x-card>
