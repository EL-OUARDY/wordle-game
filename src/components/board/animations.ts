import { anim } from "@/lib/utils";
import { Variants } from "motion/react";

const ANIMATION_ORIGIN = [0, 0];
const ANIMATION_NOISE = 0.05;

const getDelay = (row: number, col: number) => {
  return (
    (Math.sqrt(
      (row - ANIMATION_ORIGIN[0]) ** 2 + (col - ANIMATION_ORIGIN[1]) ** 2,
    ) /
      (10 * Math.sqrt(2))) *
      0.5 +
    Math.random() * ANIMATION_NOISE
  );
};

export const boardVariants: Variants = {
  initial: { opacity: 0 },
  intro: () => ({
    opacity: 1,
  }),
};

export const tileVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  new_game: ({ row, col }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.5,
      delay: getDelay(row, col),
      duration: 0.8,
    },
  }),
};
