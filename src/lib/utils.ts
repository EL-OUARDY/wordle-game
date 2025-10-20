import { LANGUAGES } from "@/lib/constants";
import { Language } from "@/types";

export function isLanguage(str: string): str is Language {
  return LANGUAGES.includes(str as Language);
}

export function removeArabicDiacritics(word: string) {
  return word.replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
    "",
  );
}
