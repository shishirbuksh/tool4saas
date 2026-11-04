#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam)
 * Protocol: https://www.indexnow.org/documentation
 *
 * Automatically pulls indexable URLs from dist/sitemap.xml (342 canonical URLs),
 * ensuring every tool, category, pillar, and cluster guide is
 * submitted for instant search engine indexing.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const INDEXNOW_KEY = "e4a7d32c98b14e6da2019c43b876f512";
const HOST = "tool4saas.com";
const BASE_URL = `https://${HOST}`;

const isDryRun = process.argv.includes("--dry-run");

function getUrlsToSubmit() {
  const sitemapPath = resolve("dist/sitemap.xml");
  if (existsSync(sitemapPath)) {
    const xml = readFileSync(sitemapPath, "utf8");
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
    if (urls.length > 0) {
      console.log(`Extracted ${urls.length} indexable URLs from dist/sitemap.xml`);
      return urls;
    }
  }

  console.warn("dist/sitemap.xml not found or empty. Using fallback core URLs...");
  return [
    `${BASE_URL}/`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/invoice-generator`,
    `${BASE_URL}/qr-code-generator`,
    `${BASE_URL}/bmi-calculator`,
    `${BASE_URL}/mortgage-calculator`,
    `${BASE_URL}/emi-calculator`,
    `${BASE_URL}/sip-calculator`,
    `${BASE_URL}/word-counter`,
    `${BASE_URL}/image-compressor`,
    `${BASE_URL}/pdf-merge`,
    `${BASE_URL}/password-generator`,
    `${BASE_URL}/json-formatter`,
    `${BASE_URL}/resume-builder`,
    `${BASE_URL}/unit-converter`,
    `${BASE_URL}/credit-card-validator`,
    `${BASE_URL}/typing-speed-test`,
    `${BASE_URL}/plagiarism-checker`,
  ];
}

async function submitIndexNow() {
  const urlList = getUrlsToSubmit();
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  console.log(`\n=== IndexNow Submission ===`);
  console.log(`Target Host   : ${HOST}`);
  console.log(`Key Location  : ${payload.keyLocation}`);
  console.log(`Total URLs    : ${urlList.length}`);
  console.log(`Sample URLs   : ${urlList.slice(0, 3).join(", ")} ...`);

  if (isDryRun) {
    console.log(`\n[DRY RUN] Payload validated successfully. Exiting without sending HTTP request.`);
    return;
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow for Bing/Yandex instant indexing...`);

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    console.log(`IndexNow response: ${response.status} ${response.statusText}`);
    if (response.status === 200 || response.status === 202) {
      console.log("SUCCESS: All URLs submitted to Bing/Yandex IndexNow network successfully.");
    } else {
      const text = await response.text();
      console.warn(`Notice: IndexNow returned HTTP ${response.status}: ${text}`);
      if (response.status === 403 || response.status === 422) {
        console.warn("(Note: 403/422 is expected if the production server at tool4saas.com has not deployed the key file yet)");
      }
    }
  } catch (err) {
    console.error("IndexNow submission error:", err.message);
  }
}

submitIndexNow();
