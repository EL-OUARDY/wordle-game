"use client";
import React, { useCallback, useEffect, useState } from "react";
import { englishKeys } from "@/components/keyboard/keys";
import BackspaceIcon from "@/components/ui/icons/backspace";
import useStore from "@/hooks/useStore";
import { NUMBER_OF_GUESSES, WORD_LENGTH } from "@/lib/constants";
import clsx from "clsx";
import WordService from "@/services/word";
import { motion } from "motion/react";
import { sleep } from "@/lib/utils";

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
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submiGuess = useCallback(async () => {
    if (isSubmitting) return;

    // Check if current guess is less than 5 letters
    if (currentGuess.length < WORD_LENGTH) {
      // Shake line animation
      if (currentGuess.length > 0) {
        setAnimationVariant("shake");
      }
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
      setAnimationVariant("bounce");
      await sleep(1600); // wait 1.6 second
      setIsGameOver(true);

      return;
    }

    // Verify if the word exists in the dictionary
    setIsSubmitting(true);
    const isValid = await WordService.isValidWord(currentGuess, language);
    if (!isValid) {
      setIsSubmitting(false);
      // Shake line animation
      if (currentGuess.length > 0) {
        setAnimationVariant("shake");
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

      // Check if out of guesses
      if (currentGuessIndex === NUMBER_OF_GUESSES - 1) {
        // Wait for reveal animation to finish
        await sleep(1500); // wait 1.25 second
        setIsGameOver(true);
        setAnimationVariant("slide_up");
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

  return (
    <motion.div
      className={clsx(
        className,
        "keyboard flex h-[200px] w-full flex-col items-center justify-center gap-[8px] px-[8px]",
      )}
      aria-label="Keyboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
      <div className="row flex w-full [touch-action:manipulation] gap-1 font-bold">
        {/* Enter button */}
        <motion.button
          type="button"
          tabIndex={-1}
          onClick={submiGuess}
          className="bg-key-background flex h-[58px] flex-[1.5] cursor-pointer items-center justify-center rounded-sm text-xs"
          aria-label={englishKeys.controls.enter}
          aria-disabled="true"
          whileTap={{ scale: 0.9 }}
        >
          {englishKeys.controls.enter}
        </motion.button>
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
          className="bg-key-background flex h-[58px] flex-[1.5] cursor-pointer items-center justify-center rounded-sm text-xs font-normal"
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
