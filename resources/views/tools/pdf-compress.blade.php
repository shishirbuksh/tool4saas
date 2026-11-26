<x-card class="p-6 md:p-8" x-data="{
    file: null,
    level: 'recommended',
    busy: false,
    errorMsg: '',
    originalSize: 0,
    compressedSize: 0,
    compressedUrl: '',
    onFile(e) {
        if (this.compressedUrl) {
            URL.revokeObjectURL(this.compressedUrl);
        }
        this.file = e.target.files[0];
        this.originalSize = this.file ? this.file.size : 0;
        this.compressedSize = 0;
        this.compressedUrl = '';
        this.errorMsg = '';
    },
    async compress() {
        if (!this.file) return;
        this.busy = true;
        this.errorMsg = '';
        try {
            const PDFLib = await window.loadPdfLib();
            const bytes = await this.file.arrayBuffer();
            const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
            if (this.level === 'extreme') {
                doc.setTitle('');
                doc.setAuthor('');
                doc.setSubject('');
                doc.setKeywords([]);
                doc.setProducer('');
                doc.setCreator('');
            }
            const outBytes = await doc.save({ useObjectStreams: this.level !== 'low', addDefaultPage: false });
            const blob = new Blob([outBytes], { type: 'application/pdf' });
            this.compressedSize = blob.size;
            if (this.compressedUrl) URL.revokeObjectURL(this.compressedUrl);
            this.compressedUrl = URL.createObjectURL(blob);
        } catch (err) {
            this.errorMsg = 'Could not optimize PDF structure: ' + (err?.message || 'File may be encrypted.');
        } finally {
            this.busy = false;
        }
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <label for="pdf-compress-input" class="sr-only">Upload PDF file to optimize</label>
            <input id="pdf-compress-input" type="file" accept="application/pdf" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload your PDF document to repack object streams and remove redundant metadata locally.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" @click="level = 'low'" class="p-4 rounded-[14px] border cursor-pointer transition-all text-left" :class="level === 'low' ? 'border-primary bg-primary/10' : 'border-base-300'">
                <span class="block font-bold text-xs uppercase text-base-content">Mild Optimization</span>
                <span class="block text-xs text-base-content/60 mt-1">Preserves metadata &amp; layout structure</span>
            </button>
            <button type="button" @click="level = 'recommended'" class="p-4 rounded-[14px] border cursor-pointer transition-all text-left" :class="level === 'recommended' ? 'border-primary bg-primary/10' : 'border-base-300'">
                <span class="block font-bold text-xs uppercase text-base-content">Recommended</span>
                <span class="block text-xs text-base-content/60 mt-1">Balanced object-stream repacking</span>
            </button>
            <button type="button" @click="level = 'extreme'" class="p-4 rounded-[14px] border cursor-pointer transition-all text-left" :class="level === 'extreme' ? 'border-primary bg-primary/10' : 'border-base-300'">
                <span class="block font-bold text-xs uppercase text-base-content">Maximum Stripping</span>
                <span class="block text-xs text-base-content/60 mt-1">Object streams + metadata stripping</span>
            </button>
        </div>

        <div x-show="errorMsg" x-cloak role="alert" class="alert alert-error rounded-2xl text-xs font-semibold" x-text="errorMsg"></div>

        <div class="flex flex-wrap items-center justify-between gap-3">
            <button type="button" @click="compress()" :disabled="!file || busy" class="btn btn-primary rounded-[12px] font-bold min-h-[44px]">
                <span x-show="!busy">Optimize PDF</span>
                <span x-show="busy" x-cloak>Optimizing...</span>
            </button>
            <span x-show="compressedSize > 0" x-cloak class="text-xs font-mono text-base-content/70" x-text="(originalSize/1024).toFixed(1) + ' KB → ' + (compressedSize/1024).toFixed(1) + ' KB'"></span>
        </div>

            <a :href="compressedUrl" download="compressed.pdf" x-show="compressedUrl" class="btn btn-outline rounded-[12px] font-bold">
                Download Optimized PDF
            </a>
        </div>

        {{-- Technical Comparison: PDF DPI Compression Standards --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                PDF Document Resolution (DPI) &amp; Print Quality Compression Standards
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Resolution Tier</th>
                            <th>Target DPI</th>
                            <th>File Reduction %</th>
                            <th>Recommended Distribution Medium</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Web / Email (Compact)</td>
                            <td class="font-mono">72 DPI</td>
                            <td class="font-mono text-[#2ead4b] font-bold">−70% to −85%</td>
                            <td>Email attachments, portal uploads, fast mobile downloads</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">eBook / Office (Medium)</td>
                            <td class="font-mono">150 DPI</td>
                            <td class="font-mono text-primary">−40% to −60%</td>
                            <td>Tablet readers, office memos, internal business reports</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Commercial Print (High)</td>
                            <td class="font-mono">300 DPI</td>
                            <td class="font-mono">−10% to −25%</td>
                            <td>Product catalogs, corporate brochures, physical printing</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Prepress (Lossless)</td>
                            <td class="font-mono">600+ DPI</td>
                            <td class="text-base-content/60">0% (Baseline)</td>
                            <td>Fine-art reproduction, archival legal evidence</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
