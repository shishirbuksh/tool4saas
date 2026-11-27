<x-card class="p-6 md:p-8" x-data="{
    text: '123456789012',
    format: 'CODE128',
    width: 2,
    height: 100,
    error: '',
    generate() {
        this.error = '';
        if (!this.text) return;
        try {
            if (window.JsBarcode) {
                window.JsBarcode(this.$refs.barcodeSvg, this.text, {
                    format: this.format,
                    width: parseInt(this.width) || 2,
                    height: parseInt(this.height) || 100,
                    displayValue: true,
                    lineColor: '#000000',
                    background: '#ffffff',
                    margin: 10
                });
            }
        } catch(e) {
            this.error = e.message || 'Invalid barcode input for format ' + this.format;
        }
    },
    downloadSvg() {
        const svg = this.$refs.barcodeSvg;
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'barcode-' + this.format + '.svg';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    async init() {
        if (!window.JsBarcode && window.loadJsBarcode) {
            await window.loadJsBarcode();
        }
        setTimeout(() => this.generate(), 50);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Data to Encode</label>
                <input type="text" x-model="text" @input="generate()" class="input input-bordered w-full rounded-[12px] font-mono text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Symbology Format</label>
                <select x-model="format" @change="generate()" class="select select-bordered w-full rounded-[12px] text-sm font-semibold">
                    <option value="CODE128">CODE128 (Alphanumeric)</option>
                    <option value="EAN13">EAN-13 (13 Digits Retail)</option>
                    <option value="UPC">UPC-A (12 Digits Retail)</option>
                </select>
            </div>

            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Width</label>
                    <input type="number" min="1" max="4" x-model="width" @input="generate()" class="input input-bordered w-full rounded-[12px] text-sm" />
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Height</label>
                    <input type="number" min="30" max="200" step="10" x-model="height" @input="generate()" class="input input-bordered w-full rounded-[12px] text-sm" />
                </div>
            </div>
        </div>

        <template x-if="error">
            <div class="alert alert-error rounded-[14px]">
                <span x-text="error"></span>
            </div>
        </template>

        <div class="p-8 bg-white rounded-[20px] border border-base-300 flex flex-col items-center justify-center min-h-[220px]">
            <svg x-ref="barcodeSvg" class="max-w-full"></svg>
        </div>

        <div class="flex gap-3">
            <button type="button" @click="downloadSvg()" class="btn btn-primary rounded-[12px] font-bold">
                Download SVG Barcode
            </button>
        </div>

        {{-- Technical Comparison: Barcode Symbologies Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                1D &amp; 2D Barcode Symbologies Comparison Matrix (GS1 &amp; ISO Standards)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Symbology</th>
                            <th>Data Capacity</th>
                            <th>Supported Character Set</th>
                            <th>Error Correction</th>
                            <th>Primary Industry Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Code 128</td>
                            <td class="font-mono">High (Variable length)</td>
                            <td class="font-mono">Full 128 ASCII table</td>
                            <td class="font-mono">Modulo-103 checksum</td>
                            <td>Shipping, logistics, FedEx/UPS labels</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">EAN-13</td>
                            <td class="font-mono">13 numeric digits</td>
                            <td class="font-mono">Numeric (0-9)</td>
                            <td class="font-mono">Modulo-10 check digit</td>
                            <td>Global retail POS (Europe, Asia, LatAm)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">UPC-A</td>
                            <td class="font-mono">12 numeric digits</td>
                            <td class="font-mono">Numeric (0-9)</td>
                            <td class="font-mono">Modulo-10 check digit</td>
                            <td>North American supermarket retail POS</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Code 39</td>
                            <td class="font-mono">Low to Moderate</td>
                            <td class="font-mono">43 alphanumeric chars</td>
                            <td class="font-mono">Optional Modulo-43</td>
                            <td>Automotive, US DoD, healthcare inventory</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">ITF-14 (Interleaved 2 of 5)</td>
                            <td class="font-mono">14 numeric digits</td>
                            <td class="font-mono">Numeric (0-9 pairs)</td>
                            <td class="font-mono">Modulo-10 check digit</td>
                            <td>Corrugated shipping cartons / master cases</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
