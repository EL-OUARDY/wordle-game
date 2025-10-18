import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

function Board({ className }: Props) {
  return (
    <main
      className={clsx(className, "flex items-center justify-center flex-col")}
    >
      Board
    </main>
  );
}

export default Board;
