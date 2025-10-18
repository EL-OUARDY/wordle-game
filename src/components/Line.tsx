import React from "react";
import clsx from "clsx";
import Tile from "@/components/Tile";

interface Props {
  guess: string;
  lineIndex: number;
  className?: string;
}

function Line({ guess, lineIndex, className }: Props) {
  return (
    <div className={clsx(className, "line grid gap-[5px] grid-cols-5 flex-1")}>
      {guess.split("").map((char, charIndex) => {
        return (
          <Tile
            key={charIndex}
            char={char}
            charIndex={charIndex}
            lineIndex={lineIndex}
          />
        );
      })}
    </div>
  );
}

export default Line;
