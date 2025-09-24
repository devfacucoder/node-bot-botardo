import { Client, GatewayIntentBits } from "discord.js";
import cmd from "./cmd.js";

import dotenv from "dotenv";
dotenv.config();
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import { deleteMessages } from "./functions/deleteMessages.js";
//events
import { reminder } from "./events/automaticNotices.js";

//services comands
import animeComand from "./comands/animeComand.js";
import lolBuild from "./comands/lolBuild.js";
import musicCmd from "./comands/music.cmd.js";
const cmds = [animeComand, lolBuild, musicCmd];
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

  if (message.content.startsWith("!play")) {
    musicCmd.execute(message);
  }

  if (message.content === "!help") {
    let text = "Lista de comandos:\n";
    for (const command of cmds) {
      text += `${command.name} - ${command.description}\n`;
    }
    message.reply(text);
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
});

client.login(TOKEN);
