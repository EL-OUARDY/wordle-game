"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import Line from "@/components/board/Line";
import { WORD_LENGTH } from "@/lib/constants";
import { motion } from "motion/react";

interface Props {
  className?: string;
}

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

function Board({ className }: Props) {
  const guesses = useStore((s) => s.guesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (!containerRef.current) return;
      const containerH = containerRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      let size = { w: 300, h: 357 };
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      if (containerH <= 420 && windowWidth < 400) {
        if (isStandalone) size = { w: 300, h: 357 };
        else size = { w: 240, h: 285 };
      } else if (containerH >= 450 && windowWidth < 768)
        size = { w: 350, h: 417 };
      else size = { w: 300, h: 357 };

      setSize(size);
    };
    updateHeight(); // initial run
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      ref={containerRef}
      className="board-container flex w-full flex-1 items-center justify-center"
    >
      {size && (
        <motion.div
          id="board"
          className={clsx(className, "board flex flex-col gap-[5px] p-[10px]")}
          style={{
            width: size.w,
            height: size.h,
            fontSize: size.w === 240 ? "1.4rem" : "1.7rem",
          }}
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
      )}
    </div>
  );
}

export default Board;
