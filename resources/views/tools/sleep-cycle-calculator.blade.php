<x-tool-paper x-data="{
    mode: 'wake',
    timeInput: '07:00',
    fallAsleepMin: 15,
    init() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('mode') && ['wake', 'bed'].includes(params.get('mode'))) this.mode = params.get('mode');
        if (params.has('time')) this.timeInput = params.get('time');
        else if (params.has('wake')) { this.mode = 'wake'; this.timeInput = params.get('wake'); }
        else if (params.has('bed')) { this.mode = 'bed'; this.timeInput = params.get('bed'); }
    },
    setPreset(mode, time) {
        this.mode = mode;
        this.timeInput = time;
    },
    formatTime(totalMinutes) {
        let m = ((totalMinutes % 1440) + 1440) % 1440;
        let h24 = Math.floor(m / 60);
        let mins = m % 60;
        let suffix = h24 >= 12 ? 'PM' : 'AM';
        let h12 = h24 % 12 === 0 ? 12 : h24 % 12;
        let pad = (v) => String(v).padStart(2, '0');
        return `${h12}:${pad(mins)} ${suffix}`;
    },
    get results() {
        const parts = this.timeInput.split(':');
        if (parts.length !== 2) return [];
        const base = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        const buffer = parseInt(this.fallAsleepMin, 10) || 0;
        const cycles = [6, 5, 4, 3];
        return cycles.map(c => {
            const sleepMins = c * 90;
            const target = this.mode === 'wake'
                ? base - sleepMins - buffer
                : base + buffer + sleepMins;
            return {
                cycles: c,
                hours: (sleepMins / 60).toFixed(1),
                time: this.formatTime(target),
                recommended: c === 5 || c === 6
            };
        });
    }
}">
    <div class="space-y-6">
        {{-- Quick Scenario Chips --}}
        <div>
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block mb-2">Common Sleep Schedules:</span>
            <div class="flex flex-wrap gap-2">
                <button type="button" @click="setPreset('wake', '06:00')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Wake at 6:00 AM (Bed at 10:15 PM)
                </button>
                <button type="button" @click="setPreset('wake', '07:00')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Wake at 7:00 AM (Bed at 11:15 PM)
                </button>
                <button type="button" @click="setPreset('wake', '08:00')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Wake at 8:00 AM (Bed at 12:15 AM)
                </button>
                <button type="button" @click="setPreset('bed', '23:00')" class="btn btn-xs rounded-full border border-base-300 bg-base-100 hover:bg-primary/20 font-mono">
                    Sleep at 11:00 PM (Wake at 6:45 AM)
                </button>
            </div>
        </div>

        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'wake'; timeInput = '07:00'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'wake' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                I want to wake up at
            </button>
            <button
                type="button"
                @click="mode = 'bed'; timeInput = '23:00'"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'bed' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                I want to go to sleep at
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono" x-text="mode === 'wake' ? 'Target Wake-Up Time' : 'Bedtime'"></span></label>
                <input aria-label="Time input" type="time" x-model="timeInput" class="input input-bordered rounded-xl w-full text-base font-mono" />
            </div>
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Time to Fall Asleep (Minutes)</span></label>
                <select aria-label="Time to Fall Asleep (Minutes)" x-model.number="fallAsleepMin" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="10">10 minutes (Quick)</option>
                    <option value="15">15 minutes (Average)</option>
                    <option value="25">25 minutes (Slow)</option>
                    <option value="40">40 minutes (Restless)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono" x-text="mode === 'wake' ? 'Optimal Bedtime (5–6 Cycles)' : 'Optimal Alarm Time (5–6 Cycles)'"></span>
            <div class="text-4xl sm:text-6xl font-black text-primary my-2 font-display tabular-nums">
                <span x-text="results.length ? results[1].time : '—'"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Awakening between 90-minute REM cycles eliminates sleep inertia and grogginess.
            </p>
        </div>

        {{-- All Cycle Targets --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <template x-for="r in results" :key="r.cycles">
                <div class="p-5 rounded-2xl border transition-all" :class="r.recommended ? 'bg-primary/10 border-primary shadow-xs' : 'bg-base-200/60 border-base-300'">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] font-bold uppercase font-mono tracking-wider" :class="r.recommended ? 'text-[#163300] dark:text-[#9fe870]' : 'text-base-content/60'" x-text="r.cycles + ' Cycles (' + r.hours + ' hrs)'"></span>
                        <template x-if="r.recommended">
                            <span class="badge badge-primary badge-xs font-bold">Recommended</span>
                        </template>
                    </div>
                    <div class="text-2xl font-black text-base-content font-display mt-1" x-text="r.time"></div>
                </div>
            </template>
        </div>

        {{-- Technical Comparison: 90-Minute Sleep Cycles Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Ultradian Sleep Architecture &amp; 90-Minute REM Cycle Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Completed Cycles</th>
                            <th>Total Sleep Duration</th>
                            <th>Neurobiological Stages Covered</th>
                            <th>Cognitive Alertness Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">3 Sleep Cycles</td>
                            <td class="font-mono text-warning">4 Hours 30 Mins</td>
                            <td>Initial slow-wave sleep; limited REM dreaming</td>
                            <td class="text-warning">Groggy; noticeable cognitive deficit</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">4 Sleep Cycles</td>
                            <td class="font-mono">6 Hours 00 Mins</td>
                            <td>Moderate slow-wave physical recovery + light REM</td>
                            <td>Functional; acceptable for occasional short nights</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">5 Sleep Cycles (Ideal)</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">7 Hours 30 Mins</td>
                            <td>Complete N3 physical repair + full REM memory indexing</td>
                            <td class="text-[#2ead4b] font-bold">Peak Alertness; optimal human standard</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">6 Sleep Cycles</td>
                            <td class="font-mono text-[#163300] dark:text-[#9fe870] font-bold">9 Hours 00 Mins</td>
                            <td>Maximum restorative REM dreaming &amp; cellular growth</td>
                            <td class="text-[#2ead4b]">Full Recovery; recommended for athletes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
