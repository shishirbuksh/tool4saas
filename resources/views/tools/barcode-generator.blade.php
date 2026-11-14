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
    },
    init() {
        setTimeout(() => this.generate(), 100);
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
    </div>
</x-card>
