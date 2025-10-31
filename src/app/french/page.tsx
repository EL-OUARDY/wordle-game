import { Suspense } from "react";
import Wordle from "@/components/Wordle";

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      {/* <h3 className="px-4 text-center text-2xl">
        Le jeu Wordle en <br /> français arrive bientôt
      </h3> */}
      <Suspense fallback={null}>
        <Wordle language="French" />
      </Suspense>
    </main>
  );
}
