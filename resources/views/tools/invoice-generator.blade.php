<x-tool-paper x-data="{
    invoiceNumber: 'INV-2026-001',
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    fromName: 'Acme Design Studio',
    fromEmail: 'billing@acmedesign.com',
    fromAddress: '100 Innovation Way, Suite 400\nSan Francisco, CA 94107',
    toName: 'Client Corporation',
    toEmail: 'accounts@clientcorp.com',
    toAddress: '500 Market St, Floor 12\nNew York, NY 10001',
    currency: '$',
    items: [
        { desc: 'Web Application UI/UX Design System', qty: 1, rate: 2400 },
        { desc: 'Client-Side Offline Tool Development', qty: 40, rate: 65 }
    ],
    taxRate: 8.5,
    notes: 'Thank you for your business. Payment is due within 14 days via bank wire or ACH.',
    addItem() {
        this.items.push({ desc: '', qty: 1, rate: 0 });
    },
    removeItem(index) {
        if (this.items.length > 1) {
            this.items.splice(index, 1);
        }
    },
    get subtotal() {
        return this.items.reduce((sum, item) => sum + ((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0)), 0);
    },
    get taxAmount() {
        return (this.subtotal * (parseFloat(this.taxRate) || 0)) / 100;
    },
    get grandTotal() {
        return this.subtotal + this.taxAmount;
    },
    printInvoice() {
        window.print();
    }
}">
    {{-- Invoice Action Toolbar --}}
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-base-300">
        <div>
            <h2 class="text-xl font-bold text-base-content font-display">Invoice Editor</h2>
            <p class="text-xs text-base-content/60 mt-0.5">Edit live and click Print/Save to export clean PDF with zero watermark.</p>
        </div>
        <div class="flex items-center gap-3">
            <button
                type="button"
                @click="printInvoice()"
                class="px-6 py-2.5 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-sm transition-all shadow-xs flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print / Save PDF</span>
            </button>
        </div>
    </div>

    {{-- Printable Invoice Paper Surface --}}
    <div id="invoice-print" class="bg-base-100 rounded-2xl border border-base-300 p-6 sm:p-10 shadow-sm space-y-8">
        {{-- Invoice Header --}}
        <div class="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-base-300 pb-8">
            <div>
                <span class="text-3xl font-black font-display text-base-content tracking-tight">INVOICE</span>
                <div class="mt-2 text-xs font-mono text-base-content/60">
                    <div>Invoice #: <input type="text" x-model="invoiceNumber" class="font-bold text-base-content bg-transparent border-b border-base-300 focus:outline-none w-36" /></div>
                    <div class="mt-1">Date: <input type="date" x-model="invoiceDate" class="bg-transparent text-base-content focus:outline-none" /></div>
                    <div class="mt-1">Due Date: <input type="date" x-model="dueDate" class="bg-transparent text-base-content focus:outline-none" /></div>
                </div>
            </div>

            <div class="sm:text-right">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Currency</span>
                <div class="mt-1">
                    <select x-model="currency" class="select select-sm select-bordered rounded-xl text-xs font-bold">
                        <option value="$">USD ($)</option>
                        <option value="€">EUR (€)</option>
                        <option value="£">GBP (£)</option>
                        <option value="₹">INR (₹)</option>
                        <option value="¥">JPY (¥)</option>
                        <option value="C$">CAD (C$)</option>
                        <option value="A$">AUD (A$)</option>
                    </select>
                </div>
            </div>
        </div>

        {{-- From & To Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="p-5 rounded-2xl bg-base-200/50 border border-base-300">
                <span class="text-xs font-bold uppercase tracking-wider text-primary font-mono block mb-2">Billed From (Your Business)</span>
                <input type="text" x-model="fromName" placeholder="Your Business / Full Name" class="input input-bordered input-sm rounded-xl w-full font-bold mb-2 text-sm" />
                <input type="email" x-model="fromEmail" placeholder="your@email.com" class="input input-bordered input-sm rounded-xl w-full text-xs mb-2" />
                <textarea x-model="fromAddress" rows="2" placeholder="Full street address, city, tax ID" class="textarea textarea-bordered rounded-xl w-full text-xs"></textarea>
            </div>

            <div class="p-5 rounded-2xl bg-base-200/50 border border-base-300">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Billed To (Client Details)</span>
                <input type="text" x-model="toName" placeholder="Client Name / Corporation" class="input input-bordered input-sm rounded-xl w-full font-bold mb-2 text-sm" />
                <input type="email" x-model="toEmail" placeholder="client@email.com" class="input input-bordered input-sm rounded-xl w-full text-xs mb-2" />
                <textarea x-model="toAddress" rows="2" placeholder="Client street address, tax ID" class="textarea textarea-bordered rounded-xl w-full text-xs"></textarea>
            </div>
        </div>

        {{-- Line Items Table --}}
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full text-sm">
                    <thead>
                        <tr class="border-b border-base-300 text-xs font-mono text-base-content/70">
                            <th class="w-1/2">Item Description</th>
                            <th class="text-center w-20">Qty</th>
                            <th class="text-right w-28">Rate</th>
                            <th class="text-right w-28">Amount</th>
                            <th class="w-12 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template x-for="(item, index) in items" :key="index">
                            <tr class="border-b border-base-200">
                                <td>
                                    <input type="text" x-model="item.desc" placeholder="Service or product description..." class="input input-sm input-bordered rounded-xl w-full text-xs sm:text-sm" />
                                </td>
                                <td>
                                    <input type="number" x-model.number="item.qty" min="1" step="1" class="input input-sm input-bordered rounded-xl w-20 text-center text-xs tabular-nums" />
                                </td>
                                <td>
                                    <input type="number" x-model.number="item.rate" min="0" step="any" class="input input-sm input-bordered rounded-xl w-28 text-right text-xs tabular-nums" />
                                </td>
                                <td class="text-right font-bold text-sm tabular-nums">
                                    <span x-text="currency"></span><span x-text="((item.qty || 0) * (item.rate || 0)).toFixed(2)"></span>
                                </td>
                                <td class="text-center">
                                    <button
                                        type="button"
                                        @click="removeItem(index)"
                                        class="btn btn-ghost btn-xs text-error"
                                        :disabled="items.length <= 1"
                                    >
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div class="pt-4">
                <button
                    type="button"
                    @click="addItem()"
                    class="px-4 py-2 rounded-full border border-base-300 hover:border-primary text-xs font-bold text-base-content transition-colors flex items-center gap-1.5"
                >
                    <span>+ Add Line Item</span>
                </button>
            </div>
        </div>

        {{-- Totals Summary --}}
        <div class="flex flex-col sm:flex-row justify-between items-start gap-8 pt-4 border-t border-base-300">
            <div class="w-full sm:max-w-md">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Notes &amp; Payment Instructions</label>
                <textarea x-model="notes" rows="3" class="textarea textarea-bordered rounded-2xl w-full text-xs leading-relaxed"></textarea>
            </div>

            <div class="w-full sm:w-72 space-y-2 text-sm">
                <div class="flex justify-between py-1">
                    <span class="text-base-content/70">Subtotal:</span>
                    <span class="font-bold tabular-nums"><span x-text="currency"></span><span x-text="subtotal.toFixed(2)"></span></span>
                </div>
                <div class="flex items-center justify-between py-1">
                    <div class="flex items-center gap-1 text-base-content/70">
                        <span>Tax Rate:</span>
                        <input type="number" x-model.number="taxRate" step="0.1" class="input input-xs input-bordered rounded-lg w-14 text-center" />
                        <span>%</span>
                    </div>
                    <span class="tabular-nums"><span x-text="currency"></span><span x-text="taxAmount.toFixed(2)"></span></span>
                </div>
                <div class="flex justify-between py-3 border-t-2 border-base-300 text-lg font-black font-display text-base-content">
                    <span>Grand Total:</span>
                    <span class="tabular-nums text-primary"><span x-text="currency"></span><span x-text="grandTotal.toFixed(2)"></span></span>
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
