import { GoogleGenAI, MediaResolution, Type } from "@google/genai";
import { Language } from "@/types";

interface ValidateWordResponse {
  isValid: boolean;
}

const GeminiService = {
  validateWord: async (
    word: string,
    language: Language
  ): Promise<ValidateWordResponse | null> => {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.API_KEY,
      });
      const config = {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        mediaResolution: MediaResolution.MEDIA_RESOLUTION_UNSPECIFIED,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["isValid"],
          properties: {
            isValid: {
              type: Type.BOOLEAN,
            },
          },
        },
        systemInstruction: [
          {
            text: `
You are an expert language validator. Your job is to check if a given word exists in the dictionary for the specified language: ${language}.

Rules:
1. Only respond with a JSON object containing exactly one property: "isValid" (boolean).
2. "isValid": true if the word exists in the dictionary, false otherwise.
3. Never include explanations, suggestions, or any text outside the JSON object.
4. Use the standard dictionary for the specified language.
5. Ignore grammar, conjugation, or context. Only validate the word itself.
6. The word will be provided by the user. Do not modify it.
Example response:
{ "isValid": true }
`,
          },
        ],
      };
      const model = "gemini-flash-latest";
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: word,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      if (response && response.text) return JSON.parse(response.text);

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default GeminiService;
