import { NUMBER_OF_GUESSES } from "@/lib/constants";
import { AnimationVariant, Language, LettersStateMap } from "@/types";
import { create } from "zustand";

interface IState {
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  currentGuessIndex: number;
  setCurrentGuessIndex: (index: number) => void;
  solution: string | null;
  setSolution: (solution: string) => void;
  isGameOver: boolean;
  setIsGameOver: (state: boolean) => void;
  lettersStatusMap: LettersStateMap;
  setLettersStatusMap: (
    updater: LettersStateMap | ((prev: LettersStateMap) => LettersStateMap),
  ) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  startTime: Date;
  setStartTime: (date: Date) => void;
  animationVariant: AnimationVariant;
  setAnimationVariant: (variant: AnimationVariant) => void;
}

const useStore = create<IState>((set) => ({
  guesses: Array(NUMBER_OF_GUESSES).fill(null),
  setGuesses: (guesses) => set({ guesses: guesses }),
  currentGuess: "",
  setCurrentGuess: (guess) => set({ currentGuess: guess }),
  currentGuessIndex: 0,
  setCurrentGuessIndex: (index) => set({ currentGuessIndex: index }),
  solution: null,
  setSolution: (solution) => set({ solution: solution }),
  isGameOver: false,
  setIsGameOver: (state) => set({ isGameOver: state }),
  lettersStatusMap: { correct: [], present: [], absent: [] },
  setLettersStatusMap: (updater) =>
    set((state) => ({
      lettersStatusMap:
        typeof updater === "function"
          ? (updater as (prev: LettersStateMap) => LettersStateMap)(
              state.lettersStatusMap,
            )
          : updater,
    })),
  language: "English",
  setLanguage: (language) => set({ language: language }),
  startTime: new Date(),
  setStartTime: (date) => set({ startTime: date }),
  animationVariant: "idle",
  setAnimationVariant: (variant) => set({ animationVariant: variant }),
}));

export default useStore;
