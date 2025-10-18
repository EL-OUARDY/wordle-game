"use client";
import useStore from "@/hooks/useStore";
import { WORD_LENGTH } from "@/lib/contstants";
import clsx from "clsx";
import React, { useEffect } from "react";

interface Props {
  className?: string;
}

function Keyboard({ className }: Props) {
  const setGuesses = useStore((s) => s.setGuesses);
  const currentGuess = useStore((s) => s.currentGuess);
  const isGameOver = useStore((s) => s.isGameOver);
  const setCurrentGuess = useStore((s) => s.setCurrentGuess);

  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      const char = e.key;

      // Check if game is over
      if (isGameOver) return;

      // Check if Enter key is pressed
      if (char === "Enter") {
      }

      // Check if backspace key is pressed
      if (char === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      }

      // Check if current guess is already 5 letters
      if (currentGuess.length >= WORD_LENGTH) return;

      // Check if typed key is valid letter
      const isLetter = /^[a-zA-Z]$/.test(char);
      if (!isLetter) return;

      // Add character
      setCurrentGuess(currentGuess + char.toLowerCase());
    };

    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [currentGuess, isGameOver, setCurrentGuess, setGuesses]);

  return (
    <div
      className={clsx(
        className,
        "h-20 bg-key-background w-full flex items-center justify-center"
      )}
    >
      Keyboard
    </div>
  );
}

export default Keyboard;
