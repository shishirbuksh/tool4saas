<x-card class="p-6 md:p-8" x-data="{
    subtotal: 100,
    rate: 7.25,
    state: 'California',
    rates: {
        'California': 7.25, 'Texas': 6.25, 'New York': 4.0, 'Florida': 6.0,
        'Illinois': 6.25, 'Pennsylvania': 6.0, 'Ohio': 5.75, 'Georgia': 4.0,
        'North Carolina': 4.75, 'Michigan': 6.0, 'Washington': 6.5, 'Other': 6.0
    },
    updateState() {
        this.rate = this.rates[this.state] || 6.0;
    },
    get taxAmount() {
        const s = parseFloat(this.subtotal) || 0;
        const r = parseFloat(this.rate) || 0;
        return s * (r / 100);
    },
    get total() {
        return (parseFloat(this.subtotal) || 0) + this.taxAmount;
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Purchase Subtotal ($)</label>
                <input type="number" min="0" step="10" x-model="subtotal" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Select US State</label>
                <select x-model="state" @change="updateState()" class="select select-bordered w-full rounded-[12px] text-sm font-semibold">
                    <template x-for="(r, s) in rates" :key="s">
                        <option :value="s" x-text="s + ' (' + r + '%)'"></option>
                    </template>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Custom Tax Rate (%)</label>
                <input type="number" min="0" max="25" step="0.25" x-model="rate" class="input input-bordered w-full rounded-[12px] font-bold text-base" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-[20px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Calculated Sales Tax</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#9fe870]" x-text="'$' + taxAmount.toFixed(2)"></p>
                <p class="text-xs text-white/70 mt-2" x-text="rate + '% sales tax on $' + Number(subtotal || 0).toFixed(2)"></p>
            </div>

            <div class="p-6 rounded-[20px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase tracking-widest text-base-content/60 font-bold font-mono">Total Transaction Amount</span>
                <p class="font-mono text-4xl font-extrabold mt-2 text-[#163300] dark:text-base-content" x-text="'$' + total.toFixed(2)"></p>
                <p class="text-xs text-base-content/60 mt-2">Gross total with sales tax included</p>
            </div>
        </div>
    </div>
</x-card>
