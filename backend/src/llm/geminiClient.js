import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function callGemini(systemPrompt, messages) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: {
      role: "system",
      parts: [{ text: systemPrompt }],
    },
  });

  const history = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history: history.slice(0, -1) });
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}