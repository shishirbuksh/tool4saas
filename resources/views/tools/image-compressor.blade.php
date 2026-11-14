<x-tool-paper x-data="{
    file: null,
    fileName: '',
    origSize: 0,
    quality: 0.8,
    maxWidth: 1920,
    compressedUrl: '',
    compressedSize: 0,
    busy: false,
    handleFile(e) {
        const f = e.target.files ? e.target.files[0] : (e.dataTransfer ? e.dataTransfer.files[0] : null);
        if (!f || !f.type.startsWith('image/')) return;
        this.file = f;
        this.fileName = f.name;
        this.origSize = f.size;
        this.compressedUrl = '';
        this.compressedSize = 0;
        this.compress();
    },
    compress() {
        if (!this.file) return;
        this.busy = true;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                let w = img.width;
                let h = img.height;
                if (w > this.maxWidth) {
                    h = Math.round((h * this.maxWidth) / w);
                    w = this.maxWidth;
                }
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const mime = this.file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                canvas.toBlob((blob) => {
                    if (blob) {
                        this.compressedUrl = URL.createObjectURL(blob);
                        this.compressedSize = blob.size;
                    }
                    this.busy = false;
                }, mime, parseFloat(this.quality) || 0.8);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(this.file);
    },
    fmtBytes(bytes) {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
    },
    get savingsPercent() {
        if (!this.origSize || !this.compressedSize) return 0;
        return Math.max(0, Math.round((1 - (this.compressedSize / this.origSize)) * 100));
    },
    download() {
        if (!this.compressedUrl) return;
        const a = document.createElement('a');
        a.href = this.compressedUrl;
        a.download = 'compressed-' + this.fileName;
        a.click();
    }
}">
    <div class="space-y-6">
        {{-- File Upload Drop Zone --}}
        <div
            @dragover.prevent
            @drop.prevent="handleFile($event)"
            class="border-2 border-dashed border-base-300 rounded-3xl p-8 text-center hover:border-primary transition-colors bg-base-100 cursor-pointer"
            @click="$refs.fileInput.click()"
        >
            <input type="file" x-ref="fileInput" @change="handleFile($event)" accept="image/*" class="hidden" />
            <div class="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                ⚡
            </div>
            <h3 class="text-base font-bold text-base-content font-display">Drag &amp; drop an image to compress</h3>
            <p class="text-xs text-base-content/60 mt-1">100% in-browser Canvas compression · No file uploaded to servers</p>
            <span class="btn btn-sm btn-primary rounded-full mt-3 font-bold">Select Local Image</span>
        </div>

        {{-- Controls --}}
        <template x-if="file">
            <div class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-base-200/50 border border-base-300">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Compression Quality</label>
                            <span class="text-xs font-bold font-mono text-primary" x-text="Math.round(quality * 100) + '%'"></span>
                        </div>
                        <input
                            type="range"
                            x-model="quality"
                            @change="compress()"
                            min="0.1"
                            max="1.0"
                            step="0.05"
                            class="range range-xs range-primary w-full"
                        />
                    </div>
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Max Width (Scaling)</label>
                            <span class="text-xs font-bold font-mono" x-text="maxWidth + 'px'"></span>
                        </div>
                        <select x-model.number="maxWidth" @change="compress()" class="select select-bordered rounded-xl w-full text-xs font-mono">
                            <option value="1920">1920px (Full HD)</option>
                            <option value="1280">1280px (Web standard)</option>
                            <option value="800">800px (Blog images)</option>
                            <option value="400">400px (Thumbnails)</option>
                        </select>
                    </div>
                </div>

                {{-- Polarity-Flipped Dark Hero Card with Reduction Stats --}}
                <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Storage Reduction</span>
                    <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                        −<span x-text="savingsPercent"></span>%
                    </div>
                    <p class="text-xs sm:text-sm text-[#868685]">
                        <span class="text-white font-bold" x-text="fmtBytes(origSize)"></span> down to <span class="text-primary font-bold" x-text="fmtBytes(compressedSize)"></span>
                    </p>
                    <div class="pt-4">
                        <button
                            type="button"
                            @click="download()"
                            :disabled="!compressedUrl || busy"
                            class="px-8 py-3 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-sm font-bold transition-all shadow-xs disabled:opacity-40"
                        >
                            <span x-text="busy ? 'Compressing...' : 'Download Compressed Image'"></span>
                        </button>
                    </div>
                </div>

                {{-- Preview --}}
                <template x-if="compressedUrl">
                    <div class="p-6 rounded-3xl bg-base-100 border border-base-300 flex items-center justify-center">
                        <img :src="compressedUrl" alt="Compressed Preview" class="max-h-80 max-w-full rounded-2xl object-contain shadow-xs" />
                    </div>
                </template>
            </div>
        </template>
    </div>
</x-tool-paper>
