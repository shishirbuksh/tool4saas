<x-card class="p-6 md:p-8" x-data="{
    files: [],
    busy: false,
    errorMsg: '',
    onFiles(e) {
        this.files = Array.from(e.target.files);
        this.errorMsg = '';
    },
    async merge() {
        this.errorMsg = '';
        if (this.files.length < 2) {
            this.errorMsg = 'Please select at least 2 PDF files to merge.';
            return;
        }
        this.busy = true;
        try {
            if (!window.PDFLib && window.loadPdfLib) {
                await window.loadPdfLib();
            }
            if (window.PDFLib) {
                const mergedPdf = await window.PDFLib.PDFDocument.create();
                for (const f of this.files) {
                    const bytes = await f.arrayBuffer();
                    const pdf = await window.PDFLib.PDFDocument.load(bytes);
                    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    pages.forEach(p => mergedPdf.addPage(p));
                }
                const pdfBytes = await mergedPdf.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'merged-document.pdf';
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } else {
                this.errorMsg = 'PDF Merge engine could not initialize in this browser.';
            }
        } catch(e) {
            this.errorMsg = 'Merge error: ' + e.message;
        }
        this.busy = false;
    }
}">
    <div class="space-y-6">
        <div x-show="errorMsg" x-cloak role="alert" class="alert alert-error rounded-2xl text-xs font-semibold" x-text="errorMsg"></div>

        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <label for="pdf-merge-input" class="sr-only">Select 2 or more PDF files</label>
            <input id="pdf-merge-input" type="file" accept="application/pdf" multiple @change="onFiles($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Select 2 or more PDF files to combine into a unified multi-page document.</p>
        </div>

        <template x-if="files.length > 0">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="'Selected Documents (' + files.length + ')'"></span>
                    <button type="button" @click="merge()" :disabled="busy || files.length < 2" class="btn btn-primary rounded-[12px] font-bold">
                        <span x-show="!busy">Merge & Download PDF</span>
                        <span x-show="busy" x-cloak>Merging...</span>
                    </button>
                </div>
                <ul class="text-xs font-mono space-y-1 p-4 bg-base-200/50 rounded-[14px]">
                    <template x-for="(f, i) in files" :key="i">
                        <li class="flex justify-between py-1.5 border-b border-base-300/40">
                            <span x-text="(i + 1) + '. ' + f.name"></span>
                            <span class="text-base-content/60" x-text="(f.size / 1024).toFixed(1) + ' KB'"></span>
                        </li>
                    </template>
                </ul>
            </div>
        </template>

        {{-- Technical Comparison: PDF Standards Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                PDF Document Standards Comparison (PDF 1.7 vs. PDF 2.0 vs. PDF/A vs. PDF/X)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>PDF Standard</th>
                            <th>ISO Standard Reference</th>
                            <th>Key Technical Invariant</th>
                            <th>Standard Industry Domain</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">PDF 1.7 (Universal)</td>
                            <td class="font-mono">ISO 32000-1</td>
                            <td>Universal reader compatibility</td>
                            <td>General office documents, web downloads</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">PDF 2.0 (Modern)</td>
                            <td class="font-mono">ISO 32000-2</td>
                            <td>Native 256-bit AES, unbundled open spec</td>
                            <td>Modern cloud workflows, secure signing</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#2ead4b]">PDF/A (Archival)</td>
                            <td class="font-mono">ISO 19005</td>
                            <td>Mandatory embedded fonts; zero active code</td>
                            <td>Legal archives, government filings, medical records</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#38c8ff]">PDF/X (Print)</td>
                            <td class="font-mono">ISO 15930</td>
                            <td>Strict CMYK / spot color management</td>
                            <td>Commercial book printing, offset prepress</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
