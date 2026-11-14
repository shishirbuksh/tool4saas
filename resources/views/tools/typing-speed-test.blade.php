<x-tool-paper x-data="{
    samples: [
        'The quick brown fox jumps over the lazy dog near the quiet river bank.',
        'Typing fast takes consistent practice, focused posture, and steady rhythm.',
        'Local-first software ensures your documents never leave your browser device.',
        'A journey of a thousand miles begins with a single careful and steady step.',
        'The morning sun illuminates the green hills with calm and steady warmth.',
        'Patience and attention to detail overcome the most complicated challenges.',
        'Open source software thrives when talented developers collaborate with trust.'
    ],
    sampleIndex: 0,
    input: '',
    timeLeft: 60,
    running: false,
    finished: false,
    interval: null,
    get sample() {
        return this.samples[this.sampleIndex];
    },
    get elapsed() {
        return 60 - this.timeLeft;
    },
    get wpm() {
        const mins = this.elapsed / 60;
        if (mins <= 0 || !this.input.length) return 0;
        return Math.round((this.input.length / 5) / mins);
    },
    get accuracy() {
        if (!this.input.length) return 100;
        let correct = 0;
        for (let i = 0; i < this.input.length; i++) {
            if (this.input[i] === this.sample[i]) correct++;
        }
        return Math.round((correct / this.input.length) * 100);
    },
    start() {
        if (this.running || this.finished) return;
        this.running = true;
        this.interval = setInterval(() => {
            if (this.timeLeft <= 1) {
                this.finish();
            } else {
                this.timeLeft--;
            }
        }, 1000);
    },
    pause() {
        this.running = false;
        clearInterval(this.interval);
    },
    finish() {
        this.running = false;
        this.finished = true;
        this.timeLeft = 0;
        clearInterval(this.interval);
    },
    reset() {
        this.running = false;
        this.finished = false;
        this.timeLeft = 60;
        this.input = '';
        clearInterval(this.interval);
    },
    nextText() {
        this.sampleIndex = (this.sampleIndex + 1) % this.samples.length;
        this.reset();
    },
    onInput() {
        if (!this.running && !this.finished && this.input.length > 0) {
            this.start();
        }
        if (this.input.length >= this.sample.length) {
            this.finish();
        }
    }
}">
    <div class="space-y-6">
        {{-- Polarity-Flipped Dark Scorecard & Timer Banner --}}
        <div class="p-6 sm:p-8 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="text-center sm:text-left">
                <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Time Remaining</span>
                <div class="text-4xl sm:text-6xl font-black font-mono text-primary mt-1 tabular-nums">
                    <span x-text="timeLeft"></span>s
                </div>
            </div>

            <div class="flex items-center gap-6 sm:gap-10">
                <div class="text-center">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Speed (WPM)</span>
                    <div class="text-3xl sm:text-5xl font-black text-white mt-1 tabular-nums font-display" x-text="wpm"></div>
                </div>
                <div class="text-center">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Accuracy</span>
                    <div class="text-3xl sm:text-5xl font-black mt-1 tabular-nums font-display" :class="accuracy >= 90 ? 'text-[#9fe870]' : (accuracy >= 75 ? 'text-[#ffd11a]' : 'text-[#f87171]')">
                        <span x-text="accuracy"></span>%
                    </div>
                </div>
            </div>
        </div>

        {{-- Sample Text Passage with Interactive Letter Highlighting --}}
        <div class="p-6 sm:p-7 rounded-3xl bg-base-100 border border-base-300 font-mono text-base sm:text-lg leading-relaxed select-none">
            <template x-for="(char, i) in sample.split('')" :key="i">
                <span
                    :class="{
                        'bg-[#e2f6d5] text-[#054d28] font-bold rounded-xs': input[i] !== undefined && input[i] === char,
                        'bg-[#d03238]/20 text-[#a7000d] font-bold rounded-xs': input[i] !== undefined && input[i] !== char,
                        'text-base-content/40': input[i] === undefined && i > input.length,
                        'border-b-2 border-primary text-base-content font-bold': i === input.length
                    }"
                    x-text="char"
                ></span>
            </template>
        </div>

        {{-- Typing Input Box --}}
        <div>
            <textarea
                x-model="input"
                @input="onInput()"
                :disabled="finished"
                rows="3"
                placeholder="Click here and start typing the passage above..."
                class="textarea textarea-bordered rounded-2xl w-full font-mono text-base p-4 bg-base-100 leading-relaxed focus:ring-2 focus:ring-primary"
            ></textarea>
        </div>

        {{-- Controls Toolbar (Wise Pill Buttons) --}}
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div class="flex items-center gap-2">
                <button
                    type="button"
                    x-show="!running && !finished"
                    @click="start()"
                    class="px-6 py-2.5 rounded-full bg-primary text-primary-content hover:bg-[#cdffad] font-bold text-sm transition-all shadow-xs"
                >
                    Start Test
                </button>
                <button
                    type="button"
                    x-show="running"
                    style="display: none;"
                    @click="pause()"
                    class="px-6 py-2.5 rounded-full bg-[#ffd11a] text-[#4a3b1c] font-bold text-sm transition-all"
                >
                    Pause
                </button>
                <button
                    type="button"
                    @click="reset()"
                    class="px-5 py-2.5 rounded-full bg-base-200 hover:bg-base-300 text-base-content font-bold text-sm transition-colors"
                >
                    Reset
                </button>
                <button
                    type="button"
                    @click="nextText()"
                    class="px-5 py-2.5 rounded-full bg-base-200 hover:bg-base-300 text-base-content font-bold text-sm transition-colors"
                >
                    New Passage →
                </button>
            </div>

            <template x-if="finished">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e2f6d5] text-[#054d28] font-bold text-xs">
                    <span>🎉 Test Completed! Finished at <span x-text="wpm"></span> WPM with <span x-text="accuracy"></span>% accuracy.</span>
                </div>
            </template>
        </div>
    </div>
</x-tool-paper>
