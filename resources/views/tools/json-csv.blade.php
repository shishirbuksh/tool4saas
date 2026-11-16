<x-tool-paper x-data="jsonCsvConverter()">
    <div class="space-y-6">
        <div class="flex items-center gap-2 p-1.5 rounded-full bg-base-200 border border-base-300 w-fit">
            <button
                type="button"
                @click="mode = 'json2csv'; process()"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'json2csv' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                JSON to CSV
            </button>
            <button
                type="button"
                @click="mode = 'csv2json'; process()"
                class="px-5 py-2 rounded-full text-xs font-bold transition-all"
                :class="mode === 'csv2json' ? 'bg-primary text-primary-content shadow-xs' : 'text-base-content/70 hover:text-base-content'"
            >
                CSV to JSON
            </button>
        </div>

        <template x-if="error">
            <div class="p-4 rounded-2xl bg-error/10 border border-error text-error text-xs font-mono" x-text="error"></div>
        </template>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2" x-text="mode === 'json2csv' ? 'JSON Array Input' : 'CSV Lines Input'"></label>
                <textarea
                    x-model="input"
                    @input="process()"
                    rows="13"
                    class="textarea textarea-bordered rounded-3xl w-full text-xs font-mono p-5 bg-base-100"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono" x-text="mode === 'json2csv' ? 'Generated CSV Output' : 'Generated JSON Array Output'"></label>
                    <div class="flex items-center gap-2">
                        <button
                            type="button"
                            @click="copy()"
                            :disabled="!output"
                            class="px-4 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-40"
                        >
                            <span x-text="copied ? 'Copied!' : 'Copy'"></span>
                        </button>
                        <button
                            type="button"
                            @click="download()"
                            :disabled="!output"
                            class="px-4 py-1 rounded-full bg-primary text-primary-content hover:bg-primary/90 text-xs font-bold transition-all disabled:opacity-40"
                        >
                            Download File
                        </button>
                    </div>
                </div>
                <textarea
                    x-model="output"
                    readonly
                    rows="13"
                    class="textarea textarea-bordered rounded-3xl w-full text-xs font-mono p-5 bg-base-200/50 select-all"
                ></textarea>
            </div>
        </div>

        {{-- Technical Comparison: RFC 4180 CSV Standards & Delimiter Specifications Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                RFC 4180 CSV Standards, Delimiter Variants &amp; Escaping Rules Matrix
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Tabular Delimiter Format</th>
                            <th>Separator Character</th>
                            <th>RFC 4180 Escaping Rule</th>
                            <th>Regional Locale Compatibility</th>
                            <th>Primary Software System</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-primary">Standard Comma (CSV)</td>
                            <td class="font-mono">, (ASCII 44)</td>
                            <td class="font-mono">Wrap in double quotes: <code class="font-mono">&quot;a,b&quot;</code></td>
                            <td>US, UK, India, English-speaking world</td>
                            <td>RFC 4180 standard, PostgreSQL COPY, Pandas, Excel</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-primary">Semicolon (European CSV)</td>
                            <td class="font-mono">; (ASCII 59)</td>
                            <td class="font-mono">Wrap in quotes: <code class="font-mono">&quot;a;b&quot;</code></td>
                            <td>Germany, France, Spain, Brazil (where comma is decimal)</td>
                            <td>European localized Microsoft Excel builds</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Tab-Separated (TSV)</td>
                            <td class="font-mono">\t (ASCII 9)</td>
                            <td class="font-mono">Minimal escaping needed (no commas quoted)</td>
                            <td class="text-success font-semibold">Universal international standard</td>
                            <td>Bioinformatics (GenBank, FASTA), Unix CLI tools (awk, cut)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Pipe-Delimited (PSV)</td>
                            <td class="font-mono">| (ASCII 124)</td>
                            <td class="font-mono">Escape literal pipes: <code class="font-mono">\|</code></td>
                            <td class="text-success font-semibold">Universal</td>
                            <td>Enterprise Data Warehouses, mainframe legacy ETL pipelines</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('jsonCsvConverter', () => ({
        mode: 'json2csv',
        input: '[\n  { "id": 1, "name": "Alice Smith", "role": "Lead Architect", "city": "San Francisco" },\n  { "id": 2, "name": "Bob Johnson", "role": "Frontend Engineer", "city": "London" },\n  { "id": 3, "name": "Carol Williams", "role": "DevOps Specialist", "city": "Berlin" }\n]',
        output: '',
        error: '',
        copied: false,
        process() {
            this.error = '';
            if (!this.input.trim()) {
                this.output = '';
                return;
            }
            try {
                if (this.mode === 'json2csv') {
                    const data = JSON.parse(this.input);
                    if (!Array.isArray(data)) {
                        this.error = 'Input JSON must be an array of objects.';
                        this.output = '';
                        return;
                    }
                    const keys = Array.from(new Set(data.flatMap(o => Object.keys(o))));
                    const escapeCsv = (v) => {
                        const s = v === null || v === undefined ? '' : String(v);
                        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
                    };
                    const lines = [keys.join(',')];
                    for (const o of data) {
                        lines.push(keys.map(k => escapeCsv(o[k])).join(','));
                    }
                    this.output = lines.join('\n');
                } else {
                    const lines = this.input.trim().split(/\r?\n/);
                    if (lines.length < 2) {
                        this.error = 'CSV requires a header line and at least one data row.';
                        this.output = '';
                        return;
                    }
                    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
                    const records = [];
                    for (let i = 1; i < lines.length; i++) {
                        const row = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
                        const obj = {};
                        headers.forEach((h, idx) => {
                            obj[h] = row[idx] || '';
                        });
                        records.push(obj);
                    }
                    this.output = JSON.stringify(records, null, 2);
                }
            } catch (e) {
                this.error = e.message;
                this.output = '';
            }
        },
        init() {
            this.process();
        },
        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },
        download() {
            if (!this.output) return;
            const ext = this.mode === 'json2csv' ? 'csv' : 'json';
            const type = this.mode === 'json2csv' ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8;';
            const blob = new Blob([this.output], { type: type });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'converted.' + ext;
            a.click();
        }
    }));
});
</script>
