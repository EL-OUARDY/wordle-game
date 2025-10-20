import { Variants } from "motion/react";

export const keyboardVariants: Variants = {
  initial: { opacity: 0 },
  intro: () => ({
    opacity: 1,
  }),
};
