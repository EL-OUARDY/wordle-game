import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreDebug from "@/components/StoreDebug";
import { APP_LINK, APP_NAME } from "@/lib/constants";

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
  title: `${APP_NAME} - Play Wordle in Any Language`,
  description:
    "Play Wordle for free, in your language, with no ads — unlimited fun, no limits! Track stats, compete, and enjoy multilingual word guessing.",
  keywords: ["Wordle", APP_NAME, "Game", "Languages", "Multilingual Wordle"],
  openGraph: {
    title: `${APP_NAME} - Multilingual Wordle Game`,
    description:
      "Play Wordle for free in English, French, Arabic, and more. No ads, just fun!",
    url: APP_LINK,
    siteName: APP_NAME,
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Play Wordle in Any Language`,
    description:
      "Free, ad-free Wordle in multiple languages. Play now and test your vocabulary!",
    images: ["/img/og-image.png"],
  },
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
          <StoreDebug property="solution" />
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
