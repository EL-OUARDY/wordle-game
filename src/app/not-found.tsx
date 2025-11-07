import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function NotFound() {
  const t = useTranslations("404");
  return (
    <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">404</span>
        <span className="bg-key-background h-10 w-px"></span>
        <Link href={"/"} className="capitalize hover:underline">
          {t("title")}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
