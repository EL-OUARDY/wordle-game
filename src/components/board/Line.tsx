import React, { useEffect } from "react";
import clsx from "clsx";
import Tile from "@/components/board/Tile";
import useStore from "@/hooks/useStore";
import { lineVariants } from "@/components/board/animations";
import { motion, useAnimation } from "motion/react";

interface Props {
  guess: string;
  lineIndex: number;
  className?: string;
  animated?: boolean;
}

function Line({ guess, lineIndex, className, animated = true }: Props) {
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const animationVariant = useStore((s) => s.animationVariant);
  const setAnimationVariant = useStore((s) => s.setAnimationVariant);

  const controls = useAnimation();
  // Apply current animation variant
  useEffect(() => {
    if (!animated) return;
    const runAnimation = async () => {
      const isCurrent = lineIndex === currentGuessIndex;

      if (animationVariant === "shake" && isCurrent) {
        await controls.start(animationVariant);
        // Reset after animation completes
        controls.start("idle");
        setAnimationVariant("idle");
      }
    };

    runAnimation();
  }, [
    animated,
    animationVariant,
    controls,
    currentGuessIndex,
    lineIndex,
    setAnimationVariant,
  ]);

  return (
    <motion.div
      className={clsx(className, "line grid flex-1 grid-cols-5 gap-[5px]")}
      animate={controls}
      variants={lineVariants}
    >
      {guess.split("").map((char, charIndex) => {
        return (
          <Tile
            key={charIndex}
            char={char}
            charIndex={charIndex}
            lineIndex={lineIndex}
            animated={animated}
          />
        );
      })}
    </motion.div>
  );
}

export default Line;
