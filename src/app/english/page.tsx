import { Suspense } from "react";
import Wordle from "@/components/Wordle";

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      <Suspense fallback={null}>
        <Wordle language="English" />
      </Suspense>
    </main>
  );
}
