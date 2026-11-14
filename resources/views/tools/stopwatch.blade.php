<x-tool-paper x-data="{
    elapsed: 0,
    running: false,
    startTime: 0,
    timerId: null,
    laps: [],
    get formattedTime() {
        const ms = this.elapsed;
        const cs = Math.floor((ms % 1000) / 10);
        const s = Math.floor(ms / 1000) % 60;
        const m = Math.floor(ms / 60000) % 60;
        const h = Math.floor(ms / 3600000);
        const pad = (n, l = 2) => String(n).padStart(l, '0');
        return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
    },
    toggle() {
        if (this.running) {
            this.running = false;
            cancelAnimationFrame(this.timerId);
        } else {
            this.running = true;
            this.startTime = performance.now() - this.elapsed;
            const tick = () => {
                if (!this.running) return;
                this.elapsed = performance.now() - this.startTime;
                this.timerId = requestAnimationFrame(tick);
            };
            this.timerId = requestAnimationFrame(tick);
        }
    },
    lap() {
        if (this.elapsed > 0) {
            this.laps.unshift({
                id: this.laps.length + 1,
                time: this.formattedTime,
                raw: this.elapsed
            });
        }
    },
    reset() {
        this.running = false;
        cancelAnimationFrame(this.timerId);
        this.elapsed = 0;
        this.laps = [];
    },
    copyLaps() {
        if (!this.laps.length) return;
        const text = this.laps.map(l => `Lap ${l.id}: ${l.time}`).join('\n');
        navigator.clipboard.writeText(text);
    }
}">
    <div class="space-y-6">
        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-8 sm:p-12 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">High-Precision Digital Stopwatch</span>
            <div class="text-5xl sm:text-7xl font-black text-primary my-4 font-mono tracking-wider tabular-nums select-none" x-text="formattedTime">
                00:00:00.00
            </div>
            <div class="flex items-center justify-center gap-3 pt-2">
                <button
                    type="button"
                    @click="toggle()"
                    class="px-8 py-3 rounded-full text-sm font-bold transition-all shadow-sm"
                    :class="running ? 'bg-error text-white hover:bg-error/90' : 'bg-primary text-primary-content hover:bg-primary/90'"
                >
                    <span x-text="running ? 'Pause' : 'Start'"></span>
                </button>
                <button
                    type="button"
                    @click="lap()"
                    :disabled="elapsed === 0"
                    class="px-6 py-3 rounded-full bg-base-200 text-white hover:bg-base-300 text-sm font-bold transition-all disabled:opacity-40"
                >
                    Lap
                </button>
                <button
                    type="button"
                    @click="reset()"
                    :disabled="elapsed === 0"
                    class="px-6 py-3 rounded-full bg-transparent border border-[#242a20] text-[#868685] hover:text-white text-sm font-bold transition-all disabled:opacity-40"
                >
                    Reset
                </button>
            </div>
        </div>

        {{-- Laps Section --}}
        <template x-if="laps.length > 0">
            <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Lap Splits (<span x-text="laps.length"></span>)</span>
                    <button
                        type="button"
                        @click="copyLaps()"
                        class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                    >
                        Copy All Splits
                    </button>
                </div>
                <div class="divide-y divide-base-200 max-h-60 overflow-y-auto">
                    <template x-for="l in laps" :key="l.id">
                        <div class="flex items-center justify-between py-2 text-sm font-mono">
                            <span class="text-base-content/70">Lap <span x-text="l.id"></span></span>
                            <span class="font-bold text-base-content" x-text="l.time"></span>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</x-tool-paper>
