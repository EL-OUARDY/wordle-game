"use client";
import React, { useEffect, useState } from "react";
import Board from "@/components/board";
import { Language } from "@/types";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import GameOver from "@/components/GameOver";
import Keyboard from "@/components/keyboard";
import Button from "@/components/ui/button";
import LoaderIcon from "@/components/ui/icons/loader";
import GamepadIcon from "@/components/ui/icons/gamepad";
import { useRouter, useSearchParams } from "next/navigation";
import CreateService from "@/services/create";
import { MotionConfig } from "motion/react";
import { defaultSettings } from "@/components/Settings";
import { languagesList } from "@/components/LanguagesMenu";
import { setUserLocale } from "@/services/locale";
import { getLocale } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  language?: Language;
  className?: string;
}

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
  const resetGame = useStore((s) => s.resetGame);
  const getRandomWord = useStore((s) => s.getRandomWord);

  const router = useRouter();
  const searchParams = useSearchParams();
  const wordId = searchParams.get("w");

  const t = useTranslations("Global");

  // Reset game state on first mount
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Set language
  useEffect(() => {
    // From language prop
    if (language) {
      setLanguage(language);
      setUserLocale(getLocale(language));
      return;
    }
    // From user's settings if prop is not defined
    if (settings) {
      const link = languagesList.find(
        (l) => l.name === settings.defaultLanguage,
      )?.link;
      if (link) router.push(link);
    }
  }, [language, router, setLanguage, settings]);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    if (settings) return;
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
  }, [setSettings, settings]);

  // Get initial word when app loads
  useEffect(() => {
    if (!storeLanguage) return;

    if (solution) {
      return;
    }

    const getWord = async () => {
      const word = await getRandomWord();
      if (word) {
        setSolution(word);
      }
      setIsLoading(false);
    };

    const loadCustomWordle = async (wordId: string) => {
      const result = await CreateService.getCustomWord(wordId);
      if (result) {
        setSolution(result.word.toLowerCase());
        setLanguage(result.language);
        setWordCreator(result.creator || null);
      }
      setIsLoading(false);
    };

    if (wordId) {
      loadCustomWordle(wordId);
    } else {
      getWord();
    }
  }, [
    getRandomWord,
    language,
    setLanguage,
    setSolution,
    setWordCreator,
    solution,
    storeLanguage,
    wordId,
  ]);

  // Remove wordId from the URL if exists (In case of custom wordle)
  useEffect(() => {
    if (!isGameOver) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("w");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [isGameOver, searchParams]);

  return (
    <MotionConfig
      key={settings?.reduceMotion ? "reduce" : "normal"}
      reducedMotion={settings?.reduceMotion ? "always" : "never"}
    >
      <div
        className={clsx(
          className,
          "flex size-full flex-1 flex-col items-center justify-between gap-[10px]",
          settings?.highContrastMode && "high-contrast",
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
            aria-label={t("loading")}
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
                const word = await getRandomWord();
                if (word) {
                  setSolution(word);
                }
                setIsLoading(false);
              }}
              variant="default"
              className="flex items-center gap-2"
              aria-label={t("play")}
              whileTap={{ scale: 0.95 }}
            >
              <GamepadIcon className="size-4" />
              {t("play")}
            </Button>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}

export default Wordle;
