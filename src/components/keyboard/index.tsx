"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { englishKeys } from "@/components/keyboard/keys";
import BackspaceIcon from "@/components/ui/icons/backspace";
import useStore from "@/hooks/useStore";
import { NUMBER_OF_GUESSES, WORD_LENGTH } from "@/lib/constants";
import clsx from "clsx";
import WordService from "@/services/word";
import { motion, MotionConfig } from "motion/react";
import { isValidLetter, sleep } from "@/lib/utils";
import { Language, LettersStateMap } from "@/types";
import StatsService from "@/services/stats";
import useAuth from "@/hooks/useAuth";

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
  const setUserStats = useStore((s) => s.setUserStats);
  const settings = useStore((s) => s.settings);

  const { user } = useAuth();

  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const previousSubmittedWrongGuess = useRef<string>("");

  const blockTypingRef = useRef(false);

  const updateUserStats = useCallback(
    async (status: "won" | "lost") => {
      // User is not logged in
      if (!user) return;

      const serverStats = await StatsService.get(user.uid);

      if (!serverStats) return;

      if (status === "lost") {
        const newStats = {
          ...serverStats,
          played: serverStats.played + 1,
          streak: 0,
        };
        setUserStats(newStats);
        StatsService.save(user.uid, newStats);
      }
      // Won
      else {
        const newStats = {
          played: serverStats.played + 1,

          streak: serverStats.streak + 1,

          maxStreak:
            serverStats.streak + 1 > serverStats.maxStreak
              ? serverStats.streak + 1
              : serverStats.maxStreak,

          lastSolvedTries: currentGuessIndex + 1,

          guessDistribution: serverStats.guessDistribution.map((guessStat) =>
            guessStat.guess === currentGuessIndex + 1
              ? { ...guessStat, count: guessStat.count + 1 }
              : guessStat,
          ),
        };
        setUserStats(newStats);
        StatsService.save(user.uid, newStats);
      }
    },
    [currentGuessIndex, setUserStats, user],
  );

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
      if (!settings?.reduceMotion)
        await sleep(1250); // wait 1.25 second
      else await sleep(0);
      setIsSubmitting(false);
      setAnimationVariant("bounce");
      if (!settings?.reduceMotion) await sleep(1600); // wait 1.6 second
      setIsGameOver(true);
      updateUserStats("won");
      previousSubmittedWrongGuess.current = "";
      return;
    }

    // Verify if the word is different from last one
    // and exists in the dictionary
    const isValid =
      previousSubmittedWrongGuess.current !== currentGuess &&
      (await WordService.isValidWord(currentGuess, language as Language));
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
      if (!settings?.reduceMotion) await sleep(1500);
      else await sleep(0);

      // Check if out of guesses
      if (currentGuessIndex === NUMBER_OF_GUESSES - 1) {
        setIsGameOver(true);
        updateUserStats("lost");
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
    settings?.reduceMotion,
    solution,
    updateUserStats,
  ]);

  const updatePressedKey = useCallback((key: string) => {
    setPressedKey(null); // reset first
    setTimeout(() => setPressedKey(key), 0); // then set
  }, []);

  // Handle device keyboard typing
  useEffect(() => {
    const handleTyping = async (e: KeyboardEvent) => {
      const char = e.key;

      // OnScreen only setting option is turned on
      if (settings?.onScreenOnly) return;

      // Typing is turned off
      if (blockTypingRef.current) return;

      // Return if is submitting
      if (isSubmitting) return;

      // Ignore if key is being held down
      if (e.repeat) return;

      // Ignore if Ctrl (Windows/Linux) or Cmd (Mac) is held
      if (e.ctrlKey || e.metaKey) return;

      // Check if game is over
      if (isGameOver) return;

      // Set pressed key
      updatePressedKey(char);

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
      if (!isValidLetter(char)) return;

      // Add character
      setCurrentGuess(currentGuess + char.toLowerCase());
      // Pop tile animation
      setAnimationVariant("type");
    };

    const handleBlockEvent = (e: CustomEvent<boolean>) => {
      blockTypingRef.current = e.detail;
    };

    window.addEventListener("keydown", handleTyping);
    window.addEventListener("blockTyping", handleBlockEvent as EventListener);

    return () => {
      window.removeEventListener("keydown", handleTyping);
      window.removeEventListener(
        "blockTyping",
        handleBlockEvent as EventListener,
      );
    };
  }, [
    currentGuess,
    isGameOver,
    isSubmitting,
    setAnimationVariant,
    setCurrentGuess,
    settings?.onScreenOnly,
    submiGuess,
    updatePressedKey,
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
    <MotionConfig
      key={settings?.reduceMotion ? "reduce" : "normal"}
      reducedMotion={settings?.reduceMotion ? "always" : "never"}
    >
      <motion.div
        className={clsx(
          className,
          "keyboard flex h-[200px] w-full flex-col items-center justify-center gap-[8px] px-[8px] font-semibold",
        )}
        role="group"
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
              <motion.div
                key={i + (pressedKey || "")}
                tabIndex={-1}
                onClick={() => {
                  onScreenKeyClick(key);
                }}
                className={clsx(
                  keyClasses,
                  "key flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
                )}
                role="button"
                aria-label={`add ${key}`}
                whileTap={!settings?.reduceMotion ? { scale: 0.9 } : {}}
                animate={{ scale: pressedKey === key ? [0.9, 1] : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {key}
              </motion.div>
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
              <motion.div
                key={i + (pressedKey || "")}
                tabIndex={-1}
                onClick={() => {
                  onScreenKeyClick(key);
                }}
                className={clsx(
                  keyClasses,
                  "key flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
                )}
                role="button"
                aria-label={`add ${key}`}
                whileTap={!settings?.reduceMotion ? { scale: 0.9 } : {}}
                animate={{ scale: pressedKey === key ? [0.9, 1] : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {key}
              </motion.div>
            );
          })}
          <div className="flex-[0.5]"></div>
        </div>

        {/* Third row */}
        <div
          className={clsx(
            "row flex w-full [touch-action:manipulation] gap-1",
            settings?.swapEnterBackspace && "flex-row-reverse",
          )}
        >
          {/* Enter button */}
          <motion.div
            key={"enter" + pressedKey || ""}
            tabIndex={-1}
            onClick={submiGuess}
            className="key bg-key-background flex h-[58px] flex-[1.4] cursor-pointer items-center justify-center rounded-sm text-xs font-bold"
            role="button"
            aria-label={englishKeys.controls.enter}
            whileTap={!settings?.reduceMotion ? { scale: 0.9 } : {}}
            animate={{ scale: pressedKey === "Enter" ? [0.9, 1] : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {englishKeys.controls.enter}
          </motion.div>

          <div className="flex flex-7 gap-1">
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
                <motion.div
                  key={i + (pressedKey || "")}
                  tabIndex={-1}
                  onClick={() => {
                    onScreenKeyClick(key);
                  }}
                  className={clsx(
                    keyClasses,
                    "key flex h-[58px] flex-1 cursor-pointer items-center justify-center rounded-sm text-xl uppercase",
                  )}
                  role="button"
                  aria-label={`add ${key}`}
                  whileTap={!settings?.reduceMotion ? { scale: 0.9 } : {}}
                  animate={{ scale: pressedKey === key ? [0.9, 1] : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {key}
                </motion.div>
              );
            })}
          </div>

          {/* Backspace button */}
          <motion.div
            key={"backspace" + pressedKey || ""}
            tabIndex={-1}
            onClick={() => {
              if (isSubmitting) return;
              setCurrentGuess(currentGuess.slice(0, -1));
              setAnimationVariant("delete");
            }}
            className="key bg-key-background flex h-[58px] flex-[1.4] cursor-pointer items-center justify-center rounded-sm text-xs"
            role="button"
            aria-label={englishKeys.controls.delete}
            whileTap={!settings?.reduceMotion ? { scale: 0.9 } : {}}
            animate={{ scale: pressedKey === "Backspace" ? [0.9, 1] : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BackspaceIcon
              className={clsx(
                "size-[1.4rem]",
                language === "Arabic" && "scale-x-[-1]", // RTL
              )}
            />
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

export default Keyboard;
