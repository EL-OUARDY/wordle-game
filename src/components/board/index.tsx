"use client";
import React from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import Line from "@/components/board/Line";
import { WORD_LENGTH } from "@/lib/constants";
import { motion } from "motion/react";

interface Props {
  className?: string;
}

function Board({ className }: Props) {
  const guesses = useStore((s) => s.guesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);

  return (
    <motion.div
      className={clsx(
        className,
        "board flex h-[357px] w-[300px] flex-col gap-[5px] p-[10px]",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {guesses.map((guess, i) => {
        return (
          <Line
            key={i}
            lineIndex={i}
            guess={
              currentGuessIndex === i
                ? currentGuess.padEnd(WORD_LENGTH, " ")
                : (guess ?? " ".repeat(WORD_LENGTH))
            }
          />
        );
      })}
    </motion.div>
  );
}

export default Board;
