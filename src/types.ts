export type Language = "English" | "French" | "Spanish" | "German" | "Arabic";

export type LetterStatus = "correct" | "present" | "absent";

export interface LettersState {
  correct: string[];
  present: string[];
  absent: string[];
}
