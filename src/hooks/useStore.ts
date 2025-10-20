import { NUMBER_OF_GUESSES } from "@/lib/constants";
import { Language, LettersState } from "@/types";
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
  lettersState: LettersState;
  setLettersState: (
    updater: LettersState | ((prev: LettersState) => LettersState),
  ) => void;
  language: Language;
  setLanguage: (language: Language) => void;
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
  lettersState: { correct: [], present: [], absent: [] },
  setLettersState: (updater) =>
    set((state) => ({
      lettersState:
        typeof updater === "function"
          ? (updater as (prev: LettersState) => LettersState)(
              state.lettersState,
            )
          : updater,
    })),
  language: "English",
  setLanguage: (language) => set({ language: language }),
}));

export default useStore;
