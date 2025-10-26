import { LANGUAGES } from "@/lib/constants";
import { Language, LetterStatus } from "@/types";
import { intervalToDuration } from "date-fns";
import { Variants } from "motion";

export const ranks = [
  { name: "Starter", min: 0, color: "#34D399" }, // green
  { name: "Rookie", min: 5, color: "#60A5FA" }, // blue
  { name: "Skilled", min: 15, color: "#9CA3AF" }, // gray
  { name: "Expert", min: 30, color: "#FBBF24" }, // yellow
  { name: "Master", min: 50, color: "#FB923C" }, // orange
  { name: "Legend", min: 75, color: "#EF4444" }, // red
  { name: "Wordle King", min: 100, color: "#A855F7" }, // purple
  { name: "Elite", min: 120, color: "#F472B6" }, // pink
  { name: "Knight", min: 150, color: "#3B82F6" }, // bright blue
  { name: "Villain", min: 170, color: "#D97706" }, // orange-brown
  { name: "Hero", min: 220, color: "#10B981" }, // teal/green
  { name: "Wizard", min: 250, color: "#8B5CF6" }, // violet
  { name: "Devil", min: 270, color: "#7F1D1D" }, // dark red
  { name: "Angel", min: 300, color: "#93C5FD" }, // light blue
  { name: "GOD", min: 366, color: "#FDE68A" }, // golden
];

/**
 * Returns the status of each letter in a guess compared to the solution.
 * Handling edge cases involving duplicate letters
 */
export function getGuessStatuses(
  solution: string,
  guess: string,
): LetterStatus[] {
  const statuses: LetterStatus[] = Array(guess.length).fill("absent");

  // Find correct letters
  const unmatched = new Map<string, number>();
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      statuses[i] = "correct";
    } else {
      const count = unmatched.get(solution[i]) ?? 0;
      unmatched.set(solution[i], count + 1);
    }
  }

  // Find present letters
  for (let i = 0; i < 5; i++) {
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

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const share = async () => {
  const title = document.title;
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({ title, url });
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
    if (!nextRank) return 0; // already at top rank

    if (wins >= rank.min && wins < nextRank.min) {
      return nextRank.min - wins;
    }
  }
  return 0;
};

export function removeArabicDiacritics(word: string) {
  return word.replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
    "",
  );
}
