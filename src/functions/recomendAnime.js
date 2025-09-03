import axios from "axios";
import * as cheerio from "cheerio";

async function extraerHTML() {
  try {
    const { data } = await axios.get("https://www3.animeflv.net/browse");
    const $ = cheerio.load(data);
    let res = [];
    // Extraer texto de un elemento específico
    $("article.Anime.alt.B").each((i, el) => {
      const titulo = $(el).find(".Title").text().trim(); // Título
      const link = $(el).find("a").attr("href"); // Link al anime

      res.push({ titulo, link: `https://www3.animeflv.net${link}` });
    });
    return res;
  } catch (error) {
    console.error("❌ Error al obtener el HTML:", error.message);
  }
}

//extraerHTML();

const getAnimeRecommendations = async () => {
  const numerRandom = Math.floor(Math.random() * 24) + 1;

  const data = await extraerHTML(); //TODO proximamente que la peticion se cada 10min para que no haga peticion por cada mensaje
  return data[numerRandom];
};


export { getAnimeRecommendations };