import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { APP_LINK, APP_NAME } from "@/lib/constants";
import InstallListener from "@/components/InstallListener";
import { getUserLocale } from "@/services/locale";
import Script from "next/script";
import { Inter } from "next/font/google";

const futuraFont = localFont({
  variable: "--font-futura",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/futuralt-book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/futuralt-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/futuralt-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/api/manifest",
  metadataBase: new URL(APP_LINK),
  title: `${APP_NAME} - Play Wordle in Your Language`,
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
    title: `${APP_NAME} - Play Wordle in Your Language`,
    description:
      "Free, ad-free Wordle in multiple languages. Play now and test your vocabulary!",
    images: ["/img/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icons/web-app-manifest-192x192.png",
        sizes: "196x196",
        type: "image/png",
      },
    ],
    apple: [{ url: "/icons/apple-icon-180.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        media:
          "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_17_Pro_Max__iPhone_16_Pro_Max_landscape.png",
      },
      {
        media:
          "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_landscape.png",
      },
      {
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",
      },
      {
        media:
          "(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_Air_landscape.png",
      },
      {
        media:
          "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",
      },
      {
        media:
          "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
      },
      {
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
      },
      {
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
      },
      {
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
      },
      {
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/iPhone_11__iPhone_XR_landscape.png",
      },
      {
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
      },
      {
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
      },
      {
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
      },
      {
        media:
          "(device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/13__iPad_Pro_M4_landscape.png",
      },
      {
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/12.9__iPad_Pro_landscape.png",
      },
      {
        media:
          "(device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/11__iPad_Pro_M4_landscape.png",
      },
      {
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
      },
      {
        media:
          "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/10.9__iPad_Air_landscape.png",
      },
      {
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/10.5__iPad_Air_landscape.png",
      },
      {
        media:
          "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/10.2__iPad_landscape.png",
      },
      {
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
      },
      {
        media:
          "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/splash_screens/8.3__iPad_Mini_landscape.png",
      },
      {
        media:
          "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_17_Pro_Max__iPhone_16_Pro_Max_portrait.png",
      },
      {
        media:
          "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_portrait.png",
      },
      {
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
      },
      {
        media:
          "(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_Air_portrait.png",
      },
      {
        media:
          "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
      },
      {
        media:
          "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
      },
      {
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
      },
      {
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
      },
      {
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
      },
      {
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/iPhone_11__iPhone_XR_portrait.png",
      },
      {
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
      },
      {
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
      },
      {
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
      },
      {
        media:
          "(device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/13__iPad_Pro_M4_portrait.png",
      },
      {
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/12.9__iPad_Pro_portrait.png",
      },
      {
        media:
          "(device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/11__iPad_Pro_M4_portrait.png",
      },
      {
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
      },
      {
        media:
          "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/10.9__iPad_Air_portrait.png",
      },
      {
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/10.5__iPad_Air_portrait.png",
      },
      {
        media:
          "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/10.2__iPad_portrait.png",
      },
      {
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
      },
      {
        media:
          "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/splash_screens/8.3__iPad_Mini_portrait.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getUserLocale();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        {/* Meta tags */}
        <meta name="theme-color" content="#ffffff" />

        {/* Theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const themes = [
                    { name: "classic", bgColor: "#ffffff" },
                    { name: "night", bgColor: "#181818" },
                    { name: "coffee", bgColor: "#f7f3ef" },
                    { name: "sakura", bgColor: "#fff5f7" },
                    { name: "slate", bgColor: "#2e3440" },
                    { name: "dracula", bgColor: "#282a36" },
                  ];
                  let theme = "classic"
                  let themeColor = "#ffffff"
                  const raw = localStorage.getItem("wordle_settings");
                  if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === "object") {
                      theme = parsed.theme;
                      // update themeColor
                      const themeObject = themes.find(x => x.name === theme)
                      if (themeObject)
                        themeColor = themeObject.bgColor
                    }
                  }
                  document.documentElement.classList.add(theme);
                  const themeMeta = document.querySelector('meta[name="theme-color"]');
                  if (themeMeta) themeMeta.setAttribute("content", themeColor);
                } catch (_) { }
              })()
            `,
          }}
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga-script" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
          `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${futuraFont.className} antialiased`}>
        <div className="page-wrapper flex min-h-dvh flex-col select-none">
          <NextIntlClientProvider>
            <Header />
            <InstallListener />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
