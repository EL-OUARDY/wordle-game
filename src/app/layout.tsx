import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreDebug from "@/components/StoreDebug";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  let theme = "classic"
                  const raw = localStorage.getItem("wordle_settings");
                  if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === "object") {
                      theme = parsed.theme;
                    }
                  }
                  document.documentElement.classList.add(theme);
                } catch (_) {}
              })()
            `,
          }}
        />
      </head>
      <body className={`${futuraFont.variable} antialiased`}>
        <div className="page-wrapper font-body flex min-h-screen flex-col select-none">
          <StoreDebug />
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
