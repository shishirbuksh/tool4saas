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
// mortgage-calculator is the top finance hero (HERO_SLUGS 0.9, YMYL) —
// together the 8 pilots cover every GSC top-page tool URL plus top heroes.
export const ES_PILOT_SLUGS = new Set<string>([
  "invoice-generator",
  "qr-code-generator",
  "credit-card-validator",
  "unit-converter",
  "typing-speed-test",
  "plagiarism-checker",
  "word-counter",
  "mortgage-calculator",
]);

// French pilot: invoice-generator only (highest-ROI tool, proves the N-locale
// registry before wider fr expansion).
export const FR_PILOT_SLUGS = new Set<string>(["invoice-generator"]);

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

// Lookup native FR Tool by slug (undefined for non-pilots).
export function getFrTool(slug: string): Tool | undefined {
  if (slug === "invoice-generator") return invoiceGeneratorFr;
  return undefined;
}
