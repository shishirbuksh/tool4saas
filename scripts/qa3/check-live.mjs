async function checkLiveHeaders() {
  try {
    const res = await fetch("https://tool4saas.com/", { redirect: "manual" });
    console.log("Live https://tool4saas.com/ status:", res.status);
    console.log("Headers:");
    for (const [k, v] of res.headers.entries()) {
      if (["server", "strict-transport-security", "content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy"].includes(k)) {
        console.log(`  ${k}: ${v}`);
      }
    }
    
    // Check http port 80 redirect
    const resHttp = await fetch("http://tool4saas.com/", { redirect: "manual" });
    console.log("\nLive http://tool4saas.com/ status:", resHttp.status);
    console.log("Location:", resHttp.headers.get("location"));

    // Check www redirect
    const resWww = await fetch("https://www.tool4saas.com/", { redirect: "manual" });
    console.log("\nLive https://www.tool4saas.com/ status:", resWww.status);
    console.log("Location:", resWww.headers.get("location"));

    // Check a sample legacy redirect on live
    const resLegacy1 = await fetch("https://tool4saas.com/es/word-counter", { redirect: "manual" });
    console.log("\nLive https://tool4saas.com/es/word-counter status:", resLegacy1.status);
    console.log("Location:", resLegacy1.headers.get("location"));

    const resLegacy2 = await fetch("https://tool4saas.com/json-to-yaml", { redirect: "manual" });
    console.log("\nLive https://tool4saas.com/json-to-yaml status:", resLegacy2.status);
    console.log("Location:", resLegacy2.headers.get("location"));
  } catch (err) {
    console.error("Error:", err.message);
  }
}
checkLiveHeaders();
