<x-card class="p-6 md:p-8" x-data="{
    query: '',
    copied: false,
    map: {
        'txt': 'text/plain', 'html': 'text/html', 'css': 'text/css', 'csv': 'text/csv',
        'json': 'application/json', 'xml': 'application/xml', 'js': 'text/javascript',
        'ts': 'text/typescript', 'pdf': 'application/pdf', 'zip': 'application/zip',
        'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'gif': 'image/gif',
        'webp': 'image/webp', 'svg': 'image/svg+xml', 'ico': 'image/x-icon', 'avif': 'image/avif',
        'mp3': 'audio/mpeg', 'wav': 'audio/wav', 'ogg': 'audio/ogg', 'mp4': 'video/mp4',
        'webm': 'video/webm', 'woff': 'font/woff', 'woff2': 'font/woff2', 'ttf': 'font/ttf',
        'doc': 'application/msword', 'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel', 'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    get result() {
        const q = this.query.trim().toLowerCase().replace(/^\./, '');
        if (!q) return null;
        if (this.map[q]) return { ext: q, mime: this.map[q], type: 'ext' };
        for (const [ext, mime] of Object.entries(this.map)) {
            if (mime.toLowerCase() === q) return { ext, mime, type: 'mime' };
        }
        return 'none';
    },
    copy(text) {
        navigator.clipboard.writeText(text);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-sm font-bold text-[#163300] dark:text-[#9fe870] uppercase tracking-wider mb-2">
                Search by Extension or MIME Type
            </label>
            <input
                type="text"
                x-model="query"
                placeholder="e.g. .pdf, image/png, json, text/css..."
                class="input input-bordered w-full rounded-[16px] text-base bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary font-mono"
            />
        </div>

        <template x-if="result && result !== 'none'">
            <div class="p-6 bg-base-200/50 rounded-[20px] border border-base-300 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 bg-base-100 rounded-[14px] border border-base-300">
                        <span class="text-xs uppercase font-bold text-base-content/70">File Extension</span>
                        <p class="font-mono text-xl font-bold mt-1 text-primary" x-text="'.' + result.ext"></p>
                    </div>
                    <div class="p-4 bg-base-100 rounded-[14px] border border-base-300">
                        <span class="text-xs uppercase font-bold text-base-content/70">MIME Content-Type</span>
                        <p class="font-mono text-lg font-bold mt-1 text-[#163300] dark:text-[#9fe870] break-all" x-text="result.mime"></p>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button type="button" @click="copy(result.mime)" class="btn btn-sm btn-primary rounded-[10px]">
                        Copy MIME Type
                    </button>
                    <button type="button" @click="copy('.' + result.ext)" class="btn btn-sm btn-outline rounded-[10px]">
                        Copy Extension
                    </button>
                </div>
            </div>
        </template>

        <template x-if="result === 'none'">
            <div class="alert alert-info rounded-[14px]">
                <span>No exact MIME match found in standard web table. Check your spelling or query.</span>
            </div>
        </template>

        {{-- Technical Comparison: Standard Web MIME Types Matrix --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Standard Web MIME Media Types &amp; File Extensions Reference Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>File Extension</th>
                            <th>MIME Media Type String</th>
                            <th>IANA Type</th>
                            <th>Primary Web Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">.json</td>
                            <td class="font-mono font-bold">application/json</td>
                            <td>Application</td>
                            <td>REST API data transfer, app configs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">.html</td>
                            <td class="font-mono font-bold">text/html</td>
                            <td>Text</td>
                            <td>Web markup document structure</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">.js / .mjs</td>
                            <td class="font-mono font-bold">text/javascript</td>
                            <td>Text</td>
                            <td>Client browser scripting &amp; ES modules</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">.webp</td>
                            <td class="font-mono font-bold">image/webp</td>
                            <td>Image</td>
                            <td>Modern lightweight web photos</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">.pdf</td>
                            <td class="font-mono font-bold">application/pdf</td>
                            <td>Application</td>
                            <td>Downloadable invoices, resumes, reports</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">.xml</td>
                            <td class="font-mono font-bold">application/xml</td>
                            <td>Application</td>
                            <td>XML Sitemaps, RSS feeds, data exchange</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
