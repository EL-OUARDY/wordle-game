"use client";
import React, { useEffect, useState } from "react";
import Board from "@/components/board";
import { Language } from "@/types";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import WordService from "@/services/word";
import { Loader2Icon } from "lucide-react";
import GameOver from "@/components/GameOver";
import Keyboard from "@/components/keyboard";

interface Props {
  language?: Language;
  className?: string;
}

function Wordle({ language = "English", className }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setLanguage = useStore((s) => s.setLanguage);
  const setSolution = useStore((s) => s.setSolution);
  const solution = useStore((s) => s.solution);
  const isGameOver = useStore((s) => s.isGameOver);

  // Set language
  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  // Get initial word when app loads
  useEffect(() => {
    const getWord = async () => {
      const word = await WordService.getNewWord(language);
      if (word) {
        setSolution(word);
      }
      setIsLoading(false);
    };

    getWord();
  }, [language, setSolution]);

  return (
    <div
      className={clsx(
        className,
        "flex size-full flex-1 flex-col items-center justify-center gap-[10px]",
      )}
    >
      {/* Game is loaded */}
      {!isLoading && solution && (
        <>
          <Board />
          <div className="flex w-full items-center justify-center">
            {isGameOver ? <GameOver /> : <Keyboard />}
          </div>
        </>
      )}

      {/* Loading solution word */}
      {isLoading && !solution && (
        <div
          aria-label="Loading"
          className="flex animate-spin items-center justify-center"
        >
          <Loader2Icon className="text-key-background size-8" />
        </div>
      )}

      {/* Fails to load word */}
      {!isLoading && !solution && (
        <button
          type="button"
          onClick={async () => {
            setIsLoading(true);
            const word = await WordService.getNewWord(language);
            if (word) {
              setSolution(word);
            }
            setIsLoading(false);
          }}
          className="bg-key-background flex cursor-pointer items-center justify-center rounded-sm px-4 py-1"
        >
          Play
        </button>
      )}
    </div>
  );
}

export default Wordle;
