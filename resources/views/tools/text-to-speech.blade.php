<x-card class="p-6 md:p-8" x-data="{
    text: 'Welcome to Tool4SaaS. Free client-side tools built for speed and complete data privacy.',
    voices: [],
    selectedVoice: '',
    rate: 1.0,
    pitch: 1.0,
    speaking: false,
    init() {
        if (!('speechSynthesis' in window)) return;
        const load = () => {
            this.voices = window.speechSynthesis.getVoices();
            if (!this.selectedVoice && this.voices.length > 0) {
                this.selectedVoice = this.voices[0].name;
            }
        };
        load();
        window.speechSynthesis.onvoiceschanged = load;
    },
    speak() {
        if (!('speechSynthesis' in window) || !this.text.trim()) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(this.text);
        const v = this.voices.find(x => x.name === this.selectedVoice);
        if (v) u.voice = v;
        u.rate = parseFloat(this.rate) || 1.0;
        u.pitch = parseFloat(this.pitch) || 1.0;
        u.onend = () => { this.speaking = false; };
        u.onerror = () => { this.speaking = false; };
        this.speaking = true;
        window.speechSynthesis.speak(u);
    },
    stop() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            this.speaking = false;
        }
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-sm font-bold text-[#163300] dark:text-[#9fe870] uppercase tracking-wider mb-2">
                Text to Read Aloud
            </label>
            <textarea
                x-model="text"
                rows="5"
                placeholder="Type or paste the narrative, article, or script you want spoken..."
                class="textarea textarea-bordered w-full rounded-[16px] text-base leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary"
            ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-1 text-base-content/70">
                    Voice Selection
                </label>
                <select x-model="selectedVoice" class="select select-bordered w-full rounded-[12px] text-sm">
                    <template x-for="v in voices" :key="v.name">
                        <option :value="v.name" x-text="v.name + ' (' + v.lang + ')'"></option>
                    </template>
                </select>
            </div>

            <div>
                <div class="flex justify-between items-center mb-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Playback Speed</label>
                    <span class="text-xs font-mono font-bold" x-text="rate + 'x'"></span>
                </div>
                <input type="range" min="0.5" max="2.0" step="0.1" x-model="rate" class="range range-primary range-sm" />
            </div>

            <div>
                <div class="flex justify-between items-center mb-1">
                    <label class="text-xs font-bold uppercase tracking-wider text-base-content/70">Pitch Level</label>
                    <span class="text-xs font-mono font-bold" x-text="pitch"></span>
                </div>
                <input type="range" min="0.5" max="1.5" step="0.1" x-model="pitch" class="range range-primary range-sm" />
            </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
            <button
                type="button"
                @click="speak()"
                :disabled="!text.trim() || speaking"
                class="btn btn-primary rounded-[12px] font-bold px-6"
            >
                <span x-show="!speaking">▶ Play Speech</span>
                <span x-show="speaking" x-cloak>🔊 Speaking...</span>
            </button>
            <button
                type="button"
                @click="stop()"
                class="btn btn-outline rounded-[12px] font-bold"
            >
                ⏹ Stop
            </button>
        </div>
    </div>
</x-card>
