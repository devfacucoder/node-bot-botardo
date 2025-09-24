import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";

function playMusic(message) {
  const args = message.content.split(" ");
  const url = args[1];
  if (!url) return message.reply("❌ Tienes que poner un link de YouTube.");

  const channel = message.member.voice.channel;
  if (!channel) return message.reply("❌ Debes estar en un canal de voz.");

  // 1. Conectar al canal de voz (NO ensordecido ni muteado)
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false, // 🔊 el bot no entra ensordecido
    selfMute: false, // 🎤 el bot no entra muteado
  });

  // 2. Crear stream desde YouTube (solo audio)
  const stream = ytdl(url, {
    filter: "audioonly",
    highWaterMark: 1 << 25, // evita cortes en canciones largas
  });

  // 3. Reproducir
  const player = createAudioPlayer();
  const resource = createAudioResource(stream);
  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Playing, () => {
    message.reply("🎶 Reproduciendo música...");
  });

  player.on(AudioPlayerStatus.Idle, () => {
    message.reply("✅ Canción terminada.");
    connection.destroy();
  });

  player.on("error", (error) => {
    console.error("❌ Error en el reproductor:", error);
    message.reply("❌ Hubo un error reproduciendo la canción.");
  });
}
export default playMusic;