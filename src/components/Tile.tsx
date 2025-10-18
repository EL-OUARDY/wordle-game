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
  const lettersState = useStore((s) => s.lettersState);
  const setLettersState = useStore((s) => s.setLettersState);

  useEffect(() => {
    if (lineIndex >= currentGuessIndex) return;
    if (solution[charIndex] === char) {
      setStatus("correct");
    } else if (!solution.includes(char)) {
      setStatus("absent");
    } else if (solution.includes(char)) {
      setStatus("present");
    }
  }, [char, charIndex, currentGuessIndex, lineIndex, solution]);

  return (
    <div
      className={clsx(
        className,
        lineIndex < currentGuessIndex && "text-tile-foreground !border-0",
        status && `bg-${status}`,
        "tile border-2 border-muted-foreground flex items-center justify-center text-[1.7rem] uppercase font-black"
      )}
    >
      {char}
    </div>
  );
}

export default Tile;
