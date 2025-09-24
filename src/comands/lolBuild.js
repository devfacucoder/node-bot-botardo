import getBuildLolApi from "../services/lolBuildServices.js";

export default {
  name: "!buildlol",
  description: "esto te dara una build de lol aleatoria",
  async execute(message) {
    const dataApi = await getBuildLolApi();
    let text = ""
    for(const item of dataApi.build){
        text +=item.image + " "
    }

    
    message.reply(text);
  },
};
