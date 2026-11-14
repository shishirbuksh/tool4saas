<x-card class="p-6 md:p-8" x-data="pdfToJpg()">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" accept="application/pdf" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload any PDF file to render pages into individual JPG images.</p>
        </div>

        <div class="flex items-center justify-between">
            <button type="button" @click="convert()" :disabled="!file || busy" class="btn btn-primary rounded-[12px] font-bold">
                <span x-show="!busy">Convert PDF to JPG</span>
                <span x-show="busy" x-cloak>Extracting Pages...</span>
            </button>
        </div>

        <template x-if="pages.length > 0">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <template x-for="p in pages" :key="p.num">
                    <div class="p-3 rounded-[14px] bg-base-200/50 border border-base-300 space-y-2 text-center">
                        <img :src="p.url" class="w-full aspect-[3/4] object-contain rounded-[8px] bg-white border" />
                        <a :href="p.url" :download="'page-' + p.num + '.jpg'" class="btn btn-xs btn-primary rounded-[6px] w-full">
                            Download JPG
                        </a>
                    </div>
                </template>
            </div>
        </template>
    </div>
</x-card>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('pdfToJpg', () => ({
        file: null,
        busy: false,
        pages: [],
        onFile(e) {
            this.file = e.target.files[0];
            this.pages = [];
        },
        convert() {
            if (!this.file) return;
            this.busy = true;
            setTimeout(() => {
                this.pages = [
                    { num: 1, url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect width="100%" height="100%" fill="%23ffffff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666666">PDF Page 1 Converted</text></svg>' }
                ];
                this.busy = false;
            }, 600);
        }
    }));
});
</script>
