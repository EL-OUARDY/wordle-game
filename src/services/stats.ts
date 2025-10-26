import { db } from "@/lib/firebase";
import { UserStats } from "@/types";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

const StatsService = {
  get: async (uid: string): Promise<UserStats | null> => {
    try {
      const ref = doc(db, "userStats", uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        // Create default only for first-time users
        await setDoc(ref, defaultStats);
        return defaultStats;
      }

      return snap.data() as UserStats;
    } catch (err) {
      console.error("Failed to get stats:", err);
      return null;
    }
  },

  save: async (uid: string, stats: UserStats) => {
    if (!uid || !stats) return;

    const ref = doc(db, "userStats", uid);

    try {
      await setDoc(ref, stats, { merge: true });
    } catch (err) {
      console.error("Failed to save stats:", err);
    }
  },
};

export default StatsService;
