import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import cmd from "./cmd.json" with { type: "json" };
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // para manejar servidores
    GatewayIntentBits.GuildMessages, // para enviar mensajes
    GatewayIntentBits.MessageContent, // para leer mensajes (si necesitas comandos)
  ],
});

const TOKEN = process.env.token; // pega el token del bot
const CHANNEL_ID = "1399823470065618964"; // pega el ID del canal
client.once("ready", async () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
  /*
  try {
    // Buscar el canal
    const channel = await client.channels.fetch(CHANNEL_ID);

    // Enviar mensaje automático
    await channel.send("🚀 Bot iniciado! Este mensaje se envió automáticamente.");
    console.log("📩 Mensaje enviado correctamente!");
  } catch (error) {
    console.error("❌ Error al enviar el mensaje:", error);
  }*/
});
console.log(cmd)

client.on("messageCreate", (message) => {
  for (const command of cmd) {
    if (message.content === command.comand) {
      message.reply(command.text);
    }
  }
});

client.login(TOKEN);
