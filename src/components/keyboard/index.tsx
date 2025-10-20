"use client";
import React, { useCallback, useEffect, useState } from "react";
import { englishKeys } from "@/components/keyboard/keys";
import BackspaceIcon from "@/components/ui/icons/backspace";
import useStore from "@/hooks/useStore";
import { NUMBER_OF_GUESSES, WORD_LENGTH } from "@/lib/constants";
import clsx from "clsx";
import WordService from "@/services/word";

interface Props {
  className?: string;
}

function Keyboard({ className }: Props) {
  const guesses = useStore((s) => s.guesses);
  const setGuesses = useStore((s) => s.setGuesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const setCurrentGuessIndex = useStore((s) => s.setCurrentGuessIndex);
  const isGameOver = useStore((s) => s.isGameOver);
  const setIsGameOver = useStore((s) => s.setIsGameOver);
  const setCurrentGuess = useStore((s) => s.setCurrentGuess);
  const lettersState = useStore((s) => s.lettersState);
  const solution = useStore((s) => s.solution);
  const language = useStore((s) => s.language);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submiGuess = useCallback(async () => {
    if (isSubmitting) return;

    // Check if current guess is less than 5 letters
    if (currentGuess.length < WORD_LENGTH) {
      // animate - shake
      return;
    }

    // Verify if the word exists in the dictionary
    setIsSubmitting(true);
    const isValid = await WordService.isValidWord(currentGuess, language);
    if (!isValid) {
      // animate - shake
      setIsSubmitting(false);
      return;
    } else {
      const newGuesses = guesses.map((guess, index) =>
        currentGuessIndex === index ? currentGuess : guess,
      );
      setGuesses(newGuesses);
      setCurrentGuess("");
      setCurrentGuessIndex(currentGuessIndex + 1);
      // Animate - reveal

      // Check if correct word
      if (currentGuess === solution) {
        setIsGameOver(true);
        // animate - dance
      }

      // Check if out of guesses
      if (currentGuessIndex >= NUMBER_OF_GUESSES) {
        setIsGameOver(true);
      }

      setIsSubmitting(false);
    }
  }, [
    currentGuess,
    currentGuessIndex,
    guesses,
    isSubmitting,
    language,
    setCurrentGuess,
    setCurrentGuessIndex,
    setGuesses,
    setIsGameOver,
    solution,
  ]);

  // Handle device keyboard typing
  useEffect(() => {
    const handleTyping = async (e: KeyboardEvent) => {
      const char = e.key;

      // Return if is submitting
      if (isSubmitting) return;

      // Ignore if key is being held down
      if (e.repeat) return;

      // Check if game is over
      if (isGameOver) return;

      // Check if Enter key is pressed
      if (char === "Enter") await submiGuess();

      // Check if backspace key is pressed
      if (char === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      }

      // Check if current guess is already 5 letters
      if (currentGuess.length >= WORD_LENGTH) return;

      // Check if typed key is valid letter
      const isLetter = /^[a-zA-Z]$/.test(char);
      if (!isLetter) return;

      // Add character
      setCurrentGuess(currentGuess + char.toLowerCase());
    };

    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [currentGuess, isGameOver, isSubmitting, setCurrentGuess, submiGuess]);

  const onKeyClick = (key: string) => {
    if (isSubmitting) return;
    if (isGameOver) return;
    if (currentGuess.length >= WORD_LENGTH) return;
    setCurrentGuess(currentGuess + key.toLowerCase());
  };

  return (
    <div
      className={clsx(
        className,
        "keyboard flex h-[200px] w-full flex-col items-center justify-center gap-[8px] px-[8px]",
      )}
      aria-label="Keyboard"
    >
      {/* First row */}
      <div className="row flex w-full [touch-action:manipulation] gap-1 font-bold">
        {englishKeys.row1.map((key, i) => {
          let keyClasses = "";
          if (lettersState.correct.includes(key))
            keyClasses = "bg-correct text-tile-foreground";
          else if (lettersState.absent.includes(key))
            keyClasses = "bg-absent text-tile-foreground";
          else if (lettersState.present.includes(key))
            keyClasses = "bg-present text-tile-foreground";
          else keyClasses = "bg-key-background";
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                onKeyClick(key);
              }}
              className={clsx(
                keyClasses,
                "flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
              )}
              aria-label={`add ${key}`}
              aria-disabled="true"
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Second row */}
      <div className="row flex w-full [touch-action:manipulation] gap-1 font-bold">
        <div className="flex-[0.5]"></div>
        {englishKeys.row2.map((key, i) => {
          let keyClasses = "";
          if (lettersState.correct.includes(key))
            keyClasses = "bg-correct text-tile-foreground";
          else if (lettersState.absent.includes(key))
            keyClasses = "bg-absent text-tile-foreground";
          else if (lettersState.present.includes(key))
            keyClasses = "bg-present text-tile-foreground";
          else keyClasses = "bg-key-background";
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                onKeyClick(key);
              }}
              className={clsx(
                keyClasses,
                "flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
              )}
              aria-label={`add ${key}`}
              aria-disabled="true"
            >
              {key}
            </button>
          );
        })}
        <div className="flex-[0.5]"></div>
      </div>
      {/* Third row */}
      <div className="row flex w-full [touch-action:manipulation] gap-1 font-bold">
        <button
          type="button"
          onClick={submiGuess}
          className="bg-key-background flex h-[58px] flex-[1.5] cursor-pointer items-center justify-center rounded-sm text-xs font-semibold"
          aria-label={englishKeys.controls.enter}
          aria-disabled="true"
        >
          {englishKeys.controls.enter}
        </button>
        {englishKeys.row3.map((key, i) => {
          let keyClasses = "";
          if (lettersState.correct.includes(key))
            keyClasses = "bg-correct text-tile-foreground";
          else if (lettersState.absent.includes(key))
            keyClasses = "bg-absent text-tile-foreground";
          else if (lettersState.present.includes(key))
            keyClasses = "bg-present text-tile-foreground";
          else keyClasses = "bg-key-background";
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                onKeyClick(key);
              }}
              className={clsx(
                keyClasses,
                "flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
              )}
              aria-label={`add ${key}`}
              aria-disabled="true"
            >
              {key}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            if (isSubmitting) return;
            setCurrentGuess(currentGuess.slice(0, -1));
          }}
          className="bg-key-background flex h-[58px] flex-[1.5] cursor-pointer items-center justify-center rounded-sm text-xs font-normal"
          aria-label={englishKeys.controls.delete}
          aria-disabled="true"
        >
          <BackspaceIcon className="size-[1.4rem]" />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
