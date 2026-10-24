#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam)
 * Protocol: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = "e4a7d32c98b14e6da2019c43b876f512";
const HOST = "tool4saas.com";
const BASE_URL = `https://${HOST}`;

// High priority URLs to notify search engines of recent updates
const URLS_TO_SUBMIT = [
  `${BASE_URL}/`,
  `${BASE_URL}/es`,
  `${BASE_URL}/fr`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/guides`,
  // 16 Core Tools (EN, ES, FR)
  `${BASE_URL}/invoice-generator`,
  `${BASE_URL}/es/invoice-generator`,
  `${BASE_URL}/fr/invoice-generator`,
  `${BASE_URL}/qr-code-generator`,
  `${BASE_URL}/es/qr-code-generator`,
  `${BASE_URL}/fr/qr-code-generator`,
  `${BASE_URL}/bmi-calculator`,
  `${BASE_URL}/es/bmi-calculator`,
  `${BASE_URL}/fr/bmi-calculator`,
  `${BASE_URL}/mortgage-calculator`,
  `${BASE_URL}/es/mortgage-calculator`,
  `${BASE_URL}/fr/mortgage-calculator`,
  `${BASE_URL}/emi-calculator`,
  `${BASE_URL}/es/emi-calculator`,
  `${BASE_URL}/fr/emi-calculator`,
  `${BASE_URL}/sip-calculator`,
  `${BASE_URL}/es/sip-calculator`,
  `${BASE_URL}/fr/sip-calculator`,
  `${BASE_URL}/word-counter`,
  `${BASE_URL}/es/word-counter`,
  `${BASE_URL}/fr/word-counter`,
  `${BASE_URL}/image-compressor`,
  `${BASE_URL}/es/image-compressor`,
  `${BASE_URL}/fr/image-compressor`,
  `${BASE_URL}/pdf-merge`,
  `${BASE_URL}/es/pdf-merge`,
  `${BASE_URL}/fr/pdf-merge`,
  `${BASE_URL}/password-generator`,
  `${BASE_URL}/es/password-generator`,
  `${BASE_URL}/fr/password-generator`,
  `${BASE_URL}/json-formatter`,
  `${BASE_URL}/es/json-formatter`,
  `${BASE_URL}/fr/json-formatter`,
  `${BASE_URL}/resume-builder`,
  `${BASE_URL}/es/resume-builder`,
  `${BASE_URL}/fr/resume-builder`,
  `${BASE_URL}/unit-converter`,
  `${BASE_URL}/es/unit-converter`,
  `${BASE_URL}/fr/unit-converter`,
  `${BASE_URL}/credit-card-validator`,
  `${BASE_URL}/es/credit-card-validator`,
  `${BASE_URL}/fr/credit-card-validator`,
  `${BASE_URL}/typing-speed-test`,
  `${BASE_URL}/es/typing-speed-test`,
  `${BASE_URL}/fr/typing-speed-test`,
  `${BASE_URL}/plagiarism-checker`,
  `${BASE_URL}/es/plagiarism-checker`,
  `${BASE_URL}/fr/plagiarism-checker`,
];

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: URLS_TO_SUBMIT,
  };

  console.log(`Submitting ${URLS_TO_SUBMIT.length} URLs to IndexNow for Bing/Yandex instant indexing...`);

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow response: ${response.status} ${response.statusText}`);
    if (response.status === 200 || response.status === 202) {
      console.log("SUCCESS: URLs submitted to Bing IndexNow network successfully.");
    } else {
      const text = await response.text();
      console.warn(`Notice: IndexNow returned HTTP ${response.status}: ${text}`);
    }
  } catch (err) {
    console.error("IndexNow submission error:", err.message);
  }
}

submitIndexNow();
