import React from "react";
import clsx from "clsx";

interface Props {
  char: string;
  index: number;
  className?: string;
}

function Tile({ char, index, className }: Props) {
  return (
    <div
      className={clsx(
        className,
        "tile border-2 border-muted-foreground flex items-center justify-center text-[1.7rem] uppercase font-black"
      )}
    >
      {char}
    </div>
  );
}

export default Tile;
