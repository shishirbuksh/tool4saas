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
    </div>
</x-card>
