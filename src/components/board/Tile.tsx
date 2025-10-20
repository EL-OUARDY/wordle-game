import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import { LetterStatus } from "@/types";
import { motion } from "motion/react";
import { anim } from "@/lib/utils";
import { tileVariants } from "@/components/board/animations";
interface Props {
  char: string;
  charIndex: number;
  lineIndex: number;
  className?: string;
}

type AnimationVariant = "new_game" | null;

function Tile({ char, charIndex, lineIndex, className }: Props) {
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const solution = useStore((s) => s.solution);
  const [status, setStatus] = useState<LetterStatus | null>(null);
  const setLettersState = useStore((s) => s.setLettersState);

  const [animVariant, setAnimVariant] = useState<AnimationVariant>(null);

  // Reset status when game restarts
  useEffect(() => {
    setStatus(null);
    setAnimVariant("new_game");
  }, [solution]);

  // Set status
  useEffect(() => {
    if (!solution) return;
    if (lineIndex >= currentGuessIndex) return;
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
  }, [
    char,
    charIndex,
    currentGuessIndex,
    lineIndex,
    setLettersState,
    solution,
  ]);

  return (
    <motion.div
      key={solution}
      className={clsx(
        className,
        char && char !== " " ? "border-foreground" : "border-muted-foreground",
        lineIndex < currentGuessIndex && "text-tile-foreground !border-0",
        status ? `bg-${status}` : "bg-tile-background",
        "tile flex items-center justify-center border-2 font-black uppercase",
      )}
      {...(animVariant
        ? anim(animVariant, tileVariants, { row: lineIndex, col: charIndex })
        : {})}
    >
      {char}
    </motion.div>
  );
}

export default Tile;
