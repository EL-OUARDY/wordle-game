import React from "react";
import clsx from "clsx";
import Tile from "@/components/board/Tile";
import { anim } from "@/lib/utils";
import useStore from "@/hooks/useStore";
import { lineVariants } from "@/components/board/animations";
import { motion } from "motion/react";

interface Props {
  guess: string;
  lineIndex: number;
  className?: string;
}

function Line({ guess, lineIndex, className }: Props) {
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const animationVariant = useStore((s) => s.animationVariant);

  return (
    <motion.div
      className={clsx(
        className,
        "line grid flex-1 grid-cols-5 gap-[5px] text-[1.7rem]",
      )}
      {...(animationVariant
        ? anim(animationVariant, lineVariants, {
            isCurrent: lineIndex === currentGuessIndex,
          })
        : {})}
    >
      {guess.split("").map((char, charIndex) => {
        return (
          <Tile
            key={charIndex}
            char={char}
            charIndex={charIndex}
            lineIndex={lineIndex}
          />
        );
      })}
    </motion.div>
  );
}

export default Line;
