"use client";
import useStore from "@/hooks/useStore";
import { useEffect } from "react";

export default function Page() {
  const setLanguage = useStore((s) => s.setLanguage);

  useEffect(() => {
    setLanguage("German");
  }, [setLanguage]);

  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      <h3 className="px-4 text-center text-2xl">
        Das Wordle-Spiel auf <br /> Deutsch kommt bald
      </h3>
    </main>
  );
}
