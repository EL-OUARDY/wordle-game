import { create } from "zustand";
import { NUMBER_OF_GUESSES, WORD_LENGTH } from "@/lib/constants";
import {
  AnimationVariant,
  Language,
  LettersStateMap,
  LetterStatus,
  GameSettings,
  UserStats,
} from "@/types";
import { BeforeInstallPromptEvent } from "@/components/InstallListener";

interface WordList {
  allowedGuesses: Set<string>;
  solutionWords: string[];
}

interface IState {
  wordlists: Record<string, WordList>;
  previousWords: Record<string, Set<string>>;
  loadWordList: () => Promise<WordList>;
  getRandomWord: () => Promise<string | null>;
  isWordInDictionary: (guess: string) => Promise<boolean>;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  currentGuessIndex: number;
  setCurrentGuessIndex: (index: number) => void;
  solution: string | null;
  setSolution: (solution: string | null) => void;
  guessesState: (LetterStatus | null)[][];
  setGuessesState: (
    updater:
      | (LetterStatus | null)[][]
      | ((prev: (LetterStatus | null)[][]) => (LetterStatus | null)[][]),
  ) => void;
  isGameOver: boolean;
  setIsGameOver: (state: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (state: boolean) => void;
  lettersStatusMap: LettersStateMap;
  setLettersStatusMap: (
    updater: LettersStateMap | ((prev: LettersStateMap) => LettersStateMap),
  ) => void;
  language: Language | null;
  setLanguage: (language: Language | null) => void;
  startTime: Date;
  setStartTime: (date: Date) => void;
  animationVariant: AnimationVariant;
  setAnimationVariant: (variant: AnimationVariant) => void;
  userStats: UserStats | null;
  setUserStats: (stats: UserStats | null) => void;
  wordCreator: string | null;
  setWordCreator: (creator: string | null) => void;
  settings: GameSettings | null;
  setSettings: (settings: GameSettings | null) => void;
  resetGame: () => void;
  installdeferredPrompt: BeforeInstallPromptEvent | null;
  setInstallDeferredPrompt: (e: BeforeInstallPromptEvent | null) => void;
}

const useStore = create<IState>((set, get) => ({
  wordlists: {},
  previousWords: {},
  loadWordList: async () => {
    const lang = get().language as string;
    const cached = get().wordlists[lang];
    if (cached) return cached;

    // dynamic import
    const _module = await import(`@/wordlists/${lang.toLowerCase()}`);
    const wordlist: WordList = {
      allowedGuesses: _module.allowedGuesses,
      solutionWords: _module.solutionWords,
    };

    set((state) => ({
      wordlists: { ...state.wordlists, [lang]: wordlist },
    }));

    return wordlist;
  },
  getRandomWord: async () => {
    const { solutionWords } = await get().loadWordList();
    if (!solutionWords.length) return null;

    const lang = get().language as string;
    const prev = get().previousWords[lang] ?? new Set<string>();
    // if all used → reset
    if (prev.size >= solutionWords.length) {
      set((state) => ({
        previousWords: { ...state.previousWords, [lang]: new Set() },
      }));
      prev.clear();
    }

    let word: string;
    do {
      const idx = Math.floor(Math.random() * solutionWords.length);
      word = solutionWords[idx];
    } while (prev.has(word));

    // mark word as seen
    const updatedPrev = new Set(prev);
    updatedPrev.add(word);

    set((state) => ({
      previousWords: { ...state.previousWords, [lang]: updatedPrev },
    }));

    return word;
  },
  isWordInDictionary: async (guess) => {
    const { allowedGuesses } = await get().loadWordList();
    return allowedGuesses.has(guess.toLowerCase());
  },

  guesses: Array(NUMBER_OF_GUESSES).fill(null),
  setGuesses: (guesses) => set({ guesses: guesses }),
  currentGuess: "",
  setCurrentGuess: (guess) => set({ currentGuess: guess }),
  currentGuessIndex: 0,
  setCurrentGuessIndex: (index) => set({ currentGuessIndex: index }),
  solution: null,
  setSolution: (solution) => set({ solution: solution }),
  guessesState: Array(NUMBER_OF_GUESSES)
    .fill(null)
    .map(() => Array(WORD_LENGTH).fill(null)),
  setGuessesState: (updater) =>
    set((state) => ({
      guessesState:
        typeof updater === "function"
          ? (
              updater as (
                prev: (LetterStatus | null)[][],
              ) => (LetterStatus | null)[][]
            )(state.guessesState)
          : updater,
    })),
  isGameOver: false,
  setIsGameOver: (state) => set({ isGameOver: state }),
  isSubmitting: false,
  setIsSubmitting: (state) => set({ isSubmitting: state }),
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
  language: null,
  setLanguage: (language) => set({ language: language }),
  startTime: new Date(),
  setStartTime: (date) => set({ startTime: date }),
  animationVariant: "idle",
  setAnimationVariant: (variant) => set({ animationVariant: variant }),
  userStats: null,
  setUserStats: (stats) => set({ userStats: stats }),
  wordCreator: null,
  setWordCreator: (creator) => set({ wordCreator: creator }),
  settings: null,
  setSettings: (settings) => set({ settings: settings }),
  resetGame: () =>
    set({
      isGameOver: false,
      solution: null,
      guesses: Array(NUMBER_OF_GUESSES).fill(null),
      currentGuess: "",
      currentGuessIndex: 0,
      guessesState: Array(NUMBER_OF_GUESSES)
        .fill(null)
        .map(() => Array(WORD_LENGTH).fill(null)),
      lettersStatusMap: { correct: [], present: [], absent: [] },
      startTime: new Date(),
      animationVariant: "idle",
      isSubmitting: false,
      wordCreator: null,
    }),
  installdeferredPrompt: null,
  setInstallDeferredPrompt: (e) => set({ installdeferredPrompt: e }),
}));

export default useStore;
