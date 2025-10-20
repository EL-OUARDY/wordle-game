import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Wordle from "@/components/Wordle";

export default function Home() {
  return (
    <div className="page-wrapper flex min-h-screen flex-col font-sans select-none">
      <Header />
      <main className="mx-auto flex w-full max-w-[500px] flex-1 flex-col items-center justify-center">
        <Wordle />
      </main>
      <Footer />
    </div>
  );
}
