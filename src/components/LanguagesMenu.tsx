import { Language, Locale } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import UKFlagIcon from "@/components/ui/flags/uk";
import SpainFlagIcon from "@/components/ui/flags/spain";
import FranceFlagIcon from "@/components/ui/flags/france";
import GermnayFlagIcon from "@/components/ui/flags/germany";
import SaudiArabiaFlagIcon from "@/components/ui/flags/saudi";
import useStore from "@/hooks/useStore";

interface Props {
  className: string;
  onClick?: () => void;
}

interface LanguagesList {
  name: Language;
  displayName: string;
  link: string;
  icon: ReactNode;
  local: Locale;
  available: boolean;
}

export const languagesList: LanguagesList[] = [
  {
    name: "English",
    displayName: "English",
    link: "english",
    icon: <UKFlagIcon className="size-5" />,
    local: "en",
    available: true,
  },
  {
    name: "French",
    displayName: "Français",
    link: "french",
    icon: <FranceFlagIcon className="size-5" />,
    local: "fr",
    available: true,
  },
  {
    name: "Spanish",
    displayName: "Español",
    link: "spanish",
    icon: <SpainFlagIcon className="size-5" />,
    local: "es",
    available: false,
  },
  {
    name: "German",
    displayName: "Deutsch",
    link: "german",
    icon: <GermnayFlagIcon className="size-5" />,
    local: "de",
    available: false,
  },
  {
    name: "Arabic",
    displayName: "العربية",
    link: "arabic",
    icon: <SaudiArabiaFlagIcon className="size-5" />,
    local: "ar",
    available: false,
  },
];

function LanguagesMenu({ className, onClick }: Props) {
  const siteLanguage = useStore((s) => s.language);

  return (
    <div className={clsx("bg-background flex flex-col", className)}>
      {languagesList.map((language, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
        >
          {language.available ? (
            <Link
              onClick={onClick}
              href={language.link}
              className={clsx(
                index < languagesList.length - 1 && "border-b",
                "language border-key-background hover:bg-muted-background relative flex items-center gap-3 px-8 py-2 text-lg",
              )}
            >
              {language.icon}
              <span>{language.displayName}</span>
              {siteLanguage === language.name && (
                <span className="bg-key-background absolute top-0 left-0 h-full w-1"></span>
              )}
            </Link>
          ) : (
            <span
              className={clsx(
                index < languagesList.length - 1 && "border-b",
                "language border-key-background hover:bg-muted-background relative flex items-center gap-3 px-8 py-2 text-lg",
              )}
            >
              <span className="grayscale filter">{language.icon}</span>
              <span>{language.displayName}</span>
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default LanguagesMenu;
