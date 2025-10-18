import Board from "@/components/Board";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Keyboard from "@/components/keyboard";

export default function Home() {
  return (
    <div className="page-wrapper select-none min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-[500px] w-full mx-auto flex flex-col items-center justify-center">
        <Board />
        <Keyboard />
      </main>
      <Footer />
    </div>
  );
}
