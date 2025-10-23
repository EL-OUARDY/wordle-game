"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { englishKeys } from "@/components/keyboard/keys";
import BackspaceIcon from "@/components/ui/icons/backspace";
import useStore from "@/hooks/useStore";
import { NUMBER_OF_GUESSES, WORD_LENGTH } from "@/lib/constants";
import clsx from "clsx";
import WordService from "@/services/word";
import { motion } from "motion/react";
import { sleep } from "@/lib/utils";
import { LettersStateMap } from "@/types";

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
  const solution = useStore((s) => s.solution);
  const language = useStore((s) => s.language);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);
  const isSubmitting = useStore((s) => s.isSubmitting);
  const setIsSubmitting = useStore((s) => s.setIsSubmitting);
  const storeLettersStatusMap = useStore((s) => s.lettersStatusMap);
  const [lettersStatusMap, setLettersStatusMap] = useState<LettersStateMap>({
    correct: [],
    present: [],
    absent: [],
  });

  const previousSubmittedWrongGuess = useRef<string>("");

  const submiGuess = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Check if current guess is less than 5 letters
    if (currentGuess.length < WORD_LENGTH) {
      // Shake line animation
      if (currentGuess.length > 0) {
        setAnimationVariant("shake");
      }
      setIsSubmitting(false);
      return;
    }

    // Check if correct word
    if (currentGuess === solution) {
      const newGuesses = guesses.map((guess, index) =>
        currentGuessIndex === index ? currentGuess : guess,
      );
      setGuesses(newGuesses);
      setCurrentGuess("");
      setCurrentGuessIndex(currentGuessIndex + 1);
      // Reveal word animation
      setAnimationVariant("reveal");
      // Bounce animation
      await sleep(1250); // wait 1.25 second
      setIsSubmitting(false);
      setAnimationVariant("bounce");
      await sleep(1600); // wait 1.6 second
      setIsGameOver(true);
      previousSubmittedWrongGuess.current = "";
      return;
    }

    // Verify if the word is different from last one
    // and exists in the dictionary
    const isValid =
      previousSubmittedWrongGuess.current !== currentGuess &&
      (await WordService.isValidWord(currentGuess, language));
    if (!isValid) {
      setIsSubmitting(false);
      // Shake line animation
      if (currentGuess.length > 0) {
        setAnimationVariant("shake");
        previousSubmittedWrongGuess.current = currentGuess;
      }
      return;
    } else {
      const newGuesses = guesses.map((guess, index) =>
        currentGuessIndex === index ? currentGuess : guess,
      );
      setGuesses(newGuesses);
      setCurrentGuess("");
      setCurrentGuessIndex(currentGuessIndex + 1);
      // Reveal word animation
      setAnimationVariant("reveal");
      // Wait (1.25 second) for reveal animation to finish
      await sleep(1500);

      // Check if out of guesses
      if (currentGuessIndex === NUMBER_OF_GUESSES - 1) {
        setIsGameOver(true);
        setAnimationVariant("slide_up");
        previousSubmittedWrongGuess.current = "";
      }

      setIsSubmitting(false);
    }
  }, [
    currentGuess,
    currentGuessIndex,
    guesses,
    isSubmitting,
    language,
    setAnimationVariant,
    setCurrentGuess,
    setCurrentGuessIndex,
    setGuesses,
    setIsGameOver,
    setIsSubmitting,
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
        setAnimationVariant("delete");
      }

      // Check if current guess is already 5 letters
      if (currentGuess.length >= WORD_LENGTH) return;

      // Check if typed key is valid letter
      const isLetter = /^[a-zA-Z]$/.test(char);
      if (!isLetter) return;

      // Add character
      setCurrentGuess(currentGuess + char.toLowerCase());
      // Pop tile animation
      setAnimationVariant("type");
    };

    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [
    currentGuess,
    isGameOver,
    isSubmitting,
    setAnimationVariant,
    setCurrentGuess,
    submiGuess,
  ]);

  const onScreenKeyClick = (key: string) => {
    if (isSubmitting) return;
    if (isGameOver) return;
    if (currentGuess.length >= WORD_LENGTH) return;
    setCurrentGuess(currentGuess + key.toLowerCase());
    // Pop tile animation
    setAnimationVariant("type");
  };

  // Update local letters status map after animation completes
  useEffect(() => {
    if (isSubmitting) return;
    setLettersStatusMap(storeLettersStatusMap);
  }, [isSubmitting, storeLettersStatusMap]);

  return (
    <motion.div
      className={clsx(
        className,
        "keyboard flex h-[200px] w-full flex-col items-center justify-center gap-[8px] px-[8px] font-semibold",
      )}
      aria-label="Keyboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* First row */}
      <div className="row flex w-full [touch-action:manipulation] gap-1">
        {englishKeys.row1.map((key, i) => {
          let keyClasses = "";
          if (lettersStatusMap.correct.includes(key))
            keyClasses = "bg-correct text-tile-foreground";
          else if (lettersStatusMap.absent.includes(key))
            keyClasses = "bg-absent text-tile-foreground";
          else if (lettersStatusMap.present.includes(key))
            keyClasses = "bg-present text-tile-foreground";
          else keyClasses = "bg-key-background";
          return (
            <motion.button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => {
                onScreenKeyClick(key);
              }}
              className={clsx(
                keyClasses,
                "flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
              )}
              aria-label={`add ${key}`}
              aria-disabled="true"
              whileTap={{ scale: 0.9 }}
            >
              {key}
            </motion.button>
          );
        })}
      </div>

      {/* Second row */}
      <div className="row flex w-full [touch-action:manipulation] gap-1">
        <div className="flex-[0.5]"></div>
        {englishKeys.row2.map((key, i) => {
          let keyClasses = "";
          if (lettersStatusMap.correct.includes(key))
            keyClasses = "bg-correct text-tile-foreground";
          else if (lettersStatusMap.absent.includes(key))
            keyClasses = "bg-absent text-tile-foreground";
          else if (lettersStatusMap.present.includes(key))
            keyClasses = "bg-present text-tile-foreground";
          else keyClasses = "bg-key-background";
          return (
            <motion.button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => {
                onScreenKeyClick(key);
              }}
              className={clsx(
                keyClasses,
                "flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
              )}
              aria-label={`add ${key}`}
              aria-disabled="true"
              whileTap={{ scale: 0.9 }}
            >
              {key}
            </motion.button>
          );
        })}
        <div className="flex-[0.5]"></div>
      </div>
      {/* Third row */}
      <div className="row flex w-full [touch-action:manipulation] gap-1">
        {/* Enter button */}
        <motion.button
          type="button"
          tabIndex={-1}
          onClick={submiGuess}
          className="bg-key-background flex h-[58px] flex-[1.5] cursor-pointer items-center justify-center rounded-sm text-xs font-bold"
          aria-label={englishKeys.controls.enter}
          aria-disabled="true"
          whileTap={{ scale: 0.9 }}
        >
          {englishKeys.controls.enter}
        </motion.button>
        {englishKeys.row3.map((key, i) => {
          let keyClasses = "";
          if (lettersStatusMap.correct.includes(key))
            keyClasses = "bg-correct text-tile-foreground";
          else if (lettersStatusMap.absent.includes(key))
            keyClasses = "bg-absent text-tile-foreground";
          else if (lettersStatusMap.present.includes(key))
            keyClasses = "bg-present text-tile-foreground";
          else keyClasses = "bg-key-background";
          return (
            <motion.button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => {
                onScreenKeyClick(key);
              }}
              className={clsx(
                keyClasses,
                "flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
              )}
              aria-label={`add ${key}`}
              aria-disabled="true"
              whileTap={{ scale: 0.9 }}
            >
              {key}
            </motion.button>
          );
        })}
        {/* Backspace button */}
        <motion.button
          type="button"
          tabIndex={-1}
          onClick={() => {
            if (isSubmitting) return;
            setCurrentGuess(currentGuess.slice(0, -1));
            setAnimationVariant("delete");
          }}
          className="bg-key-background flex h-[58px] flex-[1.5] cursor-pointer items-center justify-center rounded-sm text-xs"
          aria-label={englishKeys.controls.delete}
          aria-disabled="true"
          whileTap={{ scale: 0.9 }}
        >
          <BackspaceIcon className="size-[1.4rem]" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Keyboard;
