<x-card class="p-6 md:p-8" x-data="{
    input: '',
    copied: false,
    copyAll() {
        const emails = this.extractedEmails;
        if (!emails.length) return;
        window.copyTextSafe(emails.join('\n'));
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    },
    copySingle(email) {
        window.copyTextSafe(email);
    },
    get extractedEmails() {
        if (!this.input) return [];
        const matches = this.input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
        if (!matches) return [];
        return Array.from(new Set(matches));
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-sm font-bold text-[#163300] dark:text-[#9fe870] uppercase tracking-wider mb-2">
                Paste Text Containing Email Addresses
            </label>
            <textarea aria-label="Paste Text Containing Email Addresses"
                x-model="input"
                rows="6"
                placeholder="Paste customer logs, raw CSVs, contact pages, or inquiries here..."
                class="textarea textarea-bordered w-full rounded-[16px] text-base leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary font-mono text-sm"
            ></textarea>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-base-300 pb-4">
            <div class="flex items-center gap-2">
                <span class="text-sm font-semibold">Found Unique Emails:</span>
                <span class="badge badge-primary font-mono font-bold" x-text="extractedEmails.length"></span>
            </div>
            <div class="flex gap-2">
                <button
                    type="button"
                    @click="copyAll()"
                    :disabled="extractedEmails.length === 0"
                    class="btn btn-primary btn-sm rounded-[12px] font-bold"
                >
                    <span x-show="!copied">Copy All Emails</span>
                    <span x-show="copied" x-cloak>✓ Copied All!</span>
                </button>
                <button
                    type="button"
                    @click="input = ''"
                    class="btn btn-ghost btn-sm rounded-[12px]"
                >
                    Clear
                </button>
            </div>
        </div>

        <template x-if="extractedEmails.length === 0">
            <div class="py-12 text-center text-base-content/50 border-2 border-dashed border-base-300 rounded-[16px]">
                <p class="text-sm font-medium">No valid email addresses detected yet.</p>
                <p class="text-xs mt-1">Paste your text above to instantly parse and deduplicate emails.</p>
            </div>
        </template>

        <template x-if="extractedEmails.length > 0">
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                <template x-for="(email, idx) in extractedEmails" :key="idx">
                    <div class="flex items-center justify-between p-3 rounded-[12px] bg-base-200/50 border border-base-300 hover:border-primary transition-colors">
                        <span class="font-mono text-sm text-[#163300] dark:text-base-content select-all" x-text="email"></span>
                        <button
                            type="button"
                            @click="copySingle(email)"
                            class="btn btn-ghost btn-xs rounded-[8px] hover:btn-primary"
                        >
                            Copy
                        </button>
                    </div>
                </template>
            </div>
        </template>

        {{-- Technical Comparison: Email Syntax Standards & Validation Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                RFC 5322 Email Syntax Standards, Regex Accuracy &amp; Deliverability Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Email Standard / Type</th>
                            <th>Syntax Pattern Example</th>
                            <th>RFC 5322 Spec Status</th>
                            <th>Max Length Limit</th>
                            <th>Parsing &amp; Delivery Consideration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Standard Mailbox</td>
                            <td class="font-mono">user@example.com</td>
                            <td class="text-success font-semibold">Fully Valid (Standard)</td>
                            <td class="font-mono">254 chars (64 local / 255 domain)</td>
                            <td>100% universal support across all MTAs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Sub-addressing (Plus)</td>
                            <td class="font-mono">user+tag@example.com</td>
                            <td class="text-success font-semibold">Fully Valid (RFC 5233)</td>
                            <td class="font-mono">64 chars local part</td>
                            <td>Supported by Gmail, Outlook, Fastmail for filtering</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Dots in Local Part</td>
                            <td class="font-mono">first.last@domain.co.uk</td>
                            <td class="text-success font-semibold">Fully Valid (No consecutive dots)</td>
                            <td class="font-mono">64 chars local part</td>
                            <td>Gmail ignores dots; corporate servers treat uniquely</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Internationalized (IDN)</td>
                            <td class="font-mono">pelé@brasil.br (Punycode)</td>
                            <td class="font-mono">RFC 6530 (SMTPUTF8)</td>
                            <td class="font-mono">254 UTF-8 octets</td>
                            <td>Requires Punycode (<code class="font-mono">xn--</code>) conversion on legacy MTAs</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">Quoted String Local</td>
                            <td class="font-mono">"john doe"@domain.com</td>
                            <td class="text-warning font-semibold">Technically Valid</td>
                            <td class="font-mono">64 chars local part</td>
                            <td class="text-error">Rejected by 95%+ web forms &amp; transactional APIs</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
