import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

export const chatModel = genAI.models.generateContentStream.bind(genAI.models);

export async function getGeminiResponse(message: string, history: { role: string, parts: { text: string }[] }[]) {
  const model = "gemini-3-flash-preview";
  
  const response = await genAI.models.generateContent({
    model,
    contents: [
      { role: 'user', parts: [{ text: `You are Evera, a 24/7 health and wellness assistant. You are friendly, editorial, and helpful. You speak Traditional Chinese (Taiwan). Your goal is to help users with their health and recommend products from our catalog when appropriate. Our products include: 極萃滴雞精, 甘甘好, 睡眠 PLUS 益生菌, 助眠眼罩, 薰衣草精油, 孅 PLUS 益生菌. If you recommend a product, mention it by its exact name.` }] },
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    }
  });

  return response.text;
}
