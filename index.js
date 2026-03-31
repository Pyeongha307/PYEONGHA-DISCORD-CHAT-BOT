import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// สมมติอยู่ใน messageCreate
if (message.content.startsWith("!ai")) {
  const userMessage = message.content.replace("!ai ", "");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "คุณเป็น AI ที่ร่าเริง ขี้เล่น ขี้แกล้ง gen z"
        },
        {
          role: "user",
          content: userMessage
        }
      ],
    });

    message.reply(response.choices[0].message.content);

  } catch (error) {
    console.error(error);
    message.reply("ระบบรวนมาพิมพ์/แก้ดีๆบัดเดี๋ยวนี้😡");
  }
}
