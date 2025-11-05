"use client";
import { useCallback, useEffect, useState } from "react";
import useStore from "@/hooks/useStore";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";
import LoaderIcon from "@/components/ui/icons/loader";
import ShareIcon from "@/components/ui/icons/share";
import { captureBoardAndShare } from "@/lib/utils";
import clsx from "clsx";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { intervalToDuration } from "date-fns";

function GameOver() {
  const solution = useStore((s) => s.solution);
  const setSolution = useStore((s) => s.setSolution);
  const guesses = useStore((s) => s.guesses);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const isGameOver = useStore((s) => s.isGameOver);
  const startTime = useStore((s) => s.startTime);
  const wordCreator = useStore((s) => s.wordCreator);
  const resetGame = useStore((s) => s.resetGame);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);
  const getRandomWord = useStore((s) => s.getRandomWord);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>("");

  const isSolved = solution === guesses[currentGuessIndex - 1];

  const t = useTranslations("GameOver");
  const tTime = useTranslations("Time");

  const newGame = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    const word = await getRandomWord();
    if (word && word !== solution) {
      // Reset state
      resetGame();
      // Set solution
      setSolution(word);
      setAnimationVariant("new_game");
    }
    setIsLoading(false);
  }, [
    isLoading,
    getRandomWord,
    solution,
    resetGame,
    setSolution,
    setAnimationVariant,
  ]);

  // Start new game when hitting enter
  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      const char = e.key;

      if (char === "Enter") newGame();
    };

    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [newGame]);

  const getTimeDifference = useCallback(
    (start: Date, end: Date): string => {
      const duration = intervalToDuration({ start, end });

      const parts: string[] = [];

      if (duration.hours) parts.push(tTime("hours", { count: duration.hours }));
      if (duration.minutes)
        parts.push(tTime("minutes", { count: duration.minutes }));
      if (duration.seconds)
        parts.push(tTime("seconds", { count: duration.seconds }));

      // fallback if all are 0 (like < 1 sec)
      return parts.length > 0 ? parts.join(" ") : tTime("less");
    },
    [tTime],
  );

  // Compute time taken to complete the puzzle
  useEffect(() => {
    const time = getTimeDifference(startTime, new Date());
    if (isGameOver) setEndTime(time);
  }, [getTimeDifference, isGameOver, startTime]);

  return (
    <div className="game-over bg-muted-background border-key-background mx-2 flex h-[200px] w-full flex-col items-center justify-around rounded-xl border p-2">
      {isSolved ? (
        <>
          <h3 className="text-center text-2xl font-semibold">
            {t("won.title")}
          </h3>

          <p className="max-w-sm text-center text-xl">
            {wordCreator ? (
              <span>
                {t.rich("won.customMessage", {
                  creator: () => (
                    <span className="font-semibold capitalize">
                      {wordCreator}
                    </span>
                  ),
                  time: () => <span className="font-semibold">{endTime}</span>,
                  break: () => <br />,
                })}
              </span>
            ) : (
              <span>
                {t.rich("won.message", {
                  time: () => <span className="font-semibold">{endTime}</span>,
                  break: () => <br />,
                })}
                <br />
              </span>
            )}
          </p>

          <div className="controls flex gap-3">
            <Button
              onClick={captureBoardAndShare}
              variant="outline"
              className="flex items-center gap-2"
              aria-label={t("won.shareButton")}
              whileTap={{ scale: 0.95 }}
            >
              <ShareIcon className="size-4" />
              {t("won.shareButton")}
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className={clsx("flex items-center gap-2")}
              aria-label={t("won.newGameButton")}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-4" />
              ) : (
                <GamepadIcon className="size-4" />
              )}
              {isLoading ? t("won.buttonLoading") : t("won.newGameButton")}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center text-xl">{t("lost.title")}</h3>

          <div className="w-[240px] overflow-hidden">
            <div className="line grid flex-1 grid-cols-5 gap-[5px] px-[10px] text-[1.4rem]">
              {solution?.split("").map((char, index) => {
                return (
                  <motion.div
                    key={index}
                    className="bg-correct text-tile-foreground tile flex size-[40px] items-center justify-center font-black uppercase"
                    initial={{ y: 40, opacity: 0.8 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                  >
                    {char}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <p className="max-w-sm text-center text-lg">{t("lost.message")}</p>

          <div className="controls flex gap-3">
            <Button
              onClick={captureBoardAndShare}
              variant="outline"
              className="flex items-center gap-2"
              aria-label={t("lost.shareButton")}
              whileTap={{ scale: 0.95 }}
            >
              <ShareIcon className="size-4" />
              {t("lost.shareButton")}
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className={clsx("flex items-center gap-2")}
              aria-label={t("lost.newGameButton")}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-4" />
              ) : (
                <GamepadIcon className="size-4" />
              )}
              {isLoading ? t("lost.buttonLoading") : t("lost.newGameButton")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GameOver;
