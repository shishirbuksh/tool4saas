<x-tool-paper x-data="{
    penColor: '#0e0f0c',
    penWidth: 3,
    transparentBg: true,
    isDrawing: false,
    hasDrawn: false,
    typedText: '',
    selectedFont: 'cursive',
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('transparent')) {
            this.transparentBg = params.get('transparent') !== '0';
        }
        if (params.has('name')) {
            this.typedText = params.get('name');
        }
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth || 700;
        canvas.height = 260;
        this.resetBackground();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (this.typedText.trim()) {
            this.$nextTick(() => this.applyTyped());
        }
    },
    resetBackground() {
        const canvas = this.$refs.canvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!this.transparentBg) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    },
    toggleBg() {
        this.transparentBg = !this.transparentBg;
        this.clear();
    },
    startDraw(e) {
        this.isDrawing = true;
        this.hasDrawn = true;
        const rect = this.$refs.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const ctx = this.$refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        ctx.strokeStyle = this.penColor;
        ctx.lineWidth = this.penWidth;
    },
    draw(e) {
        if (!this.isDrawing) return;
        const rect = this.$refs.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const ctx = this.$refs.canvas.getContext('2d');
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.strokeStyle = this.penColor;
        ctx.lineWidth = this.penWidth;
        ctx.stroke();
    },
    stopDraw() {
        this.isDrawing = false;
    },
    clear() {
        this.resetBackground();
        this.hasDrawn = false;
    },
    applyTyped() {
        if (!this.typedText.trim()) return;
        this.clear();
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = this.penColor;
        ctx.font = 'italic 48px ' + this.selectedFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.typedText.trim(), canvas.width / 2, canvas.height / 2);
        this.hasDrawn = true;
    },
    downloadPng() {
        const canvas = this.$refs.canvas;
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = this.transparentBg ? 'signature-transparent.png' : 'signature.png';
        link.click();
    }
}">
    <div class="space-y-6">
        {{-- Canvas Container --}}
        <div>
            <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Draw Signature Pad</label>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-base-content/60 font-mono">Background:</span>
                    <button
                        type="button"
                        @click="toggleBg()"
                        class="px-2.5 py-1 rounded-full border text-[11px] font-bold transition-all"
                        :class="transparentBg ? 'bg-[#163300] text-[#9fe870] border-[#163300]' : 'bg-base-200 border-base-300 text-base-content/80'"
                    >
                        <span x-text="transparentBg ? '✓ Transparent PNG' : 'Solid White'"></span>
                    </button>
                </div>
            </div>
            <div
                class="border-2 border-dashed border-base-300 rounded-3xl overflow-hidden shadow-xs"
                :style="transparentBg ? 'background-image: repeating-conic-gradient(#f0f0f0 0% 25%, #ffffff 0% 50%) 50% / 16px 16px' : 'background-color: #ffffff'"
            >
                <canvas
                    x-ref="canvas"
                    @mousedown="startDraw($event)"
                    @mousemove="draw($event)"
                    @mouseup="stopDraw()"
                    @mouseleave="stopDraw()"
                    @touchstart.prevent="startDraw($event)"
                    @touchmove.prevent="draw($event)"
                    @touchend.prevent="stopDraw()"
                    class="w-full h-[260px] cursor-crosshair touch-none block"
                ></canvas>
            </div>
        </div>

        {{-- Drawing Controls --}}
        <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-base-100 border border-base-300">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <input aria-label="Pen color color picker" type="color" x-model="penColor" class="size-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                    <span class="text-xs font-mono font-bold uppercase" x-text="penColor"></span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-base-content/60">Width:</span>
                    <input aria-label="Pen width" type="range" x-model.number="penWidth" min="1" max="8" class="range range-xs range-primary w-24" />
                    <span class="text-xs font-mono font-bold" x-text="penWidth + 'px'"></span>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <button
                    type="button"
                    @click="clear()"
                    class="px-4 py-2 rounded-full bg-base-200 hover:bg-error/20 hover:text-error text-xs font-bold transition-all"
                >
                    Clear Canvas
                </button>
                <button
                    type="button"
                    @click="downloadPng()"
                    :disabled="!hasDrawn"
                    class="px-5 py-2 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all shadow-xs disabled:opacity-40"
                >
                    <span x-text="transparentBg ? 'Download Transparent PNG' : 'Download Signature PNG'"></span>
                </button>
            </div>
        </div>

        {{-- Type-to-Sign Option --}}
        <div class="p-6 rounded-3xl bg-base-200/50 border border-base-300 space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block">Alternative: Type Handwriting Signature</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-2">
                    <input aria-label="Type your full name (e.g. John Doe)" type="text" x-model="typedText" placeholder="Type your full name (e.g. John Doe)" class="input input-bordered rounded-xl w-full text-sm" />
                </div>
                <div>
                    <button
                        type="button"
                        @click="applyTyped()"
                        :disabled="!typedText.trim()"
                        class="btn btn-primary rounded-xl w-full text-xs font-bold"
                    >
                        Render to Canvas
                    </button>
                </div>
            </div>
        </div>

        {{-- Technical Comparison: Electronic Signature Legal Framework --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Electronic Signatures Legal Enforceability Framework (SES vs. AES vs. QES)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Signature Tier (eIDAS / ESIGN)</th>
                            <th>Verification Method</th>
                            <th>Legal Enforceability</th>
                            <th>Standard Practical Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Simple E-Signature (SES)</td>
                            <td>Drawn signature, typed name, click-to-sign</td>
                            <td>Valid under US ESIGN &amp; UETA</td>
                            <td>Sales orders, internal memos, NDAs, invoices</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Advanced E-Signature (AES)</td>
                            <td>Cryptographic hash tied uniquely to signer</td>
                            <td>High evidentiary weight in court</td>
                            <td>Commercial vendor contracts, commercial leases</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">Qualified E-Signature (QES)</td>
                            <td>Government-certified cryptographic hardware token</td>
                            <td class="text-[#2ead4b] font-bold">Equivalent to handwritten pen</td>
                            <td>Mortgage deeds, government tenders, court submissions</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
