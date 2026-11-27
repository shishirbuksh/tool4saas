<x-card class="p-6 md:p-8" x-data="{
    info: null,
    fileName: '',
    fileSize: 0,
    onFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        this.fileName = file.name;
        this.fileSize = file.size;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                this.info = {
                    name: file.name,
                    size: (file.size / 1024).toFixed(1) + ' KB',
                    type: file.type || 'image/jpeg',
                    width: img.width + ' px',
                    height: img.height + ' px',
                    aspectRatio: (img.width / img.height).toFixed(2),
                    lastModified: new Date(file.lastModified).toLocaleString()
                };
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
}">
    <div class="space-y-6">
        <div class="border-2 border-dashed border-base-300 rounded-[20px] p-8 text-center bg-base-200/30 hover:border-primary transition-colors">
            <input aria-label="Upload file for Exif Viewer" type="file" accept="image/*" @change="onFile($event)" class="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-[12px]" />
            <p class="text-xs text-base-content/60 mt-3">Upload any photo or image to inspect metadata, resolution, MIME type, and dimensions.</p>
        </div>

        <template x-if="info">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">Image Dimensions</span>
                    <p class="font-mono text-lg font-bold mt-1 text-[#163300] dark:text-[#9fe870]" x-text="info.width + ' × ' + info.height"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">File Storage Size</span>
                    <p class="font-mono text-lg font-bold mt-1" x-text="info.size"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">MIME Format</span>
                    <p class="font-mono text-lg font-bold mt-1" x-text="info.type"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300">
                    <span class="text-xs uppercase font-bold text-base-content/60">Aspect Ratio</span>
                    <p class="font-mono text-lg font-bold mt-1" x-text="info.aspectRatio + ':1'"></p>
                </div>

                <div class="p-4 rounded-[14px] bg-base-200/50 border border-base-300 sm:col-span-2">
                    <span class="text-xs uppercase font-bold text-base-content/60">Last Modified</span>
                    <p class="font-mono text-sm font-semibold mt-1" x-text="info.lastModified"></p>
                </div>
            </div>
        </template>

        {{-- Technical Comparison: Standard EXIF & TIFF Metadata Tags Matrix --}}
        <div class="mt-8 pt-6 border-t border-base-300">
            <h3 class="font-bold text-base sm:text-lg text-base-content font-display mb-4">
                Standard EXIF, TIFF &amp; GPS Metadata Tags Specification Matrix (JEITA CP-3451)
            </h3>
            <div class="overflow-x-auto rounded-3xl border border-base-300">
                <table class="table table-zebra w-full text-xs sm:text-sm">
                    <thead class="bg-base-200 text-base-content/70 uppercase text-[11px] font-mono">
                        <tr>
                            <th>EXIF Tag ID</th>
                            <th>Tag Name</th>
                            <th>Data Format</th>
                            <th>Typical Example Value</th>
                            <th>Description &amp; Privacy Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">0x829A</td>
                            <td class="font-mono">ExposureTime</td>
                            <td class="font-mono">Rational</td>
                            <td class="font-mono">1/250 sec (0.004s)</td>
                            <td>Shutter duration controlling motion blur</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">0x829D</td>
                            <td class="font-mono">FNumber</td>
                            <td class="font-mono">Rational</td>
                            <td class="font-mono">f/2.8 or f/1.8</td>
                            <td>Lens aperture ratio determining depth of field</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-[#163300] dark:text-[#9fe870]">0x8827</td>
                            <td class="font-mono">PhotographicSensitivity (ISO)</td>
                            <td class="font-mono">Short (Integer)</td>
                            <td class="font-mono">ISO 100, 400, 1600</td>
                            <td>Sensor light amplification gain level</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono">0x920A</td>
                            <td class="font-mono">FocalLength</td>
                            <td class="font-mono">Rational</td>
                            <td class="font-mono">50 mm (Full-frame eq.)</td>
                            <td>Optical focal distance of camera lens</td>
                        </tr>
                        <tr>
                            <td class="font-bold font-mono text-error">0x0002 (GPS)</td>
                            <td class="font-mono">GPSLatitude / Longitude</td>
                            <td class="font-mono">Rational triplet</td>
                            <td class="font-mono">37° 46' 29.7" N, 122°...</td>
                            <td class="text-error font-semibold">High privacy risk (Exact geocoordinates)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-card>
