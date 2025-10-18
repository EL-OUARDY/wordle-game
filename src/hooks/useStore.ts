import { create } from "zustand";

interface IState {
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  solution: string;
  setSolution: (solution: string) => void;
}

const useStore = create<IState>((set) => ({
  guesses: Array(6).fill(null),
  setGuesses: (guesses) => set({ guesses: guesses }),
  solution: "",
  setSolution: (solution) => set({ solution: solution }),
}));

export default useStore;
