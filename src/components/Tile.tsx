import clsx from "clsx";
import React from "react";

interface Props {
  char: string;
  className?: string;
}

function Tile({ char, className }: Props) {
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
