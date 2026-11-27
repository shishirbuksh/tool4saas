<x-card class="p-6 md:p-8" x-data="{
    ip: '192.168.1.1',
    cidr: 24,
    get netmask() {
        const mask = [];
        for (let i = 0; i < 4; i++) {
            const n = Math.min(this.cidr - i * 8, 8);
            mask.push(n > 0 ? (256 - Math.pow(2, 8 - n)) : 0);
        }
        return mask.join('.');
    },
    get usableHosts() {
        const n = 32 - parseInt(this.cidr);
        if (n <= 1) return 0;
        return Math.pow(2, n) - 2;
    },
    get totalIps() {
        const n = 32 - parseInt(this.cidr);
        return Math.pow(2, n);
    }
}">
    <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">IPv4 Address</label>
                <input aria-label="IPv4 Address" type="text" x-model="ip" class="input input-bordered w-full rounded-[12px] font-mono text-sm" />
            </div>

            <div>
                <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-base-content/70">Subnet Mask CIDR (/n)</label>
                <select aria-label="Subnet Mask CIDR (/n)" x-model="cidr" class="select select-bordered w-full rounded-[12px] font-mono text-sm">
                    <template x-for="c in [8, 16, 20, 24, 25, 26, 27, 28, 29, 30, 32]" :key="c">
                        <option :value="c" x-text="'/' + c + ' (' + (32 - c === 0 ? 'Single Host' : Math.pow(2, 32 - c) + ' Total IPs') + ')'"></option>
                    </template>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Subnet Netmask</span>
                <p class="font-mono text-xl font-bold mt-1 text-[#163300] dark:text-[#9fe870]" x-text="netmask"></p>
            </div>

            <div class="p-5 rounded-[16px] bg-[#163300] text-white">
                <span class="text-xs uppercase tracking-widest text-[#9fe870] font-bold font-mono">Usable Host Capacity</span>
                <p class="font-mono text-2xl font-extrabold mt-1 text-[#9fe870]" x-text="usableHosts.toLocaleString()"></p>
                <span class="text-xs text-white/60">Assignables IPs</span>
            </div>

            <div class="p-5 rounded-[16px] bg-base-200/50 border border-base-300">
                <span class="text-xs uppercase font-bold text-base-content/60">Total Block Size</span>
                <p class="font-mono text-xl font-bold mt-1" x-text="totalIps.toLocaleString() + ' IPs'"></p>
            </div>
        </div>

        {{-- Technical Comparison: CIDR Subnet Cheat Sheet --}}
        <div class="pt-4 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                IPv4 CIDR Subnetting Reference Table (/24 to /32 Subnet Masks &amp; Usable Host Capacities)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>CIDR Prefix</th>
                            <th>Subnet Netmask</th>
                            <th>Total IP Pool</th>
                            <th>Usable Hosts</th>
                            <th>Standard Network Deployment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/24</td>
                            <td class="font-mono">255.255.255.0</td>
                            <td class="font-mono">256</td>
                            <td class="font-bold font-mono text-[#2ead4b]">254 Hosts</td>
                            <td>Standard office local network (Class C default)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/25</td>
                            <td class="font-mono">255.255.255.128</td>
                            <td class="font-mono">128</td>
                            <td class="font-bold font-mono text-[#2ead4b]">126 Hosts</td>
                            <td>Departmental network division (Engineering vs Ops)</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/26</td>
                            <td class="font-mono">255.255.255.192</td>
                            <td class="font-mono">64</td>
                            <td class="font-bold font-mono text-[#2ead4b]">62 Hosts</td>
                            <td>Secure private database clusters, microservice tiers</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/27</td>
                            <td class="font-mono">255.255.255.224</td>
                            <td class="font-mono">32</td>
                            <td class="font-bold font-mono text-[#2ead4b]">30 Hosts</td>
                            <td>Kubernetes node groups, isolated server clusters</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/28</td>
                            <td class="font-mono">255.255.255.240</td>
                            <td class="font-mono">16</td>
                            <td class="font-bold font-mono text-[#2ead4b]">14 Hosts</td>
                            <td>Cloud VPC public DMZ, bastion jump-host subnets</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/29</td>
                            <td class="font-mono">255.255.255.248</td>
                            <td class="font-mono">8</td>
                            <td class="font-bold font-mono text-[#2ead4b]">6 Hosts</td>
                            <td>Multi-homed public IP blocks, firewall clusters</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/30</td>
                            <td class="font-mono">255.255.255.252</td>
                            <td class="font-mono">4</td>
                            <td class="font-bold font-mono text-[#2ead4b]">2 Hosts</td>
                            <td>Point-to-point router links, dedicated WAN circuits</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">/32</td>
                            <td class="font-mono">255.255.255.255</td>
                            <td class="font-mono">1</td>
                            <td class="font-bold font-mono text-base-content/60">1 Host (Single)</td>
                            <td>Loopback interface, host-specific firewall rule</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
