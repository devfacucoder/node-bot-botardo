/**
 * aca obtiene la pagina de animeflv el directorio de anime y obtiene los primero 24 resultados
 * y luego genera un numero aleatorio y lo retorna en la funcion getAnimeRecommendations
 * TODO proximanente hay que mejorar su funcionamiento para que sea mas especifico
 * recomendame un anime de accion con comedia: eso solo hay que combinar los filtros en la
 * herramienta de busqueda de animeflv
 */

import axios from "axios";
import * as cheerio from "cheerio";

export const getRandomAnime = async () => {
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
    const numerRandom = Math.floor(Math.random() * 24) + 1;

    return res[numerRandom];
  } catch (error) {
    console.error(
      "❌ Error al obtener el HTML:en recomendar anime",
      error.message
    );
    return null;
  }
};
