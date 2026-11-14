<x-card class="p-6 md:p-8" x-data="{
    listening: false,
    transcript: '',
    recognition: null,
    copied: false,
    init() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRec) {
            this.recognition = new SpeechRec();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.onresult = (e) => {
                let res = '';
                for (let i = 0; i < e.results.length; i++) {
                    res += e.results[i][0].transcript + ' ';
                }
                this.transcript = res.trim();
            };
            this.recognition.onend = () => {
                this.listening = false;
            };
        }
    },
    toggle() {
        if (!this.recognition) return alert('Speech Recognition is not supported by your browser.');
        if (this.listening) {
            this.recognition.stop();
            this.listening = false;
        } else {
            this.recognition.start();
            this.listening = true;
        }
    },
    copy() {
        navigator.clipboard.writeText(this.transcript);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
    }
}">
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <button type="button" @click="toggle()" class="btn rounded-[12px] font-bold px-6" :class="listening ? 'btn-error animate-pulse' : 'btn-primary'">
                <span x-show="!listening">🎙️ Start Listening</span>
                <span x-show="listening" x-cloak>⏹ Stop Listening</span>
            </button>

            <div class="flex gap-2">
                <button type="button" @click="copy()" :disabled="!transcript" class="btn btn-sm btn-ghost rounded-[8px]">
                    <span x-show="!copied">Copy Text</span>
                    <span x-show="copied" x-cloak>✓ Copied</span>
                </button>
                <button type="button" @click="transcript = ''" class="btn btn-sm btn-ghost rounded-[8px]">Clear</button>
            </div>
        </div>

        <div>
            <textarea
                x-model="transcript"
                rows="8"
                placeholder="Click 'Start Listening' and speak into your microphone to transcribe live speech to text..."
                class="textarea textarea-bordered w-full rounded-[16px] text-base leading-relaxed bg-base-100 dark:bg-base-200 border-[#242a20]/20 focus:border-primary"
            ></textarea>
        </div>
    </div>
</x-card>
