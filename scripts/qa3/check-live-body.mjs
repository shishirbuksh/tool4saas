async function inspectLiveLegacyBody() {
  const res = await fetch("https://tool4saas.com/json-to-yaml");
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Snippet (first 500 chars):", text.slice(0, 500));
}
inspectLiveLegacyBody();
