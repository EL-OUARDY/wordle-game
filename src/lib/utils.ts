import { APP_NAME, EMAIL, LANGUAGES, WORD_LENGTH } from "@/lib/constants";
import { Language, LetterStatus, Locale } from "@/types";
import clsx, { ClassValue } from "clsx";
import { Variants } from "motion";
import { twMerge } from "tailwind-merge";
import * as htmlToImage from "html-to-image";
import { languagesList } from "@/components/LanguagesMenu";

export const ranks = [
  { name: "Novice", min: 0, color: "#10B981" }, // teal/green
  { name: "Rookie", min: 5, color: "#FB923C" }, // orange
  { name: "Skilled", min: 15, color: "#6366f1" }, // indigo
  { name: "Expert", min: 30, color: "#FBBF24" }, // yellow
  { name: "Master", min: 50, color: "#60A5FA" }, // blue
  { name: "Knight", min: 75, color: "#EF4444" }, // red
  { name: "King", min: 100, color: "#A855F7" }, // purple
  { name: "Legend", min: 120, color: "#3B82F6" }, // bright blue
  { name: "Elite", min: 150, color: "#F472B6" }, // pink
  { name: "Villain", min: 180, color: "#D97706" }, // orange-brown
  { name: "Hero", min: 220, color: "#f43f5e" }, // rose
  { name: "Wizard", min: 250, color: "#8B5CF6" }, // violet
  { name: "Devil", min: 270, color: "#7F1D1D" }, // dark red
  { name: "Angel", min: 300, color: "#0ea5e9" }, // sky blue
  { name: "GOD", min: 365, color: "#FFD700" }, // golden
];

/**
 * Returns the status of each letter in a guess compared to the solution.
 * Handling edge cases involving duplicate letters
 */
export function evaluateGuess(solution: string, guess: string): LetterStatus[] {
  if (!solution || !guess) return [];

  const statuses: LetterStatus[] = Array(solution.length).fill("absent");

  // Find correct letters
  const unmatched = new Map<string, number>();
  for (let i = 0; i < solution.length; i++) {
    if (guess[i] === solution[i]) {
      statuses[i] = "correct";
    } else {
      const count = unmatched.get(solution[i]) ?? 0;
      unmatched.set(solution[i], count + 1);
    }
  }

  // Find present letters
  for (let i = 0; i < solution.length; i++) {
    if (statuses[i] === "correct") {
      continue;
    }
    const count = unmatched.get(guess[i]);
    if (count !== undefined && count > 0) {
      statuses[i] = "present";
      unmatched.set(guess[i], count - 1);
    }
  }
  return statuses;
}

export function isValidLetter(char: string) {
  return /^[a-zA-Z]$/.test(char);
}

export function isValidWord(word: string) {
  if (!word) return false;
  return word.length === WORD_LENGTH && [...word].every(isValidLetter);
}

export function isLanguage(str: string): str is Language {
  return LANGUAGES.includes(str as Language);
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

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const share = async () => {
  const title = document.title;
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        url,
        text: `${title} 🧩\n${url}`,
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name !== "AbortError") {
        console.error("Error sharing:", err);
        await copyToClipboard(url);
        alert("Link copied to clipboard!");
      } else if (!(err instanceof DOMException)) {
        console.error("Unexpected error:", err);
      }
    }
  } else {
    await copyToClipboard(url);
    alert("Link copied to clipboard!");
  }
};

export const getRank = (solved: number) =>
  ranks
    .slice()
    .reverse()
    .find((r) => solved >= r.min) || ranks[0];

export const wordlesToNextRank = (wins: number) => {
  for (let i = 0; i < ranks.length; i++) {
    const rank = ranks[i];
    const nextRank = ranks[i + 1];

    if (wins < rank.min) continue; // not reached this rank yet
    if (!nextRank) return -1; // already at top rank

    if (wins >= rank.min && wins < nextRank.min) {
      return nextRank.min - wins;
    }
  }
  return 0;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeArabicDiacritics(word: string) {
  return word.replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
    "",
  );
}

export async function captureBoardAndShare() {
  const el = document.getElementById("board");
  if (!el) return;

  await document.fonts.ready; // ensure custom fonts are loaded

  const scale = 4; // 4x resolution

  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--background",
  );

  const dataUrl = await htmlToImage.toPng(el, {
    cacheBust: true,
    backgroundColor: bgColor,
    width: el.offsetWidth * scale,
    height: el.offsetHeight * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${el.offsetWidth}px`,
      height: `${el.offsetHeight}px`,
    },
  });

  const filename = `${APP_NAME}.png`;

  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], filename, { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: APP_NAME,
      text: `${APP_NAME} 🧩\n${window.location.href}`,
    });
  } else {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
}

export async function captureStatsAndShare() {
  const el = document.getElementById("user-stats");
  if (!el) return;

  await document.fonts.ready; // ensure custom fonts are loaded

  const scale = 4; // 4x resolution

  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--background",
  );

  // Hide share button and add padding temporarily
  const shareBtn: HTMLButtonElement | null = document.querySelector(
    "#user-stats .share-btn",
  );
  if (shareBtn) shareBtn.style.visibility = "hidden";
  el.style.paddingBottom = "1rem";

  const dataUrl = await htmlToImage.toPng(el, {
    cacheBust: true,
    backgroundColor: bgColor,
    width: el.offsetWidth * scale,
    height: el.offsetHeight * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${el.offsetWidth}px`,
      height: `${el.offsetHeight}px`,
    },
  });

  // Reset styles
  if (shareBtn) shareBtn.style.visibility = "visible";
  el.style.paddingBottom = "0";

  const filename = `${APP_NAME}-stats.png`;

  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], filename, { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: APP_NAME,
      text: `${APP_NAME} 🧩\n${window.location.href}`,
    });
  } else {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
}

export function getLocale(language: Language): Locale {
  const local = languagesList.find((l) => l.name === language)?.local;
  return local || "en";
}

export function normalizeChar(ch: string) {
  const rules_diacritic_symbols: Record<string, string> = {
    a: "àáâãäå",
    c: "ç",
    e: "èéêë",
    i: "ìíîï",
    n: "ñ",
    o: "òóôõö",
    u: "ùúûü",
    y: "ýÿ",
  };
  ch = ch.toLowerCase();
  for (const base in rules_diacritic_symbols) {
    if (rules_diacritic_symbols[base].includes(ch)) {
      return base;
    }
  }
  return ch;
}

export function logWelcomeMessage() {
  if (process.env.NODE_ENV === "development") return;

  console.clear();

  console.log(
    `%c${APP_NAME} 🧩`,
    'background-color: #030303;padding: 5px 10px;font-family: "Arial", sans-serif;font-size: 2rem;color: white;',
  );
  console.log(
    `%cHey there! 👋
Looks like you're peeking under the hood of ${APP_NAME} 👀
We love curiosity — just try not to cheat… it ruins the fun 😄
Got ideas, feedback, or wanna help build this game?
Hit me up: ${EMAIL}
Enjoy & have fun! 🎉`,
    "background-color: #030303;padding: 5px 10px;font-size:1rem;color: white;line-height:1.75",
  );
}
