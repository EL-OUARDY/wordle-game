import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import { motion, useAnimation } from "motion/react";
import { tileVariants } from "@/components/board/animations";
import { evaluateGuess } from "@/lib/utils";
import { WORD_LENGTH } from "@/lib/constants";
interface Props {
  char: string;
  charIndex: number;
  lineIndex: number;
  className?: string;
}

function Tile({ char, charIndex, lineIndex, className }: Props) {
  const guesses = useStore((s) => s.guesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const guessesState = useStore((s) => s.guessesState);
  const setGuessesState = useStore((s) => s.setGuessesState);
  const solution = useStore((s) => s.solution);
  const setLettersStatusMap = useStore((s) => s.setLettersStatusMap);
  const animationVariant = useStore((s) => s.animationVariant);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);
  const settings = useStore((s) => s.settings);

  const controls = useAnimation();

  const updateLetterStatus = useCallback(() => {
    if (!char || char === " ") return;
    if (!solution) return;
    if (!guesses[lineIndex] || guesses[lineIndex].length !== WORD_LENGTH)
      return;

    const wordStatus = evaluateGuess(solution, guesses[lineIndex]);
    const charStatus = wordStatus[charIndex];

    setGuessesState((prev) =>
      prev.map((w, wi) =>
        wi === lineIndex
          ? w.map((c, ci) => (ci === charIndex ? charStatus : c))
          : w,
      ),
    );

    if (charStatus === "correct") {
      setLettersStatusMap((prev) => ({
        ...prev,
        correct: prev.correct.includes(char)
          ? prev.correct
          : [...prev.correct, char],
      }));
    } else if (charStatus === "present") {
      setLettersStatusMap((prev) => ({
        ...prev,
        present: prev.present.includes(char)
          ? prev.present
          : [...prev.present, char],
      }));
    } else {
      setLettersStatusMap((prev) => ({
        ...prev,
        absent: prev.absent.includes(char)
          ? prev.absent
          : [...prev.absent, char],
      }));
    }
  }, [
    char,
    charIndex,
    guesses,
    lineIndex,
    setGuessesState,
    setLettersStatusMap,
    solution,
  ]);

  // Apply current animation variant
  useEffect(() => {
    const runAnimation = async () => {
      if (animationVariant === "idle") return;

      const isCurrent =
        lineIndex === currentGuessIndex &&
        charIndex === currentGuess.length - 1;

      if (
        animationVariant === "reveal" &&
        currentGuessIndex - 1 === lineIndex
      ) {
        await controls.start("flip_in");
        updateLetterStatus();
        await controls.start("flip_out");
      }

      if (animationVariant === "type" && isCurrent && char && char !== " ") {
        await controls.start(animationVariant);
      }

      if (animationVariant === "delete") {
        await controls.start(animationVariant);
      }

      if (!settings?.reduceMotion && animationVariant === "new_game") {
        await controls.start(animationVariant);
      }

      if (
        animationVariant === "bounce" &&
        lineIndex === currentGuessIndex - 1
      ) {
        await controls.start(animationVariant);
      }
    };

    runAnimation();
  }, [
    animationVariant,
    char,
    charIndex,
    controls,
    currentGuess.length,
    currentGuessIndex,
    lineIndex,
    setAnimationVariant,
    settings?.reduceMotion,
    updateLetterStatus,
  ]);

  return (
    <motion.div
      className={clsx(
        className,
        char && char !== " " ? "border-foreground" : "border-key-background",
        guessesState[lineIndex][charIndex]
          ? `bg-${guessesState[lineIndex][charIndex]} text-tile-foreground !border-0`
          : "bg-tile-background",
        "tile flex aspect-square items-center justify-center self-center border-2 text-center font-black uppercase",
      )}
      animate={controls}
      variants={tileVariants}
      custom={{
        char,
        row: lineIndex,
        col: charIndex,
        isCurrent:
          lineIndex === currentGuessIndex &&
          charIndex === currentGuess.length - 1,
        currentLineIndex: currentGuessIndex,
      }}
    >
      {char}
    </motion.div>
  );
}

export default Tile;
