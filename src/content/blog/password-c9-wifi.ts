import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Router credentials guard everything behind them — one kept default like admin/password123 exposes laptop, phone and bank logins at once. Here is what to change, in order: admin password, Wi-Fi passphrase, guest network. This is the practical setup: <strong>strong Wi-Fi and router passwords</strong> in 15 minutes, once.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a>. Generate both secrets in the <a href="/password-generator">password generator</a>; bulk tokens via <a href="/random-string">random string tool</a>. Concepts in <a href="/blog/password-generator-guide/how-to-create-strong-password">creation steps</a>.</p>

<h2 id="two-secrets">Two secrets, two jobs (stop confusing them)</h2>
<ul>
<li><strong>Router admin password:</strong> guards settings (DNS, firmware, port forwarding). Change from default immediately — botnets scan for admin/admin daily. 20+ random characters, stored in manager, never shared. If the router was ever secondhand, factory-reset before configuring (previous owners keep access otherwise).</li>
<li><strong>Wi-Fi passphrase (WPA2/WPA3 PSK):</strong> guards network join. 20+ characters or 5-word passphrase; WPA3 where hardware supports it, WPA2-AES minimum — never WEP or open (both offer zero real protection).</li>
<li><strong>Different secrets, always:</strong> admin ≠ Wi-Fi. Guests get Wi-Fi only, via QR or dictated passphrase — never admin access, never the same string.</li>
</ul>

<h2 id="setup">Setup walkthrough (15 minutes, once)</h2>
<ol>
<li><strong>Connect by cable, log in with defaults</strong> (sticker values), and check for firmware updates first — unpatched routers fall regardless of password strength.</li>
<li><strong>Set admin password:</strong> generate 20+ random characters, save in manager. Disable remote/WAN administration unless you truly administer remotely (almost nobody should).</li>
<li><strong>Set Wi-Fi passphrase:</strong> generate a 5-word passphrase for dictation ease or 20-char random for max strength; WPA2-AES minimum, WPA3 preferred.</li>
<li><strong>Create the guest network:</strong> separate SSID (“Home-Guest”), isolated from main devices, with its own passphrase. Share via QR on the fridge — visitors stop asking, and IoT gadgets live here too, quarantined from laptops.</li>
<li><strong>Record + verify:</strong> admin in manager, Wi-Fi on the fridge QR, then test: guest device reaches internet but not your laptop's shares; admin panel rejects old defaults.</li>
</ol>

<h2 id="iot-guests">IoT gadgets and guests (the forgotten attack surface)</h2>
<p>Smart bulbs, cameras and plugs ship with default credentials and rare updates — isolate all of them on the guest network, where compromise reaches the internet but not your laptop or NAS. Change each gadget's default password where possible (many allow it in-app); where impossible, network isolation is the entire defense. Guests: QR code, never dictation of the main passphrase — rotating the guest passphrase yearly costs nothing and bounds exposure from every visitor's compromised phone. Moving house? Factory-reset the router before selling or returning it — your Wi-Fi history and ISP credentials live in its config backup.</p>
<h2 id="secondhand-moving">Secondhand routers and moving house (reset discipline)</h2>
<p>Routers carry history: previous owner's ISP credentials, port forwards, DNS overrides and saved Wi-Fi PSKs persist through ownership changes. Buying used? Factory-reset before first configuration, flash latest firmware, then set fresh admin + PSK — treat all prior settings as hostile. Selling or returning ISP hardware? Factory-reset and verify: log back in with defaults to confirm the wipe, remove the device from ISP/bank “trusted devices” lists, and rotate any password ever typed on its admin pages from another device. Movers: export nothing — photograph settings if needed, rebuild clean at the new address (new SSID, new secrets), and retire the old PSK everywhere it was shared. Fifteen minutes of reset discipline closes an attack surface most households never think about.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

export const passwordWifi: BlogPost = {
  pillar: "password-generator-guide",
  slug: "wifi-router-password",
  kind: "cluster",
  title: "Strong Wi-Fi & Router Passwords: Practical Setup (2026)",
  description:
    "Wi-Fi + router passwords done right: admin vs PSK, WPA3 settings, guest network, IoT isolation. 15-minute once-only setup.",
  keywords: [
    "how to create strong wifi password",
    "router admin password length",
    "wpa3 password generator offline",
    "guest wifi network setup",
  ],
  toolSlugs: ["password-generator", "random-string", "password-strength"],
  relatedSlugs: ["how-to-create-strong-password", "random-password-ideas", "2fa-vs-passkeys"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "two-secrets", text: "Two secrets, two jobs", level: 2 },
    { id: "setup", text: "15-minute setup", level: 2 },
    { id: "iot-guests", text: "IoT + guests attack surface", level: 2 },
    { id: "secondhand-moving", text: "Secondhand + moving resets", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a strong Wi-Fi password?", answer: "20+ random characters or a 5-word passphrase on WPA2-AES minimum (WPA3 preferred). Dictation-friendly passphrases suit sharing; max randomness suits set-and-forget routers." },
    { question: "Should router admin and Wi-Fi passwords differ?", answer: "Always — admin guards settings (DNS, firmware), Wi-Fi guards joining. Different 20+ secrets; guests get Wi-Fi only, never admin." },
    { question: "Is WEP or open Wi-Fi ever OK?", answer: "No — both offer zero real protection and fall in minutes. Minimum WPA2-AES; upgrade hardware if it cannot do better." },
    { question: "Where do smart home gadgets go?", answer: "Isolated guest network, away from laptops and NAS. Change gadget defaults where possible; isolation is the defense where not." },
    { question: "What do I do with the router when moving?", answer: "Factory-reset before selling or returning — Wi-Fi history, ISP credentials and configs persist in backups otherwise." },
  ],
};
