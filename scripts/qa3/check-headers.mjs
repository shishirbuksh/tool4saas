async function checkHeaders() {
  const res = await fetch("https://tool4saas.com/json-to-yaml", { redirect: "manual" });
  console.log("Status:", res.status);
  for (const [k, v] of res.headers.entries()) {
    console.log(`${k}: ${v}`);
  }
}
checkHeaders();
