<x-card class="p-6 md:p-8">
    <div class="space-y-6" x-data="{
        images: [],
        busy: false,
        onFiles(e) {
            const files = Array.from(e.target.files);
            files.forEach(f => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.images.push({ name: f.name, dataUrl: ev.target.result });
                };
                reader.readAsDataURL(f);
            });
        },
        downloadPdf() {
            if (!this.images.length) return;
            this.busy = true;
            try {
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                    let html = '<html><head><title>Document PDF</title><style>@page{margin:0;} body{margin:0;padding:20px;text-align:center;} img{max-width:100%;max-height:95vh;page-break-after:always;display:block;margin:0 auto 20px;}</style></head><body>';
                    this.images.forEach(img => {
                        html += '<img src=\"' + img.dataUrl + '\" />';
                    });
                    html += '</body></html>';
                    printWindow.document.write(html);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                        printWindow.print();
                    }, 500);
                }
            } catch(e) {
                alert('PDF creation error: ' + e.message);
            }
            this.busy = false;
        }
    }">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="image/*" multiple @change="onFiles($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Select one or multiple images to compile into a downloadable PDF document.</p>
        </div>

        <template x-if="images.length > 0">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="'Ready Pages (' + images.length + ')'"></span>
                    <button type="button" @click="downloadPdf()" class="btn btn-primary rounded-[12px] font-bold">
                        Compile & Export PDF
                    </button>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <template x-for="(img, idx) in images" :key="idx">
                        <div class="relative rounded-[12px] overflow-hidden border border-base-300 aspect-[3/4] bg-base-200">
                            <img :src="img.dataUrl" class="w-full h-full object-cover" />
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
                            <td class="font-bold font-mono text-primary">ISO A4 (Global)</td>
                            <td class="font-mono">210 × 297 mm</td>
                            <td class="font-mono">8.27 × 11.69 in</td>
                            <td class="font-mono text-primary">2,480 × 3,508 px</td>
                            <td>International standard (Europe, Asia, UK, Australia)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">US Letter</td>
                            <td class="font-mono">215.9 × 279.4 mm</td>
                            <td class="font-mono">8.50 × 11.00 in</td>
                            <td class="font-mono text-primary">2,550 × 3,300 px</td>
                            <td>North America (United States, Canada, Mexico)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">US Legal</td>
                            <td class="font-mono">215.9 × 355.6 mm</td>
                            <td class="font-mono">8.50 × 14.00 in</td>
                            <td class="font-mono text-primary">2,550 × 4,200 px</td>
                            <td>Legal court records, real estate deeds, contracts</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">ISO A3</td>
                            <td class="font-mono">297 × 420 mm</td>
                            <td class="font-mono">11.69 × 16.54 in</td>
                            <td class="font-mono text-primary">3,508 × 4,960 px</td>
                            <td>Drawings, presentations, large financial sheets</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
