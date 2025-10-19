import { Language } from "@/types";

const WordService = {
  isValidWord: async (word: string, language: Language) => {
    const res = await fetch("/api/word/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, language }),
    });

    const data = await res.json();
    if (res.ok) return data.isValid;
  },
};

export default WordService;
