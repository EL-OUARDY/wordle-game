"use client";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode | string;
  variant?: "default" | "outline" | "icon" | "icon-outline";
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-3xl px-6 py-2 text-center capitalize transition-colors duration-300 select-none",
          variant === "default" &&
            "bg-button-background text-button-foreground",
          variant === "outline" &&
            "hover:bg-muted-background text-foreground border-foreground border",
          variant === "icon" &&
            "hover:bg-key-background flex aspect-square items-center justify-center rounded-none !p-0",
          variant === "icon-outline" &&
            "border-foreground aspect-square rounded-none border !p-0",
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
