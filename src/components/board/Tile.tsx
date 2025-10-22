import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import { LetterStatus } from "@/types";
import { motion, useAnimation } from "motion/react";
import { tileVariants } from "@/components/board/animations";
import { getGuessStatuses } from "@/lib/utils";
interface Props {
  char: string;
  charIndex: number;
  lineIndex: number;
  className?: string;
  animated?: boolean;
}

function Tile({
  char,
  charIndex,
  lineIndex,
  className,
  animated = true,
}: Props) {
  const guesses = useStore((s) => s.guesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const solution = useStore((s) => s.solution);
  const [status, setStatus] = useState<LetterStatus | null>(null);
  const setLettersStatusMap = useStore((s) => s.setLettersStatusMap);
  const animationVariant = useStore((s) => s.animationVariant);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);

  const controls = useAnimation();

  // Reset status when game restarts
  useEffect(() => {
    setStatus(null);
  }, [solution]);

  const updateLetterStatus = useCallback(() => {
    if (!char || char === " ") return;
    if (!solution) return;

    const wordStatus = getGuessStatuses(
      solution,
      guesses[currentGuessIndex - 1],
    );
    const charStatus = wordStatus[charIndex];

    setStatus(charStatus);

    if (charStatus === "correct") {
      setLettersStatusMap((prev) => ({
        ...prev,
        correct: [...prev.correct, char],
      }));
    } else if (charStatus === "present") {
      setLettersStatusMap((prev) => ({
        ...prev,
        present: [...prev.present, char],
      }));
    } else {
      setLettersStatusMap((prev) => ({
        ...prev,
        absent: [...prev.absent, char],
      }));
    }
  }, [
    char,
    charIndex,
    currentGuessIndex,
    guesses,
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

      // Reset after animation completes
      const resetAnimationVariant = () => {
        controls.start("idle");
        setAnimationVariant("idle");
      };

      if (
        animationVariant === "reveal" &&
        currentGuessIndex - 1 === lineIndex
      ) {
        if (animated) {
          await controls.start("flip_in");
          updateLetterStatus();
          await controls.start("flip_out");
          resetAnimationVariant();
        } else {
          updateLetterStatus();
          resetAnimationVariant();
        }
      }

      if (
        animated &&
        animationVariant === "type" &&
        isCurrent &&
        char &&
        char !== " "
      ) {
        await controls.start(animationVariant);
        resetAnimationVariant();
      }

      if (animated && animationVariant === "delete") {
        await controls.start(animationVariant);
        resetAnimationVariant();
      }

      if (animated && animationVariant === "new_game") {
        await controls.start(animationVariant);
        updateLetterStatus();
        resetAnimationVariant();
      }

      if (
        animated &&
        animationVariant === "bounce" &&
        lineIndex === currentGuessIndex - 1
      ) {
        await controls.start(animationVariant);
        resetAnimationVariant();
      }
    };

    runAnimation();
  }, [
    animated,
    animationVariant,
    char,
    charIndex,
    controls,
    currentGuess.length,
    currentGuessIndex,
    lineIndex,
    setAnimationVariant,
    updateLetterStatus,
  ]);

  return (
    <motion.div
      className={clsx(
        className,
        char && char !== " " ? "border-foreground" : "border-muted-foreground",
        status && "text-tile-foreground !border-0",
        status ? `bg-${status}` : "bg-tile-background",
        "tile flex items-center justify-center border-2 font-black uppercase",
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
