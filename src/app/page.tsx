import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Wordle from "@/components/Wordle";

export default function Home() {
  return (
    <div className="page-wrapper font-body flex min-h-screen flex-col select-none">
      <Header />
      <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
        <Wordle />
      </main>
      <Footer />
    </div>
  );
}
