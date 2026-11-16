<x-tool-paper x-data="{
    price: 120,
    discount: 25,
    tax: 8,
    includeTax: true,
    get savings() {
        const p = parseFloat(this.price) || 0;
        const d = parseFloat(this.discount) || 0;
        return (p * d) / 100;
    },
    get discountedPrice() {
        const p = parseFloat(this.price) || 0;
        return Math.max(0, p - this.savings);
    },
    get taxAmount() {
        if (!this.includeTax) return 0;
        const t = parseFloat(this.tax) || 0;
        return (this.discountedPrice * t) / 100;
    },
    get finalPayable() {
        return this.discountedPrice + this.taxAmount;
    }
}">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <x-numeric-field label="Original Price" model="price" prefix="$" placeholder="120" />
        <x-numeric-field label="Discount (%)" model="discount" suffix="%" placeholder="25" />
        <x-numeric-field label="Sales Tax (%)" model="tax" suffix="%" placeholder="8" />
    </div>

    <div class="form-control mb-8">
        <label class="label cursor-pointer justify-start gap-3">
            <input type="checkbox" x-model="includeTax" class="checkbox checkbox-primary checkbox-sm" />
            <span class="label-text font-bold text-sm text-base-content">Include Sales Tax in final payable calculation</span>
        </label>
    </div>

    {{-- Result Display (Wise 3-Card Grid) --}}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div class="p-6 rounded-3xl bg-base-200/70 border border-base-300">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">You Save</span>
            <div class="text-3xl sm:text-4xl font-black text-[#2ead4b] my-1 font-display tabular-nums">
                $<span x-text="savings.toFixed(2)"></span>
            </div>
            <span class="text-xs text-base-content/70"><span x-text="discount" class="font-bold"></span>% total discount</span>
        </div>

        <div class="p-6 rounded-3xl bg-base-200/70 border border-base-300">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Sale Price (Pre-Tax)</span>
            <div class="text-3xl sm:text-4xl font-black text-base-content my-1 font-display tabular-nums">
                $<span x-text="discountedPrice.toFixed(2)"></span>
            </div>
            <span class="text-xs text-base-content/70">Before state/sales taxes</span>
        </div>

        <div class="p-6 rounded-3xl bg-primary text-primary-content border border-primary shadow-xs">
            <span class="text-xs font-bold uppercase tracking-wider text-primary-content/80 font-mono">Final Payable</span>
            <div class="text-3xl sm:text-4xl font-black my-1 font-display tabular-nums">
                $<span x-text="finalPayable.toFixed(2)"></span>
            </div>
            <span class="text-xs text-primary-content/85">
                <template x-if="includeTax">
                    <span>Includes $<span x-text="taxAmount.toFixed(2)" class="font-bold"></span> sales tax</span>
                </template>
                <template x-if="!includeTax">
                    <span>Tax excluded</span>
                </template>
            </span>
        </div>

        {{-- Technical Comparison: Discount Strategy Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Promotional Discount Types Comparison (Percentage Off vs. Flat Dollar Off vs. BOGO)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Discount Model</th>
                            <th>Effective Math</th>
                            <th>Consumer Perception</th>
                            <th>Optimal Retail Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Percentage Off (e.g. 30% Off)</td>
                            <td>Price × (1 − Discount% / 100)</td>
                            <td>High urgency on high-ticket products</td>
                            <td>Electronics, luxury apparel, sitewide flash sales</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Flat Dollar Off ($25 Off $100)</td>
                            <td>Price − Fixed Dollar Value</td>
                            <td>Tangible cash-savings feeling</td>
                            <td>Lifting Minimum Average Order Value (AOV)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">BOGO (Buy One Get One Free)</td>
                            <td>50% discount on 2 units</td>
                            <td>Perceived as 100% free gift</td>
                            <td>Moving high-volume inventory, consumables</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Tiered Cart Thresholds</td>
                            <td>Graduated % based on spend</td>
                            <td>Gamifies checkout; drives upsell</td>
                            <td>SaaS annual billing, departmental stores</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
