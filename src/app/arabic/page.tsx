"use client";
import useStore from "@/hooks/useStore";
import { Cairo } from "next/font/google";
import { useEffect } from "react";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function Page() {
  const setLanguage = useStore((s) => s.setLanguage);

  useEffect(() => {
    setLanguage("Arabic");
  }, [setLanguage]);

  return (
    <main
      className={`${cairo.className} mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center`}
    >
      <h3 className="px-4 text-center text-2xl" dir="rtl">
        لعبة Wordle باللغة <br /> العربية قريبًا
      </h3>
    </main>
  );
}
