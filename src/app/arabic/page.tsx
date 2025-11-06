import { Suspense } from "react";
import { Cairo } from "next/font/google";
import Wordle from "@/components/Wordle";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function Page() {
  return (
    <main
      className={`${cairo.className} mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center`}
    >
      {/* <h3 className="px-4 text-center text-xl" dir="rtl">
        لعبة Wordle باللغة <br /> العربية قريبًا
      </h3> */}

      <Suspense fallback={null}>
        <Wordle language="Arabic" />
      </Suspense>
    </main>
  );
}
