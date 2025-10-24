import GlobeIcon from "@/components/ui/icons/globe";
import { Language } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import UKFlagIcon from "@/components/ui/flags/uk";
import SpainFlagIcon from "@/components/ui/flags/spain";
import FranceFlagIcon from "@/components/ui/flags/france";
import GermnayFlagIcon from "@/components/ui/flags/germany";
import MoroccoFlagIcon from "@/components/ui/flags/morocco";
import SaudiArabiaFlagIcon from "@/components/ui/flags/saudi";

interface Props {
  className: string;
  onClick?: () => void;
}

interface LanguagesList {
  name: Language;
  displayName: string;
  link: string;
  icon: ReactNode;
}

const languagesList: LanguagesList[] = [
  {
    name: "English",
    displayName: "English",
    link: "/",
    icon: <UKFlagIcon className="size-5" />,
  },
  {
    name: "French",
    displayName: "Français",
    link: "french",
    icon: <FranceFlagIcon className="size-5" />,
  },
  {
    name: "Spanish",
    displayName: "Español",
    link: "spanish",
    icon: <SpainFlagIcon className="size-5" />,
  },
  {
    name: "German",
    displayName: "Deutsch",
    link: "german",
    icon: <GermnayFlagIcon className="size-5" />,
  },
  {
    name: "Arabic",
    displayName: "العربية",
    link: "arabic",
    icon: <SaudiArabiaFlagIcon className="size-5" />,
  },
];

function LanguagesMenu({ className, onClick }: Props) {
  return (
    <div className={clsx("bg-background flex flex-col", className)}>
      {languagesList.map((language, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
        >
          <Link
            onClick={onClick}
            href={language.link}
            className={clsx(
              index < languagesList.length - 1 &&
                "border-key-background border-b",
              "language hover:bg-muted-background flex items-center gap-3 px-8 py-2 text-lg",
            )}
          >
            {language.icon}
            <span>{language.displayName}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default LanguagesMenu;
