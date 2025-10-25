import { UserStats } from "@/types";

const STORAGE_KEY = "user_stats";

const defaultStats = {
  played: 0,
  streak: 0,
  maxStreak: 0,
  lastSolvedTries: 0,
  guessDistribution: [
    { guess: 1, count: 0 },
    { guess: 2, count: 0 },
    { guess: 3, count: 0 },
    { guess: 4, count: 0 },
    { guess: 5, count: 0 },
    { guess: 6, count: 0 },
  ],
};

function isUserStats(obj: unknown): obj is UserStats {
  if (typeof obj !== "object" || obj === null) return false;
  const o = obj as Record<string, unknown>;
  if (typeof o.played !== "number") return false;
  if (typeof o.streak !== "number") return false;
  if (typeof o.maxStreak !== "number") return false;
  if (typeof o.lastSolvedTries !== "number") return false;
  if (!Array.isArray(o.guessDistribution)) return false;
  for (const item of o.guessDistribution) {
    if (typeof item !== "object" || item === null) return false;
    const it = item as Record<string, unknown>;
    if (typeof it.guess !== "number") return false;
    if (typeof it.count !== "number") return false;
  }
  return true;
}

const StatsService = {
  get: (): UserStats => {
    // localStorage isn't available on the server
    if (typeof window === "undefined" || !window.localStorage)
      return defaultStats;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultStats;
      const parsed = JSON.parse(raw);
      if (isUserStats(parsed)) return parsed;
      // If stored data shape changed, return defaults
      return defaultStats;
    } catch {
      // If parsing fails, return defaults
      return defaultStats;
    }
  },
  save: (stats: UserStats) => {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      const serialized = JSON.stringify(stats);
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch {
      console.error("Failed to save stats");
    }
  },
};

export default StatsService;
