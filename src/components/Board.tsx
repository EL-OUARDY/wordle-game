"use client";
import React from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import Line from "@/components/Line";

const WORD_LENGTH = 5;

interface Props {
  className?: string;
}

function Board({ className }: Props) {
  const guesses = useStore((s) => s.guesses);
  return (
    <div
      className={clsx(
        className,
        "board flex flex-col w-[300px] h-[360px] gap-[5px] p-[10px] "
      )}
    >
      {guesses.map((guess, i) => (
        <Line key={i} guess={guess ?? " ".repeat(WORD_LENGTH)} />
      ))}
    </div>
  );
}

export default Board;
