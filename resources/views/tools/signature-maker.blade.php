<x-tool-paper x-data="{
    penColor: '#0e0f0c',
    penWidth: 3,
    isDrawing: false,
    hasDrawn: false,
    typedText: '',
    selectedFont: 'cursive',
    init() {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth || 700;
        canvas.height = 260;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
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
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        const a = document.createElement('a');
        a.href = url;
        a.download = 'signature.png';
        a.click();
    }
}">
    <div class="space-y-6">
        {{-- Canvas Container --}}
        <div>
            <div class="flex items-center justify-between mb-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Draw Signature Pad</label>
                <span class="text-xs text-base-content/50 font-mono">Mouse or Touch Supported</span>
            </div>
            <div class="border-2 border-dashed border-base-300 rounded-3xl overflow-hidden bg-white shadow-xs">
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
                    <input type="color" x-model="penColor" class="size-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                    <span class="text-xs font-mono font-bold uppercase" x-text="penColor"></span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-base-content/60">Width:</span>
                    <input type="range" x-model.number="penWidth" min="1" max="8" class="range range-xs range-primary w-24" />
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
                    Download PNG
                </button>
            </div>
        </div>

        {{-- Type-to-Sign Option --}}
        <div class="p-6 rounded-3xl bg-base-200/50 border border-base-300 space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block">Alternative: Type Handwriting Signature</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-2">
                    <input type="text" x-model="typedText" placeholder="Type your full name (e.g. John Doe)" class="input input-bordered rounded-xl w-full text-sm" />
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
    </div>
</x-tool-paper>
