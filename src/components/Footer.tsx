"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { APP_NAME, EMAIL } from "@/lib/constants";
import { motion } from "motion/react";
import useAuth from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}

function Footer({ className }: Props) {
  const { user } = useAuth();

  const t = useTranslations("Footer");

  return (
    <motion.footer
      className={clsx(className, "h-12 text-sm")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex size-full items-center justify-center gap-2">
        <Link href={"/"} className="capitalize hover:underline">
          &copy;{" "}
          {t("copyright", {
            year: new Date().getFullYear(),
            appName: APP_NAME,
          })}
        </Link>
        <span>|</span>
        <Link href={"/privacy-policy"} className="capitalize hover:underline">
          {t("privacyPolicyLink")}
        </Link>
        <span>|</span>
        {!user ? (
          <Link href={"/login"} className="capitalize hover:underline">
            {t("loginLink")}
          </Link>
        ) : (
          <a href={`mailto:${EMAIL}`} className="capitalize hover:underline">
            {t("feedbackLink")}
          </a>
        )}
      </div>
    </motion.footer>
  );
}

export default Footer;
