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
                <input type="text" x-model="title" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Issuing Company</label>
                <input type="text" x-model="company" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Recipient Name</label>
                <input type="text" x-model="recipient" class="input input-bordered w-full rounded-[12px] text-sm" />
            </div>
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">Issue Date</label>
                <input type="date" x-model="date" class="input input-bordered w-full rounded-[12px] text-sm font-mono" />
            </div>
        </div>

        <div>
            <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Document Body Content</label>
            <textarea x-model="body" rows="4" class="textarea textarea-bordered w-full rounded-[16px] text-sm"></textarea>
        </div>

        <div class="p-8 bg-white text-black rounded-[20px] shadow-sm border border-base-300 space-y-6">
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
    </div>
</x-card>
