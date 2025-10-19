"use client";
import React from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import Line from "@/components/Line";
import { WORD_LENGTH } from "@/lib/constants";
import { json } from "stream/consumers";

interface Props {
  className?: string;
}

function Board({ className }: Props) {
  const guesses = useStore((s) => s.guesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  return (
    <div
      className={clsx(
        className,
        "board flex flex-col w-[300px] h-[360px] gap-[5px] p-[10px] "
      )}
    >
      {guesses.map((guess, i) => {
        return (
          <Line
            key={i}
            lineIndex={i}
            guess={
              currentGuessIndex === i
                ? currentGuess.padEnd(WORD_LENGTH, " ")
                : guess ?? " ".repeat(WORD_LENGTH)
            }
          />
        );
      })}
    </div>
  );
}

export default Board;
