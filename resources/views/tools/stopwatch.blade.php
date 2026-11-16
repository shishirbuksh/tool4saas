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

        {{-- Technical Comparison: Browser Timing APIs & Precision Standards Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Browser High-Resolution Timing APIs &amp; Clock Accuracy Standards Matrix (W3C High Resolution Time)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Browser Timing API</th>
                            <th>Resolution Precision</th>
                            <th>Monotonic Clock Guarantee</th>
                            <th>Spectre Security Jitter</th>
                            <th>Best Web Application Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">performance.now()</td>
                            <td class="font-mono font-bold text-success">Microsecond (5 μs to 20 μs)</td>
                            <td class="text-success font-bold">Yes (Never steps backwards)</td>
                            <td>Clamped to 5–20 μs to mitigate side-channel timing leaks</td>
                            <td>High-precision stopwatches, animation loops, performance profiling</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">requestAnimationFrame (rAF)</td>
                            <td class="font-mono">Syncs to display refresh (16.6ms at 60Hz / 8.3ms at 120Hz)</td>
                            <td class="text-success font-semibold">Yes (Tied to VSync)</td>
                            <td>None (Paused automatically in background tabs to save CPU)</td>
                            <td>Silky 60/120 FPS UI stopwatch ticking, canvas games, CSS rendering</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">Date.now() / new Date()</td>
                            <td class="font-mono text-warning">Millisecond (1 ms)</td>
                            <td class="text-error font-semibold">No (Drifts with OS clock &amp; NTP sync)</td>
                            <td>None</td>
                            <td>Wall-clock calendar timestamps, database audit records</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Web Workers setInterval</td>
                            <td class="font-mono">~4 ms minimum clamp</td>
                            <td class="font-mono">Moderate</td>
                            <td>Unthrottled in background tabs (bypasses browser tab sleep)</td>
                            <td>Background persistent timer alerts, pomodoro tracking when tab hidden</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
