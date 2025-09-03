import axios from "axios";
import * as cheerio from "cheerio";

async function extraerHTML() {
  try {
    const { data } = await axios.get("https://www3.animeflv.net/browse");
    const $ = cheerio.load(data);

    // Extraer texto de un elemento específico
     $("article.Anime.alt.B").each((i, el) => {
      const titulo = $(el).find(".Title").text().trim();       // Título
      const link = $(el).find("a").attr("href");               // Link al anime

      console.log({
        titulo,
        link: `https://www3.animeflv.net${link}`,  // Link completo
      });
    });

  } catch (error) {
    console.error("❌ Error al obtener el HTML:", error.message);
  }
}

extraerHTML();
