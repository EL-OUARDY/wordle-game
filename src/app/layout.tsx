import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const futuraltBook = localFont({
  variable: "--font-futura-book",
  display: "swap",
  weight: "400",
  src: [
    {
      path: "../../public/fonts/futuralt-book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/futuralt-bold.woff2",
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
      <body className={`${futuraltBook.variable} antialiased`}>{children}</body>
    </html>
  );
}
