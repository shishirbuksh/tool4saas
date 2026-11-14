<x-tool-paper x-data="{
    amount: 1000,
    rate: 18,
    mode: 'exclusive',
    currencySymbol: '$',
    get numAmount() {
        return Math.max(0, parseFloat(this.amount) || 0);
    },
    get numRate() {
        return Math.max(0, parseFloat(this.rate) || 0);
    },
    get gstAmount() {
        if (this.mode === 'exclusive') {
            return this.numAmount * (this.numRate / 100);
        } else {
            const net = this.numAmount / (1 + (this.numRate / 100));
            return this.numAmount - net;
        }
    },
    get netPrice() {
        if (this.mode === 'exclusive') {
            return this.numAmount;
        } else {
            return this.numAmount - this.gstAmount;
        }
    },
    get totalPrice() {
        if (this.mode === 'exclusive') {
            return this.numAmount + this.gstAmount;
        } else {
            return this.numAmount;
        }
    },
    get halfGst() {
        return this.gstAmount / 2;
    }
}">
    <div class="space-y-6">
        {{-- Mode Selector --}}
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'exclusive'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'exclusive' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                GST Exclusive (Add Tax)
            </button>
            <button
                type="button"
                @click="mode = 'inclusive'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'inclusive' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                GST Inclusive (Extract Tax)
            </button>
        </div>

        {{-- Inputs Grid --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <x-numeric-field label="Initial Amount" model="amount" prefix="$" placeholder="1000" />
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">GST Rate Slab</span></label>
                <div class="flex gap-2">
                    <select x-model.number="rate" class="select select-bordered rounded-xl w-full text-sm">
                        <option value="3">3% (Precious Metals)</option>
                        <option value="5">5% (Essential Goods)</option>
                        <option value="12">12% (Standard Low)</option>
                        <option value="18">18% (Services &amp; Standard)</option>
                        <option value="28">28% (Luxury &amp; Sin Goods)</option>
                    </select>
                </div>
            </div>
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Currency</span></label>
                <select x-model="currencySymbol" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="$">USD / CAD / AUD ($)</option>
                    <option value="€">EUR (€)</option>
                    <option value="£">GBP (£)</option>
                    <option value="₹">INR (₹)</option>
                    <option value="¥">JPY / CNY (¥)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Card --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Total GST / Tax Amount</span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="currencySymbol"></span><span x-text="gstAmount.toFixed(2)"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Calculated at <span x-text="rate"></span>% rate (<span x-text="mode === 'exclusive' ? 'Added on top of net amount' : 'Deducted from gross total'"></span>)
            </p>
        </div>

        {{-- Breakdown Cards --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Net Pre-Tax Price</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="netPrice.toFixed(2)"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">CGST (50%)</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="halfGst.toFixed(2)"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">SGST / UTGST (50%)</span>
                <div class="text-2xl font-black text-base-content mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="halfGst.toFixed(2)"></span>
                </div>
            </div>
            <div class="p-5 rounded-2xl bg-base-200/70 border border-base-300">
                <span class="text-[11px] font-bold text-base-content/60 uppercase tracking-wider font-mono">Gross Total Bill</span>
                <div class="text-2xl font-black text-primary mt-1 font-display tabular-nums">
                    <span x-text="currencySymbol"></span><span x-text="totalPrice.toFixed(2)"></span>
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
