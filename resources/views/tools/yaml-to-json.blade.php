<x-card class="p-6 md:p-8">
    <div x-data="{
        input: '',
        output: '',
        indent: 2,
        error: '',
        copied: false,

        parseYaml(yamlStr) {
            const lines = yamlStr.split(/\r?\n/);
            const root = {};
            const stack = [{ indent: -1, obj: root, isArray: false }];

            for (let idx = 0; idx < lines.length; idx++) {
                const line = lines[idx];
                if (!line.trim() || line.trim().startsWith('#')) continue;

                const indent = line.search(/\S/);
                const content = line.trim();

                while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
                    stack.pop();
                }

                const current = stack[stack.length - 1];

                if (content.startsWith('- ')) {
                    const itemVal = content.slice(2).trim();
                    if (itemVal.includes(': ')) {
                        const colonIdx = itemVal.indexOf(': ');
                        const k = itemVal.slice(0, colonIdx).trim().replace(/^['&quot;]|['&quot;]$/g, '');
                        const v = this.parseValue(itemVal.slice(colonIdx + 2).trim());
                        const newObj = { [k]: v };
                        if (Array.isArray(current.obj)) {
                            current.obj.push(newObj);
                        }
                        stack.push({ indent: indent, obj: newObj, isArray: false });
                    } else {
                        if (Array.isArray(current.obj)) {
                            current.obj.push(this.parseValue(itemVal));
                        }
                    }
                } else if (content.includes(':')) {
                    const colonIdx = content.indexOf(':');
                    const key = content.slice(0, colonIdx).trim().replace(/^['&quot;]|['&quot;]$/g, '');
                    const rawVal = content.slice(colonIdx + 1).trim();

                    if (!rawVal) {
                        let nextIsArray = false;
                        for (let n = idx + 1; n < lines.length; n++) {
                            const nl = lines[n].trim();
                            if (nl && !nl.startsWith('#')) {
                                if (nl.startsWith('- ')) nextIsArray = true;
                                break;
                            }
                        }
                        const newContainer = nextIsArray ? [] : {};
                        if (Array.isArray(current.obj)) {
                            current.obj.push({ [key]: newContainer });
                        } else {
                            current.obj[key] = newContainer;
                        }
                        stack.push({ indent: indent, obj: newContainer, isArray: nextIsArray });
                    } else {
                        const val = this.parseValue(rawVal);
                        if (Array.isArray(current.obj)) {
                            current.obj.push({ [key]: val });
                        } else {
                            current.obj[key] = val;
                        }
                    }
                }
            }
            return root;
        },

        parseValue(v) {
            if (v === 'null' || v === '~' || v === '') return null;
            if (v === 'true' || v === 'True' || v === 'yes') return true;
            if (v === 'false' || v === 'False' || v === 'no') return false;
            if (!isNaN(Number(v)) && !v.startsWith('0x') && v.trim() !== '') return Number(v);
            if ((v.startsWith('&quot;') && v.endsWith('&quot;')) || (v.startsWith('\x27') && v.endsWith('\x27'))) {
                return v.slice(1, -1);
            }
            return v;
        },

        convert() {
            this.error = '';
            if (!this.input.trim()) {
                this.output = '';
                return;
            }
            try {
                const parsed = this.parseYaml(this.input);
                const spaces = this.indent === 0 ? 0 : this.indent;
                this.output = JSON.stringify(parsed, null, spaces);
            } catch (e) {
                this.error = 'Invalid YAML: ' + (e.message || 'Syntax error');
            }
        },

        loadSample() {
            this.input = 'server:\n  host: 127.0.0.1\n  port: 8080\n  ssl: true\ndatabase:\n  driver: sqlite\n  name: tool4saas\n  pool: 10\nfeatures:\n  - encryption\n  - offline_mode\n  - client_side_calc';
            this.convert();
        },

        copy() {
            if (!this.output) return;
            navigator.clipboard.writeText(this.output);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },

        download() {
            if (!this.output) return;
            const blob = new Blob([this.output], { type: 'application/json;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'converted.json';
            a.click();
        },

        clear() {
            this.input = '';
            this.output = '';
            this.error = '';
        },

        init() {
            this.loadSample();
        }
    }">
        <div class="space-y-6">
            {{-- Toolbar --}}
            <div class="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-base-200 border border-base-300">
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        @click="loadSample()"
                        class="px-3.5 py-1.5 rounded-full bg-base-100 border border-base-300 text-xs font-bold text-base-content hover:border-primary transition-all"
                    >
                        Load Sample
                    </button>
                    <button
                        type="button"
                        @click="clear()"
                        class="px-3.5 py-1.5 rounded-full bg-base-100 border border-base-300 text-xs font-bold text-error hover:bg-error/10 transition-all"
                    >
                        Clear
                    </button>
                </div>

                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2">
                        <label for="json-indent" class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Format</label>
                        <select id="json-indent" x-model.number="indent" @change="convert()" class="select select-bordered select-xs rounded-xl font-bold bg-base-100">
                            <option :value="2">2 Spaces</option>
                            <option :value="4">4 Spaces</option>
                            <option :value="0">Minified</option>
                        </select>
                    </div>
                </div>
            </div>

            {{-- Error Banner --}}
            <div x-show="error" x-cloak class="p-4 rounded-2xl bg-error/15 border border-error/30 text-error text-xs font-mono font-bold flex items-center gap-2">
                <span>⚠️</span>
                <span x-text="error"></span>
            </div>

            {{-- Editors Grid --}}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label for="yaml-source" class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Source YAML</label>
                        <span class="text-xs text-base-content/50 font-mono" x-text="input.length + ' chars'"></span>
                    </div>
                    <textarea
                        id="yaml-source"
                        x-model="input"
                        @input="convert()"
                        rows="14"
                        placeholder="Paste YAML here..."
                        class="textarea textarea-bordered rounded-3xl w-full text-xs leading-relaxed p-4 bg-base-100 font-mono"
                    ></textarea>
                </div>

                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label for="json-target" class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Output JSON</label>
                        <div class="flex items-center gap-2">
                            <button
                                type="button"
                                @click="copy()"
                                :disabled="!output"
                                class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                            >
                                <span x-text="copied ? '✓ Copied!' : 'Copy JSON'"></span>
                            </button>
                            <button
                                type="button"
                                @click="download()"
                                :disabled="!output"
                                class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                            >
                                Download .json
                            </button>
                        </div>
                    </div>
                    <textarea
                        id="json-target"
                        x-model="output"
                        readonly
                        rows="14"
                        placeholder="JSON output will appear here..."
                        class="textarea textarea-bordered rounded-3xl bg-base-200/50 w-full text-xs leading-relaxed p-4 font-mono"
                    ></textarea>
                </div>
            </div>

            {{-- Trust Banner --}}
            <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span class="text-primary font-bold">✓ 100% Client-Side Privacy Guaranteed</span>
                <span class="text-[#868685]">Conversion runs entirely in your browser. Zero bytes uploaded.</span>
            </div>
        </div>
    </div>
</x-card>
