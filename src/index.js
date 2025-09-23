import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import cmd from "./cmd.js";

import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import fs from "fs";
import { getAnimeRecommendations } from "./functions/recomendAnime.js";
import { deleteMessages } from "./functions/deleteMessages.js";
import { demuxProbe } from "@discordjs/voice";
//events
import { reminder } from "./events/automaticNotices.js";

//services comands
import animeComand from "./comands/animeComand.js";
import lolBuild from "./comands/lolBuild.js";

dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // para manejar servidores
    GatewayIntentBits.GuildMessages, // para enviar mensajes
    GatewayIntentBits.MessageContent, // para leer mensajes (si necesitas comandos)
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const TOKEN = process.env.token; // pega el token del bot
const CHANNEL_ID = process.env.CHANNEL_ID; // pega el ID del canal
client.once("ready", async () => {
  try {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
    //await reminder(client);
    /*
    const channel = await client.channels.fetch(CHANNEL_ID);
    await reminder(client);
    const latsMsg = await channel.messages.fetch({ limit: 1 });
    const userId = process.env.USER_SPECIAL; // ID del usuario
    await channel.send(`<@${userId}> ¡Te mencionaron! 🔔`);
    */
  } catch (error) {
    console.error("❌ Error al enviar el mensaje:", error);
  }
  /*
    // Buscar el canal
    const channel = await client.channels.fetch(CHANNEL_ID);

    // Enviar mensaje automático
    await channel.send("🚀 Bot iniciado! Este mensaje se envió automáticamente.");
    console.log("📩 Mensaje enviado correctamente!");
    */
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // para que no se responda a si mismo

  if (message.content === "!delete") {
    if (message.author.id === process.env.USER_SPECIAL)
      await deleteMessages(client);
  }

  if (message.author.bot) return;

  if (message.content.startsWith("!play ")) {
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

  if (message.content === "!help") {
    message.reply(
      "Lista de comandos:\n" +
        cmd.map((c) => c.comand + " - " + c.text).join("\n")
    );
  }
  if (message.content === "!admin") {
    if (message.author.id === process.env.USER_SPECIAL)
      return message.reply(
        "Eres el usuario especial, tienes acceso a comandos de administrador."
      );
    else
      return message.reply(
        "No eres el usuario especial, no tienes acceso a comandos de administrador."
      );
  } // para que no se responda a si mismo
  if (message.content === "!anime") {
    animeComand.execute(message);
  }
  if (message.content === "!lolbuild") {
    lolBuild.execute(message);
  }
  for (const command of cmd) {
    if (message.content === command.comand) {
      if (command.onLyView) continue;
      message.reply(command.text);
    }
  }
});

client.login(TOKEN);
