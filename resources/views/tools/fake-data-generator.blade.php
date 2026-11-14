<x-tool-paper x-data="fakeDataGenerator()">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Dataset Category</span></label>
                <select x-model="dataType" @change="generate()" class="select select-bordered rounded-xl w-full text-xs">
                    <option value="person">Users (Name, Email, City)</option>
                    <option value="company">B2B (Company, Contact, Email)</option>
                    <option value="uuid">Identities (UUID v4, Name, Status)</option>
                </select>
            </div>

            <x-numeric-field label="Record Count" model="count" suffix="rows" min="1" max="100" placeholder="10" />

            <div class="form-control">
                <label class="label py-1"><span class="label-text font-bold text-xs uppercase tracking-wider text-base-content/60 font-mono">Output Format</span></label>
                <select x-model="format" class="select select-bordered rounded-xl w-full text-xs font-mono">
                    <option value="json">JSON Array</option>
                    <option value="csv">CSV Spreadsheet</option>
                </select>
            </div>

            <div>
                <button
                    type="button"
                    @click="generate()"
                    class="btn btn-primary rounded-xl w-full text-xs font-bold"
                >
                    Regenerate Mock Data
                </button>
            </div>
        </div>

        {{-- Table Preview --}}
        <div class="p-6 rounded-3xl bg-base-100 border border-base-300 space-y-4">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Mock Dataset Preview (<span x-text="rows.length"></span> records)</span>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        @click="copy()"
                        class="px-4 py-1.5 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all"
                    >
                        <span x-text="copied ? 'Copied!' : 'Copy ' + format.toUpperCase()"></span>
                    </button>
                    <button
                        type="button"
                        @click="download()"
                        class="px-4 py-1.5 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all shadow-xs"
                    >
                        Download File
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto max-h-64">
                <table class="table table-xs w-full font-mono">
                    <thead>
                        <tr class="text-base-content/60 border-b border-base-300">
                            <template x-for="k in Object.keys(rows[0] || {})" :key="k">
                                <th class="uppercase" x-text="k"></th>
                            </template>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200">
                        <template x-for="(r, idx) in rows" :key="idx">
                            <tr>
                                <template x-for="k in Object.keys(r)" :key="k">
                                    <td class="whitespace-nowrap" x-text="r[k]"></td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('fakeDataGenerator', () => ({
        dataType: 'person',
        count: 10,
        locale: 'US',
        format: 'json',
        rows: [],
        copied: false,
        generate() {
            const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica'];
            const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
            const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Francisco', 'Seattle', 'Austin', 'London', 'Berlin'];
            const companies = ['Acme Corp', 'Globex', 'Soylent Inc', 'Initech', 'Umbrella Corp', 'Hooli', 'Stark Industries', 'Wayne Enterprises'];
            const domains = ['example.com', 'testmail.org', 'sample.io', 'demo.net'];

            const n = Math.min(Math.max(1, parseInt(this.count, 10) || 10), 100);
            const res = [];
            for (let i = 1; i <= n; i++) {
                const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
                const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
                const city = cities[Math.floor(Math.random() * cities.length)];
                const comp = companies[Math.floor(Math.random() * companies.length)];
                const domain = domains[Math.floor(Math.random() * domains.length)];
                const email = fn.toLowerCase() + '.' + ln.toLowerCase() + '@' + domain;
                const uuid = crypto.randomUUID();

                if (this.dataType === 'person') {
                    res.push({ id: i, name: fn + ' ' + ln, email: email, city: city });
                } else if (this.dataType === 'company') {
                    res.push({ id: i, company: comp, contact: fn + ' ' + ln, email: email });
                } else {
                    res.push({ id: i, uuid: uuid, name: fn + ' ' + ln, status: 'active' });
                }
            }
            this.rows = res;
        },
        init() {
            this.generate();
        },
        get outputText() {
            if (!this.rows.length) return '';
            if (this.format === 'json') {
                return JSON.stringify(this.rows, null, 2);
            } else {
                const keys = Object.keys(this.rows[0]);
                const lines = [keys.join(',')];
                for (const r of this.rows) {
                    lines.push(keys.map(k => '"' + r[k] + '"').join(','));
                }
                return lines.join('\n');
            }
        },
        copy() {
            navigator.clipboard.writeText(this.outputText);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },
        download() {
            const ext = this.format === 'json' ? 'json' : 'csv';
            const type = this.format === 'json' ? 'application/json' : 'text/csv';
            const blob = new Blob([this.outputText], { type });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'fake-data.' + ext;
            a.click();
        }
    }));
});
</script>
