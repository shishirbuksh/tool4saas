<x-card class="p-6 md:p-8" x-data="{
    format: 'image/webp',
    quality: 90,
    fileName: '',
    originalSize: 0,
    convertedSize: 0,
    convertedUrl: '',
    busy: false,
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        this.fileName = file.name;
        this.originalSize = file.size;
        this.convertedUrl = '';
        this.convert(file);
    },
    convert(file) {
        this.busy = true;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const q = (parseInt(this.quality) || 90) / 100;
                canvas.toBlob((blob) => {
                    if (blob) {
                        this.convertedSize = blob.size;
                        this.convertedUrl = URL.createObjectURL(blob);
                    }
                    this.busy = false;
                }, this.format, q);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    },
    get extension() {
        if (this.format === 'image/jpeg') return 'jpg';
        if (this.format === 'image/png') return 'png';
        return 'webp';
    },
    formatBytes(bytes) {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Convert Target Format</label>
                <select x-model="format" class="select select-bordered w-full rounded-[12px] font-semibold text-sm">
                    <option value="image/webp">WebP (Modern Next-Gen Web)</option>
                    <option value="image/jpeg">JPEG / JPG (Standard Photo)</option>
                    <option value="image/png">PNG (Lossless Transparent)</option>
                </select>
            </div>

            <div x-show="format !== 'image/png'">
                <div class="flex justify-between items-center mb-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Image Quality</label>
                    <span class="text-xs font-mono font-bold" x-text="quality + '%'"></span>
                </div>
                <input type="range" min="10" max="100" step="5" x-model="quality" class="range range-primary range-sm" />
            </div>
        </div>

        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Select any PNG, JPG, WebP, GIF, or BMP image. 100% in-browser processing.</p>
        </div>

        <template x-if="convertedUrl">
            <div class="p-6 bg-base-200/50 rounded-[20px] border border-base-300 space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h4 class="font-bold text-sm" x-text="fileName"></h4>
                        <div class="flex items-center gap-3 text-xs text-base-content/70 mt-1">
                            <span>Original: <strong x-text="formatBytes(originalSize)"></strong></span>
                            <span>→</span>
                            <span class="text-primary font-bold">Converted: <strong x-text="formatBytes(convertedSize)"></strong></span>
                        </div>
                    </div>

                    <a :href="convertedUrl" :download="'converted.' + extension" class="btn btn-primary rounded-[12px] font-bold">
                        Download <span x-text="extension.toUpperCase()"></span>
                    </a>
                </div>

                <div class="flex justify-center max-h-[300px] overflow-hidden rounded-[14px] bg-base-100 p-2">
                    <img :src="convertedUrl" alt="Converted Preview" class="max-h-[280px] object-contain rounded-[10px]" />
                </div>
            </div>
        </template>
    </div>
</x-card>
