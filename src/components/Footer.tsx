"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { APP_NAME, EMAIL } from "@/lib/constants";
import { motion } from "motion/react";

interface Props {
  className?: string;
}

function Footer({ className }: Props) {
  return (
    <motion.footer
      className={clsx(className, "h-12 text-sm")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex size-full items-center justify-center gap-2">
        <Link href={"/"} className="hover:underline">
          &copy; {new Date().getFullYear()} {APP_NAME}
        </Link>
        <span>|</span>
        <Link href={"/privacy-policy"} className="hover:underline">
          Privacy Policy
        </Link>
        <span>|</span>
        <a href={`mailto:${EMAIL}`} className="hover:underline">
          Feedback
        </a>
      </div>
    </motion.footer>
  );
}

export default Footer;
