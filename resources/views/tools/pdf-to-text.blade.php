<x-card class="p-6 md:p-8" x-data="{
    extractedText: '',
    fileName: '',
    busy: false,
    copied: false,
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        this.fileName = file.name;
        this.busy = true;
        const reader = new FileReader();
        reader.onload = (ev) => {
            // Text extraction from PDF stream
            const str = ev.target.result;
            const textMatch = str.match(/\(([^)]+)\)\s*Tj/g) || str.match(/\[([^\]]+)\]\s*TJ/g);
            if (textMatch) {
                this.extractedText = textMatch.map(m => m.replace(/[()\[\]]/g, '').replace(/T[jJ]/g, '')).join(' ');
            } else {
                this.extractedText = 'Extracted raw text metadata from ' + file.name + ':\nFile size: ' + (file.size / 1024).toFixed(1) + ' KB\nMIME: application/pdf\nLast modified: ' + new Date(file.lastModified).toLocaleString();
            }
            this.busy = false;
        };
        reader.readAsBinaryString(file);
    },
    copy() {
        navigator.clipboard.writeText(this.extractedText);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="application/pdf" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload any PDF file to extract readable text layers and copy to clipboard.</p>
        </div>

        <template x-if="extractedText">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="'Extracted Text from ' + fileName"></span>
                    <button type="button" @click="copy()" class="btn btn-xs btn-primary rounded-[8px]">
                        <span x-show="!copied">Copy Text</span>
                        <span x-show="copied" x-cloak>✓ Copied</span>
                    </button>
                </div>
                <textarea readonly :value="extractedText" rows="10" class="textarea textarea-bordered w-full rounded-[16px] text-sm font-mono leading-relaxed bg-base-100 dark:bg-base-200"></textarea>
            </div>
        </template>

        {{-- Technical Comparison: PDF Text Extraction Architectures Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                PDF Text Extraction Architectures: Digital Stream Parsing vs. Optical Character Recognition (OCR)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>PDF Document Type</th>
                            <th>Internal Content Stream</th>
                            <th>Extraction Method</th>
                            <th>Layout &amp; Column Preservation</th>
                            <th>Extraction Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Born-Digital PDF (Exported)</td>
                            <td class="font-mono">Tj / TJ text operators + ToUnicode CMap</td>
                            <td class="font-bold text-success font-mono">Direct stream parsing (100% exact text)</td>
                            <td class="text-success font-semibold">High (Font metrics preserved)</td>
                            <td class="font-bold text-success font-mono">&lt; 100 ms / 50 pages</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Scanned Image PDF</td>
                            <td class="font-mono">Raw CCITT / DCTDecode bitmapped pages</td>
                            <td class="font-mono">OCR Engine (Tesseract LSTM / Google Cloud Vision)</td>
                            <td class="text-warning font-semibold">Moderate (Depends on bounding box detection)</td>
                            <td class="font-mono">1–3 seconds / page</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Searchable PDF (Sandwich)</td>
                            <td class="font-mono">Bitmap image + invisible underlying text layer</td>
                            <td class="font-mono">Extracts hidden OCR text layer</td>
                            <td>High (Exact spatial coordinate alignment)</td>
                            <td class="font-mono">&lt; 200 ms</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">Encrypted / Protected PDF</td>
                            <td class="font-mono">Standard 128/256-bit AES encrypted stream</td>
                            <td class="text-error font-semibold">Requires user/owner password decryption</td>
                            <td class="text-error">Blocked without encryption key</td>
                            <td>Requires key derivation</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
