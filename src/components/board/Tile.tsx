import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import { LetterStatus } from "@/types";
import { motion, useAnimation } from "motion/react";
import { tileVariants } from "@/components/board/animations";
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
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const solution = useStore((s) => s.solution);
  const [status, setStatus] = useState<LetterStatus | null>(null);
  const setLettersState = useStore((s) => s.setLettersState);
  const animationVariant = useStore((s) => s.animationVariant);

  const controls = useAnimation();

  // Reset status when game restarts
  useEffect(() => {
    setStatus(null);
  }, [solution]);

  const setLetterStatus = useCallback(() => {
    if (!char || char === " ") return;
    if (!solution) return;
    if (solution[charIndex] === char) {
      setStatus("correct");
      setLettersState((prev) => ({
        ...prev,
        correct: [...prev.correct, char],
      }));
    } else if (!solution.includes(char)) {
      setStatus("absent");
      setLettersState((prev) => ({
        ...prev,
        absent: [...prev.absent, char],
      }));
    } else if (solution.includes(char)) {
      setStatus("present");
      setLettersState((prev) => ({
        ...prev,
        present: [...prev.present, char],
      }));
    }
  }, [char, charIndex, setLettersState, solution]);

  // Apply current animation variant
  useEffect(() => {
    const runAnimation = async () => {
      const isCurrent =
        lineIndex === currentGuessIndex &&
        charIndex === currentGuess.length - 1;

      if (
        animationVariant === "reveal" &&
        currentGuessIndex - 1 === lineIndex
      ) {
        if (animated) {
          await controls.start("flip_in");
          setLetterStatus();
          await controls.start("flip_out");
        } else {
          setLetterStatus();
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
      }

      if (animated && animationVariant === "new_game") {
        await controls.start(animationVariant);
        setLetterStatus();
      }

      if (
        animated &&
        animationVariant === "bounce" &&
        lineIndex === currentGuessIndex - 1
      ) {
        await controls.start(animationVariant);
      }

      // Reset after animation completes
      controls.start("idle");
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
    setLetterStatus,
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
