import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// สร้างบอท
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// เชื่อม AI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// บอทออนไลน์
client.on("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  client.user.setPresence({
    activities: [{ name: "คุยกับคุณอยู่ 😌", type: 0 }],
    status: "online",
  });
});

// รับข้อความ
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!ai")) {
    const prompt = message.content.slice(3).trim();

    if (!prompt) {
      return message.reply("จะให้ตอบอะไรล่ะ… พิมพ์มาด้วย 😐");
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a slightly sarcastic but caring AI. Speak Thai.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const reply = response.choices[0].message.content;
      await message.reply(reply);

    } catch (error) {
      console.error(error);
      message.reply("มีอะไรพังอีกละ… ลองใหม่ 😑");
    }
  }
});

// ล็อกอินบอท
client.login(process.env.DISCORD_TOKEN);
