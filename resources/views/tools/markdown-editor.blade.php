<x-tool-paper x-data="markdownEditor()">
    <div class="space-y-4">
        {{-- Toolbar --}}
        <div class="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-base-200 border border-base-300">
            <div class="flex flex-wrap items-center gap-1">
                <button type="button" @click="insert('**', '**')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all" title="Bold">B</button>
                <button type="button" @click="insert('*', '*')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs italic font-bold transition-all" title="Italic">I</button>
                <button type="button" @click="insert('## ')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-mono font-bold transition-all" title="Heading 2">H2</button>
                <button type="button" @click="insert('### ')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-mono font-bold transition-all" title="Heading 3">H3</button>
                <button type="button" @click="insert('> ')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all" title="Quote">&ldquo;</button>
                <button type="button" @click="insert('`', '`')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all" title="Inline Code">&lt;/&gt;</button>
                <button type="button" @click="insert('```\n', '\n```')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-mono transition-all" title="Code Block">Code Block</button>
                <button type="button" @click="insert('[', '](https://)')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs transition-all" title="Link">Link</button>
                <button type="button" @click="insert('- ')" class="px-3 py-1.5 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content text-xs transition-all" title="List">• List</button>
            </div>
            <div class="flex items-center gap-1.5">
                <button type="button" @click="copyMd()" class="px-3 py-1.5 rounded-full bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all">
                    <span x-text="copied ? 'Copied MD!' : 'Copy MD'"></span>
                </button>
                <button type="button" @click="copyHtml()" class="px-3 py-1.5 rounded-full bg-base-100 hover:bg-primary hover:text-primary-content text-xs font-bold transition-all">
                    <span x-text="copiedHtml ? 'Copied HTML!' : 'Copy HTML'"></span>
                </button>
                <button type="button" @click="downloadMd()" class="px-3 py-1.5 rounded-full bg-primary text-primary-content text-xs font-bold transition-all">
                    Download .md
                </button>
            </div>
        </div>

        {{-- Split Workspace --}}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Markdown Input</label>
                    <span class="text-xs text-base-content/50 font-mono">
                        <span x-text="content.length"></span> chars · <span x-text="content.trim() ? content.trim().split(/\s+/).length : 0"></span> words
                    </span>
                </div>
                <textarea
                    x-ref="textarea"
                    x-model="content"
                    rows="18"
                    placeholder="Type or paste markdown..."
                    class="textarea textarea-bordered rounded-3xl w-full text-sm leading-relaxed p-5 bg-base-100 font-mono"
                ></textarea>
            </div>

            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">Live HTML Preview</label>
                    <span class="text-xs text-primary font-bold font-mono">Real-Time Render</span>
                </div>
                <div
                    class="p-6 rounded-3xl bg-base-100 border border-base-300 min-h-[440px] max-h-[440px] overflow-y-auto"
                    x-html="renderedHtml"
                ></div>
            </div>
        </div>

        {{-- Technical Comparison: Markdown vs HTML Reference Cheat Sheet --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Markdown Syntax vs. HTML Output Quick Reference Cheat Sheet
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>Formatting Element</th>
                            <th>Markdown Syntax</th>
                            <th>Compiled HTML Tag</th>
                            <th>Standard Semantic Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono">Primary Title</td>
                            <td class="font-mono text-primary"># Document Title</td>
                            <td class="font-mono">&lt;h1&gt;Document Title&lt;/h1&gt;</td>
                            <td>Page-level H1 document header</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Section Subtitle</td>
                            <td class="font-mono text-primary">## Major Section</td>
                            <td class="font-mono">&lt;h2&gt;Major Section&lt;/h2&gt;</td>
                            <td>Section divisions and table of contents</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Hyperlink</td>
                            <td class="font-mono text-primary">[Anchor](https://...)</td>
                            <td class="font-mono">&lt;a href="..."&gt;Anchor&lt;/a&gt;</td>
                            <td>Contextual anchor links to external resources</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Blockquote</td>
                            <td class="font-mono text-primary">&gt; Important note</td>
                            <td class="font-mono">&lt;blockquote&gt;...&lt;/blockquote&gt;</td>
                            <td>Callout boxes, editorial quotes, warnings</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Inline Code</td>
                            <td class="font-mono text-primary">`const x = 10;`</td>
                            <td class="font-mono">&lt;code&gt;const x = 10;&lt;/code&gt;</td>
                            <td>Variable names, file paths, CLI flags</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">Fenced Code Block</td>
                            <td class="font-mono text-primary">```python ... ```</td>
                            <td class="font-mono">&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;</td>
                            <td>Multi-line scripts with language syntax highlighting</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-tool-paper>

<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('markdownEditor', () => ({
        tab: 'split',
        copied: false,
        copiedHtml: false,
        content: `# Welcome to Tool4SaaS Markdown Editor\n\nWrite, preview, and export clean documentation with zero data egress.\n\n## Core Features\n- **Deterministic**: 100% client-side conversion\n- *Instant Preview*: Real-time side-by-side editing\n- \`Code highlights\`: Monospace formatting for technical docs\n\n> Local-first architecture guarantees confidential contracts, notes, and memos never touch external servers.\n\n### Code Sample\n\`\`\`javascript\nfunction calculatePrivacy() {\n    return '100% local in-browser memory';\n}\n\`\`\`\n\n- [x] Fast response times\n- [x] Zero network overhead\n- [ ] Export to HTML or Markdown`,
        get renderedHtml() {
            let md = this.content || '';
            const codeBlocks = [];
            md = md.replace(/```([\s\S]*?)```/g, (_, code) => {
                const idx = codeBlocks.length;
                const esc = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                codeBlocks.push('<pre class="p-4 rounded-2xl bg-[#0e0f0c] text-white font-mono text-xs overflow-x-auto my-3 border border-[#242a20]"><code>' + esc + '</code></pre>');
                return '@@CODEBLOCK_' + idx + '@@';
            });

            let esc = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            esc = esc.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, c) => '<h' + hashes.length + ' class="font-display font-black text-base-content mt-4 mb-2">' + c.trim() + '</h' + hashes.length + '>');
            esc = esc.replace(/^&gt;\s?(.*)$/gm, '<blockquote class="border-l-4 border-primary pl-4 py-1 italic my-3 text-base-content/80">$1</blockquote>');
            esc = esc.replace(/^[ \t]*[-*]\s+(.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
            esc = esc.replace(/`([^`]+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-base-200 text-xs font-mono text-primary">$1</code>');
            esc = esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            esc = esc.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
            esc = esc.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-primary font-bold underline">$1</a>');

            let paragraphs = esc.split(/\n{2,}/).map(b => {
                b = b.trim();
                if (!b) return '';
                if (/^<(h[1-6]|blockquote|pre|li)/.test(b)) return b;
                return '<p class="text-sm leading-relaxed mb-3 text-base-content/90">' + b.replace(/\n/g, '<br>') + '</p>';
            }).join('\n');

            codeBlocks.forEach((block, idx) => {
                paragraphs = paragraphs.replace('@@CODEBLOCK_' + idx + '@@', block);
            });
            return paragraphs;
        },
        insert(before, after = '') {
            const ta = this.$refs.textarea;
            if (!ta) return;
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const text = ta.value;
            const sel = text.substring(start, end);
            ta.value = text.substring(0, start) + before + sel + after + text.substring(end);
            this.content = ta.value;
            ta.focus();
            ta.setSelectionRange(start + before.length, end + before.length);
        },
        copyMd() {
            navigator.clipboard.writeText(this.content);
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        },
        copyHtml() {
            navigator.clipboard.writeText(this.renderedHtml);
            this.copiedHtml = true;
            setTimeout(() => this.copiedHtml = false, 2000);
        },
        downloadMd() {
            const blob = new Blob([this.content], { type: 'text/markdown;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'document.md';
            a.click();
        }
    }));
});
</script>
