import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import cmd from "../cmd.js";
dotenv.config();
const CHANNEL_ID = process.env.CHANNEL_ID;

const deleteMessages = async (client) => {
  const channel = await client.channels.fetch(CHANNEL_ID);
  const messages = await channel.messages.fetch({ limit: 3 });
  console.log(
    `📨 Últimos 10 mensajes en el canal ${channel.name}:\n` +
      messages.map((m) => `${m.author.tag}: ${m.content}`).join("\n")
  );
  messages.forEach(async msg => {
    try {
      await msg.delete();
      console.log(`🗑️ Eliminado: ${msg.content}`);
    } catch (err) {
      console.error("Error al borrar:", err);
    }
  });
};
export { deleteMessages };
