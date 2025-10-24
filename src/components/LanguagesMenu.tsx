import GlobeIcon from "@/components/ui/icons/globe";
import { Language } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  className: string;
}

interface LanguagesList {
  name: Language;
  link: string;
  icon: ReactNode;
}

const languagesList: LanguagesList[] = [
  { name: "English", link: "/", icon: <GlobeIcon className="size-5" /> },
  { name: "Spanish", link: "spanish", icon: <GlobeIcon className="size-5" /> },
  { name: "French", link: "french", icon: <GlobeIcon className="size-5" /> },
  { name: "German", link: "german", icon: <GlobeIcon className="size-5" /> },
  { name: "Arabic", link: "arabic", icon: <GlobeIcon className="size-5" /> },
];

function LanguagesMenu({ className }: Props) {
  return (
    <div className={clsx("bg-background flex flex-col", className)}>
      {languagesList.map((language, index) => (
        <Link
          href={language.link}
          key={index}
          className="language hover:bg-key-background flex items-center gap-3 px-6 py-2 text-lg"
        >
          {language.icon}
          <span>{language.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default LanguagesMenu;
