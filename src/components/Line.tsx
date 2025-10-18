import Tile from "@/components/Tile";
import clsx from "clsx";
import React from "react";

interface Props {
  guess: string;
  className?: string;
}

function Line({ guess, className }: Props) {
  return (
    <div className={clsx(className, "line grid gap-[5px] grid-cols-5 flex-1")}>
      {guess.split("").map((char, i) => (
        <Tile key={i} char={char} />
      ))}
    </div>
  );
}

export default Line;
