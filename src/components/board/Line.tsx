import React, { useEffect } from "react";
import clsx from "clsx";
import Tile from "@/components/board/Tile";
import useStore from "@/hooks/useStore";
import { lineVariants } from "@/components/board/animations";
import { motion, useAnimation } from "motion/react";
import { LettersStateMap } from "@/types";
import { sleep } from "@/lib/utils";

interface Props {
  guess: string;
  lineIndex: number;
  className?: string;
  animated?: boolean;
}

function Line({ guess, lineIndex, className, animated = true }: Props) {
  const guesses = useStore((s) => s.guesses);
  const solution = useStore((s) => s.solution);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const animationVariant = useStore((s) => s.animationVariant);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);
  const setLettersStatusMap = useStore((s) => s.setLettersStatusMap);

  const controls = useAnimation();

  // Update letters status map when a new word revealed
  useEffect(() => {
    if (!solution) return;
    if (currentGuessIndex === 0) return;

    const handleWordRevealEnd = async () => {
      const newStatus: LettersStateMap = {
        correct: [],
        present: [],
        absent: [],
      };

      const word = guesses[currentGuessIndex - 1];

      // Check status for all characters
      word.split("").forEach((char, index) => {
        if (solution[index] === char) {
          newStatus.correct.push(char);
        } else if (!solution.includes(char)) {
          newStatus.absent.push(char);
        } else if (solution.includes(char)) {
          newStatus.present.push(char);
        }
      });

      // Wait (1.25 second) for reveal animation to finish
      await sleep(1500);

      // update once when done
      setLettersStatusMap((prev) => ({
        correct: [...prev.correct, ...newStatus.correct],
        present: [...prev.present, ...newStatus.present],
        absent: [...prev.absent, ...newStatus.absent],
      }));
    };

    handleWordRevealEnd();
  }, [currentGuessIndex, guesses, setLettersStatusMap, solution]);

  // Apply current animation variant
  useEffect(() => {
    if (!animated) return;
    const runAnimation = async () => {
      const isCurrent = lineIndex === currentGuessIndex;

      if (animationVariant === "shake" && isCurrent) {
        await controls.start(animationVariant);
        // Reset after animation completes
        controls.start("idle");
        setAnimationVariant("idle");
      }
    };

    runAnimation();
  }, [
    animated,
    animationVariant,
    controls,
    currentGuessIndex,
    lineIndex,
    setAnimationVariant,
  ]);

  return (
    <motion.div
      className={clsx(
        className,
        "line grid flex-1 grid-cols-5 gap-[5px] text-[1.7rem]",
      )}
      animate={controls}
      variants={lineVariants}
    >
      {guess.split("").map((char, charIndex) => {
        return (
          <Tile
            key={charIndex}
            char={char}
            charIndex={charIndex}
            lineIndex={lineIndex}
            animated={animated}
          />
        );
      })}
    </motion.div>
  );
}

export default Line;
