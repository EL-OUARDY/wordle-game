"use client";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";
import LoaderIcon from "@/components/ui/icons/loader";
import ShareIcon from "@/components/ui/icons/share";
import useStore from "@/hooks/useStore";
import { NUMBER_OF_GUESSES } from "@/lib/constants";
import { getTimeDifference, share } from "@/lib/utils";
import WordService from "@/services/word";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

function GameOver() {
  const language = useStore((s) => s.language);

  const solution = useStore((s) => s.solution);
  const setSolution = useStore((s) => s.setSolution);
  const guesses = useStore((s) => s.guesses);
  const setGuesses = useStore((s) => s.setGuesses);
  const setCurrentGuess = useStore((s) => s.setCurrentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const setCurrentGuessIndex = useStore((s) => s.setCurrentGuessIndex);
  const isGameOver = useStore((s) => s.isGameOver);
  const setIsGameOver = useStore((s) => s.setIsGameOver);
  const setLettersStatusMap = useStore((s) => s.setLettersStatusMap);
  const startTime = useStore((s) => s.startTime);
  const setStartTime = useStore((s) => s.setStartTime);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);
  const setIsSubmitting = useStore((s) => s.setIsSubmitting);
  const wordCreator = useStore((s) => s.wordCreator);
  const setWordCreator = useStore((s) => s.setWordCreator);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>("");

  const isSolved = solution === guesses[currentGuessIndex - 1];

  const newGame = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    const word = await WordService.getNewWord(language);
    if (word && word !== solution) {
      setSolution(word);
      // Reset state
      setIsGameOver(false);
      setGuesses(Array(NUMBER_OF_GUESSES).fill(null));
      setCurrentGuess("");
      setCurrentGuessIndex(0);
      setLettersStatusMap({ correct: [], present: [], absent: [] });
      setStartTime(new Date());
      setAnimationVariant("new_game");
      setIsSubmitting(false);
      setWordCreator(null);
    }
    setIsLoading(false);
  }, [
    isLoading,
    language,
    setAnimationVariant,
    setCurrentGuess,
    setCurrentGuessIndex,
    setGuesses,
    setIsGameOver,
    setIsSubmitting,
    setLettersStatusMap,
    setSolution,
    setStartTime,
    setWordCreator,
    solution,
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

  // Compute time taken to complete the puzzle
  useEffect(() => {
    if (isGameOver) setEndTime(getTimeDifference(startTime, new Date()));
  }, [isGameOver, startTime]);

  return (
    <div className="game-over bg-muted-background border-key-background mx-2 flex h-[200px] w-full flex-col items-center justify-around rounded-xl border p-2">
      {isSolved ? (
        <>
          <h3 className="text-center text-2xl font-semibold">
            Congratulations
          </h3>

          <p className="max-w-sm text-center text-xl">
            {wordCreator ? (
              <span>
                You solved{" "}
                <span className="font-semibold capitalize">
                  {wordCreator[0].toUpperCase() + wordCreator.slice(1)}
                </span>
                &apos;s <br /> Wordle in{" "}
              </span>
            ) : (
              <span>
                Awesome! Your wordle took
                <br />
              </span>
            )}

            <span className="text-lg font-semibold">{endTime}</span>
          </p>

          <div className="controls flex gap-3">
            <Button
              onClick={share}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Share"
              whileTap={{ scale: 0.95 }}
            >
              <ShareIcon className="size-4" />
              Share
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className={clsx(
                isLoading && "text-key-background",
                "flex items-center gap-2",
              )}
              aria-label="New game"
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-4" />
              ) : (
                <GamepadIcon className="size-4" />
              )}
              {isLoading ? "Loading .." : "New Game"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center text-xl">Not this time!</h3>

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

          <p className="max-w-sm text-center text-lg">
            {"No worries, you’ll get it next time."} <br />
          </p>

          <div className="controls flex gap-3">
            <Button
              onClick={share}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Share"
              whileTap={{ scale: 0.95 }}
            >
              <ShareIcon className="size-4" />
              Share
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className={clsx(
                isLoading && "text-key-background",
                "flex items-center gap-2",
              )}
              aria-label="New game"
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-4" />
              ) : (
                <GamepadIcon className="size-4" />
              )}
              {isLoading ? "Loading .." : "New Game"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GameOver;
