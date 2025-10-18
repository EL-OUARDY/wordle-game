"use client";
import React from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import Line from "@/components/Line";
import { WORD_LENGTH } from "@/lib/contstants";

interface Props {
  className?: string;
}

function Board({ className }: Props) {
  const guesses = useStore((s) => s.guesses);
  const currentGuess = useStore((s) => s.currentGuess);
  return (
    <div
      className={clsx(
        className,
        "board flex flex-col w-[300px] h-[360px] gap-[5px] p-[10px] "
      )}
    >
      {guesses.map((guess, i) => {
        const isCurrent = i === guesses.findIndex((guess) => guess === null);
        return (
          <Line
            key={i}
            guess={
              isCurrent
                ? currentGuess.padEnd(5, " ")
                : guess ?? " ".repeat(WORD_LENGTH)
            }
          />
        );
      })}
    </div>
  );
}

export default Board;
