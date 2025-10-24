
import { GoogleGenAI, Type } from "@google/genai";
import type { ModerationResult } from '../types';

export async function moderateContent(content: string): Promise<ModerationResult> {
  // In a real app, the API key would be stored securely and not be undefined.
  // For this demo, we assume process.env.API_KEY is available.
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set. Returning a mock response.");
    // Return a mock response if API key is not available
    if (content.toLowerCase().includes("badword")) {
        return { isHalal: false, reason: "Mock response: Contains prohibited language." };
    }
    return { isHalal: true, reason: "Mock response: Content appears to be acceptable." };
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are an AI content moderator for "UmmahConnect", a social network for Muslims. Your task is to determine if a piece of content is "Halal" (permissible) according to our community guidelines.

Guidelines for non-permissible (Haram) content include:
- Hate speech, racism, or incitement to violence.
- Profanity, vulgarity, or obscene language.
- Promotion of haram (forbidden) activities such as gambling, alcohol, intoxicants, or riba (usury).
- Content that is sexually explicit, suggestive, or immodest.
- Disrespect towards Allah, Prophets, Islamic figures, symbols, or core beliefs.
- Spreading misinformation, slander, or fitna (discord).

Analyze the provided text. Your response MUST be a valid JSON object with NO markdown formatting. The JSON object must have two keys:
1. "isHalal": a boolean value (true if permissible, false if not).
2. "reason": a brief, neutral string explaining your decision in one sentence.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Please moderate this text: "${content}"`,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    isHalal: { type: Type.BOOLEAN },
                    reason: { type: Type.STRING },
                },
                required: ["isHalal", "reason"],
            }
        },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as ModerationResult;

  } catch (error) {
    console.error("Error moderating content with Gemini API:", error);
    // Fallback in case of API error
    return { isHalal: true, reason: "Could not automatically moderate content due to an API error." };
  }
}
