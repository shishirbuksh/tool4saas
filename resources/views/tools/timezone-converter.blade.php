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
                    <button type="button" @click="useNow()" class="text-xs text-[#163300] dark:text-[#9fe870] font-bold hover:underline font-mono">Set to Now</button>
                </div>
                <input aria-label="Date &amp; Time" type="datetime-local" x-model="dt" class="input input-bordered rounded-xl w-full text-sm font-mono" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1">Source Timezone</label>
                <select aria-label="Source Timezone" x-model="fromTz" class="select select-bordered rounded-xl w-full text-sm">
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
                <select aria-label="Target Timezone" x-model="toTz" class="select select-bordered rounded-xl w-full text-sm">
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

        {{-- Technical Comparison: Major Global Timezone Offsets --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Major Global Timezones &amp; Standard UTC Offsets Comparison Table
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Timezone Abbr</th>
                            <th>Standard Designation</th>
                            <th>UTC Standard Offset</th>
                            <th>Primary Metropolitan Hubs</th>
                            <th>Daylight Saving (DST)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">UTC / GMT</td>
                            <td>Coordinated Universal Time</td>
                            <td class="font-mono font-bold">UTC +00:00</td>
                            <td>London, Dublin, Lisbon, Reykjavik</td>
                            <td>UTC fixed (UK uses BST UTC+1 in summer)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">EST / EDT</td>
                            <td>Eastern Standard Time</td>
                            <td class="font-mono">UTC −05:00 (−04:00 DST)</td>
                            <td>New York, Toronto, Miami, Washington DC</td>
                            <td>Observed (2nd Sun Mar to 1st Sun Nov)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">PST / PDT</td>
                            <td>Pacific Standard Time</td>
                            <td class="font-mono">UTC −08:00 (−07:00 DST)</td>
                            <td>Los Angeles, San Francisco, Seattle, Vancouver</td>
                            <td>Observed (2nd Sun Mar to 1st Sun Nov)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">CET / CEST</td>
                            <td>Central European Time</td>
                            <td class="font-mono">UTC +01:00 (+02:00 DST)</td>
                            <td>Paris, Berlin, Rome, Madrid, Amsterdam</td>
                            <td>Observed (Last Sun Mar to Last Sun Oct)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">IST</td>
                            <td>Indian Standard Time</td>
                            <td class="font-mono">UTC +05:30</td>
                            <td>New Delhi, Mumbai, Bengaluru, Hyderabad</td>
                            <td>No DST (Uniform year-round)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">JST / KST</td>
                            <td>Japan &amp; Korea Standard Time</td>
                            <td class="font-mono">UTC +09:00</td>
                            <td>Tokyo, Seoul, Osaka, Kyoto</td>
                            <td>No DST (Uniform year-round)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">AEST / AEDT</td>
                            <td>Australian Eastern Standard</td>
                            <td class="font-mono">UTC +10:00 (+11:00 DST)</td>
                            <td>Sydney, Melbourne, Canberra, Brisbane</td>
                            <td>Observed in NSW/VIC (1st Sun Oct to 1st Sun Apr)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>
