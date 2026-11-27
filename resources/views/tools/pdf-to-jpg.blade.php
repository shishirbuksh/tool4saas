<x-card class="p-6 md:p-8">
    <div class="space-y-6" x-data="{
        file: null,
        busy: false,
        errorMsg: '',
        pages: [],
        onFile(e) {
            this.file = e.target.files[0];
            this.pages = [];
            this.errorMsg = '';
        },
        async convert() {
            if (!this.file) return;
            this.busy = true;
            this.errorMsg = '';
            this.pages = [];
            try {
                const pdfjsLib = await window.loadPdfJs();
                const buffer = await this.file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
                const rendered = [];
                for (let num = 1; num <= pdf.numPages; num++) {
                    const page = await pdf.getPage(num);
                    const viewport = page.getViewport({ scale: 1.75 });
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    await page.render({ canvasContext: ctx, viewport }).promise;
                    rendered.push({ num, url: canvas.toDataURL('image/jpeg', 0.92) });
                }
                this.pages = rendered;
            } catch (err) {
                this.errorMsg = 'Could not render PDF pages: ' + (err?.message || 'Encrypted or malformed PDF.');
            } finally {
                this.busy = false;
            }
        }
    }">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <label for="pdf-to-jpg-input" class="sr-only">Upload PDF document</label>
            <input id="pdf-to-jpg-input" type="file" accept="application/pdf" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload any PDF file to render pages into individual JPG images cleanly in your browser.</p>
        </div>

        <div x-show="errorMsg" x-cloak role="alert" class="alert alert-error rounded-2xl text-xs font-semibold" x-text="errorMsg"></div>

        <div class="flex items-center justify-between">
            <button type="button" @click="convert()" :disabled="!file || busy" class="btn btn-primary rounded-[12px] font-bold min-h-[44px]">
                <span x-show="!busy">Convert PDF to JPG</span>
                <span x-show="busy" x-cloak>Rendering Pages...</span>
            </button>
        </div>

        <template x-if="pages.length > 0">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <template x-for="p in pages" :key="p.num">
                    <div class="p-3 rounded-[14px] bg-base-200/50 border border-base-300 space-y-2 text-center">
                        <img :src="p.url" :alt="'Converted PDF page ' + p.num" class="w-full aspect-[3/4] object-contain rounded-[8px] bg-white border" />
                        <a :href="p.url" :download="'page-' + p.num + '.jpg'" class="btn btn-sm btn-primary rounded-[8px] w-full min-h-[36px]">
                            Download JPG
                        </a>
                    </div>
                </template>
            </div>
        </template>

        {{-- Technical Comparison: PDF Rasterization Resolution & DPI Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                PDF Page Rasterization Resolution, DPI Scales &amp; Output Quality Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Resolution Preset</th>
                            <th>Rendering DPI</th>
                            <th>A4 Page Pixel Dimensions</th>
                            <th>Avg JPG File Size / Page</th>
                            <th>Recommended Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Web Screen (Low)</td>
                            <td class="font-mono">72 DPI</td>
                            <td class="font-mono">595 × 842 px</td>
                            <td class="font-mono text-success font-bold">~80 KB – 150 KB</td>
                            <td>Fast web page previews, mobile carousel thumbnails</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Standard Presentation</td>
                            <td class="font-mono font-bold">150 DPI</td>
                            <td class="font-mono">1240 × 1754 px</td>
                            <td class="font-mono">~350 KB – 600 KB</td>
                            <td>Email attachments, tablet viewing, digital slide decks</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Commercial Print Ready</td>
                            <td class="font-mono font-bold text-success">300 DPI</td>
                            <td class="font-mono">2480 × 3508 px</td>
                            <td class="font-mono">~1.5 MB – 3.2 MB</td>
                            <td>Hardcopy laser printing, legal contracts, archival scans</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Fine Art / Architectural</td>
                            <td class="font-mono">600 DPI</td>
                            <td class="font-mono">4960 × 7016 px</td>
                            <td class="font-mono text-error">~6.0 MB – 14 MB</td>
                            <td>Large format blueprints, engineering CAD drawings, offset press</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
