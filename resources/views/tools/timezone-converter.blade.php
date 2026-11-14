<x-tool-paper x-data="{
    dt: new Date().toISOString().slice(0, 16),
    fromTz: 'America/New_York',
    toTz: 'Europe/London',
    cities: [
        { name: 'UTC / GMT', tz: 'UTC' },
        { name: 'San Francisco (PST)', tz: 'America/Los_Angeles' },
        { name: 'New York (EST)', tz: 'America/New_York' },
        { name: 'London (GMT/BST)', tz: 'Europe/London' },
        { name: 'Berlin / Paris (CET)', tz: 'Europe/Berlin' },
        { name: 'Dubai (GST)', tz: 'Asia/Dubai' },
        { name: 'Mumbai / Delhi (IST)', tz: 'Asia/Kolkata' },
        { name: 'Singapore (SGT)', tz: 'Asia/Singapore' },
        { name: 'Tokyo (JST)', tz: 'Asia/Tokyo' },
        { name: 'Sydney (AEST)', tz: 'Australia/Sydney' }
    ],
    formatCityTime(tz) {
        if (!this.dt) return '—';
        try {
            const date = new Date(this.dt);
            return new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).format(date);
        } catch (e) {
            return '—';
        }
    },
    useNow() {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        this.dt = now.toISOString().slice(0, 16);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
                <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Date &amp; Time</label>
                    <button type="button" @click="useNow()" class="text-xs text-primary font-bold hover:underline font-mono">Set to Now</button>
                </div>
                <input type="datetime-local" x-model="dt" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Source Timezone</label>
                <select x-model="fromTz" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="America/New_York">New York (EST/EDT)</option>
                    <option value="America/Los_Angeles">San Francisco (PST/PDT)</option>
                    <option value="America/Chicago">Chicago (CST/CDT)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Europe/Berlin">Berlin / Paris (CET)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Kolkata">India (IST)</option>
                    <option value="Asia/Singapore">Singapore (SGT)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEST)</option>
                    <option value="UTC">UTC (Universal)</option>
                </select>
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Target Timezone</label>
                <select x-model="toTz" class="select select-bordered rounded-xl w-full text-sm">
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="America/New_York">New York (EST/EDT)</option>
                    <option value="America/Los_Angeles">San Francisco (PST/PDT)</option>
                    <option value="Europe/Berlin">Berlin / Paris (CET)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Kolkata">India (IST)</option>
                    <option value="Asia/Singapore">Singapore (SGT)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEST)</option>
                    <option value="UTC">UTC (Universal)</option>
                </select>
            </div>
        </div>

        {{-- Polarity-Flipped Dark Hero Display --}}
        <div class="p-6 sm:p-9 rounded-3xl bg-[#0e0f0c] text-white border border-[#242a20] shadow-sm text-center">
            <span class="text-xs font-bold uppercase tracking-wider text-[#868685] font-mono">Target Local Time</span>
            <div class="text-3xl sm:text-5xl font-black text-primary my-2 font-display">
                <span x-text="formatCityTime(toTz)"></span>
            </div>
            <p class="text-xs sm:text-sm text-[#868685]">
                In <span class="text-white font-bold" x-text="toTz"></span>
            </p>
        </div>

        {{-- Major Global Metros Comparison Grid --}}
        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono block">Simultaneous Time Across Major Financial Hubs</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <template x-for="c in cities" :key="c.name">
                    <div class="p-3.5 rounded-2xl bg-base-200/50 border border-base-300">
                        <span class="text-[10px] font-bold uppercase text-base-content/60 font-mono block" x-text="c.name"></span>
                        <span class="text-sm font-black text-base-content mt-1 block font-mono" x-text="formatCityTime(c.tz)"></span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</x-tool-paper>
