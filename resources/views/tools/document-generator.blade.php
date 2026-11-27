<x-card class="p-6 md:p-8" x-data="{
    title: 'OFFICIAL DOCUMENT',
    company: 'Tool4SaaS Inc.',
    recipient: 'Valued Client',
    date: new Date().toISOString().split('T')[0],
    body: 'This document certifies that all client computations were executed with zero data storage and maximum privacy.',
    printDoc() {
        window.print();
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Document Title</label>
                <input aria-label="Document Title" type="text" x-model="title" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Issuing Company</label>
                <input aria-label="Issuing Company" type="text" x-model="company" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Recipient Name</label>
                <input aria-label="Recipient Name" type="text" x-model="recipient" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Issue Date</label>
                <input aria-label="Issue Date" type="date" x-model="date" class="input input-bordered w-full rounded-[12px] text-sm font-mono" />
            </div>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Document Body Content</label>
            <textarea aria-label="Document Body Content" x-model="body" rows="4" class="textarea textarea-bordered w-full rounded-[16px] text-sm"></textarea>
        </div>

        <div id="document-print" class="p-8 bg-white text-black rounded-[20px] shadow-sm border border-base-300 space-y-6">
            <div class="flex justify-between items-start border-b pb-4">
                <div>
                    <h2 class="text-2xl font-black uppercase tracking-wide" x-text="title"></h2>
                    <p class="text-sm font-bold text-gray-600" x-text="company"></p>
                </div>
                <div class="text-right text-xs text-gray-500 font-mono" x-text="'Date: ' + date"></div>
            </div>

            <div>
                <p class="text-xs uppercase font-bold text-gray-500">Prepared For:</p>
                <p class="text-lg font-bold" x-text="recipient"></p>
            </div>

            <div class="py-4 text-base leading-relaxed text-gray-800" x-text="body"></div>

            <div class="pt-8 border-t flex justify-between items-center text-xs text-gray-400">
                <span>Tool4SaaS Verified Document</span>
                <span>Signature: _______________________</span>
            </div>
        </div>

        <button type="button" @click="printDoc()" class="btn btn-primary rounded-[12px] font-bold">
            Print / Save as PDF
        </button>

        {{-- Technical Comparison: Business Document Types --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Commercial Legal Contracts &amp; Business Documents Comparison Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Document Type</th>
                            <th>Primary Business Goal</th>
                            <th>Enforceable Legal Scope</th>
                            <th>Binding Commitment Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Non-Disclosure (NDA)</td>
                            <td>Safeguards proprietary data &amp; trade secrets</td>
                            <td>Confidentiality terms, duration, breach damages</td>
                            <td>Strict Legal Liability</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Master Services (MSA)</td>
                            <td>Governs overarching relationship between parties</td>
                            <td>Payment schedules, liability caps, dispute venue</td>
                            <td>Master Framework Agreement</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Statement of Work (SOW)</td>
                            <td>Defines exact deliverables, milestones &amp; deadlines</td>
                            <td>Scope of work, project roadmap, acceptance criteria</td>
                            <td>Project-Specific Binding Scope</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Purchase Order (PO)</td>
                            <td>Authorizes purchase and commercial delivery</td>
                            <td>Itemized SKU quantities, unit pricing, shipping terms</td>
                            <td>Binding once accepted by vendor</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
