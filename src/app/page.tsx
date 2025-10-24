import Wordle from "@/components/Wordle";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      <Wordle />
    </main>
  );
}
