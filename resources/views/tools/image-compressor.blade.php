<x-tool-paper x-data="{
    file: null,
    fileName: '',
    origSize: 0,
    quality: 0.8,
    maxWidth: 1920,
    targetKb: 100,
    compressedUrl: '',
    compressedSize: 0,
    busy: false,
    init() {
        const p = new URLSearchParams(window.location.search);
        if (p.has('target')) {
            const t = parseInt(p.get('target'), 10);
            if ([20, 50, 100, 200].includes(t)) this.setTarget(t);
        }
    },
    setTarget(kb) {
        this.targetKb = kb;
        if (kb === 20) {
            this.quality = 0.5;
            this.maxWidth = 400;
        } else if (kb === 50) {
            this.quality = 0.6;
            this.maxWidth = 600;
        } else if (kb === 100) {
            this.quality = 0.7;
            this.maxWidth = 1000;
        } else if (kb === 200) {
            this.quality = 0.8;
            this.maxWidth = 1280;
        }
        if (this.file) this.compress();
    },
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
                        if (this.compressedUrl) URL.revokeObjectURL(this.compressedUrl);
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
            <input aria-label="Upload file for Image Compressor" type="file" x-ref="fileInput" @change="handleFile($event)" accept="image/*" class="hidden" />
            <div class="size-16 rounded-full bg-primary/10 text-[#163300] dark:text-[#9fe870] flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                ⚡
            </div>
            <h3 class="text-base font-bold text-base-content font-display">Drag &amp; drop an image to compress</h3>
            <p class="text-xs text-base-content/60 mt-1">100% in-browser Canvas compression · No file uploaded to servers</p>
            <span class="btn btn-sm btn-primary rounded-full mt-3 font-bold">Select Local Image</span>
        </div>

        {{-- Quick Target Size Presets for Government & Exam Portals --}}
        <div class="flex items-center flex-wrap gap-2 pt-1 pb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mr-1">Portal Targets:</span>
            <button
                type="button"
                @click="setTarget(100)"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                :class="targetKb === 100 ? 'bg-primary text-primary-content border-primary font-bold shadow-xs' : 'bg-base-100 border-base-300 text-base-content hover:border-primary'"
            >
                Under 100 KB (Gov &amp; Exam Portal)
            </button>
            <button
                type="button"
                @click="setTarget(50)"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                :class="targetKb === 50 ? 'bg-primary text-primary-content border-primary font-bold shadow-xs' : 'bg-base-100 border-base-300 text-base-content hover:border-primary'"
            >
                Under 50 KB (Passport Photo)
            </button>
            <button
                type="button"
                @click="setTarget(20)"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                :class="targetKb === 20 ? 'bg-primary text-primary-content border-primary font-bold shadow-xs' : 'bg-base-100 border-base-300 text-base-content hover:border-primary'"
            >
                Under 20 KB (Signature Upload)
            </button>
            <button
                type="button"
                @click="setTarget(200)"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                :class="targetKb === 200 ? 'bg-primary text-primary-content border-primary font-bold shadow-xs' : 'bg-base-100 border-base-300 text-base-content hover:border-primary'"
            >
                Under 200 KB (Web Standard)
            </button>
        </div>

        {{-- Controls --}}
        <template x-if="file">
            <div class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-base-200/50 border border-base-300">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Compression Quality</label>
                            <span class="text-xs font-bold font-mono text-[#163300] dark:text-[#9fe870]" x-text="Math.round(quality * 100) + '%'"></span>
                        </div>
                        <input aria-label="Compression Quality"
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
                        <select aria-label="Max Width (Scaling)" x-model.number="maxWidth" @change="compress()" class="select select-bordered rounded-xl w-full text-xs font-mono">
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

        {{-- Technical Comparison: Image Formats for Web Performance --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Modern Web Image Formats Comparison (WebP vs. AVIF vs. JPEG vs. PNG vs. SVG)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Format</th>
                            <th>Compression Mode</th>
                            <th>Size Savings</th>
                            <th>Alpha Transparency</th>
                            <th>Core Web Vitals (LCP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#2ead4b]">WebP</td>
                            <td>Lossy &amp; Lossless</td>
                            <td class="font-mono text-[#2ead4b]">−25% to −35% vs JPEG</td>
                            <td>Supported</td>
                            <td>Gold standard; supported across 98% of active browsers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#38c8ff]">AVIF</td>
                            <td>Advanced AV1 Intra</td>
                            <td class="font-mono text-[#2ead4b]">−40% to −50% vs JPEG</td>
                            <td>Supported (HDR)</td>
                            <td>Highest compression; slightly higher decode CPU time</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">JPEG / JPG</td>
                            <td>Lossy (DCT)</td>
                            <td>Baseline Standard</td>
                            <td>No</td>
                            <td>Universal fallback; higher byte weight degrades mobile LCP</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">PNG</td>
                            <td>Lossless (Deflate)</td>
                            <td class="font-mono text-warning">Heavy (+100% to +300%)</td>
                            <td>Supported (24-bit)</td>
                            <td>Best for UI screenshots and diagrams requiring crisp pixel lines</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">SVG</td>
                            <td>Vector XML Math</td>
                            <td class="font-mono text-[#2ead4b]">Ultra-Light (&lt; 10 KB)</td>
                            <td>Supported</td>
                            <td>Instantaneous LCP; infinite scaling without resolution loss</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
