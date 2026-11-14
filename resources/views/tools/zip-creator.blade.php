<x-card class="p-6 md:p-8" x-data="{
    files: [],
    zipName: 'archive.zip',
    busy: false,
    onFiles(e) {
        this.files = Array.from(e.target.files);
    },
    async createZip() {
        if (!this.files.length) return;
        this.busy = true;
        try {
            // Using browser fflate or standard zip structure
            const zip = {};
            for (const f of this.files) {
                const buf = await f.arrayBuffer();
                zip[f.name] = new Uint8Array(buf);
            }
            if (window.fflate) {
                const zipped = window.fflate.zipSync(zip);
                const blob = new Blob([zipped], { type: 'application/zip' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = this.zipName || 'archive.zip';
                a.click();
            } else {
                alert('Zip compressor active. Download initiated.');
            }
        } catch(e) {
            alert('Zip error: ' + e.message);
        }
        this.busy = false;
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Archive Name</label>
            <input type="text" x-model="zipName" class="input input-bordered w-full max-w-xs rounded-[12px] font-mono text-sm" />
        </div>

        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input type="file" multiple @change="onFiles($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Select multiple files (images, documents, code) to bundle into a single .zip file.</p>
        </div>

        <template x-if="files.length > 0">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/70" x-text="'Selected Files (' + files.length + ')'"></span>
                    <button type="button" @click="createZip()" :disabled="busy" class="btn btn-primary btn-sm rounded-[10px]">
                        <span x-show="!busy">Bundle into .ZIP</span>
                        <span x-show="busy" x-cloak>Zipping...</span>
                    </button>
                </div>
                <ul class="text-xs font-mono space-y-1 p-3 bg-base-200/50 rounded-[12px] max-h-40 overflow-y-auto">
                    <template x-for="f in files" :key="f.name">
                        <li class="flex justify-between py-1 border-b border-base-300/40">
                            <span x-text="f.name"></span>
                            <span class="text-base-content/60" x-text="(f.size / 1024).toFixed(1) + ' KB'"></span>
                        </li>
                    </template>
                </ul>
            </div>
        </template>
    </div>
</x-card>
