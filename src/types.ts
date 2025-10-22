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
