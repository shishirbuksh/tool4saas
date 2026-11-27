<x-card class="p-6 md:p-8">
    <div x-data="{
        input: '',
        output: '',
        indent: 2,
        error: '',
        copied: false,

        jsonToYaml(obj, depth = 0) {
            const indentStr = ' '.repeat(depth * this.indent);
            if (obj === null) return 'null';
            if (typeof obj === 'boolean') return obj ? 'true' : 'false';
            if (typeof obj === 'number') return String(obj);
            if (typeof obj === 'string') {
                if (obj === '' || /[\n:#[\]{},&*!|>]/.test(obj) || !isNaN(Number(obj)) || obj === 'true' || obj === 'false' || obj === 'null') {
                    return JSON.stringify(obj);
                }
                return obj;
            }

            if (Array.isArray(obj)) {
                if (obj.length === 0) return '[]';
                let yaml = '';
                for (let i = 0; i < obj.length; i++) {
                    const val = obj[i];
                    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                        const nested = this.jsonToYaml(val, depth + 1).trimStart();
                        yaml += `${indentStr}- ${nested}\n`;
                    } else if (Array.isArray(val)) {
                        yaml += `${indentStr}-\n${this.jsonToYaml(val, depth + 1)}\n`;
                    } else {
                        yaml += `${indentStr}- ${this.jsonToYaml(val, depth + 1)}\n`;
                    }
                }
                return yaml.trimEnd();
            }

            if (typeof obj === 'object') {
                const keys = Object.keys(obj);
                if (keys.length === 0) return '{}';
                let yaml = '';
                for (let i = 0; i < keys.length; i++) {
                    const k = keys[i];
                    const keyFormatted = /[\s:#[\]{},&*!|>]/.test(k) ? JSON.stringify(k) : k;
                    const v = obj[k];
                    if (typeof v === 'object' && v !== null) {
                        if (Array.isArray(v) && v.length === 0) {
                            yaml += `${indentStr}${keyFormatted}: []\n`;
                        } else if (!Array.isArray(v) && Object.keys(v).length === 0) {
                            yaml += `${indentStr}${keyFormatted}: {}\n`;
                        } else {
                            yaml += `${indentStr}${keyFormatted}:\n${this.jsonToYaml(v, depth + 1)}\n`;
                        }
                    } else {
                        yaml += `${indentStr}${keyFormatted}: ${this.jsonToYaml(v, depth + 1)}\n`;
                    }
                }
                return yaml.trimEnd();
            }

            return String(obj);
        },

        convert() {
            this.error = '';
            if (!this.input.trim()) {
                this.output = '';
                return;
            }
            try {
                const parsed = JSON.parse(this.input);
                this.output = this.jsonToYaml(parsed, 0);
            } catch (e) {
                this.error = 'Invalid JSON: ' + (e.message || 'Syntax error');
            }
        },

        loadSample() {
            this.input = JSON.stringify({
                apiVersion: 'apps/v1',
                kind: 'Deployment',
                metadata: {
                    name: 'tool4saas-app',
                    labels: { app: 'web', tier: 'frontend' }
                },
                spec: {
                    replicas: 3,
                    selector: { matchLabels: { app: 'web' } },
                    template: {
                        spec: {
                            containers: [{
                                name: 'nginx',
                                image: 'nginx:1.25-alpine',
                                ports: [{ containerPort: 80 }]
                            }]
                        }
                    }
                }
            }, null, 2);
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
            const blob = new Blob([this.output], { type: 'text/yaml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted.yaml';
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
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
                        <label for="yaml-indent" class="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Indent</label>
                        <select id="yaml-indent" x-model.number="indent" @change="convert()" class="select select-bordered select-xs rounded-xl font-bold bg-base-100">
                            <option :value="2">2 Spaces</option>
                            <option :value="4">4 Spaces</option>
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
                        <label for="json-input" class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Source JSON</label>
                        <span class="text-xs text-base-content/50 font-mono" x-text="input.length + ' chars'"></span>
                    </div>
                    <textarea
                        id="json-input"
                        x-model="input"
                        @input="convert()"
                        rows="14"
                        placeholder="Paste JSON here..."
                        class="textarea textarea-bordered rounded-3xl w-full text-xs leading-relaxed p-4 bg-base-100 font-mono"
                    ></textarea>
                </div>

                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label for="yaml-output" class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Output YAML</label>
                        <div class="flex items-center gap-2">
                            <button
                                type="button"
                                @click="copy()"
                                :disabled="!output"
                                class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                            >
                                <span x-text="copied ? '✓ Copied!' : 'Copy YAML'"></span>
                            </button>
                            <button
                                type="button"
                                @click="download()"
                                :disabled="!output"
                                class="px-3 py-1 rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all disabled:opacity-50"
                            >
                                Download .yaml
                            </button>
                        </div>
                    </div>
                    <textarea
                        id="yaml-output"
                        x-model="output"
                        readonly
                        rows="14"
                        placeholder="YAML output will appear here..."
                        class="textarea textarea-bordered rounded-3xl bg-base-200/50 w-full text-xs leading-relaxed p-4 font-mono"
                    ></textarea>
                </div>
            </div>

            {{-- Trust Banner --}}
            <div class="p-4 rounded-2xl bg-[#0e0f0c] text-white border border-[#242a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span class="text-primary font-bold">✓ 100% Client-Side Privacy Guaranteed</span>
                <span class="text-[#868685]">Your JSON configuration never leaves your browser. Zero cloud logging.</span>
            </div>

            {{-- Technical Comparison: JSON vs YAML --}}
            <div class="pt-4 border-t border-base-300">
                <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                    JSON vs. YAML Technical Specification Comparison
                </h3>
                <div class="overflow-x-auto rounded-3xl border border-base-300">
                    <table class="table table-zebra w-full text-xs sm:text-sm">
                        <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                            <tr>
                                <th>Specification Feature</th>
                                <th>JSON (RFC 8259)</th>
                                <th>YAML (YAML Ain't Markup Language)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-bold font-mono">Primary Use Case</td>
                                <td>Web APIs, REST payloads, client-server data exchange</td>
                                <td>DevOps configuration, Kubernetes manifests, Docker Compose</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Syntax Delimiters</td>
                                <td>Strict brackets {}, brackets [], and commas</td>
                                <td>Clean whitespace indentation and hyphens (-)</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Comment Support</td>
                                <td>No native comments supported in RFC spec</td>
                                <td>Full hash comments (#) supported anywhere</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Readability</td>
                                <td>Strict machine format; dense for large structures</td>
                                <td>Human-optimized; highly readable configuration format</td>
                            </tr>
                            <tr>
                                <td class="font-bold font-mono">Parsing Overhead</td>
                                <td>Extremely fast; native C++ JSON.parse in all browsers</td>
                                <td>Moderate; requires recursive indentation parser</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-card>
