<x-tool-paper>
    <div x-data="{
        text: 'https://tool4saas.com',
        size: 256,
        errorCorrection: 'M',
        margin: 2,
        darkColor: '#000000',
        lightColor: '#ffffff',
        renderQr() {
            if (!this.text.trim()) return;
            const canvas = document.getElementById('qr-canvas');
            if (!canvas) return;

            if (window.QRCode && window.QRCode.toCanvas) {
                window.QRCode.toCanvas(canvas, this.text, {
                    width: parseInt(this.size, 10),
                    margin: parseInt(this.margin, 10),
                    errorCorrectionLevel: this.errorCorrection,
                    color: {
                        dark: this.darkColor,
                        light: this.lightColor
                    }
                }, (error) => {
                    if (error) console.error(error);
                });
            }
        },
        downloadPng() {
            const canvas = document.getElementById('qr-canvas');
            if (!canvas) return;
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        },
        init() {
            this.$nextTick(() => {
                this.renderQr();
            });
        }
    }">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {{-- Left: Inputs & Options --}}
            <div class="lg:col-span-2 space-y-6">
                <div>
                    <label class="block text-sm font-semibold mb-2">QR Code Content (URL or Text)</label>
                    <textarea
                        x-model="text"
                        @input="renderQr()"
                        rows="3"
                        placeholder="https://example.com or any text..."
                        class="textarea textarea-bordered w-full text-base font-normal leading-relaxed"
                    ></textarea>
                </div>

                {{-- Presets Quick Buttons --}}
                <div>
                    <span class="text-xs font-bold text-base-content/60 block mb-2 uppercase tracking-wider font-mono">Quick Templates</span>
                    <div class="flex flex-wrap gap-2">
                        <button type="button" @click="text = 'https://tool4saas.com'; renderQr()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Website URL</button>
                        <button type="button" @click="text = 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;'; renderQr()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">WiFi Network</button>
                        <button type="button" @click="text = 'mailto:hello@example.com?subject=Inquiry'; renderQr()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">Email Link</button>
                        <button type="button" @click="text = 'upi://pay?pa=merchant@upi&pn=Store&am=100'; renderQr()" class="px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:bg-[#e2f6d5] transition-all">UPI Payment</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-3xl bg-base-200/60 border border-base-300">
                    <div>
                        <label class="block text-xs font-bold mb-1.5 text-base-content/70">Error Correction Level</label>
                        <select x-model="errorCorrection" @change="renderQr()" class="select select-bordered select-sm w-full rounded-xl">
                            <option value="L">Low (7% recovery)</option>
                            <option value="M">Medium (15% recovery)</option>
                            <option value="Q">Quartile (25% recovery)</option>
                            <option value="H">High (30% recovery - best for print)</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold mb-1.5 text-base-content/70">Export Resolution (Pixels)</label>
                        <select x-model="size" @change="renderQr()" class="select select-bordered select-sm w-full rounded-xl">
                            <option value="128">128 × 128 px (Thumbnail)</option>
                            <option value="256">256 × 256 px (Standard Web)</option>
                            <option value="512">512 × 512 px (High-Res Web)</option>
                            <option value="1024">1024 × 1024 px (Print Quality)</option>
                        </select>
                    </div>
                </div>
            </div>

            {{-- Right: QR Code Preview & Action Buttons --}}
            <div class="flex flex-col items-center justify-center p-7 rounded-3xl bg-base-200/60 border border-base-300 text-center">
                <div class="p-5 bg-white rounded-3xl shadow-sm mb-6 inline-block">
                    <canvas id="qr-canvas" class="max-w-full h-auto rounded-xl"></canvas>
                </div>

                <div class="space-y-2 w-full max-w-xs">
                    <button
                        type="button"
                        @click="downloadPng()"
                        class="btn btn-primary rounded-full w-full font-bold shadow-sm"
                    >
                        Download PNG Image
                    </button>
                    <span class="text-xs text-base-content/60 block mt-2">
                        Generated locally in browser. No expiry date.
                    </span>
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
