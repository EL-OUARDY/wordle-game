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
  intro: () => ({
    opacity: [0, 1],
  }),
};

export const lineVariants: Variants = {
  idle: { x: 0 },
  shake: ({ isCurrent }) => {
    if (!isCurrent) return {};
    return {
      x: [0, -12, 12, -8, 8, -4, 4, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    };
  },
};

export const tileVariants: Variants = {
  idle: { opacity: 1, scale: 1, rotateX: 0 },

  new_game: ({ row, col }) => ({
    opacity: [0, 1],
    scale: [0.8, 1],
    transition: {
      type: "spring",
      bounce: 0.5,
      delay: getDelay(row, col),
      duration: 0.8,
    },
  }),

  type: {
    opacity: 1,
    scale: [1, 1.1, 1],
    transition: { duration: 0.1, ease: "easeOut" },
  },

  flip_in: ({ col }) => {
    return {
      rotateX: [0, -90],
      transition: {
        duration: 0.25,
        delay: col * 0.25,
        ease: "easeIn",
      },
    };
  },

  flip_out: ({}) => {
    return {
      rotateX: [-90, 0],
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    };
  },
};
