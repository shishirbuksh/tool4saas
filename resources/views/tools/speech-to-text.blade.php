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

        {{-- Technical Comparison: Speech Recognition Engines & Audio Formats Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Speech-to-Text Recognition Architectures, Audio Sampling &amp; Word Error Rate (WER) Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Speech Recognition Architecture</th>
                            <th>Underlying Engine / Model</th>
                            <th>Recommended Audio Sampling</th>
                            <th>Word Error Rate (WER)</th>
                            <th>Latency &amp; Network Dependency</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Web Speech API (W3C)</td>
                            <td>Browser native (Google Speech / Apple Dictation)</td>
                            <td class="font-mono">16 kHz / 48 kHz mono PCM</td>
                            <td class="font-mono">~4% – 8% WER</td>
                            <td class="font-bold text-success font-mono">&lt; 150 ms real-time streaming</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">OpenAI Whisper (large-v3)</td>
                            <td>Encoder-Decoder Transformer (1550M params)</td>
                            <td class="font-mono font-bold">16,000 Hz 16-bit mono</td>
                            <td class="font-bold text-success font-mono">&lt; 2.5% WER (Human level)</td>
                            <td>Chunked batch inference (~1.5s per 30s block)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Deepgram Nova-2</td>
                            <td>End-to-End Deep Learning Architecture</td>
                            <td class="font-mono">8 kHz to 48 kHz</td>
                            <td class="font-bold text-success font-mono">~3.2% WER</td>
                            <td class="font-mono text-success">&lt; 300 ms streaming WebSocket</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">On-Device WebAssembly Whisper</td>
                            <td>Whisper.cpp compiled to WebAssembly (SIMD)</td>
                            <td class="font-mono">16 kHz mono</td>
                            <td class="font-mono">~5% – 9% WER (base model)</td>
                            <td class="font-bold text-success font-mono">100% Offline / Zero server transmission</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
