<x-card class="p-6 md:p-8" x-data="{
    files: [],
    zipName: 'archive.zip',
    busy: false,
    errorMsg: '',
    onFiles(e) {
        this.files = Array.from(e.target.files);
        this.errorMsg = '';
    },
    async createZip() {
        if (!this.files.length) return;
        this.busy = true;
        this.errorMsg = '';
        try {
            const zip = {};
            for (const f of this.files) {
                const buf = await f.arrayBuffer();
                zip[f.name] = new Uint8Array(buf);
            }
            if (!window.fflate && window.loadFflate) {
                await window.loadFflate();
            }
            if (window.fflate) {
                const zipped = window.fflate.zipSync(zip);
                const blob = new Blob([zipped], { type: 'application/zip' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = this.zipName || 'archive.zip';
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } else {
                this.errorMsg = 'ZIP compression module is loading. Please try again.';
            }
        } catch(e) {
            this.errorMsg = 'Zip error: ' + e.message;
        }
        this.busy = false;
    }
}">
    <div class="space-y-6">
        <div x-show="errorMsg" x-cloak role="alert" class="alert alert-error rounded-2xl text-xs font-semibold" x-text="errorMsg"></div>
        <div>
            <label for="zip-archive-name" class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Archive Name</label>
            <input id="zip-archive-name" type="text" x-model="zipName" class="input input-bordered w-full max-w-xs rounded-[12px] font-mono text-sm" />
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

        {{-- Technical Comparison: Archive Compression Formats Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Archive Compression Formats: ZIP vs. TAR.GZ vs. 7-Zip vs. RAR Standards Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Archive Format</th>
                            <th>Compression Algorithm</th>
                            <th>Compression Ratio</th>
                            <th>Native OS Support (Without 3rd-party apps)</th>
                            <th>Best Production Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">ZIP (.zip)</td>
                            <td class="font-mono">DEFLATE / BZIP2 / Deflate64</td>
                            <td class="font-mono">Moderate (~50%–70% text reduction)</td>
                            <td class="font-bold text-success font-mono">100% Native (Windows Explorer, macOS Finder, Linux)</td>
                            <td>Universal consumer file transfer, email attachments, digital products</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">TAR.GZ (.tar.gz / .tgz)</td>
                            <td class="font-mono">POSIX tar + Gzip LZ77</td>
                            <td class="font-mono">High (Solid stream compression)</td>
                            <td>Native Linux / macOS / Unix terminal (<code class="font-mono">tar -xzf</code>)</td>
                            <td>Linux packages, software source tarballs, Docker container layers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-success">7-Zip (.7z)</td>
                            <td class="font-mono font-bold text-success">LZMA / LZMA2 / BCJ2</td>
                            <td class="font-bold text-success font-mono">Highest (30%–50% better than ZIP)</td>
                            <td class="text-warning font-semibold">Requires 7-Zip or p7zip utility</td>
                            <td>Archiving massive game assets, VM disk images, database dumps</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">RAR (.rar)</td>
                            <td class="font-mono">Proprietary Roshal Archive</td>
                            <td class="font-mono">Very High + Recovery Records</td>
                            <td class="text-error font-semibold">Requires WinRAR or unrar license</td>
                            <td>Multi-part split archives, error-recovery parity archives</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
