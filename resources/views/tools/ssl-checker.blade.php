<x-tool-paper>
    <div x-data="{
        domain: '',
        loading: false,
        error: '',
        result: null,
        async checkSsl() {
            if (!this.domain.trim()) return;
            this.loading = true;
            this.error = '';
            this.result = null;

            try {
                const response = await fetch('/api/ssl-check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ domain: this.domain })
                });

                const data = await response.json();
                if (!response.ok) {
                    this.error = data.error || 'Failed to check SSL certificate.';
                } else {
                    this.result = data;
                }
            } catch (e) {
                this.error = 'Network error: could not connect to verification server.';
            } finally {
                this.loading = false;
            }
        }
    }">
        <div class="mb-8">
            <label class="block text-sm font-bold text-base-content font-display mb-2">Website Hostname or Domain URL</label>
            <div class="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    x-model="domain"
                    @keydown.enter="checkSsl()"
                    placeholder="example.com or https://github.com"
                    class="input input-bordered rounded-2xl flex-1 w-full text-base p-4"
                />
                <button
                    type="button"
                    @click="checkSsl()"
                    :disabled="loading || !domain.trim()"
                    class="px-6 py-3 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-sm transition-all shadow-xs disabled:opacity-50 shrink-0"
                >
                    <span x-show="loading" class="loading loading-spinner loading-sm"></span>
                    <span x-show="!loading">Check Certificate →</span>
                </button>
            </div>
            <p class="text-xs text-base-content/60 mt-2 font-mono">
                Connects over port 443 with SNI validation to inspect the active X.509 certificate and verify expiry.
            </p>
        </div>

        {{-- Error Alert --}}
        <div x-show="error" style="display: none;" class="alert alert-error mb-6 rounded-2xl text-xs py-3 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span x-text="error"></span>
        </div>

        {{-- Result View --}}
        <template x-if="result">
            <div class="space-y-6">
                {{-- Status Banner (Wise 24px Card) --}}
                <div :class="result.isValid ? 'bg-[#e2f6d5] border-[#c5edab] text-[#054d28]' : 'bg-[#d03238]/15 border-[#d03238]/30 text-[#a7000d]'" class="p-6 sm:p-8 rounded-3xl border flex items-center justify-between shadow-xs">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider font-mono" x-text="result.isValid ? 'SSL Certificate Valid' : 'Certificate Expired / Invalid'"></span>
                        <h3 class="text-2xl sm:text-3xl font-black mt-1 font-display tracking-tight" x-text="result.daysRemaining + ' days remaining'"></h3>
                        <p class="text-xs mt-1.5 opacity-80" x-text="'Issued for: ' + result.subject"></p>
                    </div>
                    <div class="text-4xl">
                        <span x-show="result.isValid">🔒</span>
                        <span x-show="!result.isValid">⚠️</span>
                    </div>
                </div>

                {{-- Certificate Details Table --}}
                <div class="overflow-x-auto rounded-2xl border border-base-300">
                    <table class="table w-full text-sm">
                        <tbody>
                            <tr class="border-b border-base-200">
                                <th class="w-1/3 bg-base-200/50 font-bold text-xs uppercase font-mono text-base-content/70">Issuer Authority</th>
                                <td x-text="result.issuer" class="font-mono text-xs"></td>
                            </tr>
                            <tr class="border-b border-base-200">
                                <th class="bg-base-200/50 font-bold text-xs uppercase font-mono text-base-content/70">Subject Common Name</th>
                                <td x-text="result.subject" class="font-mono text-xs"></td>
                            </tr>
                            <tr class="border-b border-base-200">
                                <th class="bg-base-200/50 font-bold text-xs uppercase font-mono text-base-content/70">Valid From</th>
                                <td x-text="result.validFrom"></td>
                            </tr>
                            <tr>
                                <th class="bg-base-200/50 font-bold text-xs uppercase font-mono text-base-content/70">Valid Until</th>
                                <td x-text="result.validTo" class="font-bold"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </div>
</x-tool-paper>
