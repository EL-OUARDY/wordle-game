export type Language = "English" | "French" | "Spanish" | "German" | "Arabic";

export type LetterStatus = "correct" | "present" | "absent";

export interface LettersStateMap {
  correct: string[];
  present: string[];
  absent: string[];
}

export type AnimationVariant =
  | "new_game"
  | "type"
  | "delete"
  | "shake"
  | "reveal"
  | "bounce"
  | "slide_up"
  | "idle";

export interface UserStats {
  played: number;
  streak: number;
  maxStreak: number;
  lastSolvedTries: number;
  guessDistribution: {
    guess: number;
    count: number;
  }[];
}

export type Theme = "classic" | "coffee" | "dracula" | "sakura";

export interface Settings {
  language: Language;
  theme: Theme;
  highContrastMode: boolean;
  onScreenOnly: boolean;
  swapEnterBackspace: boolean;
  reduceMotion: boolean;
}
