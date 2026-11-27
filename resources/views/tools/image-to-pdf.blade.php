<x-card class="p-6 md:p-8">
    <div class="space-y-6" x-data="{
        images: [],
        busy: false,
        errorMsg: '',
        onFiles(e) {
            this.errorMsg = '';
            const files = Array.from(e.target.files);
            files.forEach(f => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.images.push({ name: f.name, type: f.type, dataUrl: ev.target.result });
                };
                reader.readAsDataURL(f);
            });
        },
        async toPngBytes(dataUrl) {
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = dataUrl;
            });
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');
            const res = await fetch(pngUrl);
            return await res.arrayBuffer();
        },
        async downloadPdf() {
            if (!this.images.length) return;
            this.busy = true;
            this.errorMsg = '';
            try {
                const PDFLib = await window.loadPdfLib();
                const pdfDoc = await PDFLib.PDFDocument.create();
                for (const item of this.images) {
                    let embedded;
                    if (item.type === 'image/jpeg' || item.type === 'image/jpg') {
                        const bytes = await (await fetch(item.dataUrl)).arrayBuffer();
                        embedded = await pdfDoc.embedJpg(bytes);
                    } else {
                        const pngBytes = item.type === 'image/png'
                            ? await (await fetch(item.dataUrl)).arrayBuffer()
                            : await this.toPngBytes(item.dataUrl);
                        embedded = await pdfDoc.embedPng(pngBytes);
                    }
                    const page = pdfDoc.addPage([embedded.width, embedded.height]);
                    page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
                }
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'images-compiled.pdf';
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } catch (e) {
                this.errorMsg = 'PDF creation error: ' + (e?.message || 'Unsupported image format.');
            } finally {
                this.busy = false;
            }
        }
    }">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <label for="image-to-pdf-input" class="sr-only">Upload images to compile into PDF</label>
            <input id="image-to-pdf-input" type="file" accept="image/*" multiple @change="onFiles($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Select one or multiple images to compile cleanly into a downloadable binary PDF document.</p>
        </div>

        <div x-show="errorMsg" x-cloak role="alert" class="alert alert-error rounded-2xl text-xs font-semibold" x-text="errorMsg"></div>

        <template x-if="images.length > 0">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="'Ready Pages (' + images.length + ')'"></span>
                    <button type="button" @click="downloadPdf()" :disabled="busy" class="btn btn-primary rounded-[12px] font-bold min-h-[44px]">
                        <span x-show="!busy">Compile &amp; Download PDF</span>
                        <span x-show="busy" x-cloak>Compiling PDF...</span>
                    </button>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <template x-for="(img, idx) in images" :key="idx">
                        <div class="relative rounded-[12px] overflow-hidden border border-base-300 aspect-[3/4] bg-base-200">
                            <img :src="img.dataUrl" :alt="img.name || ('Page ' + (idx + 1))" class="w-full h-full object-cover" />
                            <div class="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded" x-text="'Page ' + (idx + 1)"></div>
                        </div>
                    </template>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Standard Paper Sizes Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Standard International &amp; North American Paper Sizes Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Page Format</th>
                            <th>Millimeters (mm)</th>
                            <th>Inches (in)</th>
                            <th>Pixels @ 300 DPI</th>
                            <th>Geographic Adoption</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">ISO A4 (Global)</td>
                            <td class="font-mono">210 × 297 mm</td>
                            <td class="font-mono">8.27 × 11.69 in</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">2,480 × 3,508 px</td>
                            <td>International standard (Europe, Asia, UK, Australia)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">US Letter</td>
                            <td class="font-mono">215.9 × 279.4 mm</td>
                            <td class="font-mono">8.50 × 11.00 in</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">2,550 × 3,300 px</td>
                            <td>North America (United States, Canada, Mexico)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">US Legal</td>
                            <td class="font-mono">215.9 × 355.6 mm</td>
                            <td class="font-mono">8.50 × 14.00 in</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">2,550 × 4,200 px</td>
                            <td>Legal court records, real estate deeds, contracts</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">ISO A3</td>
                            <td class="font-mono">297 × 420 mm</td>
                            <td class="font-mono">11.69 × 16.54 in</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870]">3,508 × 4,960 px</td>
                            <td>Drawings, presentations, large financial sheets</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
