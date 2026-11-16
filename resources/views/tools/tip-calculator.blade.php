<x-tool-paper x-data="{
    bill: 84.50,
    tipPercent: 18,
    people: 3,
    get tipAmount() {
        const b = parseFloat(this.bill) || 0;
        const t = parseFloat(this.tipPercent) || 0;
        return (b * (t / 100));
    },
    get totalAmount() {
        const b = parseFloat(this.bill) || 0;
        return b + this.tipAmount;
    },
    get perPersonShare() {
        const p = parseInt(this.people, 10) || 1;
        if (p < 1) return 0;
        return this.totalAmount / p;
    }
}">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <x-numeric-field label="Bill Subtotal" model="bill" prefix="$" placeholder="84.50" />
        <x-numeric-field label="Split Between (Guests)" model="people" min="1" step="1" placeholder="3" />
    </div>

    {{-- Tip Percentage Slider & Quick Buttons --}}
    <div class="mb-8 p-5 rounded-3xl bg-base-200/60 border border-base-300">
        <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-base-content font-display">Tip Percentage</span>
            <span class="text-xl font-black text-base-content font-display"><span x-text="tipPercent"></span>%</span>
        </div>
        <input type="range" min="0" max="35" step="1" x-model.number="tipPercent" class="range range-primary range-sm w-full" />
        <div class="flex flex-wrap gap-2 mt-4">
            @foreach([10, 15, 18, 20, 25] as $rate)
                <button
                    type="button"
                    class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                    :class="tipPercent === {{ $rate }} ? 'bg-primary text-primary-content shadow-xs' : 'bg-base-100 border border-base-300 text-base-content hover:border-primary'"
                    @click="tipPercent = {{ $rate }}"
                >
                    {{ $rate }}%
                </button>
            @endforeach
        </div>
    </div>

    {{-- Result Display --}}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div class="p-6 rounded-3xl bg-base-200/70 border border-base-300">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Tip Amount</span>
            <div class="text-3xl font-black text-base-content my-1 font-display tabular-nums">
                $<span x-text="tipAmount.toFixed(2)"></span>
            </div>
            <span class="text-xs text-base-content/70"><span x-text="tipPercent" class="font-bold"></span>% of bill</span>
        </div>

        <div class="p-6 rounded-3xl bg-base-200/70 border border-base-300">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Total Bill</span>
            <div class="text-3xl font-black text-base-content my-1 font-display tabular-nums">
                $<span x-text="totalAmount.toFixed(2)"></span>
            </div>
            <span class="text-xs text-base-content/70">Subtotal + Tip</span>
        </div>

        <div class="p-6 rounded-3xl bg-primary text-primary-content border border-primary shadow-xs">
            <span class="text-xs font-bold uppercase tracking-wider text-primary-content/80 font-mono">Each Person Pays</span>
            <div class="text-3xl font-black my-1 font-display tabular-nums">
                $<span x-text="perPersonShare.toFixed(2)"></span>
            </div>
            <span class="text-xs text-primary-content/85">Split for <span x-text="people" class="font-bold"></span> guests</span>
        </div>

        {{-- Technical Comparison: Global Tipping Etiquette --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Global Tipping Etiquette &amp; Gratuity Standards Comparison Table
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Country / Region</th>
                            <th>Restaurant Tip %</th>
                            <th>Expectation Level</th>
                            <th>Cultural Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">United States</td>
                            <td class="font-mono text-primary font-bold">18% – 22%</td>
                            <td class="text-error font-bold">Expected / Customary</td>
                            <td>Servers earn lower base wage offset by tip credit laws</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Canada</td>
                            <td class="font-mono text-primary font-bold">15% – 20%</td>
                            <td class="text-warning font-bold">Expected / Customary</td>
                            <td>Standard dining norm across all provinces</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">United Kingdom</td>
                            <td class="font-mono">10% – 12.5%</td>
                            <td>Discretionary / Optional</td>
                            <td>Often included as an optional line-item service charge</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">France &amp; Germany</td>
                            <td class="font-mono">5% – 10% (Round Up)</td>
                            <td>Service Included (Compris)</td>
                            <td>Fair living wage built into menu pricing; round up small change</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#2ead4b]">Japan &amp; South Korea</td>
                            <td class="font-mono text-[#2ead4b] font-bold">0% (Strictly No Tip)</td>
                            <td class="text-[#2ead4b]">Not Accepted / Avoid</td>
                            <td>Quality service is an inherent duty; tipping can cause offense</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#2ead4b]">Australia &amp; NZ</td>
                            <td class="font-mono text-[#2ead4b]">0% – 10%</td>
                            <td>Optional / Exceptional Only</td>
                            <td>High minimum wage laws guarantee sustainable hospitality pay</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
