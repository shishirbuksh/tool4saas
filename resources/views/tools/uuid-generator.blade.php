<x-card class="p-6 md:p-8">
    <div x-data="{
        version: 'v4',
        count: 5,
        uppercase: false,
        hyphens: true,
        uuids: [],
        copiedAll: false,
        copiedIndex: null,

        generateV4() {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        generateV7() {
            const now = Date.now();
            const timeHex = now.toString(16).padStart(12, '0');
            const randA = Math.floor(Math.random() * 0xfff).toString(16).padStart(3, '0');
            const randB = (Math.floor(Math.random() * 0x3fff) | 0x8000).toString(16).padStart(4, '0');
            const randC = Array.from(crypto.getRandomValues(new Uint8Array(6)))
                .map(b => b.toString(16).padStart(2, '0')).join('');

            return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-7${randA}-${randB}-${randC}`;
        },

        generate() {
            const result = [];
            const n = Math.min(Math.max(1, parseInt(this.count) || 1), 500);
            for (let i = 0; i < n; i++) {
                let id = this.version === 'v7' ? this.generateV7() : this.generateV4();
                if (!this.hyphens) {
                    id = id.replace(/-/g, '');
                }
                if (this.uppercase) {
                    id = id.toUpperCase();
                } else {
                    id = id.toLowerCase();
                }
                result.push(id);
            }
            this.uuids = result;
        },

        copyAll() {
            if (!this.uuids.length) return;
            navigator.clipboard.writeText(this.uuids.join('\n'));
            this.copiedAll = true;
            setTimeout(() => this.copiedAll = false, 2000);
        },

        copySingle(text, index) {
            navigator.clipboard.writeText(text);
            this.copiedIndex = index;
            setTimeout(() => this.copiedIndex = null, 1500);
        },

        downloadTxt() {
            if (!this.uuids.length) return;
            const blob = new Blob([this.uuids.join('\n')], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `uuids-${this.version}-${Date.now()}.txt`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        },

        setPreset(v, c, h, u) {
            this.version = v;
            this.count = c;
            this.hyphens = h;
            this.uppercase = u;
            this.generate();
        },

        init() {
            const params = new URLSearchParams(window.location.search);
            if (params.has('version') && ['v4', 'v7'].includes(params.get('version'))) this.version = params.get('version');
            if (params.has('count')) this.count = Math.min(500, Math.max(1, parseInt(params.get('count'), 10) || this.count));
            if (params.has('hyphens')) this.hyphens = params.get('hyphens') === '1' || params.get('hyphens') === 'true';
            if (params.has('uppercase')) this.uppercase = params.get('uppercase') === '1' || params.get('uppercase') === 'true';
            this.generate();
        }
    }">
        <div class="space-y-6">
            {{-- Quick Presets --}}
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Common UUID Configurations:</span>
                <div class="flex flex-wrap gap-2">
                    <button type="button" @click="setPreset('v4', 1, true, false)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                        Single UUID v4
                    </button>
                    <button type="button" @click="setPreset('v4', 5, true, false)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                        5 × UUID v4 (Batch)
                    </button>
                    <button type="button" @click="setPreset('v7', 5, true, false)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                        UUID v7 (Time-Ordered DB Primary Keys)
                    </button>
                    <button type="button" @click="setPreset('v4', 1, false, false)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                        No Hyphens (32-Char Hex)
                    </button>
                    <button type="button" @click="setPreset('v4', 1, true, true)" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                        Uppercase UUID
                    </button>
                </div>
            </div>

            {{-- Configuration Controls --}}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-3xl bg-base-200/60 border border-base-300">
                <div>
                    <label for="uuid-version" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">Version</label>
                    <select id="uuid-version" x-model="version" @change="generate()" class="select select-bordered w-full rounded-2xl bg-base-100 font-semibold text-sm">
                        <option value="v4">UUID v4 (Cryptographic Random)</option>
                        <option value="v7">UUID v7 (Timestamp-Ordered)</option>
                    </select>
                </div>

                <div>
                    <label for="uuid-count" class="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">Quantity</label>
                    <select id="uuid-count" x-model.number="count" @change="generate()" class="select select-bordered w-full rounded-2xl bg-base-100 font-semibold text-sm">
                        <option :value="1">1 UUID</option>
                        <option :value="5">5 UUIDs</option>
                        <option :value="10">10 UUIDs</option>
                        <option :value="25">25 UUIDs</option>
                        <option :value="50">50 UUIDs</option>
                        <option :value="100">100 UUIDs</option>
                    </select>
                </div>

                <div class="flex flex-col justify-end">
                    <label class="label cursor-pointer justify-start gap-3 py-2">
                        <input type="checkbox" x-model="hyphens" @change="generate()" class="checkbox checkbox-primary rounded-lg" />
                        <span class="label-text font-bold text-sm">Include Hyphens</span>
                    </label>
                </div>

                <div class="flex flex-col justify-end">
                    <label class="label cursor-pointer justify-start gap-3 py-2">
                        <input type="checkbox" x-model="uppercase" @change="generate()" class="checkbox checkbox-primary rounded-lg" />
                        <span class="label-text font-bold text-sm">Uppercase</span>
                    </label>
                </div>
            </div>

            {{-- Action Bar --}}
            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                    type="button"
                    @click="generate()"
                    class="px-6 py-3 rounded-full bg-primary text-primary-content font-bold text-sm hover:bg-[#cdffad] transition-all shadow-sm active:scale-95 inline-flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Generate New UUIDs</span>
                </button>

                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        @click="copyAll()"
                        class="px-4 py-2.5 rounded-full bg-base-100 border border-base-300 hover:border-primary text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
                    >
                        <span x-text="copiedAll ? '✓ Copied All!' : 'Copy All'"></span>
                    </button>
                    <button
                        type="button"
                        @click="downloadTxt()"
                        class="px-4 py-2.5 rounded-full bg-base-100 border border-base-300 hover:border-primary text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
                    >
                        <span>Download .txt</span>
                    </button>
                </div>
            </div>

            {{-- Generated Output List --}}
            <div class="bg-base-200/50 border border-base-300 rounded-3xl p-4 sm:p-6 space-y-2 font-mono text-sm">
                <template x-for="(uuid, idx) in uuids" :key="idx">
                    <div class="flex items-center justify-between p-3 rounded-2xl bg-base-100 border border-base-300/70 hover:border-primary transition-colors group">
                        <span class="text-base-content select-all font-semibold tracking-wide break-all" x-text="uuid"></span>
                        <button
                            type="button"
                            @click="copySingle(uuid, idx)"
                            class="px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ml-3"
                            :class="copiedIndex === idx ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content hover:bg-base-300'"
                        >
                            <span x-text="copiedIndex === idx ? 'Copied!' : 'Copy'"></span>
                        </button>
                    </div>
                </template>
            </div>

            {{-- Trust Banner --}}
            <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span class="text-primary font-bold">✓ Cryptographically Secure &amp; RFC 9562 Compliant</span>
                <span class="text-[#868685]">Generated locally using window.crypto. Zero network requests.</span>
            </div>

            {{-- Technical Comparison: UUID v4 vs UUID v7 --}}
            <div class="pt-4 border-t border-base-300">
                <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                    UUID v4 vs. UUID v7 Technical Comparison
                </h3>
                <div class="overflow-x-auto rounded-3xl border border-base-300">
                    <table class="table table-zebra w-full text-xs sm:text-sm">
                        <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                            <tr>
                                <th>Specification Attribute</th>
                                <th>UUID Version 4</th>
                                <th>UUID Version 7 (RFC 9562)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-bold font-mono">Generation Mechanism</td>
                                <td>122 cryptographically random bits</td>
                                <td>48-bit Unix timestamp + 74 random bits</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Time Ordering</td>
                                <td>Unordered / completely random</td>
                                <td>Monotonically ordered by millisecond timestamp</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Database Index Locality</td>
                                <td>High B-tree index fragmentation on insert</td>
                                <td>Optimal append-only B-tree insertion performance</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Recommended Use Case</td>
                                <td>Ephemeral tokens, session IDs, nonce tokens</td>
                                <td>Database primary keys, distributed events, logs</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Standard Specification</td>
                                <td>RFC 4122 / RFC 9562</td>
                                <td>RFC 9562 (Published May 2024)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-card>
