import Board from "@/components/Board";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <Board className="flex-1" />
      <Footer />
    </div>
  );
}
