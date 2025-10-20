import { LANGUAGES } from "@/lib/constants";
import { Language } from "@/types";
import { intervalToDuration } from "date-fns";
import { Variants } from "motion";

export function isLanguage(str: string): str is Language {
  return LANGUAGES.includes(str as Language);
}

export function removeArabicDiacritics(word: string) {
  return word.replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
    "",
  );
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function anim(animate: string, variants: Variants, custom: any = null) {
  return {
    initial: "initial",
    animate,
    exit: "exit",
    variants,
    custom,
  };
}

export function getTimeDifference(start: Date, end: Date): string {
  const duration = intervalToDuration({ start, end });

  const parts: string[] = [];

  if (duration.hours)
    parts.push(`${duration.hours} hour${duration.hours > 1 ? "s" : ""}`);
  if (duration.minutes)
    parts.push(`${duration.minutes} minute${duration.minutes > 1 ? "s" : ""}`);
  if (duration.seconds)
    parts.push(`${duration.seconds} second${duration.seconds > 1 ? "s" : ""}`);

  // fallback if all are 0 (like < 1 sec)
  return parts.length > 0 ? parts.join(" ") : "less than a second";
}
