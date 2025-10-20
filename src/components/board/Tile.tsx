import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import { LetterStatus } from "@/types";

interface Props {
  char: string;
  charIndex: number;
  lineIndex: number;
  className?: string;
}

function Tile({ char, charIndex, lineIndex, className }: Props) {
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const solution = useStore((s) => s.solution);
  const [status, setStatus] = useState<LetterStatus | null>(null);
  const setLettersState = useStore((s) => s.setLettersState);

  // Reset status when game restarts
  useEffect(() => {
    setStatus(null);
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
    <div
      className={clsx(
        className,
        lineIndex < currentGuessIndex && "text-tile-foreground !border-0",
        status ? `bg-${status}` : "bg-tile-background",
        "tile border-muted-foreground flex items-center justify-center border-2 font-black uppercase",
      )}
    >
      {char}
    </div>
  );
}

export default Tile;
