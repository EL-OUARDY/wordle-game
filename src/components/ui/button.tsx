import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { motion } from "motion/react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode | string;
  variant?: "default" | "outline" | "icon" | "icon-outline";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(
          "inline-flex cursor-pointer items-center justify-center rounded-3xl px-8 py-2 text-center text-[1.06rem] capitalize transition-colors duration-300 select-none",
          variant === "default" &&
            "bg-button-background text-button-foreground",
          variant === "outline" && "text-foreground border-foreground border",
          variant === "icon" && "bg-key-background size-12 !p-0",
          variant === "icon-outline" && "border-foreground size-12 border !p-0",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

// Create a motion version of the Button component
export const MotionButton = motion.create(Button);

export default MotionButton;
