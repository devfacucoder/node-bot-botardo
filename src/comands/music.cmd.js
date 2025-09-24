import playMusic from "../services/music.js";

export default {
  name: "!play",
  description:
    "escribe ´!play´ y luego pon el link de youtube para reproducir musica",

  execute(message) {
    playMusic(message);
  },
};
