import React from "react";
import clsx from "clsx";
import Tile from "@/components/board/Tile";

interface Props {
  guess: string;
  lineIndex: number;
  className?: string;
}

function Line({ guess, lineIndex, className }: Props) {
  return (
    <div
      className={clsx(
        className,
        "line grid flex-1 grid-cols-5 gap-[5px] text-[1.7rem]",
      )}
    >
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
