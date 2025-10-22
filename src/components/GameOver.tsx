"use client";
import Button from "@/components/ui/button";
import LoaderIcon from "@/components/ui/icons/loader";
import useStore from "@/hooks/useStore";
import { NUMBER_OF_GUESSES } from "@/lib/constants";
import { copyToClipboard, getTimeDifference } from "@/lib/utils";
import WordService from "@/services/word";
import clsx from "clsx";
import { Share2Icon, Gamepad2Icon } from "lucide-react";
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
  const setLettersState = useStore((s) => s.setLettersState);
  const startTime = useStore((s) => s.startTime);
  const setStartTime = useStore((s) => s.setStartTime);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);

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
      setLettersState({ correct: [], present: [], absent: [] });
      setStartTime(new Date());
      setAnimationVariant("new_game");
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
    setLettersState,
    setSolution,
    setStartTime,
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

  const share = async () => {
    const title = document.title;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name !== "AbortError") {
          console.error("Error sharing:", err);
          await copyToClipboard(url);
          alert("Link copied to clipboard!");
        } else if (!(err instanceof DOMException)) {
          console.error("Unexpected error:", err);
        }
      }
    } else {
      await copyToClipboard(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="game-over bg-muted-background border-muted-foreground mx-2 flex h-[200px] w-full flex-col items-center justify-around rounded-xl border p-2">
      {isSolved ? (
        <>
          <h3 className="text-center text-2xl">Congratulations</h3>

          <p className="max-w-sm text-center text-xl">
            Awesome! Your wordle took <br />
            <span className="text-base font-bold">{endTime}</span>
          </p>

          <div className="controls flex gap-3">
            <Button
              onClick={share}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Share"
              whileTap={{ scale: 0.95 }}
            >
              <Share2Icon className="size-4" />
              Share
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className={clsx(
                isLoading && "text-muted-foreground",
                "flex items-center gap-2",
              )}
              aria-label="New game"
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-4" />
              ) : (
                <Gamepad2Icon className="size-4" />
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
              <Share2Icon className="size-4" />
              Share
            </Button>
            <Button
              onClick={newGame}
              variant="default"
              className={clsx(
                isLoading && "text-muted-foreground",
                "flex items-center gap-2",
              )}
              aria-label="New game"
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoaderIcon className="size-4" />
              ) : (
                <Gamepad2Icon className="size-4" />
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
