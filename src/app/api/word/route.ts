import { NextRequest, NextResponse } from "next/server";
import { isLanguage } from "@/lib/utils";
import GeminiService from "@/services/gemini";
import { WORD_LENGTH } from "@/lib/constants";
import { Language } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language") || "English";

    // Check if language is valid/supported
    if (!isLanguage(language as string))
      return NextResponse.json(
        { error: "Unsupported language." },
        { status: 400 },
      );

    // Generate word
    const word = await GeminiService.generateWord(
      language as Language,
      WORD_LENGTH,
    );

    if (!word || word.split("").length !== WORD_LENGTH) {
      return NextResponse.json({ error: "Bad requests" }, { status: 400 });
    }

    return NextResponse.json({ word: word.toLowerCase() });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
