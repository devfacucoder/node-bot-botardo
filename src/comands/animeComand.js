import { getRandomAnime } from "../services/animeServices.js";

export default {
  name: "!anime",
  description: "Te Recomiendo un Anime",
  async execute(message) {
    const anime = await getRandomAnime();

    if (!anime)
      return message.reply("error en encontrar anime, intenta mas tarde");

    message.reply(`🎌 **${anime.titulo}**\n🔗 ${anime.link}   \n📸`);
  },
};
