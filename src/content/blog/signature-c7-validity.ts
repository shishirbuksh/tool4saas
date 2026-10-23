import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Is an electronic signature valid?” sounds like a yes-or-no question. In practice it depends on the framework that applies, the type of document, the intent of the people signing and the evidence that survives afterward. A typed name in an email, a signature image on a PDF and a qualified digital signature are all electronic in some sense, but they carry very different levels of assurance.</p>
<p>This is general information, not legal advice. The summary below covers the ideas shared by common frameworks, then the broad shape of US ESIGN, EU eIDAS and India’s IT Act. For the image side, see the <a href="/blog/signature-maker-guide">signature maker guide</a>. For a specific agreement, consult a qualified lawyer in the relevant jurisdiction.</p>

<h2 id="three-building-blocks">Intent, consent and record integrity</h2>
<p>Most electronic signature rules ask three practical questions. First, did the person intend to sign? A signature placed on a document is usually evidence of intent, but the surrounding facts matter. Second, did the parties agree to conduct the transaction electronically? Consumer protection rules often require clear consent and disclosures before electronic records replace paper. Third, can the record be retained and reproduced accurately? If the signed file cannot be shown later in a reliable form, the signature is hard to rely on.</p>
<p>A fourth idea sits underneath all three: attribution. Can you connect the mark to a particular person? An email account, a one-time code, a platform login or a digital certificate can support attribution. A transparent PNG on its own does not. That is why two documents can both look “signed” while carrying very different weight.</p>
<p>None of these elements is a magic checklist that makes a signature immune to challenge. They are the questions a court, regulator or counterparty is likely to ask when a signature is disputed.</p>

<h2 id="us-esign">United States: ESIGN and UETA</h2>
<p>The federal Electronic Signatures in Global and National Commerce Act, usually called ESIGN, gives electronic signatures and records legal effect for many transactions in interstate or foreign commerce. It does not say every electronic mark is valid in every situation. The Act generally requires intent to sign, consent to electronic records, and a system that lets the parties retain and reproduce the record. State-level UETA rules follow a similar pattern.</p>
<p>ESIGN also excludes certain documents, and the list matters. Wills, codicils and testamentary trusts, family law matters, court orders and notices, and several consumer notices are outside its general coverage or subject to special rules. Some transactions involving utilities, insurance and foreclosure require specific consent or paper notices. The exact scope is technical, so do not assume that a signature image works for every agreement just because the parties are in the US.</p>
<p>For ordinary commercial contracts, a platform that records consent, identity checks, timestamps and the final document usually provides stronger evidence than a PNG pasted onto a page. The platform does not make a signature automatically enforceable, but it creates a record that is easier to explain if the document is challenged.</p>

<h2 id="eu-eidas">European Union: eIDAS levels</h2>
<p>eIDAS is the EU regulation that gives a common framework for electronic identification and trust services. It describes three levels of electronic signature. A simple electronic signature is data in electronic form attached to or associated with other electronic data, used to sign. An advanced electronic signature is uniquely linked to the signer, capable of identifying the signer, created using data the signer controls and linked to the document so that later changes are detectable. A qualified electronic signature is an advanced signature created with a qualified certificate and a qualified signature creation device.</p>
<p>The practical difference is assurance. A simple signature may be enough for a low-risk internal approval, while a qualified signature is designed to carry a high level of identity assurance and is recognized across EU member states. Under eIDAS, a qualified electronic signature has the equivalent effect of a handwritten signature. That does not mean every document can be signed electronically; national rules still impose witnesses, notarization, registration or specific formalities for some transactions.</p>
<p>If a counterparty asks for a “qualified” signature, an image will not satisfy the request. The signature must come from a qualified trust service provider and meet the technical requirements of the framework.</p>

<h2 id="india-it-act">India: the IT Act and digital signatures</h2>
<p>India’s Information Technology Act, 2000 gives legal recognition to electronic records and electronic signatures, subject to the Act’s requirements. The framework includes digital signatures based on certificates issued by licensed certifying authorities, and it recognizes other electronic signature methods notified under the Act. Aadhaar-based eSign is widely used for routine digital paperwork, while a digital signature certificate, or DSC, is common for company filings, tax portals and other official submissions.</p>
<p>The IT Act also excludes certain documents from electronic signature treatment. The First Schedule includes negotiable instruments other than cheques, powers of attorney, trusts, wills and contracts for the sale or conveyance of immovable property. Those documents may still involve electronic processing, but the signature and formality rules are not solved by attaching a PNG. A sale deed, for example, typically involves stamp duty, witnesses and registration, and those requirements sit outside what an image signature can provide.</p>
<p>For a company filing that asks for a DSC, the portal is not asking for a picture of a signature. It is asking for a cryptographic credential tied to a certificate. Use the credential the portal specifies.</p>

<table>
<thead><tr><th>Framework</th><th>Core idea</th><th>Signature levels or tools</th><th>What it does not remove</th></tr></thead>
<tbody>
<tr><td>US ESIGN and UETA</td><td>Electronic signatures and records can have legal effect when the rules are met</td><td>Broad category, including simple electronic signatures</td><td>Document exclusions, consumer consent and specific notices</td></tr>
<tr><td>EU eIDAS</td><td>Common rules for electronic identification and trust services</td><td>Simple, advanced and qualified electronic signatures</td><td>National witness, notarization and registration rules</td></tr>
<tr><td>India IT Act</td><td>Legal recognition for electronic records and specified signature methods</td><td>DSC, Aadhaar eSign and other notified methods</td><td>Excluded documents and formalities such as stamp duty or registration</td></tr>
</tbody>
</table>

<h2 id="document-caveats">Document caveats that override the signature type</h2>
<p>Some documents need more than a signature, electronic or otherwise. A will may need witnesses. A property transfer may need a notarized or registered deed. A court filing may need a specific digital signature. A company registry may accept only a DSC. A cross-border contract may be governed by a law that imposes its own formalities. In those situations, the question is not “is an electronic signature valid?” but “what does this document require?”</p>
<p>Consent is another practical caveat. A consumer may be entitled to receive certain disclosures on paper or to withdraw consent to electronic delivery. An employee may be subject to an internal policy that requires a particular system. A counterparty may simply refuse to accept anything other than a named e-signature platform. Those are contractual and operational constraints, not just legal ones.</p>
<p><strong>Example 1: a US freelance agreement.</strong> A designer in Texas sends an $1,800 project agreement through a platform that verifies the client’s email, records a timestamp and stores the final PDF. Both parties intend to sign and consent to electronic delivery. This is the kind of simple electronic signature that ESIGN and UETA are designed to accommodate, but the agreement’s terms, the consumer disclosures and any document-specific exceptions still matter.</p>
<p><strong>Example 2: an Indian company filing.</strong> A Bengaluru startup submits an MCA form that requires a DSC. The founder attaches the company’s digital signature token and completes the portal flow. A PNG of the founder’s signature would not satisfy the portal, because the requirement is a cryptographic credential rather than a visual mark.</p>

<h2 id="where-image-signature-fits">Where an image signature fits</h2>
<p>An image signature is best understood as a visual mark, not as a complete trust system. It can show that a person intended to associate a mark with a document, and it can be perfectly adequate for an internal approval, a low-risk acknowledgment or an informal agreement where the parties are not disputing authenticity. The surrounding email thread, the file history and the conduct of the parties may supply context that the image itself does not.</p>
<p>It is a poor fit when identity assurance, tamper evidence or a regulated signature level is required. It is also a poor fit when the recipient has explicitly asked for a platform, a DSC or a qualified signature. In those cases, use the specified process. The <a href="/signature-maker">signature maker</a> can produce a clean transparent PNG for the visual mark, and the <a href="/image-compressor">image compressor</a> can resize a copy for a portal, but neither tool turns the image into a verified electronic signature.</p>
<p>Before signing anything important, read the instructions, identify the required signature type and keep a complete copy of the final record. If the document involves significant money, property, family law or a regulated filing, get advice from a qualified professional in the relevant jurisdiction. For the practical image workflow, see <a href="/blog/signature-maker-guide/sign-pdf-without-printing">sign a PDF without printing</a>. For the difference between a drawn and typed mark, see <a href="/blog/signature-maker-guide/drawn-vs-typed-signature">drawn vs typed signature</a>.</p>
<div class="cta-box"><strong>Create the visual mark:</strong> open the <a href="/signature-maker">signature maker</a> to draw or type a signature and download a transparent PNG. Use it where a visual signature is appropriate, and use the process the document actually requires when assurance matters.</div>
`;

export const signatureValidity: BlogPost = {
  pillar: "signature-maker-guide",
  slug: "electronic-signature-validity",
  kind: "cluster",
  title: "Electronic Signature Validity: ESIGN, eIDAS and India",
  description:
    "How electronic signature validity works in general: intent, consent and record integrity under US ESIGN, EU eIDAS and India’s IT Act, with document caveats.",
  keywords: ["electronic signature validity", "esign act requirements", "eidas signature levels", "india it act electronic signature", "is an image signature valid"],
  toolSlugs: ["signature-maker"],
  relatedSlugs: ["sign-pdf-without-printing", "signature-for-exam-forms", "how-to-create-signature-online", "drawn-vs-typed-signature"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "three-building-blocks", text: "Intent, consent and record integrity", level: 2 },
    { id: "us-esign", text: "United States: ESIGN and UETA", level: 2 },
    { id: "eu-eidas", text: "European Union: eIDAS levels", level: 2 },
    { id: "india-it-act", text: "India: the IT Act", level: 2 },
    { id: "document-caveats", text: "Document caveats", level: 2 },
    { id: "where-image-signature-fits", text: "Where an image signature fits", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is a picture of a signature legally valid?", answer: "It can be evidence of intent in some situations, but it does not verify who placed it or whether the document changed afterward. Many frameworks allow simple electronic signatures, while others require a specific method, a witness, a notarized deed or a digital certificate. This is general information, not legal advice; check the rules for your document and jurisdiction." },
    { question: "What makes an electronic signature valid?", answer: "Common frameworks look for intent to sign, consent to electronic records, a reliable way to retain and reproduce the record, and some link between the signature and the signer. The details vary by jurisdiction. A platform with identity checks and an audit trail usually provides stronger evidence than a pasted image, but it still does not override document-specific formalities." },
    { question: "What is a qualified electronic signature?", answer: "Under EU eIDAS, a qualified electronic signature is an advanced signature created with a qualified certificate and a qualified signature creation device. It is designed to carry a high level of identity assurance and has the equivalent effect of a handwritten signature under the regulation. It is not the same thing as a signature image or a simple click-to-accept signature." },
    { question: "Does ESIGN cover every type of document?", answer: "No. ESIGN and UETA exclude or treat separately certain documents such as wills, family law matters, court documents and some consumer notices. The exact scope is technical and fact-specific. For anything beyond an ordinary commercial agreement, check the applicable state and federal rules before relying on an electronic signature." },
    { question: "Can I use the signature maker for a contract?", answer: "You can use it to create the visual mark, and many informal agreements are handled with an inserted signature image. That does not make the contract valid in every circumstance. If the contract is high-value, regulated or explicitly requires a platform, DSC or qualified signature, use the required process and get legal advice where appropriate." },
    { question: "Do I need a DSC for Indian government portals?", answer: "Many Indian government and company filings require a digital signature certificate or Aadhaar eSign, and the portal will specify which method it accepts. A PNG signature image is not a substitute for a DSC. Check the filing instructions and use the credential the portal requests." },
  ],
};
