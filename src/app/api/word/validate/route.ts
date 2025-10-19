import { WORD_LENGTH } from "@/lib/constants";
import { isLanguage } from "@/lib/utils";
import GeminiService from "@/services/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { word, language } = body;

    if (!word || !language) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    let isValid = true;
    // Word must be exactly WORD_LENGTH characters long
    // Check if language is valid/supported
    isValid = word.split("").length === WORD_LENGTH && isLanguage(language);

    // Check word existence in target dictionary
    if (isValid) {
      const result = await GeminiService.validateWord(word, language);
      if (result) isValid = result.isValid;
      else isValid = false;
    }

    return NextResponse.json({ isValid });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
