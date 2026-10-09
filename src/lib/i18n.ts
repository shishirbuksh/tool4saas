import type { Tool } from "@/lib/tools/types";
import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

// P1 pilot foundation (subdirectory, English slugs kept) — generalized for N locales.
// EN stays at root (/invoice-generator). Pilots live at /<locale>/<slug>.
// Full [locale]/ migration (dynamic <html lang>, per-locale sitemaps, translated
// slugs) is Phase 2; this file proves the hreflang + sitemap + native-keyword
// pattern on winners before multiplying 185xN.
export const LOCALES = ["en", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
// Next locales plug in here (Phase 1 additive): extend LOCALES + add its Tool
// objects + pages + tests. Only FR has content so far (invoice pilot).
export const NON_DEFAULT_LOCALES: readonly Locale[] = ["es", "fr"];
// Locales with a translated hub landing (/es/, /fr/). Tool-only locales stay
// out so the sitemap never lists a hub page that does not exist.
export const HUB_LOCALES: readonly Locale[] = ["es", "fr"];

// Pilot slugs with a native ES alternate. Keep tiny on purpose:
// invoice-generator is GSC #2 (346 imp, 0.29% CTR), qr-code-generator covers
// the QR cluster (qr-size-print guide: 215 imp, 0 clicks), credit-card-validator
// is GSC #3 (262 imp), unit-converter is GSC #5 (205 imp),
// typing-speed-test is GSC #8 (150 imp), plagiarism-checker is GSC #9
// (136 imp), word-counter is the top hero (HomePopular + HERO_SLUGS 0.9),
// mortgage-calculator is the top finance hero (HERO_SLUGS 0.9, YMYL),
// resume-builder is the top business hero (HERO_SLUGS 0.9, pairs with invoice),
// password-generator is the top security hero (generators + password pillar),
// image-compressor is the top images hero (HERO_SLUGS 0.9, pairs with QR),
// pdf-merge is the top PDF hero (HERO_SLUGS 0.9),
// json-formatter is the top developer hero (developer pillar + json guide),
// sip-calculator is the top wealth hero (wealth pillar, YMYL),
// emi-calculator is the top loan hero (finance + loan funnel) —
// together the 15 pilots cover every GSC top-page tool URL plus top heroes.
export const ES_PILOT_SLUGS = new Set<string>([
  "invoice-generator",
  "qr-code-generator",
  "credit-card-validator",
  "unit-converter",
  "typing-speed-test",
  "plagiarism-checker",
  "word-counter",
  "mortgage-calculator",
  "resume-builder",
  "password-generator",
  "image-compressor",
  "pdf-merge",
  "json-formatter",
  "sip-calculator",
  "emi-calculator",
]);

// French pilots: invoice-generator (highest-ROI tool), qr-code-generator
// (universal volume), unit-converter (everyday utility), word-counter (top
// hero), credit-card-validator (trust/safety), typing-speed-test (skill test),
// plagiarism-checker (integrity), mortgage-calculator (top finance hero, YMYL) —
// steady FR expansion toward full coverage, one proven tool at a time.
export const FR_PILOT_SLUGS = new Set<string>([
  "invoice-generator",
  "qr-code-generator",
  "unit-converter",
  "word-counter",
  "credit-card-validator",
  "typing-speed-test",
  "plagiarism-checker",
  "mortgage-calculator",
]);

// Generic N-locale pilot registry. New locales add their set here without
// touching metadata/sitemap/ToolPageShell.
const PILOT_SLUGS_BY_LOCALE: Record<string, Set<string>> = {
  es: ES_PILOT_SLUGS,
  fr: FR_PILOT_SLUGS,
};

export function pilotSlugsForLocale(locale: Locale): Set<string> {
  return PILOT_SLUGS_BY_LOCALE[locale] ?? new Set<string>();
}

export function getPilotLocales(slug: string): Locale[] {
  return (Object.keys(PILOT_SLUGS_BY_LOCALE) as Locale[]).filter((loc) =>
    PILOT_SLUGS_BY_LOCALE[loc]?.has(slug),
  );
}

export function isPilotSlug(slug: string): boolean {
  return getPilotLocales(slug).length > 0;
}

export function pilotUrl(locale: Locale, slug: string): string {
  return locale === DEFAULT_LOCALE ? `/${slug}` : `/${locale}/${slug}`;
}

// Human labels for the visible locale switcher (ToolPageShell).
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English version",
  es: "versión en español",
  fr: "version française",
};

export function isEsPilotSlug(slug: string): boolean {
  return ES_PILOT_SLUGS.has(slug);
}

export function esUrlForSlug(slug: string): string {
  return `/es/${slug}`;
}

// Native ES keyword research (not translated): primary "generador de facturas
// gratis" + autónomo/IVA-21% intent + proforma-vs-ordinaria + plantilla.
// Density target 1-1.8% exact, LSI (IVA, autónomo, AEAT, PDF, logo), long-tail
// rebuilt from ES SERP/PAA ("cómo hacer factura autónomo?", "factura con IVA 21").
export const invoiceGeneratorEs: Tool = {
  slug: "invoice-generator",
  title: "Generador de Facturas",
  short: "PDF gratis con IVA y logo",
  description:
    "Generador de facturas gratis: crea PDFs con logo, IVA e impuestos. Funciona offline en tu navegador, sin registro.",
  icon: "ReceiptLong",
  keywords: [
    "generador de facturas",
    "hacer factura online",
    "factura pdf con logo",
    "factura con iva 21",
    "cómo hacer factura autónomo?",
    "generador facturas gratis",
    "plantilla factura word excel",
    "factura proforma vs ordinaria",
    "factura electrónica gratis",
  ],
  category: "business",
  faq: [
    {
      question: "¿Es gratis el generador de facturas?",
      answer:
        "Sí, totalmente gratis y sin registro. Todo funciona en tu navegador; por ejemplo, una factura de 10 líneas por 605 € con logo se queda en tu dispositivo, funciona offline e imprime a PDF sin límite. Sin cuenta, marca de agua ni subidas.",
    },
    {
      question: "¿Puedo descargar o imprimir la factura en PDF?",
      answer:
        "Sí. Usa Imprimir con Ctrl o Cmd+P y elige Guardar como PDF; el diseño está listo para A4. Ejemplo: INV-2026-001 del 14 de septiembre de 2026 se guarda como factura-acme-001.pdf con logo, 500 € base, 105 € de IVA y 605 € total.",
    },
    {
      question: "¿Cuántas líneas admite una factura?",
      answer:
        "Hasta 50 líneas con cantidad, precio e IVA, por ejemplo 3 diseños a 250 € cada uno con subtotal, IVA y total automáticos. Ese trío suma 750 € base más 21% de IVA (157,50 €) para 907,50 €, recalculado en vivo. Logo y numeración siguen offline. Ver /terms.",
    },
    {
      question: "¿Qué IVA aplico a mi factura?",
      answer:
        "Aplica 21% general, 10% reducido o 4% superreducido según el producto. Por ejemplo, 500 € de servicios al 21% añaden 105 € para 605 € total. Indica NIF, numeración correlativa y base imponible, y confirma tipos con tu asesor. Ver /terms.",
    },
    {
      question: "¿Cuándo usar Net15 frente a Net30?",
      answer:
        "Elige Net15 para autónomos que necesitan caja rápida y Net30 para empresas con aprobación de compras. Por ejemplo, una factura del 14 de septiembre en Net15 vence el 29 con 1,5% de recargo, mientras Net30 llega al 14 de octubre. Añade descuento 2/10 y penalización clara. Ver /terms.",
    },
  ],
  howTo: [
    {
      name: "Datos del emisor",
      text: "Añade nombre, logo, dirección, número INV-2026-001, fecha 14 de septiembre de 2026, vencimiento, email del cliente y moneda antes de las filas.",
    },
    {
      name: "Añade líneas",
      text: "Añade filas como diseño de logo 2 unidades a 250 €, consultoría 6 horas a 120 €, con 21% de IVA, descuento y notas por línea.",
    },
    {
      name: "Revisa totales",
      text: "Revisa base 500 €, IVA 105 €, total 605 €, saldo, términos Net15, recargo y redondeo en la vista previa en vivo.",
    },
    {
      name: "Descarga o imprime",
      text: "Elige Imprimir, Guarda como PDF, nombra factura-acme-001.pdf, usa A4 con fondos, envía al cliente y archiva offline.",
    },
  ],
  guide: [
    {
      heading: "Qué es una factura profesional",
      body: "Una factura profesional identifica vendedor y comprador, número correlativo, fecha, líneas, IVA y total con vencimiento. Un autónomo con 3 diseños a 250 € muestra 750 € base más 21% (157,50 €) para 907,50 €, mientras un taller con 20 tazas a 40 € muestra 800 € antes de impuestos. Nuestro generador monta este diseño en local con tu logo, 50 líneas y PDF A4 nítido. Añade NIF y numeración INV-2026-001 para evitar duplicados. Límite: formato, no contabilidad ni asesoría. Prepara presupuestos en /quotation-generator. Ver /terms.",
    },
    {
      heading: "Cómo se calculan los totales",
      body: "Subtotal = cantidad por precio por línea; IVA = base por tipo; total = base más IVA menos descuento. Ejemplo: 2 logos a 250 € dan 500 € base; 21% añade 105 € para 605 € en INV-2026-001. Los plazos cambian la caja: Net15 vence 29 de septiembre con 1,5% mensual; Net30 llega 14 de octubre con 2%. Ofrece 2/10 neto 30 para cobrar antes por transferencia o tarjeta. Caso borde: el redondeo por línea puede variar céntimos. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Crea INV-2026-001 con base 500 €, IVA 21% (105 €) y total 605 €, imprime a factura-acme-001.pdf y envíala. Segundo caso: 750 € base al 21% = 907,50 €. Guarda copia firmada y controla vencimientos. No valida requisitos AEAT ni sustituye a tu asesor; revisa tipos reducido (10%) y superreducido (4%) según producto. Para presupuestos previos usa /quotation-generator.",
    },
  ],
};

// Native ES keyword research (not translated): primary "generador qr gratis" +
// WiFi/vCard/512-vs-2048 intent. Density 1-1.8%, LSI (zona de silencio, módulos,
// densidad, 512px/2048px, distancia/10), long-tail ES PAA ("cómo crear qr wifi?",
// "qué tamaño imprimir qr?").
export const qrCodeGeneratorEs: Tool = {
  slug: "qr-code-generator",
  title: "Generador de Códigos QR",
  short: "Gratis: links, WiFi, vCard",
  description:
    "Generador QR gratis: crea códigos para URLs, WiFi, UPI y vCard en tu navegador. Elige 512 o 2048px, descarga PNG — privado y offline.",
  icon: "QrCode2",
  keywords: [
    "generador qr",
    "crear codigo qr gratis",
    "qr para wifi",
    "codigo qr vcard",
    "cómo crear qr para wifi?",
    "generador qr sin caducidad",
    "qr 512 vs 2048 imprimir",
    "qr upi pagos india",
    "codigo qr offline",
  ],
  category: "images-design",
  faq: [
    {
      question: "¿Qué puedo codificar con este generador QR?",
      answer:
        "URLs, texto, email, teléfono y notas de hasta 200 caracteres. Ejemplo: https://example.com/menu a 512px escanea durante años sin caducidad porque los datos viven en el código. Para WiFi con SSID y clave WPA usa el generador WiFi QR, que escapa ; y : correctamente.",
    },
    {
      question: "¿Puedo descargar el QR como imagen?",
      answer:
        "Sí. Pulsa Descargar para guardar PNG al tamaño elegido, por ejemplo 512px para web y chat o 2048px para carteles. Ejemplo: un código 512px imprime nítido a 5 cm y escanea al instante; prueba con tu móvil antes de compartir. Solo códigos estáticos generales, sin analítica.",
    },
    {
      question: "¿Qué tamaño descargo para imprimir o pantalla?",
      answer:
        "Usa PNG 512px para web y chat, 2048px para carteles y flyers. Los cuadrados nítidos siguen legibles hasta A3. Ejemplo: prueba entradas de muestra en local offline con vista previa instantánea y copia en un clic. Los avisos de contraste aparecen antes de descargar.",
    },
    {
      question: "¿Qué tamaño imprimo según la distancia?",
      answer:
        "Divide la distancia de lectura entre diez: tarjetas a 50 cm necesitan 5 cm, carteles a 2 m exigen 20 cm. Conserva la zona de silencio de 4 módulos, acabado mate y alto contraste. Prueba prototipos 512px para folletos y 2048px para exteriores antes de imprimir en masa. Ver /terms.",
    },
    {
      question: "¿URL, UPI o vCard: qué rinde mejor?",
      answer:
        "Los enlaces cortos decodifican más rápido en móviles antiguos, mientras UPI como upi pay shop@upi incluye receptor e importe para pagar en un toque. vCard agrupa nombre, móvil y empresa, aunque fotos densifican el patrón. Valida cada variante con luz real y Android económico antes de imprimir. Ver /terms.",
    },
  ],
  howTo: [
    {
      name: "Escribe el contenido",
      text: "Escribe o pega qué codificar, por ejemplo https://example.com/menu, UPI shop@upi por 199 Rs o contacto vCard.",
    },
    {
      name: "Elige el tamaño",
      text: "Elige resolución, por ejemplo PNG 512px para web y chat o 2048px para carteles A3 y flyers.",
    },
    {
      name: "Vista previa y prueba",
      text: "Verifica nitidez y zona de silencio, luego escanea con la cámara desde la distancia real, por ejemplo dos metros.",
    },
    {
      name: "Descarga el PNG",
      text: "Pulsa Descargar para guardar qr-code-512.png o qr-poster-2048.png y reutilizar sin caducidad durante años.",
    },
  ],
  guide: [
    {
      heading: "Qué hace el generador QR",
      body: "Convierte URLs, texto, emails, teléfonos, UPI y vCard en códigos escaneables en tu navegador. Ejemplo: codifica https://example.com/menu, UPI shop@upi por 199 Rs o vCard con nombre y móvil +34 600 123 456 en segundos. Vista previa instantánea, 512px para pantallas o 2048px para impresión, descarga PNG sin cuenta ni caducidad. Los patrones guardan datos en el código, así impresos escanean siempre y nada se sube. Límite: códigos estáticos en negro sobre blanco, sin logos ni analítica; para claves WiFi usa /wifi-qr-generator.",
    },
    {
      heading: "Cómo funcionan tamaño y densidad",
      body: "Más caracteres = cuadrícula más densa = imagen mayor. PNG 512px sirve para web y chat (nítido a 5 cm, lectura a 50 cm); 2048px para carteles y A3 (lectura a 2 m). Tabla: chat | 512px | 5 cm | 50 cm; cartel | 2048px | 20 cm | 2 m; pancarta | 2048px | 30 cm | 3 m, con regla tamaño≈distancia/10. Conserva zona de silencio de 4 módulos, máximo contraste y superficie plana. Caso borde: brillo laminado, tazas curvas o pegatinas bajo 2 cm fallan en cámaras viejas. Prueba cada ubicación. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Codifica https://example.com/menu, descarga 512px para web y 2048px para cartel, imprime a 5 cm y 20 cm y escanea a 50 cm y 2 m. Segundo caso: vCard con 5 campos (~150 caracteres) necesita mínimo 2,5 cm en tarjeta. Archiva el PNG maestro; cada re-guardado JPG ablanda bordes. No incluye logos, colores ni seguimiento; para credenciales con escape usa /wifi-qr-generator.",
    },
  ],
};

// Native ES keyword research (not translated): primary "validador tarjeta crédito" +
// Luhn/test-card intent. Density 1-1.8%, LSI (Luhn, Visa/Mastercard/Amex, PAN,
// pasarela/sandbox), long-tail ES PAA ("¿4111 1111 pasa Luhn?", "¿cómo validar tarjeta?").
// Safety-first: never use real PAN — gateway samples only (matches EN YMYL guard).
export const creditCardValidatorEs: Tool = {
  slug: "credit-card-validator",
  title: "Validador de Tarjetas",
  short: "Test Luhn gratis – 4111 seguro",
  description:
    "Valida tarjetas gratis con Luhn, Visa/MC/Amex. Prueba 4111 1111 seguro — 100% local, privado offline, nunca uses PAN reales.",
  icon: "CreditCard",
  keywords: [
    "validador tarjeta credito",
    "validar tarjeta credito luhn",
    "test luhn 4111",
    "detector visa mastercard amex",
    "¿pasa 4111 1111 1111 1111 luhn?",
    "validador tarjetas gratis",
    "luhn checksum visa mastercard",
    "tarjetas prueba vs reales",
    "validar numero tarjeta local",
  ],
  category: "developer",
  faq: [
    {
      question: "¿Qué valida este comprobador?",
      answer:
        "Aplica Luhn más marca y longitud para Visa, Mastercard y Amex. Ejemplo: la muestra 4111 1111 1111 1111 da Visa 16 dígitos Luhn válido, mientras cambiar un dígito falla. Válido significa aritmética correcta, nunca fondos. Lotes de 200 muestras evalúan en segundos para prácticas.",
    },
    {
      question: "¿Es seguro pegar números aquí?",
      answer:
        "Todo queda en esta pestaña sin guardar nada, pero nunca pongas PAN reales ni tarjetas de clientes. Usa solo muestras como 4111 1111 1111 1111 en sandbox. Los dígitos reales pueden filtrarse por extensiones o pantalla compartida. Sin subidas. Cierra la pestaña al terminar. Ver /terms.",
    },
    {
      question: "¿Acepta espacios y guiones?",
      answer:
        "Sí. Los separadores se quitan antes del cálculo, así las muestras con formato validan bien. Ejemplo: 4111-1111-1111-1111 y con espacios pasan como Visa. Limpia puntos o letras a mano. Lotes de 200 confirman tolerancia, aunque PAN reales jamás deben aparecer ni enmascarados.",
    },
    {
      question: "¿Por qué un Luhn válido rechaza en caja?",
      answer:
        "Luhn solo prueba dígitos plausibles, ignora caducidad, CVV, dirección, velocidad y fondos que deciden la autorización. Ejemplo: 5500 0000 0000 0004 pasa matemático sin cuenta detrás. Úsalo para cazar erratas, luego confirma con pasarela, 3D Secure y antifraude. Ver /terms.",
    },
  ],
  howTo: [
    {
      name: "Escribe el número",
      text: "Escribe muestra como 4111 1111 1111 1111 o 5500 0000 0000 0004 para pruebas seguras.",
    },
    {
      name: "Lee el resultado",
      text: "Revisa marca, longitud y veredicto Luhn con colores y consejos al instante.",
    },
    {
      name: "Revisa formato",
      text: "Confirma que espacios y guiones se quitan solos; limpia puntos o letras a mano.",
    },
    {
      name: "Prueba seguro",
      text: "Usa solo muestras de documentación en sandbox, nunca PAN reales de clientes.",
    },
  ],
  guide: [
    {
      heading: "Qué prueba este validador",
      body: "Evalúa muestras con aritmética Luhn más marca y longitud para aprender. Ejemplo 1: 4111 1111 1111 1111 da Visa, 16 dígitos, Luhn válido en milisegundos. Ejemplo 2: 5500 0000 0000 0004 da Mastercard válido, mientras 3782 822463 10005 señala Amex de 15 dígitos. Válido significa checksum correcto, nunca fondos ni antifraude. Resultados al instante con colores y consejos para prácticas sandbox.",
    },
    {
      heading: "Cómo funcionan Luhn y marcas",
      body: "Tabla lógica: duplica cada segundo dígito desde la derecha | suma restando 9 si pasa de 9 | total terminado en 0 = válido | 4 inicial = Visa | 51-55 = Mastercard | 34/37 = Amex 15 dígitos. Para 4111 1111 1111 1111 la suma da 30, válido; cambiar el último 1 por 2 da 31, inválido. Espacios y guiones se quitan primero. Caso borde: rangos de 19 dígitos validan matemático pero piden pasarela. Lotes de 200 procesan rápido, aunque el emisor decide. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Escribe 4111 1111 1111 1111, observa Visa 16 dígitos Luhn válido, cambia el último dígito y mira el fallo para aprender sensibilidad. Segundo ensayo: 3782 822463 10005 para Amex de 15 dígitos. Límite: solo formato para aprender, nunca aprobación, crédito ni antifraude; pagos reales exigen pasarela y banco. Jamás pongas PAN reales. Para higiene tras formularios usa /password-strength.",
    },
  ],
};

// Lookup native ES Tool by slug (undefined for non-pilots).
export function getEsTool(slug: string): Tool | undefined {
  if (slug === "invoice-generator") return invoiceGeneratorEs;
  if (slug === "qr-code-generator") return qrCodeGeneratorEs;
  if (slug === "credit-card-validator") return creditCardValidatorEs;
  if (slug === "unit-converter") return unitConverterEs;
  if (slug === "typing-speed-test") return typingSpeedEs;
  if (slug === "plagiarism-checker") return plagiarismCheckerEs;
  if (slug === "word-counter") return wordCounterEs;
  if (slug === "mortgage-calculator") return mortgageCalculatorEs;
  if (slug === "resume-builder") return resumeBuilderEs;
  if (slug === "password-generator") return passwordGeneratorEs;
  if (slug === "image-compressor") return imageCompressorEs;
  if (slug === "pdf-merge") return pdfMergeEs;
  if (slug === "json-formatter") return jsonFormatterEs;
  if (slug === "sip-calculator") return sipCalculatorEs;
  if (slug === "emi-calculator") return emiCalculatorEs;
  return undefined;
}

// Native ES keyword research (not translated): primary "conversor de unidades" +
// km→millas/kg→libras intent. Density 1-1.8%, LSI (millas, libras, Fahrenheit,
// factores exactos, 6 decimales), long-tail ES PAA ("¿cómo convertir km a millas?",
// "¿cuántos kg son 150 libras?").
export const unitConverterEs: Tool = {
  slug: "unit-converter",
  title: "Conversor de Unidades",
  short: "km a millas, kg a libras gratis",
  description:
    "Conversor gratis: 10 mi = 16,09 km, 150 lb = 68,04 kg, 20 °C = 68 °F. Factores exactos de 6 decimales, offline y privado.",
  icon: "Straighten",
  keywords: [
    "conversor de unidades",
    "convertir km a millas",
    "convertir kg a libras",
    "km a millas conversor",
    "¿cómo convertir km a millas?",
    "conversor unidades gratis",
    "factores metricos imperiales",
    "sistema metrico vs imperial",
    "millas a km offline",
  ],
  category: "converters",
  faq: [
    {
      question: "¿Qué unidades maneja el conversor?",
      answer:
        "Cubre longitud, peso, temperatura, tiempo y datos en 1 panel. Ejemplo: 10 millas dan 16,09 km, 150 libras dan 68,04 kg y 20 °C dan 68 °F. Elige unidades de origen y destino primero. Cada cambio corre en tu dispositivo sin red.",
    },
    {
      question: "¿Es exacto el conversor?",
      answer:
        "Sí. Usa factores fijos y matemática exacta de temperatura en tu dispositivo. Ejemplo: 1 km da 0,621371 millas, 1 kg da 2,20462 libras y 0 °C da 32 °F en 1 segundo. Sin deriva de redondeo en la base. Gratis offline sin subidas.",
    },
    {
      question: "¿Mis números se suben a algún servidor?",
      answer:
        "No. Todo el cálculo corre offline en tu navegador. Ejemplo: 100 km a millas con 62,14 de resultado queda en tu dispositivo en 1 segundo, gratis sin subidas. Cierra la pestaña para borrar. Sin cuentas.",
    },
    {
      question: "¿Por qué 1 kilómetro son 0,621371 millas y no 0,62?",
      answer:
        "La milla son exactamente 1609,344 metros por acuerdo, así la división da 0,621371192 para ingeniería y aviación. Redondear a 0,62 crea 220 metros de error en 100 kilómetros. Nuestro conversor guarda seis decimales y redondea solo la vista, con precisión de navegación y lectura cómoda a diario.",
    },
    {
      question: "¿Cuándo pesan los cocineros en gramos en vez de tazas?",
      answer:
        "Prefiere gramos para harina, cacao y mantequilla donde la taza varía 20% y arruina la masa. Una taza cucharada pesa 120 gramos, la compacta llega a 150. Esta herramienta pasa 2 tazas de leche a 473 mililitros y 500 gramos a 4,2 tazas, uniendo tazas americanas y báscula europea sin bizcochos fallidos.",
    },
  ],
  howTo: [
    {
      name: "Elige la magnitud",
      text: "Elige longitud, peso, temperatura, volumen, tiempo o datos primero, por ejemplo longitud para un viaje de 10 millas.",
    },
    {
      name: "Escribe el valor",
      text: "Escribe 150, pon de libras a kilogramos, por ejemplo para registrar tu peso de gimnasio cada semana.",
    },
    {
      name: "Lee el resultado",
      text: "Lee 68,04 kilogramos al instante, revisa 4 decimales si quieres y copia al registro de entrenamiento.",
    },
    {
      name: "Prueba un ejemplo",
      text: "Valida con 1 kilómetro a 0,621 millas y 20 °C a 68 °F, invierte unidades para confirmar que cuadra.",
    },
  ],
  guide: [
    {
      heading: "Qué cubre el conversor",
      body: "Unifica longitud, masa, temperatura, volumen, velocidad, duración, presión y almacenamiento sin subir nada. Ejemplo 1: escribe 10, de millas a kilómetros, obtén 16,093 km para rutas. Ejemplo 2: escribe 150, de libras a kilogramos, obtén 68,039 kg para gimnasio y maletas. Los cálculos usan multiplicadores exactos en local, conservan decimales, copian con un toque y borran al cerrar, cuidando medidas sensibles cada día offline.",
    },
    {
      heading: "Cómo funcionan factores y °C-°F",
      body: "Lo lineal multiplica por constantes; la temperatura suma desplazamiento. Tabla: 1 km = 0,621371 millas | 1 milla = 1,609344 km | 1 kg = 2,204623 libras | 1 libra = 0,453592 kg | 1 pulgada = 2,54 cm | 1 litro = 0,264172 galones. Fahrenheit = Celsius por 9 entre 5 más 32, así 20 °C dan 68 °F. Caso borde: el cero absoluto −273,15 °C rechaza valores menores. Todo corre en doble precisión en tu navegador offline a diario.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Convierte 10 millas a 16,093 km y 150 libras a 68,039 kg, copia a tu hoja y cierra para borrar. Segundo caso: 20 °C a 68 °F y vuelta. Compara ritmo por kilómetro, traduce 2 tazas a 473 ml y concilia 32 psi con 2,2 bar. Límite: estimación con doble precisión, no calibración certificada; para moneda en vivo usa /currency-converter.",
    },
  ],
};

// Native ES keyword research (not translated): primary "test de mecanografía" +
// 62-PPM intent. Density 1-1.8%, LSI (PPM, precisión, 60 segundos, 40 media,
// caracteres entre 5), long-tail ES PAA ("¿62 ppm con 97% es bueno?",
// "¿cómo mejorar velocidad de escritura?").
export const typingSpeedEs: Tool = {
  slug: "typing-speed-test",
  title: "Test de Mecanografía",
  short: "62 PPM gratis, test 60 seg",
  description:
    "Test de mecanografía gratis de 60 segundos: logra 62 PPM al 97% con velocidad, precisión y errores en vivo. Rondas repetibles, offline.",
  icon: "TextSnippet",
  keywords: [
    "test de mecanografia",
    "test velocidad escritura",
    "ppm test",
    "prueba mecanografia online",
    "¿62 ppm con 97 por ciento es bueno?",
    "test mecanografia gratis",
    "caracteres entre 5 precision",
    "62 ppm vs 40 media profesional",
    "test de escritura online",
  ],
  category: "text-documents",
  faq: [
    {
      question: "¿Cómo se calculan PPM y precisión?",
      answer:
        "PPM divide caracteres entre cinco por minuto; precisión divide pulsaciones correctas entre totales por 100. Ejemplo: 62 PPM al 97% supera la media de 40; 60 o más señalan nivel profesional y 80 o más nivel élite. Ventanas de 60 segundos equilibran resistencia.",
    },
    {
      question: "¿Mis pulsaciones se suben a algún servidor?",
      answer:
        "No. Cronometraje de 60 segundos, cálculo de PPM e historial quedan en tu pestaña sin salir de ahí. Logra 62 PPM al 97% tras la primera carga sin cuentas. Todo se borra al reiniciar mientras el resumen sigue visible hoy.",
    },
    {
      question: "¿Qué marcas definen cada nivel?",
      answer:
        "La media ronda 40 PPM al 95%; 60 o más indican nivel profesional y 80 o más fluidez especializada. Ejemplo: 62 PPM al 97% supera oficinas típicas. Sostén la precisión antes de correr tras la velocidad bruta.",
    },
    {
      question: "¿Cuándo conviene cambiar de texto?",
      answer:
        "Rota los textos cuando memorizar la secuencia infle la nota sin medir destreza real. Ejemplo: repetir el mismo fragmento de 60 segundos sube 62 PPM a 70 por familiaridad. Introduce vocabulario y puntuación nuevos para medir habilidad transferible de verdad.",
    },
    {
      question: "¿Por qué la precisión pesa más que la velocidad?",
      answer:
        "Ráfagas con errores exigen correcciones que anulan el ahorro y dañan la lectura. Ejemplo: 80 PPM al 85% rinde menos que 62 PPM al 97% en salida útil. Prioriza digitación precisa y luego sube el ritmo poco a poco.",
    },
  ],
  howTo: [
    {
      name: "Pulsa Empezar",
      text: "Lanza el pasaje de 60 segundos con texto visible y cronómetro para iniciar el intento.",
    },
    {
      name: "Escribe la muestra",
      text: "Reproduce el texto viendo PPM y precisión en vivo con cada pulsación.",
    },
    {
      name: "Vigila errores",
      text: "Fíjate en el rojo sobre tokens errados que pide corregir con retroceso al momento.",
    },
    {
      name: "Mira el resumen",
      text: "Revisa el 62 PPM al 97%, luego reinicia buscando mejoras graduales.",
    },
  ],
  guide: [
    {
      heading: "Qué mide el test de 60 segundos",
      body: "Evalúa velocidad y precisión con pasajes de 60 segundos, PPM en vivo, porcentaje y tintes de error para estudiantes, opositores y equipos. Pulsa Empezar y alcanza 62 PPM al 97%. Tabla: 40 PPM 95% = media | 62 PPM 97% = profesional sólido | 80 PPM 96% = élite | bajo 90% = prioriza control | 60 segundos = estándar de resistencia. Ejemplo: un estudiante sube de 48 PPM 94% a 62 PPM 97% en quince días. Ignora espacios extra al final de línea y normaliza comillas. Ver /terms.",
    },
    {
      heading: "Cómo se calculan PPM y precisión",
      body: "PPM divide caracteres entre cinco y entre minutos; precisión divide aciertos entre intentos por 100. 62 PPM al 97% bate la media de 40; 60 o más es profesional, 80 o más élite. Muestras de 60 segundos equilibran fondo y pico; sprints cortos inflan. Ejemplo: un perfil de 70 PPM al 89% baja a 62 PPM al 97% y rinde más neto. Cuidado: mantener retroceso cuenta como intento y pegar texto invalida la ronda. Desactiva ayudas, cuida la postura y practica puntuación variada. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Lanza la ronda de 60 segundos, transcribe hasta 62 PPM 97%, inspecciona el mapa de errores y reinicia buscando 65 PPM sin perder precisión. Segundo caso: de 48 PPM 94% a 62 PPM 97% en quince días con rutina. Límite: práctica sin certificación oficial ni garantía laboral; tampoco corrige ergonomía. Para dictar por voz en Chrome o Edge usa /speech-to-text.",
    },
  ],
};

// Native ES keyword research (not translated): primary "detector de plagio" +
// 5-gramas/800-palabras intent. Density 1-1.8%, LSI (5-gramas, originalidad,
// unicidad 96%, ventana deslizante), long-tail ES PAA ("¿800 palabras al 96% es original?",
// "¿cómo parafrasear duplicados?").
export const plagiarismCheckerEs: Tool = {
  slug: "plagiarism-checker",
  title: "Detector de Plagio",
  short: "800 palabras 96% único gratis",
  description:
    "Detector de plagio gratis: puntúa 800 palabras al 96% único con escaneo de 5-gramas. 100% local, offline, sin registro.",
  icon: "FindReplace",
  keywords: [
    "detector de plagio",
    "verificador originalidad",
    "detector plagio online",
    "revisar plagio texto",
    "¿800 palabras al 96 por ciento es original?",
    "detector plagio gratis",
    "ventana 5 gramas coincidencia",
    "95 contra 70 reescribir",
    "verificador unicidad",
  ],
  category: "text-documents",
  faq: [
    {
      question: "¿Consulta índices externos de búsqueda?",
      answer:
        "No. Evalúa repetición interna más referencia pegada opcional sin rastrear la web. Ejemplo: textos de 800 palabras al 96% único muestran cero solapes de 5 palabras. La yuxtaposición con la fuente resalta ventanas coincidentes para revisar.",
    },
    {
      question: "¿Mi texto se sube al usar este detector?",
      answer:
        "No. El análisis deslizante de 5-gramas corre dentro de tu pestaña sin salir de ahí. Evalúa textos de 800 palabras al 96% tras la primera carga sin cuentas. El manuscrito se borra al cerrar mientras el resaltado sigue visible hoy.",
    },
    {
      question: "¿Qué cuenta como frase duplicada?",
      answer:
        "Secuencias idénticas de cinco palabras bajan el porcentaje en proporción en el escaneo deslizante. Ejemplo: 95% o más sin ventanas resaltadas sugiere originalidad mientras 85-94% pide revisión; el texto boilerplate infla coincidencias. Contrasta con tus fuentes para ver qué parafrasear antes de entregar tus 800 palabras.",
    },
    {
      question: "¿Cuándo conviene añadir comparación con fuente?",
      answer:
        "Incluye pasajes de referencia al verificar citas, auditar trabajos o revisar autoplagio entre publicaciones. Ejemplo: pega tu artículo previo junto al borrador y revela introducciones recicladas. Resuelve solapes con cita o reescritura.",
    },
    {
      question: "¿Por qué los textos cortos puntúan optimistas?",
      answer:
        "Pocas ventanas reducen la probabilidad de choque e inflan la unicidad de forma artificial. Ejemplo: resúmenes de 100 palabras suelen dar 100% pese a clichés. Exige 300 o más palabras para una medida creíble e interpreta salidas breves con cautela.",
    },
  ],
  howTo: [
    {
      name: "Pega el texto principal",
      text: "Inserta tu texto de 800 palabras que exige 96% de unicidad para publicar.",
    },
    {
      name: "Añade fuente opcional",
      text: "Aporta el pasaje de referencia para comparar solapes directos de 5-gramas si lo tienes.",
    },
    {
      name: "Ejecuta el análisis",
      text: "Ejecuta el escaneo revisando el 96% más las coincidencias de cinco palabras resaltadas.",
    },
    {
      name: "Reescribe duplicados",
      text: "Parafrasea las ventanas marcadas y re-escanea confirmando mejor porcentaje de originalidad.",
    },
  ],
  guide: [
    {
      heading: "Qué muestra el porcentaje de unicidad",
      body: "Mide originalidad con ventanas deslizantes de 5-gramas que detectan ecos internos más solapes con referencias opcionales para estudiantes, blogs y equipos. Envía textos de 800 palabras y observa 96% único con repeticiones de cinco palabras resaltadas. Tabla: 95-100% = original pulido | 85-94% = revisa ventanas | 70-84% = reescritura a fondo | bajo 70% = riesgo de duplicación | bajo 100 palabras = no fiable. Ejemplo: un capítulo de tesis con 800 palabras al 96% pasa; el boilerplate metodológico se marca. Ignora citas señaladas y minúsculas. Ver /terms.",
    },
    {
      heading: "Cómo marcan los 5-gramas",
      body: "Ventanas contiguas de cinco tokens se deslizan sobre el texto normalizado, comparan dentro y con fuentes pegadas, y restan por colisión. 95% o más sin resaltados indica frescura, mientras eslóganes repetidos hunden la nota. Ejemplo: una landing de 800 palabras al 78% por eslóganes reciclados sube a 94% parafraseando. Cuidado: modismos como con el fin de siempre coinciden, el material citado exige exclusión y las tablas inflan solapes. Compara tus fuentes directamente, aparta bloques citados y exige 300 o más palabras. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Carga tu borrador de 800 palabras más fuente opcional, anota el 96%, reformula las ventanas de cinco palabras resaltadas y re-escanea confirmando subida. Alcance local: excluye índices de internet y bases académicas; la verificación completa exige servicios externos. Los pasajes citados también coinciden: márcalos como cita. Para contar palabras y tiempo de lectura usa /word-counter.",
    },
  ],
};

// ES blog pilots (subdirectory, English pillar/slug kept:
// /es/blog/<pillar>/<slug>). Only listed clusters are translated —
// qr-code-size-print-guide is GSC's top informational opportunity
// (215 imp, 0 clicks EN). Pillar pages stay EN-only in V1; cluster crumbs
// and sibling links fall back to EN URLs (exist) instead of 404s.
export const ES_BLOG_PILOTS = new Set<string>(["qr-code-generator-guide/qr-code-size-print-guide"]);

export function isEsBlogPilot(pillar: string, slug: string): boolean {
  return ES_BLOG_PILOTS.has(`${pillar}/${slug}`);
}

export function esBlogUrlFor(pillar: string, slug: string): string {
  return `/es/blog/${pillar}/${slug}`;
}

const qrSizePrintEsHtml = `
<p>La pegatina de la puerta de cristal que cuenta la guía pilar falló por tres motivos a la vez: tamaño de 2 cm, amarillo sobre blanco y cristal curvo. Cada uno quizá se habría salvado; juntos eran imposibles. <strong>El tamaño de impresión del QR</strong> es pura física — distancia, densidad y resolución — y esta guía te da los números exactos para tarjetas, carpas de mesa, flyers, carteles y vallas, probados con móviles reales en septiembre de 2026.</p>
<p>Parte de la <a href="/blog/qr-code-generator-guide">guía gratis de códigos QR</a>. Genera ambos tamaños en el <a href="/es/qr-code-generator">generador gratis de QR</a> (512px + 2048px). Lo básico en <a href="/blog/qr-code-generator-guide/how-to-create-qr-code">cómo crear un QR</a>.</p>

<h2 id="two-rules">Las dos únicas reglas</h2>
<h3>Regla 1 — tamaño ≈ distancia ÷ 10</h3>
<p>Un código leído a 30 cm (carpa de mesa) debe medir al menos 3 cm. A 1 metro (señal de pared): 10 cm. A 2 metros (cartel): 20 cm. A 10 metros (valla): 1 metro. Lo verifico caminando la distancia real con un Android medio — si lee en 2 segundos ahí, sirve para clientes.</p>
<h3>Regla 2 — mínimo 2 cm, y lo denso pide más</h3>
<p><strong>2 cm × 2 cm</strong> es el suelo para códigos de URL corta a distancia de brazo. Pero la densidad sube el mínimo: contenidos de 150 o más caracteres piden 3–4 cm a igual distancia. Texto más largo = cuadrícula más densa = impresión mayor. Acorta URLs antes de generar — es la mejora de tamaño más barata que existe.</p>

<h2 id="size-table">Tabla de tamaños: cada ubicación</h2>
<table>
<thead><tr><th>Ubicación</th><th>Distancia de lectura</th><th>Tamaño mínimo</th><th>Exportar</th></tr></thead>
<tbody>
<tr><td><strong>Tarjeta / vCard</strong></td><td>20–30 cm</td><td>2 cm</td><td>512px</td></tr>
<tr><td><strong>Carpeta de cuenta / ticket</strong></td><td>30 cm</td><td>2–3 cm</td><td>512px</td></tr>
<tr><td><strong>Carpa de mesa / mostrador</strong></td><td>30–60 cm</td><td>3–5 cm</td><td>512px</td></tr>
<tr><td><strong>Flyer A5</strong></td><td>30–50 cm</td><td>3–4 cm</td><td>512px</td></tr>
<tr><td><strong>Marco de recepción (A4)</strong></td><td>0,5–1 m</td><td>8–10 cm</td><td>2048px</td></tr>
<tr><td><strong>Cartel (A3/A2)</strong></td><td>1–2 m</td><td>10–20 cm</td><td>2048px</td></tr>
<tr><td><strong>Escaparate / ventana</strong></td><td>1–3 m</td><td>15–30 cm</td><td>2048px</td></tr>
<tr><td><strong>Valla publicitaria</strong></td><td>10 m+</td><td>1 m+</td><td>2048px, prueba in situ</td></tr>
</tbody>
</table>
<ul>
<li><strong>Las vCard son densas:</strong> llevan nombre + teléfonos + email, así usa mínimo 2,5 cm en tarjetas. Detalles en la <a href="/blog/qr-code-generator-guide/vcard-contact-qr-code">guía vCard</a>.</li>
<li><strong>Nunca reescalen:</strong> un 512px estirado a cartel emborrona los módulos. Regenera a 2048px — 30 segundos, gratis.</li>
<li><strong>Zona de silencio siempre:</strong> margen blanco de ~4 módulos por cada lado. Bordes o texto pegados al patrón son el fallo nº 1 en flyers que veo.</li>
</ul>

<h2 id="density-exceptions">Excepciones de densidad: WiFi, vCard y URLs largas</h2>
<p>La tabla supone URLs cortas. Tres tipos comunes rompen el supuesto — planifícalos más grandes desde el inicio. Los <strong>WiFi</strong> llevan SSID + clave + seguridad (suelen ser 60–100 caracteres): imprime señales de cafetería a 8–10 cm, no a 5. Las <strong>vCard</strong> llevan 5–6 campos (~150 caracteres): mínimo 2,5 cm en tarjetas. Las <strong>URLs largas</strong> (150+ caracteres): suma 1–2 cm sobre la tabla o, mejor, acorta el enlace primero según <a href="/blog/qr-code-generator-guide/how-to-create-qr-code">higiene de URLs</a>.</p>
<ul>
<li><strong>Prueba rápida de densidad:</strong> compara tu vista previa con un código de URL simple de 20 caracteres. ¿Se ve claramente más denso? Sube una talla.</li>
<li><strong>Margen para móviles viejos:</strong> si tu público usa gama baja (clínicas rurales, personas mayores), suma 50% a cada valor. Sus cámaras de foco fijo no perdonan nada.</li>
<li><strong>Honestidad en vallas:</strong> URLs largas en vallas casi no funcionan — conductores con 2 segundos a 10 m+. Dominio corto + código de 1 m mínimo, o imprime la URL en grande sin código.</li>
</ul>

<h2 id="resolution-paper">Resolución, papel y acabado</h2>
<ul>
<li><strong>PNG 512px:</strong> nítido hasta ~5 cm. Webs, chat, tarjetas, carpetas, carpas, flyers.</li>
<li><strong>PNG 2048px:</strong> nítido hasta A3 y más. Carteles, ventanas, pancartas, vallas.</li>
<li><strong>Mate antes que brillo:</strong> el brillo del laminado mata la lectura al sol. Papel mate, laminado mate o marcos sin laminar.</li>
<li><strong>Superficies planas:</strong> las curvas (vasos, botellas, pilares) deforman la cuadrícula. Paredes, carpas y tarjetas leen; el merchandising curvo casi solo decora.</li>
<li><strong>Guarda el PNG maestro:</strong> cada re-guardado JPG (y cada reenvío por WhatsApp) ablanda bordes. Archiva el PNG; reenvía copias libremente.</li>
</ul>
<h3>Ritual pre-impresión (30 € salvan 2.500 €)</h3>
<p>Imprime una copia al 100%. Escanea desde la distancia real, con luz de día y de interior, con dos móviles. Revisa que el margen de silencio sobrevivió al escalado de la impresora (desactiva “ajustar a página” — encoge todo 5%). Solo entonces pide la tirada. Re-escanea cualquier código misterioso con el <a href="/qr-scanner">lector QR</a> para confirmar el contenido antes de una tirada grande.</p>
<h2 id="test-protocol">El protocolo de 5 móviles (cópialo)</h2>
<p>Un escaneo con un gama alta no prueba nada. Mi ritual pre-tirada, en orden: (1) iPhone gama alta a distancia de brazo, luz de oficina — base; (2) Android barato de menos de 150 €, misma distancia — el suelo, porque las cámaras fijas baratas fallan primero; (3) sol de mediodía — prueba de brillo; (4) luz tenue de restaurante — prueba nocturna; (5) distancia real máxima, caminando atrás hasta que falle, más 20% de margen. Anota resultados por tirada (fecha, tamaño, pasa/falla por móvil) — cuando una reimpresión falle en la calle, el registro dice si cambió el archivo, el escalado (“ajustar a página” encoge ~5%) o la ubicación. Coste total: 10 minutos y una prueba. Ya cazó dos fallos de escalado y un desastre de laminado brillante — cada uno habría costado 50 veces la prueba.</p>
<div class="cta-box"><strong>Mide bien ahora:</strong> genera ambos tamaños en el <a href="/es/qr-code-generator">generador gratis de QR</a> y camina tu distancia de prueba. Resumen: <a href="/blog/qr-code-generator-guide">guía pilar</a> · Fallos: <a href="/blog/qr-code-generator-guide/qr-code-not-scanning-fix">guía no-escanea</a>.</div>
`;

// Native ES keyword research (not translated): primary "tamaño qr impresión" +
// distancia/10 + 512-vs-2048 intent. Density 1-1.8%, LSI (cm, zona de silencio,
// módulos, mate/brillo, 2048px), long-tail ES PAA ("¿qué tamaño imprimir qr?",
// "¿512 o 2048 png?").
export const qrSizePrintEs: BlogPost = {
  pillar: "qr-code-generator-guide",
  slug: "qr-code-size-print-guide",
  kind: "cluster",
  title: "QR para Imprimir: Tamaños en cm y Píxeles (2026)",
  description:
    "Tabla de tamaños QR: 2 cm tarjetas, 3-5 cm carpas, 10-20 cm carteles. Regla distancia÷10, 512 vs 2048px, papel mate — probado 2026.",
  keywords: [
    "tamaño qr impresion",
    "medida minima qr",
    "qr tamaño cm imprimir",
    "qué tamaño debe tener un qr",
    "resolucion qr cartel",
    "512 o 2048 png?",
  ],
  toolSlugs: ["qr-code-generator", "qr-scanner", "wifi-qr-generator"],
  relatedSlugs: ["how-to-create-qr-code", "qr-code-not-scanning-fix", "vcard-contact-qr-code"],
  published: "2026-09-22",
  updated: "2026-09-22",
  readingMinutes: readingMinutesFor(qrSizePrintEsHtml),
  toc: [
    { id: "two-rules", text: "Las dos únicas reglas", level: 2 },
    { id: "size-table", text: "Tabla de tamaños", level: 2 },
    { id: "density-exceptions", text: "Excepciones de densidad", level: 2 },
    { id: "resolution-paper", text: "Resolución, papel y acabado", level: 2 },
    { id: "test-protocol", text: "Protocolo de 5 móviles", level: 2 },
  ],
  html: qrSizePrintEsHtml,
  faqs: [
    { question: "¿Cuál es el tamaño mínimo de un QR impreso?", answer: "Usa 2 por 2 cm como suelo para códigos de URL corta leídos a distancia de brazo (~30 cm). Los códigos densos de 150 o más caracteres piden 3–4 cm a igual distancia porque el texto largo crea cuadrículas densas. Para más distancia aplica tamaño ≈ distancia entre 10, y acorta URLs ya que lo corto escanea más pequeño." },
    { question: "¿Qué tamaño debe tener un QR para un cartel?", answer: "Aplica tamaño ≈ distancia entre 10: 10 cm para 1 metro y 20 cm para 2 metros, como carteles A3 o A2 de 10–20 cm. Exporta PNG 2048px en vez de reescalar 512px, que emborrona los módulos. Camina la distancia real con un Android medio y confirma lectura en dos segundos para clientes." },
    { question: "¿PNG de 512 o 2048?", answer: "Elige 512px para pantallas, webs, chat, tarjetas, carpetas, carpas y flyers hasta ~5 cm, donde sigue nítido. Elige 2048px para carteles, ventanas, pancartas y todo lo leído más allá de un metro, nítido hasta A3 y más. Nunca reescalen un archivo pequeño — regenera al tamaño mayor en 30 segundos gratis." },
    { question: "¿Importa el acabado del papel?", answer: "Sí, el acabado decide el éxito en exterior. El laminado brillante deslumbra al sol y mata lecturas, mientras papel mate, laminado mate o marcos sin laminar sirven en todas partes. Paredes, carpas y tarjetas planas leen fiable, pero vasos, botellas y pilares curvos deforman la cuadrícula. La pegatina de la puerta de cristal falló en parte por cristal curvo brillante." },
    { question: "¿Por qué dejar blanco alrededor del código?", answer: "Los lectores necesitan zona de silencio de ~4 módulos con margen blanco por cada lado para hallar bordes del patrón con fiabilidad. Texto o bordes pegados al código paran la detección y causan el fallo más común en flyers. Conserva el margen tras imprimir y desactiva ajustar a página, que encoge todo ~5%." },
  ],
};

// Native FR keyword research (not translated): primary "générateur de factures
// gratuit" + auto-entrepreneur/TVA-20% intent + devis-vs-facture + modèle.
// Density target 1-1.8% exact, LSI (TVA, SIRET, auto-entrepreneur, devis),
// long-tail rebuilt from FR SERP/PAA ("comment faire une facture auto-entrepreneur ?",
// "facture avec TVA 20 %").
export const invoiceGeneratorFr: Tool = {
  slug: "invoice-generator",
  title: "Générateur de Factures",
  short: "PDF gratuit TVA + logo",
  description:
    "Générateur de factures gratuit : créez des PDF avec logo, TVA et totaux. Fonctionne hors ligne dans votre navigateur, sans inscription.",
  icon: "ReceiptLong",
  keywords: [
    "générateur de factures",
    "faire une facture en ligne",
    "facture pdf avec logo",
    "facture avec tva 20",
    "comment faire une facture auto-entrepreneur ?",
    "générateur facture gratuit",
    "modèle facture word excel",
    "facture proforma vs ordinaire",
    "facture électronique gratuite",
  ],
  category: "business",
  faq: [
    {
      question: "Le générateur de factures est-il gratuit ?",
      answer:
        "Oui, totalement gratuit et sans inscription. Tout fonctionne dans votre navigateur ; par exemple, une facture de 10 lignes à 600 € avec logo reste sur votre appareil, fonctionne hors ligne et s'imprime en PDF sans limite. Sans compte, filigrane ni envoi.",
    },
    {
      question: "Puis-je télécharger ou imprimer la facture en PDF ?",
      answer:
        "Oui. Utilisez Imprimer avec Ctrl ou Cmd+P et choisissez Enregistrer en PDF ; la mise en page est prête pour A4. Exemple : INV-2026-001 du 14 septembre 2026 s'enregistre en facture-acme-001.pdf avec logo, 500 € HT, 100 € de TVA et 600 € TTC.",
    },
    {
      question: "Combien de lignes une facture accepte-t-elle ?",
      answer:
        "Jusqu'à 50 lignes avec quantité, prix et TVA, par exemple 3 designs à 250 € chacun avec sous-total, TVA et total automatiques. Ce trio totalise 750 € HT plus 20 % de TVA (150 €) soit 900 € TTC, recalculé en direct. Logo et numérotation restent hors ligne. Voir /terms.",
    },
    {
      question: "Quelle TVA appliquer à ma facture ?",
      answer:
        "Appliquez 20 % normal, 10 % intermédiaire ou 5,5 % réduit selon le produit. Par exemple, 500 € de services à 20 % ajoutent 100 € pour 600 € TTC. Indiquez SIRET, numérotation continue et base HT, puis confirmez les taux avec votre expert-comptable. Voir /terms.",
    },
    {
      question: "Quand utiliser Net15 plutôt que Net30 ?",
      answer:
        "Choisissez Net15 pour les indépendants pressés par la trésorerie et Net30 pour les entreprises avec circuit d'achat. Par exemple, une facture du 14 septembre en Net15 échoit le 29 avec 1,5 % de pénalité, tandis que Net30 atteint le 14 octobre. Ajoutez un escompte 2/10 et des pénalités claires. Voir /terms.",
    },
  ],
  howTo: [
    {
      name: "Données de l'émetteur",
      text: "Ajoutez nom, logo, adresse, numéro INV-2026-001, date du 14 septembre 2026, échéance, email client et devise avant les lignes.",
    },
    {
      name: "Ajoutez les lignes",
      text: "Ajoutez des lignes comme design logo 2 unités à 250 €, conseil 6 heures à 120 €, avec TVA 20 %, remise et notes par ligne.",
    },
    {
      name: "Vérifiez les totaux",
      text: "Vérifiez base 500 €, TVA 100 €, total 600 €, solde, conditions Net15, clause de retard et arrondis dans l'aperçu en direct.",
    },
    {
      name: "Téléchargez ou imprimez",
      text: "Choisissez Imprimer, Enregistrer en PDF, nommez facture-acme-001.pdf, utilisez A4 avec fonds, envoyez au client et archivez hors ligne.",
    },
  ],
  guide: [
    {
      heading: "Ce qu'est une facture professionnelle",
      body: "Une facture professionnelle identifie vendeur et acheteur, numéro continu, date, lignes, TVA et total avec échéance. Un indépendant avec 3 designs à 250 € montre 750 € HT plus 20 % (150 €) soit 900 € TTC, tandis qu'un atelier avec 20 mugs à 40 € montre 800 € avant taxes. Notre générateur monte cette mise en page en local avec votre logo, 50 lignes et un PDF A4 net. Ajoutez SIRET et numérotation INV-2026-001 pour éviter les doublons. Limite : mise en forme, ni comptabilité ni conseil juridique. Préparez des devis avec /quotation-generator. Voir /terms.",
    },
    {
      heading: "Comment les totaux sont calculés",
      body: "Sous-total = quantité fois prix par ligne ; TVA = base fois taux ; total = base plus TVA moins remise. Exemple : 2 logos à 250 € donnent 500 € HT ; 20 % ajoutent 100 € pour 600 € TTC sur INV-2026-001. Les délais changent la trésorerie : Net15 échoit le 29 septembre avec 1,5 % mensuel ; Net30 atteint le 14 octobre avec 2 %. Offrez un escompte 2/10 net 30 pour encaisser vite par virement ou carte. Cas limite : l'arrondi par ligne peut varier de centimes. Voir /terms.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Créez INV-2026-001 avec base 500 €, TVA 20 % (100 €) et total 600 €, imprimez en facture-acme-001.pdf et envoyez-la. Second cas : 750 € HT à 20 % = 900 € TTC. Gardez une copie signée et suivez les échéances. Ne valide ni les mentions légales ni votre expert-comptable ; vérifiez taux réduit (10 %) et super-réduit (5,5 %) selon produit. Pour des devis préalables utilisez /quotation-generator.",
    },
  ],
};

// Native ES keyword research (not translated): primary "contador de palabras" +
// hero intent (top HERO_SLUGS priority). Density 1-1.8%, LSI (PPM, Flesch,
// caracteres, frases), long-tail ES PAA ("¿cuántas palabras tiene un ensayo?",
// "¿800 palabras cuántos minutos son?").
export const wordCounterEs: Tool = {
  slug: "word-counter",
  title: "Contador de Palabras",
  short: "Gratis: palabras y tiempo",
  description:
    "Contador de palabras gratis: cuenta palabras, caracteres y frases. Revisa 800 palabras a 200 PPM en 4,0 min, privado offline, sin registro.",
  icon: "TextSnippet",
  keywords: [
    "contador de palabras",
    "contar palabras online",
    "contador de caracteres",
    "tiempo de lectura",
    "¿cuántas palabras tiene un ensayo?",
    "contador palabras gratis",
    "flesch facilidad lectura",
    "200 ppm lectura vs 130 habla",
    "analizador de texto",
  ],
  category: "text-documents",
  faq: [
    {
      question: "¿Mi texto se guarda en algún servidor?",
      answer:
        "No. El conteo de palabras, caracteres y frases corre entero en tu dispositivo sin subidas; por ejemplo, un borrador de 800 palabras o 5.000 caracteres queda en tu dispositivo, funciona offline gratis y cerrar la pestaña borra el texto. Nada se envía a ningún servidor.",
    },
    {
      question: "¿Cómo se calcula el tiempo de lectura?",
      answer:
        "Divide palabras entre velocidad media de 200 a 238 palabras por minuto. Ejemplo: 800 palabras a 200 PPM son 4,0 minutos y a 238 PPM son 3,4 minutos; 1.500 palabras son 6,3-7,5 minutos. Quien hojea termina antes, quien estudia tarda más.",
    },
    {
      question: "¿Qué tamaño de texto admite?",
      answer:
        "Pegados de hasta 500KB o unas 100.000 palabras cuentan al instante en local con totales en vivo. Ejemplo: un borrador de 800 palabras más 5.000 caracteres procesa en milisegundos, mientras novelas de 100.000 palabras pueden atascar móviles viejos. Divide capítulos si escribir se vuelve lento; todo queda offline sin subidas y se borra al cerrar.",
    },
    {
      question: "¿Qué longitud pide cada tipo de contenido?",
      answer:
        "Apunta hilos cerca de 280 caracteres, meta descripciones cerca de 155 caracteres, currículums cerca de 500 palabras, posts cerca de 1.500 palabras y tesis más de 10.000 palabras. La intención manda: guías informativas rinden largas, fichas de producto convierten cortas. Compara tu borrador con la tabla de longitud por intención y recorta anécdotas o amplía pruebas según toque.",
    },
    {
      question: "¿Por qué Word y Docs cuentan distinto?",
      answer:
        "Microsoft Word trata compuestos con guion, rayas, cuadros de texto, notas y cambios de forma distinta que los contadores web. Google Docs suma encabezados y comentarios opcionalmente, mientras esta herramienta corta por espacios y puntuación. Caracteres chinos, japoneses y coreanos sin espacios agrandan diferencias. Espera uno a tres por ciento de variación y entrega siempre con el contador de tu institución.",
    },
  ],
  howTo: [
    {
      name: "Pega tu borrador",
      text: "Pega un ensayo de 1.500 palabras o un post de 800 palabras en la caja grande para contar al instante.",
    },
    {
      name: "Mira los totales en vivo",
      text: "Mira totales en vivo de palabras, caracteres con espacios, frases, párrafos y minutos estimados.",
    },
    {
      name: "Revisa tiempo y densidad",
      text: "Revisa 800 palabras a 200 PPM igual a 4,0 minutos, Flesch cerca de 65 y densidad de 1,2 por ciento.",
    },
    {
      name: "Ajusta y copia",
      text: "Recorta introducciones infladas según la intención de búsqueda, luego copia conteos o resume para tu encargo.",
    },
  ],
  guide: [
    {
      heading: "Qué hace el contador de palabras",
      body: "Instrumento gratis para novelistas, académicos, periodistas y marketing que deben cumplir techos estrictos sin instalar nada. Cuenta palabras, caracteres con y sin espacios, frases, párrafos, minutos de lectura y repetición de claves a la vez. Un ensayo de 1.500 palabras, una columna de 800 o una ficha de 2.000 caracteres refrescan en vivo al escribir. Tabla: titular 6-12 palabras | resumen 150-250 | currículum 400-600 | blog 1.200-1.800 | tesis 10.000+. Proyección a 200 PPM estudio y 238 PPM hojeo, así 1.500 palabras son 6,3-7,5 minutos. Borradores solo en memoria del navegador, sin red tras la carga y se borran al cerrar.",
    },
    {
      heading: "Cómo cuentan y miden el tiempo",
      body: "Tokenización clara: el espacio delimita palabras, doble conteo con y sin huecos, punto (. ? !) delimita frases y líneas en blanco delimitan párrafos. Duración igual a palabras entre velocidad: 800 palabras a 200 PPM dan 4,0 minutos, a 238 PPM dan 3,4; manuscrito de 1.500 da 7,5 estudio contra 6,3 hojeo. Densidad igual a repeticiones entre tokens: 12 en 1.000 palabras igual a 1,2%, mientras 25 igual a 2,5% con riesgo de relleno. Flesch sobre 60 más nivel bajo 8 señalan prosa accesible; frases de 28 palabras hunden la nota. Guiones, 3,14, contracciones y CJK desafían divisores simples con dos por ciento de desvío. Pegados de 500KB o 100.000 palabras van fluidos en portátil y pueden trabarse en móviles viejos. Audita frases con /keyword-density. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Pega 800 palabras, confirma 4,0 minutos a 200 PPM y Flesch cerca de 65, ajusta a 1.500 si la intención pide guía larga y copia el resumen. Segundo caso: hilos de 280 caracteres y metas de 155 antes de publicar. Límite: conteo heurístico con dos por ciento de variación frente a suites de escritorio; no sustituye el contador oficial de convocatorias. Para legibilidad usa /readability-checker y para densidad /keyword-density.",
    },
  ],
};

// Native ES keyword research (not translated): primary "calculadora hipotecaria" +
// TIN/TAE/Euríbor intent. Density 1-1.8%, LSI (TIN, TAE, Euríbor, amortización,
// 80 % LTV), long-tail ES PAA ("¿cuánto pago por 240.000 euros a 30 años?",
// "¿tipo fijo o variable?"). YMYL: planning-only banner via localized
// YMYLDisclaimer + /terms closers (matches EN guard).
export const mortgageCalculatorEs: Tool = {
  slug: "mortgage-calculator",
  title: "Calculadora Hipotecaria",
  short: "Cuota TIN/TAE y amortización",
  description:
    "Calcula la cuota hipotecaria e intereses. Revisa 240.000 € al 3 % a 30 años: 1.012 € al mes, privado offline, sin registro.",
  icon: "AccountBalance",
  keywords: [
    "calculadora hipotecaria",
    "calcular cuota hipoteca",
    "simulador hipoteca tin tae",
    "tabla amortizacion hipoteca",
    "¿cuánto pago por 240.000 euros a 30 años?",
    "calculadora hipoteca gratis",
    "capital vs intereses amortización",
    "15 vs 30 años hipoteca 2026",
    "tipo fijo vs variable euribor",
  ],
  category: "finance",
  faq: [
    {
      question: "¿Cómo se calcula mi cuota mensual?",
      answer:
        "Sale de Cuota = C×i×(1+i)^n÷((1+i)^n−1), donde C es el capital, i el tipo mensual (anual÷12÷100) y n los meses. Ejemplo: 240.000 € al 3 % a 30 años dan i=0,0025 y n=360, así la cuota queda cerca de 1.012 € con intereses de por vida cerca de 124.000 €. Amortizar acorta el plazo. Ver /terms.",
    },
    {
      question: "¿Esta calculadora es asesoramiento financiero?",
      answer:
        "No. Es solo una herramienta informativa de planificación, no asesoramiento financiero. Impuestos, seguros, gastos de formalización y revisiones del variable quedan fuera de cada cifra. Ejemplo: un seguro de 200 € mensuales suma 2.400 € al año encima. Consulta a tu banco las cifras exactas y ver /terms antes de firmar.",
    },
    {
      question: "¿Mis datos hipotecarios quedan privados?",
      answer:
        "Sí. El cálculo nunca sale de este móvil. Las sumas corren aquí sin envíos ni registro. Ejemplo: una prueba de 300.000 € queda privada, no pide red y se borra al cerrar la pestaña. Solo orienta la planificación, no aconseja. Ver /terms.",
    },
    {
      question: "¿Cómo de exacta es la tabla de amortización?",
      answer:
        "Es exacta para capital e intereses a tipo fijo, normalmente a céntimos de las tablas bancarias. Comisiones, provisiones, penalizaciones y cambios de tipo quedan fuera. Ejemplo: 2 % contra 3 % sobre 240.000 € difieren unos 125 € al mes. Confirma cifras exactas con tu oferta vinculante y ver /terms.",
    },
    {
      question: "¿Elijo hipoteca a 15 o a 30 años?",
      answer:
        "Elige 30 años por flexibilidad (1.012 € sobre 240.000 € al 3 %) o 15 por ahorro (unos 1.650 € al mes pero ~57.000 € menos intereses de por vida). Ejemplo: quien busca flujo prefiere 30 años, quien se acerca a la jubilación prefiere 15. Pesa estabilidad laboral, colchón y deducciones primero. Ver /terms.",
    },
    {
      question: "¿Tipo fijo o variable con Euríbor?",
      answer:
        "El fijo blinda la cuota (3 % siempre 1.012 €) y el variable ata al Euríbor más diferencial, hoy barato y mañana incierto. Ejemplo: Euríbor al 3 % más 1 % iguala al fijo, pero cada revisión semestral puede subir la cuota cientos de euros. Compara TAE, no solo TIN, y fija un tope que tu nómina aguante. Ver /terms.",
    },
  ],
  howTo: [
    {
      name: "Pon el préstamo",
      text: "Pon precio 300.000 €, tipo 3 % fijo anual, plazo 30 años con 360 meses, y confirma moneda y primera cuota.",
    },
    {
      name: "Suma la entrada",
      text: "Suma entrada 60.000 € (20 %), verifica capital 240.000 €, LTV 80 % y umbral de seguro antes de ver resultados.",
    },
    {
      name: "Mira la cuota",
      text: "Revisa cuota cerca de 1.012 €, intereses de por vida cerca de 124.000 €, coste total 364.000 € y tabla anual con calma.",
    },
    {
      name: "Exporta y compara",
      text: "Exporta el resumen CSV, luego compara 15 contra 30 años y 2 % contra 3 % para cuantificar la brecha de intereses.",
    },
  ],
  guide: [
    {
      heading: "Qué es la cuota hipotecaria",
      body: "Cuota fija mensual que devuelve capital más intereses durante 15 a 30 años, con primeros años casi todo intereses y luego más capital. Ejemplo: 240.000 € al 3 % a 30 años (i=0,0025, n=360) dan cuota cerca de 1.012 €, total cerca de 364.000 € e intereses cerca de 124.000 €. El coste real suma capas: | Componente | Mensual | Anual | Capital + intereses | 1.012 € | 12.144 € | Impuestos y tasas | 200 € | 2.400 € | Seguro hogar | 100 € | 1.200 € | Seguro préstamo bajo 20 % entrada | 120 € | 1.440 € | Comunidad | 75 € | 900 € |. Nuestra calculadora modela capital más intereses con tabla anual, para comparar entradas antes del banco. Caso borde: revisiones del variable pueden subir la cuota tras el tramo inicial. Límite: sin gastos de formalización ni deducciones. Previsualiza pagos extra con /mortgage-overpayment-calculator. Solo planifica, no aconseja. Ver /terms.",
    },
    {
      heading: "Cómo se calcula la cuota",
      body: "Fórmula Cuota = C×i×(1+i)^n/((1+i)^n−1), con C capital, i tipo mensual (anual÷12÷100) y n meses. Para 240.000 € al 3 % a 30 años, i=0,0025 y n=360, dan 1.012 €; 1.012×360 son 364.000 € totales, menos capital son 124.000 € intereses. A 15 años (n=180): la cuota sube a unos 1.650 €, el total cae a unos 297.000 € y los intereses a unos 57.000 €, brecha de ~67.000 € contra 30 años. Entradas bajo 20 % piden seguro cerca de 120 € mensuales hasta 80 % LTV, unos 1.440 € anuales encima. Caso borde: pagos quincenales crean una cuota extra anual y acortan plazo sin notarlo. Límite: capital-intereses a tipo fijo, sin provisiones. Calcula lo que puedes pagar en /home-affordability-calculator. Solo orienta, no es asesoramiento. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto: 240.000 € al 3 %",
      body: "Pon 240.000 € al 3 % a 30 años, confirma 1.012 € al mes, 124.000 € intereses y 364.000 € totales, exporta el CSV y compara con 15 años (1.650 €, 57.000 € intereses). Segundo caso: 2 % contra 3 % difieren unos 125 € mensuales sobre igual capital. Guarda la oferta vinculante, revisa TAE contra TIN y Euríbor más diferencial si es variable. No incluye seguros obligatorios ni impuestos locales; tu banco cierra cifras. Para arrancar antes usa /mortgage-overpayment-calculator.",
    },
  ],
};

// Native ES keyword research (not translated): primary "creador de curriculum" +
// ATS/1-página intent. Density 1-1.8%, LSI (ATS, una página, 400-600 palabras,
// 80 % cobertura), long-tail ES PAA ("¿cómo hacer un cv ats?",
// "¿una o dos páginas?").
export const resumeBuilderEs: Tool = {
  slug: "resume-builder",
  title: "Creador de Currículums",
  short: "CV limpio en PDF gratis",
  description:
    "Crea currículums ATS con experiencia, formación y habilidades. Vista previa y PDF offline gratis, sin subidas.",
  icon: "Description",
  keywords: [
    "creador de curriculum",
    "hacer curriculum vitae gratis",
    "curriculum pdf una pagina",
    "plantilla cv word gratis",
    "¿cómo hacer un cv ats?",
    "creador cv sin registro",
    "ats score palabras clave oferta",
    "una vs dos paginas cv",
    "modelo curriculum moderno",
  ],
  category: "business",
  faq: [
    {
      question: "¿Mi currículum se guarda en un servidor?",
      answer:
        "No. Tu currículum queda solo en tu pestaña y jamás se sube a ningún servidor. Ejemplo: un borrador de 1 página con 3 empleos y 8 habilidades se borra al cerrar la pestaña. Exportas con Imprimir a PDF local gratis offline. Sin cuenta ni copia en la nube.",
    },
    {
      question: "¿Pasará mi currículum los ATS?",
      answer:
        "Ayuda mucho pero ningún diseño puede prometer el pase. Encabezados estándar y texto plano leen bien en la mayoría de sistemas. Ejemplo: 8 a 10 habilidades más 3 empleos con fechas puntúan limpio, mientras imágenes y tablas en 2 páginas fallan. Usa fuentes simples y prueba con el verificador. Sin subidas.",
    },
    {
      question: "¿Qué secciones y formatos admite?",
      answer:
        "Tienes resumen, experiencia, formación y habilidades más vista previa instantánea. Ejemplo: añade 3 empleos con 3 viñetas cada uno, 1 título de 2021 y 8 habilidades, luego imprime a un PDF limpio de 1 página como lucia-cv.pdf. Todo se monta en tu navegador gratis offline. Sin registro ni subidas.",
    },
    {
      question: "¿Cómo mantengo una página entre 400 y 600 palabras?",
      answer:
        "Calcula unas 80 palabras para cabecera más resumen, 300 para viñetas de experiencia y 100 para formación más matriz de habilidades. Poda cursos viejos, adverbios de más y herramientas duplicadas tras cada pasada. Previsualiza la paginación a menudo, divide con guiones poco y conserva verbos de logro con cifras.",
    },
    {
      question: "¿Junior y senior estructuran distinto?",
      answer:
        "Los junior deben subir prácticas, proyectos fin de carrera, voluntariado y cursos sobre cronología escasa. Los senior al contrario destacan ascensos, ingresos influidos, equipos liderados y patentes. Ambos mantienen una columna, cronología, verbos cuantificados y espejo del léxico de la oferta.",
    },
  ],
  howTo: [
    {
      name: "Añade tu perfil",
      text: "Rellena nombre, titular y resumen de 3 líneas, p. ej. Lucía Gómez, Frontend Developer, 4 años React, busca roles de producto.",
    },
    {
      name: "Añade experiencia",
      text: "Añade dos o tres empleos con métricas, p. ej. UI Engineer en Zeta 2022-2025, 12 flujos lanzados, registro subido 30%.",
    },
    {
      name: "Añade formación y habilidades",
      text: "Suma formación más ocho o diez habilidades, p. ej. Grado 2021, TypeScript, Next.js, Figma, contra palabras de la oferta.",
    },
    {
      name: "Exporta a PDF",
      text: "Previsualiza diseño de una columna, recorta a 500 palabras en una página, luego imprime a PDF p. ej. lucia-cv.pdf offline.",
    },
  ],
  guide: [
    {
      heading: "Qué es un currículum limpio",
      body: "Resumen de una página con contacto, titular, experiencia cuantificada, estudios y ocho o diez habilidades afinadas a parsers ATS. Los técnicos dedican segundos a puestos, fechas, métricas y stack antes de filtrar. Ejemplo: la frontend Lucía Gómez muestra cuatro años React, tres empleos, Grado 2021, más TypeScript y Next.js, sobre 80% de cobertura contra ofertas que piden esas frases. Mantén 400 a 600 palabras para que una página respire sin apretar márgenes. Senior destacan ascensos y presupuestos, junior prácticas, proyectos, certificados y freelance con igual andamiaje. Caso borde: diseños gráficos con iconos y cajas confunden parsers pese a su atractivo. Límite: el diseño no inventa antigüedad ni garantiza entrevistas. Valida solape de claves antes en /ats-resume-checker.",
    },
    {
      heading: "Cómo estructurar una página",
      body: "Usa titular más resumen de tres frases, dos o tres empleos con tres viñetas cada uno, año de título y ocho o diez claves de la oferta espejadas tal cual. Ejemplo: Lucía lista UI Engineer en Zeta 2022 a 2025, doce flujos lanzados, registro subido 30%, Grado 2021, TypeScript y Next.js, en 500 palabras netas en un A4. Tabla — Diseño | Lectura parser | Guía: una columna con encabezados | 100% | recomendado; dos columnas con cajas | 40% | evitar; PDF imagen escaneada | 10% | jamás. Prefiere fuentes planas, alineación izquierda, fechas mes-año y verbos como orquestó o aceleró. Caso borde: quien cambia de sector con fragmentos freelance debe agruparlos bajo una sola marca consultora. Límite: el formato no compensa requisitos ausentes. Ensaya cobertura con /ats-resume-checker antes de exportar.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Monta a Lucía con titular, resumen de 3 líneas, 3 empleos con métricas, Grado 2021 y 8 habilidades espejadas de la oferta, recorta a 500 palabras en una página y exporta a lucia-cv.pdf. Segundo caso: junior con prácticas y proyecto fin de carrera arriba en vez de cronología escasa. Guarda el PDF y adapta claves por oferta sin mentir. No valida títulos ni sustituye portales de empleo; revisa cada oferta. Para puntuar el encaje usa /ats-resume-checker.",
    },
  ],
};

// Native ES keyword research (not translated): primary "generador de contraseñas" +
// 16-caracteres/105-bits intent. Density 1-1.8%, LSI (entropía, crypto,
// getRandomValues, gestor, 2FA), long-tail ES PAA ("¿16 o 20 caracteres cuántos bits?",
// "¿cuándo rotar claves de equipo?").
export const passwordGeneratorEs: Tool = {
  slug: "password-generator",
  title: "Generador de Contraseñas",
  short: "Claves seguras gratis",
  description:
    "Genera contraseñas seguras aleatorias con longitud a medida. Crea claves de 16 caracteres con 105 bits vía crypto, gratis offline, sin registro.",
  icon: "Key",
  keywords: [
    "generador de contraseñas",
    "contraseña segura",
    "generador claves aleatorias",
    "contraseña 16 caracteres",
    "¿16 o 20 caracteres cuántos bits?",
    "generador contraseñas gratis",
    "crypto getrandomvalues 105 131 bits",
    "passkey vs 2fa gestor",
    "clave segura sin registro",
  ],
  category: "generators",
  faq: [
    {
      question: "¿Las claves son de verdad aleatorias?",
      answer:
        "Sí. Salen de crypto.getRandomValues, generador criptográfico, no Math.random. Ejemplo: 20 caracteres de 94 símbolos dan unos 131 bits de entropía; 16 dan unos 105 bits, aguantando fuerza bruta mucho mejor que palabras humanas cada día.",
    },
    {
      question: "¿Funciona sin internet?",
      answer:
        "Sí. Genera entero offline en tu navegador tras la carga sin llamar a ningún servidor. Ejemplo: crea cinco claves de 16 o un secreto API de 32 en un avión; copia con un clic a tu gestor, nada se sube.",
    },
    {
      question: "¿Qué longitud protege mejor cada cuenta?",
      answer:
        "Usa al menos 16 caracteres con mayúsculas, minúsculas, dígitos y símbolos para accesos. Ejemplo: 20 caracteres dan unos 131 bits, 32 dan unos 190 bits, resistiendo fuerza bruta. Guarda cada clave única en un gestor y jamás reutilices.",
    },
    {
      question: "¿Por qué 16 ganan a trucos de 8?",
      answer:
        "La longitud multiplica combinaciones en exponencial, así 16 caracteres de 94 símbolos dan unos 105 bits contra 52 bits de 8. Atacantes rompen cortas con máscaras y diccionarios rápido. Nuestra herramienta monta claves de 16 y secretos de 32 vía crypto. Ejemplo: k9#Vm2$xQ8Lz! aguanta GPUs, mientras P@ssw0rd cae al instante. Guarda únicas en gestores cada día.",
    },
    {
      question: "¿Cuándo rotan claves los equipos?",
      answer:
        "Rota tras salidas, fugas sospechosas, auditorías trimestrales y picos de fallos para acortar ventanas. Ejemplo: cambia claves Stripe de 32 y accesos admin de 20 al momento en incidentes. Nuestro generador offline crea cinco recambios de una tanda, copia sin historial y evita la red. Anota fechas en la bóveda, revoca viejos pronto y exige credenciales únicas en todas partes.",
    },
  ],
  howTo: [
    {
      name: "Pon la longitud",
      text: "Pon 16 caracteres para accesos o 32 para secretos API, por ejemplo 20 para banca protegida.",
    },
    {
      name: "Elige alfabetos",
      text: "Activa mayúsculas, minúsculas, dígitos y símbolos; deja símbolos para banca y carteras crypto por fuerza.",
    },
    {
      name: "Genera claves",
      text: "Pulsa Generar para crear cinco opciones seguras de una vez con crypto.getRandomValues de forma fiable.",
    },
    {
      name: "Copia seguro",
      text: "Copia una clave como k9#Vm2$xQ8Lz! con un clic y pégala directa en la bóveda de tu gestor.",
    },
  ],
  guide: [
    {
      heading: "Qué significa clave fuerte",
      body: "Credenciales fuertes combinan longitud suficiente, variedad total y unicidad por servicio para aguantar adivinanzas y fugas sin cargar memoria. Ejemplo 1: genera acceso de 16 con mayúsculas, minúsculas, dígitos y símbolos para foros, unos 105 bits contra fuerza bruta. Ejemplo 2: genera secreto API de 32 para Stripe y carteras, unos 190 bits para bóvedas valiosas. Reutilizar P@ssw0rd invita al stuffing tras una brecha rápido. Nuestra herramienta offline tira del motor crypto, ofrece tandas, copia con un toque y nada transmite fuera. Gestores guardan únicas y equipos entran con bóvedas cada día sin hojas de cálculo.",
    },
    {
      heading: "Cómo funcionan entropía y azar seguro",
      body: "Cada clave sale de crypto.getRandomValues, fuente criptográfica del navegador, evitando secuencias predecibles de Math.random por completo. Tabla: 12 dan 78 bits flojo | 16 dan 105 accesos | 20 dan 131 fuerte | 32 dan 190 secretos | 64 dan 380 llaves. Sumar símbolos amplía a 94 y eleva fuerza por carácter para longitudes cortas. Cada carácter extra casi dobla el esfuerzo, así la longitud gana a trucos como 0 por o. Caso borde: sitios que limitan símbolos o longitud truncan la salida; ajusta interruptores a la política antes de enviar para evitar fallos. Todo queda local, se borra al cerrar, con tandas de cinco para aprovisionar departamentos y clientes cada día.",
    },
    {
      heading: "Ejemplo, flujo con gestor y siguiente paso",
      body: "Ejemplo 1: elige 16 para accesos con cuatro alfabetos y copia k9#Vm2$xQ8Lz! a tu gestor. Ejemplo 2: elige 32 para secretos API y rota claves Stripe tras incidentes. Mide tu candidata actual con /password-strength antes de cambiarla, guarda 20 o más caracteres para bóvedas y activa 2FA donde exista. Límite: estima resistencia al adivinado, no audita fugas ni phishing; complementa con gestor reputado y códigos de respaldo.",
    },
  ],
};

// Native ES keyword research (not translated): primary "compresor de imagenes" +
// 4,2-MB/80-% intent. Density 1-1.8%, LSI (JPG/PNG, calidad 80/90, 10 MB,
// 8192 px, 150 DPI), long-tail ES PAA ("¿cómo bajar 4,2 mb a 900 kb?",
// "¿JPG o PNG para comprimir?").
export const imageCompressorEs: Tool = {
  slug: "image-compressor",
  title: "Compresor de Imágenes",
  short: "Reduce JPG y PNG gratis",
  description:
    "Comprime JPG y PNG en tu navegador. Reduce una foto de 4,2 MB al 80 % a 900 KB, privado offline, sin registro.",
  icon: "Image",
  keywords: [
    "compresor de imagenes",
    "comprimir jpg online",
    "reducir tamaño imagen",
    "optimizar imagen sin subir",
    "¿cómo bajar 4,2 mb a 900 kb al 80 por ciento?",
    "comprimir png gratis",
    "jpeg dct cuantización submuestreo",
    "2mb vs 300kb 75 por ciento",
    "comprimir imagen a 100kb",
  ],
  category: "images-design",
  faq: [
    {
      question: "¿Mis imágenes se suben a un servidor?",
      answer:
        "No. La compresión pasa en tu navegador; los archivos jamás se suben. Ejemplo: un JPG de 4,2 MB al 80% baja a unos 900 KB con vista previa en vivo. Tu foto nunca sale de tu dispositivo mientras la comprimes aquí.",
    },
    {
      question: "¿Perderé calidad de imagen?",
      answer:
        "Tú mandas en calidad y tamaño; guardar más ligero recorta peso con pequeña pérdida visual. Ejemplo: 80% va para fotos y 90% para texto a zoom total. El deslizador corre entero en tu pestaña del lado cliente.",
    },
    {
      question: "¿Qué límites de peso y tamaño hay?",
      answer:
        "Maneja JPG y PNG hasta 10 MB y 8192 px por lado. Las fotos grandes encogen al cargar para que la pestaña vuele. Ejemplo: una toma de 10 MB carga en local para uso instantáneo. El tope de 10 MB lo mantiene todo en la pestaña.",
    },
    {
      question: "¿Elijo JPG o PNG para comprimir?",
      answer:
        "Elige JPG para vacaciones, retratos y degradados donde concesiones cromáticas mínimas pasan inadvertidas. Guarda PNG para logos, diagramas, capturas y transparencias donde los bordes nítidos mandan. Un JPG de 2MB suele caer cerca de 300KB al 75%, mientras capturas PNG encogen modesto. Convierte transparencias antes con /image-format-converter para peso óptimo.",
    },
    {
      question: "¿Qué DPI y dimensiones sobreviven?",
      answer:
        "La recompresión conserva píxeles mientras normaliza densidad cerca de 150DPI para impresos nítidos de tienda. Un paisaje de 4000 por 3000 queda en 4000 por 3000, solo más ligero. Entradas más allá de 8192 píxeles o 10MB bajan solas para cuidar memoria. Amplía después y la interpolación ablanda; captura resolución bastante al inicio en vez de reescalar derivados comprimidos.",
    },
  ],
  howTo: [
    {
      name: "Elige una imagen",
      text: "Elige boda.jpg de 2MB o foto.jpg de 4,2MB del carrete, con cada subida bajo 10MB para proceso en navegador.",
    },
    {
      name: "Mueve el deslizador",
      text: "Arrastra calidad a 80 por ciento para fotos o 90 para capturas, viendo el estimado de kilobytes al instante cerca.",
    },
    {
      name: "Compara con zoom",
      text: "Compara original contra comprimido a zoom 100 por ciento cerca de 150DPI, mirando rostros, follaje y bordes de texto.",
    },
    {
      name: "Descarga comprimida",
      text: "Descarga foto-comprimida.jpg cerca de 300KB o 900KB, re-revisa dimensiones, sube al CMS y archiva originales aparte.",
    },
  ],
  guide: [
    {
      heading: "Qué hace la compresión",
      body: "Recodificar aprieta lastre fotográfico cuantizando coeficientes coseno discretos mientras conserva ancho y alto para galerías, tiendas, currículums y blogs. Un JPG diurno de 2MB al 75% cae cerca de 300KB, ahorro de 85% ideal para héroes; un retrato de 4,2MB al 80% queda cerca de 900KB para cajas rápidas. Capturas PNG comprimen sin pérdida pero modesto, así convierte PNG fotográficos a JPG antes. Matriz: retrato 2MB a 300KB | evento 4,2MB a 900KB | captura 2,5MB a 1,1MB. El deslizador actualiza el pronóstico de bytes al instante, con lupa lado a lado que delata bloques en pestañas y letras. Todo el canvas corre en local tras la carga, con techos de diez megas y bordes 8192, sin enviar nada fuera. Marketing baja rebotes, fotógrafos aceleran pruebas y opositores cumplen umbrales de portales sin suscripciones.",
    },
    {
      heading: "Cómo se compensan calidad y peso",
      body: "La calidad manda la agresividad: 90% guarda nitidez tipográfica para infografías, 80% equilibra detalle vacacional contra peso, 70% mete moteado en cielos y piel. Prueba foto.jpg de 4,2MB: 90% da ~1,6MB, 80% da 900KB, 70% da 550KB con halos visibles. Un JPG tienda aparte de 2MB al 75% cae cerca de 300KB manteniendo 150DPI válidos para 6x4 pulgadas. Capturas PNG tiran de reducción de paleta más que del deslizador, así 2,5MB encogen hacia 1,1MB sin emborronar glifos. Haz zoom total, alterna fondos damero y blanco, y escruta degradados antes de publicar. Panoramas más allá de 8192 píxeles diezman solos al importar para no agotar memoria. Guarda alfa solo vía PNG; sustituir por JPG rellena transparencias con huecos alabastro. Ensaya tres exportaciones antes de publicar activos finales.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Carga foto.jpg de 4,2MB, pon 80%, confirma ~900KB con zoom 100% sin halos en rostros, descarga foto-comprimida.jpg y archiva el original. Segundo caso: JPG tienda de 2MB al 75% hacia 300KB para héroes rápidos. Compara original y comprimido lado a lado antes de subir al CMS. Límite: recompresión con pérdida en JPG y techo 10MB/8192px; no recupera detalle ya perdido ni convierte formatos — para eso usa /image-format-converter.",
    },
  ],
};

// Native ES keyword research (not translated): primary "unir pdf" +
// 20-archivos/200-páginas intent. Density 1-1.8%, LSI (combinar/juntar,
// reordenar/arrastrar, pdf-lib, 10 MB), long-tail ES PAA ("¿cómo unir 20 pdf en orden?",
// "¿por qué un cifrado no se une?").
export const pdfMergeEs: Tool = {
  slug: "pdf-merge",
  title: "Unir PDF",
  short: "Combina 20 PDF gratis en orden",
  description:
    "Une varios PDF y reordena páginas al instante en tu navegador. Elige archivos, arrastra para ordenar y descarga el combinado sin subir nada.",
  icon: "PictureAsPdf",
  keywords: [
    "unir pdf",
    "combinar pdf",
    "juntar pdf online",
    "unir pdf gratis sin subir",
    "¿cómo unir 20 pdf en orden?",
    "unir pdf gratis sin registro",
    "200 paginas 10mb limite pdf",
    "alternativa ilovepdf unir",
    "arrastrar ordenar 20 archivos",
  ],
  category: "pdf",
  faq: [
    {
      question: "¿Unir PDFs es privado y qué límites hay?",
      answer:
        "Sí. Unir varios PDF en orden corre en local vía pdf-lib en tu navegador; hasta 20 archivos, 200 páginas en total y 10 MB por archivo jamás salen de tu dispositivo. Ejemplo: une portada más capítulo1 de 12 páginas y capítulo2 de 8 para confirmar 20 páginas. Los cifrados deben abrirse antes, todo offline.",
    },
    {
      question: "¿Puedo reordenar archivos?",
      answer:
        "Sí. Arrastra filas para que el primer documento quede arriba, por ejemplo portada.pdf primero luego capítulo1 y capítulo2. Las páginas concatenan de arriba abajo, así verifica que la insignia muestre 12 más 8 igual a 20 páginas antes de unir. Reordenar es instantáneo en local; la salida conserva texto y orden, todo offline.",
    },
    {
      question: "¿Cuántos PDFs y páginas puedo unir?",
      answer:
        "Une hasta 20 PDF con 200 páginas en total y 10 MB por archivo en local vía pdf-lib. Ejemplo: dos archivos con 12 y 8 páginas se juntan en 20 páginas en segundos en un portátil. Los protegidos con clave deben abrirse antes; formularios pueden aplanarse y tandas enormes sobre límites pueden frenar móviles, todo offline.",
    },
    {
      question: "¿Qué pasa con formularios y marcadores al unir?",
      answer:
        "Campos interactivos, notas y firmas suelen aplanarse a tinta estática para guardar fidelidad visual entre visores. Los marcadores concatenan en secuencia en general, aunque destinos anidados a veces se renumeran. Prueba desplegables y casillas después, pues acciones JavaScript jamás sobreviven a la unión. Guarda originales editables aparte antes de repartir archivos.",
    },
    {
      question: "¿Por qué un PDF cifrado no se une?",
      answer:
        "Los bloqueados piden clave de propietario antes de que pdf-lib lea objetos; la clave de usuario solo abre vista. Quita restricciones en Acrobat, reimprime vía Imprimir a PDF de Microsoft o pide copias desbloqueadas al proveedor. Extractos bancarios y exámenes suelen llevar tal cifrado. Forzar claves viola la política, así pide el original abierto.",
    },
  ],
  howTo: [
    {
      name: "Elige PDFs",
      text: "Elige cinco PDF como portada.pdf, capítulo1.pdf, capítulo2.pdf, apéndice.pdf y biblio.pdf, cada uno bajo 10MB para uniones fiables.",
    },
    {
      name: "Reordena archivos",
      text: "Arrastra filas al orden de lectura con portada.pdf primero, luego verifica capítulo1 doce páginas más capítulo2 ocho páginas.",
    },
    {
      name: "Revisa conteos",
      text: "Confirma que la insignia suma 12 más 8 igual a 20 páginas del presupuesto de 200, mirando orientación y escaneos que falten.",
    },
    {
      name: "Une y descarga",
      text: "Pulsa Unir PDFs, espera el montaje local de pdf-lib, luego descarga libro-unido.pdf y prueba enlaces, marcadores y texto buscable.",
    },
  ],
  guide: [
    {
      heading: "Qué hace unir PDFs",
      body: "Unir cose PDFs separados en un solo dossier paginado para tesis, visados, facturas, portfolios y ebooks sin nube. Elige hasta cinco archivos tipo portada.pdf, capítulo1.pdf doce páginas, capítulo2.pdf ocho páginas, apéndice.pdf y biblio.pdf, con techos de veinte fuentes, doscientas hojas y diez megas cada una. Ordena con arrastre para que la intro preceda capítulos; la concatenación honra el orden visual de arriba abajo guardando glifos y fuentes. Matriz: folleto 2 archivos 20 páginas | solicitud 5 archivos 85 páginas | archivo 20 archivos 200 páginas. Una prueba con doce más ocho debe anunciar veinte hojas antes de ejecutar. Todo parsea vía pdf-lib en memoria aislada, deja originales intactos y borra búferes al navegar fuera.",
    },
    {
      heading: "Cómo funciona unir en orden",
      body: "La ingesta valida cabeceras, abre permisos, numera folios y pinta miniaturas para reordenar al tacto antes de juntar bytes. Arrastra portada.pdf sobre capítulo1.pdf; la lista recalcula doce más ocho igual a veinte al instante, marcando dimensiones dispares, apaisados o claves con insignias rojas. La salida guarda texto vectorial, enlaces y jerarquía, aunque widgets pueden rasterizar. Extractos cifrados piden desbloqueo previo con credencial de propietario, mientras archivos de imprenta sobre diez megas deben recomprimirse antes con /pdf-compress. Escaneos sin OCR quedan pictóricos tras unir y piden OCR externo. Verifica paginación muestreando primera, media y última hoja, confirmando que cabeceras y pies siguen lógicos. Aborta y reordena si la secuencia falla, pues reordenar tras montar exige dividir de nuevo en /pdf-split.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Elige portada.pdf, capítulo1.pdf de 12 páginas y capítulo2.pdf de 8, ordena con portada primero, confirma la insignia de 20 páginas y pulsa Unir para descargar libro-unido.pdf. Segundo caso: cinco archivos de solicitud con 85 páginas en segundos en portátil. Prueba hipervínculos y texto buscable tras unir. Límite: 20 archivos, 200 páginas, 10 MB cada uno; formularios pueden aplanarse y cifrados piden clave — para rangos exactos usa /pdf-split tras unir.",
    },
  ],
};

// Native ES keyword research (not translated): primary "formateador json" +
// línea-columna intent. Density 1-1.8%, LSI (validador, minimizar, 500KB,
// línea 1 columna 18), long-tail ES PAA ("¿cómo validar json con errores de línea?",
// "¿formatear o minimizar?").
export const jsonFormatterEs: Tool = {
  slug: "json-formatter",
  title: "Formateador JSON",
  short: "Valida y formatea gratis",
  description:
    "Formatea, valida y minimiza JSON con resaltado, niveles plegables y errores exactos para depurar APIs en privado offline.",
  icon: "DataObject",
  keywords: [
    "formateador json",
    "validador json",
    "formatear json online",
    "pegar json validar local",
    "¿cómo validar json con errores de línea?",
    "formatear json gratis",
    "jsonparse árbol sintáctico línea columna",
    "formateador vs visor árbol",
    "validador json offline",
  ],
  category: "developer",
  faq: [
    {
      question: "¿Mi JSON se envía a algún sitio?",
      answer:
        "No. El parseo corre entero dentro de esta pestaña, así una respuesta de 500KB con usuarios anidados jamás cruza la red. Ejemplo: objetos con nombre Ada más etiquetas quedan en memoria, funcionan sin conexión y se borran al cerrar la pestaña. Nada se sube.",
    },
    {
      question: "¿Trae JSON grandes?",
      answer:
        "Sí para cargas rutinarias. Documentos cerca de 500KB con niveles plegados pintan al instante, mientras respuestas de 1,2MB con 10000 líneas validan pero pueden dudar en móviles viejos. Ejemplo: un catálogo de 2MB con 20000 líneas señala la coma que falta por línea y columna. Divide volcados de 10MB en trozos para rodar suave.",
    },
    {
      question: "¿Qué tope de tamaño admite?",
      answer:
        "Techo práctico cerca de pocos megas para editar cómodo. Una respuesta API de 500KB con matrices de usuarios expande al instante, mientras logs de 3MB con 60000 nodos piden paciencia y plegado. Segundo ejemplo: configs de 800KB con jerarquías hondas marcan llaves dispares con precisión. Más allá de 10MB, parte fuentes, valida fragmentos aparte y rejunta para desplegar.",
    },
    {
      question: "¿Por qué validar JSON antes de desplegar?",
      answer:
        "Cargas validadas evitan rollbacks de madrugada por comas sueltas, llaves sin par o controles invisibles en respuestas copiadas. Equipos ensayan migraciones, contrastan staging contra esquemas de producción, iluminan anomalías anidadas y certifican contratos antes de lanzar, volviendo el pánico en rituales tranquilos, auditables y con menos avisos.",
    },
    {
      question: "¿Cuándo minimizar en vez de formatear?",
      answer:
        "Minimiza cuando cada byte duele en latencia, como embeber config en HTML, encolar mensajes por tuberías justas o cachear catálogos en el borde. Formatea al depurar, revisar código y documentar. Ejemplo: el minimizado ahorra cerca de veinte por ciento de bytes para producción; el formateado con dos espacios lee jerarquías de un vistazo.",
    },
  ],
  howTo: [
    {
      name: "Pega el JSON",
      text: "Pega objeto minimizado como nombre Ada con etiquetas 1 y 2, o suelta una respuesta API de 500KB con usuarios anidados para inspeccionar.",
    },
    {
      name: "Elige acción",
      text: "Elige Formatear para jerarquía legible de dos espacios, Minimizar para transporte compacto o Validar para listar fallos sin reescribir.",
    },
    {
      name: "Corrige errores",
      text: "Mira punteros línea-columna como línea 1 columna 18, luego repara comas que faltan, comillas sueltas o comas finales al momento.",
    },
    {
      name: "Copia salida",
      text: "Copia la salida bella para documentar, o exporta variante minimizada que ahorra cerca de veinte por ciento de bytes para producción.",
    },
  ],
  guide: [
    {
      heading: "Qué hace el formateador",
      body: "Valida, formatea y minimiza JSON con resaltado de sintaxis, niveles plegables y errores por línea y columna para depurar APIs en privado. Ejemplo: pega una respuesta de 500KB con usuarios anidados y ve la jerarquía de dos espacios al instante; minimiza para ahorrar cerca de veinte por ciento de bytes en producción. Todo parsea en tu pestaña sin red, con matrices de usuarios, etiquetas y honduras marcadas con precisión. Caso borde: volcados de 10MB piden partir en trozos; logs de 3MB con 60000 nodos rinden mejor plegados. Inspecciona con /json-tree-viewer y convierte planillas con /json-csv.",
    },
    {
      heading: "Cómo validan línea y columna",
      body: "El parseo señala la coma que falta, la llave sin par o la comilla suelta con línea y columna exactas, como línea 1 columna 18. Documentos de 500KB expanden al instante; respuestas de 1,2MB con 10000 líneas validan aunque móviles viejos duden; catálogos de 2MB con 20000 líneas clavan el fallo. Tabla: 500KB respuesta API | instantáneo; 1,2MB 10000 líneas | valida con calma; 2MB 20000 líneas | señala coma exacta; 10MB+ | parte en trozos. Minimizar compacta para latencia y borde; formatear abre para revisiones. Caso borde: caracteres de control invisibles copiados rompen el parseo — repasa la zona marcada. Ver /terms.",
    },
    {
      heading: "Ejemplo resuelto y límites",
      body: "Pega {\"nombre\":\"Ada\",\"tags\":[1,2]}, pulsa Formatear y copia la jerarquía de dos espacios para documentar. Segundo caso: suelta 500KB de API, repara la coma de línea 1 columna 18 y exporta el minimizado con veinte por ciento menos bytes. Límite: techo práctico de pocos megas y validación sintáctica, no de esquema — para ver árbol usa /json-tree-viewer y para planillas /json-csv.",
    },
  ],
};

// Native ES keyword research (not translated): primary "calculadora sip" +
// aportación-mensual/12 % intent. Density 1-1.8%, LSI (TAE, comisiones, XIRR,
// escalonado 10 %), long-tail ES PAA ("¿cuánto crecen 500 euros al mes?",
// "¿sip o único?"). YMYL: projection-only banner via localized
// YMYLDisclaimer + /terms closers (matches EN guard).
export const sipCalculatorEs: Tool = {
  slug: "sip-calculator",
  title: "Calculadora SIP",
  short: "Aporta al mes y proyecta",
  description:
    "Proyecta tu SIP: aportación mensual, TAE y años. Pon 500 € al mes al 12 % a 10 años: 60.000 € hacia 116.000 €. Privado offline.",
  icon: "AccountBalance",
  keywords: [
    "calculadora sip",
    "simulador aportaciones mensuales",
    "calculadora interés compuesto mensual",
    "fondo inversión aportación",
    "¿cuánto crecen 500 euros al mes en 10 años?",
    "calculadora sip gratis",
    "tae comisiones xirr rentabilidad",
    "sip escalonado 10 por ciento 2026",
    "sip vs único comparativa",
  ],
  category: "finance",
  faq: [
    {
      question: "¿Cómo se calculan los retornos SIP?",
      answer:
        "El vencimiento sale de VF = M×((1+im)^n−1)÷im×(1+im), donde M es la aportación mensual, im es anual÷12÷100 y n los meses. Ejemplo: 500 € mensuales al 12 % a 10 años dan im=0,01 y n=120, con 60.000 € aportados creciendo cerca de 116.000 €. Las ganancias componen cada mes. Ver /terms.",
    },
    {
      question: "¿Esta calculadora es asesoramiento financiero?",
      answer:
        "No. Es solo proyección educativa, nunca asesoramiento financiero. Vaivenes del mercado, comisiones, impuestos y gastos de salida quedan fuera de cada cifra. Ejemplo: 12 % contra 10 % a 10 años cambian el vencimiento en decenas de miles de euros. Consulta a un profesional cualificado y ver /terms antes de invertir.",
    },
    {
      question: "¿Mis datos SIP quedan en este dispositivo?",
      answer:
        "Sí. La matemática mensual queda tuya entera en este móvil. Las sumas corren aquí sin envíos ni registro. Ejemplo: 1.000 € mensuales quedan privados, no piden red y se borran al cerrar. Solo son cifras de estudio, no consejo. Ver /terms.",
    },
    {
      question: "¿Cómo de exacta es la proyección?",
      answer:
        "Es ilustrativa suponiendo composición mensual fija a un tipo constante. Los valores liquidativos reales fluctúan y las fechas exactas cambian resultados. Ejemplo: 12 % supuesto contra 9 % real recortan el vencimiento fuerte a 10 años. Rentabilidades pasadas jamás garantizan futuras, así consulta a un profesional y ver /terms.",
    },
    {
      question: "¿Elijo SIP escalonado anual?",
      answer:
        "Escalar conviene a asalariados con subidas, pues un 10 % anual sobre 500 € lleva el vencimiento a 10 años cerca de 176.000 € contra 116.000 € plano. Automatiza la subida con aniversario junto a colchón, revisión de ruta y seguros para que la inflación de estilo de vida jamás canibalice la disciplina de aportar.",
    },
    {
      question: "¿SIP o aportación única?",
      answer:
        "Ningún vehículo domina siempre; SIP escalonados suavizan la volatilidad de entrada entre meses, mientras 60.000 € únicos al 12 % a 10 años llegan cerca de 186.000 € porque los primeros meses componen más tiempo. Elige único para extras ociosos, SIP para nóminas, y compara ambos motores con /compound-interest-calculator. Ver /terms.",
    },
  ],
  howTo: [
    {
      name: "Pon el SIP",
      text: "Pon SIP mensual 500 € con fecha de inicio, p. ej. día 5 de mes, adeudo auto para 120 cuotas.",
    },
    {
      name: "Pon TAE y años",
      text: "Pon retorno anual esperado 12 % y duración 10 años, luego duplica el caso al 10 % y al 7 %.",
    },
    {
      name: "Mira el crecimiento",
      text: "Mira aportados 60.000 €, vencimiento cerca de 116.000 €, ganancias cerca de 56.000 €, más tabla anual.",
    },
    {
      name: "Compara planes",
      text: "Compara 500 € planos contra escalonado 10 % anual o 10 contra 15 años para cuantificar el empujón compuesto.",
    },
  ],
  guide: [
    {
      heading: "Cómo se calcula el vencimiento SIP",
      body: "Valor futuro con VF = M×((1+im)^n−1)÷im×(1+im), donde M es aportación mensual, im es anual÷12÷100 y n los meses. Ejemplo: 500 € mensuales al 12 % a 10 años dan im=0,01 y n=120, así 60.000 € aportados crecen a vencimiento cerca de 116.000 € con ganancias cerca de 56.000 €. Los preajustes aclaran sensibilidad: mismos 500 € a 10 años llegan cerca de 103.000 € al 10 % y cerca de 86.000 € al 7 %. Tabla — Horizonte | Aportado | Proyectado al 12 %: 5a | 30.000 € | 41.000 €; 10a | 60.000 € | 116.000 €; 15a | 90.000 € | 250.000 €. Caso borde: cuotas saltadas o pausas bajan n y el ritmo. Límite: matemática a tipo fijo excluye volatilidad, comisiones, gastos de salida e impuestos. Compara únicos con /compound-interest-calculator y ver /terms.",
    },
    {
      heading: "Entradas, supuestos y límites",
      body: "Pon aportación mensual, retorno anual esperado y duración; la proyección supone composición mensual fija en una fecha de adeudo. Un escalonado 10 % anual bate al plano porque cuotas mayores tardías aún componen años. Tabla — Plan | Total aportado | Proyectado al 12 % a 15 años: plano 500 € | 90.000 € | 250.000 €; escalonado 500 € subiendo 10 % anual | 171.000 € | 529.000 €, unos 280.000 € extra. Contraste único contra SIP: 60.000 € únicos al 12 % a 10 años llegan cerca de 186.000 €, mientras 500 € mensuales escalonados totalizan 116.000 € porque los primeros meses del único componen más tiempo. Caso borde: pausas del escalonado en baches laborales devuelven la matemática al plano. Límite: subidas salariales, caídas de fondos, error de seguimiento y tramos fiscales quedan fuera. Prueba 10 % contra 12 % junto a /compound-interest-calculator y ver /terms.",
    },
    {
      heading: "Siguientes pasos y dudas comunes",
      body: "Si el vencimiento queda corto, sube la cuota, alarga duración o añade escalonado anual para cerrar huecos sin cazar retornos. Ejemplo: pasar de 500 € a 600 € mensuales o de 10 a 15 años mueve el vencimiento decenas de miles. Automatiza el adeudo el día 5, revisa comisiones y XIRR del fondo cada año y mantén colchón aparte. Límite: proyección educativa con tipo constante; el mercado manda y lo pasado no garantiza. Para comparar motores usa /compound-interest-calculator.",
    },
  ],
};

// Native ES keyword research (not translated): primary "calculadora emi" +
// cuota-mensual/4 % intent. Density 1-1.8%, LSI (cuota, amortización francesa,
// TIN/TAE, prepago), long-tail ES PAA ("¿cuánto pago por 120.000 euros?",
// "¿por qué amortizar el año 3 ahorra tanto?"). YMYL: planning-only banner via
// localized YMYLDisclaimer + /terms closers (matches EN guard).
export const emiCalculatorEs: Tool = {
  slug: "emi-calculator",
  title: "Calculadora EMI",
  short: "Cuota mensual e intereses",
  description:
    "Calcula la EMI de tu préstamo al instante. Pon 120.000 € al 4 % a 20 años: 727 € al mes, 54.500 € intereses. Privado offline.",
  icon: "AccountBalance",
  keywords: [
    "calculadora emi",
    "calcular cuota préstamo",
    "emi préstamo vivienda",
    "simulador cuota mensual",
    "¿cuánto pago por 120.000 euros a 20 años?",
    "calculadora emi gratis",
    "amortización francesa tipo fijo",
    "santander bbva caixabank tipos 2026",
    "emi vs hipoteca comparativa",
  ],
  category: "finance",
  faq: [
    {
      question: "¿Cómo se calcula mi EMI?",
      answer:
        "EMI = C×i×(1+i)^n÷((1+i)^n−1), donde C es capital, i el tipo mensual anual÷12÷100 y n los meses. Ejemplo: 120.000 € al 4 % a 20 años dan i=0,003333 y n=240 con EMI cerca de 727 € e intereses cerca de 54.500 €. Al 0 % usa C÷n.",
    },
    {
      question: "¿Esta calculadora es asesoramiento financiero?",
      answer:
        "No. Solo planifica de forma informativa, nunca asesoramiento financiero. La EMI real varía con comisiones, seguros, tipos variables y prepagos. Ejemplo: 1 % de apertura sobre 120.000 € suma 1.200 € al inicio. Consulta a tu banco las condiciones y ver /terms antes de firmar.",
    },
    {
      question: "¿Mis datos quedan en este dispositivo?",
      answer:
        "Sí. Capital, tipo y meses jamás salen de este dispositivo. Corren en la pestaña offline sin subidas ni registro. Ejemplo: una prueba de 120.000 € queda en local, funciona sin red y se borra al cerrar. Ver /terms.",
    },
    {
      question: "¿Cómo de exacta es la estimación?",
      answer:
        "Clava préstamos amortizables a tipo fijo, normalmente a redondeo de tablas bancarias. Comisiones, impuestos, seguros y revisiones del variable quedan fuera. Ejemplo: un 4 % que sube a 4,5 % mueve la cuota notablemente. Verifica contra tu oferta vinculante y ver /terms.",
    },
    {
      question: "¿Qué tipos comparo entre bancos?",
      answer:
        "Contrasta Santander cerca de 3,00 %, BBVA cerca de 3,20 % y CaixaBank cerca de 3,50 % como puntos de partida ilustrativos. Ejemplo: 120.000 € a 20 años se mueven de unos 666 € a unos 696 € mensuales en esa banda. Pesa apertura, cláusulas de revisión y diferenciales por scoring antes de elegir. Ver /terms.",
    },
    {
      question: "¿Por qué amortizar el año 3 ahorra tanto?",
      answer:
        "Los pagos extra tempranos atacan capital cuando el interés compone más empinado. Ejemplo: 60.000 € amortizados el año 3 sobre 120.000 € al 4 % recortan el plazo unos 11 años y ahorran cerca de 34.000 € de intereses. Amortizar tarde ayuda menos porque ya pagaste casi todo el interés.",
    },
  ],
  howTo: [
    {
      name: "Pon el capital",
      text: "Escribe capital 120.000 €, resta entrada 20.000 € si hay, confirma préstamo neto 100.000 €, moneda y mes de inicio antes de seguir.",
    },
    {
      name: "Pon tipo y plazo",
      text: "Pon interés anual 4 % fijo, plazo 20 años con 240 meses, verifica tipo y cláusula de revisión con calma.",
    },
    {
      name: "Mira la EMI",
      text: "Revisa EMI cerca de 727 €, intereses cerca de 54.500 €, total 174.500 €, tabla anual y exporta el resumen CSV.",
    },
    {
      name: "Compara casos",
      text: "Compara 3 % contra 4 % y 15 contra 20 años, prueba amortizar 60.000 € el año 3 y mira el ahorro al instante.",
    },
  ],
  guide: [
    {
      heading: "Qué es una EMI",
      body: "La EMI es la cuota mensual fija que devuelve capital más intereses durante el plazo, con primeros años cargados de intereses y últimos de capital. Ejemplo: 120.000 € al 4 % a 20 años (i=0,003333, n=240) dan EMI cerca de 727 €, total cerca de 174.500 € e intereses cerca de 54.500 €. Los precios bancarios varían por scoring, nómina y referencia: | Banco | Tipo fijo ilustrativo | EMI sobre 120 mil/20a | Santander | 3,00 % | 666 € | BBVA | 3,20 % | ~681 € | CaixaBank | 3,50 % | 696 € |. Diferenciales, Euríbor y aperturas mueven ofertas reales. Caso borde: préstamos al 0 % tiran de capital entre meses. Límite: amortización a tipo fijo, sin revisiones ni gastos. Compara variantes con /loan-calculator. Solo educa, no aconseja. Ver /terms.",
    },
    {
      heading: "Cómo se calcula la EMI",
      body: "Los bancos usan EMI = C×i×(1+i)^n/((1+i)^n−1), con C capital, i tipo mensual (anual÷12÷100) y n meses. Para 120.000 € al 4 % a 20 años, i=0,003333 y n=240, dan 727 €; el total son 727×240 (174.500 €) menos capital dejan 54.500 € intereses. Amortizar transforma el coste: 60.000 € el año 3 (tras 36 cuotas) bajan el saldo de unos 108.000 € a unos 48.000 €, acortando cerca de 11 años y ahorrando unos 34.000 € de intereses. Los bancos topan elegibilidad con la cuota bajo ~35 % de ingresos netos y scoring alto afina diferenciales. Caso borde: amortizar parcial en blindaje atrae comisiones de cancelación. Límite: ignora seguros, impuestos y resets variables. Mide tu margen con /mortgage-calculator. Solo informa, no aconseja. Ver /terms.",
    },
    {
      heading: "Ejemplo: 120.000 € al 4 % a 20 años",
      body: "Toma 120.000 € al 4 % a 20 años: paga 727 € mensuales en 240 cuotas, total 174.500 € con 54.500 € intereses. Prueba 3 % (666 €) y 3,5 % (696 €) para sentir la banda bancaria. Segundo caso: amortiza 60.000 € el año 3 y mira caer el plazo unos 11 años con ~34.000 € ahorrados. Guarda la oferta vinculante y confirma TAE contra TIN. Para hipotecas puras usa /mortgage-calculator y para capacidad /home-loan-eligibility-india.",
    },
  ],
};

// Native FR keyword research (not translated): primary "générateur qr" +
// WiFi/vCard/512-vs-2048 intent. Density 1-1.8%, LSI (zone de silence, modules,
// densité, 512px/2048px, distance/10), long-tail FR PAA ("comment créer un qr wifi ?",
// "quelle taille imprimer ?").
export const qrCodeGeneratorFr: Tool = {
  slug: "qr-code-generator",
  title: "Générateur de Codes QR",
  short: "Gratuit : liens, WiFi, vCard",
  description:
    "Générateur QR gratuit : créez des codes pour URLs, WiFi, UPI et vCard dans votre navigateur. Choisissez 512 ou 2048px, PNG — privé hors ligne.",
  icon: "QrCode2",
  keywords: [
    "générateur qr",
    "créer qr code gratuit",
    "qr pour wifi",
    "qr code vcard",
    "comment créer un qr wifi ?",
    "générateur qr sans expiration",
    "qr 512 vs 2048 imprimer",
    "qr upi paiements inde",
    "qr code hors ligne",
  ],
  category: "images-design",
  faq: [
    {
      question: "Que puis-je encoder avec ce générateur ?",
      answer:
        "URLs, texte, email, téléphone et notes jusqu'à 200 caractères. Exemple : https://example.com/menu en 512px se scanne pendant des années sans expiration car les données vivent dans le code. Pour le WiFi avec SSID et clé WPA, utilisez le générateur WiFi QR, qui échappe ; et : correctement.",
    },
    {
      question: "Puis-je télécharger le QR en image ?",
      answer:
        "Oui. Cliquez Télécharger pour enregistrer un PNG à la taille choisie, par exemple 512px pour le web et le chat ou 2048px pour les affiches. Exemple : un code 512px s'imprime net à 5 cm et se scanne aussitôt ; testez avec votre mobile avant de partager. Codes statiques généraux uniquement, sans analytique.",
    },
    {
      question: "Quelle taille pour l'écran ou l'impression ?",
      answer:
        "Utilisez le PNG 512px pour le web et le chat, 2048px pour les affiches et flyers. Les carrés nets restent lisibles jusqu'au A3. Exemple : testez des entrées d'exemple en local hors ligne avec aperçu instantané et copie en un clic. Les alertes de contraste apparaissent avant le téléchargement.",
    },
    {
      question: "Quelle taille imprimer selon la distance ?",
      answer:
        "Divisez la distance de lecture par dix : les cartes à 50 cm demandent 5 cm, les affiches à 2 m exigent 20 cm. Gardez la zone de silence de 4 modules, un fini mat et un fort contraste. Testez des prototypes 512px pour les dépliants et 2048px pour l'extérieur avant d'imprimer en masse. Voir /terms.",
    },
    {
      question: "URL, UPI ou vCard : quoi choisir ?",
      answer:
        "Les liens courts décodent plus vite sur les vieux mobiles, tandis qu'UPI comme upi pay shop@upi inclut bénéficiaire et montant pour payer en un geste. La vCard regroupe nom, mobile et société, quoique les photos densifient le motif. Validez chaque variante en lumière réelle avec un Android économique avant d'imprimer. Voir /terms.",
    },
  ],
  howTo: [
    {
      name: "Écrivez le contenu",
      text: "Écrivez ou collez quoi encoder, par exemple https://example.com/menu, UPI shop@upi pour 199 Rs ou un contact vCard.",
    },
    {
      name: "Choisissez la taille",
      text: "Choisissez la résolution, par exemple PNG 512px pour le web et le chat ou 2048px pour les affiches A3 et flyers.",
    },
    {
      name: "Aperçu et test",
      text: "Vérifiez la netteté et la zone de silence, puis scannez avec l'appareil depuis la distance réelle, par exemple deux mètres.",
    },
    {
      name: "Téléchargez le PNG",
      text: "Cliquez Télécharger pour enregistrer qr-code-512.png ou qr-poster-2048.png et réutiliser sans expiration pendant des années.",
    },
  ],
  guide: [
    {
      heading: "Ce que fait le générateur QR",
      body: "Convertit URLs, texte, emails, téléphones, UPI et vCard en codes scannables dans votre navigateur. Exemple : encodez https://example.com/menu, UPI shop@upi pour 199 Rs ou une vCard avec nom et mobile +33 6 12 34 56 78 en quelques secondes. Aperçu instantané, 512px pour les écrans ou 2048px pour l'impression, PNG sans compte ni expiration. Les motifs gardent les données dans le code, ainsi les imprimés scannent toujours et rien ne monte. Limite : codes statiques en noir sur blanc, sans logos ni analytique ; pour les clés WiFi utilisez /wifi-qr-generator.",
    },
    {
      heading: "Comment tailles et densité marchent",
      body: "Plus de caractères = grille plus dense = image plus grande. Le PNG 512px sert pour le web et le chat (net à 5 cm, lecture à 50 cm) ; 2048px pour les affiches et A3 (lecture à 2 m). Table : chat | 512px | 5 cm | 50 cm ; affiche | 2048px | 20 cm | 2 m ; banderole | 2048px | 30 cm | 3 m, avec la règle taille≈distance/10. Gardez la zone de silence de 4 modules, un contraste maximal et une surface plane. Cas limite : le brillant laminé, les gobelets courbes ou les stickers sous 2 cm échouent sur les vieux capteurs. Testez chaque emplacement. Voir /terms.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Encodez https://example.com/menu, téléchargez 512px pour le web et 2048px pour l'affiche, imprimez à 5 cm et 20 cm puis scannez à 50 cm et 2 m. Second cas : une vCard à 5 champs (~150 caractères) demande 2,5 cm minimum sur carte. Archivez le PNG maître ; chaque ré-enregistrement JPG adoucit les bords. Ni logos, ni couleurs, ni suivi ; pour les identifiants avec échappement utilisez /wifi-qr-generator.",
    },
  ],
};

// Lookup native FR Tool by slug (undefined for non-pilots).
export function getFrTool(slug: string): Tool | undefined {
  if (slug === "invoice-generator") return invoiceGeneratorFr;
  if (slug === "qr-code-generator") return qrCodeGeneratorFr;
  if (slug === "unit-converter") return unitConverterFr;
  if (slug === "word-counter") return wordCounterFr;
  if (slug === "credit-card-validator") return creditCardValidatorFr;
  if (slug === "typing-speed-test") return typingSpeedFr;
  if (slug === "plagiarism-checker") return plagiarismCheckerFr;
  if (slug === "mortgage-calculator") return mortgageCalculatorFr;
  return undefined;
}

// Native FR keyword research (not translated): primary "convertisseur d'unités" +
// km→miles/kg→livres intent. Density 1-1.8%, LSI (miles, livres, Fahrenheit,
// facteurs exacts, 6 décimales), long-tail FR PAA ("comment convertir km en miles ?",
// "combien font 150 livres en kg ?").
export const unitConverterFr: Tool = {
  slug: "unit-converter",
  title: "Convertisseur d'Unités",
  short: "km en miles, kg en livres",
  description:
    "Convertisseur gratuit : 10 mi = 16,09 km, 150 lb = 68,04 kg, 20 °C = 68 °F. Facteurs exacts à 6 décimales, hors ligne et privé.",
  icon: "Straighten",
  keywords: [
    "convertisseur d'unités",
    "convertir km en miles",
    "convertir kg en livres",
    "km en miles convertisseur",
    "comment convertir km en miles ?",
    "convertisseur unités gratuit",
    "facteurs métrique impérial",
    "métrique vs impérial usages",
    "miles en km hors ligne",
  ],
  category: "converters",
  faq: [
    {
      question: "Quelles unités le convertisseur gère-t-il ?",
      answer:
        "Il couvre longueur, poids, température, temps et données en 1 panneau. Exemple : 10 miles donnent 16,09 km, 150 livres donnent 68,04 kg et 20 °C donnent 68 °F. Choisissez d'abord les unités source et cible. Chaque calcul tourne sur votre appareil sans réseau.",
    },
    {
      question: "Le convertisseur est-il exact ?",
      answer:
        "Oui. Il utilise des facteurs fixés et la math exacte des températures sur votre appareil. Exemple : 1 km donne 0,621371 miles, 1 kg donne 2,20462 livres et 0 °C donne 32 °F en 1 seconde. Aucune dérive d'arrondi dans la base. Gratuit hors ligne sans envoi.",
    },
    {
      question: "Mes nombres sont-ils envoyés ?",
      answer:
        "Non. Tout le calcul tourne hors ligne dans votre navigateur. Exemple : 100 km en miles avec 62,14 de résultat reste sur votre appareil en 1 seconde, gratuit sans envoi. Fermez l'onglet pour effacer. Aucun compte.",
    },
    {
      question: "Pourquoi 1 kilomètre vaut 0,621371 miles et non 0,62 ?",
      answer:
        "Le mile vaut exactement 1609,344 mètres par accord, ainsi la division donne 0,621371192 pour l'ingénierie et l'aviation. Arrondir à 0,62 crée 220 mètres d'erreur sur 100 kilomètres. Notre convertisseur garde six décimales puis arrondit seulement l'affichage, avec précision de navigation et lecture confortable au quotidien.",
    },
    {
      question: "Quand peser en grammes plutôt qu'en tasses ?",
      answer:
        "Préférez les grammes pour farine, cacao et beurre où la tasse varie de 20 % et ruine la pâte. Une tasse cuillère pèse 120 grammes, la tassée atteint 150. Cet outil passe 2 tasses de lait à 473 millilitres et 500 grammes à 4,2 tasses, reliant tasses américaines et balance européenne sans gâteaux ratés.",
    },
  ],
  howTo: [
    {
      name: "Choisissez la grandeur",
      text: "Choisissez longueur, poids, température, volume, temps ou données d'abord, par exemple longueur pour un trajet de 10 miles.",
    },
    {
      name: "Écrivez la valeur",
      text: "Écrivez 150, mettez de livres en kilogrammes, par exemple pour suivre votre poids de sport chaque semaine.",
    },
    {
      name: "Lisez le résultat",
      text: "Lisez 68,04 kilogrammes aussitôt, vérifiez 4 décimales si besoin et copiez vers le carnet d'entraînement.",
    },
    {
      name: "Testez un exemple",
      text: "Validez avec 1 kilomètre à 0,621 miles et 20 °C à 68 °F, inversez les unités pour confirmer que ça colle.",
    },
  ],
  guide: [
    {
      heading: "Ce que le convertisseur couvre",
      body: "Unifie longueur, masse, température, volume, vitesse, durée, pression et stockage sans rien envoyer. Exemple 1 : écrivez 10, de miles en kilomètres, obtenez 16,093 km pour les trajets. Exemple 2 : écrivez 150, de livres en kilogrammes, obtenez 68,039 kg pour le sport et les valises. Les calculs utilisent des multiplicateurs exacts en local, gardent les décimales, copient d'un geste et s'effacent à la fermeture, en prenant soin des mesures sensibles chaque jour hors ligne.",
    },
    {
      heading: "Comment facteurs et °C-°F marchent",
      body: "Le linéaire multiplie par des constantes ; la température ajoute un décalage. Table : 1 km = 0,621371 miles | 1 mile = 1,609344 km | 1 kg = 2,204623 livres | 1 livre = 0,453592 kg | 1 pouce = 2,54 cm | 1 litre = 0,264172 gallons. Fahrenheit = Celsius fois 9 sur 5 plus 32, ainsi 20 °C donnent 68 °F. Cas limite : le zéro absolu −273,15 °C rejette les valeurs moindres. Tout tourne en double précision dans votre navigateur hors ligne au quotidien.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Convertissez 10 miles en 16,093 km et 150 livres en 68,039 kg, copiez vers votre feuille et fermez pour effacer. Second cas : 20 °C à 68 °F et retour. Comparez l'allure au kilomètre, traduisez 2 tasses en 473 ml et conciliez 32 psi avec 2,2 bar. Limite : estimation en double précision, pas un étalonnage certifié ; pour la monnaie en direct utilisez /currency-converter.",
    },
  ],
};

// Native FR keyword research (not translated): primary "compteur de mots" +
// hero intent (top HERO_SLUGS priority). Density 1-1.8%, LSI (MPM, Flesch,
// caractères, phrases), long-tail FR PAA ("combien de mots dans un essai ?",
// "800 mots combien de minutes ?").
export const wordCounterFr: Tool = {
  slug: "word-counter",
  title: "Compteur de Mots",
  short: "Gratuit : mots et temps",
  description:
    "Compteur de mots gratuit : compte mots, caractères et phrases. Vérifiez 800 mots à 200 MPM en 4,0 min, privé hors ligne, sans inscription.",
  icon: "TextSnippet",
  keywords: [
    "compteur de mots",
    "compter mots en ligne",
    "compteur de caractères",
    "temps de lecture",
    "combien de mots dans un essai ?",
    "compteur mots gratuit",
    "flesch facilité lecture",
    "200 mpm lecture vs 130 parole",
    "analyseur de texte",
  ],
  category: "text-documents",
  faq: [
    {
      question: "Mon texte est-il enregistré sur un serveur ?",
      answer:
        "Non. Le comptage des mots, caractères et phrases tourne entier sur votre appareil sans envoi ; par exemple, un brouillon de 800 mots ou 5 000 caractères reste sur votre appareil, marche hors ligne gratis, et fermer l'onglet efface le texte. Rien n'est envoyé.",
    },
    {
      question: "Comment le temps de lecture est-il calculé ?",
      answer:
        "Il divise les mots par la vitesse moyenne de 200 à 238 mots par minute. Exemple : 800 mots à 200 MPM font 4,0 minutes et à 238 MPM font 3,4 minutes ; 1 500 mots font 6,3-7,5 minutes. Qui survole finit avant, qui étudie prend plus de temps.",
    },
    {
      question: "Quelle taille de texte accepte-t-il ?",
      answer:
        "Des collés jusqu'à 500 Ko ou environ 100 000 mots comptent aussitôt en local avec totaux en direct. Exemple : un brouillon de 800 mots plus 5 000 caractères traite en millisecondes, tandis que des romans de 100 000 mots peuvent ramer sur vieux mobiles. Divisez les chapitres si la frappe ralentit ; tout reste hors ligne sans envoi et s'efface à la fermeture.",
    },
    {
      question: "Quelle longueur pour chaque contenu ?",
      answer:
        "Visez des fils près de 280 caractères, des méta descriptions près de 155 caractères, des CV près de 500 mots, des articles près de 1 500 mots et des thèses au-delà de 10 000 mots. L'intention commande : les guides informatifs rendent longs, les fiches produit convertissent courtes. Comparez votre brouillon au tableau longueur-par-intention puis coupez les anecdotes ou étoffez les preuves selon le cas.",
    },
    {
      question: "Pourquoi Word et Docs comptent différemment ?",
      answer:
        "Microsoft Word traite composés à trait d'union, tirets, zones de texte, notes et suivi différemment des compteurs web. Google Docs ajoute en-têtes et commentaires en option, tandis que cet outil coupe sur espaces et ponctuation. Les caractères chinois, japonais et coréens sans espaces creusent les écarts. Attendez un à trois pour cent de variation et rendez toujours avec le compteur de votre institution.",
    },
  ],
  howTo: [
    {
      name: "Collez votre brouillon",
      text: "Collez un essai de 1 500 mots ou un article de 800 mots dans la grande zone pour compter aussitôt.",
    },
    {
      name: "Voyez les totaux en direct",
      text: "Voyez les totaux en direct des mots, caractères avec espaces, phrases, paragraphes et minutes estimées.",
    },
    {
      name: "Vérifiez temps et densité",
      text: "Vérifiez 800 mots à 200 MPM égalent 4,0 minutes, Flesch près de 65 et densité de 1,2 pour cent.",
    },
    {
      name: "Ajustez puis copiez",
      text: "Taillez les introductions gonflées selon l'intention de recherche, puis copiez les comptes ou le résumé pour votre commande.",
    },
  ],
  guide: [
    {
      heading: "Ce que fait le compteur de mots",
      body: "Instrument gratis pour romanciers, universitaires, journalistes et marketing qui doivent tenir des plafonds stricts sans rien installer. Il compte mots, caractères avec et sans espaces, phrases, paragraphes, minutes de lecture et répétitions de clés à la fois. Un essai de 1 500 mots, une chronique de 800 ou une fiche de 2 000 caractères rafraîchissent en direct pendant l'écriture. Tableau : titre 6-12 mots | résumé 150-250 | CV 400-600 | blog 1 200-1 800 | thèse 10 000+. Projection à 200 MPM étude et 238 MPM survol, ainsi 1 500 mots font 6,3-7,5 minutes. Les brouillons restent en mémoire du navigateur, sans réseau après le chargement, et s'effacent à la fermeture.",
    },
    {
      heading: "Comment comptage et temps marchent",
      body: "Tokenisation claire : l'espace délimite les mots, double comptage avec et sans vides, le point (. ? !) délimite les phrases et les lignes blanches délimitent les paragraphes. Durée égale aux mots sur vitesse : 800 mots à 200 MPM donnent 4,0 minutes, à 238 MPM donnent 3,4 ; un manuscrit de 1 500 donne 7,5 étude contre 6,3 survol. Densité égale aux répétitions sur tokens : 12 dans 1 000 mots égalent 1,2 %, tandis que 25 égalent 2,5 % avec risque de remplissage. Flesch sur 60 plus niveau sous 8 signalent une prose accessible ; les phrases de 28 mots plombent la note. Traits d'union, 3,14, contractions et CJK défient les découpeurs simples avec deux pour cent d'écart. Les collés de 500 Ko ou 100 000 mots restent fluides sur portable mais peuvent coincer sur vieux mobiles. Auditez les tournures avec /keyword-density. Voir /terms.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Collez 800 mots, confirmez 4,0 minutes à 200 MPM et Flesch près de 65, ajustez à 1 500 si l'intention demande un guide long et copiez le résumé. Second cas : des fils de 280 caractères et des métas de 155 avant de publier. Limite : comptage heuristique avec deux pour cent de variation face aux suites bureautiques ; ne remplace pas le compteur officiel des appels. Pour la lisibilité utilisez /readability-checker et pour la densité /keyword-density.",
    },
  ],
};

// Native FR keyword research (not translated): primary "validateur carte bancaire" +
// Luhn/test-card intent. Density 1-1.8%, LSI (Luhn, Visa/Mastercard/Amex, PAN,
// passerelle/sandbox), long-tail FR PAA ("4111 1111 passe Luhn ?", "comment valider ?").
// Safety-first: never use real PAN — gateway samples only (matches EN YMYL guard).
export const creditCardValidatorFr: Tool = {
  slug: "credit-card-validator",
  title: "Validateur de Cartes",
  short: "Test Luhn gratuit – 4111 sûr",
  description:
    "Validez les cartes gratuitement avec Luhn, Visa/MC/Amex. Essayez 4111 1111 en sécurité — 100 % local, privé hors ligne, jamais de vrais PAN.",
  icon: "CreditCard",
  keywords: [
    "validateur carte bancaire",
    "valider carte crédit luhn",
    "test luhn 4111",
    "détection visa mastercard amex",
    "4111 1111 1111 1111 passe luhn ?",
    "validateur cartes gratuit",
    "luhn checksum visa mastercard",
    "cartes test vs réelles",
    "valider numéro carte local",
  ],
  category: "developer",
  faq: [
    {
      question: "Que vérifie ce contrôleur ?",
      answer:
        "Il applique Luhn plus marque et longueur pour Visa, Mastercard et Amex. Exemple : l'échantillon 4111 1111 1111 1111 donne Visa 16 chiffres Luhn valide, tandis que changer un chiffre échoue. Valide signifie arithmétique correcte, jamais des fonds. Des lots de 200 échantillons s'évaluent en quelques secondes pour les exercices.",
    },
    {
      question: "Est-ce sûr de coller des numéros ici ?",
      answer:
        "Tout reste dans cet onglet sans rien garder, mais n'entrez jamais de vrais PAN ni de cartes clients. Utilisez seulement des échantillons comme 4111 1111 1111 1111 en sandbox. Les vrais chiffres peuvent fuiter via extensions ou écran partagé. Aucun envoi. Fermez l'onglet après les essais. Voir /terms.",
    },
    {
      question: "Accepte-t-il espaces et tirets ?",
      answer:
        "Oui. Les séparateurs partent avant le calcul, ainsi les échantillons formatés valident bien. Exemple : 4111-1111-1111-1111 et la variante espacée passent comme Visa. Nettoyez points ou lettres à la main. Des lots de 200 confirment la tolérance, quoique de vrais PAN ne doivent jamais apparaître même masqués.",
    },
    {
      question: "Pourquoi un Luhn valide refuse en caisse ?",
      answer:
        "Luhn prouve seulement des chiffres plausibles, ignorant expiration, CVV, adresse, vélocité et fonds qui décident l'autorisation. Exemple : 5500 0000 0000 0004 passe mathématique sans compte derrière. Servez-vous en pour chasser les coquilles, puis confirmez avec passerelle, 3D Secure et antifraude. Voir /terms.",
    },
  ],
  howTo: [
    {
      name: "Écrivez le numéro",
      text: "Écrivez un échantillon comme 4111 1111 1111 1111 ou 5500 0000 0000 0004 pour des essais sûrs.",
    },
    {
      name: "Lisez le résultat",
      text: "Voyez marque, longueur et verdict Luhn avec couleurs et conseils aussitôt.",
    },
    {
      name: "Vérifiez le format",
      text: "Confirmez que espaces et tirets partent seuls ; nettoyez points ou lettres à la main.",
    },
    {
      name: "Testez en sécurité",
      text: "Utilisez seulement des échantillons de documentation en sandbox, jamais de vrais PAN clients.",
    },
  ],
  guide: [
    {
      heading: "Ce que ce validateur prouve",
      body: "Il évalue des échantillons avec l'arithmétique Luhn plus marque et longueur pour apprendre. Exemple 1 : 4111 1111 1111 1111 donne Visa, 16 chiffres, Luhn valide en millisecondes. Exemple 2 : 5500 0000 0000 0004 donne Mastercard valide, tandis que 3782 822463 10005 signale Amex à 15 chiffres. Valide signifie checksum correct, jamais des fonds ni antifraude. Les résultats viennent aussitôt avec couleurs et conseils pour les exercices sandbox.",
    },
    {
      heading: "Comment Luhn et marques marchent",
      body: "Table logique : doublez un chiffre sur deux depuis la droite | sommez en ôtant 9 au-delà de 9 | total finissant par 0 = valide | 4 initial = Visa | 51-55 = Mastercard | 34/37 = Amex 15 chiffres. Pour 4111 1111 1111 1111 la somme fait 30, valide ; changer le dernier 1 en 2 fait 31, invalide. Espaces et tirets partent d'abord. Cas limite : les plages à 19 chiffres valident mathématique mais demandent la passerelle. Des lots de 200 traitent vite, quoique l'émetteur décide. Voir /terms.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Écrivez 4111 1111 1111 1111, voyez Visa 16 chiffres Luhn valide, changez le dernier chiffre et voyez l'échec pour sentir la sensibilité. Second essai : 3782 822463 10005 pour Amex à 15 chiffres. Limite : format pour apprendre uniquement, jamais approbation, crédit ni antifraude ; les vrais paiements exigent passerelle et banque. Jamais de vrais PAN. Pour l'hygiène après les formulaires utilisez /password-strength.",
    },
  ],
};

// Native FR keyword research (not translated): primary "test de dactylographie" +
// 62-MPM intent. Density 1-1.8%, LSI (MPM, précision, 60 secondes, 40 moyenne,
// caractères sur 5), long-tail FR PAA ("62 mpm à 97 % bien ?",
// "comment améliorer vitesse de frappe ?").
export const typingSpeedFr: Tool = {
  slug: "typing-speed-test",
  title: "Test de Dactylographie",
  short: "62 MPM gratuit, test 60 s",
  description:
    "Test de dactylographie gratuit de 60 secondes : atteignez 62 MPM à 97 % avec vitesse, précision et erreurs en direct. Manches rejouables, hors ligne.",
  icon: "TextSnippet",
  keywords: [
    "test de dactylographie",
    "test vitesse frappe",
    "mpm test",
    "test frappe clavier en ligne",
    "62 mpm à 97 pour cent bien ?",
    "test dactylo gratuit",
    "caractères divisés par 5 précision",
    "62 mpm vs 40 moyenne pro",
    "test d'écriture en ligne",
  ],
  category: "text-documents",
  faq: [
    {
      question: "Comment MPM et précision sont-ils calculés ?",
      answer:
        "MPM divise les caractères par cinq puis par minutes ; précision divise les frappes justes par le total fois 100. Exemple : 62 MPM à 97 % battent la moyenne de 40 ; 60 et plus signalent pro tandis que 80 et plus signalent élite. Des fenêtres de 60 secondes équilibrent l'endurance.",
    },
    {
      question: "Mes frappes sont-elles envoyées ?",
      answer:
        "Non. Chronométrage de 60 secondes, calcul MPM et historique restent entiers dans votre onglet sans sortie. Atteignez 62 MPM à 97 % après le premier chargement sans comptes. Les saisies s'évaporent à la réinitialisation tandis que le résumé reste visible aujourd'hui.",
    },
    {
      question: "Quels repères définissent chaque niveau ?",
      answer:
        "La moyenne tourne près de 40 MPM à 95 % ; 60 et plus indiquent un niveau pro tandis que 80 et plus une aisance experte. Exemple : 62 MPM à 97 % dépassent les bureaux typiques. Tenez la précision avant de courir après la vitesse brute.",
    },
    {
      question: "Quand changer de texte ?",
      answer:
        "Tournez les textes quand mémoriser la séquence gonfle la note sans mesurer l'habileté réelle. Exemple : répéter le même extrait de 60 secondes monte 62 MPM à 70 par familiarité. Introduisez vocabulaire et ponctuation inédits pour mesurer une habileté transférable pour de vrai.",
    },
    {
      question: "Pourquoi la précision pèse plus que la vitesse ?",
      answer:
        "Des rafales fautives exigent des corrections qui annulent le gain et abîment la lecture. Exemple : 80 MPM à 85 % rendent moins que 62 MPM à 97 % en sortie utile. Priorisez un doigté précis puis montez le rythme peu à peu.",
    },
  ],
  howTo: [
    {
      name: "Lancez le test",
      text: "Lancez le passage de 60 secondes avec texte visible et chrono pour ouvrir la tentative.",
    },
    {
      name: "Tapez l'exemple",
      text: "Reproduisez le texte en voyant MPM et précision en direct à chaque frappe.",
    },
    {
      name: "Surveillez les fautes",
      text: "Notez le rouge sur les tokens erronés qui demande un retour immédiat.",
    },
    {
      name: "Voyez le résumé",
      text: "Revoyez le 62 MPM à 97 %, puis relancez en cherchant des gains graduels.",
    },
  ],
  guide: [
    {
      heading: "Ce que le test de 60 secondes mesure",
      body: "Il évalue vitesse et précision via des passages de 60 secondes, MPM en direct, pourcentage et teintes d'erreur pour élèves, candidats et équipes. Lancez le départ et atteignez 62 MPM à 97 %. Table : 40 MPM 95 % = moyenne | 62 MPM 97 % = pro solide | 80 MPM 96 % = élite | sous 90 % = priorisez le contrôle | 60 secondes = standard d'endurance. Exemple : un élève monte de 48 MPM 94 % à 62 MPM 97 % en quinze jours. Il ignore les espaces extra en fin de ligne et normalise les guillemets. Voir /terms.",
    },
    {
      heading: "Comment MPM et précision se calculent",
      body: "MPM divise les caractères par cinq puis par minutes ; précision divise les réussites par essais fois 100. 62 MPM à 97 % battent la moyenne de 40 ; 60 et plus c'est pro, 80 et plus élite. Des échantillons de 60 secondes équilibrent fond et pointe ; les sprints courts gonflent. Exemple : un profil de 70 MPM à 89 % descend à 62 MPM à 97 % et rend plus net. Attention : tenir retour compte comme essai et coller du texte invalide la manche. Coupez les aides, tenez la posture et pratiquez une ponctuation variée. Voir /terms.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Lancez la manche de 60 secondes, transcrivez jusqu'à 62 MPM 97 %, inspectez la carte d'erreurs et relancez visant 65 MPM sans perdre en précision. Second cas : de 48 MPM 94 % à 62 MPM 97 % en quinze jours avec routine. Limite : entraînement sans certification officielle ni garantie d'embauche ; ne corrige pas l'ergonomie. Pour dicter par la voix sur Chrome ou Edge utilisez /speech-to-text.",
    },
  ],
};

// Native FR keyword research (not translated): primary "détecteur de plagiat" +
// 5-grammes/800-mots intent. Density 1-1.8%, LSI (5-grammes, originalité,
// unicité 96 %, fenêtre glissante), long-tail FR PAA ("800 mots à 96 % original ?",
// "comment paraphraser les doublons ?").
export const plagiarismCheckerFr: Tool = {
  slug: "plagiarism-checker",
  title: "Détecteur de Plagiat",
  short: "800 mots 96 % unique gratuit",
  description:
    "Détecteur de plagiat gratuit : notez 800 mots à 96 % unique avec balayage 5-grammes. 100 % local, hors ligne, sans inscription.",
  icon: "FindReplace",
  keywords: [
    "détecteur de plagiat",
    "vérificateur originalité",
    "détecteur plagiat en ligne",
    "vérifier plagiat texte",
    "800 mots à 96 pour cent original ?",
    "détecteur plagiat gratuit",
    "fenêtre 5 grammes correspondance",
    "95 contre 70 réécrire",
    "vérificateur unicité",
  ],
  category: "text-documents",
  faq: [
    {
      question: "Interroge-t-il des index de recherche externes ?",
      answer:
        "Non. Il évalue la répétition interne plus une référence collée en option sans explorer le web. Exemple : des textes de 800 mots à 96 % unique montrent zéro chevauchement de 5 mots. La juxtaposition avec la source souligne les fenêtres coïncidentes à réviser.",
    },
    {
      question: "Mon texte est-il envoyé en utilisant ce détecteur ?",
      answer:
        "Non. L'analyse glissante 5-grammes tourne entière dans votre onglet sans sortie. Évaluez des textes de 800 mots à 96 % après le premier chargement sans comptes. Le manuscrit s'évapore à la fermeture tandis que le surlignage reste visible aujourd'hui.",
    },
    {
      question: "Qu'est-ce qu'une formulation dupliquée ?",
      answer:
        "Des séquences identiques de cinq mots baissent le pourcentage en proportion dans le balayage glissant. Exemple : 95 % et plus sans fenêtres surlignées suggère l'originalité tandis que 85-94 % demande révision ; le boilerplate gonfle les coïncidences. Confrontez vos sources pour voir quoi paraphraser avant de rendre vos 800 mots.",
    },
    {
      question: "Quand ajouter une comparaison de source ?",
      answer:
        "Incluez des passages de référence pour vérifier des citations, auditer des copies et traquer l'auto-plagiat entre publications. Exemple : collez votre article précédent à côté du brouillon et révélez des introductions recyclées. Réglez les chevauchements par citation ou réécriture.",
    },
    {
      question: "Pourquoi les textes courts notent optimiste ?",
      answer:
        "Peu de fenêtres réduisent la probabilité de choc et gonflent l'unicité artificiellement. Exemple : des résumés de 100 mots atteignent souvent 100 % malgré les clichés. Exigez 300 mots ou plus pour une mesure crédible et lisez les sorties brèves avec prudence.",
    },
  ],
  howTo: [
    {
      name: "Collez le texte principal",
      text: "Insérez votre texte de 800 mots qui exige 96 % d'unicité pour publier.",
    },
    {
      name: "Ajoutez la source en option",
      text: "Apportez le passage de référence pour comparer les chevauchements directs 5-grammes si vous l'avez.",
    },
    {
      name: "Lancez l'analyse",
      text: "Lancez le balayage en revoyant le 96 % plus les coïncidences de cinq mots surlignées.",
    },
    {
      name: "Réécrivez les doublons",
      text: "Paraphrasez les fenêtres marquées puis re-balayez en confirmant un meilleur pourcentage d'originalité.",
    },
  ],
  guide: [
    {
      heading: "Ce que le pourcentage d'unicité montre",
      body: "Il mesure l'originalité via des fenêtres glissantes 5-grammes détectant les échos internes plus les chevauchements de références en option pour étudiants, blogs et équipes. Soumettez des textes de 800 mots et voyez 96 % unique avec des répétitions de cinq mots surlignées. Table : 95-100 % = original poli | 85-94 % = révisez les fenêtres | 70-84 % = réécriture de fond | sous 70 % = risque de duplication | sous 100 mots = non fiable. Exemple : un chapitre de thèse à 800 mots à 96 % passe ; le boilerplate méthodologique se marque. Il ignore les citations signalées et les minuscules. Voir /terms.",
    },
    {
      heading: "Comment les 5-grammes marquent",
      body: "Des fenêtres contiguës de cinq tokens glissent sur le texte normalisé, comparent en dedans et aux sources collées, et retranchent par collision. 95 % et plus sans surlignages indique la fraîcheur, tandis que des slogans répétés plombent la note. Exemple : une landing de 800 mots à 78 % par slogans recyclés monte à 94 % en paraphrasant. Attention : des idiotismes comme afin de coïncident toujours, le matériau cité exige exclusion et les tables gonflent les chevauchements. Comparez vos sources directement, écartez les blocs cités et exigez 300 mots ou plus. Voir /terms.",
    },
    {
      heading: "Exemple chiffré et limites",
      body: "Chargez votre brouillon de 800 mots plus source en option, notez le 96 %, reformulez les fenêtres de cinq mots surlignées et re-balayez en confirmant la hausse. Portée locale : hors index internet et bases académiques ; la vérification complète exige des services externes. Les passages cités coïncident aussi : marquez-les en citation. Pour compter mots et temps de lecture utilisez /fr/word-counter.",
    },
  ],
};

// Native FR keyword research (not translated): primary "simulateur prêt immobilier" +
// mensualité/3 % intent. Density 1-1.8%, LSI (TIN, TAEG, Euribor, amortissement,
// 80 % LTV), long-tail FR PAA ("combien coûte 240 000 euros sur 30 ans ?",
// "taux fixe ou variable ?"). YMYL: planning-only banner via localized
// YMYLDisclaimer + /terms closers (matches EN guard).
export const mortgageCalculatorFr: Tool = {
  slug: "mortgage-calculator",
  title: "Simulateur Prêt Immobilier",
  short: "Mensualité TIN/TAEG",
  description:
    "Calculez votre mensualité et intérêts. Vérifiez 240 000 € à 3 % sur 30 ans : 1 012 € par mois, privé hors ligne, sans inscription.",
  icon: "AccountBalance",
  keywords: [
    "simulateur prêt immobilier",
    "calcul mensualité prêt",
    "simulateur crédit immobilier",
    "tableau amortissement prêt",
    "combien coûte 240 000 euros sur 30 ans ?",
    "simulateur prêt gratuit",
    "capital vs intérêts amortissement",
    "15 vs 30 ans prêt 2026",
    "taux fixe vs variable euribor",
  ],
  category: "finance",
  faq: [
    {
      question: "Comment ma mensualité est-elle calculée ?",
      answer:
        "Elle sort de M = C×t×(1+t)^n÷((1+t)^n−1), où C est le capital, t le taux mensuel (annuel÷12÷100) et n les mois. Exemple : 240 000 € à 3 % sur 30 ans donnent t=0,0025 et n=360, ainsi la mensualité tombe près de 1 012 € avec des intérêts à vie près de 124 000 €. Amortir raccourcit la durée. Voir /terms.",
    },
    {
      question: "Ce simulateur est-il un conseil financier ?",
      answer:
        "Non. C'est seulement un outil informatif de planification, pas un conseil financier. Impôts, assurances, frais de dossier et révisions du variable restent hors de chaque chiffre. Exemple : une assurance de 200 € mensuels ajoute 2 400 € par an par-dessus. Consultez votre banque pour les chiffres exacts et voir /terms avant de signer.",
    },
    {
      question: "Mes données restent-elles privées ?",
      answer:
        "Oui. Le calcul ne sort jamais de ce mobile. Les sommes courent ici sans envois ni inscription. Exemple : un essai à 300 000 € reste privé, ne demande aucun réseau et s'efface à la fermeture de l'onglet. Il oriente la planification seulement, ne conseille pas. Voir /terms.",
    },
    {
      question: "Ce tableau d'amortissement est-il exact ?",
      answer:
        "Il est exact pour capital et intérêts à taux fixe, d'habitude au centime des tableaux bancaires. Commissions, provisions, pénalités et changements de taux restent dehors. Exemple : 2 % contre 3 % sur 240 000 € diffèrent d'environ 125 € par mois. Confirmez les chiffres exacts avec votre offre et voir /terms.",
    },
    {
      question: "Choisir un prêt à 15 ou à 30 ans ?",
      answer:
        "Prenez 30 ans pour la souplesse (1 012 € sur 240 000 € à 3 %) ou 15 pour l'économie (environ 1 650 € par mois mais ~57 000 € d'intérêts en moins à vie). Exemple : qui cherche du flux préfère 30 ans, qui approche de la retraite préfère 15. Pesez stabilité d'emploi, matelas et déductions d'abord. Voir /terms.",
    },
    {
      question: "Taux fixe ou variable avec Euribor ?",
      answer:
        "Le fixe verrouille la mensualité (3 % toujours 1 012 €) et le variable s'attache à l'Euribor plus marge, bon marché aujourd'hui et incertain demain. Exemple : Euribor à 3 % plus 1 % égale le fixe, mais chaque révision semestrielle peut monter la mensualité de centaines d'euros. Comparez TAEG, pas seulement TIN, et fixez un plafond que votre salaire tient. Voir /terms.",
    },
  ],
  howTo: [
    {
      name: "Posez le prêt",
      text: "Posez prix 300 000 €, taux 3 % fixe annuel, durée 30 ans avec 360 mois, et confirmez devise et première échéance.",
    },
    {
      name: "Ajoutez l'apport",
      text: "Ajoutez apport 60 000 € (20 %), vérifiez capital 240 000 €, LTV 80 % et seuil d'assurance avant de voir les résultats.",
    },
    {
      name: "Voyez la mensualité",
      text: "Revoyez mensualité près de 1 012 €, intérêts à vie près de 124 000 €, coût total 364 000 € et tableau annuel avec calme.",
    },
    {
      name: "Exportez et comparez",
      text: "Exportez le résumé CSV, puis comparez 15 contre 30 ans et 2 % contre 3 % pour chiffrer l'écart d'intérêts.",
    },
  ],
  guide: [
    {
      heading: "Qu'est-ce que la mensualité",
      body: "Mensualité fixe qui rembourse capital plus intérêts pendant 15 à 30 ans, avec des premières années presque tout en intérêts puis plus de capital. Exemple : 240 000 € à 3 % sur 30 ans (t=0,0025, n=360) donnent mensualité près de 1 012 €, total près de 364 000 € et intérêts près de 124 000 €. Le vrai coût ajoute des couches : | Composante | Mensuel | Annuel | Capital + intérêts | 1 012 € | 12 144 € | Impôts et taxes | 200 € | 2 400 € | Assurance habitation | 100 € | 1 200 € | Assurance prêt sous 20 % d'apport | 120 € | 1 440 € | Charges | 75 € | 900 € |. Notre simulateur modélise capital plus intérêts avec tableau annuel, pour comparer les apports avant la banque. Cas limite : les révisions du variable peuvent monter la mensualité après la période initiale. Limite : sans frais de dossier ni déductions. Prévoyez les remboursements avec /mortgage-overpayment-calculator. Planifie seulement, ne conseille pas. Voir /terms.",
    },
    {
      heading: "Comment la mensualité se calcule",
      body: "Formule M = C×t×(1+t)^n/((1+t)^n−1), avec C capital, t taux mensuel (annuel÷12÷100) et n mois. Pour 240 000 € à 3 % sur 30 ans, t=0,0025 et n=360, donnent 1 012 € ; 1 012×360 font 364 000 € totaux, moins capital font 124 000 € intérêts. À 15 ans (n=180) : la mensualité monte vers 1 650 €, le total tombe vers 297 000 € et les intérêts vers 57 000 €, écart d'environ 67 000 € contre 30 ans. Les apports sous 20 % demandent une assurance près de 120 € mensuels jusqu'à 80 % LTV, environ 1 440 € annuels par-dessus. Cas limite : des versements bimensuels créent une mensualité extra annuelle et raccourcissent la durée sans bruit. Limite : capital-intérêts à taux fixe, sans provisions. Calculez ce que vous pouvez payer via /home-affordability-calculator. Oriente seulement, pas un conseil financier. Voir /terms.",
    },
    {
      heading: "Exemple chiffré : 240 000 € à 3 %",
      body: "Posez 240 000 € à 3 % sur 30 ans, confirmez 1 012 € par mois, 124 000 € intérêts et 364 000 € totaux, exportez le CSV et comparez avec 15 ans (1 650 €, 57 000 € intérêts). Second cas : 2 % contre 3 % diffèrent d'environ 125 € mensuels sur même capital. Gardez l'offre ferme, revoyez TAEG contre TIN et Euribor plus marge si variable. Hors assurances obligatoires et impôts locaux ; votre banque clôt les chiffres. Pour démarrer plus tôt utilisez /mortgage-overpayment-calculator.",
    },
  ],
};
