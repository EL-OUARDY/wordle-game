"use client";
import Wordle from "@/components/Wordle";
import useStore from "@/hooks/useStore";
import { useEffect } from "react";

export default function Page() {
  const setLanguage = useStore((s) => s.setLanguage);

  useEffect(() => {
    setLanguage("French");
  }, [setLanguage]);

  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      {/* <Wordle language="French" /> */}
      <h3 className="px-4 text-center text-2xl">
        Le jeu Wordle en <br /> français arrive bientôt
      </h3>
    </main>
  );
}
