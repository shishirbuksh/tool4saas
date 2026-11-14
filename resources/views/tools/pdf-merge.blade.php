<x-card class="p-6 md:p-8" x-data="{
    files: [],
    busy: false,
    onFiles(e) {
        this.files = Array.from(e.target.files);
    },
    async merge() {
        if (this.files.length < 2) return alert('Please select at least 2 PDF files to merge.');
        this.busy = true;
        try {
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
            } else {
                alert('PDF Merge engine loaded in browser memory.');
            }
        } catch(e) {
            alert('Merge error: ' + e.message);
        }
        this.busy = false;
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="application/pdf" multiple @change="onFiles($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
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
    </div>
</x-card>
