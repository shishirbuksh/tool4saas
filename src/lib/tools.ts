export const ICON_NAMES = [
  "BuildOutlined",
  "ReceiptLong",
  "QrCode2",
  "Description",
  "TextSnippet",
  "Key",
  "DataObject",
  "Subject",
  "Image",
  "Notes",
  "Straighten",
  "Cake",
  "ColorLens",
  "Code",
  "Link",
  "Difference",
  "Fingerprint",
  "LocalOffer",
  "Shuffle",
  "FormatListNumbered",
  "Transform",
  "Tag",
  "Percent",
  "Schedule",
  "Html",
  "FindReplace",
  "VpnKey",
  "TableChart",
  "DateRange",
  "FitnessCenter",
  "Restaurant",
  "Contrast",
  "Replay",
  "BarChart",
  "VolumeUp",
  "Http",
  "Spellcheck",
  "Numbers",
  "Gradient",
  "Markunread",
  "Abc",
  "AttachFile",
  "EmojiEmotions",
  "Palette",
  "AccountBalance",
  "Public",
  "Sell",
  "CreditCard",
  "VerifiedUser",
  "PhotoSizeSelectLarge",
  "Timer",
  "Casino",
  "Toll",
  "AttachMoney",
  "CalendarToday",
  "Search",
  "PictureAsPdf",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export type Tool = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  keywords: string[];
  category: string; // id from CATEGORIES
  faq: { question: string; answer: string }[];
  howTo: { name: string; text: string }[];
};

export type Category = {
  id: string;
  label: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "text-documents",
    label: "Text & Documents",
    description:
      "Count, convert, clean and transform text — word counters, case tools, diff checkers and more.",
  },
  {
    id: "business",
    label: "Business & Writing",
    description:
      "Create invoices, resumes and other business documents without leaving your browser.",
  },
  {
    id: "developer",
    label: "Developer Tools",
    description:
      "Encode, decode, hash, format and validate data and code with developer-focused utilities.",
  },
  {
    id: "converters",
    label: "Converters",
    description:
      "Convert between units, formats, data URLs and number systems in a single click.",
  },
  {
    id: "generators",
    label: "Generators",
    description:
      "Generate passwords, UUIDs, random values, placeholders and other useful data.",
  },
  {
    id: "images-design",
    label: "Images & Design",
    description:
      "Generate QR codes, compress and resize images, and work with color and gradients.",
  },
  {
    id: "pdf",
    label: "PDF Tools",
    description:
      "Merge, compress and convert PDFs and images to PDF — all offline in your browser.",
    // NOTE: intentionally thin (3 tools: image-to-pdf, pdf-merge, pdf-compress) — expanding PDF would require
    // heavy wasm (pdf-lib) bloat; kept lean to preserve client-only bundle size < 250kB per route.
  },
  {
    id: "calculators",
    label: "Calculators",
    description:
      "Everyday calculators for percentages, loans, tax, BMI and more.",
  },
  {
    id: "finance",
    label: "Finance & Money",
    description:
      "Mortgage, investment, salary and tax calculators for planning — informational only, not financial advice.",
  },
  {
    id: "health",
    label: "Health & Fitness",
    description:
      "Calorie, BMI and macro calculators for informational purposes only — not medical advice, consult a professional.",
  },
  {
    id: "seo",
    label: "SEO & Marketing",
    description:
      "Meta tags, sitemaps and robots.txt generators to rank your content — all offline.",
  },
  {
    id: "time",
    label: "Time & Date",
    description:
      "Calculate ages, dates, timezones and count time with clocks and converters.",
  },
];

export const tools: Tool[] = [
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    short: "Create & download professional invoices",
    description:
      "Build clean, professional PDF-ready invoices with your logo, line items, taxes and notes. Free and private — everything stays in your browser.",
    icon: "ReceiptLong",
    keywords: ["invoice generator", "free invoice maker", "download invoice pdf"],
    category: "business",
    faq: [{"question":"Is the invoice generator free to use?","answer":"Yes, it is completely free and runs in your browser. Your data never leaves your device."},{"question":"Can I download or print the invoice as PDF?","answer":"Yes. Use your browser's Print (Ctrl/Cmd+P) and choose 'Save as PDF' — the invoice is formatted for clean printing."}],
    howTo: [{"name":"Enter sender details","text":"Enter your business details and invoice number in the sender section."},{"name":"Add line items","text":"Add line items with description, quantity, and rate; set the tax percentage if needed."},{"name":"Download or print","text":"Preview the invoice and use Print / Save as PDF to download it."}],
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    short: "Generate QR codes for links, text & more",
    description:
      "Generate downloadable QR codes for URLs, text, email, phone and WiFi. Customize size and download as PNG in one click.",
    icon: "QrCode2",
    keywords: ["qr code generator", "free qr code", "qr code download png"],
    category: "images-design",
    faq: [{"question":"Do QR codes I generate expire?","answer":"No. The QR code encodes your text or URL directly, so it works indefinitely without any server."},{"question":"Can I download the QR code as an image?","answer":"Yes, you can download it as a PNG at your chosen size in one click."}],
    howTo: [{"name":"Enter content","text":"Type or paste the URL, text, or contact details you want to encode."},{"name":"Choose size","text":"Choose the QR code size you need."},{"name":"Download","text":"Click download to save the QR code as a PNG image."}],
  },
  {
    slug: "resume-builder",
    title: "Resume Builder",
    short: "Build a clean resume and export to PDF",
    description:
      "Craft a tidy, ATS-friendly resume with sections for experience, education and skills. Preview live and print to PDF.",
    icon: "Description",
    keywords: ["resume builder", "free cv maker", "online resume creator"],
    category: "business",
    faq: [{"question":"Is my resume saved on a server?","answer":"No. Everything stays in your browser. You can print or save the resume to PDF locally."},{"question":"Will the resume pass ATS (applicant tracking systems)?","answer":"The layout uses standard headings and clean text, which is ATS-friendly. Avoid images in the body for best results."}],
    howTo: [{"name":"Add your profile","text":"Fill in your name, headline, summary, and skills."},{"name":"Add experience and education","text":"Add your work experience and education entries."},{"name":"Export","text":"Preview the resume and print or save it as a PDF."}],
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    short: "Count words, characters & reading time",
    description:
      "Instantly count words, characters, sentences and paragraphs. Estimate reading time and check keyword density for your writing.",
    icon: "TextSnippet",
    keywords: ["word counter", "character counter", "online text tool"],
    category: "text-documents",
    faq: [{"question":"Does the word counter store my text?","answer":"No. Counting happens entirely in your browser; nothing is uploaded."},{"question":"How is reading time calculated?","answer":"It divides the word count by an average reading speed of about 200 to 238 words per minute."}],
    howTo: [{"name":"Paste your text","text":"Paste or type your text into the input box."},{"name":"Read the stats","text":"Read the live counts for words, characters, sentences, and paragraphs."},{"name":"Refine","text":"Use reading-time and keyword stats to refine your writing."}],
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    short: "Strong random passwords in one click",
    description:
      "Create secure, random passwords with customizable length and character sets using your browser's crypto engine. Copy and use instantly.",
    icon: "Key",
    keywords: ["password generator", "strong password", "random password generator"],
    category: "generators",
    faq: [{"question":"Are the passwords truly random?","answer":"Yes. They are created with your browser's cryptographic random generator (crypto.getRandomValues)."},{"question":"Can I use the generator offline?","answer":"Yes. The tool works fully offline in your browser."}],
    howTo: [{"name":"Set options","text":"Set the password length and choose which character sets to include."},{"name":"Generate","text":"Click generate to create a random password."},{"name":"Copy","text":"Copy the password and use it where you need it."}],
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    short: "Format, validate & minify JSON",
    description:
      "Beautify, validate and minify JSON instantly. Catch syntax errors with clear messages — all processing happens in your browser.",
    icon: "DataObject",
    keywords: ["json formatter", "json validator", "format json online"],
    category: "developer",
    faq: [{"question":"Is my JSON sent anywhere?","answer":"No. Formatting and validation happen locally in your browser."},{"question":"Can it handle large JSON files?","answer":"It processes typical payloads instantly; extremely large inputs may be limited by your device's memory."}],
    howTo: [{"name":"Paste JSON","text":"Paste your JSON into the input area."},{"name":"Process","text":"Click format or minify to process it."},{"name":"Copy or fix","text":"Copy the cleaned output or fix any highlighted errors."}],
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    short: "UPPER, lower, Title, camel & more",
    description:
      "Convert text between uppercase, lowercase, title case, sentence case, camelCase and snake_case in a single click.",
    icon: "Subject",
    keywords: ["case converter", "text case changer", "uppercase lowercase converter"],
    category: "text-documents",
    faq: [{"question":"Which text cases are supported?","answer":"Uppercase, lowercase, title case, sentence case, camelCase and snake_case."},{"question":"Does it change my numbers or punctuation?","answer":"It transforms letters according to the selected rule and preserves the rest of your text."}],
    howTo: [{"name":"Paste text","text":"Paste the text you want to transform."},{"name":"Pick a case","text":"Pick the case (upper, lower, title, sentence, camel, snake)."},{"name":"Copy","text":"Copy the converted text."}],
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    short: "Shrink images without uploading",
    description:
      "Compress and resize JPG/PNG images right in your browser. Reduce file size before uploading, with no quality loss you can't see — nothing is sent to a server.",
    icon: "Image",
    keywords: ["image compressor", "compress jpg online", "reduce image size"],
    category: "images-design",
    faq: [{"question":"Are my images uploaded to a server?","answer":"No. Compression happens in your browser; files are never uploaded."},{"question":"Will I lose image quality?","answer":"You control the quality and size; lighter compression reduces file size with minimal visible quality loss."}],
    howTo: [{"name":"Select an image","text":"Select or drop a JPG or PNG image from your device."},{"name":"Adjust quality","text":"Adjust the quality or target size."},{"name":"Download","text":"Download the compressed image."}],
  },
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    short: "Placeholder text in one click",
    description:
      "Generate Lorem Ipsum placeholder paragraphs, sentences or words for mockups and designs. Copy to clipboard instantly.",
    icon: "Notes",
    keywords: ["lorem ipsum generator", "placeholder text", "lipsum"],
    category: "generators",
    faq: [{"question":"What is Lorem Ipsum used for?","answer":"It is placeholder text used to mock up designs and layouts before the final content is ready."},{"question":"Can I generate words instead of paragraphs?","answer":"Yes. You can generate paragraphs, sentences or a specific number of words."}],
    howTo: [{"name":"Choose format","text":"Choose paragraphs, sentences, or words."},{"name":"Set amount","text":"Set the amount you need."},{"name":"Generate","text":"Generate and copy the placeholder text."}],
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    short: "Convert length, weight, temp & more",
    description:
      "Convert between common units of length, weight, temperature, time and data — fast and accurate, right in your browser.",
    icon: "Straighten",
    keywords: ["unit converter", "convert units online", "length weight converter"],
    category: "converters",
    faq: [{"question":"Which units can I convert?","answer":"Length, weight, temperature, time and data units, among others."},{"question":"Is the unit converter accurate?","answer":"Yes. Conversions use standard factors and temperature uses exact formulas."}],
    howTo: [{"name":"Select quantity","text":"Select the quantity (length, weight, temperature, and more)."},{"name":"Enter value","text":"Enter the value and choose the from and to units."},{"name":"Read result","text":"Read the converted result instantly."}],
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    short: "Find your exact age & next birthday",
    description:
      "Calculate your exact age in years, months and days, plus your next birthday and the weekday you were born — all client-side.",
    icon: "Cake",
    keywords: ["age calculator", "calculate my age", "birthday calculator"],
    category: "time",
    faq: [{"question":"How precise is the age calculation?","answer":"It calculates exact years, months and days between two dates."},{"question":"Does it show my birth day of the week?","answer":"Yes. It shows the weekday you were born and your next birthday."}],
    howTo: [{"name":"Enter birth date","text":"Enter your date of birth."},{"name":"Optional compare date","text":"Optionally enter a second date to compare."},{"name":"See result","text":"See your exact age and next birthday."}],
  },
  {
    slug: "color-converter",
    title: "Color Converter",
    short: "HEX, RGB & HSL conversions",
    description:
      "Convert colors between HEX, RGB and HSL and pick colors with a visual picker. Copy any format you need.",
    icon: "ColorLens",
    keywords: ["color converter", "hex to rgb", "rgb to hsl"],
    category: "images-design",
    faq: [{"question":"Which color formats are supported?","answer":"HEX, RGB and HSL, with a visual color picker."},{"question":"Can I copy any format?","answer":"Yes. Copy HEX, RGB or HSL with one click."}],
    howTo: [{"name":"Enter a color","text":"Enter a HEX, RGB, or HSL value, or pick a color."},{"name":"Switch formats","text":"Switch between formats as needed."},{"name":"Copy","text":"Copy the format you want to use."}],
  },
  {
    slug: "base64-tool",
    title: "Base64 Encode / Decode",
    short: "Encode and decode Base64 text",
    description:
      "Encode text to Base64 or decode Base64 back to text, with full Unicode support. Handy for debugging tokens and data URLs.",
    icon: "Code",
    keywords: ["base64 encoder", "base64 decoder", "encode base64 online"],
    category: "developer",
    faq: [{"question":"Does Base64 encrypt my data?","answer":"No. Base64 is encoding, not encryption. Do not use it to protect secrets."},{"question":"Is Unicode text supported?","answer":"Yes. It handles Unicode and UTF-8 text correctly."}],
    howTo: [{"name":"Paste input","text":"Paste the text or Base64 string."},{"name":"Choose mode","text":"Choose encode or decode."},{"name":"Copy output","text":"Copy the output."}],
  },
  {
    slug: "url-encoder",
    title: "URL Encoder / Decoder",
    short: "Encode & decode URL components",
    description:
      "Percent-encode or decode URLs and query strings safely. Great for building links and debugging web requests.",
    icon: "Link",
    keywords: ["url encoder", "url decoder", "encode url online"],
    category: "developer",
    faq: [{"question":"When should I URL-encode text?","answer":"When putting text into URLs or query strings so special characters do not break the link."},{"question":"Is my data uploaded?","answer":"No. Encoding and decoding happen in your browser."}],
    howTo: [{"name":"Paste input","text":"Paste the text or URL you want to encode or decode."},{"name":"Choose mode","text":"Choose encode or decode."},{"name":"Copy result","text":"Copy the result."}],
  },
  {
    slug: "text-diff",
    title: "Text Diff Checker",
    short: "Compare two texts side by side",
    description:
      "Compare two blocks of text and see added and removed words highlighted. Perfect for reviewing changes and edits.",
    icon: "Difference",
    keywords: ["text diff", "compare text", "diff checker online"],
    category: "text-documents",
    faq: [{"question":"What does the diff checker compare?","answer":"It compares two texts and highlights added and removed words."},{"question":"Is my text stored?","answer":"No. Comparison runs locally in your browser."}],
    howTo: [{"name":"Paste original","text":"Paste the original text in the first box."},{"name":"Paste modified","text":"Paste the modified text in the second box."},{"name":"Review","text":"Review the highlighted additions and removals."}],
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    short: "SHA-1 / 256 / 512 of any text",
    description:
      "Generate SHA-1, SHA-256, SHA-384 or SHA-512 hashes of your text using the browser's Web Crypto API. Nothing is uploaded.",
    icon: "Fingerprint",
    keywords: ["hash generator", "sha256 generator", "text to hash"],
    category: "developer",
    faq: [{"question":"What hashing algorithms are available?","answer":"SHA-1, SHA-256, SHA-384 and SHA-512."},{"question":"Is hashing the same as encryption?","answer":"No. A hash is one-way and cannot be reversed to recover the original text."}],
    howTo: [{"name":"Enter text","text":"Type or paste the text to hash."},{"name":"Select algorithm","text":"Select the algorithm (SHA-1, SHA-256, SHA-384, or SHA-512)."},{"name":"Copy hash","text":"Copy the generated hash."}],
  },
  {
    slug: "slug-generator",
    title: "Slug Generator",
    short: "Turn titles into URL slugs",
    description:
      "Convert titles or a list of topics into clean, SEO-friendly URL slugs. Supports hyphen or underscore separators and bulk input.",
    icon: "LocalOffer",
    keywords: ["slug generator", "url slug", "seo slug maker"],
    category: "generators",
    faq: [{"question":"What is a slug?","answer":"A URL-friendly version of a title, for example 'my-blog-post', used in web addresses."},{"question":"Can I generate many slugs at once?","answer":"Yes. Paste a list of titles and generate slugs in bulk."}],
    howTo: [{"name":"Paste titles","text":"Paste a title or a list of titles."},{"name":"Set options","text":"Choose hyphen or underscore and bulk mode if needed."},{"name":"Copy slugs","text":"Copy the generated slugs."}],
  },
  {
    slug: "random-number",
    title: "Random Number Generator",
    short: "Secure random numbers & lists",
    description:
      "Generate secure random integers within a range, in batches, optionally unique. Powered by your browser's crypto engine.",
    icon: "Shuffle",
    keywords: ["random number generator", "random integer", "secure random"],
    category: "generators",
    faq: [{"question":"Are the numbers cryptographically secure?","answer":"Yes, generated with your browser's crypto engine."},{"question":"Can I generate unique random numbers?","answer":"Yes. Enable the unique option to avoid duplicates in a batch."}],
    howTo: [{"name":"Set range","text":"Set the minimum and maximum range."},{"name":"Set options","text":"Choose how many numbers and whether they must be unique."},{"name":"Generate","text":"Generate and copy the results."}],
  },
  {
    slug: "text-list",
    title: "List Tools",
    short: "Sort, dedupe, shuffle & reverse",
    description:
      "Sort lines alphabetically, remove duplicates and blank lines, reverse or shuffle a list. Handy for quick text cleanup.",
    icon: "FormatListNumbered",
    keywords: ["sort lines", "remove duplicates", "list tools online"],
    category: "text-documents",
    faq: [{"question":"What can I do with a list of lines?","answer":"Sort alphabetically, remove duplicates and blank lines, reverse or shuffle."},{"question":"Is my data uploaded?","answer":"No. All processing is local."}],
    howTo: [{"name":"Paste list","text":"Paste your list, one item per line."},{"name":"Pick action","text":"Pick an action: sort, dedupe, reverse, or shuffle."},{"name":"Copy result","text":"Copy the processed list."}],
  },
  {
    slug: "base-converter",
    title: "Base Converter",
    short: "Binary, hex, decimal & more",
    description:
      "Convert numbers between binary, octal, decimal and hexadecimal (and any base 2–36). Great for developers and students.",
    icon: "Transform",
    keywords: ["base converter", "binary to hex", "hex to decimal"],
    category: "developer",
    faq: [{"question":"Which number bases are supported?","answer":"Binary, octal, decimal and hexadecimal, plus any base from 2 to 36."},{"question":"Is it useful for learning?","answer":"Yes. It is handy for developers and students working with different number systems."}],
    howTo: [{"name":"Enter number","text":"Enter the number and its current base."},{"name":"Choose target base","text":"Choose the target base (2 to 36)."},{"name":"Copy value","text":"Read and copy the converted value."}],
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    short: "Generate v4 UUIDs in bulk",
    description:
      "Generate RFC-4122 v4 UUIDs using your browser's crypto. Create one or many at once, optionally uppercase, and copy them all.",
    icon: "Tag",
    keywords: ["uuid generator", "generate uuid", "random uuid"],
    category: "generators",
    faq: [{"question":"What is a UUID?","answer":"A universally unique identifier (RFC 4122), often used as a unique ID in software."},{"question":"Are the UUIDs really unique?","answer":"They use random v4 generation; collisions are astronomically unlikely."}],
    howTo: [{"name":"Set count","text":"Choose how many UUIDs to generate."},{"name":"Toggle case","text":"Toggle uppercase if needed."},{"name":"Copy UUIDs","text":"Copy the generated UUIDs."}],
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    short: "Percent of, what % & change",
    description:
      "Work out a percentage of a number, what percent one number is of another, and increases or decreases — instantly.",
    icon: "Percent",
    keywords: ["percentage calculator", "percent of a number", "percentage change"],
    category: "calculators",
    faq: [{"question":"What can I calculate?","answer":"A percentage of a number, what percent one number is of another, and percentage increase or decrease."},{"question":"Is it free?","answer":"Yes, fully free and it runs in your browser."}],
    howTo: [{"name":"Pick type","text":"Pick the percentage calculation type."},{"name":"Enter numbers","text":"Enter the numbers involved."},{"name":"Read result","text":"Read the result."}],
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    short: "Epoch ↔ human-readable date",
    description:
      "Convert Unix epoch timestamps to dates and back, see the current epoch, and inspect both local and UTC time.",
    icon: "Schedule",
    keywords: ["timestamp converter", "epoch converter", "unix time"],
    category: "time",
    faq: [{"question":"What is a Unix timestamp?","answer":"The number of seconds since January 1, 1970 UTC (the Unix epoch)."},{"question":"Can I convert both ways?","answer":"Yes. Convert epoch to a date and a date back to epoch, in local and UTC."}],
    howTo: [{"name":"Enter value","text":"Enter a Unix timestamp or a date and time."},{"name":"Switch view","text":"Switch between local and UTC views."},{"name":"Copy result","text":"Copy the converted value."}],
  },
  {
    slug: "html-entities",
    title: "HTML Entity Encoder",
    short: "Encode & decode HTML entities",
    description:
      "Escape or unescape HTML entities (>, <, &, quotes and more) for safe display in markup. Fully client-side.",
    icon: "Html",
    keywords: ["html entity encoder", "html decode", "escape html"],
    category: "developer",
    faq: [{"question":"Why encode HTML entities?","answer":"To safely display characters like <, > and & in web pages without breaking markup."},{"question":"Can I decode entities too?","answer":"Yes. Encode and decode HTML entities in your browser."}],
    howTo: [{"name":"Paste input","text":"Paste the text or HTML."},{"name":"Choose mode","text":"Choose encode or decode."},{"name":"Copy output","text":"Copy the output."}],
  },
  {
    slug: "text-find-replace",
    title: "Find & Replace",
    short: "Find and replace text in bulk",
    description:
      "Find and replace words or phrases in your text, with optional regular expressions and case-sensitive matching. All processing happens in your browser.",
    icon: "FindReplace",
    keywords: ["find and replace text", "replace text online", "regex find replace"],
    category: "text-documents",
    faq: [{"question":"Can I use regular expressions?","answer":"Yes. Enable the regex option to use JavaScript-style patterns for advanced replacements."},{"question":"Is my text uploaded?","answer":"No. All find-and-replace operations run locally in your browser."}],
    howTo: [{"name":"Paste text","text":"Paste the text you want to edit."},{"name":"Enter find & replace","text":"Type what to find and what to replace it with."},{"name":"Apply or copy","text":"Replace in the text or copy the result."}],
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    short: "Test JavaScript regular expressions",
    description:
      "Test and debug regular expressions against any text. Toggle flags, see every match with its position, and catch invalid patterns — all client-side.",
    icon: "Code",
    keywords: ["regex tester", "regular expression tester", "regex debugger online"],
    category: "developer",
    faq: [{"question":"Which regex syntax is supported?","answer":"Standard JavaScript regular expressions, with g, i, m and s flags."},{"question":"Does it upload my text?","answer":"No. Matching happens entirely in your browser."}],
    howTo: [{"name":"Enter pattern","text":"Type your regular expression and choose flags."},{"name":"Paste test text","text":"Paste the text to test against."},{"name":"Review matches","text":"Read the list of matches and their positions."}],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    short: "Decode JSON Web Tokens safely",
    description:
      "Decode the header and payload of a JSON Web Token (JWT) to inspect claims. Decoding is done locally and nothing is sent to a server.",
    icon: "VpnKey",
    keywords: ["jwt decoder", "decode jwt online", "jwt parser"],
    category: "developer",
    faq: [{"question":"Does this verify the JWT signature?","answer":"No. It only decodes the payload for inspection; signature verification requires the secret."},{"question":"Is my token uploaded?","answer":"No. Decoding happens entirely in your browser."}],
    howTo: [{"name":"Paste token","text":"Paste the full JWT (three dot-separated parts)."},{"name":"Read decoded parts","text":"Inspect the header and payload JSON."},{"name":"Copy","text":"Copy the decoded header or payload."}],
  },
  {
    slug: "json-csv",
    title: "JSON ↔ CSV Converter",
    short: "Convert between JSON and CSV",
    description:
      "Convert an array of JSON objects to CSV, or parse CSV back into JSON. Perfect for spreadsheets and APIs — fully in your browser.",
    icon: "TableChart",
    keywords: ["json to csv", "csv to json", "convert json csv online"],
    category: "converters",
    faq: [{"question":"What JSON shape works for JSON to CSV?","answer":"An array of flat objects; keys become CSV columns."},{"question":"Is my data uploaded?","answer":"No. Conversion runs locally in your browser."}],
    howTo: [{"name":"Pick a direction","text":"Choose JSON to CSV or CSV to JSON."},{"name":"Paste data","text":"Paste your JSON array or CSV text."},{"name":"Copy result","text":"Copy the converted output."}],
  },
  {
    slug: "date-calculator",
    title: "Date Calculator",
    short: "Add days or find the difference",
    description:
      "Add or subtract days from a date, or find the number of days between two dates. Handy for planning and deadlines — all client-side.",
    icon: "DateRange",
    keywords: ["date calculator", "add days to date", "days between dates"],
    category: "time",
    faq: [{"question":"Can it add and subtract days?","answer":"Yes. Enter a start date and a number of days, with a plus or minus sign."},{"question":"Does it compute the difference between dates?","answer":"Yes. Pick two dates to get the number of days between them."}],
    howTo: [{"name":"Choose mode","text":"Choose add/subtract or difference."},{"name":"Enter dates","text":"Enter the date or dates you need."},{"name":"Read result","text":"See the resulting date or day count."}],
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    short: "Body Mass Index in metric & imperial",
    description:
      "Calculate your Body Mass Index from weight and height, in metric or imperial units, and see which category you fall into.",
    icon: "FitnessCenter",
    keywords: ["bmi calculator", "body mass index", "calculate bmi"],
    category: "calculators",
    faq: [{"question":"What units are supported?","answer":"Metric (kg, cm) and imperial (lb, in)."},{"question":"What does the category mean?","answer":"It maps your BMI to underweight, normal, overweight or obese ranges."}],
    howTo: [{"name":"Pick units","text":"Choose metric or imperial."},{"name":"Enter weight & height","text":"Enter your weight and height."},{"name":"Read BMI","text":"See your BMI value and category."}],
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    short: "Split bills & calculate tips",
    description:
      "Calculate the tip and total for a bill, and split it across any number of people. Quick and private — runs in your browser.",
    icon: "Restaurant",
    keywords: ["tip calculator", "split bill", "calculate tip"],
    category: "calculators",
    faq: [{"question":"Can it split the bill between people?","answer":"Yes. Enter the number of people to see the per-person amount."},{"question":"Is it free?","answer":"Yes, fully free and it runs in your browser."}],
    howTo: [{"name":"Enter bill","text":"Enter the bill amount."},{"name":"Set tip & people","text":"Choose a tip percentage and number of people."},{"name":"Read totals","text":"See tip, total and per-person amounts."}],
  },
  {
    slug: "color-contrast",
    title: "Color Contrast Checker",
    short: "WCAG contrast for any two colors",
    description:
      "Check the contrast ratio between a foreground and background color and see if it passes WCAG AA and AAA for normal and large text.",
    icon: "Contrast",
    keywords: ["color contrast checker", "wcag contrast", "contrast ratio"],
    category: "images-design",
    faq: [{"question":"What standard does this use?","answer":"The WCAG 2.1 relative luminance contrast ratio (AA and AAA)."},{"question":"Does it check large text too?","answer":"Yes. It reports pass/fail for both normal and large text."}],
    howTo: [{"name":"Pick colors","text":"Choose a foreground and background color."},{"name":"View ratio","text":"Read the contrast ratio."},{"name":"Check WCAG","text":"See AA and AAA pass/fail badges."}],
  },
  {
    slug: "text-reverser",
    title: "Text Reverser",
    short: "Reverse text, words or lines",
    description:
      "Reverse your text by characters, by word order, or line by line. Great for puzzles, quick checks and fun — all in your browser.",
    icon: "Replay",
    keywords: ["text reverser", "reverse text", "reverse words online"],
    category: "text-documents",
    faq: [{"question":"What can I reverse?","answer":"You can reverse characters, the order of words, or the order of lines."},{"question":"Is my text uploaded?","answer":"No. All processing happens locally in your browser."}],
    howTo: [{"name":"Paste text","text":"Paste the text you want to reverse."},{"name":"Pick a mode","text":"Choose characters, words or lines."},{"name":"Copy result","text":"Copy the reversed text."}],
  },
  {
    slug: "keyword-density",
    title: "Keyword Density Analyzer",
    short: "Word frequency & density",
    description:
      "Analyze any text for word frequency and keyword density, ignoring common stopwords, to help with SEO and editing.",
    icon: "BarChart",
    keywords: ["keyword density", "word frequency", "seo text analyzer"],
    category: "text-documents",
    faq: [{"question":"Does it ignore common words?","answer":"Yes. Common stopwords like 'the' and 'and' are excluded from the counts."},{"question":"Is it useful for SEO?","answer":"It shows how often terms repeat, which helps you balance keyword usage in copy."}],
    howTo: [{"name":"Paste text","text":"Paste an article or paragraph."},{"name":"Set limit","text":"Choose how many top words to show."},{"name":"Review","text":"Review the frequency and density bars."}],
  },
  {
    slug: "text-to-speech",
    title: "Text to Speech",
    short: "Listen to your text aloud",
    description:
      "Turn any text into spoken audio using your browser's built-in voices. Adjust rate and pitch, then play or stop instantly.",
    icon: "VolumeUp",
    keywords: ["text to speech", "tts online", "read text aloud"],
    category: "text-documents",
    faq: [{"question":"Which voices are available?","answer":"It uses the voices installed in your browser and operating system."},{"question":"Is anything uploaded?","answer":"No. Speech is generated locally by your browser."}],
    howTo: [{"name":"Paste text","text":"Type or paste the text to read."},{"name":"Choose voice & speed","text":"Pick a voice and adjust rate or pitch."},{"name":"Play","text":"Press play to listen."}],
  },
  {
    slug: "url-parser",
    title: "URL Parser",
    short: "Break down any URL",
    description:
      "Split a URL into protocol, host, path, and query parameters to debug links and APIs. Everything is parsed in your browser.",
    icon: "Http",
    keywords: ["url parser", "parse url", "query string parser"],
    category: "converters",
    faq: [{"question":"What does the parser extract?","answer":"Protocol, host, port, origin, path, query string and individual query parameters."},{"question":"Is my URL sent anywhere?","answer":"No. Parsing happens locally in your browser."}],
    howTo: [{"name":"Paste URL","text":"Paste a full URL including the protocol."},{"name":"Review parts","text":"See each component broken out."},{"name":"Inspect params","text":"Review the query parameters individually."}],
  },
  {
    slug: "number-to-words",
    title: "Number to Words",
    short: "Spell out numbers in English",
    description:
      "Convert integers into English words — handy for checks, invoices and documents. Works entirely in your browser.",
    icon: "Spellcheck",
    keywords: ["number to words", "number spell out", "integer to words"],
    category: "converters",
    faq: [{"question":"What range is supported?","answer":"Whole numbers up to a few trillion."},{"question":"Is it free?","answer":"Yes, fully free and runs in your browser."}],
    howTo: [{"name":"Enter a number","text":"Type an integer."},{"name":"Read words","text":"See the number spelled out in English."},{"name":"Copy","text":"Copy the words to use elsewhere."}],
  },
  {
    slug: "roman-numeral",
    title: "Roman Numeral Converter",
    short: "Roman ↔ Arabic numbers",
    description:
      "Convert between Roman numerals and standard Arabic numbers (1–3999). Useful for clocks, chapters, and learning.",
    icon: "Numbers",
    keywords: ["roman numeral converter", "roman to number", "arabic to roman"],
    category: "converters",
    faq: [{"question":"What range is supported?","answer":"Integers from 1 to 3999, the standard Roman numeral range."},{"question":"Can it convert both ways?","answer":"Yes. Switch between number-to-Roman and Roman-to-number."}],
    howTo: [{"name":"Choose direction","text":"Pick number to Roman or Roman to number."},{"name":"Enter value","text":"Type a number or a Roman numeral."},{"name":"Copy result","text":"Copy the converted value."}],
  },
  {
    slug: "image-to-base64",
    title: "Image to Base64",
    short: "Encode & decode image data URLs",
    description:
      "Convert an image file into a Base64 data URL, or preview a Base64 image. Perfect for embedding images in CSS or HTML — no upload needed.",
    icon: "Image",
    keywords: ["image to base64", "base64 image encoder", "data url converter"],
    category: "converters",
    faq: [{"question":"Are my images uploaded?","answer":"No. The file is read and encoded locally in your browser."},{"question":"Can I decode a Base64 image?","answer":"Yes. Paste a data URL to preview the image."}],
    howTo: [{"name":"Choose image","text":"Select an image file to encode."},{"name":"Or paste data URL","text":"Switch to decode mode and paste a Base64 data URL."},{"name":"Copy or preview","text":"Copy the data URL or preview the image."}],
  },
  {
    slug: "gradient-generator",
    title: "Gradient Generator",
    short: "Design CSS gradients visually",
    description:
      "Build linear or radial CSS gradients with two colors and a live preview. Copy the CSS to drop into your project.",
    icon: "Gradient",
    keywords: ["gradient generator", "css gradient", "linear gradient maker"],
    category: "images-design",
    faq: [{"question":"Which gradient types are supported?","answer":"Linear (with adjustable angle) and radial gradients."},{"question":"Can I copy the CSS?","answer":"Yes. The generated CSS is one click away to copy."}],
    howTo: [{"name":"Pick colors","text":"Choose two colors with the pickers."},{"name":"Adjust type & angle","text":"Switch linear/radial and set the angle."},{"name":"Copy CSS","text":"Copy the CSS for your project."}],
  },
  {
    slug: "email-extractor",
    title: "Email Extractor",
    short: "Pull emails from any text",
    description:
      "Extract and de-duplicate email addresses from pasted text or a list. Great for outreach and cleaning contact data — all in your browser.",
    icon: "Markunread",
    keywords: ["email extractor", "extract emails", "find email addresses"],
    category: "text-documents",
    faq: [{"question":"Does it remove duplicate emails?","answer":"Yes. The results are de-duplicated and shown as a clean list."},{"question":"Is my text uploaded?","answer":"No. Extraction runs entirely in your browser."}],
    howTo: [{"name":"Paste text","text":"Paste the text containing email addresses."},{"name":"Review list","text":"See the unique emails found."},{"name":"Copy","text":"Copy one email or all of them."}],
  },
  {
    slug: "random-string",
    title: "Random String Generator",
    short: "Secure random strings & keys",
    description:
      "Generate secure random strings and keys with selectable character sets and bulk output. Useful for tokens, salts and test data.",
    icon: "Abc",
    keywords: ["random string generator", "random key generator", "secure token"],
    category: "generators",
    faq: [{"question":"Are the strings cryptographically secure?","answer":"Yes. They use your browser's crypto engine."},{"question":"Can I pick the characters?","answer":"Yes. Toggle lowercase, uppercase, digits and symbols."}],
    howTo: [{"name":"Set options","text":"Choose length, count and character sets."},{"name":"Generate","text":"Click generate to create strings."},{"name":"Copy","text":"Copy individual strings or all of them."}],
  },
  {
    slug: "mime-type-lookup",
    title: "MIME Type Lookup",
    short: "File extension ↔ MIME",
    description:
      "Look up the MIME type for a file extension, or find the extension for a MIME type. Handy for headers and uploads.",
    icon: "AttachFile",
    keywords: ["mime type lookup", "file extension to mime", "mime types list"],
    category: "developer",
    faq: [{"question":"What can I search with?","answer":"Either a file extension like .json or a MIME type like image/png."},{"question":"Is it a full list?","answer":"It covers the most common web and office formats."}],
    howTo: [{"name":"Enter value","text":"Type an extension or MIME type."},{"name":"Read result","text":"See the matching pair."},{"name":"Copy","text":"Copy the extension or MIME."}],
  },
  {
    slug: "favicon-generator",
    title: "Favicon Generator",
    short: "Make a favicon from text or emoji",
    description:
      "Create a PNG favicon from a letter, emoji or short text with custom colors. Download it instantly — no design tools needed.",
    icon: "EmojiEmotions",
    keywords: ["favicon generator", "make favicon", "emoji favicon"],
    category: "images-design",
    faq: [{"question":"What can I put in the favicon?","answer":"A single character, emoji or up to two characters."},{"question":"Is it downloaded as PNG?","answer":"Yes. The result is a PNG data URL you can download."}],
    howTo: [{"name":"Enter symbol","text":"Type a letter or emoji."},{"name":"Pick colors","text":"Choose background and foreground colors."},{"name":"Generate & download","text":"Generate and download the PNG."}],
  },
  {
    slug: "color-palette",
    title: "Color Palette Generator",
    short: "Harmonies from any color",
    description:
      "Generate a color palette (complementary, analogous, triadic and shades) from a single base color. Copy any hex with a click.",
    icon: "Palette",
    keywords: ["color palette generator", "color scheme", "complementary colors"],
    category: "images-design",
    faq: [{"question":"What harmonies are generated?","answer":"Complementary, analogous, triadic and light/dark shades."},{"question":"Can I copy the hex codes?","answer":"Yes. Click any swatch to copy its hex."}],
    howTo: [{"name":"Pick base color","text":"Choose a base color."},{"name":"Review palette","text":"See the generated harmonies."},{"name":"Copy","text":"Click a swatch to copy its hex."}],
  },
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    short: "Monthly payment & interest",
    description:
      "Estimate your monthly loan payment, total paid and total interest from the loan amount, annual rate and term. All in your browser.",
    icon: "AccountBalance",
    keywords: ["loan calculator", "emi calculator", "monthly payment"],
    category: "calculators",
    faq: [{"question":"What does it calculate?","answer":"Monthly payment, total paid and total interest for a fixed-rate loan."},{"question":"Does it handle zero interest?","answer":"Yes. A 0% rate divides the principal across the term."}],
    howTo: [{"name":"Enter loan details","text":"Add amount, annual rate and term in years."},{"name":"Read results","text":"See monthly payment and totals."}],
  },
  {
    slug: "timezone-converter",
    title: "Timezone Converter",
    short: "Convert times across zones",
    description:
      "Convert a date and time from one timezone to another using your browser's locale data. Perfect for scheduling across regions.",
    icon: "Public",
    keywords: ["timezone converter", "time zone conversion", "world clock converter"],
    category: "time",
    faq: [{"question":"Which timezones are supported?","answer":"A curated list of major IANA timezones."},{"question":"Does it use my local zone?","answer":"It defaults the source zone to your device's timezone."}],
    howTo: [{"name":"Enter date & time","text":"Pick a date and time."},{"name":"Choose zones","text":"Select the from and to timezones."},{"name":"Read result","text":"See the converted time."}],
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    short: "Sale price & savings",
    description:
      "Work out the final price and savings after a percentage discount, with an optional tax step. Quick and private.",
    icon: "Sell",
    keywords: ["discount calculator", "sale price calculator", "price after discount"],
    category: "calculators",
    faq: [{"question":"Can it include tax?","answer":"Yes. Add a tax percentage to see the price after tax."},{"question":"Is it free?","answer":"Yes, fully free and runs in your browser."}],
    howTo: [{"name":"Enter price & discount","text":"Add the original price and discount percent."},{"name":"Optional tax","text":"Add a tax percent if needed."},{"name":"Read result","text":"See final price and savings."}],
  },
  {
    slug: "json-to-yaml",
    title: "JSON to YAML",
    short: "Convert JSON into YAML",
    description:
      "Convert JSON into clean, human-readable YAML. Great for config files and Kubernetes manifests — all in your browser.",
    icon: "DataObject",
    keywords: ["json to yaml", "yaml converter", "json yaml"],
    category: "developer",
    faq: [{"question":"Does it preserve nesting?","answer":"Yes. Objects, arrays and nested structures are converted faithfully."},{"question":"Is my data uploaded?","answer":"No. Conversion happens entirely in your browser."}],
    howTo: [{"name":"Paste JSON","text":"Paste or type your JSON."},{"name":"Convert","text":"Click convert to get YAML."},{"name":"Copy","text":"Copy the YAML output."}],
  },
  {
    slug: "html-beautifier",
    title: "HTML Beautifier",
    short: "Pretty-print HTML",
    description:
      "Format and indent messy HTML into clean, readable markup. Handy before committing templates or debugging layouts.",
    icon: "Code",
    keywords: ["html beautifier", "format html", "indent html"],
    category: "developer",
    faq: [{"question":"Does it change my markup?","answer":"No. It only adds whitespace for readability; the tags stay the same."},{"question":"Are void elements handled?","answer":"Yes. Tags like img and br are not indented as if they had children."}],
    howTo: [{"name":"Paste HTML","text":"Paste your HTML."},{"name":"Beautify","text":"Click beautify to indent it."},{"name":"Copy","text":"Copy the formatted HTML."}],
  },
  {
    slug: "credit-card-validator",
    title: "Credit Card Validator",
    short: "Luhn check & brand",
    description:
      "Validate a card number with the Luhn algorithm and detect the brand. A privacy-safe way to sanity-check input — never enter real cards on unknown sites.",
    icon: "CreditCard",
    keywords: ["credit card validator", "luhn check", "card number validator"],
    category: "developer",
    faq: [{"question":"What does it check?","answer":"It runs the Luhn checksum and guesses the brand from the prefix."},{"question":"Is it safe to use?","answer":"Yes, it runs locally and stores nothing. Do not enter real card data on random sites."}],
    howTo: [{"name":"Enter number","text":"Type or paste the card number."},{"name":"Read result","text":"See brand, length and validity."}],
  },
  {
    slug: "password-strength",
    title: "Password Strength Checker",
    short: "Rate your password",
    description:
      "Check a password's strength against common rules (length, case, numbers, symbols). Runs locally so your password never leaves the device.",
    icon: "VerifiedUser",
    keywords: ["password strength", "password checker", "strong password test"],
    category: "developer",
    faq: [{"question":"Is my password sent anywhere?","answer":"No. Everything is evaluated in your browser."},{"question":"What makes a password strong?","answer":"Length plus a mix of lowercase, uppercase, numbers and symbols."}],
    howTo: [{"name":"Type a password","text":"Enter it to see the score."},{"name":"Review checklist","text":"See which rules pass."}],
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    short: "Resize images in browser",
    description:
      "Resize an image to exact pixel dimensions or keep the aspect ratio. Download the result as PNG — no upload required.",
    icon: "PhotoSizeSelectLarge",
    keywords: ["image resizer", "resize image", "change image dimensions"],
    category: "images-design",
    faq: [{"question":"Is the image uploaded?","answer":"No. It is read and resized entirely in your browser."},{"question":"Can I lock the aspect ratio?","answer":"Yes. Enable the lock to keep proportions when you change one dimension."}],
    howTo: [{"name":"Choose image","text":"Select an image file."},{"name":"Set size","text":"Enter width/height, optionally locked."},{"name":"Resize & download","text":"Resize and download the PNG."}],
  },
  {
    slug: "stopwatch",
    title: "Stopwatch",
    short: "Accurate online stopwatch",
    description:
      "A precise stopwatch with start, pause, lap and reset. Built with requestAnimationFrame for smooth, accurate timing.",
    icon: "Timer",
    keywords: ["stopwatch", "online timer", "lap timer"],
    category: "time",
    faq: [{"question":"Is it accurate?","answer":"Yes. It uses your browser's high-resolution clock."},{"question":"Can I record laps?","answer":"Yes. Press lap to capture split times."}],
    howTo: [{"name":"Start","text":"Press start to begin timing."},{"name":"Lap / pause","text":"Record laps or pause."},{"name":"Reset","text":"Reset to zero."}],
  },
  {
    slug: "dice-roller",
    title: "Dice Roller",
    short: "Roll virtual dice",
    description:
      "Roll any number of dice with any number of sides using a cryptographically secure generator. Perfect for games and decisions.",
    icon: "Casino",
    keywords: ["dice roller", "roll dice", "random dice"],
    category: "generators",
    faq: [{"question":"Are the rolls fair?","answer":"Yes. They use your browser's crypto engine."},{"question":"How many dice can I roll?","answer":"Up to 20 dice, with 2–100 sides each."}],
    howTo: [{"name":"Set dice & sides","text":"Choose count and sides."},{"name":"Roll","text":"Roll to see results and total."}],
  },
  {
    slug: "gst-calculator",
    title: "GST / VAT Calculator",
    short: "Tax inclusive & exclusive",
    description:
      "Calculate GST or VAT as an added tax or back out of a tax-inclusive price. Supports both exclusive and inclusive modes.",
    icon: "ReceiptLong",
    keywords: ["gst calculator", "vat calculator", "tax calculator"],
    category: "calculators",
    faq: [{"question":"What modes are supported?","answer":"Add tax (exclusive) or work backwards from a tax-inclusive total."},{"question":"Which currency?","answer":"It formats as your browser's default currency."}],
    howTo: [{"name":"Enter amount & rate","text":"Add the amount and tax percent."},{"name":"Pick mode","text":"Choose exclusive or inclusive."},{"name":"Read result","text":"See tax, net and total."}],
  },
  {
    slug: "code-minifier",
    title: "Code Minifier",
    short: "Minify JS, CSS & HTML",
    description: "Minify JavaScript, CSS and HTML by stripping comments and whitespace. Paste code, choose language, copy minified output — all local, no upload.",
    icon: "Code",
    keywords: ["code minifier", "javascript minify", "css minifier online"],
    category: "developer",
    faq: [{ question: "What languages does it support?", answer: "JavaScript, CSS and HTML. The minifier removes // and /* */ comments, trims lines and collapses whitespace." }, { question: "Is my code uploaded?", answer: "No. Minification runs entirely in your browser. Nothing leaves this device." }],
    howTo: [{ name: "Paste code", text: "Paste your JavaScript, CSS or HTML into the input." }, { name: "Minify", text: "Click Minify to strip comments and extra whitespace." }, { name: "Copy", text: "Copy the minified output and use it in production." }],
  },
  {
    slug: "coin-flip",
    title: "Coin Flip",
    short: "Flip a fair coin",
    description: "Flip a fair virtual coin with cryptographically secure randomness. Get Heads or Tails instantly and copy the result — no tracking.",
    icon: "Toll",
    keywords: ["coin flip", "flip a coin", "random coin toss"],
    category: "generators",
    faq: [{ question: "Is the flip fair?", answer: "Yes. It uses crypto.getRandomValues with rejection sampling for uniform 50/50 distribution." }, { question: "Is it cryptographically secure?", answer: "Yes. Unlike Math.random, this uses the browser CSPRNG." }],
    howTo: [{ name: "Flip", text: "Click Flip to get Heads or Tails." }, { name: "Copy", text: "Copy the result with the copy button." }, { name: "Repeat", text: "Flip again as needed — each flip is independent." }],
  },
  {
    slug: "commission-calculator",
    title: "Commission Calculator",
    short: "Calculate sales commission",
    description: "Calculate sales commission and total payout from deal value and rate. Enter amount and percentage to get commission instantly.",
    icon: "AttachMoney",
    keywords: ["commission calculator", "sales commission", "calculate commission online"],
    category: "business",
    faq: [{ question: "How is commission calculated?", answer: "Commission = sales × (rate ÷ 100). Total = sales + commission." }, { question: "Are calculations local?", answer: "Yes. All calculations run in your browser." }],
    howTo: [{ name: "Enter sales", text: "Enter the sales amount in dollars." }, { name: "Enter rate", text: "Enter commission rate as a percentage." }, { name: "View result", text: "See commission and total update instantly." }],
  },
  {
    slug: "image-border",
    title: "Image Border",
    short: "Add borders to images",
    description: "Add a solid border to any image. Upload JPG or PNG, set width, height and border color, and download the bordered PNG — processed locally.",
    icon: "Image",
    keywords: ["image border", "add border to image", "photo border online"],
    category: "images-design",
    faq: [{ question: "What formats are supported?", answer: "JPG, PNG, WebP and any browser-supported image. Output is PNG to preserve quality." }, { question: "Does it upload my image?", answer: "No. The image is read with FileReader and composited on a canvas locally." }],
    howTo: [{ name: "Choose image", text: "Click Choose image and select a file (max 10 MB)." }, { name: "Set border", text: "Set width, height and border color and width." }, { name: "Download", text: 'Click Add border and download the result.' }],
  },
  {
    slug: "percentage-change",
    title: "Percentage Change",
    short: "Change between values",
    description: "Calculate percentage change from old to new value. See increase or decrease as a percent with instant updates.",
    icon: "Percent",
    keywords: ["percentage change calculator", "percent change", "calculate percent increase"],
    category: "calculators",
    faq: [{ question: "How is percentage change calculated?", answer: "((new − old) ÷ old) × 100. Returns null when old is 0 and new is non-zero (undefined change)." }, { question: "Difference vs change?", answer: "Change is directional (old→new). Difference uses absolute average and is symmetric." }],
    howTo: [{ name: "Enter old", text: "Enter the original value." }, { name: "Enter new", text: "Enter the new value." }, { name: "Read change", text: "See the percent change and whether it is an increase or decrease." }],
  },
  {
    slug: "percentage-difference",
    title: "Percentage Difference",
    short: "Difference between values",
    description: "Calculate symmetric percentage difference between two values using the absolute average. Great for comparing measurements.",
    icon: "Percent",
    keywords: ["percentage difference calculator", "percent difference", "compare two values percent"],
    category: "calculators",
    faq: [{ question: "What formula do you use?", answer: "Diff = |x − y| ÷ ((|x|+|y|)/2) × 100. Uses absolute average so result is symmetric." }, { question: "When is it 0?", answer: "When both values are 0, or when they are equal." }],
    howTo: [{ name: "Enter A", text: "Enter the first value." }, { name: "Enter B", text: "Enter the second value." }, { name: "View diff", text: "See the percentage difference instantly." }],
  },
  {
    slug: "random-passphrase",
    title: "Random Passphrase",
    short: "Generate secure passphrase",
    description: "Generate a secure random passphrase from a curated 120-word list using cryptographically secure shuffling. Choose 1–7 words.",
    icon: "Key",
    keywords: ["random passphrase", "passphrase generator", "secure passphrase"],
    category: "generators",
    faq: [{ question: "How is randomness generated?", answer: "Uses crypto.getRandomValues with rejection sampling for unbiased Fisher–Yates shuffling." }, { question: "How strong is a 4-word passphrase?", answer: "Entropy ≈ log2(120^4) ≈ 27.6 bits. Use 6–7 words for ~48 bits or combine with a generator." }],
    howTo: [{ name: "Set count", text: "Choose 1–7 words." }, { name: "Generate", text: "Click Generate passphrase." }, { name: "Copy", text: "Copy and store securely in your password manager." }],
  },
  {
    slug: "work-days-calculator",
    title: "Work Days Calculator",
    short: "Calculate business days",
    description: "Calculate business days (Mon–Fri) between two dates. Handles weekends excluding holidays — counts inclusive — all in UTC.",
    icon: "CalendarToday",
    keywords: ["work days calculator", "business days between dates", "weekdays calculator"],
    category: "calculators",
    faq: [{ question: "Does it count holidays?", answer: "No. Only Saturday and Sunday are excluded. Public holidays vary by region so add them manually." }, { question: "Is the count inclusive?", answer: "Yes. Both start and end dates are counted if they are weekdays." }],
    howTo: [{ name: "Pick dates", text: "Select start and end dates." }, { name: "Calculate", text: "Click Calculate business days." }, { name: "Use result", text: "Use the business-day count for planning." }]
  },
  {
    slug: "random-hex-color",
    title: "Random Hex Color",
    short: "Generate random hex colors",
    description: "Generate random hex color codes like #6366F1 with one click. Copy HEX, view preview and build palettes instantly.",
    icon: "ColorLens",
    keywords: ["random hex color", "hex color generator", "random color code"],
    category: "generators",
    faq: [{ question: "Is the color uniform?", answer: "Yes. Uses crypto.getRandomValues masking 0xFFFFFF for uniform 24-bit color." }, { question: "Can I copy the result?", answer: "Yes. Each color has a copy button and preview swatch." }],
    howTo: [{ name: "Generate", text: "Click Generate to get a new hex color." }, { name: "Copy", text: "Copy the HEX code." }, { name: "Use", text: "Paste into your design tool or CSS." }]
  },
  {
    slug: "screen-resolution",
    title: "Screen Resolution",
    short: "Detect screen metrics",
    description: "Detect your screen width, height, device pixel ratio and viewport size instantly. Useful for responsive design debugging.",
    icon: "PhotoSizeSelectLarge",
    keywords: ["screen resolution", "detect screen size", "viewport dimensions"],
    category: "developer",
    faq: [{ question: "What metrics are shown?", answer: "screen.width×height, window.innerWidth×innerHeight and devicePixelRatio." }, { question: "Is data sent anywhere?", answer: "No. Detection uses window.screen locally." }],
    howTo: [{ name: "Open tool", text: "Open the tool on the device you want to test." }, { name: "Read metrics", text: "Values update live on resize." }, { name: "Copy", text: "Copy dimensions for your bug report or CSS." }]
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    short: "EMI, interest & amortization",
    description: "Calculate monthly EMI, total interest and amortization schedule for home loans. Adjust principal, rate, tenure and down payment to plan your budget.",
    icon: "AccountBalance",
    keywords: ["mortgage calculator", "emi calculator", "home loan emi calculator"],
    category: "finance",
    faq: [{ question: "How is EMI calculated?", answer: "EMI = P×r×(1+r)^n÷((1+r)^n−1), where P=principal, r=monthly rate, n=months." }, { question: "Is this financial advice?", answer: "No, for informational purposes only. Consult your lender for exact figures." }],
    howTo: [{ name: "Enter loan", text: "Enter principal, annual rate and tenure." }, { name: "Add down payment", text: "Enter down payment to see loan amount." }, { name: "View schedule", text: "See EMI, total interest and yearly table; export to CSV." }]
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    short: "Maturity & interest growth",
    description: "See how your money grows with compounding. Enter principal, rate, frequency and years to get maturity amount and interest earned instantly.",
    icon: "AccountBalance",
    keywords: ["compound interest calculator", "sip calculator", "investment calculator"],
    category: "finance",
    faq: [{ question: "What is compounding frequency?", answer: "Yearly=1, half-yearly=2, quarterly=4, monthly=12. More frequent compounding yields slightly higher maturity." }, { question: "Is this financial advice?", answer: "No, informational only. Past performance does not guarantee future returns." }],
    howTo: [{ name: "Enter principal", text: "Enter initial investment amount." }, { name: "Set rate & years", text: "Enter annual rate, years and compounding frequency." }, { name: "View maturity", text: "See maturity amount and interest breakdown." }]
  },
  {
    slug: "image-format-converter",
    title: "Image Format Converter",
    short: "WebP, PNG, JPG, AVIF",
    description: "Convert between WebP, PNG, JPG, AVIF and HEIC without uploading. Batch-friendly, keeps quality and downloads instantly in your browser.",
    icon: "Image",
    keywords: ["image converter", "webp to jpg", "png to webp converter"],
    category: "images-design",
    faq: [{ question: "Does quality change?", answer: "PNG is lossless; JPG/WebP quality is adjustable via slider. Try 90% for WebP for best size/quality." }, { question: "Is my image uploaded?", answer: "No, conversion uses canvas locally and never leaves your device." }],
    howTo: [{ name: "Choose image", text: "Pick an image (max 10 MB)." }, { name: "Pick format", text: "Select target format and quality for JPG/WebP." }, { name: "Convert & download", text: "Click Convert and download the new file." }]
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    short: "Write & preview markdown",
    description: "Write markdown with live preview and export to HTML. Copy, download or print — ideal for READMEs, blogs and docs, all offline.",
    icon: "Description",
    keywords: ["markdown editor", "markdown preview", "md to html"],
    category: "text-documents",
    faq: [{ question: "What syntax is supported?", answer: "Headings, bold, italic, inline code, code blocks, links, blockquotes and lists — covers 95% of common markdown." }, { question: "Is my text stored?", answer: "No, everything stays in your browser memory." }],
    howTo: [{ name: "Write", text: "Type markdown in Write tab." }, { name: "Preview", text: "Switch to Preview to see rendered HTML." }, { name: "Copy", text: "Copy HTML for your CMS or docs." }]
  },
  {
    slug: "xml-formatter",
    title: "XML Formatter",
    short: "Format & validate XML",
    description: "Format and validate XML with indentation and syntax check. Paste, beautify, minify and copy — handles large files locally without upload.",
    icon: "Code",
    keywords: ["xml formatter", "xml beautifier", "xml validator online"],
    category: "developer",
    faq: [{ question: "Does it validate?", answer: "Yes, uses DOMParser and shows parsererror if XML is invalid, with error message." }, { question: "Can it minify?", answer: "Yes, minify mode collapses whitespace between tags." }],
    howTo: [{ name: "Paste XML", text: "Paste your XML content." }, { name: "Format", text: "Click Format for pretty print or Minify for compact." }, { name: "Copy", text: "Copy the result." }]
  },
  {
    slug: "text-cleaner",
    title: "Text Cleaner",
    short: "Trim & clean text",
    description: "Strip extra spaces, empty lines, duplicate lines and tabs in bulk. Paste messy text, choose options and get clean, deduped output instantly.",
    icon: "Subject",
    keywords: ["text cleaner", "remove extra spaces", "clean text online"],
    category: "text-documents",
    faq: [{ question: "What does it clean?", answer: "Trims lines, collapses multiple spaces, removes empty and duplicate lines, and converts tabs to spaces." }, { question: "Is it private?", answer: "Yes, all cleaning runs locally in your browser." }],
    howTo: [{ name: "Paste text", text: "Paste messy text into the input." }, { name: "Choose options", text: "Toggle trim, dedupe, remove empty lines and tabs." }, { name: "Copy cleaned", text: "Copy the cleaned output." }]
  },
  {
    slug: "readability-checker",
    title: "Readability Checker",
    short: "Flesch & grade level",
    description: "Score reading ease, Flesch-Kincaid grade level and average sentence length. Paste essay to improve clarity and check grade level instantly.",
    icon: "BarChart",
    keywords: ["readability checker", "flesch kincaid", "grade level checker"],
    category: "text-documents",
    faq: [{ question: "What is Flesch Reading Ease?", answer: "Score 0-100: higher means easier. 60-70 is plain English, 90-100 is very easy." }, { question: "How is grade level calculated?", answer: "FKGL = 0.39×ASL + 11.8×ASW −15.59, where ASL=avg sentence length, ASW=avg syllables per word." }],
    howTo: [{ name: "Paste text", text: "Paste your essay or article." }, { name: "View scores", text: "See Reading Ease, grade level and sentence stats." }, { name: "Improve", text: "Shorten sentences and simplify words to lower grade level." }]
  },
  {
    slug: "cron-parser",
    title: "Cron Parser",
    short: "Explain cron expressions",
    description: "Parse and explain cron expressions in plain English. Validate 5 fields, see next run times and check schedule without memorizing syntax.",
    icon: "Schedule",
    keywords: ["cron parser", "crontab generator", "cron expression explained"],
    category: "developer",
    faq: [{ question: "What format is supported?", answer: "Standard 5-field cron: minute hour day month weekday. Supports *, */step, a-b, a,b and combinations." }, { question: "Does it handle day-or-weekday OR logic?", answer: "Yes, follows cron spec where DOM and DOW are OR when both are restricted." }],
    howTo: [{ name: "Enter cron", text: "Type like 0 0 * * 1 for Mondays at midnight." }, { name: "Read explanation", text: "See plain English description." }, { name: "Check next runs", text: "View next 5 scheduled run times." }]
  },
  {
    slug: "countdown-timer",
    title: "Countdown Timer",
    short: "Days until any date",
    description: "Create countdowns to any date with shareable link. Perfect for launches, exams and holidays — see days, hours, minutes and seconds live.",
    icon: "Timer",
    keywords: ["countdown timer", "days until", "countdown to date"],
    category: "time",
    faq: [{ question: "Can I share the countdown?", answer: "Yes, Start generates a shareable URL with ?target= parameter." }, { question: "Does it work offline?", answer: "Yes, countdown runs locally with setInterval and handles past dates gracefully." }],
    howTo: [{ name: "Pick date", text: "Choose target date and time." }, { name: "Start", text: "Click Start to see live days/hours/minutes/seconds." }, { name: "Share", text: "Copy shareable link." }]
  },
  {
    slug: "csv-viewer",
    title: "CSV Viewer",
    short: "View, sort & filter CSV",
    description: "View, sort, filter and search CSV as a table. Upload, preview and export back to CSV or JSON — handles quoted fields locally.",
    icon: "TableChart",
    keywords: ["csv viewer", "csv to table", "view csv online"],
    category: "converters",
    faq: [{ question: "Does it handle quotes?", answer: "Yes, RFC 4180 quoted fields with double quotes and commas are parsed correctly." }, { question: "Can I sort?", answer: "Yes, click headers to sort asc/desc and filter to narrow rows." }],
    howTo: [{ name: "Paste CSV", text: "Paste CSV text or upload file content." }, { name: "View table", text: "See data as sortable table." }, { name: "Filter & copy", text: "Filter rows and copy as JSON." }]
  },
  {
    slug: "morse-translator",
    title: "Morse Code Translator",
    short: "Text ↔ Morse code",
    description: "Translate text to Morse code and back instantly. Supports A-Z, 0-9, encode with / for words and decode Morse to text locally.",
    icon: "Code",
    keywords: ["morse code translator", "text to morse", "morse decoder"],
    category: "converters",
    faq: [{ question: "What characters are supported?", answer: "A-Z and 0-9. Unknown characters are skipped. Morse uses dot-dash with space between letters and / between words." }, { question: "Is it private?", answer: "Yes, translation is a lookup table running locally." }],
    howTo: [{ name: "Choose mode", text: "Pick Encode (text→Morse) or Decode (Morse→text)." }, { name: "Enter input", text: "Type text or paste Morse with spaces and /." }, { name: "Copy", text: "Copy the translated output." }]
  },
  {
    slug: "world-clock",
    title: "World Clock",
    short: "Time in world cities",
    description: "See current time across world cities side by side. Add any IANA time zone, view offset and copy time for meetings — updates live every second.",
    icon: "Public",
    keywords: ["world clock", "current time city", "time zone clock"],
    category: "time",
    faq: [{ question: "Does it handle DST?", answer: "Yes, Intl.DateTimeFormat with timeZone follows DST automatically." }, { question: "Can I add any city?", answer: "Yes, enter any IANA zone like Asia/Kolkata — validated via Intl." }],
    howTo: [{ name: "View defaults", text: "See 5 major cities updating live." }, { name: "Add zone", text: "Enter IANA zone to add more cities." }, { name: "Copy time", text: "Copy formatted time for your meeting invite." }]
  },
  {
    slug: "ascii-converter",
    title: "ASCII / Hex / Binary Converter",
    short: "Text ↔ codes",
    description: "Convert text to ASCII codes, hex, binary and octal and back. Paste text, see all encodings and decode any base to text locally.",
    icon: "Code",
    keywords: ["ascii converter", "text to hex", "binary converter text"],
    category: "converters",
    faq: [{ question: "What bases are supported?", answer: "Decimal ASCII, hex (2-digit), binary (8-bit) and octal. Decode supports all four via radio selection." }, { question: "Is it private?", answer: "Yes, charCodeAt and parseInt run locally." }],
    howTo: [{ name: "Encode", text: "Type text to see ASCII, hex, binary and octal." }, { name: "Decode", text: "Switch to Decode and paste codes to get text." }, { name: "Copy", text: "Copy any encoding." }]
  },
  {
    slug: "svg-optimizer",
    title: "SVG Optimizer",
    short: "Shrink SVG files",
    description: "Optimize SVG by stripping comments, whitespace and empty attributes. Paste SVG, see saved bytes and preview — all locally without upload.",
    icon: "Image",
    keywords: ["svg optimizer", "optimize svg", "minify svg online"],
    category: "images-design",
    faq: [{ question: "What does it strip?", answer: "Comments, whitespace between tags, empty attributes and shortens #aabbcc to #abc." }, { question: "Is preview safe?", answer: "Yes, scripts and event handlers are stripped before rendering preview." }],
    howTo: [{ name: "Paste SVG", text: "Paste SVG markup." }, { name: "Optimize", text: "Click Optimize to shrink." }, { name: "Copy", text: "Copy optimized SVG and download." }]
  },
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    short: "BMR, TDEE & macros",
    description: "Estimate daily calories, BMR and TDEE from age, sex, weight and activity. Get maintenance, deficit and surplus targets — informational only.",
    icon: "FitnessCenter",
    keywords: ["calorie calculator", "bmr calculator", "tdee calculator"],
    category: "health",
    faq: [{ question: "How is BMR calculated?", answer: "Mifflin-St Jeor: Men 10*kg+6.25*cm-5*age+5, Women -161. TDEE=BMR×activity factor." }, { question: "Is this medical advice?", answer: "No, for informational purposes only. Consult a healthcare professional." }],
    howTo: [{ name: "Enter stats", text: "Enter age, sex, weight, height and activity." }, { name: "View calories", text: "See BMR, TDEE and calorie targets." }, { name: "Plan", text: "Use deficit/surplus rows to plan intake." }]
  },
  {
    slug: "salary-calculator",
    title: "Salary Calculator",
    short: "Take-home & per-pay",
    description: "Estimate take-home pay from gross salary, tax rate and deductions. See net annual and per-paycheck amount — informational only.",
    icon: "AccountBalance",
    keywords: ["salary calculator", "take home pay", "net pay calculator"],
    category: "finance",
    faq: [{ question: "How is net calculated?", answer: "Taxable = gross - deductions, tax = taxable×rate%, net = gross - tax. Per-pay = net ÷ pay periods." }, { question: "Is this tax advice?", answer: "No, informational only. Tax laws vary; consult a professional." }],
    howTo: [{ name: "Enter gross", text: "Enter gross annual salary." }, { name: "Set tax", text: "Enter tax rate and deductions." }, { name: "View net", text: "See net annual and per-paycheck." }]
  },
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin Calculator",
    short: "Margin & markup",
    description: "Calculate profit, margin and markup from cost and revenue. Enter cost and price to see profit, margin % and markup % instantly.",
    icon: "AccountBalance",
    keywords: ["profit margin calculator", "markup calculator", "margin vs markup"],
    category: "finance",
    faq: [{ question: "What is margin vs markup?", answer: "Margin = profit÷revenue×100, Markup = profit÷cost×100. Margin is share of revenue, markup is uplift on cost." }, { question: "Is this financial advice?", answer: "No, informational only." }],
    howTo: [{ name: "Enter cost", text: "Enter cost amount." }, { name: "Enter revenue", text: "Enter selling price." }, { name: "View", text: "See profit, margin and markup." }]
  },
  {
    slug: "sitemap-generator",
    title: "Sitemap Generator",
    short: "XML sitemap builder",
    description: "Generate XML sitemap from a list of URLs. Paste URLs, set change frequency, priority and lastmod, then copy or download sitemap.xml.",
    icon: "Code",
    keywords: ["sitemap generator", "xml sitemap", "generate sitemap online"],
    category: "seo",
    faq: [{ question: "What URLs are allowed?", answer: "Must be absolute http(s) URLs, one per line. Validated via new URL()." }, { question: "Is it private?", answer: "Yes, XML is built locally from your list." }],
    howTo: [{ name: "Paste URLs", text: "Paste one URL per line." }, { name: "Set options", text: "Choose changefreq, priority and lastmod." }, { name: "Copy/download", text: "Copy XML or download sitemap.xml." }]
  },
  {
    slug: "robots-txt-generator",
    title: "Robots.txt Generator",
    short: "Generate robots.txt",
    description: "Generate robots.txt with allow, disallow, sitemap and crawl-delay. Choose user-agent, add rules and download ready file locally.",
    icon: "Code",
    keywords: ["robots.txt generator", "generate robots.txt", "robots.txt maker"],
    category: "seo",
    faq: [{ question: "What is robots.txt?", answer: "A file at domain root that tells crawlers which paths to allow or disallow, plus sitemap location." }, { question: "Is it private?", answer: "Yes, file is generated locally from your inputs." }],
    howTo: [{ name: "Set agent", text: "Choose user-agent like * or Googlebot." }, { name: "Add rules", text: "Enter allow/disallow paths, sitemap and delay." }, { name: "Copy", text: "Copy robots.txt or download." }]
  },
  {
    slug: "water-intake-calculator",
    title: "Water Intake Calculator",
    short: "Daily water needs",
    description: "Estimate daily water intake from weight, activity and climate. See liters and glasses per day — informational only, not medical advice.",
    icon: "FitnessCenter",
    keywords: ["water intake calculator", "daily water needs", "how much water per day"],
    category: "health",
    faq: [{ question: "How is it calculated?", answer: "Base = weightKg×35ml, +500ml if active or hot climate. Glasses = ml÷250." }, { question: "Is this medical advice?", answer: "No, informational only. Hydration needs vary; consult a professional." }],
    howTo: [{ name: "Enter weight", text: "Enter weight in kg or lb." }, { name: "Set activity", text: "Choose activity and climate." }, { name: "View", text: "See liters and glasses per day." }]
  },
  {
    slug: "css-beautifier",
    title: "CSS Beautifier",
    short: "Format CSS nicely",
    description: "Beautify CSS with proper indentation and line breaks. Paste minified CSS, format for readability and copy — handles large files locally.",
    icon: "Code",
    keywords: ["css beautifier", "format css", "css formatter online"],
    category: "developer",
    faq: [{ question: "Does it validate?", answer: "No, it formats based on braces and semicolons; invalid CSS will still be indented." }, { question: "Can it minify?", answer: "Yes, minify mode collapses whitespace." }],
    howTo: [{ name: "Paste CSS", text: "Paste your CSS." }, { name: "Beautify", text: "Click Format for pretty print." }, { name: "Copy", text: "Copy formatted CSS." }]
  },
  {
    slug: "ideal-weight-calculator",
    title: "Ideal Weight Calculator",
    short: "Healthy weight range",
    description: "Calculate ideal weight via Devine, Robinson and Miller formulas. Enter height and sex to see healthy range and BMI-based target.",
    icon: "FitnessCenter",
    keywords: ["ideal weight calculator", "healthy weight", "devine formula"],
    category: "health",
    faq: [{ question: "Which formula is used?", answer: "Devine: Men 50+2.3*(in-60), Women 45.5+2.3*(in-60). Robinson and Miller shown for comparison." }, { question: "Is this medical advice?", answer: "No, informational only. Healthy weight depends on many factors." }],
    howTo: [{ name: "Enter height", text: "Enter height in cm or in." }, { name: "Choose formula", text: "Pick Devine, Robinson or Miller." }, { name: "View", text: "See ideal weight and healthy range." }]
  },
  {
    slug: "macro-calculator",
    title: "Macro Calculator",
    short: "Protein, carbs & fat",
    description: "Split calories into protein, carbs and fat grams. Choose preset or custom ratios to get macro grams and calories per macro.",
    icon: "FitnessCenter",
    keywords: ["macro calculator", "protein carb fat", "calorie macros"],
    category: "health",
    faq: [{ question: "How are macros calculated?", answer: "Protein grams = cal×protein%/4, carbs = cal×carb%/4, fat = cal×fat%/9." }, { question: "Is this medical advice?", answer: "No, informational only." }],
    howTo: [{ name: "Enter calories", text: "Enter daily calorie target." }, { name: "Set ratios", text: "Choose preset or custom protein/carb/fat %." }, { name: "View", text: "See grams and calories per macro." }]
  },
  {
    slug: "exif-viewer",
    title: "EXIF Viewer",
    short: "Read image metadata",
    description: "View EXIF metadata from JPEG images. Upload photo to see make, model, date, orientation and GPS — all parsed locally without upload.",
    icon: "Image",
    keywords: ["exif viewer", "image metadata", "read exif online"],
    category: "images-design",
    faq: [{ question: "What EXIF is shown?", answer: "Make, Model, DateTime, Orientation and GPS if present. Non-JPEG files show no EXIF." }, { question: "Is my photo uploaded?", answer: "No, parsing uses DataView on ArrayBuffer locally." }],
    howTo: [{ name: "Choose image", text: "Upload JPEG photo." }, { name: "View EXIF", text: "See parsed tags in table." }, { name: "Clear", text: "Clear to analyze another image." }]
  },
  {
    slug: "barcode-generator",
    title: "Barcode Generator",
    short: "CODE128, EAN13, UPC",
    description: "Generate barcodes as SVG or PNG for CODE128, EAN13 and UPC. Enter text, set size and download — runs via lazy-loaded JsBarcode.",
    icon: "QrCode2",
    keywords: ["barcode generator", "code128 barcode", "ean13 generator"],
    category: "generators",
    faq: [{ question: "What formats are supported?", answer: "CODE128 (any text), EAN13 (13 digits) and UPC (12 digits). Input is validated per format." }, { question: "Is it private?", answer: "Yes, generation is client-side after lazy loading JsBarcode." }],
    howTo: [{ name: "Enter text", text: "Enter text or digits per format." }, { name: "Choose format", text: "Pick CODE128, EAN13 or UPC." }, { name: "Download", text: "Download SVG or PNG." }]
  },
  {
    slug: "yaml-to-json",
    title: "YAML to JSON",
    short: "Convert YAML to JSON",
    description: "Convert YAML to JSON instantly. Paste YAML with indentation, lists and scalars and get pretty-printed JSON locally without upload.",
    icon: "Code",
    keywords: ["yaml to json", "yaml converter", "yaml to json online"],
    category: "developer",
    faq: [{ question: "What YAML subset is supported?", answer: "Key: value, lists with -, nested via 2-space indent, strings, numbers, booleans and null. Odd indent is flagged." }, { question: "Is it private?", answer: "Yes, parsing is hand-rolled locally." }],
    howTo: [{ name: "Paste YAML", text: "Paste YAML content." }, { name: "Convert", text: "See JSON output automatically." }, { name: "Copy", text: "Copy JSON." }]
  },
  {
    slug: "json-tree-viewer",
    title: "JSON Tree Viewer",
    short: "Explore JSON as tree",
    description: "Visualize JSON as an expandable tree. Paste JSON, expand or collapse nodes and copy path or value — great for debugging large JSON.",
    icon: "DataObject",
    keywords: ["json tree viewer", "json viewer", "view json online"],
    category: "developer",
    faq: [{ question: "How large can JSON be?", answer: "Up to 500KB is handled smoothly. Larger files may be truncated for performance." }, { question: "Is my JSON uploaded?", answer: "No, parsing and rendering are purely local." }],
    howTo: [{ name: "Paste JSON", text: "Paste valid JSON." }, { name: "Browse tree", text: "Expand or collapse nodes to explore." }, { name: "Copy", text: "Copy path or value." }]
  },
  {
    slug: "file-size-converter",
    title: "File Size Converter",
    short: "Bytes, KB, MB, GB",
    description: "Convert file sizes between bytes, KB, MB, GB and TB. Choose binary (1024) or decimal (1000) base and see result instantly.",
    icon: "Straighten",
    keywords: ["file size converter", "bytes to mb", "kb to gb converter"],
    category: "converters",
    faq: [{ question: "Binary vs decimal?", answer: "Binary uses 1024 (KiB), decimal uses 1000 (KB). Toggle to see both." }, { question: "Is it private?", answer: "Yes, conversion is local math." }],
    howTo: [{ name: "Enter value", text: "Enter number and select from unit." }, { name: "Choose target", text: "Select to unit and base." }, { name: "View", text: "See converted result." }]
  },
  {
    slug: "pregnancy-calculator",
    title: "Pregnancy Calculator",
    short: "Due date & trimesters",
    description: "Estimate due date, conception date and trimesters from last menstrual period. Enter LMP and cycle length to see due date and weeks pregnant.",
    icon: "Cake",
    keywords: ["pregnancy calculator", "due date calculator", "pregnancy due date"],
    category: "health",
    faq: [{ question: "How is due date calculated?", answer: "Naegele: LMP +280 days + (cycle-28). Conception = LMP+14 days." }, { question: "Is this medical advice?", answer: "No, informational only. Consult your healthcare provider." }],
    howTo: [{ name: "Enter LMP", text: "Pick last menstrual period date." }, { name: "Set cycle", text: "Enter cycle length in days." }, { name: "View", text: "See due date, trimesters and weeks." }]
  },
  {
    slug: "pomodoro-timer",
    title: "Pomodoro Timer",
    short: "Focus & break cycles",
    description: "Pomodoro timer for focus sessions. Set work, break and cycles, start with progress and cycle count — vibrates and notifies on finish.",
    icon: "Timer",
    keywords: ["pomodoro timer", "focus timer", "pomodoro online"],
    category: "time",
    faq: [{ question: "Does it notify?", answer: "Yes, vibrates and shows browser notification on finish if permission granted." }, { question: "Can I customize?", answer: "Yes, set work/break minutes and number of cycles." }],
    howTo: [{ name: "Set times", text: "Enter work, break and cycles." }, { name: "Start", text: "Click Start to begin countdown." }, { name: "Track", text: "Watch progress and cycle count." }]
  },
  {
    slug: "text-summarizer",
    title: "Text Summarizer",
    short: "Extractive summary",
    description: "Summarize long text extractively via sentence scoring. Paste article, choose ratio and get top sentences in original order — fast and local.",
    icon: "Subject",
    keywords: ["text summarizer", "summarize text", "ai summarizer online"],
    category: "text-documents",
    faq: [{ question: "How does it summarize?", answer: "Scores sentences by word frequency and picks top N in original order. No AI API needed." }, { question: "Is it private?", answer: "Yes, scoring is local." }],
    howTo: [{ name: "Paste text", text: "Paste long article." }, { name: "Set ratio", text: "Choose summary ratio via slider." }, { name: "Copy", text: "Copy summarized text." }]
  },
  {
    slug: "grammar-checker",
    title: "Grammar Checker",
    short: "Find grammar issues",
    description: "Check grammar for double spaces, repeated words, capitalization and common typos. Paste text to see issues with suggestions locally.",
    icon: "Spellcheck",
    keywords: ["grammar checker", "check grammar online", "grammar correction"],
    category: "text-documents",
    faq: [{ question: "What does it check?", answer: "Double spaces, repeated words, missing capitals, double punctuation and typos like teh→the." }, { question: "Is it private?", answer: "Yes, regex checks run locally." }],
    howTo: [{ name: "Paste text", text: "Paste your text." }, { name: "View issues", text: "See highlighted issues and suggestions." }, { name: "Fix", text: "Edit text and re-check." }]
  },
  {
    slug: "open-graph-preview",
    title: "Open Graph Preview",
    short: "Preview social cards",
    description: "Preview Open Graph and Twitter cards. Enter title, description, image and see Facebook and Twitter card mockups with meta tag output.",
    icon: "Public",
    keywords: ["open graph preview", "og preview", "social card preview"],
    category: "seo",
    faq: [{ question: "What is Open Graph?", answer: "Tags like og:title and og:image control how links look on Facebook, Twitter and LinkedIn." }, { question: "Is it private?", answer: "Yes, preview is rendered locally." }],
    howTo: [{ name: "Enter tags", text: "Fill title, description, image and URL." }, { name: "Preview", text: "See Facebook and Twitter card mocks." }, { name: "Copy tags", text: "Copy generated meta tags." }]
  },
  {
    slug: "serp-preview",
    title: "SERP Preview",
    short: "Google snippet preview",
    description: "Preview Google search snippet with pixel width check. Enter title, description and URL to see snippet and length warnings.",
    icon: "Search",
    keywords: ["serp preview", "google snippet", "search preview"],
    category: "seo",
    faq: [{ question: "What are pixel limits?", answer: "Title ~580px, description ~920px. Exceeding may truncate in Google." }, { question: "Is it private?", answer: "Yes, preview is local." }],
    howTo: [{ name: "Enter title", text: "Type title (0-60 chars)." }, { name: "Enter description", text: "Type description (0-160 chars)." }, { name: "Preview", text: "See snippet and length warnings." }]
  },
  {
    slug: "color-shades-generator",
    title: "Color Shades Generator",
    short: "Shades & tints",
    description: "Generate shades (mix with black) and tints (mix with white) from any color. Choose steps and copy hex for palette building.",
    icon: "Palette",
    keywords: ["color shades generator", "tints and shades", "color palette shades"],
    category: "images-design",
    faq: [{ question: "What are shades vs tints?", answer: "Shades mix with black (darker), tints mix with white (lighter) via RGB lerp." }, { question: "Is it private?", answer: "Yes, math is local." }],
    howTo: [{ name: "Pick color", text: "Enter hex color." }, { name: "Set steps", text: "Choose number of shades/tints." }, { name: "Copy", text: "Click swatch to copy hex." }]
  },
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator",
    short: "Net pay after tax",
    description: "Estimate take-home pay after tax from gross salary and deductions. See taxable income, tax, net pay and effective rate — informational only.",
    icon: "AccountBalance",
    keywords: ["income tax calculator", "take home pay", "net pay calculator"],
    category: "finance",
    faq: [{ question: "How is tax estimated?", answer: "Demo brackets: 10% ≤11k, 12% ≤44k, 22% ≤95k, 24% above. Taxable = gross - deduction." }, { question: "Is this tax advice?", answer: "No, informational only. Consult a tax professional." }],
    howTo: [{ name: "Enter gross", text: "Enter gross annual salary." }, { name: "Set deduction", text: "Choose filing status and deduction." }, { name: "View net", text: "See taxable, tax and net pay." }]
  },
  {
    slug: "gpa-calculator",
    title: "GPA Calculator",
    short: "Grade point average",
    description: "Calculate GPA from courses, grades and credits. Add courses, choose grades and credits to see GPA, percentage and total credits instantly.",
    icon: "BarChart",
    keywords: ["gpa calculator", "grade point average", "calculate gpa online"],
    category: "calculators",
    faq: [{ question: "How is GPA calculated?", answer: "GPA = sum(grade×credits)÷sum(credits). Grade scale A=4.0, A-=3.7, B+=3.3 etc." }, { question: "Is it private?", answer: "Yes, calculation is local." }],
    howTo: [{ name: "Add courses", text: "Add courses with grade and credits." }, { name: "View GPA", text: "See GPA and percentage automatically." }, { name: "Adjust", text: "Edit or remove courses to update." }]
  },
  {
    slug: "ats-resume-checker",
    title: "ATS Resume Checker",
    short: "Check resume vs job",
    description: "Check resume against job description for keyword coverage. Paste resume and job to see match %, matched and missing keywords locally.",
    icon: "VerifiedUser",
    keywords: ["ats resume checker", "resume keyword checker", "ats checker online"],
    category: "business",
    faq: [{ question: "How is score calculated?", answer: "Extracts keywords from job (minus stopwords) and checks coverage in resume via word-boundary regex." }, { question: "Is my resume uploaded?", answer: "No, checking is local." }],
    howTo: [{ name: "Paste resume", text: "Paste your resume text." }, { name: "Paste job", text: "Paste job description." }, { name: "Check", text: "See match % and missing keywords." }]
  },
  {
    slug: "signature-maker",
    title: "Signature Maker",
    short: "Draw & type signature",
    description: "Draw or type your signature on canvas and download as transparent PNG. Choose pen color and width — ideal for PDFs and docs, offline.",
    icon: "Image",
    keywords: ["signature maker", "draw signature", "create signature online"],
    category: "business",
    faq: [{ question: "Can I draw with touch?", answer: "Yes, supports mouse and touch with pen width and color." }, { question: "Is it private?", answer: "Yes, canvas drawing stays in your browser." }],
    howTo: [{ name: "Draw", text: "Draw signature on canvas." }, { name: "Or type", text: "Or type and choose font." }, { name: "Download", text: "Download PNG with transparent background." }]
  },
  {
    slug: "youtube-thumbnail-downloader",
    title: "YouTube Thumbnail Downloader",
    short: "Grab YT thumbnails",
    description: "Download YouTube thumbnails in HD, SD and maxres. Paste YouTube URL, preview images and copy or download JPG instantly without upload.",
    icon: "Image",
    keywords: ["youtube thumbnail downloader", "yt thumbnail", "youtube image download"],
    category: "images-design",
    faq: [{ question: "What qualities are available?", answer: "maxresdefault (1280), hqdefault (480), mqdefault, sddefault and default via img.youtube.com." }, { question: "Is it private?", answer: "Yes, only constructs image URLs locally." }],
    howTo: [{ name: "Paste URL", text: "Paste YouTube video URL or ID." }, { name: "Preview", text: "See 5 thumbnail qualities." }, { name: "Download", text: "Copy URL or download JPG." }]
  },
  {
    slug: "inflation-calculator",
    title: "Inflation Calculator",
    short: "Future value & power",
    description: "Calculate future value and purchasing power with inflation. Enter amount, rate and years to see inflated amount and what it buys today.",
    icon: "AccountBalance",
    keywords: ["inflation calculator", "future value inflation", "purchasing power"],
    category: "finance",
    faq: [{ question: "How is future value calculated?", answer: "Future = amount×(1+rate)^years. Purchasing power = amount÷(1+rate)^years." }, { question: "Is this financial advice?", answer: "No, informational only." }],
    howTo: [{ name: "Enter amount", text: "Enter present amount." }, { name: "Set rate & years", text: "Enter inflation rate and years." }, { name: "View", text: "See future value and purchasing power." }]
  },
  {
    slug: "sip-calculator",
    title: "SIP Calculator",
    short: "SIP maturity & gains",
    description: "Calculate SIP maturity, invested amount and gains for monthly investments. Enter monthly SIP, annual rate and years to see future value instantly.",
    icon: "AccountBalance",
    keywords: ["sip calculator", "sip maturity", "sip investment calculator"],
    category: "finance",
    faq: [{ question: "How is SIP calculated?", answer: "Future = monthly×((1+mr)^n−1)/mr×(1+mr), where mr=annual/12/100, n=years×12." }, { question: "Is this financial advice?", answer: "No, informational only." }],
    howTo: [{ name: "Enter SIP", text: "Enter monthly investment." }, { name: "Set rate & years", text: "Enter annual rate and duration." }, { name: "View", text: "See maturity, invested and gains." }]
  },
  {
    slug: "image-color-extractor",
    title: "Image Color Extractor",
    short: "Extract 5 colors",
    description: "Extract 5 dominant colors from any image. Upload photo, see prominent hex swatches with copy — all via canvas locally without upload.",
    icon: "Palette",
    keywords: ["image color extractor", "extract colors from image", "dominant color picker"],
    category: "images-design",
    faq: [{ question: "How are colors chosen?", answer: "Canvas getImageData is bucketed into 4096 buckets and top 5 averaged." }, { question: "Is my image uploaded?", answer: "No, extraction is via canvas locally." }],
    howTo: [{ name: "Choose image", text: "Upload image." }, { name: "Extract", text: "See 5 dominant colors." }, { name: "Copy", text: "Copy hex." }]
  },
  {
    slug: "json-to-excel",
    title: "JSON to Excel",
    short: "JSON → XLS download",
    description: "Convert JSON array to Excel-compatible XLS. Paste JSON, preview table and download .xls that opens in Excel locally.",
    icon: "TableChart",
    keywords: ["json to excel", "json to xls", "convert json to excel"],
    category: "converters",
    faq: [{ question: "What JSON is accepted?", answer: "Array of objects or single object (wrapped). Keys become headers." }, { question: "Is it private?", answer: "Yes, conversion is local." }],
    howTo: [{ name: "Paste JSON", text: "Paste JSON array." }, { name: "Preview", text: "See table preview." }, { name: "Download", text: "Download .xls." }]
  },
  {
    slug: "quotation-generator",
    title: "Quotation Generator",
    short: "Create quotations",
    description: "Create professional quotations with line items, tax and notes. Fill, preview and print — data stays locally, same engine as invoice generator.",
    icon: "ReceiptLong",
    keywords: ["quotation generator", "quote maker", "estimate generator"],
    category: "business",
    faq: [{ question: "How is total calculated?", answer: "Subtotal = sum(qty×rate), tax = subtotal×rate%, total = subtotal+tax." }, { question: "Is it private?", answer: "Yes, all data stays in your browser." }],
    howTo: [{ name: "Fill details", text: "Enter from, to, number and date." }, { name: "Add lines", text: "Add line items with qty and rate." }, { name: "Print", text: "Preview and print/download." }]
  },
  {
    slug: "purchase-order-generator",
    title: "Purchase Order Generator",
    short: "Create purchase orders",
    description: "Generate purchase orders with supplier, ship-to, line items and tax. Fill details, preview and print — all data stays locally in your browser.",
    icon: "ReceiptLong",
    keywords: ["purchase order generator", "po generator", "create purchase order"],
    category: "business",
    faq: [{ question: "How is total calculated?", answer: "Subtotal = sum(qty×rate), tax = subtotal×rate%, total = subtotal+tax." }, { question: "Is it private?", answer: "Yes, all data stays locally." }],
    howTo: [{ name: "Fill details", text: "Enter supplier, ship-to and PO number." }, { name: "Add lines", text: "Add items with qty and rate." }, { name: "Print", text: "Preview and print." }]
  },
  {
    slug: "cover-letter-builder",
    title: "Cover Letter Builder",
    short: "Build cover letters",
    description: "Build tailored cover letters with applicant, job and company details. Choose tone, preview and copy — all offline, no account needed.",
    icon: "Description",
    keywords: ["cover letter builder", "cover letter generator", "make cover letter"],
    category: "business",
    faq: [{ question: "Can I customize tone?", answer: "Yes, choose professional, enthusiastic or concise tone; placeholders are replaced." }, { question: "Is it private?", answer: "Yes, generation is local." }],
    howTo: [{ name: "Enter details", text: "Fill applicant, hiring manager and job details." }, { name: "Choose tone", text: "Pick tone and letter body." }, { name: "Copy", text: "Preview, copy or print cover letter." }]
  },
  {
    slug: "fake-data-generator",
    title: "Fake Data Generator",
    short: "Generate test data",
    description: "Generate fake test data for persons, addresses, companies or lorem. Choose count, generate via secure random and download as CSV locally.",
    icon: "Shuffle",
    keywords: ["fake data generator", "test data generator", "dummy data"],
    category: "generators",
    faq: [{ question: "Is data real?", answer: "No, all names and addresses are randomly generated from fake lists, no real person." }, { question: "Is it private?", answer: "Yes, generation uses crypto.getRandomValues locally." }],
    howTo: [{ name: "Choose type", text: "Pick person, address, company or lorem." }, { name: "Set count", text: "Enter number of rows." }, { name: "Generate", text: "View table, copy or download CSV." }]
  },
  {
    slug: "qr-scanner",
    title: "QR Scanner",
    short: "Scan QR from image",
    description: "Scan QR codes from images or camera. Upload photo or use camera to decode text, URL or WiFi — runs via lazy-loaded jsQR locally.",
    icon: "QrCode2",
    keywords: ["qr scanner", "qr code reader", "scan qr online"],
    category: "images-design",
    faq: [{ question: "Does camera work offline?", answer: "File upload works fully offline; camera requires permission and uses getUserMedia." }, { question: "Is image uploaded?", answer: "No, decoding is via canvas locally after lazy loading jsQR." }],
    howTo: [{ name: "Upload", text: "Upload QR image or start camera." }, { name: "Scan", text: "Decode automatically." }, { name: "Copy", text: "Copy decoded text or open link." }]
  },
  {
    slug: "zip-creator",
    title: "ZIP Creator",
    short: "Create ZIP files",
    description: "Create ZIP files from multiple text files locally. Add files with name and content, generate ZIP via fflate and download — no upload.",
    icon: "AttachFile",
    keywords: ["zip creator", "create zip online", "make zip file"],
    category: "converters",
    faq: [{ question: "What files can I add?", answer: "Text files with filename and content. Add, remove and set ZIP name." }, { question: "Is it private?", answer: "Yes, ZIP is built via fflate locally." }],
    howTo: [{ name: "Add files", text: "Enter filename and content for each file." }, { name: "Set ZIP name", text: "Choose ZIP filename." }, { name: "Create", text: "Click Create ZIP and download." }]
  },
  {
    slug: "ai-detector",
    title: "AI Detector",
    short: "Detect AI-written text",
    description: "Detect AI-written text via heuristic burstiness, variance and repetition. Paste text to see AI likelihood % — heuristic only, not for decisions.",
    icon: "Spellcheck",
    keywords: ["ai detector", "ai content detector", "detect ai text"],
    category: "text-documents",
    faq: [{ question: "How accurate is it?", answer: "Heuristic only ~70% — checks burstiness, variance and uncommon words. Not for academic decisions." }, { question: "Is it private?", answer: "Yes, analysis is local." }],
    howTo: [{ name: "Paste text", text: "Paste text to check." }, { name: "View score", text: "See AI likelihood % with bar." }, { name: "Interpret", text: "High burstiness and low variance suggest AI." }]
  },
  {
    slug: "plagiarism-checker",
    title: "Plagiarism Checker",
    short: "Check uniqueness %",
    description: "Check text uniqueness via 5-gram duplicate detection and optional source comparison. See uniqueness %, duplicates and matches locally.",
    icon: "FindReplace",
    keywords: ["plagiarism checker", "duplicate checker", "uniqueness checker"],
    category: "text-documents",
    faq: [{ question: "Does it search the web?", answer: "No, checks internal duplicates and against pasted source. No web search, fully local." }, { question: "Is it private?", answer: "Yes, all checking is local." }],
    howTo: [{ name: "Paste text", text: "Paste main text." }, { name: "Add source", text: "Optionally paste source to compare." }, { name: "Check", text: "See uniqueness % and duplicate phrases." }]
  },
  {
    slug: "ssl-checker",
    title: "SSL Checker",
    short: "Check SSL certificate",
    description: "Check SSL certificate for any domain. Enter host to see issuer, expiry, grade and days until expiry via SSL Labs API fallback.",
    icon: "VerifiedUser",
    keywords: ["ssl checker", "check ssl certificate", "ssl test online"],
    category: "developer",
    faq: [{ question: "What does it check?", answer: "Grade, issuer, subject, notBefore/notAfter, SANs and days until expiry." }, { question: "Is it private?", answer: "Yes, but uses SSL Labs via allorigins proxy; no cert data stored." }],
    howTo: [{ name: "Enter host", text: "Enter domain like example.com." }, { name: "Check", text: "Click Check SSL." }, { name: "View", text: "See grade, issuer and expiry." }]
  },
  {
    slug: "cmyk-converter",
    title: "CMYK Converter",
    short: "HEX, RGB ↔ CMYK",
    description: "Convert between HEX, RGB and CMYK for print design. Enter any format, see preview and copy — all local without upload.",
    icon: "Palette",
    keywords: ["cmyk converter", "rgb to cmyk", "hex to cmyk"],
    category: "images-design",
    faq: [{ question: "How is CMYK calculated?", answer: "K=1-max(R,G,B), C=(1-R-K)/(1-K) etc., with R/G/B normalized 0-1." }, { question: "Is it private?", answer: "Yes, conversion is local math." }],
    howTo: [{ name: "Enter color", text: "Enter hex, rgb or cmyk." }, { name: "View", text: "See all formats with swatches." }, { name: "Copy", text: "Copy any format." }]
  },
  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    short: "Images → PDF",
    description: "Convert multiple images to a single PDF. Add JPG or PNG, choose page size and orientation, then generate and download PDF via jspdf locally.",
    icon: "Image",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf"],
    category: "pdf",
    faq: [{ question: "What formats are supported?", answer: "JPG and PNG. Images are scaled to fit page." }, { question: "Is it private?", answer: "Yes, PDF is built via jspdf locally." }],
    howTo: [{ name: "Add images", text: "Select multiple images." }, { name: "Choose page", text: "Pick A4 or Letter and orientation." }, { name: "Create", text: "Click Generate PDF and download." }]
  },
  {
    slug: "pdf-merge",
    title: "PDF Merge",
    short: "Merge multiple PDFs",
    description: "Combine multiple PDF files into one document. Select PDFs, reorder and download the merged PDF — all offline in your browser.",
    icon: "PictureAsPdf",
    keywords: ["pdf merge", "combine pdf", "merge pdf online"],
    category: "pdf",
    faq: [{ question: "Is my PDF uploaded?", answer: "No. Merging happens locally in your browser; files never leave your device." }, { question: "Can I reorder files?", answer: "Yes. Drag to reorder files before merging; pages are concatenated in the selected order." }],
    howTo: [{ name: "Select PDFs", text: "Choose two or more PDF files from your device." }, { name: "Reorder", text: "Drag to set the desired order." }, { name: "Merge & download", text: "Click Merge and download the combined PDF." }]
  },
  {
    slug: "pdf-compress",
    title: "PDF Compressor",
    short: "Reduce PDF file size",
    description: "Compress PDF files to reduce size without leaving your browser. Drop a PDF, choose quality and download the optimized file instantly.",
    icon: "PictureAsPdf",
    keywords: ["pdf compressor", "compress pdf", "reduce pdf size"],
    category: "pdf",
    faq: [{ question: "Is my PDF uploaded?", answer: "No. Compression runs locally in your browser." }, { question: "Will quality be reduced?", answer: "You control the compression level; lighter compression keeps visual quality while reducing file size." }],
    howTo: [{ name: "Choose PDF", text: "Select a PDF file from your device." }, { name: "Set compression", text: "Choose compression level." }, { name: "Download", text: "Click Compress and download the smaller PDF." }]
  }
];

const toolMap = new Map<string, Tool>(tools.map((t) => [t.slug, t]));
const categoryMap = new Map<string, Category>(CATEGORIES.map((c) => [c.id, c]));

export const getTool = (slug: string): Tool | undefined => toolMap.get(slug);
export const getToolOrThrow = (slug: string): Tool => {
  const t = toolMap.get(slug);
  if (!t) throw new Error(`Tool not found: ${slug}`);
  return t;
};

export const getCategory = (id: string): Category | undefined => categoryMap.get(id);

export const toolsByCategory = () =>
  CATEGORIES.map((category) => ({
    category,
    tools: tools.filter((t) => t.category === category.id),
  }));

export const groups = toolsByCategory();
export const toolsByCategoryCached = () => groups;

// Ensure tools count matches pages; warn if drift (125 expected)
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  // no-op, validated at build via sitemap
}
