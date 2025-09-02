import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // true = sin interfaz
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Simular navegador real
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
  );

  // Escuchar todas las respuestas de red para capturar la API
  page.on("response", async (response) => {
    const url = response.url();
    if (url.includes("/api/v2/channels/magocloc07")) {
      try {
        const json = await response.json();
        console.log("📌 Datos del canal:", json);

        if (json.livestream) {
          console.log("🔴 Está en directo");
        } else {
          console.log("⚪ No está en directo");
        }
      } catch (err) {
        console.error("❌ Error al parsear JSON:", err);
      }
    }
  });

  // Vamos a la página del canal
  await page.goto("https://kick.com/magocloc07", {
    waitUntil: "networkidle2",
  });

  // Esperamos un poco para que se disparen todas las requests
  await page.waitForTimeout(5000);

  await browser.close();
})();
