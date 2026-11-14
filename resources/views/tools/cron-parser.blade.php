<x-tool-paper x-data="{
    expression: '0 0 * * *',
    get fields() {
        const parts = this.expression.trim().split(/\s+/);
        if (parts.length !== 5) return null;
        return {
            minute: parts[0],
            hour: parts[1],
            dom: parts[2],
            month: parts[3],
            dow: parts[4]
        };
    },
    get humanDescription() {
        if (!this.fields) return 'Please provide 5 fields separated by spaces';
        const e = this.expression.trim();
        if (e === '* * * * *') return 'Every single minute';
        if (e === '0 * * * *') return 'At minute 0 of every hour';
        if (e === '0 0 * * *') return 'Every day at midnight (00:00)';
        if (e === '0 12 * * *') return 'Every day at noon (12:00)';
        if (e === '0 0 * * 0') return 'Every Sunday at midnight';
        if (e === '0 9 * * 1-5') return 'At 09:00 AM, Monday through Friday';
        if (e === '0 0 1 * *') return 'At midnight on the 1st day of every month';
        if (e === '*/15 * * * *') return 'Every 15 minutes';
        if (e === '*/30 * * * *') return 'Every 30 minutes';
        return `Minute ${this.fields.minute}, Hour ${this.fields.hour}, Day ${this.fields.dom}, Month ${this.fields.month}, Weekday ${this.fields.dow}`;
    },
    setPreset(exp) {
        this.expression = exp;
    }
}">
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">Cron Schedule Expression (5 Fields)</label>
            <input
                type="text"
                x-model="expression"
                placeholder="0 0 * * *"
                class="input input-bordered rounded-2xl w-full text-base font-mono p-4 bg-base-100 tracking-wider"
            />
        </div>

        {{-- Quick Presets --}}
        <div class="flex flex-wrap items-center gap-2">
            <button type="button" @click="setPreset('* * * * *')" class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all">Every min (* * * * *)</button>
            <button type="button" @click="setPreset('*/15 * * * *')" class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all">Every 15m (*/15 * * * *)</button>
            <button type="button" @click="setPreset('0 * * * *')" class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all">Hourly (0 * * * *)</button>
            <button type="button" @click="setPreset('0 0 * * *')" class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all">Daily Midnight (0 0 * * *)</button>
            <button type="button" @click="setPreset('0 9 * * 1-5')" class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all">Weekdays 9 AM (0 9 * * 1-5)</button>
            <button type="button" @click="setPreset('0 0 1 * *')" class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all">Monthly 1st (0 0 1 * *)</button>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Human Readable Schedule</span>
            <div class="text-2xl sm:text-4xl font-black text-primary my-3 font-display">
                <span x-text="humanDescription"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                Standard UNIX crontab specification (Minute · Hour · Day of Month · Month · Day of Week)
            </p>
        </div>

        {{-- Field Breakdown Grid --}}
        <template x-if="fields">
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono">
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
                    <span class="text-[10px] uppercase font-bold text-base-content/60 block">Minute (0-59)</span>
                    <span class="text-xl font-black text-base-content mt-1 block" x-text="fields.minute"></span>
                </div>
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
                    <span class="text-[10px] uppercase font-bold text-base-content/60 block">Hour (0-23)</span>
                    <span class="text-xl font-black text-base-content mt-1 block" x-text="fields.hour"></span>
                </div>
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
                    <span class="text-[10px] uppercase font-bold text-base-content/60 block">Day Month (1-31)</span>
                    <span class="text-xl font-black text-base-content mt-1 block" x-text="fields.dom"></span>
                </div>
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300">
                    <span class="text-[10px] uppercase font-bold text-base-content/60 block">Month (1-12)</span>
                    <span class="text-xl font-black text-base-content mt-1 block" x-text="fields.month"></span>
                </div>
                <div class="p-4 rounded-2xl bg-base-200/70 border border-base-300 col-span-2 sm:col-span-1">
                    <span class="text-[10px] uppercase font-bold text-base-content/60 block">Weekday (0-6)</span>
                    <span class="text-xl font-black text-base-content mt-1 block" x-text="fields.dow"></span>
                </div>
            </div>
        </template>
    </div>
</x-tool-paper>
