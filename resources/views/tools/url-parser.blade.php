<x-tool-paper x-data="{
    rawUrl: 'https://tool4saas.com:443/category/seo-tools?filter=popular&sort=asc#results',
    get parsed() {
        if (!this.rawUrl.trim()) return null;
        try {
            const u = new URL(this.rawUrl.trim());
            const params = [];
            u.searchParams.forEach((val, key) => params.push({ key, val }));
            return {
                protocol: u.protocol,
                hostname: u.hostname,
                port: u.port || '(standard 80/443)',
                origin: u.origin,
                pathname: u.pathname,
                search: u.search || '(none)',
                hash: u.hash || '(none)',
                params: params
            };
        } catch (e) {
            return 'error';
        }
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Target URL to Inspect</label>
            <input
                type="url"
                x-model="rawUrl"
                placeholder="https://example.com:8080/path?param=val#hash"
                class="input input-bordered rounded-2xl w-full text-base font-mono p-4 bg-base-100"
            />
        </div>

        <template x-if="parsed === 'error'">
            <div class="p-4 rounded-2xl bg-error/10 border border-error text-error text-xs font-mono">
                Invalid URL format. Please include scheme (e.g. https://).
            </div>
        </template>

        <template x-if="parsed && parsed !== 'error'">
            <div class="space-y-6">
                {{-- Polarity-Flipped Dark Hero Display --}}
                <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm space-y-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Normalized Origin &amp; Host</span>
                    <div class="text-2xl sm:text-4xl font-black text-primary font-display break-all" x-text="parsed.origin"></div>
                    <p class="text-xs sm:text-sm text-[#868685]">
                        Scheme: <span class="text-white font-bold" x-text="parsed.protocol"></span> · Port: <span class="text-white font-bold" x-text="parsed.port"></span>
                    </p>
                </div>

                {{-- Components Breakdown --}}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 rounded-2xl bg-base-100 border border-base-300">
                        <span class="text-[10px] uppercase font-bold text-base-content/60 font-mono block">Pathname</span>
                        <span class="text-sm font-mono font-bold text-base-content mt-1 block break-all" x-text="parsed.pathname"></span>
                    </div>
                    <div class="p-4 rounded-2xl bg-base-100 border border-base-300">
                        <span class="text-[10px] uppercase font-bold text-base-content/60 font-mono block">Hash / Fragment</span>
                        <span class="text-sm font-mono font-bold text-base-content mt-1 block break-all" x-text="parsed.hash"></span>
                    </div>
                </div>

                {{-- Query Parameters Table --}}
                <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-3">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block">Query Parameters (<span x-text="parsed.params.length"></span>)</span>
                    <template x-if="parsed.params.length === 0">
                        <span class="text-xs text-base-content/50 font-mono">No query string parameters present.</span>
                    </template>
                    <template x-if="parsed.params.length > 0">
                        <div class="overflow-x-auto">
                            <table class="table table-xs w-full font-mono">
                                <thead>
                                    <tr class="text-base-content/60 border-b border-base-300">
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-base-200">
                                    <template x-for="p in parsed.params" :key="p.key">
                                        <tr>
                                            <td class="font-bold text-primary" x-text="p.key"></td>
                                            <td class="break-all" x-text="p.val"></td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</x-tool-paper>
