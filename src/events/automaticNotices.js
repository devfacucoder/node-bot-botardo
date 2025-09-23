import dotenv from "dotenv";
dotenv.config();

export const reminder = async (client) => {
  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    const userId = process.env.USER_SPECIAL; // ID del usuario
    const msgHXH = `este es un recordatorio para <@${userId}> que continue con Hunter X Hunter`;
    await channel.send(msgHXH);
  } catch (error) {
    console.log("error en la funcion reminder" + error);
  }
};
