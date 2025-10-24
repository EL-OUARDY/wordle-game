import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const futuraFont = localFont({
  variable: "--font-futura",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/FuturaCyrillicBook.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FuturaCyrillicDemi.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FuturaCyrillicBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Wordle Game",
  description: "Multi language Wordle game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${futuraFont.variable} antialiased`}>
        <div className="page-wrapper font-body flex min-h-screen flex-col select-none">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
