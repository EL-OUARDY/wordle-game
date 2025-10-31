"use client";
import React, { useEffect, useState } from "react";
import Board from "@/components/board";
import { Language, Settings } from "@/types";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import WordService from "@/services/word";
import GameOver from "@/components/GameOver";
import Keyboard from "@/components/keyboard";
import Button from "@/components/ui/button";
import LoaderIcon from "@/components/ui/icons/loader";
import GamepadIcon from "@/components/ui/icons/gamepad";
import { useSearchParams } from "next/navigation";
import CreateService from "@/services/create";

interface Props {
  language?: Language;
  className?: string;
}

const defaultSettings: Settings = {
  defaultLanguage: "English",
  theme: "classic",
  highContrastMode: false,
  onScreenOnly: false,
  swapEnterBackspace: false,
  reduceMotion: false,
};

function Wordle({ language, className }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const storeLanguage = useStore((s) => s.language);
  const setLanguage = useStore((s) => s.setLanguage);
  const setSolution = useStore((s) => s.setSolution);
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);
  const solution = useStore((s) => s.solution);
  const isGameOver = useStore((s) => s.isGameOver);
  const setWordCreator = useStore((s) => s.setWordCreator);

  const searchParams = useSearchParams();
  const wordId = searchParams.get("w");

  // Reset solution word on first mount
  useEffect(() => {
    setSolution(null);
  }, [setSolution]);

  // Set language
  useEffect(() => {
    // From language prop
    if (language) {
      setLanguage(language);
      return;
    }
    // From user's settings if prop is not defined
    if (settings) {
      setLanguage(settings.defaultLanguage);
    }
  }, [language, setLanguage, settings]);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("wordle_settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          // parsed is expected to be a full Settings object saved by Settings component
          setSettings(parsed);
          return;
        }
      }
    } catch {
      // ignore storage / parse errors
    }

    // fallback to default settings
    setSettings(defaultSettings);
  }, [setSettings]);

  // Get initial word when app loads
  useEffect(() => {
    if (!storeLanguage) return;

    if (solution) {
      return;
    }

    const getWord = async () => {
      const word = await WordService.getNewWord(storeLanguage);
      if (word) {
        setSolution(word);
      }
      setIsLoading(false);
    };

    const loadCustomWordle = async (wordId: string) => {
      const result = await CreateService.getCustomWord(wordId);
      if (result) {
        setSolution(result.word.toLowerCase());
        setWordCreator(result.creator || null);
      }
      setIsLoading(false);
    };

    if (wordId) {
      loadCustomWordle(wordId);
    } else {
      getWord();
    }
  }, [language, setSolution, setWordCreator, solution, storeLanguage, wordId]);

  return (
    <div
      className={clsx(
        className,
        "flex size-full flex-1 flex-col items-center justify-between gap-[10px]",
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
          className="flex w-full flex-1 items-center justify-center"
        >
          <LoaderIcon className="text-key-background size-8" />
        </div>
      )}

      {/* Fails to load word */}
      {!isLoading && !solution && (
        <div className="flex w-full flex-1 items-center justify-center">
          <Button
            onClick={async () => {
              setIsLoading(true);
              const word = await WordService.getNewWord(
                storeLanguage as Language,
              );
              if (word) {
                setSolution(word);
              }
              setIsLoading(false);
            }}
            variant="default"
            className="flex items-center gap-2"
            aria-label="Play"
            whileTap={{ scale: 0.95 }}
          >
            <GamepadIcon className="size-4" />
            Play
          </Button>
        </div>
      )}
    </div>
  );
}

export default Wordle;
