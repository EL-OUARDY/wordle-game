import React from "react";
import clsx from "clsx";
import Tile from "@/components/Tile";
import useStore from "@/hooks/useStore";

interface Props {
  guess: string;
  index: number;
  className?: string;
}

function Line({ guess, index, className }: Props) {
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const solution = useStore((s) => s.solution);

  return (
    <div className={clsx(className, "line grid gap-[5px] grid-cols-5 flex-1")}>
      {guess.split("").map((char, charIndex) => {
        let tileClasses = "";
        if (index < currentGuessIndex) {
          tileClasses = "text-tile-foreground !border-0";
          if (solution[charIndex] === char) tileClasses += " bg-correct";
          else if (!solution.includes(char)) tileClasses += " bg-absent";
          else if (solution.includes(char)) tileClasses += " bg-present";
        }
        return (
          <Tile
            className={tileClasses}
            key={charIndex}
            char={char}
            index={charIndex}
          />
        );
      })}
    </div>
  );
}

export default Line;
