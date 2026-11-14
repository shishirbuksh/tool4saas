<x-tool-paper x-data="{
    workMin: 25,
    breakMin: 5,
    mode: 'work',
    timeLeft: 25 * 60,
    running: false,
    interval: null,
    cycle: 1,
    get timeFormatted() {
        const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const s = (this.timeLeft % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    },
    start() {
        if (this.running) return;
        this.running = true;
        this.interval = setInterval(() => {
            if (this.timeLeft <= 1) {
                this.switchMode();
            } else {
                this.timeLeft--;
            }
        }, 1000);
    },
    pause() {
        this.running = false;
        clearInterval(this.interval);
    },
    switchMode() {
        if (this.mode === 'work') {
            this.mode = 'break';
            this.timeLeft = this.breakMin * 60;
        } else {
            this.mode = 'work';
            this.timeLeft = this.workMin * 60;
            this.cycle++;
        }
    },
    reset() {
        this.pause();
        this.mode = 'work';
        this.timeLeft = this.workMin * 60;
    },
    setWork(m) {
        this.workMin = m;
        if (!this.running && this.mode === 'work') {
            this.timeLeft = m * 60;
        }
    }
}">
    <div class="space-y-6">
        {{-- Mode Switcher Pills --}}
        <div class="flex justify-center">
            <div class="inline-flex gap-1.5 p-1.5 rounded-full bg-base-200 border border-base-300">
                <button
                    type="button"
                    class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                    :class="mode === 'work' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                    @click="mode = 'work'; timeLeft = workMin * 60; pause()"
                >
                    Focus Session (Work)
                </button>
                <button
                    type="button"
                    class="px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all"
                    :class="mode === 'break' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content hover:bg-base-100'"
                    @click="mode = 'break'; timeLeft = breakMin * 60; pause()"
                >
                    Rest Interval (Break)
                </button>
            </div>
        </div>

        {{-- Big Countdown Clock (Wise Dark Hero Card) --}}
        <div class="p-8 sm:p-12 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono mb-3" :class="mode === 'work' ? 'bg-[#242a20] text-primary' : 'bg-[#e2f6d5] text-[#054d28]'">
                <span class="w-2 h-2 rounded-full" :class="running ? 'bg-primary animate-pulse' : 'bg-[#868685]'"></span>
                <span x-text="mode === 'work' ? 'Focus Interval' : 'Rest Break'"></span>
                <span>· Round #<span x-text="cycle"></span></span>
            </div>

            <div class="text-6xl sm:text-8xl font-black font-mono text-white tracking-tight my-2 tabular-nums" x-text="timeFormatted"></div>

            {{-- Action Controls --}}
            <div class="flex items-center justify-center gap-3 pt-4">
                <button
                    type="button"
                    x-show="!running"
                    @click="start()"
                    class="px-8 py-3 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-base transition-all shadow-xs"
                >
                    Start Focus →
                </button>
                <button
                    type="button"
                    x-show="running"
                    style="display: none;"
                    @click="pause()"
                    class="px-8 py-3 rounded-full bg-[#ffd11a] text-[#4a3b1c] font-bold text-base transition-all"
                >
                    Pause Timer
                </button>
                <button
                    type="button"
                    @click="reset()"
                    class="px-6 py-3 rounded-full bg-[#161a14] border border-[#343d2e] hover:bg-[#242a20] text-white font-bold text-sm transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>

        {{-- Quick Presets --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-base-200/60 border border-base-300">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Focus Presets</span>
                <div class="flex gap-2">
                    <button type="button" @click="setWork(25)" class="px-3.5 py-1.5 rounded-full text-xs font-bold" :class="workMin === 25 ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'">25m (Standard)</button>
                    <button type="button" @click="setWork(45)" class="px-3.5 py-1.5 rounded-full text-xs font-bold" :class="workMin === 45 ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'">45m (Deep Work)</button>
                    <button type="button" @click="setWork(60)" class="px-3.5 py-1.5 rounded-full text-xs font-bold" :class="workMin === 60 ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'">60m (Sprint)</button>
                </div>
            </div>

            <div class="p-5 rounded-2xl bg-base-200/60 border border-base-300">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Break Presets</span>
                <div class="flex gap-2">
                    <button type="button" @click="breakMin = 5; if(mode === 'break') timeLeft = 300;" class="px-3.5 py-1.5 rounded-full text-xs font-bold" :class="breakMin === 5 ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'">5m (Short)</button>
                    <button type="button" @click="breakMin = 10; if(mode === 'break') timeLeft = 600;" class="px-3.5 py-1.5 rounded-full text-xs font-bold" :class="breakMin === 10 ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'">10m (Medium)</button>
                    <button type="button" @click="breakMin = 15; if(mode === 'break') timeLeft = 900;" class="px-3.5 py-1.5 rounded-full text-xs font-bold" :class="breakMin === 15 ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'">15m (Long)</button>
                </div>
            </div>
        </div>
    </div>
</x-tool-paper>
