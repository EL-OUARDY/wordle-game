import { LANGUAGES } from "@/lib/constants";
import { Language } from "@/types";

export function isLanguage(str: string): str is Language {
  return LANGUAGES.includes(str as Language);
}
